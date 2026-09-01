# TIMELESS

React/Vite frontend and a small FastAPI backend for Timeless Memories and Timeless Services. Enquiries are stored in a persistent SQLite Docker volume.

## Run with Docker

```bash
cp .env.example .env.local
docker compose up --build
```

Open http://localhost:3000. Docker starts an Nginx-served React SPA and the private Python API. Both services include health checks; the Python application runs as a non-root user.

Set `VITE_WHATSAPP_NUMBER` in international format at build time when needed, and replace the default `ADMIN_PASSWORD`. Admin API endpoints use HTTP Basic authentication. Real images can be added beneath `public/images`; service content lives in `src/data.ts`.

## Local development

```bash
docker compose up api
npm install && npm run dev
```
