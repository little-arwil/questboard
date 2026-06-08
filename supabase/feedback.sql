create extension if not exists pgcrypto with schema extensions;

create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  role text not null,
  rating integer not null,
  most_useful text not null,
  most_confusing text not null,
  must_have_feature text not null,
  email text,
  source text not null default 'feedback-page',
  created_at timestamptz not null default now(),
  constraint feedback_role_allowed check (role in ('player', 'dm', 'both')),
  constraint feedback_rating_range check (rating between 1 and 5),
  constraint feedback_most_useful_length check (
    length(trim(most_useful)) between 2 and 1000
  ),
  constraint feedback_most_confusing_length check (
    length(trim(most_confusing)) between 2 and 1000
  ),
  constraint feedback_must_have_feature_length check (
    length(trim(must_have_feature)) between 2 and 1000
  ),
  constraint feedback_email_format check (
    email is null
    or email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
  ),
  constraint feedback_source_allowed check (source = 'feedback-page')
);

alter table public.feedback enable row level security;

revoke all on table public.feedback from PUBLIC;
revoke all on table public.feedback from anon;
revoke all on table public.feedback from authenticated;

grant usage on schema public to anon;
grant insert (
  role,
  rating,
  most_useful,
  most_confusing,
  must_have_feature,
  email,
  source
) on table public.feedback to anon;

drop policy if exists "Allow anonymous feedback inserts" on public.feedback;

create policy "Allow anonymous feedback inserts"
on public.feedback
for insert
to anon
with check (
  role in ('player', 'dm', 'both')
  and rating between 1 and 5
  and length(trim(most_useful)) between 2 and 1000
  and length(trim(most_confusing)) between 2 and 1000
  and length(trim(must_have_feature)) between 2 and 1000
  and (
    email is null
    or (
      email = lower(trim(email))
      and email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
    )
  )
  and source = 'feedback-page'
);
