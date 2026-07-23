# Web Services Launch

## Architecture

`/webs-paraguay` renders the commercial offer and inserts only the visitor-supplied fields into `web_service_leads` through the public Supabase anon client. It never uses `select()` after insert. The form includes a honeypot, minimum completion time, input limits, normalization, consent, submit locking, and generic errors. If real spam appears, add server-side rate limiting or a verification layer later.

`/admin/web-leads` opens the existing administration shell on **CONSULTAS WEB**. Supabase Auth now supplies the identity for the whole admin. A user is an administrator only when JWT `app_metadata.role` equals `admin`. RLS, not frontend state, protects prospect data. The admin can search/filter, refresh, open details, copy/launch WhatsApp, change all pipeline states, edit notes, and export the rows it is allowed to read as CSV.

## Database and RLS

Apply `supabase/migrations/202607220001_web_service_leads.sql`. It creates the table, checks, updated-at trigger, index, helper `is_cvitae_admin()`, public insert policy, and admin-only select/update policies. Anonymous users receive no select, update, or delete grant. No `service_role` key is used.

Create the owner's Supabase Auth user and set its app metadata to `{ "role": "admin" }`. Do not use user-editable metadata for authorization. Existing product/post policies remain outside this migration's scope.

## Environment

- `VITE_SUPABASE_URL`: existing project URL.
- `VITE_SUPABASE_ANON_KEY`: existing public anon key.
- `VITE_SITE_URL`: confirmed production origin only, without trailing slash. Until confirmed, leave empty; canonical and sitemap are intentionally omitted instead of inventing a domain.

`VITE_ADMIN_PASSWORD` is retired because any Vite variable is public in the browser bundle.

## Demo adaptation

Edit `src/data/businessDemo.js` for name, city, copy, services, areas and FAQs. The demo page deliberately disables contact actions and does not publish LocalBusiness structured data. Keep the fictional warning until replacing all content with a real, authorized business.

## Commands

```sh
npm install
npm run dev
npm run build
npm run preview
```

After building, inspect `dist/webs-paraguay/index.html` and confirm the H1, offer, price, sections and links are present. Test direct refreshes through Netlify's SPA fallback as well.

## Operational flow

1. Visitor submits `/webs-paraguay`.
2. Supabase validates and inserts the lead.
3. Owner signs into `/admin/web-leads`.
4. **CONSULTAS WEB** loads new leads first; use **ACTUALIZAR** for a fresh list.
5. Open a lead, update its state and notes, and contact it from the panel.

## Known risks

- The migration and Auth administrator must exist before end-to-end production testing.
- Lightweight client anti-spam cannot stop a determined direct API caller; database constraints restrict malformed input but do not rate-limit valid spam.
- Existing tables historically have RLS disabled; this migration securely isolates prospect data but does not redesign unrelated products/blog authorization.
- `vite-plugin-imagemin` currently brings legacy audit findings; upgrading it is separate from this launch.
