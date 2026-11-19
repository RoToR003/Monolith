# Monolith · GitHub Pages

**Налаштування: 19 листопада 2026 · публічна тестова версія.**

- Адреса: **https://rotor003.github.io/Monolith/**.
- Вихідний код: `monolith/baseline` у `RoToR003/Monolith`.
- Опубліковані статичні файли: окрема гілка **`gh-pages`**, каталог `/`.
- Початкова гілка **`main` не змінюється**.
- Репозиторій відкрито з дозволу власника. Публічні гілки, історію та документи можуть індексувати й копіювати сторонні; повернення в private не відкликає вже зроблені копії.

## Як побудовано хостинг

Це звичайний GitHub Pages **Deploy from a branch**, без власного Actions workflow. Після оновлення `gh-pages` GitHub автоматично публікує її вміст. `.nojekyll` вимикає Jekyll-перетворення вже зібраних файлів.

**Push у `monolith/baseline` сам собою не перебудовує сайт.** Для перенесення нової версії на сайт після commit/push потрібно виконати `deploy`, як описано нижче. Це не потребує OAuth-дозволу на створення workflow чи серверних секретів у репозиторії.

GitHub Pages роздає лише статичний браузерний клієнт через HTTPS. З’єднання MTProto/WebSocket встановлює сам клієнт до Telegram. Бекенд Monolith, push-relay, API-проксі чи серверне зберігання сесій тут не створені.

## Збірка та локальна перевірка

```bash
bash scripts/monolith.sh setup
bash scripts/monolith-pages.sh build
```

Файли створюються в **`.cache/monolith-pages/site/`**, окремо від звичайної `dist/`, тому поточне root-path прев’ю не замінюється. Після збірки автоматично перевіряються manifest, шляхи HTML-ресурсів, наявність Service Worker, GPL, точного source commit, відсутність symlink, env/session/source-map/source-archive файлів у сайті.

Для локального перегляду з тим самим префіксом, що й на GitHub:

```bash
# Після setup додайте ізольований Node.js до PATH, якщо системний Node застарілий:
export PATH="${XDG_CACHE_HOME:-$HOME/.cache}/monolith-toolchain/node_modules/.bin:$PATH"
MONOLITH_PAGES=1 MONOLITH_PORT=5175 node scripts/monolith-server.cjs
# http://localhost:5175/Monolith/
```

В Arena сервер потрібно запускати як довготривалий процес; він слухає `0.0.0.0`. Локальна перевірка не замінює перевірку опублікованого домену.

## Оновлення сайту

```bash
# Перебуваючи на monolith/baseline з чистим working tree:
git add <потрібні-файли>
git commit -m "Describe the change"
git push origin monolith/baseline
bash scripts/monolith-pages.sh deploy
```

Git має бути авторизований для push у `RoToR003/Monolith` через звичайний credential helper/SSH. Скрипт **не зберігає й не виводить токени**. Він:

1. Перевіряє чистий стан вихідного коду й те, що поточний source commit уже є на GitHub.
2. Збирає клієнт із base path `/Monolith/` та виконує перевірку артефакту.
3. Створює тимчасовий cache-only checkout `gh-pages`.
4. Робить звичайний commit/push готового сайту **лише в `gh-pages`**, без force-push і без змін `main`.
5. Залишає локальні результати в `.cache/monolith-pages/` і видаляє тимчасовий Git checkout.

Після push GitHub може витратити кілька хвилин на публікацію. Статус: **Settings → Pages** або стандартний запуск **pages build and deployment** у Actions. Домен стандартний, зовнішній DNS і платні послуги не потрібні.

## GPL без архівів на сайті

GPL-3.0-only та авторські повідомлення Web K збережено. На екрані входу є невелике посилання **«Monolith · код і GPLv3»** на `about.html`:

- посилання на **точний source commit** цієї збірки у відкритому GitHub-репозиторії;
- повний текст ліцензії у `LICENSE.txt`;
- опис походження, модифікацій, статусу тестової версії та команд збірки.

Окремі вихідні ZIP/TAR-архіви, вкладення Releases або download-пакети на сайті **не створюються**. Вже наявний `assets/monolith/vendor-runtime.tar.gz` — технічний файл вихідного репозиторію для відновлення vendored runtimes у sandbox; він **не входить до опублікованого сайту**.

Поки сайт доступний, відповідний source commit має залишатися доступним отримувачам збірки. Якщо згодом повертати репозиторій у private, спочатку потрібно залишити відповідний код доступним іншим способом або зупинити публічне розповсюдження цієї збірки. Саме закриття GitHub не відкликає вже отримані права та копії.

## PWA та межі підтримки

- Обидва кінцеві manifest мають назву Monolith, стабільний `id`, `scope` та `start_url` **`/Monolith/`**.
- Upstream manifest-файли у `public/` не переписуються; адаптація відбувається під час Pages-збірки.
- Claims на Telegram `t.me`/`telegram.me` видалені з manifest цієї незалежної збірки.
- `share_target` не рекламується: GitHub Pages не має POST-бекенду, а системний PWA-share-flow ще не перевірений.
- Service Worker збирається в корені `/Monolith/`, тому його project scope не потребує заголовка `Service-Worker-Allowed: /` від GitHub.
- `noindex, nofollow` просить пошуковики не індексувати тестові HTML-сторінки; це **не пароль і не контроль доступу**, а GitHub-репозиторій усе одно публічний.
- За замовчуванням збережено low-memory збірку без мінімізації для цього середовища; це не фінальна production-оптимізація.
- Сайт використовує загальнодоступні upstream development API defaults. Перед повноцінним особистим використанням потрібен власний Telegram API application і нова збірка.
- GitHub Pages не дає довільних HTTP-заголовків чи власного бекенду. iOS PWA, Web Push, дзвінки та робота після входу потребують окремого тестування.
- Проєктні шляхи на `rotor003.github.io` ділять один origin (зокрема IndexedDB/localStorage); не розміщуйте на ньому недовірені застосунки.

Це постійна адреса **тестової бази**, а не підтвердження готовності Monolith до щоденного використання.
