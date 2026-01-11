Запуск через Docker composer

1. docker-compose up --buid
   Документация
   http://localhost:5001/api/docs

---

Запуск локально без Docker

1. Создать .env/.development.env/.production.env - (Backend)
   PORT=5001
   POSTGRES_HOST=localhost
   POSTGRES_USER=postgres
   POSTGRES_DB=google_drive
   POSTGRES_PASSWORD=030688
   POSTGRES_PORT=5432
   SECRET="DASJ;HF;Q843R1324"

2. Создать .env -(Frontend)
   REACT_APP_API_URL=http://localhost:5001

3. Подключиться к PostgreSQL
4. cd frontend + npm i + npm start
5. cd backend + npm i + npm run start:dev
# Google-Drive
