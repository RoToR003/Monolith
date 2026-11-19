import {defineConfig, loadEnv, mergeConfig, type Plugin} from 'vite';
import {existsSync, readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import upstream from './vite.config';
import {distributionAssets, normalizeBasePath, PAGES_BASE, PAGES_URL} from './scripts/monolith-pages.mjs';
import {resolveBuildApiConfig} from './scripts/monolith-api-config.mjs';

// Keep Telegram's protocol implementation unchanged.
// Environment-specific changes live here, not in upstream's Vite configuration.
const isPages = process.env.MONOLITH_PAGES === '1';
const pagesBase = normalizeBasePath(process.env.MONOLITH_BASE_PATH || PAGES_BASE);
const root = fileURLToPath(new URL('.', import.meta.url));
// Only CI build steps receive repository secrets. Never print this configuration.
const localApiOverride = existsSync(`${root}.env.local`) &&
  /^\s*(?:export\s+)?VITE_API_(?:ID|HASH)\s*=/m.test(readFileSync(`${root}.env.local`, 'utf8'));
const localEnv = localApiOverride ? loadEnv(process.env.NODE_ENV === 'development' ? 'development' : 'production', root, 'VITE_') : {};
const apiConfiguration = resolveBuildApiConfig({...localEnv, ...process.env});
if(apiConfiguration.source !== 'upstream-development') {
  process.env.VITE_API_ID = apiConfiguration.apiId;
  process.env.VITE_API_HASH = apiConfiguration.apiHash;
}
const distributionOptions = {
  credentialSource: apiConfiguration.source,
  deploymentMode: process.env.MONOLITH_DEPLOYMENT_MODE || 'branch',
  runId: process.env.GITHUB_ACTIONS === 'true' ? process.env.GITHUB_RUN_ID : undefined,
  runAttempt: process.env.GITHUB_RUN_ATTEMPT
};
const sourceCommit = isPages ? (process.env.MONOLITH_SOURCE_COMMIT ||
  execFileSync('git', ['rev-parse', 'HEAD'], {encoding: 'utf8'}).trim()) : undefined;

const identity: Plugin = {
  name: 'monolith-development-identity',
  transformIndexHtml: {
    order: 'post',
    handler(html) {
      let result = html
      .replace(/<title>[^<]*<\/title>/, `<title>Monolith — Telegram Web K${isPages ? '' : ' · Development'}</title>`)
      .replaceAll('content="Telegram Web"', 'content="Monolith — Telegram Web K"')
      .replaceAll('content="https://web.telegram.org/k/"', `content="${isPages ? PAGES_URL : './'}"`)
      .replaceAll('content="https://web.telegram.org/"', `content="${isPages ? PAGES_URL : './'}"`)
      .replaceAll('href="https://web.telegram.org/"', `href="${isPages ? PAGES_URL : './'}"`);
      if(isPages) {
        result = result.replace('</head>', `
    <meta name="robots" content="noindex, nofollow">
    <meta name="referrer" content="no-referrer">
    <meta name="monolith-source-commit" content="${sourceCommit}">
    <link rel="license" href="${pagesBase}LICENSE.txt">
    <style>
      #monolith-legal-link{display:none;position:fixed;z-index:20;left:12px;bottom:max(10px,env(safe-area-inset-bottom));padding:6px 10px;border-radius:20px;background:rgba(255,255,255,.9);color:#384653;font:11px/1.3 system-ui,sans-serif;text-decoration:none}
      body.has-auth-pages #monolith-legal-link{display:block}
      #monolith-legal-link:focus-visible{outline:2px solid #2481cc;outline-offset:3px}
    </style>
  </head>`).replace('</body>', `
    <a id="monolith-legal-link" href="${pagesBase}about.html" target="_blank" rel="license noopener noreferrer" aria-label="Monolith: вихідний код, GPLv3 і статус тестової версії">Monolith · код і GPLv3</a>
  </body>`);
      }
      return result;
    }
  }
};

const pagesDistribution: Plugin = {
  name: 'monolith-pages-distribution',
  apply: 'build',
  generateBundle() {
    if(!isPages) return;
    for(const [fileName, source] of Object.entries(distributionAssets(sourceCommit, root, pagesBase, distributionOptions))) {
      this.emitFile({type: 'asset', fileName, source});
    }
  }
};

const port = Number(process.env.MONOLITH_PORT || process.env.PORT || 5173);
const allowedHosts = ['.e2b.app', 'localhost', '127.0.0.1'];
const headers = {
  'Service-Worker-Allowed': '/',
  'Referrer-Policy': 'no-referrer',
  'X-Content-Type-Options': 'nosniff'
};

export default mergeConfig(upstream, defineConfig({
  base: isPages ? pagesBase : undefined,
  plugins: [identity, pagesDistribution],
  server: {
    host: '0.0.0.0',
    port,
    strictPort: true,
    allowedHosts,
    headers,
    // Arena terminates HTTPS at its proxy; never send browser clients to localhost.
    hmr: process.env.MONOLITH_PROXY_HTTPS === '1' ? {clientPort: 443, protocol: 'wss'} : undefined
  },
  preview: {
    host: '0.0.0.0',
    port,
    strictPort: true,
    allowedHosts,
    headers
  },
  build: {
    // A Pages build must not replace the working root-path Arena preview.
    outDir: isPages ? '.cache/monolith-pages/site' : 'dist',
    // The resulting output includes static assets and stands alone.
    copyPublicDir: true,
    sourcemap: false,
    // Prefer a reproducible low-memory bundle in the 2 GiB sandbox.
    // MONOLITH_OPTIMIZE=1 enables upstream's minification on larger machines.
    minify: process.env.MONOLITH_OPTIMIZE === '1' ? undefined : false,
    reportCompressedSize: false
  }
}));
