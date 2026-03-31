export const missionData = {
  nav: [
    { key: 'tasks', label: 'Tasks' },
    { key: 'agents', label: 'Agents' },
    { key: 'approvals', label: 'Approvals' },
    { key: 'calendar', label: 'Calendar' },
    { key: 'projects', label: 'Projects' },
    { key: 'memory', label: 'Memory' },
    { key: 'docs', label: 'Docs' },
    { key: 'office', label: 'Office' },
    { key: 'team', label: 'Team' },
  ],
  summary: {
    thisWeek: 12,
    inProgress: 3,
    total: 9,
    completion: '68%'
  },
  tasks: {
    backlog: [
      {
        title: 'Home Assistant VM Access Hardening',
        description: 'Stabilize access path and validate a safe workflow for live dashboard implementation work.',
        owner: 'Bruno',
        tags: [
          { label: 'Infrastructure', tone: 'blue' },
          { label: 'Blocked', tone: 'yellow' }
        ]
      },
      {
        title: 'Plex Local-First Deployment Plan',
        description: 'Define media mount strategy, local-only rollout, and data path expectations before install.',
        owner: 'Builder',
        tags: [
          { label: 'Media', tone: 'purple' },
          { label: 'Planning', tone: 'default' }
        ]
      }
    ],
    inProgress: [
      {
        title: 'Mission Control UI Rebuild',
        description: 'Rebuild the app around the dark premium layout, left nav, KPI strip, kanban board, and live activity rail.',
        owner: 'Sir Alex + Builder',
        tags: [
          { label: 'UI', tone: 'blue' },
          { label: 'Active', tone: 'green' }
        ]
      },
      {
        title: 'Mealie Shared Collections',
        description: 'Continue the fork with canonical sharing, scoped comments, and a cleaner demo checkpoint.',
        owner: 'Builder',
        tags: [
          { label: 'Product', tone: 'purple' },
          { label: 'Backend', tone: 'blue' }
        ]
      },
      {
        title: 'Repo Hygiene Audit Loop',
        description: 'Turn the first cleanup pass into a recurring review that catches stale docs, duplicate structures, and drift early.',
        owner: 'Infra-operator',
        tags: [
          { label: 'Ops', tone: 'green' },
          { label: 'Hygiene', tone: 'yellow' }
        ]
      }
    ],
    review: [
      {
        title: 'Kitchen Dashboard Live Rollout',
        description: 'Hero Meal First design is approved visually; waiting for Ross to approve the next implementation phase into the live Home Assistant dashboard.',
        owner: 'Sir Alex',
        tags: [
          { label: 'Approval Needed', tone: 'red' },
          { label: 'Kitchen', tone: 'blue' }
        ]
      },
      {
        title: 'PittsburghDivorce Backend Direction',
        description: 'Need a decision on where leads should go first: email, CRM, sheet, or internal admin queue.',
        owner: 'Builder',
        tags: [
          { label: 'Approval Needed', tone: 'red' },
          { label: 'Revenue', tone: 'green' }
        ]
      },
      {
        title: 'Mission Control Product Scope',
        description: 'Need approval on whether to focus first on Tasks, Agents, Approvals, and Calendar as the MVP.',
        owner: 'Bruno',
        tags: [
          { label: 'Approval Needed', tone: 'red' },
          { label: 'Product', tone: 'purple' }
        ]
      }
    ],
    done: [
      {
        title: 'Kitchen Dashboard Direction Approved',
        description: 'Hero Meal First chosen as the live kitchen dashboard direction.',
        owner: 'Sir Alex',
        tags: [
          { label: 'Approved', tone: 'green' },
          { label: 'UI', tone: 'blue' }
        ]
      }
    ],
    activity: [
      {
        time: '2m ago',
        title: 'Sir Alex updated Mission Control layout',
        detail: 'Reworked Tasks to match the screenshot-inspired layout with review lane and right-side live activity.'
      },
      {
        time: '11m ago',
        title: 'Infra-operator inspected backup health',
        detail: 'Confirmed the backup path is present and cleanup planning can become a recurring operational check.'
      },
      {
        time: '24m ago',
        title: 'Builder reviewed Home Assistant config access',
        detail: 'Confirmed the implementation path for dashboard work still depends on stable access to the live config.'
      },
      {
        time: '38m ago',
        title: 'Builder pushed Mealie scaffolding',
        detail: 'Shared collections route, schema, and migration scaffolding were pushed to the feature branch.'
      },
      {
        time: '57m ago',
        title: 'Bruno rebalanced active work',
        detail: 'Project ownership was cleaned up across Sir Alex, Builder, Infra-operator, and Researcher.'
      }
    ]
  },
  agents: [
    {
      name: 'Sir Alex',
      role: 'Front Door / Coordinator',
      status: 'Active',
      tone: 'blue',
      heartbeat: 'just now',
      detail: 'Owns the relationship layer, coordinates projects, and keeps the overall picture coherent.'
    },
    {
      name: 'Bruno',
      role: 'Supervisor / Orchestrator',
      status: 'Busy',
      tone: 'green',
      heartbeat: '2 minutes ago',
      detail: 'Shapes plans, assigns work, and keeps multi-step efforts from turning into soup.'
    },
    {
      name: 'Builder',
      role: 'Implementation',
      status: 'Busy',
      tone: 'yellow',
      heartbeat: '5 minutes ago',
      detail: 'Owns Mealie implementation, app builds, and practical delivery work.'
    },
    {
      name: 'Researcher',
      role: 'Research / Synthesis',
      status: 'Idle-ready',
      tone: 'blue',
      heartbeat: '27 minutes ago',
      detail: 'Handles external research, comparisons, and evidence gathering when a decision needs real grounding.'
    },
    {
      name: 'Infra-operator',
      role: 'Operations / Hygiene',
      status: 'Active',
      tone: 'green',
      heartbeat: '8 minutes ago',
      detail: 'Owns backup checks, repo hygiene, host sanity, and operational follow-through.'
    }
  ],
  approvals: [
    'Kitchen dashboard implementation phase',
    'Mission Control MVP scope',
    'PittsburghDivorce backend route',
    'Mealie demo milestone definition'
  ],
  calendar: [
    {
      date: 'Daily',
      time: '14:00 America/New_York',
      title: 'repo-hygiene-audit',
      kind: 'recurring'
    }
  ],
  projects: [
    {
      title: 'Mission Control',
      status: 'In Progress',
      owner: 'Sir Alex + Bruno',
      detail: 'Core operations app where project, approval, scheduling, and activity views come together.'
    },
    {
      title: 'Kitchen Dashboard',
      status: 'Approved Design',
      owner: 'Sir Alex',
      detail: 'Hero Meal First approved; implementation plan now needs the stable live Home Assistant path.'
    },
    {
      title: 'Mealie Fork',
      status: 'In Progress',
      owner: 'Builder',
      detail: 'Selective recipe sharing and canonical model implementation are underway.'
    }
  ],
  memory: {
    daily: [
      '2026-03-29 — Mealie spec and worker system planning expanded heavily.',
      '2026-03-30 — Kitchen dashboard approved and host/HA access improved.',
      '2026-03-31 — Discord routing and workspace identity were cleaned up around Sir Alex and Bruno.'
    ],
    longTerm: [
      'Ross prefers clear ownership, direct status, and low-fluff operating views.',
      'Kitchen dashboard should follow the Hero Meal First pattern with Skylight-inspired styling.',
      'Mission Control is the operating surface for the Ross + Sir Alex system, not a homelab sub-app.'
    ]
  },
  docs: [
    'Mission Control Dashboard Spec',
    'Mission Control Next.js Plan',
    'Mealie Product Spec',
    'Mealie Milestone 1 Implementation Plan',
    'Mealie Codebase Gap Analysis',
    'Mealie Schema Proposal v1',
    'Mealie Backend Touchpoints',
    'Repo Hygiene Brief'
  ],
  team: {
    mission: 'Help Ross run projects cleanly through one front door, clear ownership, useful delegation, and visible operational follow-through.',
    structure: [
      { parent: 'Sir Alex', child: 'Bruno' },
      { parent: 'Bruno', child: 'Builder' },
      { parent: 'Bruno', child: 'Researcher' },
      { parent: 'Bruno', child: 'Infra-operator' }
    ]
  }
};
