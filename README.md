# Monolith

Початкова база PWA-клієнта для Android та iOS/iPadOS на основі **Telegram Web K**. Перший реальний тестовий етап — Android/Chrome.

> **Етап 0:** перенесено й запущено справжній Telegram Web K. Ghost Mode, Anti-Recall та інші розширення Monolith поки не реалізовані. Це середовище розробки, не готовий клієнт для щоденного використання.

Робоча гілка: **`monolith/baseline`**. Початкову гілку `main` та її історію під час імпорту не змінено.

## Відкрити сайт

**[Monolith · публічна тестова версія →](https://rotor003.github.io/Monolith/)**

HTTPS-хостинг: GitHub Pages через workflow **Monolith Pages**. Стару `gh-pages` збережено як історичний резерв. Репозиторій відкрито з дозволу власника. На екрані входу є посилання на GPLv3 і точний вихідний код збірки, без окремих архівів на сайті. `main` не використовується для публікації й не змінюється.

[Як оновлювати сайт та перевіряти збірку](docs/github-pages.md). Push коду в `monolith/baseline` **автоматично запускає** тести, мінімізовану збірку з repository secrets і публікацію. `bash scripts/monolith-pages.sh deploy` просить ручну перезбірку через GitHub CLI.

Публічний workflow підключає власний API-застосунок через `TELEGRAM_API_ID` / `TELEGRAM_API_HASH`; локальні клони без overrides лишаються на upstream development defaults. Це тестова база, не фінальний реліз.

## Швидкий старт

```bash
git clone --branch monolith/baseline https://github.com/RoToR003/Monolith.git
cd Monolith
bash scripts/monolith.sh setup
bash scripts/monolith.sh serve
```

Репозиторій публічний для отримання вихідного коду GPL-версії; для завантаження коду авторизація не потрібна.

Локальний сервер: `http://localhost:5173`. В Arena використовуйте живе HTTPS-прев’ю. `setup` встановлює ізольовані Node.js **24.11.1** / pnpm **11.16.0** та залежності за lockfile. Системні версії Node.js не змінюються.

Для розробки з Vite/HMR замість `serve`:

```bash
bash scripts/monolith.sh dev
# Через HTTPS-проксі Arena:
MONOLITH_PROXY_HTTPS=1 bash scripts/monolith.sh dev
```

На одному порту одночасно запускайте лише один сервер. Для оновлення статичного прев’ю після змін: `bash scripts/monolith.sh build`, потім оновіть сторінку.

## Авторизація Telegram

Для GitHub Actions власник задає **`TELEGRAM_API_ID`** і **`TELEGRAM_API_HASH`** у Settings → Secrets and variables → Actions. Workflow передає їх у `VITE_API_ID` / `VITE_API_HASH` тільки під час збірки й перевіряє формат та присутність конфігурації в bundle без друку значень. Після зміни секретів потрібен новий запуск.

Для локальної власної збірки отримайте реквізити на https://my.telegram.org/apps і заповніть ігнорований `.env.local` за `.env.monolith.example`. На публічний GitHub вони не комітяться.

- `.env.local`, сесії, ключі, кеші й `node_modules` не входять у Git.
- У `.env` залишені **опубліковані upstream development-значення**, не особисті реквізити власника цього репозиторію.
- `VITE_*` видно в браузерному bundle: серверні секрети й токени там зберігати не можна.
- Не передавайте коди входу, паролі 2FA або дані Telegram-сесії в чат чи репозиторій.

## Перевірки та обмеження

Перевірено локальну збірку, отримання QR-токена Telegram, форми входу на desktop/mobile Chromium, Service Worker і **97 вибраних unit/regression-тестів у 12 файлах**.

Повний typecheck не завершено в обмеженому sandbox. Власник повідомив про успішні QR-вхід, надсилання, збереження сесії й базовий фото/PWA-чекліст на OnePlus 15. Виявлено проблеми голосових і щойно надісланих кружків; докладний статус і межі виправлень — [Android media status](docs/android-media-status.uk.md). Реальний iPhone/Safari, ширший чат-сценарій, дзвінки й push ще не прийняті. Локальна збірка за замовчуванням полегшена й без мінімізації; Actions вмикає мінімізацію на окремому runner.

```bash
bash scripts/monolith.sh test src/tests/formatPhoneNumber.test.ts src/tests/webManifest.test.ts src/tests/monolithCountrySelection.test.ts src/tests/monolithPages.test.ts src/tests/monolithApiConfig.test.ts src/tests/mediaPlaybackTime.test.ts src/tests/finalizeRoundVideo.test.ts src/tests/nativeVideoRecorderCamera.test.ts src/tests/videoRecordingPanelCamera.test.tsx src/tests/onMediaLoadObjectUrl.test.ts src/tests/preferredCamera.test.ts src/tests/progressRing.test.ts
# Для smoke-тесту потрібен встановлений Playwright Chromium із системними бібліотеками:
MONOLITH_REQUIRE_QR=1 bash scripts/monolith.sh smoke
```

## Документація

- [MONOLITH.md](MONOLITH.md) — запуск, архітектурна база, перевірки та відомі обмеження.
- [Початкова специфікація](docs/monolith-specification.uk.md) — план, а не перелік реалізованих можливостей.
- [Походження коду](monolith.upstream.json) — pinned upstream commit і локальні патчі.
- [Android: медіа та відкриті проблеми](docs/android-media-status.uk.md).
- [Оригінальний README Telegram Web K](docs/UPSTREAM_README.md).
- [Шаблони upstream CI](docs/upstream-ci/README.md) — збережені як документація, не запускаються автоматично.

## Upstream та ліцензія

База: [morethanwords/tweb](https://github.com/morethanwords/tweb), commit `2e4bbb52b6aec5e95ee32e5c2882c1f05de32200`.

Ліцензія **GPL-3.0-only**, див. [LICENSE](LICENSE). Збережені авторські та ліцензійні повідомлення upstream. Відповідний код публічної збірки доступний за посиланням на її точний commit у `about.html`. Це не офіційний застосунок Telegram.
