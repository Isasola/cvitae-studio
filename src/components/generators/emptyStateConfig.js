export const STATES = [
  { id: 'no-data',      label: 'No Data',          icon: 'inbox',      title: 'Nothing here yet',        desc: 'Add your first record to get started.' },
  { id: 'search-empty', label: 'Search Empty',      icon: 'search',     title: 'No results found',        desc: 'Try a different keyword or clear the filters.' },
  { id: 'error',        label: 'Error',             icon: 'warning',    title: 'Something went wrong',    desc: "We couldn't load this page. Please try again." },
  { id: '404',          label: '404 Not Found',     icon: 'ghost',      title: 'Page not found',          desc: "This page doesn't exist or was moved." },
  { id: 'offline',      label: 'No Internet',       icon: 'signal',     title: "You're offline",          desc: 'Check your connection and refresh.' },
  { id: 'loading',      label: 'Loading',           icon: 'clock',      title: 'Loading your data',       desc: "Hang tight, this won't take long." },
  { id: 'unauthorized', label: 'No Permission',     icon: 'lock',       title: 'Access denied',           desc: "You don't have permission to view this." },
  { id: 'maintenance',  label: 'Maintenance',       icon: 'wrench',     title: 'Under maintenance',       desc: "We're making improvements. Back soon." },
  { id: 'success',      label: 'Success',           icon: 'check',      title: 'All done!',               desc: 'Everything went through without issues.' },
  { id: 'first-use',    label: 'First Use',         icon: 'rocket',     title: 'Welcome aboard',          desc: "You haven't created anything yet. Let's start." },
  { id: 'no-payment',   label: 'No Payment',        icon: 'card',       title: 'No payment method',       desc: 'Add a card to continue using this feature.' },
  { id: 'archived',     label: 'Archived',          icon: 'archive',    title: 'This was archived',       desc: 'You can restore it from your archive anytime.' },
  { id: 'deleted',      label: 'Deleted',           icon: 'trash',      title: 'Item deleted',            desc: 'This item no longer exists in the system.' },
  { id: 'ai-waiting',   label: 'AI Waiting',        icon: 'sparkles',   title: 'Waiting for input',       desc: 'Give me something to work with.' },
  { id: 'upgrade',      label: 'Upgrade Required',  icon: 'star',       title: 'Unlock this feature',     desc: 'Upgrade your plan to access this section.' },
  { id: 'trial-ended',  label: 'Trial Ended',       icon: 'hourglass',  title: 'Your trial has ended',    desc: 'Choose a plan to keep everything you built.' },
]

export const STYLES = [
  { id: 'minimal',      label: 'Minimal' },
  { id: 'neobrutalism', label: 'Neo Brutalism' },
  { id: 'glass',        label: 'Glass' },
  { id: 'corporate',    label: 'Corporate' },
  { id: 'dark',         label: 'Dark' },
  { id: 'stripe',       label: 'Stripe' },
  { id: 'linear',       label: 'Linear' },
  { id: 'vercel',       label: 'Vercel' },
]

export const ANIMATIONS = [
  { id: 'none',    label: 'None' },
  { id: 'fade',    label: 'Fade In' },
  { id: 'bounce',  label: 'Bounce' },
  { id: 'float',   label: 'Float' },
  { id: 'pulse',   label: 'Pulse' },
  { id: 'scale',   label: 'Scale In' },
]

export const BUTTONS = [
  { id: 'retry',     label: 'Try Again' },
  { id: 'create',    label: 'Create New' },
  { id: 'go-home',   label: 'Go Home' },
  { id: 'reload',    label: 'Reload Page' },
  { id: 'upgrade',   label: 'Upgrade Plan' },
  { id: 'contact',   label: 'Contact Support' },
  { id: 'invite',    label: 'Invite Team' },
  { id: 'none',      label: 'No Button' },
]

export const FRAMEWORKS = [
  { id: 'react', label: 'React' },
  { id: 'next',  label: 'Next.js' },
  { id: 'vue',   label: 'Vue' },
  { id: 'html',  label: 'HTML + Tailwind' },
]

// Inline SVG paths por icono (viewBox="0 0 24 24", stroke-based)
export const ICONS = {
  inbox:     'M4 4h16v10H4V4zM4 14l4 4h8l4-4M9 9h6',
  search:    'M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35',
  warning:   'M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01',
  ghost:     'M9 10h.01M15 10h.01M12 2a8 8 0 00-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 00-8-8z',
  signal:    'M1 6l6.5 6.5M1 1l10 10M16.5 12.5L23 6M13 10l10-10M5.5 14.5L9 18M15 6l3.5 3.5',
  clock:     'M12 22a10 10 0 100-20 10 10 0 000 20zM12 6v6l4 2',
  lock:      'M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2zM7 11V7a5 5 0 0110 0v4',
  wrench:    'M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z',
  check:     'M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3',
  rocket:    'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09zM12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z',
  card:      'M1 4h22v16H1V4zM1 9h22',
  archive:   'M21 8v13H3V8M23 3H1v5h22V3zM10 12h4',
  trash:     'M3 6h18M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2',
  sparkles:  'M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3zM5 17l.75 2.25L8 20l-2.25.75L5 23l-.75-2.25L2 20l2.25-.75L5 17zM19 1l.5 1.5L21 3l-1.5.5L19 5l-.5-1.5L17 3l1.5-.5L19 1z',
  star:      'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  hourglass: 'M5 22h14M5 2h14M17 22v-4l-5-4-5 4v4M7 2v4l5 4 5-4V2',
}
