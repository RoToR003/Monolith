import {defineConfig, mergeConfig, type Plugin} from 'vite';
import upstream from './vite.config';

// Keep Telegram's protocol implementation unchanged.
// Environment-specific changes live here, not in upstream's Vite configuration.
const identity: Plugin = {
  name: 'monolith-development-identity',
  transformIndexHtml: {
    order: 'post',
    handler(html) {
      return html
      .replace(/<title>[^<]*<\/title>/, '<title>Monolith — Telegram Web K · Development</title>')
      .replaceAll('content="Telegram Web"', 'content="Monolith — Telegram Web K"')
      .replaceAll('content="https://web.telegram.org/k/"', 'content="./"')
      .replaceAll('content="https://web.telegram.org/"', 'content="./"');
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
  plugins: [identity],
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
    outDir: 'dist',
    // Our sparse checkout omits old generated bundles from public/.
    // The resulting dist/ includes the actual static source assets and stands alone.
    copyPublicDir: true,
    sourcemap: false,
    // Prefer a reproducible low-memory development bundle in the 2 GiB sandbox.
    // Set MONOLITH_OPTIMIZE=1 on a larger machine for upstream's minified output.
    minify: process.env.MONOLITH_OPTIMIZE === '1' ? undefined : false,
    reportCompressedSize: false
  }
}));
