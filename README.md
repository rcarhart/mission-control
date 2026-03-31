# Mission Control

Mission Control is a local-first Next.js dashboard for running Ross’s work like an operating system instead of a soup of tabs, chats, specs, and vibes.

This project is **not** a homelab dashboard. It is the operating surface for the Ross + Sir Alex relationship: active projects, blockers, ownership, recent changes, repo drift, and scheduled work.

## Current state

This build is now a stronger **first meaningful command-center slice** rather than a stack of disconnected placeholder tabs.

The app currently emphasizes:

- **Executive overview** with high-signal operational metrics
- **Active project cards** as the main center of gravity
- **Needs attention** for blockers, staleness, repo drift, and Ross decisions
- **Agent workload snapshot** showing ownership and relative load
- **Recent activity** for meaningful changes
- **Repo / workspace hygiene** visibility
- **Cron / scheduling** visibility for recurring jobs
- **Office view placeholder** kept as a playful secondary layer

## Why it exists

Mission Control should answer, at a glance:

- What projects are active right now?
- What stage are they in?
- What changed recently?
- What is blocked?
- What needs Ross to decide something?
- Which agent owns what?
- What scheduled work is coming up?
- Is the repo/workspace staying aligned with real work?

## Tech stack

- **Next.js 16**
- **React 19**
- plain CSS via `app/globals.css`
- local structured dashboard data via `lib/data.js`

## Project structure

- `app/layout.js` — root layout and metadata
- `app/page.js` — entry point
- `components/MissionControlPage.js` — main dashboard UI
- `lib/data.js` — explicit operating data model for the first slice
- `app/globals.css` — styling and layout system

## Run locally

```bash
npm install
npm run dev
```

The app runs on:

- <http://localhost:8102>

## Build

```bash
npm run build
```

## Near-term next steps

Likely follow-on slices:

1. add project detail views and linked drill-downs
2. derive parts of the model from real workspace/spec/git state
3. connect scheduled work to actual cron/reminder sources
4. make recent activity and hygiene less hand-authored
5. turn the office layer into a genuinely fun secondary view

## Design intent

The UI should feel:

- dark
- sharp
- premium
- high-signal
- operationally useful
- mildly amused by the world

Mission Control should feel like a real command center, not enterprise punishment software wearing a nicer jacket.
