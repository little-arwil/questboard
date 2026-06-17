create extension if not exists pgcrypto with schema extensions;

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  handle text not null unique check (handle ~ '^[a-z0-9][a-z0-9-]{2,38}$'),
  display_name text not null,
  pronouns text,
  role text not null check (role in ('Player','DM','Player & DM')),
  location text,
  timezone text,
  headline text,
  bio text,
  looking_for text,
  table_focus integer default 7 check (table_focus between 1 and 9),
  languages text[] default '{}',
  availability text[] default '{}',
  badges text[] default '{}',
  trust_score integer default 80 check (trust_score between 0 and 100),
  rating numeric(2,1) default 5.0 check (rating between 0 and 5),
  games_played integer default 0 check (games_played >= 0),
  games_run integer default 0 check (games_run >= 0),
  response_time text,
  avatar_seed text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.profile_characters (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  ancestry text,
  class_name text,
  level integer default 1 check (level between 1 and 30),
  campaign text,
  status text default 'Active' check (status in ('Active','Retired','Fallen','Legendary')),
  quote text,
  accent text default '#C9A84C',
  created_at timestamptz default now()
);

create table if not exists public.profile_sessions (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  role text not null check (role in ('Player','DM')),
  system text not null,
  sessions integer default 1 check (sessions >= 1),
  tablemates text[] default '{}',
  completed boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.profile_friendships (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  friend_profile_id uuid not null references public.profiles(id) on delete cascade,
  relation text default 'friend',
  created_at timestamptz default now(),
  unique (profile_id, friend_profile_id),
  check (profile_id <> friend_profile_id)
);

create table if not exists public.profile_reviews (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  reviewer_profile_id uuid references public.profiles(id) on delete set null,
  reviewer_name text not null,
  rating integer default 5 check (rating between 1 and 5),
  badge text,
  quote text not null,
  created_at timestamptz default now()
);

create index if not exists profiles_handle_idx on public.profiles(handle);
create index if not exists profiles_user_id_idx on public.profiles(user_id);
create index if not exists profile_characters_profile_id_idx on public.profile_characters(profile_id);
create index if not exists profile_sessions_profile_id_idx on public.profile_sessions(profile_id);
create index if not exists profile_friendships_profile_id_idx on public.profile_friendships(profile_id);
create index if not exists profile_reviews_profile_id_idx on public.profile_reviews(profile_id);

alter table public.profiles enable row level security;
alter table public.profile_characters enable row level security;
alter table public.profile_sessions enable row level security;
alter table public.profile_friendships enable row level security;
alter table public.profile_reviews enable row level security;

create policy "Profiles are publicly readable" on public.profiles for select using (true);
create policy "Profile owners can insert" on public.profiles for insert with check (auth.uid() = user_id);
create policy "Profile owners can update" on public.profiles for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Characters are publicly readable" on public.profile_characters for select using (true);
create policy "Profile owners can manage characters" on public.profile_characters for all using (
  exists (select 1 from public.profiles p where p.id = profile_id and p.user_id = auth.uid())
) with check (
  exists (select 1 from public.profiles p where p.id = profile_id and p.user_id = auth.uid())
);

create policy "Sessions are publicly readable" on public.profile_sessions for select using (true);
create policy "Profile owners can manage sessions" on public.profile_sessions for all using (
  exists (select 1 from public.profiles p where p.id = profile_id and p.user_id = auth.uid())
) with check (
  exists (select 1 from public.profiles p where p.id = profile_id and p.user_id = auth.uid())
);

create policy "Friendships are publicly readable" on public.profile_friendships for select using (true);
create policy "Profile owners can manage friendships" on public.profile_friendships for all using (
  exists (select 1 from public.profiles p where p.id = profile_id and p.user_id = auth.uid())
) with check (
  exists (select 1 from public.profiles p where p.id = profile_id and p.user_id = auth.uid())
);

create policy "Reviews are publicly readable" on public.profile_reviews for select using (true);
create policy "Authenticated users can write reviews" on public.profile_reviews for insert with check (auth.uid() is not null);
