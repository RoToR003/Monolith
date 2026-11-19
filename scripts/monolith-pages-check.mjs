// GPL-3.0-only. Verify only the static client is about to be published.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {normalizeBasePath, sourceUrl} from './monolith-pages.mjs';

const root = path.resolve('.cache/monolith-pages/site');
const base = normalizeBasePath(process.env.MONOLITH_BASE_PATH || '/Monolith/');
const metadata = JSON.parse(fs.readFileSync(path.join(root, 'monolith-build.json'), 'utf8'));
assert.equal(metadata.basePath, base);
assert.equal(metadata.sourceUrl, sourceUrl(metadata.sourceCommit));
if(process.env.MONOLITH_API_CREDENTIAL_SOURCE) {
  assert.equal(metadata.apiConfigurationSource, process.env.MONOLITH_API_CREDENTIAL_SOURCE);
  assert.equal(metadata.ownApiCredentialsConfigured, process.env.MONOLITH_API_CREDENTIAL_SOURCE !== 'upstream-development');
}
if(process.env.MONOLITH_DEPLOYMENT_MODE) assert.equal(metadata.deploymentMode, process.env.MONOLITH_DEPLOYMENT_MODE);
if(process.env.MONOLITH_SOURCE_COMMIT) assert.equal(metadata.sourceCommit, process.env.MONOLITH_SOURCE_COMMIT);
let files = 0, bytes = 0;
function walk(dir) {
  for(const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    const relative = path.relative(root, full).replaceAll(path.sep, '/');
    assert.ok(!entry.isSymbolicLink(), `No published symlinks: ${relative}`);
    assert.ok(!/(^|\/)(\.git|\.env(?:\..*)?|node_modules|src|docs|tmp|\.cache)(\/|$)/.test(relative), `Private/source path: ${relative}`);
    if(entry.isDirectory()) { walk(full); continue; }
    assert.ok(!/\.(?:map|session|pem|key|zip|tar|gz)$/i.test(relative), `Unexpected private/map/archive file: ${relative}`);
    const size = fs.statSync(full).size;
    assert.ok(size < 100 * 1024 * 1024, `File exceeds GitHub limit: ${relative}`);
    files++; bytes += size;
  }
}
walk(root);
assert.ok(bytes < 1024 ** 3, 'The site must fit the GitHub Pages published-site limit.');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
assert.match(html, /<title>Monolith/);
assert.ok(html.includes(`content="${metadata.sourceCommit}"`));
assert.ok(html.includes(`href="${base}about.html"`));
assert.ok(html.includes('noindex, nofollow'));
for(const match of html.matchAll(/<(?:script|link|img)\b[^>]*?\b(?:src|href)="([^"]+)"/g)) {
  const value = match[1];
  if(/^(?:https?:|data:|#)/.test(value)) continue;
  const url = new URL(value, `https://rotor003.github.io${base}`);
  assert.ok(url.pathname.startsWith(base), `Resource escaped project path: ${value}`);
  assert.ok(fs.existsSync(path.join(root, decodeURIComponent(url.pathname.slice(base.length)))), `Missing HTML resource: ${value}`);
}
for(const file of ['site.webmanifest', 'site_apple.webmanifest']) {
  const manifest = JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
  assert.equal(manifest.name, 'Monolith');
  for(const key of ['id', 'start_url', 'scope']) assert.equal(manifest[key], base);
  assert.equal(manifest.scope_extensions, undefined);
  assert.equal(manifest.share_target, undefined);
  for(const icon of manifest.icons) {
    const iconUrl = new URL(icon.src, `https://rotor003.github.io${base}${file}`);
    assert.ok(iconUrl.pathname.startsWith(base));
    assert.ok(fs.existsSync(path.join(root, iconUrl.pathname.slice(base.length))));
  }
}
assert.ok(fs.readdirSync(root).some((file) => /^sw-[\w-]+\.js$/.test(file)), 'Bundled Service Worker exists');
assert.ok(fs.existsSync(path.join(root, '.nojekyll')));
assert.match(fs.readFileSync(path.join(root, 'LICENSE.txt'), 'utf8'), /GNU GENERAL PUBLIC LICENSE/);
assert.ok(fs.readFileSync(path.join(root, 'about.html'), 'utf8').includes(metadata.sourceUrl));
const report = {checkedAt: new Date().toISOString(), files, bytes, sourceCommit: metadata.sourceCommit, basePath: base, noPersonalFiles: true, noSourceArchives: true, manifestsAndResources: true};
fs.writeFileSync(path.resolve('.cache/monolith-pages/artifact-verification.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
