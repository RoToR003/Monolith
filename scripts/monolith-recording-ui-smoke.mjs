// GPL-3.0-only. Real Solid/SCSS recording panel in an isolated browser page.
// No Telegram bootstrap, account, credentials, microphone, or camera access.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import {fileURLToPath} from 'node:url';
import {build} from 'vite';
import solid from 'vite-plugin-solid';
import {chromium} from '@playwright/test';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.resolve(root, '.cache/monolith-recording-ui-smoke');
const resolve = (p) => path.resolve(root, p);
fs.mkdirSync(output, {recursive: true});
const entry = path.join(output, 'entry.ts');
fs.writeFileSync(entry, `
  import {createVideoRecordingPanel} from '../../src/components/chat/recording/videoRecordingPanel';
  import '../../src/scss/partials/_videoRecordingPanel.scss';
  window.makeRecordingPanel = createVideoRecordingPanel;
`);
const result = await build({
  configFile: false, root, logLevel: 'error', plugins: [solid()],
  resolve: {alias: [
    {find: 'solid-js/web', replacement: resolve('src/vendor/solid/web/dist/web.js')},
    {find: 'solid-js', replacement: resolve('src/vendor/solid/dist/solid.js')},
    {find: '@components', replacement: resolve('src/components')},
    {find: '@helpers', replacement: resolve('src/helpers')}
  ]},
  build: {write: false, minify: false, target: 'es2022', lib: {entry, formats: ['es'], fileName: 'panel'}}
});
const outputs = Array.isArray(result) ? result.flatMap((x) => x.output) : result.output;
const js = outputs.filter((x) => x.type === 'chunk').map((x) => x.code).join('\n');
const css = outputs.filter((x) => x.type === 'asset' && x.fileName.endsWith('.css')).map((x) => x.source).join('\n');
assert.ok(js && css);
const server = http.createServer((request, response) => {
  if(request.url === '/panel.js') {
    response.setHeader('Content-Type', 'application/javascript');response.end(js);
  } else if(request.url === '/panel.css') {
    response.setHeader('Content-Type', 'text/css');response.end(css);
  } else {
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    response.end('<!doctype html><meta name="viewport" content="width=device-width, initial-scale=1"><title>Recording layout tests — no account</title><link rel="stylesheet" href="/panel.css"><style>body{margin:0;background:#253341}video{background:linear-gradient(140deg,#617b85,#153a40)}</style><script type="module" src="/panel.js"></script>');
  }
});
await new Promise((resolve) => server.listen(0, '0.0.0.0', resolve));
let browser;
try {
  browser = await chromium.launch({headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage']});
  const errors = [], results = [];
  for(const [width, height] of [[320, 568], [390, 844], [412, 915], [844, 390], [390, 360], [360, 260]]) {
    const context = await browser.newContext({viewport: {width, height}, isMobile: true, hasTouch: true});
    const page = await context.newPage();page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/`);
    await page.waitForFunction(() => !!window.makeRecordingPanel);
    await page.evaluate(() => {
      window.flipCount = 0;
      window.panel = window.makeRecordingPanel(false, () => window.flipCount++);
      document.body.append(window.panel.element);
      window.panel.setCanSwitchCamera(true);window.panel.setMode('recording');window.panel.setProgress(.38);
    });
    await page.getByRole('button', {name: 'Змінити камеру'}).tap();
    const result = await page.evaluate(() => {
      const circle = document.querySelector('.video-recording-circle'), button = circle.querySelector('button');
      const ring = circle.querySelector('.progress-ring');
      const box = circle.getBoundingClientRect(), rb = ring.getBoundingClientRect(), bb = button.getBoundingClientRect();
      const x = bb.x + bb.width / 2, y = bb.y + bb.height / 2;
      const result = {
        width: box.width, height: box.height, ringWidth: rb.width, ringHeight: rb.height,
        ringViewBox: ring.getAttribute('viewBox'), flipCount: window.flipCount,
        buttonWidth: bb.width, buttonHeight: bb.height,
        buttonReachable: document.elementFromPoint(x, y)?.closest('button') === button,
        buttonInsideCircle: Math.hypot(x - (box.x + box.width / 2), y - (box.y + box.height / 2)) + bb.width / 2 < box.width / 2,
        outsidePassesThrough: document.elementFromPoint(1, 1) !== window.panel.element
      };
      window.panel.setSwitchingCamera(true);result.busyDisables = button.disabled;
      window.panel.setSwitchingCamera(false);window.panel.setMode('paused');result.hiddenWhenPaused = button.hidden;
      window.panel.setMode('recording');return result;
    });
    assert.ok(Math.abs(result.width - result.height) < .6, 'Recording preview must remain square');
    assert.ok(Math.abs(result.width - result.ringWidth) < .6 && Math.abs(result.height - result.ringHeight) < .6, 'Progress ring must scale with the circle');
    assert.equal(result.ringViewBox, '0 0 360 360');
    assert.equal(result.flipCount, 1);
    assert.equal(result.buttonReachable && result.buttonInsideCircle && result.outsidePassesThrough && result.busyDisables && result.hiddenWhenPaused, true);
    assert.ok(result.buttonWidth >= 44 && result.buttonHeight >= 44);
    if(width === 390 && height === 844) await page.screenshot({path: path.join(output, 'recording-panel.png')});
    results.push({viewport: {width, height}, ...result});
    await context.close();
  }
  assert.deepEqual(errors, []);
  const report = {testedAt: new Date().toISOString(), authenticated: false, scope: 'Actual Solid component and SCSS; Chromium mobile viewport/touch emulation, not physical Android cameras or a signed-in chat.', results, errors};
  fs.writeFileSync(path.join(output, 'report.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify(report, null, 2));
} finally {
  if(browser) await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
