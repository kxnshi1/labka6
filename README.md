# Лабораторная работа №6 — PostgreSQL и CRUD для «АгроМаркета»

**Выполнил:** Tlekkabylov Demezhan  
**Тема:** PostgreSQL и CRUD для «АгроМаркета»

## Цель работы
Подключить PostgreSQL к Express, реализовать CRUD товаров и хранение заявок в базе данных.

## Выполненная работа
Создана база данных `agromarket` с таблицами `products` и `orders`. Добавлены SQL-запросы, маршруты `GET`, `POST`, `PUT`, `DELETE` и `PATCH`, обработка ошибок и Postman-коллекция для тестирования API.

### Структура проекта
- `agromarket-server/` — Express API, PostgreSQL, SQL-схема, маршруты и Postman-тесты.
- `agromarket-react/` — клиентская часть React + Vite (разработана в предыдущих лабораторных и используется для демонстрации).
- `agromarket-server/db/schema.sql` — таблицы `products` и `orders` и ограничения данных.
- `agromarket-server/db/seed.js` — создание таблиц и начальное заполнение.
- `agromarket-server/routes/products.js` — операции с товарами.
- `agromarket-server/routes/orders.js` — операции с заявками.
- `agromarket-server/postman/agromarket.postman_collection.json` — коллекция тестовых запросов.

## Использованные технологии
Node.js, Express, PostgreSQL, пакет `pg`, React, Vite, Postman, VS Code.

## Ход выполнения
1. Создана база PostgreSQL `agromarket`.
2. Подключение Express к PostgreSQL настроено через переменную `DATABASE_URL` и модуль `db/pool.js`.
3. Созданы таблицы `products` и `orders`. Для товаров предусмотрены ограничения цены; для заявок — минимальный объём 10 кг, допустимые статусы и связь с товаром.
4. Реализованы операции получения, создания, изменения и удаления товаров, а также создание заявок и изменение их статуса.
5. Добавлена обработка ошибок и проверка входных данных.
6. Подготовлена коллекция Postman и выполнен запуск тестов в Runner.

## Как запустить проект

### 1. PostgreSQL
Установить PostgreSQL, создать базу `agromarket`. В папке `agromarket-server` скопировать `.env.example` в `.env` и указать актуальные данные подключения, например:

```env
PORT=3000
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/agromarket
CORS_ORIGIN=http://localhost:5173
```

Не публиковать `.env` в GitHub.

### 2. Сервер Express
Открыть терминал в папке `agromarket-server`:

```bash
npm install
npm run db:init
npm run dev
```

**Важно:** `npm run db:init` пересоздаёт таблицы и удаляет ранее сохранённые заявки. Запускать при первоначальной настройке или только когда допустим сброс данных.

API: `http://localhost:3000`.

### 3. Клиент React
В другом терминале открыть `agromarket-react`:

```bash
npm install
npm run dev
```

Сайт: `http://localhost:5173`.

### 4. Postman
Импортировать файл `agromarket-server/postman/agromarket.postman_collection.json` в Postman и запустить коллекцию через Runner при работающем сервере и доступной БД.

## REST API

| Метод | Маршрут | Назначение | Ожидаемые статусы |
|---|---|---|---|
| GET | `/api/health` | Проверка работы API и БД | 200, 500 |
| GET | `/api/products?search=...` | Список и поиск товаров | 200 |
| GET | `/api/products/:id` | Получить товар | 200, 400, 404 |
| POST | `/api/products` | Создать товар | 201, 400 |
| PUT | `/api/products/:id` | Обновить товар | 200, 400, 404 |
| DELETE | `/api/products/:id` | Удалить товар | 204, 400, 404 |
| GET | `/api/orders` | Список заявок | 200 |
| POST | `/api/orders` | Создать заявку | 201, 400 |
| PATCH | `/api/orders/:id` | Изменить статус заявки | 200, 400, 404 |

## Результаты тестирования
В соответствии с отчётом DOCX выполнен один запуск Postman Runner:

| Показатель | Результат |
|---|---|
| Итерации | 1 |
| Всего тестов | 13 |
| Успешно | 13 |
| Ошибки | 0 |
| Проверенные HTTP-статусы | 200, 201, 204, 400, 404 |

Код `400` в негативном тесте означает ожидаемый отказ для неверных данных и **не является провалом теста**, если проверка ожидает именно `400`.

## Скриншоты из отчёта

### Проект в VS Code и запуск React
![Проект в VS Code и запуск React](agromarket-server/screenshots/04-frontend-running.png)

### Postman: результаты тестирования
![Postman Runner — 13 тестов пройдено](agromarket-server/screenshots/01-postman-results.png)

### Логи Express
![Логи Express с HTTP-запросами](agromarket-server/screenshots/03-backend-requests.png)

### Коллекция Postman
![Коллекция запросов Postman](agromarket-server/screenshots/02-postman-collection.png)

## Вывод
В ходе лабораторной работы №6 API проекта «АгроМаркет» подключён к PostgreSQL, реализованы CRUD-операции для товаров и хранение заявок. Автоматические тесты Postman выполнены успешно: 13 проверок пройдено, ошибок нет.
