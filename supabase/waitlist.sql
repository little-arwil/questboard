-- QuestBoard beta waitlist setup.
-- Run this in the Supabase SQL editor. It keeps public visitors insert-only.

create extension if not exists pgcrypto with schema extensions;

create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  role text,
  experience_level text,
  preferred_format text,
  availability text,
  source text not null default 'landing-page',
  created_at timestamptz not null default now(),
  constraint waitlist_email_unique unique (email),
  constraint waitlist_email_not_empty check (length(trim(email)) > 0),
  constraint waitlist_email_format check (
    email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
  )
);

alter table public.waitlist
add column if not exists role text,
add column if not exists experience_level text,
add column if not exists preferred_format text,
add column if not exists availability text;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.waitlist'::regclass
      and conname = 'waitlist_role_allowed'
  ) then
    alter table public.waitlist
    add constraint waitlist_role_allowed
    check (role is null or role in ('player', 'dm', 'both'));
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.waitlist'::regclass
      and conname = 'waitlist_experience_allowed'
  ) then
    alter table public.waitlist
    add constraint waitlist_experience_allowed
    check (experience_level is null or experience_level in ('new', 'some', 'experienced'));
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.waitlist'::regclass
      and conname = 'waitlist_format_allowed'
  ) then
    alter table public.waitlist
    add constraint waitlist_format_allowed
    check (preferred_format is null or preferred_format in ('online', 'offline', 'hybrid'));
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.waitlist'::regclass
      and conname = 'waitlist_availability_length'
  ) then
    alter table public.waitlist
    add constraint waitlist_availability_length
    check (availability is null or length(trim(availability)) between 2 and 160);
  end if;
end $$;

alter table public.waitlist enable row level security;

revoke all on table public.waitlist from PUBLIC;
revoke all on table public.waitlist from anon;
revoke all on table public.waitlist from authenticated;

grant usage on schema public to anon;
grant insert (
  email,
  role,
  experience_level,
  preferred_format,
  availability
) on table public.waitlist to anon;

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
  and role in ('player', 'dm', 'both')
  and experience_level in ('new', 'some', 'experienced')
  and preferred_format in ('online', 'offline', 'hybrid')
  and length(trim(availability)) between 2 and 160
  and source = 'landing-page'
);
