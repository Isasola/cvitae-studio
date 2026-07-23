-- Web services funnel: public insert only, explicit administrator management.
create extension if not exists pgcrypto;

create table if not exists public.web_service_leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(full_name) between 2 and 120),
  business_name text not null check (char_length(business_name) between 2 and 160),
  city text not null check (char_length(city) between 2 and 100),
  business_type text not null check (char_length(business_type) between 2 and 120),
  contact_phone text not null check (char_length(contact_phone) between 6 and 40),
  email text check (email is null or (char_length(email) <= 254 and email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$')),
  preferred_contact text not null check (preferred_contact in ('whatsapp','phone','email','facebook_messenger')),
  project_type text not null check (project_type in ('web_express','custom_project')),
  needs_description text not null check (char_length(needs_description) between 10 and 2000),
  source text not null default 'webs-paraguay' check (char_length(source) between 1 and 80),
  status text not null default 'new' check (status in ('new','contacted','call_scheduled','proposal_sent','won','lost')),
  admin_notes text not null default '' check (char_length(admin_notes) <= 5000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.is_cvitae_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false)
$$;
revoke all on function public.is_cvitae_admin() from public;
grant execute on function public.is_cvitae_admin() to anon, authenticated;

alter table public.web_service_leads enable row level security;
revoke all on public.web_service_leads from anon, authenticated;
grant insert on public.web_service_leads to anon, authenticated;
grant select, update on public.web_service_leads to authenticated;

create policy "visitors can submit valid web leads" on public.web_service_leads
for insert to anon, authenticated with check (
  status = 'new' and admin_notes = '' and source = 'webs-paraguay'
);
create policy "admins can read web leads" on public.web_service_leads
for select to authenticated using (public.is_cvitae_admin());
create policy "admins can update web leads" on public.web_service_leads
for update to authenticated using (public.is_cvitae_admin()) with check (public.is_cvitae_admin());

create or replace function public.set_web_service_lead_updated_at()
returns trigger language plpgsql set search_path = '' as $$ begin new.updated_at = now(); return new; end $$;
drop trigger if exists web_service_leads_updated_at on public.web_service_leads;
create trigger web_service_leads_updated_at before update on public.web_service_leads
for each row execute function public.set_web_service_lead_updated_at();

create index if not exists web_service_leads_admin_order_idx on public.web_service_leads (status, created_at desc);
