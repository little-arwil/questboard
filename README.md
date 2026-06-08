# QuestBoard

QuestBoard is a polished landing page MVP for a D&D/tabletop RPG matchmaking platform. It helps players and DMs find compatible sessions based on schedule, timezone, language, playstyle, experience level, campaign type, tools, and table expectations.

This MVP uses Supabase only for beta waitlist submissions. There is no custom backend or authentication yet.
It also uses Vercel Analytics for lightweight page visit and interaction tracking.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- ESLint
- npm

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Environment Variables

Create `.env.local` and add your Supabase project values:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

These values are used by the public landing page to insert waitlist emails. Do not use the Supabase service role key in the browser.

## Supabase Waitlist Schema

Run `supabase/waitlist.sql` in the Supabase SQL editor. It creates
`public.waitlist`, enables RLS, grants `anon` insert access to the `email`
column only, and does not create any public select policy.

```sql
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
```

No select policy is required for this MVP, which keeps public visitors from reading waitlist entries.

If the form submits but the row does not appear in Supabase, verify:

- `.env.local` or Vercel has `NEXT_PUBLIC_SUPABASE_URL`.
- `.env.local` or Vercel has `NEXT_PUBLIC_SUPABASE_ANON_KEY` using the anon or publishable key, not the `service_role` key.
- The env vars exist in the Vercel environment you are testing: Production, Preview, or Development.
- The Vercel deployment was redeployed after env vars changed.
- The table is named exactly `public.waitlist`.
- RLS is enabled and the only public policy is the `anon` insert policy above.
- The insert request is not blocked by duplicate email, email format, or source constraints.

Waitlist troubleshooting:

- Open the deployed page, submit the form, then check the browser console for `Waitlist insert failed`.
- The console entry shows Supabase `code`, `message`, `details`, and `hint` without printing env vars.
- In Vercel, confirm both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` exist for the exact environment you are testing.
- If you edit Vercel env vars, redeploy the affected Preview or Production deployment before testing again.

## Analytics

QuestBoard uses the official Vercel Analytics package (`@vercel/analytics`).
The `Analytics` component is mounted in `src/app/layout.tsx` so page visits are
tracked automatically when Web Analytics is enabled for the Vercel project.

Custom events currently tracked:

- `join_beta_click`
- `waitlist_submit_success`
- `role_toggle_change`
- `campaign_filter_click`
- `hero_secondary_cta_click`

No additional analytics provider, authentication, or custom backend is required.
Local development does not need extra analytics environment variables.

## Production Check

Build the app:

```bash
npm run build
```

Run lint:

```bash
npm run lint
```

Run the TypeScript check:

```bash
npm exec tsc -- --noEmit
```

## Notes

- Uses mock data for campaign, role, filter, feature, and matching content.
- The beta form writes submitted emails to Supabase.
- Vercel Analytics tracks page visits plus key landing page interactions.
- The original hero artwork is generated for this project and avoids official D&D logos, Wizards of the Coast assets, and copyrighted fantasy artwork.
