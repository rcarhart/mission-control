# Mission Control

Mission Control is a local-first Next.js dashboard for running Ross’s work like an operating system instead of a pile of tabs, chats, specs, and vibes.

This project is **not** a homelab dashboard. It is the operating surface for the Ross + Sir Alex relationship: active work, ownership, blockers, scheduled agent jobs, and team structure.

## Current demo focus

This pass is intentionally tighter and more believable. The demo now focuses on five sections only:

- **Tasks** — the main kanban view and visual center of gravity
- **Calendar** — scheduled cron jobs and recurring agent work
- **Projects** — the current active project portfolio
- **Agents** — bio cards with role, status, and focus
- **Team** — lightweight org chart and operating principles

## Layout direction

The current UI is rebuilt around the provided reference layout:

- left navigation rail
- top KPI strip and controls
- central content area
- right-side live activity panel
- dark premium styling throughout

Tasks stays as the default landing view, with the other sections sharing the same shell so the app feels like one coherent command center instead of a grab bag of separate pages.

## Tech stack

- **Next.js 16**
- **React 19**
- plain CSS via `app/globals.css`
- local structured demo data via `lib/data.js`

## Project structure

- `app/layout.js` — root layout and metadata
- `app/page.js` — app entry
- `components/MissionControlPage.js` — main shell plus section views
- `lib/data.js` — dashboard content model
- `app/globals.css` — premium dark layout and component styling

## Run locally

```bash
npm install
npm run dev
```

Default local URL:

- <http://localhost:8102>

## Build

```bash
npm run build
```

## Next likely improvements

1. derive more task/project/activity data from real workspace artifacts
2. connect calendar lanes to actual cron/reminder sources
3. add drill-down pages or drawers for project and task detail
4. make live activity less hand-authored
5. add richer approval and blocker handling

## Design intent

Mission Control should feel:

- dark
- sharp
- premium
- operationally useful
- mildly amused by the world

In short: a real command center, not enterprise punishment software with mood lighting.
