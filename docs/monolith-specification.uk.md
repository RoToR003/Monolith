# 📘 MONOLITH (Моноліт): Технічна документація та архітектурна специфікація

**Версія документа:** 1.1  
**Кодова назва проєкту:** `Monolith` (Моноліт)  
**Цільова платформа:** iOS / iPadOS (PWA, Safari WebKit)  
**Масштаб навантаження:** До 100 активних користувачів  
**Модель розповсюдження:** Закритий (Private) GitHub-репозиторій + безкоштовна edge-інфраструктура ($0/міс)

---

## Зміст
1. [Загальний огляд та аналіз здійсненності (Feasibility Study)](#1-загальний-огляд-та-аналіз-здійсненності)
2. [Вибір базового коду (Upstream Core)](#2-вибір-базового-коду-upstream-core)
3. [Матриця портування функцій (AyuGram → Monolith)](#3-матриця-портування-функцій-ayugram--monolith)
4. [Архітектура системи та безкоштовний хостинг (≤100 користувачів)](#4-архітектура-системи-та-безкоштовний-хостинг-100-користувачів)
5. [Інженерія під iOS WebKit / PWA (Критичні механізми стабільності)](#5-інженерія-під-ios-webkit--pwa)
6. [Специфікація кодової бази, конфігів та баз даних](#6-специфікація-кодової-бази-конфігів-та-баз-даних)
7. [Безпека, конфіденційність та Telegram ToS](#7-безпека-конфіденційність-та-telegram-tos)
8. [Покрокова інструкція розгортання (Deployment & CI/CD)](#8-покрокова-інструкція-розгортання-deployment--cicd)
9. [Дорожня карта розробки (Roadmap: MVP → v1.0)](#9-дорожня-карта-розробки-roadmap-mvp--v10)

---

## 1. Загальний огляд та аналіз здійсненності

**Monolith (Моноліт)** — це прогресивний вебдодаток (PWA), що переносить філософію та розширений функціонал клієнта **AyuGram** (Ghost Mode, Anti-Recall / локальне збереження видалених повідомлень та історії редагувань, фільтри контенту, обхід обмежень копіювання, режим стрімера, кастомізація, переклад) на **iOS** без App Store, розробницьких сертифікатів, 7-денного перепідписання AltStore/SideStore або Jailbreak.

### 1.1. Реалістичність порту через PWA на iOS
Завдяки розвитку WebKit (починаючи з iOS 16.4, де з'явився Web Push та Badging API, і до iOS 26, де вебдодатки на робочому столі запускаються як автономні застосунки), PWA на iPhone здатен замінити нативний клієнт для більшості завдань. Однак WebKit накладає низку архітектурних обмежень:

1. **Фонове виконання (Background Execution):** iOS призупиняє виконання JavaScript та розриває WebSocket-з'єднання незабаром після згортання PWA або блокування екрана; `Background Sync` у Safari відсутній.
   * *Наслідок для Monolith:* Якщо співрозмовник надіслав повідомлення й видалив його, поки iPhone заблокований, локальний PWA не зможе перехопити його напряму по WebSocket — це вирішується перехопленням тексту в Service Worker через Web Push або опціональним фоновим демоном **MonolithWatcher**.
2. **Обмеження протоколу Telegram Web:** Офіційні вебклієнти не підтримують секретні чати (MTProto E2EE Secret Chats), а дзвінки не інтегруються в системний інтерфейс Apple CallKit на екрані блокування.
3. **Апаратний доступ:** Неможливо системно детектувати запис екрана чи OBS, встановлювати довільні системні шрифти поза бандлом або реєструвати нативний iOS Share Extension (поширення контенту з інших програм *у* Monolith здійснюється через буфер обміну чи системний вибір файлів).

**Підсумок:** Через PWA на iOS стабільно переноситься **~85–90% функціоналу AyuGram**, а критичні фонові сценарії (100% Anti-Recall та крос-пристрійна синхронізація) закриває легкий безкоштовний бекенд.

---

## 2. Вибір базового коду (Upstream Core)

Писати MTProto-клієнт з нуля недоцільно та небезпечно з точки зору стабільності. Обидва офіційні вебклієнти Telegram розповсюджуються під ліцензією **GPL v3**:

| Критерій | **Telegram Web K (`morethanwords/tweb`)** | **Telegram Web A (`Ajaxy/telegram-tt`)** |
| :--- | :--- | :--- |
| **Стек технологій** | TypeScript, власний реактивний DOM + **SolidJS**, Vite | TypeScript, Teact (кастомний VDOM), кастомний GramJS |
| **Споживання RAM на iOS** | Нижче (відсутність важкого VDOM критична для WebKit, який аварійно перезавантажує вкладки при перевищенні пам'яті) | Вище при довгому скролі медіаканалів |
| **Готова PWA-база** | Вбудований `sw.ts` Service Worker, Web Push, керування сховищем, `tlottie`, `opus-recorder`, `Mediabunny` | Є Web Push, але складніша архітектура оновлень |
| **Мультиакаунтність** | Нативно підтримується (розширюється під вимоги AyuGram) | Потребує глибшого перероблення |
| **Модульність для форку** | Зручна структура менеджерів і воркерів | Сильна зв'язаність навколо VDOM-стану |

### Рішення: **Fork `morethanwords/tweb` (Telegram Web K)**
Уся логіка **Monolith** ізолюється в каталозі `src/monolith/` та підключається до ядра `tweb` через єдиний фасад точок входу `MonolithHooks`. Такий підхід дозволяє регулярно підтягувати upstream-оновлення Telegram без масових конфліктів злиття.

### Ліцензія GPL v3
Код `morethanwords/tweb` має ліцензію **GPL v3**. При використанні форку в закритому репозиторії *суто для внутрішньої приватної групи* (без публічної дистрибуції коду третім особам) обов'язок публікації сирцевого коду зазвичай не настає або мінімізується залежно від моделі доступу; у разі публічного відкриття проєкту ви зобов'язані надати доступ до зміненого коду під GPL v3.

---

## 3. Матриця портування функцій (AyuGram → Monolith)

### 3.1. Режим привида (`MonolithGhost`)
| Функція AyuGram | Статус | Спосіб реалізації в Monolith (на базі `tweb`) |
| :--- | :---: | :--- |
| Не читати повідомлення (PP, групи, канали, теми, реакції) | 🟢 **100%** | Перехоплення `messages.readHistory`, `channels.readHistory`, `messages.readMessageContents`, `messages.readMentions`, `messages.readReactions` у `apiManager`. Оновлення лічильників лише локально в IndexedDB. |
| Не читати сторіз (Stories) | 🟢 **100%** | Блокування RPC `stories.readStories` та `stories.incrementStoryViews` + попередження перед першим відкриттям. |
| Не надсилати онлайн-статус / миттєвий вихід в офлайн | 🟢 **100%** | Блокування `account.updateStatus({ offline: false })`. Після відправки повідомлення негайний виклик `account.updateStatus({ offline: true })`. |
| Не надсилати статус активності (набір, ГС, вибір стікера, ігри) | 🟢 **100%** | Перехоплення та ігнорування всіх `messages.setTyping`. |
| Не накручувати перегляди постів у каналах | 🟢 **100%** | Передача `increment: false` у `messages.getMessagesViews`. |
| Відправка через відкладене повідомлення (щоб не блимати онлайном) | 🟢 **100%** | При активному повному Ghost Mode автоматичне додавання `schedule_date`: `+12 с` для тексту або динамічна формула `Math.max(6, Math.ceil(fileSize / 1048576 * 4.5))` для медіа (крім Вибраного). |
| Явне «Прочитати до цього місця» / «Read on Interact» | 🟢 **100%** | Окремий пункт контекстного меню повідомлення для точкової синхронізації на сервер або опціональне читання при взаємодії. |
| Індикатор `👻` у хедері та швидкий перемикач | 🟢 **100%** | Кнопка в шапці списку чатів та у свайп-меню. |

### 3.2. Історія повідомлень та Anti-Recall (`MonolithHistory`)
| Функція AyuGram | Статус | Спосіб реалізації |
| :--- | :---: | :--- |
| Збереження видалених повідомлень (відображення на місці з кастомним бейджем і прозорістю) | 🟡 **Гібрид (90–100%)** | Перехоплення `updateNewMessage` і `updateDeleteMessages` -> запис у базу `MonolithHistoryDB` (відокремлену від медіакешу `tweb`, щоб очищення кешу не знищувало історію). У фоні: кешування з Web Push у `sw.ts` + опціональний *MonolithWatcher*. |
| Історія редагувань повідомлень | 🟡 **Гібрид** | Перехоплення `updateEditMessage` -> збереження версій тексту/медіа з таймштампами у масив `editHistory`. |
| Збереження чатів, де вас забанили або кікнули | 🟢 **100%** | При отриманні `CHANNEL_PRIVATE` локальна історія діалогу заморожується з міткою `archived_banned` у розділі «Збережені чати». |
| Збереження медіа та TTL (самознищуваних фото/відео) | 🟡 **Адаптовано** | Кнопка примусового збереження / ігнорування локального знищення (Expire button) для відкритих TTL-медіа; збереження кешованих картинок/ГС в окремому ObjectStore IndexedDB. |
| Відповідь (Reply) на видалене повідомлення | 🟢 **100%** | Зняття серверного `reply_to_msg_id` (щоб не втратити зв'язок) і вставка згорнутої цитати `> [Оригінал]` перед текстом відповіді. |

### 3.3. Фільтри, Приватність та Безпека (`MonolithFilter` & `MonolithPriv`)
| Функція AyuGram | Статус | Спосіб реалізації |
| :--- | :---: | :--- |
| Regex-фільтри (приховати, заблюрити, замінити) + виключення + JSON імпорт/експорт | 🟢 **100%** | Виконання у Web Worker з таймаутом захисту від ReDoS. |
| Повне приховування заблокованих користувачів (повідомлення, реплаї, реакції) | 🟢 **100%** | Фільтрація на рівні SolidJS-компонентів чату і модалок реакцій. |
| Вирізання реклами (Sponsored Messages) та промо Premium | 🟢 **100%** | Заглушка `messages.getSponsoredMessages` та приховування промо-елементів у UI. |
| Обхід заборони копіювання і завантаження (`noforwards`) | 🟢 **100%** | Ігнорування прапора `noforwards` при виділенні тексту і збереженні файлів через Blob / iOS Share Sheet (`navigator.share`). Дія «Копіювати й надіслати без цитати». |
| Режим стрімера (Streamer Mode) | 🟢 **100%** | Розмиття прев'ю, приховування номера телефону, маскування імен, блокування спливаючих сповіщень. *Автовиявлення програм запису на iOS неможливе.* |
| Локальні псевдоніми (Local Alias) | 🟢 **100%** | Локальна заміна імені контакту/каналу без зміни в телефонній книзі чи на сервері. |
| Очищення URL (`utm_*`, `fbclid`, `igsh`) + лінк-правила | 🟢 **100%** | Санітизація посилань при кліку та копіюванні. |
| Пошук профілю за User ID (`tg://user?id=...`) | 🟢 **100%** | Локальний кеш бачених юзерів + фолбек через `@tgdb_bot` за запитом користувача. |
| Сповіщення за ключовими словами (навіть у зам'ючених чатах) | 🟡 **Адаптовано** | У реальному часі в активному PWA; у фоні — через *MonolithWatcher*. |
| Блокування додатку + Приховані акаунти | 🟢 **100%** | PIN-код + **нативний Face ID / Touch ID через WebAuthn API** у Safari. |
| Скріншоти в секретних чатах | 🔴 **Неможливо** | Секретні чати відсутні в протоколі Telegram Web. |

### 3.4. Інтерфейс, Композинг, Медіа та Переклад (`MonolithUX`, `MonolithAppear`, `MonolithTrans`)
| Функція AyuGram | Статус | Спосіб реалізації |
| :--- | :---: | :--- |
| Локальний Telegram Premium | 🟡 **Частково** | Розблокування локальних іконок, лімітів закріплених чатів, прибирання рекламних блоків. Серверні ліміти (4 ГБ, зірки, преміум-реакції) не обходяться, проте **переклад** і **Voice-to-Text** замінюються через Cloudflare Worker API. |
| Message Details + Callback Data + Дата реєстрації | 🟢 **100%** | Інспектор сирого TL-дампу, DC ID, часу до секунд, `callback_data` інлайн-кнопок + інтерполяція дати реєстрації за точками ID. |
| Забрати кольорові цитати/реплаї («Simple quotes & replies») | 🟢 **100%** | CSS/компонентний перемикач для спрощення цитат. |
| Відключення/згортання «Схожих каналів» (Similar Channels) | 🟢 **100%** | Приховування вкладки та блоків рекомендацій. |
| Повтор (Repeat) / Без автора / Copy as Markdown / Confirmations | 🟢 **100%** | Додаткові пункти меню, підтвердження відправки стікера/GIF/ГС/дзвінка. |
| Скріншот повідомлень («Message Shot») | 🟢 **100%** | Генерація стилізованої картки вибраних повідомлень через HTML5 Canvas + збереження у Фото iOS. |
| Переклад (Google / DeepL / OpenAI / Gemini) + Voice-to-Text | 🟢 **100%** | Через serverless-проксі на Cloudflare Workers (обхід CORS + підтримка Groq/OpenAI Whisper). |
| Шумодав для голосових (RNNoise) | 🟢 **100%** | `AudioWorklet` + WebAssembly RNNoise перед кодуванням в `opus-recorder`. |
| Кастомізація під iOS (AMOLED, широкі повідомлення каналів, шрифт mono, прибрати папку «Всі чати», без затримки сповіщень) | 🟢 **100%** | Повна SCSS-темізація, запам'ятовування позиції скролу в чатах, розширення ліміту акаунтів. |
| Синхронізація (`AyuSync` → `MonolithSync`) | 🟢 **100%** | E2EE-синхронізація налаштувань, локальних прочитань і видалених повідомлень через Cloudflare D1. |

---

## 4. Архітектура системи та безкоштовний хостинг (≤100 користувачів)

### 4.1. Хостинг фронтенду з закритого GitHub-репозиторію
> ⚠️ **Чому не GitHub Pages?** На безкоштовному плані GitHub Pages не підтримує деплой із закритих (Private) репозиторіїв і має ліміт розміру сайту в 1 ГБ.

**Оптимальне рішення ($0/міс) — Cloudflare Pages:**
* Підтримує пряме підключення як до публічних, так і до **закритих (Private) GitHub-репозиторіїв** без платної підписки.
* **Офіційні ліміти Cloudflare Pages Free (2026):**
  * Запити та трафік на статичні файли (JS, CSS, WASM, іконки): **безлімітні та безкоштовні** (на відміну від ліміту 100 ГБ у Vercel Hobby або кредитної моделі Netlify).
  * Збірки: **500 збірок/місяць** (таймаут білду 20 хв).
  * Розмір сайту: до **20 000 файлів**, до **25 MiB** на файл.
  * Автоматичний HTTPS/TLS, HTTP/3, глобальний CDN (300+ локацій) та необмежені Preview-деплої для гілок.

### 4.2. Архітектура бекенду («MonolithBackend») на безкоштовних ресурсах
Весь месенджерний трафік (повідомлення, медіа, файли) йде **напряму з iPhone на дата-центри Telegram по MTProto WebSocket (`wss://*.web.telegram.org`)**, не навантажуючи ваш сервер.

Безкоштовні edge-скрипти на **Cloudflare Workers + Cloudflare D1** потрібні лише для сервісних завдань:

```text
┌─────────────────────────────────────────────────────────────────────────┐
│                    ЗАКРИТИЙ РЕПОЗИТОРІЙ GITHUB                         │
│        (src/tweb + src/monolith + workers/ + .github/workflows)         │
└───────────────────┬─────────────────────────────────┬───────────────────┘
                    │ Auto-deploy on push             │ Wrangler Deploy
                    ▼                                 ▼
┌───────────────────────────────────┐ ┌───────────────────────────────────┐
│     CLOUDFLARE PAGES (Free)       │ │    CLOUDFLARE WORKERS (Free)      │
│  Статика PWA + SW + WASM + Assets │ │  100,000 req/day · Edge API:      │
│  (Unlimited bandwidth, HTTPS)     │ │  • /api/translate (CORS proxy)    │
└───────────────────┬───────────────┘ │  • /api/stt (Whisper proxy)       │
                    │                 │  • /api/link-meta (Preview fixer) │
                    │                 │  • /api/sync (MonolithSync E2EE)  │
                    │                 │  • /api/push/* (Push Gateway)     │
                    │                 │  • /api/version (Force SW update) │
                    │                 └─────────────────┬─────────────────┘
                    │                                   │
                    ▼                                   ▼
┌───────────────────────────────────┐ ┌───────────────────────────────────┐
│     iPhone / iPad (iOS PWA)       │ │      CLOUDFLARE D1 (SQLite)       │
│  • SolidJS UI + MonolithHooks     │ │  Free: 5M reads/d, 100k writes/d, │
│  • IndexedDB (MonolithHistoryDB)  │ │  500 MB/DB · 7d Time Travel       │
│  • Service Worker (Push + Cache)  │ └───────────────────────────────────┘
└───────────────────┬───────────────┘                   ▲
                    │ Direct MTProto WSS                │ Опціонально (100% Anti-Recall
                    ▼                                   │ коли iOS заблоковано)
┌───────────────────────────────────┐ ┌─────────────────┴─────────────────┐
│    TELEGRAM DATA CENTERS (DC1-5)  │◄┤  MONOLITH WATCHER (Опц. $0)       │
│    wss://*.web.telegram.org       │ │  Oracle Cloud Always Free (ARM)   │
└───────────────────────────────────┘ │  або Self-hosted + CF Tunnel      │
                                      └───────────────────────────────────┘
```

#### Розрахунок навантаження для 100 користувачів (перевірка квот 2026 року):
* **Cloudflare Workers Free (`100 000` запитів/день, `10 мс` CPU на виклик):**
  * 100 користувачів × ~50 сервісних викликів/день (переклад, sync-батчі, перевірка версії, пуші) = **~5 000 запитів/день** (**5% від квоти**).
* **Cloudflare D1 Free (`5 000 000` читань/день, `100 000` записів/день, `500 MB` макс. на базу / `5 GB` на акаунт, `7 днів` Time Travel):**
  * Важлива особливість D1 (діє з 1 вересня 2026): при перевищенні добового ліміту записів/читань запити блокуються до `00:00 UTC`, а кожен індекс у таблиці додає +1 рядок запису при `INSERT`. Також ліміт на 1 виклик Worker становить 50 запитів.
  * *Оптимізація Monolith:* Всі синхронізації об'єднуються клієнтом у пачки й записуються через `db.batch()`, який рахується як **один** запит на виклик. При батчінгу 100 юзерів генерують **<10 000 записів/день** (<10% ліміту), а за рік з ротацією старих записів (30–60 днів) база займає **150–300 MB** (<500 MB ліміту на одну БД).
* *Чому не альтернативи?* **Supabase Free** зупиняє (pauses) проєкт через 7 днів неактивності. **Render Free** засинає через 15 хв без трафіку, а безкоштовна БД Postgres на Render видаляється через 30 днів. Cloudflare Workers + D1 працюють без засинання.

### 4.3. Стратегії фонового перехоплення видалень на iOS
1. **Рівень 1 — «Zero-Server» (Стандарт для всіх 100 користувачів):**
   * При активному PWA все логується локально в реальному часі.
   * При згорнутому/заблокованому iPhone Service Worker під час отримання Web Push (`push` event) перехоплює текст і метадані повідомлення з пейлоаду та **миттєво зберігає сніппет у IndexedDB до виклику `showNotification()`**. Це покриває всі незам'ючені чати без жодного фонового сервера.
2. **Рівень 2 — «MonolithWatcher» (Опціональний 24/7 демон для 100% Anti-Recall):**
   * Потрібен лише тим, хто хоче перехоплювати видалення у **зам'ючених чатах/каналах**, фонові редагування або медіа при повністю вимкненому iPhone.
   * Легкий Node.js (GramJS) або Python (Telethon) сервіс, який тримає сесію слухача 24/7 і пише зашифровані дифи в D1.
   * **Безкоштовний хостинг для MonolithWatcher:**
     * **Oracle Cloud Always Free (Ampere A1 ARM):** Після урізання лімітів у червні 2026 року безкоштовна квота складає **2 ARM OCPUs та 12 GB RAM** (1 500 OCPU-год і 9 000 GB-год на місяць), плюс 200 GB диска і 10 TB вихідного трафіку. Цього з запасом вистачає на десятки/сотню легких слухачів (~1.5 GB RAM). *Застереження:* потрібна реальна банківська картка при реєстрації (віртуальні не приймаються) та підтримка мінімальної активності проти автовидалення неактивних ВМ.
     * **Власний ПК / Raspberry Pi + Cloudflare Tunnel (`cloudflared`):** Безкоштовно, без відкриття портів і без сторонньої довіри до хмар.
     * *(Render і Koyeb для 24/7 демона не підходять: Render засинає через 15 хв, Koyeb має $29 холд при реєстрації з 2026 року, ліміт 550 год/міс і сон через 1 год).*
   * **Політика безпеки:** Передача MTProto `auth_key` на сторонній сервер несе ризики, тому `MonolithWatcher` має бути **суворо опціональним (opt-in)** із можливістю для кожного юзера підняти свій власний екземпляр.

---

## 5. Інженерія під iOS WebKit / PWA

### 5.1. Миттєве відновлення сокета після сну (`iOS Socket Recovery`)
Після згортання PWA на iOS система заморожує TCP-сокети. При розгортанні інтерфейс Telegram Web часто «висить» 20–40 секунд, очікуючи таймауту мертвого WebSocket.
* **Рішення у Monolith:**
  1. Підписка на `document.visibilitychange` та `window.pageshow`.
  2. Якщо час сну перевищив `10 с`, при поверненні у `visible` негайно надсилається `ping_delay_disconnect` із жорстким таймаутом `1500 мс`.
  3. За відсутності відповіді старий WebSocket примусово знищується (`terminate`), ініціюється нове з'єднання та миттєво викликається `updates.getDifference()`.

### 5.2. Захист від OOM-крашів Safari (Керування RAM)
WebKit на iOS примусово перезавантажує вкладку/PWA при перевищенні ~1–1.5 GB оперативної пам'яті.
* **Заходи у Monolith:**
  1. Обов'язкове звільнення `URL.revokeObjectURL()` для зображень, прев'ю та аватарів одразу після виходу з вікна віртуального скролу (±15 повідомлень).
  2. Ліміт одночасно активних `tlottie`/WebM стікерів на екрані (максимум 4–6 з паузою під час скролу).
  3. Важкі обчислення (MTProto-криптографія, regex-фільтрація, AES-GCM шифрування бекапів) виконуються у Web Workers.
  4. **Батчевий запис у IndexedDB:** На iOS часті поодинокі транзакції IDB спричиняють витік пам'яті в процесі `WebContent`. Всі логування історії буферизуються і скидаються раз на 1.5–2 с однією транзакцією.

### 5.3. Сховище IndexedDB та ізоляція між Safari і PWA
* **Квоти WebKit:** Починаючи з iOS 17+, ліміту в 50 MB більше не існує — браузер надає до **60% вільного місця на диску** для одного origin (або 15% для сторонніх WebView-додатків). Автовидалення через 7 днів (ITP) не застосовується до встановлених на робочий стіл PWA.
* **Головна пастка — Storage Isolation:** На iOS `localStorage`, `cookies` та `IndexedDB` у звичайній вкладці Safari та у встановленій з іконки PWA **повністю ізольовані**.
  * *Захист у Monolith (`InstallGuard.tsx`):* Якщо сайт відкрито в Safari (не в `standalone` режимі) — форма авторизації в Telegram блокується! Замість неї користувач бачить інтерактивну інструкцію: *«Натисніть Поділитися → На початковий екран (Add to Home Screen) і відкрийте Monolith з нової іконки, щоб не втратити сесію»* (адже `beforeinstallprompt` на iOS відсутній).
* **Захист від витіснення:** Одразу після логіну викликається `navigator.storage.persist()`. Бази розділено:
  * `monolith_core_db` — сесія, налаштування, текстова історія видалених повідомлень (легка, не очищується).
  * `tweb_media_cache` — медіафайли з автоматичною LRU-очисткою (ліміт задає користувач: 256 MB / 512 MB / 1 GB).

### 5.4. Web Push на iOS (`web.push.apple.com`)
1. **Активація:** Дозвіл `Notification.requestPermission()` запитується **тільки** всередині встановленого PWA і **лише за прямим натисканням кнопки** користувачем.
2. **Вимога VAPID `sub`:** Сервер Apple Push повертає помилку **`403 BadJwtToken`**, якщо `sub` у VAPID має домен `@localhost`. Потрібен реальний `mailto:monolith@yourdomain.com` або `https://monolith.yourdomain.com`.
3. **Уникнення відкликання підписки (Пастка «тихих пушів»):**
   * iOS WebKit припиняє доставку push-сповіщень, якщо Service Worker отримує кілька подій `push` поспіль без виклику `self.registration.showNotification()`.
   * *Рішення:* При `account.registerDevice` обов'язково передавати `no_muted: true`, щоб Telegram не слав пуші по зам'ючених чатах. Для сервісних пушів (напр. `MESSAGE_DELETED`): при використанні `token_type = 4` (Simple Push через Cloudflare Worker) Worker сам фільтрує порожні події, а при `token_type = 10` (прямий Web Push) SW показує інформаційний банер (напр. *«Monolith: Повідомлення видалено й збережено в архів»*), не залишаючи `push` без `showNotification`.
   * Також слід оновлювати реєстрацію пристрою через `account.registerDevice` не рідше ніж раз на 24 години або при кожному старті додатку.

### 5.5. Нативний UI/UX під iPhone
* **Dynamic Island та Safe Areas:** `viewport-fit=cover` + скрізне використання `env(safe-area-inset-top)` та `env(safe-area-inset-bottom)`.
* **Виправлення зуму інпутів і клавіатури:** Мінімальний розмір шрифту в полях вводу `16px` (щоб Safari не зумив сторінку при фокусі), висота контейнера `100dvh` + обробник `window.visualViewport.resize` для коректної фіксації верхньої шапки чату при відкритій клавіатурі.
* **Жести:** Перехоплення горизонтального свайпу від лівого краю (`x < 28px`) для плавного повернення з чату в список діалогів без конфлікту з системним жестом Safari.

---

## 6. Специфікація кодової бази, конфігів та баз даних

### 6.1. Структура закритого репозиторію
```text
monolith/
├── .github/
│   └── workflows/
│       ├── ci-check.yml             # Typecheck, lint, unit-тести модулів Monolith
│       └── upstream-sync.yml        # Щотижнева перевірка нових комітів morethanwords/tweb
├── public/
│   ├── manifest.webmanifest         # Конфігурація PWA (standalone, іконки)
│   ├── _headers                     # Правила заголовків Cloudflare Pages (CSP, SW scope)
│   └── assets/
│       ├── regdate_points.json      # Точки інтерполяції для оцінки дати реєстрації User ID
│       └── wasm/rnnoise.wasm        # WASM-шумодав для голосових повідомлень
├── src/
│   ├── ... (ядро tweb)
│   └── monolith/                    # ІЗОЛЬОВАНИЙ ПРОШАРОК MONOLITH
│       ├── core/
│       │   ├── MonolithHooks.ts     # Єдина точка інтеграції з tweb
│       │   ├── MonolithStorage.ts   # Обгортка над MonolithHistoryDB (IndexedDB + AES-GCM)
│       │   └── MonolithConfig.ts    # Типізована схема налаштувань (імпорт/експорт JSON)
│       ├── features/
│       │   ├── ghost/               # GhostModeManager (read, typing, online, views, 12s schedule)
│       │   ├── history/             # AntiRecall, EditHistory, BannedChatArchiver, TTL-захист
│       │   ├── filters/             # Regex Web Worker, HiddenUsers, SponsorBlocker, KeywordAlerts
│       │   ├── privacy/             # StreamerMode, WebAuthnFaceID, HiddenAccounts, LinkCleaner
│       │   ├── translate/           # Клієнт перекладу + Whisper STT
│       │   └── sync/                # MonolithSync клієнт (E2EE sync із Cloudflare D1)
│       ├── ios/
│       │   ├── InstallGuard.tsx     # Виявлення Safari vs Standalone та гайд встановлення
│       │   ├── SocketRecovery.ts    # Обробник visibilitychange + швидкий ping/reconnect
│       │   └── Gestures.ts          # Свайп назад та адаптація під visualViewport
│       └── ui/
│           ├── MonolithSettings.tsx # Екран налаштувань Моноліту (SolidJS)
│           ├── MessageDetails.tsx   # Інспектор TL-дампів, callback_data, regdate
│           ├── DeletedViewer.tsx    # Окрема панель/чат для видалених повідомлень
│           ├── MessageShot.tsx      # Генератор скріншотів-карток на Canvas
│           └── themes/              # iOS Glass / True AMOLED / Monolith Dark
├── workers/                         # СЕРВЕРЛЕС СКРИПТИ (Cloudflare Workers)
│   ├── wrangler.toml
│   ├── src/
│   │   ├── index.ts                 # Hono-роутер (CORS, Rate Limiter, Access Gate)
│   │   ├── routes/translate.ts      # Проксі перекладу й Whisper STT
│   │   ├── routes/sync.ts           # MonolithSync E2EE CRUD у D1
│   │   ├── routes/push.ts           # Push Gateway для token_type=4 -> Web Push
│   │   └── routes/meta.ts           # Версія SW + виправлення прев'ю посилань
│   └── migrations/
│       └── 0001_init.sql
└── tools/
    └── watcher/                     # Опціональний Docker-пакет MonolithWatcher
```

### 6.2. Приклади ключових конфігів

#### `public/manifest.webmanifest`
```json
{
  "name": "Monolith",
  "short_name": "Моноліт",
  "description": "Приватний Telegram Web-клієнт з розширеним контролем та історією",
  "start_url": "/?source=pwa",
  "scope": "/",
  "display": "standalone",
  "orientation": "portrait",
  "background_color": "#000000",
  "theme_color": "#000000",
  "icons": [
    { "src": "/assets/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/assets/icons/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable" }
  ]
}
```

#### `public/_headers` (Cloudflare Pages, до 100 правил)
```text
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Content-Security-Policy: default-src 'self'; connect-src 'self' wss://*.web.telegram.org https://*.web.telegram.org https://api.monolith.yourdomain.com; img-src 'self' blob: data: https:; media-src 'self' blob: data:; worker-src 'self' blob:; style-src 'self' 'unsafe-inline';

/sw.js
  Cache-Control: no-cache, no-store, must-revalidate
  Service-Worker-Allowed: /
```

### 6.3. Схема локальної та хмарної БД

**IndexedDB (`MonolithHistoryDB`):**
* `messages_archive`: ключ `[accountId, dialogId, msgId]` -> `rawTL` (стиснутий буфер), `text`, `editHistory[]`, `isDeleted`, `deletedAt`, `savedAt` (індекси `by_dialog_deleted`, `by_savedAt`).
* `media_vault`: ключ `[accountId, mediaId]` -> `encryptedBlob`, `mimeType`, `size`, `createdAt`.
* `local_read_states`: ключ `[accountId, dialogId]` -> `localReadMaxId`, `serverReadMaxId`.

**Cloudflare D1 (`workers/migrations/0001_init.sql`):**
*(Усі `encrypted_payload` шифруються на клієнті алгоритмом AES-256-GCM перед відправкою; мінімум вторинних індексів для економії ліміту записів D1).*

```sql
CREATE TABLE users (
    sync_id TEXT PRIMARY KEY,
    created_at INTEGER NOT NULL,
    last_seen_at INTEGER NOT NULL
);

CREATE TABLE sync_blobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sync_id TEXT NOT NULL,
    category TEXT NOT NULL,            -- 'settings' | 'ghost_reads' | 'deleted_batch' | 'filters'
    cursor_ts INTEGER NOT NULL,
    encrypted_payload BLOB NOT NULL,
    FOREIGN KEY (sync_id) REFERENCES users(sync_id) ON DELETE CASCADE
);
CREATE INDEX idx_sync_lookup ON sync_blobs(sync_id, category, cursor_ts);

CREATE TABLE push_subscriptions (
    device_hash TEXT PRIMARY KEY,
    endpoint TEXT NOT NULL,
    p256dh TEXT NOT NULL,
    auth TEXT NOT NULL,
    hook_token TEXT UNIQUE NOT NULL,
    updated_at INTEGER NOT NULL
);
```

---

## 7. Безпека, конфіденційність та Telegram ToS

### 7.1. Контроль доступу для групи до 100 осіб
Навіть якщо код лежить у закритому GitHub-репозиторії, URL вашого деплою на Cloudflare Pages публічно доступний у мережі. Щоб сторонні люди не витрачали квоти ваших Workers (переклад, STT, D1):
* Додайте **Invite-Gate / Token Gate** на рівні Cloudflare Worker (користувач один раз вводить виданий адміном інвайт-код, після чого отримує підписаний `HttpOnly` cookie / Bearer-токен для доступу до `/api/*`).
* Для додаткового захисту адмінки або тестових гілок використовуйте безкоштовний план **Cloudflare Zero Trust Access** (до 50 користувачів безкоштовно).

### 7.2. Протокол Telegram, `API_ID` та захист акаунту
У документації AyuGram прямо вказано, що функції Ghost Mode та збереження видалених повідомлень порушують Developer ToS Telegram:
1. **Вибір ключів:**
   * *Власний `API_ID` / `API_HASH` з `my.telegram.org` (рекомендовано для стабільності):* дозволяє легально працювати з `token_type = 4` (Simple Push) на власному Push Gateway і виключає раптове блокування публічних ключів. У списку сесій відображатиметься `Monolith Web`.
   * *Публічні ключі `tweb`:* сесія маскується під `Telegram Web K` (аналогічно підходу AyuGram з офіційними ключами) і працює вбудований `token_type = 10`, але це порушує правила розробників і несе ризики в разі зміни політик Telegram.
2. **Анти-фрод (`FLOOD_WAIT`):** Масові дії (очищення старих чатів, пакетне видалення своїх повідомлень у групах, масовий експорт історії) у коді Monolith повинні бути примусово обмежені затримкою 1000–1500 мс між запитами.

---

## 8. Покрокова інструкція розгортання (Deployment & CI/CD)

1. **Ініціалізація закритого репозиторію:**
   * Створіть **Private** репозиторій `monolith` на GitHub.
   * Зробіть дзеркальний імпорт `morethanwords/tweb`, створіть гілки `main` (production) та `dev` (staging).
2. **Налаштування бекенду (`workers/`):**
   ```bash
   npm i -g wrangler
   npx wrangler login
   npx wrangler d1 create monolith-db
   # Вставте database_id у workers/wrangler.toml
   npx wrangler d1 migrations apply monolith-db --remote
   npx web-push generate-vapid-keys
   npx wrangler secret put VAPID_PRIVATE_KEY
   npx wrangler secret put VAPID_SUBJECT      # напр.: mailto:admin@yourdomain.com
   npx wrangler secret put INVITE_SECRET      # секрет для контролю доступу 100 юзерів
   npx wrangler deploy
   ```
3. **Підключення Cloudflare Pages до закритого GitHub:**
   * У панелі Cloudflare: *Workers & Pages → Create → Pages → Connect to Git*.
   * Надайте Cloudflare GitHub App доступ **лише до приватного репозиторію `monolith`**.
   * Параметри білду:
     * Build command: `pnpm install && pnpm build`
     * Output directory: `dist`
     * Environment variables: `VITE_TG_API_ID`, `VITE_TG_API_HASH`, `VITE_WORKER_URL`, `VITE_VAPID_PUBLIC_KEY`.
   * Підключіть власний домен (рекомендовано) або використовуйте `*.pages.dev`.
4. **Оновлення на iPhone користувачів:**
   * Після `git push` у `main` Cloudflare збирає та деплоїть нову версію за ~45 секунд.
   * `sw.js` завантажує нові чанки у фоні, а інтерфейс Monolith показує кнопку *«Доступне оновлення Моноліту — Перезавантажити»* (виклик `skipWaiting()`).

---

## 9. Дорожня карта розробки (Roadmap: MVP → v1.0)

* **Фаза 1: Стабільний iOS PWA Foundation (Тижні 1–2)**
  * Форк `morethanwords/tweb`, інтеграція фасаду `MonolithHooks`.
  * Налаштування закритого GitHub + Cloudflare Pages + Workers CI/CD.
  * Реалізація iOS-рівня: `InstallGuard` (блокування логіну до встановлення на робочий стіл), `100dvh` + `visualViewport` фікси, `SocketRecovery` по `visibilitychange`, `navigator.storage.persist()`, Web Push на `web.push.apple.com`.
* **Фаза 2: Ядро AyuGram — Ghost Mode & Anti-Recall (Тижні 3–5)**
  * Реалізація `MonolithGhost` (усі 7 режимів приховування + формула відкладеної відправки 12с + індикатор `👻`).
  * Реалізація `MonolithHistoryDB` (батчеве збереження, відображення видалених на місці, історія редагувань, реплаї на видалені, архів забанених чатів, перехоплення тексту з `push` у `sw.ts`).
* **Фаза 3: Фільтри, Приватність, UX та Edge Scripts (Тижні 6–8)**
  * Запуск Worker-ендпоінтів перекладу й Whisper STT, очищувач URL.
  * Regex-фільтри у Web Worker, блокування реклами/заблокованих користувачів, Streamer Mode, Face ID через WebAuthn, приховані акаунти.
  * Обхід `noforwards`, Message Details (TL + regdate + `callback_data`), Message Shot, TTL Expire button, RNNoise шумодав ГС, теми AMOLED/Glass.
* **Фаза 4: MonolithSync та Бета-тест на 100 користувачів (Тижні 9–10)**
  * Підключення E2EE синхронізації через Cloudflare D1.
  * Публікація опціонального Docker-образу `MonolithWatcher`.
  * Навантажувальне тестування на iPhone (перевірка RAM/OOM на довгих стрічках, тестування лімітів D1/Workers), реліз **Monolith v1.0**.