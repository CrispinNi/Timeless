create extension if not exists pgcrypto;
create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  reference text unique not null,
  division text not null check (division in ('memories','tailoring','general')),
  status text not null default 'New' check (status in ('New','Contacted','Confirmed','In Progress','Completed','Cancelled')),
  customer_name text not null,
  phone text not null,
  email text,
  service text,
  event_date date,
  details jsonb not null default '{}'::jsonb,
  internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.enquiries enable row level security;
-- Enquiries are written and read only by server-side code using the service role.
