# Monolith

Початкова база PWA-клієнта для iOS/iPadOS на основі **Telegram Web K**.

> **Етап 0:** перенесено й запущено справжній Telegram Web K. Ghost Mode, Anti-Recall та інші розширення Monolith поки не реалізовані. Це середовище розробки, не готовий клієнт для щоденного використання.

Робоча гілка: **`monolith/baseline`**. Початкову гілку `main` та її історію під час імпорту не змінено.

## Відкрити сайт

**[Monolith · публічна тестова версія →](https://rotor003.github.io/Monolith/)**

HTTPS-хостинг: GitHub Pages, окрема гілка `gh-pages`. Репозиторій відкрито з дозволу власника. На екрані входу є посилання на GPLv3 і точний вихідний код збірки, без окремих архівів на сайті. `main` не використовується для публікації й не змінюється.

[Як оновлювати сайт та перевіряти збірку](docs/github-pages.md). Push коду в `monolith/baseline` сам собою не перебудовує сайт: після source commit/push виконайте `bash scripts/monolith-pages.sh deploy`.

Це тестова база зі загальнодоступними upstream development API defaults, не фінальний реліз для щоденного користування.

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

Перед особистим використанням/розгортанням отримайте власні `api_id` / `api_hash` на https://my.telegram.org/apps. Створіть `.env.local` за `.env.monolith.example`, заповніть значення, перебудуйте клієнт.

- `.env.local`, сесії, ключі, кеші й `node_modules` не входять у Git.
- У `.env` залишені **опубліковані upstream development-значення**, не особисті реквізити власника цього репозиторію.
- `VITE_*` видно в браузерному bundle: серверні секрети й токени там зберігати не можна.
- Не передавайте коди входу, паролі 2FA або дані Telegram-сесії в чат чи репозиторій.

## Перевірки та обмеження

Перевірено локальну збірку, отримання QR-токена Telegram, форми входу на desktop/mobile Chromium, Service Worker і **25 вибраних unit-тестів**.

Повний typecheck не завершено в обмеженому sandbox. Вхід у користувацький акаунт, реальний iPhone/Safari, встановлення PWA, чати після входу, дзвінки й push ще потребують перевірки. За замовчуванням збірка полегшена й без мінімізації.

```bash
bash scripts/monolith.sh test src/tests/formatPhoneNumber.test.ts src/tests/webManifest.test.ts src/tests/monolithCountrySelection.test.ts src/tests/monolithPages.test.ts
# Для smoke-тесту потрібен встановлений Playwright Chromium із системними бібліотеками:
MONOLITH_REQUIRE_QR=1 bash scripts/monolith.sh smoke
```

## Документація

- [MONOLITH.md](MONOLITH.md) — запуск, архітектурна база, перевірки та відомі обмеження.
- [Початкова специфікація](docs/monolith-specification.uk.md) — план, а не перелік реалізованих можливостей.
- [Походження коду](monolith.upstream.json) — pinned upstream commit і локальні патчі.
- [Оригінальний README Telegram Web K](docs/UPSTREAM_README.md).
- [Шаблони upstream CI](docs/upstream-ci/README.md) — збережені як документація, не запускаються автоматично.

## Upstream та ліцензія

База: [morethanwords/tweb](https://github.com/morethanwords/tweb), commit `2e4bbb52b6aec5e95ee32e5c2882c1f05de32200`.

Ліцензія **GPL-3.0-only**, див. [LICENSE](LICENSE). Збережені авторські та ліцензійні повідомлення upstream. Відповідний код публічної збірки доступний за посиланням на її точний commit у `about.html`. Це не офіційний застосунок Telegram.
