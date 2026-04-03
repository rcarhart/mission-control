import fs from 'node:fs';
import path from 'node:path';
import { missionData } from './data.js';

export const WORKSPACE_ROOT = '/home/docker/.openclaw/workspace';
export const OPENCLAW_ROOT = '/home/docker/.openclaw';

export function getMissionSnapshot() {
  try {
    const registry = readFile('specs/project-registry.yaml');
    const handoffs = readFile('plans/active-handoffs.md');
    const approvals = readFile('plans/approval-queue.yaml');
    const cronJobs = readCronJobs();

    const projectRegistry = parseProjectRegistry(registry);
    const activeHandoffs = parseActiveHandoffs(handoffs);
    const approvalQueue = parseApprovalQueue(approvals);

    return {
      ...missionData,
      brand: {
        ...missionData.brand,
        environment: 'Semi-live workspace snapshot · handoffs + approvals + cron',
      },
      filters: ['Active handoffs', 'Approval-aware', 'Cron-derived'],
      headline: buildHeadline(activeHandoffs, approvalQueue),
      overview: buildOverview(projectRegistry, activeHandoffs, approvalQueue),
      boardColumns: buildBoardColumns(activeHandoffs, approvalQueue),
      scheduleSummary: buildScheduleSummary(activeHandoffs, approvalQueue, cronJobs),
      calendarDays: buildCalendarDays(cronJobs),
      projects: buildProjects(projectRegistry, activeHandoffs, approvalQueue),
      pressurePoints: buildPressurePoints(activeHandoffs, approvalQueue),
      agents: buildAgents(projectRegistry, activeHandoffs),
      activity: buildActivity(activeHandoffs, approvalQueue, cronJobs),
      insights: buildInsights(projectRegistry, activeHandoffs, approvalQueue, cronJobs),
    };
  } catch (error) {
    return {
      ...missionData,
      activity: [
        {
          actor: 'System',
          time: 'Now',
          title: 'Fell back to demo data',
          detail: `Workspace snapshot failed: ${error.message}`,
        },
        ...missionData.activity,
      ],
    };
  }
}

function buildHeadline(handoffs, approvals) {
  const inProgress = handoffs.filter((entry) => /in-progress|monitoring/i.test(entry.status)).length;
  const blocked = handoffs.filter((entry) => /blocked/i.test(entry.status)).length;

  return {
    title: 'Mission-ready work, with less hand-waving',
    summary: `${inProgress} active slices are moving, ${blocked} are blocked, and ${approvals.length} approval items are tracked from the real workspace files instead of decorative fiction.`,
    cta: 'Refresh snapshot',
  };
}

function buildOverview(projects, handoffs, approvals) {
  const activeProjects = projects.filter((project) => project.status === 'active').length;
  const moving = handoffs.filter((entry) => /in-progress|monitoring/i.test(entry.status)).length;
  const blocked = handoffs.filter((entry) => /blocked/i.test(entry.status)).length;
  const approvalGates = approvals.filter((entry) => /approval-gate|waiting-on-ross/i.test(entry.state)).length;

  return [
    { label: 'Active projects', value: String(activeProjects), detail: 'From project-registry.yaml', tone: 'blue' },
    { label: 'Moving slices', value: String(moving), detail: 'In progress or monitoring in active-handoffs.md', tone: 'green' },
    { label: 'Blocked slices', value: String(blocked), detail: 'Explicitly blocked in active-handoffs.md', tone: blocked ? 'yellow' : 'green' },
    { label: 'Approval gates', value: String(approvalGates), detail: 'Tracked in approval-queue.yaml', tone: approvalGates ? 'purple' : 'green' },
  ];
}

function buildBoardColumns(handoffs, approvals) {
  const backlogCards = handoffs
    .filter((entry) => /planned/i.test(entry.status))
    .slice(0, 4)
    .map(toCard);

  const inProgressCards = handoffs
    .filter((entry) => /in-progress|monitoring/i.test(entry.status))
    .slice(0, 4)
    .map(toCard);

  const reviewCards = approvals.slice(0, 4).map((entry) => ({
    title: entry.task,
    summary: entry.why,
    project: entry.project,
    owner: entry.owner,
    eta: entry.next_review || 'Next pass',
    priority: entry.state,
    tags: [entry.state, 'Approval'],
  }));

  const doneCards = missionData.boardColumns.find((column) => column.id === 'done')?.cards || [];

  return [
    { id: 'backlog', title: 'Planned', count: backlogCards.length, accent: 'blue', cards: backlogCards },
    { id: 'in-progress', title: 'In Progress', count: inProgressCards.length, accent: 'yellow', cards: inProgressCards },
    { id: 'review', title: 'Approval / Review', count: reviewCards.length, accent: 'red', cards: reviewCards },
    { id: 'done', title: 'Done', count: doneCards.length, accent: 'green', cards: doneCards },
  ];
}

function buildScheduleSummary(handoffs, approvals, cronJobs) {
  const failingJobs = cronJobs.filter((job) => /error/i.test(job.state?.lastStatus || job.state?.lastRunStatus || '')).length;

  return [
    { label: 'Cron jobs', value: String(cronJobs.length), tone: 'blue' },
    { label: 'Approval items', value: String(approvals.length), tone: approvals.length ? 'purple' : 'green' },
    {
      label: 'Needs unblock',
      value: String(handoffs.filter((entry) => /blocked/i.test(entry.status)).length),
      tone: handoffs.some((entry) => /blocked/i.test(entry.status)) ? 'yellow' : 'green',
    },
    {
      label: 'Failing jobs',
      value: String(failingJobs),
      tone: failingJobs ? 'red' : 'green',
    },
  ];
}

function buildCalendarDays(cronJobs) {
  if (!cronJobs.length) {
    return missionData.calendarDays;
  }

  const grouped = new Map();

  cronJobs
    .filter((job) => job.enabled !== false)
    .sort((a, b) => (a.state?.nextRunAtMs || 0) - (b.state?.nextRunAtMs || 0))
    .forEach((job) => {
      const nextRunAtMs = job.state?.nextRunAtMs;
      const dayKey = nextRunAtMs ? formatDayKey(nextRunAtMs) : 'Unscheduled';
      const items = grouped.get(dayKey) || [];

      items.push({
        time: formatRunTime(job),
        name: job.name,
        owner: inferJobOwner(job),
        type: describeJob(job),
      });

      grouped.set(dayKey, items);
    });

  return Array.from(grouped.entries())
    .slice(0, 6)
    .map(([day, items]) => ({
      day,
      focus: buildDayFocus(items),
      items: items.slice(0, 4),
    }));
}

function buildProjects(projects, handoffs, approvals) {
  return projects
    .filter((project) => project.status === 'active')
    .map((project) => {
      const handoff = findProjectHandoff(project, handoffs);
      const projectApprovals = approvals.filter((entry) => relatesToProject(entry.project, project.id));
      const activeApproval = projectApprovals[0];
      const blocker = handoff?.blocker && handoff.blocker !== 'none' ? handoff.blocker : activeApproval?.task || 'None right now.';

      return {
        name: prettifyProjectName(project.id),
        status: handoff ? titleCase(handoff.status) : titleCase(project.status),
        health: blocker && blocker !== 'None right now.' ? 'Attention needed' : 'Moving',
        owner: handoff?.owner || project.owner,
        phase: handoff?.task || project.current_focus,
        summary: project.current_focus,
        next: handoff?.nextCheckpoint || 'Review next active slice.',
        blockers: blocker,
        approval: activeApproval
          ? {
              state: activeApproval.state || 'approval-gate',
              task: activeApproval.task || 'Approval detail missing',
              why: activeApproval.why || 'No reason recorded.',
              review: activeApproval.next_review || 'Next pass',
            }
          : null,
        verification: handoff?.verification || 'No verification note captured yet.',
        doneMeans: handoff?.doneMeans || 'Done means not yet captured in the active ledger.',
      };
    });
}

function buildPressurePoints(handoffs, approvals) {
  const blockerEntries = handoffs
    .filter((entry) => entry.blocker && entry.blocker !== 'none')
    .map((entry) => ({
      type: 'Blocker',
      project: prettifyProjectName(entry.project),
      title: entry.task,
      detail: entry.blocker,
      owner: entry.owner,
      next: entry.nextCheckpoint || 'Clarify next checkpoint',
      tone: /blocked/i.test(entry.status) ? 'red' : 'yellow',
    }));

  const approvalEntries = approvals.map((entry) => ({
    type: 'Approval',
    project: prettifyProjectName(entry.project),
    title: entry.task,
    detail: entry.why || 'Approval reason not captured.',
    owner: entry.owner,
    next: entry.next_review || 'Next pass',
    tone: /waiting-on-ross/i.test(entry.state) ? 'yellow' : 'purple',
  }));

  return [...blockerEntries, ...approvalEntries].slice(0, 6);
}

function buildAgents(projects, handoffs) {
  const ownerCounts = new Map();
  handoffs.forEach((entry) => {
    ownerCounts.set(entry.owner, (ownerCounts.get(entry.owner) || 0) + 1);
  });

  return [
    agentCard('Sir Alex', 'Front door / orchestrator', ownerCounts, projects, handoffs),
    agentCard('Scholesy', 'Builder / implementation', ownerCounts, projects, handoffs),
    agentCard('Carrick', 'Research / synthesis', ownerCounts, projects, handoffs),
    agentCard('Keano', 'Ops / systems / hygiene', ownerCounts, projects, handoffs),
  ];
}

function buildActivity(handoffs, approvals, cronJobs) {
  const recentHandoffs = [...handoffs]
    .sort((a, b) => compareHandoffDates(b.lastUpdate, a.lastUpdate))
    .slice(0, 3)
    .map((entry) => ({
      actor: entry.owner,
      time: entry.lastUpdate || 'Today',
      title: `${prettifyProjectName(entry.project)} · ${entry.status}`,
      detail: `${entry.task} Next checkpoint: ${entry.nextCheckpoint}`,
    }));

  const approvalActivity = approvals.slice(0, 1).map((entry) => ({
    actor: 'Approval queue',
    time: entry.next_review || 'Next review',
    title: `${prettifyProjectName(entry.project)} gate remains open`,
    detail: entry.task,
  }));

  const cronActivity = cronJobs
    .filter((job) => /error/i.test(job.state?.lastStatus || job.state?.lastRunStatus || ''))
    .slice(0, 2)
    .map((job) => ({
      actor: inferJobOwner(job),
      time: formatRelativeRun(job.state?.lastRunAtMs),
      title: `${job.name} needs attention`,
      detail: `Last run ended in error. Next attempt: ${formatRunTime(job)}.`,
    }));

  return [...recentHandoffs, ...cronActivity, ...approvalActivity];
}

function buildInsights(projects, handoffs, approvals, cronJobs) {
  const activeProjects = projects.filter((project) => project.status === 'active');
  const bestMomentum = [...handoffs].sort((a, b) => compareHandoffDates(b.lastUpdate, a.lastUpdate)).find((entry) => /in-progress/i.test(entry.status));

  return [
    {
      label: 'Need Ross input',
      value: String(approvals.filter((entry) => /waiting-on-ross/i.test(entry.state)).length),
      note: 'Only explicit waiting-on-ross items count here',
      tone: 'yellow',
    },
    {
      label: 'Blocked work',
      value: String(handoffs.filter((entry) => /blocked/i.test(entry.status)).length),
      note: 'Pulled straight from active-handoffs.md',
      tone: handoffs.some((entry) => /blocked/i.test(entry.status)) ? 'red' : 'green',
    },
    {
      label: 'Best momentum',
      value: bestMomentum ? prettifyProjectName(bestMomentum.project) : prettifyProjectName(activeProjects[0]?.id || 'Mission Control'),
      note: 'First active in-progress slice from the current ledger',
      tone: 'green',
    },
    {
      label: 'Cron health',
      value: cronJobs.some((job) => /error/i.test(job.state?.lastStatus || job.state?.lastRunStatus || '')) ? 'Attention needed' : 'Healthy',
      note: 'Directly derived from persisted cron job state',
      tone: cronJobs.some((job) => /error/i.test(job.state?.lastStatus || job.state?.lastRunStatus || '')) ? 'red' : 'green',
    },
  ];
}

function agentCard(name, role, ownerCounts, projects, handoffs) {
  const activeCount = ownerCounts.get(name) || 0;
  const ownedProjects = projects.filter((project) => project.owner === name || (project.primary_agent === 'main' && name === 'Sir Alex'));
  const currentFocus = handoffs.find((entry) => entry.owner === name)?.task || ownedProjects[0]?.current_focus || 'Ready for the next useful thing';

  return {
    name,
    role,
    status: activeCount ? 'Active' : 'Ready',
    load: `${Math.min(95, 25 + activeCount * 18)}%`,
    bio: `${name} is represented from the current workspace model rather than frozen flavor text.`,
    focus: currentFocus,
    traits: [`${activeCount} active slices`, `${ownedProjects.length} owned projects`, 'Workspace-derived'],
  };
}

function toCard(entry) {
  return {
    title: entry.task,
    summary: entry.blocker && entry.blocker !== 'none' ? `Blocker: ${entry.blocker}` : `Next checkpoint: ${entry.nextCheckpoint}`,
    project: prettifyProjectName(entry.project),
    owner: entry.owner,
    eta: entry.lastUpdate || 'Today',
    priority: titleCase(entry.status),
    tags: [entry.status, entry.approvalNeeded === 'yes' ? 'Approval' : 'Clear'],
  };
}

function parseProjectRegistry(content) {
  const lines = content.split('\n');
  const projects = [];
  let current = null;
  let inProjects = false;

  for (const line of lines) {
    if (line.startsWith('projects:')) {
      inProjects = true;
      continue;
    }

    if (inProjects && /^routing_rules:/.test(line)) {
      if (current) projects.push(current);
      break;
    }

    const projectMatch = line.match(/^  - id: (.+)$/);
    if (projectMatch) {
      if (current) projects.push(current);
      current = { id: projectMatch[1].trim() };
      continue;
    }

    const fieldMatch = line.match(/^    ([a-z_]+): (.+)$/);
    if (current && fieldMatch) {
      current[fieldMatch[1]] = fieldMatch[2].trim();
    }
  }

  if (current) projects.push(current);
  return projects;
}

export function parseApprovalQueue(content) {
  const lines = content.split('\n');
  const queueLine = lines.find((line) => line.startsWith('queue:'));

  if (queueLine && /\[\s*\]/.test(queueLine)) {
    return [];
  }

  const entries = [];
  let inQueue = false;
  let current = null;

  for (const line of lines) {
    if (line.startsWith('queue:')) {
      inQueue = true;
      continue;
    }

    if (inQueue && /^rules:/.test(line)) {
      if (current) {
        entries.push(current);
        current = null;
      }
      break;
    }

    const itemMatch = line.match(/^  - id: (.+)$/);
    if (itemMatch) {
      if (current) entries.push(current);
      current = { id: itemMatch[1].trim() };
      continue;
    }

    const fieldMatch = line.match(/^    ([a-z_]+): (.+)$/);
    if (current && fieldMatch) {
      current[fieldMatch[1]] = fieldMatch[2].trim();
    }
  }

  if (current) entries.push(current);
  return entries;
}

export function parseActiveHandoffs(content) {
  const lines = content.split('\n');
  const entries = [];
  let current = null;
  let inActiveSection = false;

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    if (line === '## Active') {
      inActiveSection = true;
      continue;
    }

    if (!inActiveSection) continue;

    if (!line.trim()) {
      if (current && current.project) {
        entries.push(normalizeHandoff(current));
        current = null;
      }
      continue;
    }

    const fieldMatch = line.match(/^(Project|Task|Owner|Status|Last update|Next checkpoint|Blocker|Approval needed|Verification|Done means):\s*(.*)$/);
    if (!fieldMatch) continue;

    if (!current) current = {};

    const key = fieldMatch[1];
    const value = fieldMatch[2].trim();

    if (key === 'Project') current.project = value;
    if (key === 'Task') current.task = value;
    if (key === 'Owner') current.owner = value;
    if (key === 'Status') current.status = value;
    if (key === 'Last update') current.lastUpdate = value;
    if (key === 'Next checkpoint') current.nextCheckpoint = value;
    if (key === 'Blocker') current.blocker = value;
    if (key === 'Approval needed') current.approvalNeeded = value;
    if (key === 'Verification') current.verification = value;
    if (key === 'Done means') current.doneMeans = value;
  }

  if (current && current.project) {
    entries.push(normalizeHandoff(current));
  }

  return entries;
}

function normalizeHandoff(entry) {
  return {
    ...entry,
    project: entry.project,
    status: entry.status || 'planned',
    blocker: (entry.blocker || 'none').toLowerCase() === 'none' ? 'none' : entry.blocker,
    approvalNeeded: (entry.approvalNeeded || 'no').toLowerCase(),
  };
}

function readFile(relativePath) {
  return fs.readFileSync(path.join(WORKSPACE_ROOT, relativePath), 'utf8');
}

function readCronJobs() {
  const cronPath = path.join(OPENCLAW_ROOT, 'cron', 'jobs.json');
  const content = fs.readFileSync(cronPath, 'utf8');
  return JSON.parse(content).jobs || [];
}

function formatDayKey(timestamp) {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone: 'America/New_York',
  }).format(new Date(timestamp));
}

function formatRunTime(job) {
  const nextRunAtMs = job.state?.nextRunAtMs;
  if (!nextRunAtMs) return 'Next run TBD';

  const time = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: job.schedule?.tz || 'UTC',
  }).format(new Date(nextRunAtMs));

  return `${time} ${job.schedule?.tz || 'UTC'}`;
}

function formatRelativeRun(timestamp) {
  if (!timestamp) return 'Recent';

  const diffHours = Math.max(0, Math.round((Date.now() - timestamp) / 3600000));
  if (diffHours < 1) return 'Less than 1h ago';
  if (diffHours === 1) return '1h ago';
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.round(diffHours / 24);
  return `${diffDays}d ago`;
}

function inferJobOwner(job) {
  const message = `${job.name} ${job.payload?.message || ''}`.toLowerCase();
  if (message.includes('scholesy')) return 'Scholesy';
  if (message.includes('carrick')) return 'Carrick';
  if (message.includes('keano') || message.includes('restore') || message.includes('hygiene')) return 'Keano';
  return 'Sir Alex';
}

function describeJob(job) {
  const name = job.name.toLowerCase();
  if (name.includes('brief')) return 'Brief';
  if (name.includes('roundup')) return 'Roundup';
  if (name.includes('hygiene')) return 'Audit';
  if (name.includes('execution')) return 'Autonomy loop';
  if (name.includes('research')) return 'Research pass';
  return 'Scheduled run';
}

function buildDayFocus(items) {
  const labels = [...new Set(items.map((item) => item.type))];
  return labels.slice(0, 2).join(' · ');
}

export function findProjectHandoff(project, handoffs) {
  return handoffs.find((entry) => relatesToProject(entry.project, project.id));
}

export function relatesToProject(candidate, projectId) {
  const normalizedCandidate = normalize(candidate);
  const normalizedProjectId = normalize(projectId);

  return normalizedCandidate === normalizedProjectId
    || normalizedCandidate.startsWith(`${normalizedProjectId}-`)
    || normalizedProjectId.startsWith(`${normalizedCandidate}-`);
}

function compareHandoffDates(left, right) {
  const leftTime = Date.parse(left || '');
  const rightTime = Date.parse(right || '');

  if (Number.isNaN(leftTime) && Number.isNaN(rightTime)) return 0;
  if (Number.isNaN(leftTime)) return -1;
  if (Number.isNaN(rightTime)) return 1;
  return leftTime - rightTime;
}

function normalize(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-');
}

function prettifyProjectName(value) {
  return String(value || '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function titleCase(value) {
  return String(value || '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
