# Monolith — початкова база Telegram Web K

**Етап 0 · 19 листопада 2026**

Перенесено справжній вихідний код Telegram Web K, а не макет та не iframe офіційного сайту. Клієнт збирається з локальних TypeScript/Solid/SCSS-файлів і з’єднується з Telegram із браузера через upstream-реалізацію MTProto.

- Джерело: https://github.com/morethanwords/tweb
- Зафіксований commit: `2e4bbb52b6aec5e95ee32e5c2882c1f05de32200`.
- Робочий каталог у цьому середовищі: `/home/user/monolith`.
- GitHub: публічний `RoToR003/Monolith` (відкрито з дозволу власника), код у `monolith/baseline`; початкову `main` не змінено.
- HTTPS-сайт: **https://rotor003.github.io/Monolith/**, GitHub Pages через `.github/workflows/monolith-pages.yml`. Стару `gh-pages` збережено як резерв першої збірки. Це публічна тестова версія, не фінальний production-реліз. Налаштування та оновлення: `docs/github-pages.md`.
- Node.js `24.11.1`, pnpm `11.16.0`, оригінальний lockfile залежностей збережено.
- Ліцензія та авторські повідомлення upstream збережені; див. `LICENSE` і `README.md`.

## Запуск

```bash
cd /home/user/monolith
bash scripts/monolith.sh setup
bash scripts/monolith.sh serve
```

`setup` за потреби встановлює ізольовані Node.js/pnpm у кеш користувача, відновлює vendor-runtime та встановлює залежності за lockfile. Глобальні версії Node.js не змінюються.

`serve` запускає зібраний клієнт на `0.0.0.0:5173`; якщо збірки немає, спочатку створює її. В Arena користуйтеся **живим прев’ю Monolith**, а не файловим переглядом `index.html`. Для авторизації та сховища краще відкрити прев’ю в окремій вкладці.

Для роботи над кодом із Vite/HMR:

```bash
# Спершу зупиніть serve: два сервери не можуть займати порт 5173.
bash scripts/monolith.sh dev

# Через HTTPS-проксі Arena:
MONOLITH_PROXY_HTTPS=1 bash scripts/monolith.sh dev
```

Після зміни коду для статичного прев’ю повторіть `bash scripts/monolith.sh build` і оновіть сторінку. Не запускайте перебудову паралельно з важкими перевірками: середовище має приблизно 2 GiB RAM. Під час перебудови `dist/` тимчасово перестворюється.

За замовчуванням використовується полегшена **development-збірка без мінімізації**, з обмеженням heap і одним потоком Rolldown. Це не підготовлений production-реліз. На машині з більшим обсягом RAM можна увімкнути мінімізацію:

```bash
MONOLITH_OPTIMIZE=1 NODE_OPTIONS=--max-old-space-size=4096 bash scripts/monolith.sh build
```

## Авторизація й API-реквізити

У `.env` source tree upstream містяться його загальнодоступні development-реквізити для локальної тестової збірки. Публічний workflow **Monolith Pages** підставляє власні реквізити з repository secrets `TELEGRAM_API_ID` / `TELEGRAM_API_HASH`, перевіряючи формат та підключення в bundle без друку значень. Під час перевірки клієнт отримав QR-токен від Telegram, але **жодного користувацького акаунта не було авторизовано**.

Перед особистим використанням/розгортанням зареєструйте власний застосунок на https://my.telegram.org/apps, скопіюйте `.env.monolith.example` у `.env.local`, розкоментуйте та заповніть `VITE_API_ID` і `VITE_API_HASH`. Потім перебудуйте/перезапустіть клієнт.

Не надсилайте в чат коди входу, пароль двоетапної перевірки або дані сесії. Усі `VITE_*` змінні потрапляють у браузерний bundle, тому серверні секрети та токени там зберігати не можна. `.env.local` виключено з Git; статичний сервер не роздає вихідний код чи env-файли.

Прев’ю — середовище розробки, не приватний постійний хостинг. Не покладайтеся на незмінність його адреси або тривале збереження браузерної сесії. Для щоденного використання потрібні власний стабільний HTTPS-домен і перевірка безпеки.

## Що перевірено

- Збірка локального клієнта — успішна.
- Desktop Chromium: екран входу, **отримання й відображення справжнього QR-коду**, перехід до форми номера, перемикач теми.
- Mobile Chromium: форма входу на ширині 390 px, без горизонтального переповнення.
- У фінальному браузерному прогоні — без необроблених JavaScript-помилок і без помилок завантаження локальних ресурсів.
- Service Worker активувався; manifest завантажується. Це не підтвердження повної працездатності iOS PWA/Web Push.
- Unit-тести форматування номерів, upstream manifest, захисного патча вибору країни та нового Pages-пакування — **47/47 пройдено локально**.
- Vite dev-сервер також стартує: домен прев’ю приймається (`200`), сторонній невідомий Host відхиляється (`403`).
- HTTP-запити до `/.env`, `/.env.local`, `/.git/config`, `/src/index.ts`, `/package.json` на статичному сервері отримують `404`.

Браузерний звіт: `docs/baseline-verification.json`. **Повний typecheck не завершено через ресурсні обмеження цього sandbox. Повний набір upstream-тестів не запускався.** Авторизація з підтвердженням QR/кодом/2FA, чати після входу, реальний iPhone/Safari, встановлення на головний екран, дзвінки та push-сповіщення ще потребують окремої перевірки.

Повторення базових перевірок:

```bash
bash scripts/monolith.sh test src/tests/formatPhoneNumber.test.ts src/tests/webManifest.test.ts src/tests/monolithCountrySelection.test.ts src/tests/monolithPages.test.ts src/tests/monolithApiConfig.test.ts

# Для браузерних тестів потрібен Playwright Chromium з його системними бібліотеками.
# Після setup, з активним Node.js 24/pnpm 11:
# pnpm exec playwright install --with-deps chromium
MONOLITH_REQUIRE_QR=1 bash scripts/monolith.sh smoke

# Важка повна перевірка типів — краще на окремій машині з більшим RAM:
bash scripts/monolith.sh check
```

## Зміни порівняно з upstream

- Окремий `vite.monolith.config.ts`: назва вкладки Monolith, доступ через проксі Arena, конфігурація порту, Service Worker і low-memory збірка.
- `scripts/monolith.sh`: відтворюване встановлення й команди запуску/перевірки.
- `scripts/monolith-server.cjs`: статична роздача лише `dist/`, без серверного зберігання Telegram-сесій.
- `scripts/monolith-smoke.cjs`: перевірка неавторизованого інтерфейсу без введення номера чи збереження сесії.
- Малий захисний патч `src/components/countryInputField.ts`: невідома країна від nearest DC не спричиняє падіння форми входу; ручний вибір залишається доступним.
- `src/monolith/` зарезервовано для майбутніх модулів. Перехоплення RPC ще не додавалося.
- Початкову специфікацію з вкладення збережено в `docs/monolith-specification.uk.md`; її обіцянки не є звітом про реалізовані можливості.

Походження імпорту зафіксовано в `monolith.upstream.json`. Робоча Git-гілка `monolith/baseline` базується на наявній історії `RoToR003/Monolith`; початкова `main` залишається без змін. Застарілі готові bundles у корені `public/` пропущено; вихідний код, тести та статичні ресурси залишено. У sandbox незмінені публічні upstream binary blobs можуть підвантажуватися через upstream remote за потреби, щоб не дублювати їх у знімку середовища. Через правила збереження Arena vendor-файли з каталогів `dist/` і `out/` додатково упаковані в `assets/monolith/vendor-runtime.tar.gz` та автоматично відновлюються зі звіркою SHA-256. Пакети й кінцева `dist/` відновлюються командами запуску.

## GitHub Pages

Сайт збирається в `.cache/monolith-pages/site/` і публікується офіційним Pages artifact через Actions, зі збереженням source у `monolith/baseline`. Build job запускає вибрані тести; секрети доступні лише build-step. GPL і посилання на source commit доступні на сайті; вихідні ZIP/TAR-архіви на сайт не додаються.

```bash
bash scripts/monolith-pages.sh build
# Push у monolith/baseline тепер запускає workflow автоматично.
# За потреби окремої перезбірки через авторизований GitHub CLI:
bash scripts/monolith-pages.sh deploy
```

Деталі PWA scope, перевірок, обмежень і оновлення: `docs/github-pages.md`. Push у `monolith/baseline` запускає перевірки й публікацію автоматично; `main` не змінюється.

## Чого тут ще немає

Ghost Mode, Anti-Recall, історії редагувань Monolith, фільтрів, Watcher, проксі перекладу, власного push-relay, серверної синхронізації та повного брендингу PWA. Оригінальні назви й іконки Telegram усередині upstream-інтерфейсу поки залишено. GitHub Pages тепер надає стабільний HTTPS-хостинг публічної тестової збірки: https://rotor003.github.io/Monolith/. Це ще не фінальний production-реліз; хостинг не додає бекенд чи неперевірені можливості Monolith. Upstream CI збережено в `docs/upstream-ci/` як неактивні шаблони; окремий власний Pages workflow активний. Telegram application secrets введені власником у GitHub, їхні значення не копіюються в source-файли чи чат. Інші backend-інтеграції не створені.

Наступний крок — перевірити власну API-збірку на реальному Android/Chrome; iPhone/Safari — окремий подальший етап, після чого додавати налаштування Monolith і невеликі окремо протестовані модулі.

## Ліцензія

База має ліцензію GPL-3.0-only. Приватний репозиторій сам по собі не скасовує вимоги GPL при передачі копій іншим людям. Зберігайте ліцензійні повідомлення та виконуйте вимоги щодо відповідного вихідного коду для отримувачів розповсюджуваної версії.
