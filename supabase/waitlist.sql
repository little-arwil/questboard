-- QuestBoard beta waitlist setup.
-- Run this in the Supabase SQL editor. It keeps public visitors insert-only.

create extension if not exists pgcrypto with schema extensions;

create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  source text not null default 'landing-page',
  created_at timestamptz not null default now(),
  constraint waitlist_email_unique unique (email),
  constraint waitlist_email_not_empty check (length(trim(email)) > 0),
  constraint waitlist_email_format check (
    email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
  )
);

alter table public.waitlist enable row level security;

revoke all on table public.waitlist from PUBLIC;
revoke all on table public.waitlist from anon;
revoke all on table public.waitlist from authenticated;

grant usage on schema public to anon;
grant insert (email) on table public.waitlist to anon;

drop policy if exists "Anyone can join the waitlist" on public.waitlist;
drop policy if exists "Allow anonymous waitlist inserts" on public.waitlist;

create policy "Allow anonymous waitlist inserts"
on public.waitlist
for insert
to anon
with check (
  length(trim(email)) > 0
  and email = lower(trim(email))
  and email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
  and source = 'landing-page'
);
