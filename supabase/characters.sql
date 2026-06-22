-- ============================================================
-- Characters table for D&D character sheets
-- ============================================================

create table if not exists public.characters (
  id              uuid default gen_random_uuid() primary key,
  user_id         uuid references auth.users(id) on delete cascade not null,
  name            text not null check (char_length(name) between 1 and 120),
  species         text not null check (char_length(species) between 1 and 60),
  class_name      text not null check (char_length(class_name) between 1 and 60),
  level           int not null check (level between 1 and 20),
  background      text default ''::text,
  strength        int not null default 10 check (strength between 1 and 30),
  dexterity       int not null default 10 check (dexterity between 1 and 30),
  constitution    int not null default 10 check (constitution between 1 and 30),
  intelligence    int not null default 10 check (intelligence between 1 and 30),
  wisdom          int not null default 10 check (wisdom between 1 and 30),
  charisma        int not null default 10 check (charisma between 1 and 30),
  armor_class     int not null default 10 check (armor_class between 1 and 99),
  max_hp          int not null default 10 check (max_hp >= 1),
  current_hp      int not null default 10 check (current_hp >= 0),
  speed           int not null default 30 check (speed >= 0),
  weapons         jsonb default '[]'::jsonb,
  spells          jsonb default '[]'::jsonb,
  inventory       jsonb default '[]'::jsonb,
  backstory       text default ''::text,
  visibility      text not null default 'private'::text check (visibility in ('private', 'public', 'friends')),
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

-- RLS
alter table public.characters enable row level security;

-- Owner can do everything
create policy "owner_all"
  on public.characters
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- Public read for visibility = public
create policy "public_read"
  on public.characters
  for select
  using (visibility = 'public');

-- Indexes
create index if not exists idx_characters_user on public.characters(user_id);
create index if not exists idx_characters_visibility on public.characters(visibility);

-- Auto-update updated_at
create extension if not exists moddatetime schema extensions;
create trigger trg_characters_updated_at
  before update on public.characters
  for each row
  execute function extensions.moddatetime(updated_at);
