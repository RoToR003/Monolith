// Static preview of a locally built client. No Telegram sessions or API proxy on this server.
const path = require('node:path');
const fs = require('node:fs');
const express = require('express');
const compression = require('compression');

const root = path.resolve(__dirname, '..', 'dist');
const port = Number(process.env.MONOLITH_PORT || process.env.PORT || 5173);
if(!fs.existsSync(path.join(root, 'index.html'))) {
  console.error('No build found. Run: bash scripts/monolith.sh build');
  process.exit(1);
}

const app = express();
app.disable('x-powered-by');
app.use((_req, res, next) => {
  res.set({
    'Cache-Control': 'no-store',
    'Service-Worker-Allowed': '/',
    'Referrer-Policy': 'no-referrer',
    'X-Content-Type-Options': 'nosniff'
  });
  next();
});
app.use(compression());
app.get('/__monolith/health', (_req, res) => {
  res.json({project: 'Monolith', stage: 'upstream-baseline', accountRequired: true});
});
app.use(express.static(root, {dotfiles: 'deny', index: 'index.html', maxAge: 0}));
app.get('/share/', (_req, res) => res.sendFile(path.join(root, 'index.html')));
app.use((_req, res) => res.status(404).type('text/plain').send('Not found'));

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Monolith · Telegram Web K baseline listening on 0.0.0.0:${port}`);
  console.log('Static client only. Sign-in takes place in your own browser with Telegram.');
});
for(const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
