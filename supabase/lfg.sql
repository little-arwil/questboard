create extension if not exists pgcrypto with schema extensions;

create table if not exists public.lfg_campaigns (
  id text primary key,
  title text not null,
  dm text not null,
  system text not null,
  match_score integer not null default 80,
  day text not null,
  time text not null,
  timezone text not null default 'WIB',
  language text not null,
  experience text not null,
  playstyle text not null,
  playstyle_focus integer not null,
  format text not null,
  tone text not null,
  tools text not null,
  seats text not null,
  seats_open integer not null default 0,
  party_size integer not null default 5,
  status text not null,
  description text not null,
  tags text[] not null default '{}',
  compatibility_reasons text[] not null default '{}',
  expectations text[] not null default '{}',
  dm_rating numeric(2,1),
  dm_games_run integer,
  dm_bio text,
  dm_response_time text,
  reviews jsonb not null default '[]'::jsonb,
  location text,
  commitment text,
  safety_tools text,
  featured boolean not null default false,
  playstyle_mix jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint lfg_campaigns_match_score_range check (match_score between 0 and 100),
  constraint lfg_campaigns_focus_range check (playstyle_focus between 1 and 9),
  constraint lfg_campaigns_seats_open_range check (seats_open >= 0),
  constraint lfg_campaigns_party_size_range check (party_size between 1 and 10),
  constraint lfg_campaigns_dm_rating_range check (dm_rating is null or dm_rating between 1 and 5)
);

create table if not exists public.lfg_applications (
  id uuid primary key default gen_random_uuid(),
  campaign_id text not null references public.lfg_campaigns(id) on delete cascade,
  role text not null,
  schedule_confirmation text not null,
  note text,
  contact_email text,
  source text not null default 'lfg-prototype',
  created_at timestamptz not null default now(),
  constraint lfg_applications_role_allowed check (role in ('Player', 'Player (New)', 'Veteran player', 'Flex role')),
  constraint lfg_applications_schedule_length check (length(trim(schedule_confirmation)) between 2 and 120),
  constraint lfg_applications_note_length check (note is null or length(trim(note)) <= 1500),
  constraint lfg_applications_email_format check (
    contact_email is null
    or contact_email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
  ),
  constraint lfg_applications_source_allowed check (source = 'lfg-prototype')
);

alter table public.lfg_campaigns enable row level security;
alter table public.lfg_applications enable row level security;

revoke all on table public.lfg_campaigns from PUBLIC;
revoke all on table public.lfg_campaigns from anon;
revoke all on table public.lfg_campaigns from authenticated;
revoke all on table public.lfg_applications from PUBLIC;
revoke all on table public.lfg_applications from anon;
revoke all on table public.lfg_applications from authenticated;

grant usage on schema public to anon;
grant select on table public.lfg_campaigns to anon;
grant insert (campaign_id, role, schedule_confirmation, note, contact_email, source) on table public.lfg_applications to anon;

drop policy if exists "Allow public campaign reads" on public.lfg_campaigns;
create policy "Allow public campaign reads"
on public.lfg_campaigns
for select
to anon
using (true);

drop policy if exists "Allow anonymous LFG application inserts" on public.lfg_applications;
create policy "Allow anonymous LFG application inserts"
on public.lfg_applications
for insert
to anon
with check (
  role in ('Player', 'Player (New)', 'Veteran player', 'Flex role')
  and length(trim(schedule_confirmation)) between 2 and 120
  and (note is null or length(trim(note)) <= 1500)
  and (contact_email is null or contact_email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$')
  and source = 'lfg-prototype'
);

create index if not exists lfg_campaigns_featured_idx on public.lfg_campaigns(featured desc, match_score desc);
create index if not exists lfg_campaigns_filters_idx on public.lfg_campaigns(system, day, language, experience, format);
create index if not exists lfg_applications_campaign_created_idx on public.lfg_applications(campaign_id, created_at desc);
