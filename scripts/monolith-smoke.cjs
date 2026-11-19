// Unauthenticated browser checks only. Never enters a phone number, sends a login
// code, scans a QR, restores an account, or saves browser storage/session state.
const {chromium, devices} = require('@playwright/test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const url = process.env.MONOLITH_URL || 'http://127.0.0.1:5173/';
const expectPages = process.env.MONOLITH_EXPECT_PAGES === '1';
const output = path.resolve(__dirname, '..', process.env.MONOLITH_SMOKE_OUTPUT || '.cache/monolith-smoke');
fs.mkdirSync(output, {recursive: true});

(async() => {
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage']
  });
  const results = [];
  try {
    for(const [name, options] of [
      ['desktop-chromium', {viewport: {width: 1360, height: 900}}],
      ['mobile-chromium', {...devices['Pixel 7'], viewport: {width: 390, height: 844}}]
    ]) {
      console.log(`Checking ${name}...`);
      const context = await browser.newContext({locale: 'en-US', ...options});
      const page = await context.newPage();
      const pageErrors = [];
      const failedLocalResponses = [];
      page.on('pageerror', (error) => pageErrors.push(error.message));
      page.on('response', (response) => {
        if(new URL(response.url()).origin === new URL(url).origin && response.status() >= 400) {
          failedLocalResponses.push({path: new URL(response.url()).pathname, status: response.status()});
        }
      });
      const response = await page.goto(url, {waitUntil: 'domcontentloaded', timeout: 60_000});
      assert.equal(response.status(), 200);
      await page.locator('#auth-pages h1').first().waitFor({state: 'visible', timeout: 45_000});
      assert.match(await page.title(), /Monolith/);

      const phoneButton = page.getByRole('button', {name: /log in by phone number/i});
      let qrRendered = null;
      if(await phoneButton.isVisible()) {
        // UI rendering and unauthenticated Telegram connectivity are separate checks.
        qrRendered = await page.locator('#auth-pages canvas[class*="qrCanvas"]').first()
          .waitFor({state: 'visible', timeout: 20_000}).then(() => true, () => false);
        await phoneButton.click();
      }
      await page.locator('#auth-pages .input-field-phone').waitFor({state: 'visible', timeout: 15_000});
      assert.equal(await page.locator('#auth-pages .input-field-phone').count(), 1);

      const themeButton = page.getByRole('button', {name: 'Dark Mode', exact: true});
      await themeButton.click();
      await page.locator('#auth-pages h1').first().waitFor({state: 'visible'});
      if(expectPages) {
        await page.waitForFunction(async() => (await navigator.serviceWorker.getRegistrations())
          .some((registration) => registration.active?.state === 'activated'), undefined, {timeout: 15_000});
      }
      const metrics = await page.evaluate(async() => {
        const registrations = 'serviceWorker' in navigator ? await navigator.serviceWorker.getRegistrations() : [];
        return {
          width: window.innerWidth,
          scrollWidth: document.documentElement.scrollWidth,
          serviceWorkerActivated: registrations.some((registration) => registration.active?.state === 'activated'),
          serviceWorkers: registrations.map((registration) => ({scope: registration.scope, scriptURL: registration.active?.scriptURL})),
          manifestPresent: !!document.querySelector('link[rel="manifest"][href]'),
          manifestUrl: document.querySelector('link[rel="manifest"]')?.href
        };
      });
      assert.ok(metrics.scrollWidth <= metrics.width + 1, 'Login UI must not overflow horizontally');
      assert.equal(metrics.manifestPresent, true);
      let distribution;
      if(expectPages) {
        const base = new URL(url);
        const metadataResponse = await context.request.get(new URL('monolith-build.json', base).href);
        assert.equal(metadataResponse.status(), 200);
        const metadata = await metadataResponse.json();
        assert.match(metadata.sourceCommit, /^[0-9a-f]{40}$/);
        const manifestResponse = await context.request.get(metrics.manifestUrl);
        assert.equal(manifestResponse.status(), 200);
        const manifest = await manifestResponse.json();
        for(const key of ['id', 'start_url', 'scope']) assert.equal(manifest[key], base.pathname);
        assert.equal(manifest.name, 'Monolith');
        assert.ok(metrics.serviceWorkers.some((worker) => worker.scope === base.href));
        assert.ok(metrics.serviceWorkers.every((worker) => worker.scriptURL?.startsWith(base.href)));
        assert.equal(await page.locator('#monolith-legal-link').isVisible(), true);
        assert.equal(await page.locator('#monolith-legal-link').getAttribute('href'), base.pathname + 'about.html');
        const aboutResponse = await context.request.get(new URL('about.html', base).href);
        assert.equal(aboutResponse.status(), 200);
        assert.ok((await aboutResponse.text()).includes(metadata.sourceUrl));
        const licenseResponse = await context.request.get(new URL('LICENSE.txt', base).href);
        assert.equal(licenseResponse.status(), 200);
        assert.match(await licenseResponse.text(), /GNU GENERAL PUBLIC LICENSE/);
        distribution = {sourceCommit: metadata.sourceCommit, sourceUrl: metadata.sourceUrl, manifestId: manifest.id, pwaScope: manifest.scope, licenseAndSourceAccessible: true};
      }
      // Capture only the empty phone form, not a live QR token or an account.
      await page.screenshot({path: path.join(output, `${name}.png`)});
      // Keep collecting exceptions until teardown, including asynchronous country selection.
      await context.close();
      assert.deepEqual(pageErrors, [], 'No uncaught browser exceptions');
      assert.deepEqual(failedLocalResponses, [], 'All requested local client resources must load');
      results.push({name, loginScreen: true, phoneForm: true, themeButton: true, ...metrics,
        ...(distribution ? {distribution} : {}), qrRendered,
        pageErrors: [...pageErrors], failedLocalResponses: [...failedLocalResponses]});
    }
    const report = {
      testedAt: new Date().toISOString(), baseUrl: url, authenticated: false,
      engine: 'Playwright Chromium', actualIosDeviceTested: false, results,
      notes: [
        'Phone, QR approval, 2FA and signed-in chats were deliberately not tested.',
        'Mobile Chromium viewport is not an iPhone Safari/PWA validation.',
        'qrRendered=false means the QR screen loaded but a Telegram QR token was not confirmed.'
      ]
    };
    fs.writeFileSync(path.join(output, 'report.json'), JSON.stringify(report, null, 2) + '\n');
    console.log(JSON.stringify(report, null, 2));
    if(process.env.MONOLITH_REQUIRE_QR === '1') {
      assert.ok(results.some((result) => result.qrRendered === true), 'Telegram must return a QR token');
    }
  } finally {
    await browser.close();
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
