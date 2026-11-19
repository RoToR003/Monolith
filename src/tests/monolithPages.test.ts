import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {aboutHtml, buildMetadata, distributionAssets, normalizeBasePath, pagesManifest, sourceUrl} from '../../scripts/monolith-pages.mjs';

const commit = 'f9c3dc96b13305a6ccc94bf806061d996017e82b';
const root = resolve(__dirname, '../..');
const original = JSON.parse(readFileSync(resolve(root, 'public/site.webmanifest'), 'utf8'));

describe('Monolith GitHub Pages distribution', () => {
  test.each(['/Monolith/', '/', '/safe/nested/'])('accepts a safe project base %s', (base) => {
    expect(normalizeBasePath(base)).toBe(base);
  });

  test.each(['//other.example/', '/Monolith', '/../', '/Monolith/?x=1', '/a%2fb/', '<script>'])('rejects an unsafe project base %s', (base) => {
    expect(() => normalizeBasePath(base)).toThrow();
  });

  test('uses the actual project scope without claiming Telegram link associations', () => {
    const manifest = pagesManifest(original);
    expect(manifest).toMatchObject({name: 'Monolith', short_name: 'Monolith', id: '/Monolith/', start_url: '/Monolith/', scope: '/Monolith/'});
    expect(manifest.scope_extensions).toBeUndefined();
    expect(manifest.share_target).toBeUndefined();
    expect(manifest.icons).toEqual(original.icons);
    expect(original.id).toBe('/k/');
    expect(original.name).toBe('Telegram Web');
    expect(original.share_target).toBeDefined();
  });

  test('pins corresponding source to the deployed commit', () => {
    const metadata = buildMetadata(commit);
    expect(metadata.sourceUrl).toBe(`https://github.com/RoToR003/Monolith/tree/${commit}`);
    expect(metadata.license).toBe('GPL-3.0-only');
    expect(metadata.authenticatedTestingCompleted).toBe(false);
    expect(metadata.actualIosDeviceTested).toBe(false);
    expect(() => sourceUrl('main')).toThrow();
    expect(() => sourceUrl('" onclick="alert(1)')).toThrow();
  });

  test('provides visible source and GPL links without source archives', () => {
    const html = aboutHtml(commit);
    expect(html).toContain(sourceUrl(commit));
    expect(html).toContain('href="/Monolith/LICENSE.txt"');
    expect(html).toContain('git checkout ' + commit);
    expect(html).toContain('БЕЗ БУДЬ-ЯКОЇ ГАРАНТІЇ');
    expect(html).not.toMatch(/href="[^"]+\.(?:zip|tar|gz)/);
  });

  test('emits both adapted manifests, license, metadata and no Jekyll marker', () => {
    const assets = distributionAssets(commit, root);
    expect(Object.keys(assets).sort()).toEqual(['.nojekyll', 'LICENSE.txt', 'about.html', 'monolith-build.json', 'site.webmanifest', 'site_apple.webmanifest'].sort());
    expect(assets['LICENSE.txt']).toContain('GNU GENERAL PUBLIC LICENSE');
    expect(JSON.parse(assets['site.webmanifest']).id).toBe('/Monolith/');
    expect(JSON.parse(assets['site_apple.webmanifest']).id).toBe('/Monolith/');
    expect(JSON.parse(assets['monolith-build.json']).sourceCommit).toBe(commit);
  });
});
