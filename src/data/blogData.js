export const posts = [
  {
    slug: 'why-your-loader-is-losing-you-money',
    title: 'Why Your Loader Is Losing You Money',
    date: '2026-06-29',
    tags: ['loaders', 'ux', 'conversion'],
    excerpt: 'A blank screen for 2 seconds costs more than you think. Here\'s the data — and what to do instead.',
    readTime: 4,
    content: `
A blank white screen for 2 seconds.

That's what most web apps show while they fetch data. And it's quietly killing your retention.

## The numbers

Studies consistently show that users start abandoning pages after 1.5 seconds of nothing. For SaaS dashboards and admin panels — where users return daily — a bad loading experience compounds: users learn to distrust the product before they even see it.

## The real problem isn't speed

The fastest API call still takes 300ms on a good day. You can't always make things faster. But you can make the wait feel intentional.

A loading state is a **product decision**, not an afterthought. It's the first thing a returning user sees every time they open your app.

## What works

- **Skeleton screens** that mirror the real layout — users see structure, not emptiness
- **Progress indicators** with micro-text ("Fetching your data...") — context kills anxiety
- **Animated loaders that match your brand** — a generic spinner says "we didn't think about this"

## What we build

Our loaders are React components you drop in and configure. No CSS fighting. No animation libraries. Just clean code that signals confidence to your users.

If your app loads and your users sigh — that's a design problem we can fix.
    `.trim(),
  },
  {
    slug: 'react-wrappers-the-component-you-always-forget-to-build',
    title: 'React Wrappers: The Component You Always Forget To Build',
    date: '2026-06-28',
    tags: ['react', 'wrappers', 'architecture'],
    excerpt: 'You copy the same layout shell into every page. There\'s a better way — and it takes 10 minutes to set up right.',
    readTime: 5,
    content: `
Every React project reaches the same moment.

You're three pages in, and you notice: every page has the same header, the same sidebar, the same container padding. You've copy-pasted the shell three times. On the fourth page, you start to wonder if this is fine.

It's not fine.

## What a wrapper actually is

A wrapper component is the outer shell that every page shares. It handles:

- Layout constraints (max-width, padding, grid)
- Persistent UI (nav, sidebar, footer)
- Page-level state (active route, user context)
- Transitions between pages

It's not glamorous. It's also not optional if you care about maintainability.

## The wrong way

\`\`\`jsx
// Page A
<div className="max-w-6xl mx-auto px-4 pt-20">
  <Sidebar />
  <main>...</main>
</div>

// Page B (copy-pasted)
<div className="max-w-6xl mx-auto px-4 pt-20">
  <Sidebar />
  <main>...</main>
</div>
\`\`\`

When the designer asks to change the padding — and they will — you change it in 12 places.

## The right way

\`\`\`jsx
// AppShell.jsx — build it once
export default function AppShell({ children }) {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-20">
      <Sidebar />
      <main>{children}</main>
    </div>
  )
}

// Every page
<AppShell>
  <YourPageContent />
</AppShell>
\`\`\`

One change propagates everywhere.

## What our wrappers add on top

The basic pattern is simple. But production wrappers need more: loading states, error boundaries, auth gates, responsive variants, and smooth transitions. That's what we sell — the version you don't have to debug for three days.
    `.trim(),
  },
  {
    slug: 'admin-panel-design-for-people-who-hate-admin-panels',
    title: 'Admin Panel Design for People Who Hate Admin Panels',
    date: '2026-06-25',
    tags: ['admin', 'ui', 'design'],
    excerpt: 'Most admin panels look like they were designed by the backend team at 11pm. Here\'s how to do it differently.',
    readTime: 6,
    content: `
Admin panels are the forgotten child of product design.

Your marketing site gets mockups, user testing, and a Figma file with 40 frames. Your admin panel gets a Bootstrap table and a "we'll fix it later."

Later never comes.

## Why it matters

Your team lives in the admin panel. Founders, ops, support — they're in there every day. A bad admin panel means:

- Slower task completion (real cost, measurable in hours per week)
- Higher error rates (wrong record edited, wrong action confirmed)
- Team frustration that gets blamed on "the product"

The admin panel IS the product for the people who run it.

## The patterns that actually work

**Dense but not cluttered.** Admins are power users. They want information density, not whitespace. Design for scanning, not for impressing.

**One primary action per view.** Every page should have one obvious thing to do. If there are 12 buttons with equal visual weight, nothing gets done confidently.

**Destructive actions need friction.** Delete, archive, charge — these need a second step. Not a modal with a red button, but a typed confirmation or a clear two-step flow.

**Fast search everywhere.** The most-used feature in any admin panel is search. Build it first, style it last.

## What we built

OPS Console UI started as our own internal admin panel for cvitae.lat. We got tired of rebuilding it, so we cleaned it up and packaged it. Dark terminal aesthetic, dense layout, fast. One component, drops into any React app.

That's the philosophy: build it right once, use it everywhere.
    `.trim(),
  },
]
