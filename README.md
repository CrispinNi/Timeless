# TIMELESS

Production-ready Next.js website and enquiry flow for Timeless Memories and Timeless Tailoring.

## Run with Docker

```bash
cp .env.example .env.local
docker compose up --build
```

Open http://localhost:3000. The container uses a multi-stage build, runs as a non-root user, and includes a health check.

## Configure enquiries

1. Create a Supabase project and run `supabase/schema.sql` in its SQL editor.
2. Fill in `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`.
3. Set `NEXT_PUBLIC_WHATSAPP_NUMBER` in international format without `+` or spaces.
4. Set a strong `ADMIN_PASSWORD`; visit `/admin` and use any username with that password.

Requests fail safely with a WhatsApp prompt until Supabase is configured. Real images can be added beneath `public/images`, and service content lives in `data/config.ts`.

## Local development

```bash
npm install
npm run dev
```
