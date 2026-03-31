# Mission Control

Mission Control is a local-first Next.js dashboard for running Ross’s work like an operating system instead of a pile of tabs, chats, and half-remembered tasks.

Right now it is a UI prototype for a shared operating layer around projects, agents, approvals, calendar, memory, docs, and team structure. It is meant to become the main surface for seeing what is happening, what is blocked, what needs approval, and who is doing what.

## What this is

This app is the front-end shell for an operations dashboard that combines:

- **Tasks** — a kanban-style board for backlog, in progress, review, and done
- **Agents** — named workers with roles, status, and heartbeat visibility
- **Approvals** — items explicitly waiting on Ross
- **Calendar** — recurring jobs and proactive scheduled work
- **Projects** — high-level initiative tracking
- **Memory** — daily memory and long-term memory views
- **Docs** — generated plans, specs, and reference materials
- **Team** — delegation and reporting structure
- **Office** — a future playful visualization layer for agent activity

In plain English: this is the operating dashboard for the Ross + Sir Alex system.

## Current state

Today, Mission Control is a **single-page Next.js prototype** with static demo data.

It already includes:

- a dark, premium dashboard layout
- a left-side navigation rail
- a top summary strip with key metrics
- a kanban-style tasks view
- an activity feed
- section views for agents, approvals, calendar, projects, memory, docs, office, and team

It does **not** yet have real backend integrations, persistence, auth, live task updates, or real agent/event wiring.

## Why it exists

The goal is to replace vague project sprawl with one calm control surface.

Mission Control should help Ross answer questions like:

- What is actively being worked on?
- What is blocked?
- What is waiting on my decision?
- Which agent owns what?
- What recurring checks or scheduled work are happening?
- What changed recently?
- What documents and plans already exist?

The point is not to build “a homelab dashboard.”
The point is to build an **operating layer for real work**.

## Tech stack

- **Next.js 16**
- **React 19**
- plain CSS via `app/globals.css`
- local static data via `lib/data.js`

## Project structure

- `app/layout.js` — root layout and metadata
- `app/page.js` — app entry point
- `components/MissionControlPage.js` — main dashboard UI and view switching
- `lib/data.js` — current demo data model
- `app/globals.css` — styling and layout system

## Run locally

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

The app runs on:

- <http://localhost:8102>

## Near-term direction

The likely MVP path is:

1. make **Tasks** feel real
2. make **Agents** and **Approvals** operationally useful
3. connect **Calendar** to actual scheduled jobs / reminders
4. turn **Projects**, **Memory**, and **Docs** into useful linked views instead of static placeholders
5. add live data sources and persistence

## Design intent

The UI is meant to feel:

- dark
- calm
- high-signal
- low-noise
- operational without becoming sterile

It should feel like mission control, not enterprise punishment software.

## Status

Prototype in progress.
Not fake, not finished, and already pointing at something useful.
