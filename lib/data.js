export const missionData = {
  header: {
    eyebrow: 'Ross + Sir Alex operating surface',
    title: 'Mission Control',
    description:
      'One place to scan active projects, agent ownership, blockers, repo drift, and upcoming scheduled work without spelunking through tabs, chats, or half-finished docs.',
    contextChips: ['Local-first', 'Static operating model v1', 'Outside homelab', 'Dark command center'],
    statusNote: 'First meaningful build slice: centered on active work and operational attention, not placeholder sections.'
  },
  overview: [
    { label: 'Active projects', value: '4', detail: 'All are real workstreams', tone: 'blue' },
    { label: 'Needs attention', value: '5', detail: 'Blocked, stale, or waiting on input', tone: 'red' },
    { label: 'Waiting on Ross', value: '3', detail: 'Clear decisions required', tone: 'yellow' },
    { label: 'Recently updated', value: '4', detail: 'Touched in the last 24h', tone: 'green' },
    { label: 'Repo hygiene', value: '84%', detail: 'A few drift signals worth cleaning', tone: 'purple' },
    { label: 'Upcoming cron jobs', value: '4', detail: 'Next run in 43 minutes', tone: 'blue' }
  ],
  priorities: [
    'Make active projects the center of gravity.',
    'Expose blockers and Ross decisions immediately.',
    'Keep agent ownership, repo drift, and scheduled work visible.'
  ],
  projects: [
    {
      id: 'mission-control',
      name: 'Mission Control dashboard',
      summary: 'Refactor the prototype into a credible command center with one-page operational scanability.',
      status: 'in-progress',
      priority: 'P1',
      owner: 'Builder',
      support: 'Sir Alex + Bruno',
      phase: 'UI restructuring',
      updated: '12 min ago',
      nextStep: 'Wire richer project/detail pages and start deriving data from workspace artifacts.',
      blockers: [],
      waitingOnRoss: false,
      repo: 'mission-control',
      links: ['Spec', 'README'],
      health: { label: 'Shipping', tone: 'green' }
    },
    {
      id: 'mealie-sharing',
      name: 'Mealie selective sharing / cookbook model',
      summary: 'Build a cleaner sharing model with canonical collections, scoped access, and demo-ready flows.',
      status: 'review',
      priority: 'P1',
      owner: 'Builder',
      support: 'Researcher',
      phase: 'Backend direction checkpoint',
      updated: '47 min ago',
      nextStep: 'Decide what the first demo milestone must prove so implementation can narrow.',
      blockers: ['Milestone definition still fuzzy'],
      waitingOnRoss: true,
      repo: 'mealie',
      links: ['Product spec', 'Milestone 1 plan'],
      health: { label: 'Decision needed', tone: 'yellow' }
    },
    {
      id: 'ha-dashboard',
      name: 'Home Assistant dashboard',
      summary: 'Turn the approved Hero Meal First concept into a live dashboard path without fragile config access.',
      status: 'blocked',
      priority: 'P1',
      owner: 'Infra-operator',
      support: 'Sir Alex',
      phase: 'Access stabilization',
      updated: '2.1h ago',
      nextStep: 'Stabilize live config workflow and confirm safe iteration path before layout implementation.',
      blockers: ['Live config access is still brittle'],
      waitingOnRoss: false,
      repo: 'homelab / home-assistant',
      links: ['Design notes'],
      health: { label: 'Blocked', tone: 'red' }
    },
    {
      id: 'restore-drill',
      name: 'Weekly restore drill / backup readiness',
      summary: 'Keep operational resilience honest with recurring restore checks, not vibes and crossed fingers.',
      status: 'planned',
      priority: 'P2',
      owner: 'Infra-operator',
      support: 'Bruno',
      phase: 'Schedule + reporting',
      updated: '5.4h ago',
      nextStep: 'Add a visible runbook summary and capture results from the next audit cycle.',
      blockers: [],
      waitingOnRoss: false,
      repo: 'ops / workspace',
      links: ['Backup-readiness brief'],
      health: { label: 'Healthy setup', tone: 'blue' }
    }
  ],
  attention: {
    headline: 'Needs attention now',
    items: [
      {
        title: '3 projects need a Ross decision',
        detail: 'Mission Control direction is moving, but Mealie milestone scope, backend route expectations, and demo definition still want explicit calls.',
        tone: 'yellow',
        kind: 'Waiting on Ross'
      },
      {
        title: 'Home Assistant work is blocked on access hygiene',
        detail: 'Design direction is approved, but implementation should not proceed until the live config path stops being brittle.',
        tone: 'red',
        kind: 'Blocker'
      },
      {
        title: 'Two workstreams are starting to go stale',
        detail: 'Weekly restore drill and repo hygiene reporting both need fresher update notes or they start reading like wishful thinking.',
        tone: 'purple',
        kind: 'Staleness'
      },
      {
        title: 'Workspace artifacts are outrunning documentation',
        detail: 'There are implementation breadcrumbs and docs, but some active directories are still under-described relative to real work.',
        tone: 'blue',
        kind: 'Repo drift'
      },
      {
        title: 'Screenshot reference still needs to be reattached',
        detail: 'The original layout reference is known to exist in OpenClaw media storage and should be turned into explicit layout notes.',
        tone: 'yellow',
        kind: 'Follow-up'
      }
    ]
  },
  workload: [
    {
      agent: 'Sir Alex',
      role: 'Front door / coordinator',
      status: 'active',
      load: 68,
      focus: 'Keeping project ownership and decision surfaces coherent.',
      workingOn: ['Mission Control framing', 'Ross-facing summaries'],
      risk: 'Moderate context load'
    },
    {
      agent: 'Bruno',
      role: 'Supervisor / orchestrator',
      status: 'busy',
      load: 74,
      focus: 'Sequencing cross-project work and reducing soup.',
      workingOn: ['Restore drill structure', 'Project routing'],
      risk: 'No major issue'
    },
    {
      agent: 'Builder',
      role: 'Implementation',
      status: 'busy',
      load: 87,
      focus: 'Mission Control UI slice and Mealie delivery.',
      workingOn: ['Dashboard rebuild', 'Mealie sharing model'],
      risk: 'Highest workload this cycle'
    },
    {
      agent: 'Researcher',
      role: 'Research / synthesis',
      status: 'ready',
      load: 32,
      focus: 'Available for spec cleanup or decision support.',
      workingOn: ['Standby'],
      risk: 'Underused capacity'
    },
    {
      agent: 'Infra-operator',
      role: 'Ops / hygiene',
      status: 'active',
      load: 63,
      focus: 'Repo cleanliness, access stability, and backup sanity.',
      workingOn: ['HA access path', 'Restore drill hygiene'],
      risk: 'Blocked by brittle environment details'
    }
  ],
  activity: [
    {
      time: '12 min ago',
      title: 'Mission Control slice shifted to one-page command center',
      detail: 'The dashboard is being re-centered around active projects, attention, workload, activity, hygiene, and scheduling instead of disconnected tabs.',
      type: 'product'
    },
    {
      time: '47 min ago',
      title: 'Mealie sharing work hit a milestone-definition checkpoint',
      detail: 'Implementation is moving, but the first demo boundary still needs a clear success definition.',
      type: 'project'
    },
    {
      time: '2.1h ago',
      title: 'Home Assistant dashboard path flagged as blocked',
      detail: 'The visual direction is approved, but live config access remains too brittle for safe iteration.',
      type: 'blocker'
    },
    {
      time: '3.4h ago',
      title: 'Repo hygiene audit surfaced documentation drift',
      detail: 'Active work exists in code and notes, but not every artifact is reflected cleanly in the operating view yet.',
      type: 'hygiene'
    },
    {
      time: '5.4h ago',
      title: 'Weekly restore drill remains planned, not yet fully evidenced',
      detail: 'Scheduling exists conceptually; reporting and visible proof still need to become routine.',
      type: 'ops'
    }
  ],
  hygiene: {
    score: 84,
    status: 'Mostly healthy, mildly scruffy',
    summary:
      'The repo is not on fire. It is, however, accumulating a few classic “we know what we meant” artifacts that deserve daylight before they become folklore.',
    checks: [
      { label: 'Tracked projects reflected in dashboard', state: '4/4 accounted for', tone: 'green' },
      { label: 'Underdocumented active artifacts', state: '3 worth reviewing', tone: 'yellow' },
      { label: 'Duplicate/stale directories', state: '1 suspected cleanup target', tone: 'yellow' },
      { label: 'Runtime clutter warnings', state: 'Low', tone: 'green' },
      { label: 'Spec / implementation mismatch', state: 'Layout reference follow-up open', tone: 'red' }
    ]
  },
  schedule: [
    {
      name: 'repo-hygiene-audit',
      nextRun: 'Today · 21:03 UTC',
      cadence: 'Daily',
      purpose: 'Audit',
      owner: 'Infra-operator',
      status: 'scheduled'
    },
    {
      name: 'restore-drill-checkpoint',
      nextRun: 'Thu · 14:00 America/New_York',
      cadence: 'Weekly',
      purpose: 'Operational check',
      owner: 'Infra-operator',
      status: 'needs runbook summary'
    },
    {
      name: 'morning-priority-brief',
      nextRun: 'Weekdays · 09:15 America/New_York',
      cadence: 'Weekdays',
      purpose: 'Reminder',
      owner: 'Sir Alex',
      status: 'healthy'
    },
    {
      name: 'spec-drift-review',
      nextRun: 'Fri · 16:30 UTC',
      cadence: 'Weekly',
      purpose: 'Audit',
      owner: 'Bruno',
      status: 'healthy'
    }
  ],
  office: {
    note: 'Office view stays playful and secondary. The serious surface should answer the real operational questions first.',
    agents: ['Sir Alex at the front desk', 'Bruno near the planning wall', 'Builder buried in monitors', 'Researcher with too many tabs', 'Infra-operator beside the server cart']
  }
};
