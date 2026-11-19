// Unauthenticated browser checks only. Never enters a phone number, sends a login
// code, scans a QR, restores an account, or saves browser storage/session state.
const {chromium, devices} = require('@playwright/test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const url = process.env.MONOLITH_URL || 'http://127.0.0.1:5173/';
const output = path.resolve(__dirname, '..', '.cache', 'monolith-smoke');
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
        if(response.url().startsWith(new URL(url).origin) && response.status() >= 400) {
          failedLocalResponses.push({path: new URL(response.url()).pathname, status: response.status()});
        }
      });
      const response = await page.goto(url, {waitUntil: 'domcontentloaded', timeout: 30_000});
      assert.equal(response.status(), 200);
      await page.locator('#auth-pages h1').first().waitFor({state: 'visible', timeout: 30_000});
      assert.match(await page.title(), /Monolith/);

      const phoneButton = page.getByRole('button', {name: /log in by phone number/i});
      let qrRendered = null;
      if(await phoneButton.isVisible()) {
        // UI rendering and unauthenticated Telegram connectivity are separate checks.
        // A restricted network may display the screen without ever returning a QR token.
        qrRendered = await page.locator('#auth-pages canvas[class*="qrCanvas"]').first()
          .waitFor({state: 'visible', timeout: 20_000}).then(() => true, () => false);
        await phoneButton.click();
      }
      await page.locator('#auth-pages .input-field-phone').waitFor({state: 'visible', timeout: 15_000});
      assert.equal(await page.locator('#auth-pages .input-field-phone').count(), 1);

      const themeButton = page.getByRole('button', {name: 'Dark Mode', exact: true});
      await themeButton.click();
      await page.locator('#auth-pages h1').first().waitFor({state: 'visible'});
      const metrics = await page.evaluate(async() => {
        const registrations = 'serviceWorker' in navigator ? await navigator.serviceWorker.getRegistrations() : [];
        return {
          width: window.innerWidth,
          scrollWidth: document.documentElement.scrollWidth,
          serviceWorkerActivated: registrations.some((registration) => registration.active?.state === 'activated'),
          manifestPresent: !!document.querySelector('link[rel="manifest"][href]')
        };
      });
      assert.ok(metrics.scrollWidth <= metrics.width + 1, 'Login UI must not overflow horizontally');
      assert.equal(metrics.manifestPresent, true);
      // Capture only the empty phone form, not a live QR token or an account.
      await page.screenshot({path: path.join(output, `${name}.png`)});
      // Keep collecting exceptions until teardown, including asynchronous country selection.
      await context.close();
      assert.deepEqual(pageErrors, [], 'No uncaught browser exceptions');
      assert.deepEqual(failedLocalResponses, [], 'All requested local client resources must load');
      results.push({
        name,
        loginScreen: true,
        phoneForm: true,
        themeButton: true,
        ...metrics,
        qrRendered,
        pageErrors: [...pageErrors],
        failedLocalResponses: [...failedLocalResponses]
      });
    }
    const report = {
      testedAt: new Date().toISOString(),
      baseUrl: url,
      authenticated: false,
      engine: 'Playwright Chromium',
      actualIosDeviceTested: false,
      results,
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
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
