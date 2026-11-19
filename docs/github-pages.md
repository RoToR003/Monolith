# Monolith · GitHub Pages та власний API-застосунок

**Оновлено: 19 листопада 2026 · публічна тестова версія.**

- Сайт: **https://rotor003.github.io/Monolith/**.
- Джерело: **`monolith/baseline`** у `RoToR003/Monolith`.
- Автоматизація: **`.github/workflows/monolith-pages.yml`**, назва **Monolith Pages**.
- Pages source: **GitHub Actions** (`build_type: workflow`), не Deploy from a branch.
- Початкову **`main` не змінюємо**. Стару `gh-pages` з першою перевіреною збіркою залишено як історичний резерв, нові версії туди не пушаться.
- Репозиторій публічний із дозволу власника. Повернення в private не відкликає сторонні копії та права на вже розповсюджений GPL-код.

## Секрети власника

У **Settings → Secrets and variables → Actions → Repository secrets** власник самостійно задає:

| Repository secret | Змінна тільки на етапі збірки |
|---|---|
| `TELEGRAM_API_ID` | `VITE_API_ID` |
| `TELEGRAM_API_HASH` | `VITE_API_HASH` |

Не вставляти значення в workflow, README, issue, повідомлення асистенту чи скриншот. GitHub API показує лише назви/дати секретів, не їхні значення. Бот і BotFather для цього не потрібні.

Перед збіркою перевіряється формат ID/hash без їх друку. Відсутня/неправильна пара **зупиняє збірку**, а не непомітно перемикає її на upstream defaults. Значення передаються лише build-step, не крокам checkout/install/unit-тестів. Після збірки окремо перевіряється, що очікувана API-конфігурація справді потрапила в JS; друкується тільки результат, не значення.

**Межа секретності:** API-конфігурація потрібна браузеру, тому після збірки її можна знайти в JavaScript. Repository secrets захищають зберігання й процес підготовки, а не приховують значення від відвідувачів. Це не Telegram-сесія. Коди входу, 2FA, `auth_key`, серверні токени та приватні VAPID-ключі у `VITE_*` не допускаються.

## Автоматичне оновлення сайту

```bash
git add <потрібні-файли>
git commit -m "Describe the change"
git push origin monolith/baseline
```

**Тепер push у `monolith/baseline` запускає збірку й деплой автоматично.** Workflow:

1. Checkout точного source commit і pinned публічних submodules; Git credentials не залишаються в checkout.
2. Node.js 24.11.1, pnpm 11.16.0, frozen залежності та відновлення runtime.
3. Вибрані unit/regression-тести, у тому числі перевірки конфігурації та відсутності значень у її повідомленнях про помилки.
4. Перевірка секретів і мінімізована Pages-збірка на GitHub runner.
5. Перевірка маніфестів, шляхів, GPL/source commit, відсутності env/session/source-map/source-archive файлів, а також фактичного підключення власної API-конфігурації.
6. Upload **лише статичного клієнта** через офіційний Pages artifact і deployment через OIDC.

Actions прикріплені до точних SHA; немає запуску з секретами для pull requests чи сторонніх fork. Build job має read-дозволи, deploy job — лише необхідні `contents: read`, `pages: write`, `id-token: write`. Environment `github-pages` дозволяє публікацію робочої гілки. Сам workflow не пушить код і не переписує історію.

Поточна адреса залишається доступною під час підготовки нового артефакту. Помилка install/test/build не запускає deployment; попередня версія не замінюється невдалою збіркою. Це не виключає збоїв самого хостингу.

Статус: **Actions → Monolith Pages**. Metadata: `/Monolith/monolith-build.json`; версія та точний source commit також є в `about.html`. Metadata не містить API ID/hash.

### Перезбірка без зміни коду

За наявності GitHub CLI та права запуску workflow:

```bash
gh workflow run monolith-pages.yml --repo RoToR003/Monolith --ref monolith/baseline
# Або з чистого вже запушеного source checkout:
bash scripts/monolith-pages.sh deploy
```

`deploy` тепер **просить Actions виконати збірку**, а не збирає й пушить `gh-pages` локально. Заміна repository secrets не перебудовує вже опублікований JS — після неї потрібен новий запуск.

`main` залишається незміненою default-гілкою, тож GitHub UI може не показувати кнопку ручного `Run workflow` для workflow з робочої гілки. Push-тригер і контроль результату в Actions не потребують змін `main`.

## Локальна збірка та прев’ю

```bash
bash scripts/monolith.sh setup
bash scripts/monolith-pages.sh build
```

Файли: **`.cache/monolith-pages/site/`**, окремо від звичайної `dist/`. Без власних локальних overrides це upstream development API-режим, а не збірка з repository secrets: значення GitHub-секретів не завантажуються на комп’ютер чи в sandbox.

Для локальних власних реквізитів можна використати ігнорований `.env.local` із `VITE_API_ID`/`VITE_API_HASH` або environment; provenance позначається як `local-environment`. Не комітити файл чи значення.

```bash
export PATH="${XDG_CACHE_HOME:-$HOME/.cache}/monolith-toolchain/node_modules/.bin:$PATH"
MONOLITH_PAGES=1 MONOLITH_PORT=5175 node scripts/monolith-server.cjs
# http://localhost:5175/Monolith/
```

В Arena сервер слухає `0.0.0.0` і запускається як довготривалий процес. Локальна перевірка не замінює перевірку публічного домену. За замовчуванням локальна збірка low-memory, без мінімізації; Actions явно вмикає оптимізацію й більший heap.

## Відкат

- Повернути source-зміни звичайним `git revert`, протестувати та запушити `monolith/baseline`; це створить нову збірку без force-push.
- Або повторно виконати раніше успішний Actions deployment, якщо його артефакт ще доступний. Строк зберігання артефакту — 1 день, не довготривалий backup.
- Як аварійний історичний резерв збережено `gh-pages` з початковою збіркою. Перемикання Pages назад на неї робиться окремим явним рішенням; це також повертає стару development API-конфігурацію.

## GPL без вихідних архівів на сайті

На екрані входу посилання **«Monolith · код і GPLv3»** веде на `about.html` з точним публічним source commit, описом походження, версією та `LICENSE.txt`.

Окремі ZIP/TAR-архіви вихідного коду, Releases чи download-пакети на сайт не додаються. Внутрішнє пакування deployment-артефакту GitHub не створює посилання на вихідний архів на сайті. Технічний `assets/monolith/vendor-runtime.tar.gz` лишається тільки у source repository для відновлення runtime, не входить до сайту.

Поки збірка публічно розповсюджується, відповідний GPL-код має бути доступний її отримувачам. Закриття репозиторію потребує окремого вирішення доступу до коду; не покладатися на невідомість URL.

## PWA та межі перевірки

- Назва Monolith; стабільні manifest `id`, `scope`, `start_url`: `/Monolith/`.
- Source manifest у `public/` лишається upstream; адаптація — тільки під час Pages-збірки.
- Немає claims на Telegram `t.me`/`telegram.me`; неперевірений POST `share_target` не рекламується.
- Worker у корені `/Monolith/` не потребує спеціального `Service-Worker-Allowed: /` від GitHub.
- `noindex, nofollow` — лише прохання пошуковикам, не контроль доступу.
- GitHub Pages не створює backend, push-relay чи серверного сховища Telegram-сесій.
- Перший реальний ручний прогін заплановано на Android/Chrome; результатів входу й роботи чатів на пристрої ще немає. Chromium-емуляція не є тестом фізичного телефона чи iPhone/Safari.
- Origin `rotor003.github.io` спільний для його project paths: не розміщуйте на ньому сторонній неперевірений код поряд із Telegram-сесією.

Це тестова база, не підтверджений production-реліз Monolith.
