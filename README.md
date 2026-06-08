# QuestBoard

QuestBoard is a polished landing page MVP for a D&D/tabletop RPG matchmaking platform. It helps players and DMs find compatible sessions based on schedule, timezone, language, playstyle, experience level, campaign type, tools, and table expectations.

This MVP uses Supabase only for beta waitlist submissions. There is no custom backend or authentication yet.

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

Run this SQL in the Supabase SQL editor:

```sql
create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text not null default 'landing-page',
  created_at timestamptz not null default now(),
  constraint waitlist_email_not_empty check (length(trim(email)) > 0),
  constraint waitlist_email_format check (
    email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
  )
);

alter table public.waitlist enable row level security;

create policy "Anyone can join the waitlist"
on public.waitlist
for insert
to anon
with check (
  length(trim(email)) > 0
  and email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
);
```

No select policy is required for this MVP, which keeps public visitors from reading waitlist entries.

## Production Check

Build the app:

```bash
npm run build
```

Run lint:

```bash
npm run lint
```

## Notes

- Uses mock data for campaign, role, filter, feature, and matching content.
- The beta form writes submitted emails to Supabase.
- The original hero artwork is generated for this project and avoids official D&D logos, Wizards of the Coast assets, and copyrighted fantasy artwork.
