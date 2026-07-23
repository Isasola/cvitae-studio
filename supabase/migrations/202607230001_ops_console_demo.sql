-- Ensure OPS Console exists in the product admin and links to its internal demo.
insert into public.products (
  id, name, category, tagline, description, price, currency,
  screenshot, gif_url, video_url, demo_url, buy_url, tags, status, sort_order
)
values (
  'ops-console', 'OPS Console UI', 'component', 'Your ops. One screen.',
  'A full-featured admin panel React component. Brief room, users, content, tokens — all in one dark terminal.',
  19, 'USD', '/products/ops-console-screenshot.png',
  '/products/ops-console-demo.gif', null, '/demo/ops-console', null,
  array['admin','dashboard','react'], 'available', 1
)
on conflict (id) do update
set
  demo_url = excluded.demo_url,
  screenshot = coalesce(public.products.screenshot, excluded.screenshot),
  gif_url = coalesce(public.products.gif_url, excluded.gif_url),
  status = 'available';
