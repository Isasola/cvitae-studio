-- ============================================================
-- CVitae Studio — Supabase Schema
-- Run this entire file in: Supabase Dashboard → SQL Editor → Run
-- ============================================================

-- ── Products ────────────────────────────────────────────────
create table if not exists products (
  id           text primary key,
  name         text not null,
  category     text not null default 'component',
  tagline      text,
  description  text,
  price        numeric not null default 0,
  currency     text not null default 'USD',
  screenshot   text,
  gif_url      text,
  video_url    text,
  demo_url     text,
  buy_url      text,
  tags         text[] default '{}',
  status       text not null default 'available',
  sort_order   int default 0,
  created_at   timestamptz default now()
);

-- ── Posts ───────────────────────────────────────────────────
create table if not exists posts (
  id           bigserial primary key,
  slug         text unique not null,
  title        text not null,
  excerpt      text,
  content      text,
  tags         text[] default '{}',
  read_time    int default 3,
  published    boolean default true,
  link         text,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

-- ── Page views (contador de visitas) ────────────────────────
create table if not exists page_views (
  id         bigserial primary key,
  page       text not null,
  product_id text references products(id) on delete set null,
  created_at timestamptz default now()
);

-- ── Sales log (panel de ventas manual) ──────────────────────
create table if not exists sales (
  id          bigserial primary key,
  product_id  text references products(id) on delete set null,
  amount      numeric not null,
  currency    text default 'USD',
  channel     text default 'lemon',  -- 'lemon' | 'whatsapp' | 'other'
  note        text,
  created_at  timestamptz default now()
);

-- ── Waitlist (avisame cuando salga) ─────────────────────────
create table if not exists waitlist (
  id         bigserial primary key,
  email      text not null,
  product_id text references products(id) on delete set null,
  created_at timestamptz default now()
);

-- ── Storage bucket for product media ────────────────────────
-- Run this separately if the bucket doesn't exist yet:
insert into storage.buckets (id, name, public)
values ('products', 'products', true)
on conflict (id) do nothing;

-- Allow public read of product media
create policy "Public read products bucket"
  on storage.objects for select
  using (bucket_id = 'products');

-- Allow authenticated uploads
create policy "Auth upload products bucket"
  on storage.objects for insert
  with check (bucket_id = 'products');

-- Allow authenticated updates/deletes
create policy "Auth update products bucket"
  on storage.objects for update
  using (bucket_id = 'products');

create policy "Auth delete products bucket"
  on storage.objects for delete
  using (bucket_id = 'products');

-- ── RLS — disable for now (anon key has full access) ────────
-- If you want to lock down later, enable RLS and add policies.
-- For now the anon key is used directly from the frontend.
alter table products  disable row level security;
alter table posts     disable row level security;
alter table page_views disable row level security;
alter table sales     disable row level security;
alter table waitlist  disable row level security;

-- ── Seed initial products ────────────────────────────────────
insert into products (id, name, category, tagline, description, price, currency, screenshot, gif_url, video_url, demo_url, buy_url, tags, status, sort_order)
values
  ('ops-console',         'OPS Console UI',         'component', 'Your ops. One screen.',          'A full-featured admin panel React component. Brief room, users, content, tokens — all in one dark terminal.',        19, 'USD', '/products/ops-console-screenshot.png',  '/products/ops-console-demo.gif',  null, null,              null, ARRAY['admin','dashboard','react'], 'available', 1),
  ('filestack-loader',    'FileStack Loader',        'loader',    'Dr. Filo organizes your wait.',  'A robot archivist tosses files into a stack box via arc trajectories. Pure CSS + React state — zero dependencies.', 9,  'USD', '/products/filestack-screenshot.png',    null,                              null, '/demo/filestack', null, ARRAY['loader','animation','react'],   'available', 2),
  ('logo-particle-loader','Logo Particle Loader',    'loader',    'Your logo. Shattered. Reformed.','Drop in any PNG or SVG logo. It explodes into particles, disappears, and rebuilds itself slowly. Canvas 2D.',        12, 'USD', '/products/particle-screenshot.png',     null,                              null, '/demo/particle',  null, ARRAY['loader','animation','canvas','react'], 'available', 3)
on conflict (id) do nothing;

-- ── Seed initial blog posts ──────────────────────────────────
insert into posts (slug, title, excerpt, content, tags, read_time, published)
values
  (
    'why-your-loader-is-losing-you-money',
    'Why Your Loader Is Losing You Money',
    'Most loading screens are an afterthought. Here''s why that''s a conversion problem — and what to do about it.',
    E'## The 3-Second Rule\n\nUsers form their first impression of your product in under 3 seconds. Most apps spend those 3 seconds showing a spinning circle.\n\n**That''s a brand opportunity wasted.**\n\nLoaders are the only moment when your UI has the user''s full attention and nothing to show. Most apps waste it with a generic spinner.\n\n## What a Good Loader Does\n\nA well-designed loader does three things:\n\n- Communicates **brand personality** — your product has a character\n- **Sets expectations** — something real is happening, not frozen\n- **Reduces perceived wait time** — animated interfaces feel faster than static ones\n\nStudies show that a well-animated loader can reduce perceived wait time by up to 40%.\n\n## The Cost of Generic\n\nEvery time you show a generic spinner, you''re telling your user: we didn''t care enough to design this moment.\n\nThat''s the subtext. And users read it.\n\n## The Fix\n\nLoaders don''t have to be complex. They have to be **intentional**.\n\nThe FileStack Loader we built does one simple thing: Dr. Filo tosses files into a box. It communicates organization, progress, and personality — all without a single line of copy.\n\nThat''s what a loader should do.',
    ARRAY['ux','conversion','loading'],
    4,
    true
  ),
  (
    'react-wrappers-the-component-you-always-forget',
    'React Wrappers: The Component You Always Forget To Build',
    'Every serious React codebase needs wrapper components. Most developers add them too late — here''s how to think about them from day one.',
    E'## What Is a Wrapper Component?\n\nA wrapper component is a React component whose job is to **wrap other components** and add behavior: loading states, error boundaries, auth guards, animation transitions.\n\nYou''ve written them before. You just probably didn''t call them wrappers.\n\n## The Problem\n\nMost developers build wrappers reactively — after they''ve already duplicated the same loading/error logic 10 times across the codebase.\n\nThe fix is thinking in wrappers from the start.\n\n## The Four Wrappers Every App Needs\n\n- [ ] **AsyncWrapper** — handles loading, error, and empty states\n- [ ] **AuthWrapper** — redirects unauthenticated users\n- [ ] **AnimationWrapper** — entrance/exit transitions for route changes\n- [ ] **PermissionWrapper** — shows or hides UI by role\n\n## Building the Right Interface\n\nA good wrapper is invisible to the wrapped component. It shouldn''t require the child to know anything about the wrapper''s behavior.\n\n```jsx\n<AsyncWrapper loading={isLoading} error={error}>\n  <MyComponent data={data} />\n</AsyncWrapper>\n```\n\nThe child doesn''t know it''s wrapped. That''s the goal.',
    ARRAY['react','architecture','wrappers'],
    5,
    true
  ),
  (
    'admin-panel-design-for-people-who-hate-admin-panels',
    'Admin Panel Design for People Who Hate Admin Panels',
    'Admin panels don''t have to look like database GUIs from 2004. Here''s a design approach that actually respects the people who use it daily.',
    E'## The Problem With Most Admin Panels\n\nMost admin panels are designed for developers, not operators. They expose raw database fields, use confusing labels, and treat every action as equally important.\n\nThe result: every team member needs a 2-hour onboarding session to publish a blog post.\n\n## Operator-First Design\n\nThe key shift is designing for the **operator** — the person who uses the admin every day — not the developer who built it.\n\nThat means:\n\n- **Primary actions are obvious** — Publish, Save, Delete are not buried in menus\n- **Destructive actions require confirmation** — No accidental deletes\n- **Feedback is immediate** — Saved, Error, Loading states are always visible\n- **Mobile-friendly** — Operators use phones too\n\n## The OPS Console UI Approach\n\nWhen we designed OPS Console UI, we started with one question: **what does the operator need to know right now?**\n\nThe answer became the dashboard layout. Everything else is secondary.\n\n## One More Thing\n\nAdmin panels should feel like a product, not a tool. If your team dreads opening the admin, that''s a design problem — not a user problem.',
    ARRAY['design','admin','ux'],
    4,
    true
  )
on conflict (slug) do nothing;
