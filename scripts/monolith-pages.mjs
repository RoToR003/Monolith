// Monolith hosting adaptations; upstream manifests remain unchanged in public/.
// Modified 2026-11-19. Distributed with Monolith under GPL-3.0-only.
import {readFileSync} from 'node:fs';
import {publicApiConfiguration} from './monolith-api-config.mjs';

export const REPOSITORY = 'RoToR003/Monolith';
export const PAGES_URL = 'https://rotor003.github.io/Monolith/';
export const PAGES_BASE = '/Monolith/';

export function normalizeBasePath(value = PAGES_BASE) {
  if(!/^\/(?:[A-Za-z0-9_-]+\/)*$/.test(value)) {
    throw new Error('Base path must start/end with / and contain only safe path segments.');
  }
  return value;
}

export function sourceUrl(commit) {
  if(!/^[0-9a-f]{40}$/.test(commit)) throw new Error('Expected a full source commit SHA.');
  return `https://github.com/${REPOSITORY}/tree/${commit}`;
}

export function pagesManifest(original, base = PAGES_BASE) {
  base = normalizeBasePath(base);
  const manifest = structuredClone(original);
  Object.assign(manifest, {
    name: 'Monolith',
    short_name: 'Monolith',
    description: 'Тестова версія неофіційного клієнта на основі Telegram Web K.',
    id: base,
    start_url: base,
    scope: base
  });
  // This independent origin cannot claim Telegram's verified link associations.
  delete manifest.scope_extensions;
  // GitHub Pages has no POST backend. Do not advertise an unvalidated share target.
  delete manifest.share_target;
  delete manifest.screenshots;
  return manifest;
}

export function buildMetadata(commit, base = PAGES_BASE, options = {}) {
  const deploymentMode = options.deploymentMode || 'branch';
  if(!['branch', 'workflow'].includes(deploymentMode)) throw new Error('Invalid deployment mode.');
  const runId = options.runId || undefined;
  const runAttempt = options.runAttempt || '1';
  if(runId && (!/^\d+$/.test(runId) || !/^\d+$/.test(runAttempt))) throw new Error('Invalid workflow run identifier.');
  return {
    project: 'Monolith',
    stage: 'Telegram Web K baseline — public test',
    sourceCommit: commit,
    sourceUrl: sourceUrl(commit),
    repository: `https://github.com/${REPOSITORY}`,
    sourceBranch: 'monolith/baseline',
    deploymentMode,
    deploymentBranch: deploymentMode === 'branch' ? 'gh-pages' : null,
    buildVersion: runId ? `${commit.slice(0, 7)}-${runId}.${runAttempt}` : `${commit.slice(0, 7)}-local`,
    ...(runId ? {buildRunUrl: `https://github.com/${REPOSITORY}/actions/runs/${runId}`} : {}),
    siteUrl: PAGES_URL,
    basePath: normalizeBasePath(base),
    license: 'GPL-3.0-only',
    upstreamCommit: '2e4bbb52b6aec5e95ee32e5c2882c1f05de32200',
    ...publicApiConfiguration(options.credentialSource),
    authenticatedTestingCompleted: false,
    actualIosDeviceTested: false
  };
}

export function aboutHtml(commit, base = PAGES_BASE, options = {}) {
  base = normalizeBasePath(base);
  const source = sourceUrl(commit);
  const metadata = buildMetadata(commit, base, options);
  const credentialNotice = metadata.ownApiCredentialsConfigured ?
    'У цій збірці підключено власний Telegram API-застосунок проєкту. API-конфігурація не є користувацькою сесією; кожна людина входить у Telegram самостійно.' :
    'Ця тестова збірка використовує опубліковані upstream development API-реквізити. Перед власним повноцінним розгортанням зареєструйте застосунок на my.telegram.org/apps.';
  return `<!doctype html>
<html lang="uk"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow"><meta name="referrer" content="no-referrer">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'">
<title>Monolith — код, ліцензія та статус</title>
<style>
:root{color-scheme:light dark;font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:#101318;color:#ecf1f7}
*{box-sizing:border-box}body{margin:0;padding:40px 20px 64px}main{max-width:720px;margin:auto}a{color:#93c8ff;text-underline-offset:3px}h1{font-size:40px;letter-spacing:-1.5px;margin:30px 0 10px}h2{font-size:19px;margin:30px 0 10px}p,li{line-height:1.7;color:#c1cbd9}small{color:#9cacc1}.tag{display:inline-block;border:1px solid #415471;border-radius:30px;padding:5px 12px;font-size:12px;letter-spacing:.08em;color:#b7d7ff}.panel{border:1px solid #2c3748;background:#181f29;border-radius:16px;padding:18px 22px;margin:24px 0}.button{display:inline-block;padding:12px 17px;border-radius:9px;background:#93c8ff;color:#101318;text-decoration:none;font-weight:650}code{overflow-wrap:anywhere;color:#e3edff}pre{overflow-x:auto;background:#0c1016;padding:16px;border-radius:10px;font-size:12px;line-height:1.8}hr{border:0;border-top:1px solid #2c3748;margin:32px 0}
</style></head><body><main>
<a href="${base}">← Повернутися до клієнта</a><h1>Monolith</h1><span class="tag">ПУБЛІЧНА ТЕСТОВА ВЕРСІЯ · ЕТАП 0</span>
<p>Неофіційний клієнт на основі Telegram Web K. Це початкова база для подальшої розробки, а не завершений реліз Monolith чи офіційний продукт Telegram.</p>
<div class="panel"><strong>Код саме цієї збірки</strong><p><a href="${source}" target="_blank" rel="noopener noreferrer">Переглянути вихідний код на GitHub</a><br><small>Версія: <code>${metadata.buildVersion}</code><br>Commit: <code>${commit}</code></small></p><a href="${base}LICENSE.txt">Повний текст GPLv3</a> · <a href="${source}/MONOLITH.md" target="_blank" rel="noopener noreferrer">Зміни та документація збірки</a></div>
<h2>Ліцензія й авторство</h2>
<p>База — <a href="https://github.com/morethanwords/tweb/tree/2e4bbb52b6aec5e95ee32e5c2882c1f05de32200" target="_blank" rel="noopener noreferrer">Telegram Web K</a>, автор Eduard Kuzmenko та співавтори. Збережено GPL-3.0-only й авторські повідомлення upstream. Окремі компоненти мають власні ліцензії, наведені у відповідних каталогах вихідного коду.</p>
<p>Локальні зміни Monolith та скрипти збірки доступні за посиланням вище. Вихідний код можна переглядати й клонувати без оплати; окремі архіви на цьому сайті не розміщуються. Програма поширюється БЕЗ БУДЬ-ЯКОЇ ГАРАНТІЇ, у межах, дозволених законом.</p>
<pre>git clone --branch monolith/baseline https://github.com/${REPOSITORY}.git
cd Monolith
git checkout ${commit}
bash scripts/monolith.sh setup
bash scripts/monolith-pages.sh build</pre>
<h2>Перед входом</h2><ul>
<li>GitHub Pages роздає статичні файли. Клієнт з’єднується з Telegram із вашого браузера; окремого сервера Monolith для сесій немає.</li>
<li>${credentialNotice}</li>
<li>Авторизація користувача, чати після входу, дзвінки, push, реальний iPhone/Safari та встановлення PWA ще не пройшли повну перевірку. Ghost Mode, Anti-Recall та інші розширення Monolith не реалізовані.</li>
<li>Не передавайте нікому коди входу, 2FA-пароль чи файли сесії. Шляхи одного домену GitHub Pages не є ізольованими сховищами; не розміщуйте сторонній неперевірений код на цьому ж origin.</li>
</ul><hr><a class="button" href="${base}">Відкрити тестовий клієнт</a>
</main></body></html>\n`;
}

export function distributionAssets(commit, root, base = PAGES_BASE, options = {}) {
  const assets = {
    '.nojekyll': '',
    'LICENSE.txt': readFileSync(`${root}/LICENSE`, 'utf8'),
    'about.html': aboutHtml(commit, base, options),
    'monolith-build.json': JSON.stringify(buildMetadata(commit, base, options), null, 2) + '\n'
  };
  for(const file of ['site.webmanifest', 'site_apple.webmanifest']) {
    const original = JSON.parse(readFileSync(`${root}/public/${file}`, 'utf8'));
    assets[file] = JSON.stringify(pagesManifest(original, base), null, 2) + '\n';
  }
  return assets;
}
