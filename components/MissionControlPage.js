'use client';

import { useMemo, useState } from 'react';
import { missionData } from '../lib/data';

const toneClass = {
  blue: 'blue',
  green: 'green',
  yellow: 'yellow',
  purple: 'purple',
  red: 'red',
  default: '',
};

const dotClass = {
  blue: 'dot-blue',
  green: 'dot-green',
  yellow: 'dot-yellow',
  red: 'dot-red',
};

export default function MissionControlPage() {
  const [activeView, setActiveView] = useState('tasks');

  const content = useMemo(() => {
    switch (activeView) {
      case 'tasks':
        return <TasksView />;
      case 'agents':
        return <AgentsView />;
      case 'approvals':
        return <ApprovalsView />;
      case 'calendar':
        return <CalendarView />;
      case 'projects':
        return <ProjectsView />;
      case 'memory':
        return <MemoryView />;
      case 'docs':
        return <DocsView />;
      case 'office':
        return <OfficeView />;
      case 'team':
        return <TeamView />;
      default:
        return <TasksView />;
    }
  }, [activeView]);

  return (
    <div className="layout-shell">
      <aside className="left-rail">
        <div className="brand-wrap">
          <div className="brand-badge">M</div>
          <div>
            <div className="brand-title">Mission Control</div>
            <div className="brand-subtitle">OpenClaw Operating Layer</div>
          </div>
        </div>

        <nav className="tool-nav">
          {missionData.nav.map((item) => (
            <button
              key={item.key}
              className={`tool-link ${activeView === item.key ? 'active' : ''}`}
              onClick={() => setActiveView(item.key)}
            >
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="rail-box">
          <div className="rail-box-label">Mission</div>
          <p>{missionData.team.mission}</p>
        </div>
      </aside>

      <main className="main-shell">
        <header className="main-topbar">
          <div>
            <h1>{labelFor(activeView)}</h1>
            <p>{descriptionFor(activeView)}</p>
          </div>
          <div className="toolbar-actions">
            <span className="status-chip">Next.js</span>
            <span className="status-chip">Local host</span>
            <button className="create-btn">+ New task</button>
          </div>
        </header>

        <section className="kpi-row">
          <div className="kpi-card">
            <div className="kpi-label">This week</div>
            <div className="kpi-value">{missionData.summary.thisWeek}</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">In progress</div>
            <div className="kpi-value">{missionData.summary.inProgress}</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Total</div>
            <div className="kpi-value">{missionData.summary.total}</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Completion</div>
            <div className="kpi-value">{missionData.summary.completion}</div>
          </div>
        </section>

        {content}
      </main>
    </div>
  );
}

function TasksView() {
  const columns = [
    ['backlog', 'Backlog'],
    ['inProgress', 'In Progress'],
    ['review', 'Review'],
    ['done', 'Done'],
  ];

  return (
    <div className="task-layout">
      <section className="task-board-wrap">
        <div className="filter-bar">
          <span className="filter-pill">Board</span>
          <span className="filter-pill">All projects</span>
          <span className="filter-pill">All agents</span>
          <span className="filter-pill review">Review = Ross approval</span>
        </div>

        <div className="kanban-board">
          {columns.map(([key, label]) => (
            <div className="kanban-col" key={key}>
              <div className="kanban-head">
                <div className="kanban-title">{label}</div>
                <div className="kanban-count">{missionData.tasks[key].length}</div>
              </div>
              {missionData.tasks[key].map((item) => (
                <div className="task-card" key={item.title}>
                  <div className="task-title">{item.title}</div>
                  <div className="task-desc">{item.description}</div>
                  <div className="tags">
                    {item.tags.map((tag) => (
                      <span className={`tag ${toneClass[tag.tone] || ''}`} key={tag.label}>{tag.label}</span>
                    ))}
                  </div>
                  <div className="task-meta">
                    <span>{item.owner}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <aside className="activity-rail">
        <div className="rail-head">
          <h2>Live Activity</h2>
          <span className="status-chip">5 updates</span>
        </div>
        <div className="activity-feed">
          {missionData.tasks.activity.map((item) => (
            <div className="activity-card" key={`${item.time}-${item.title}`}>
              <div className="activity-time">{item.time}</div>
              <strong>{item.title}</strong>
              <div className="small-copy">{item.detail}</div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}

function AgentsView() {
  return (
    <div className="simple-grid two">
      {missionData.agents.map((agent) => (
        <div className="info-card" key={agent.name}>
          <div className="agent-line">
            <strong><span className={`status-dot ${dotClass[agent.tone] || 'dot-blue'}`} />{agent.name}</strong>
            <span className="status-chip">{agent.status}</span>
          </div>
          <div className="muted-line">{agent.role}</div>
          <p>{agent.detail}</p>
          <div className="muted-line">Heartbeat: {agent.heartbeat}</div>
        </div>
      ))}
    </div>
  );
}

function ApprovalsView() {
  return (
    <div className="simple-grid one">
      {missionData.approvals.map((item) => (
        <div className="info-card" key={item}>
          <strong>{item}</strong>
          <div className="muted-line">Waiting on Ross</div>
        </div>
      ))}
    </div>
  );
}

function CalendarView() {
  return (
    <div className="simple-grid one">
      {missionData.calendar.map((item) => (
        <div className="info-card" key={item.title}>
          <strong>{item.title}</strong>
          <div className="muted-line">{item.date} • {item.time}</div>
          <p>{item.kind}</p>
        </div>
      ))}
    </div>
  );
}

function ProjectsView() {
  return (
    <div className="simple-grid three">
      {missionData.projects.map((project) => (
        <div className="info-card" key={project.title}>
          <strong>{project.title}</strong>
          <div className="muted-line">{project.status} • Owner: {project.owner}</div>
          <p>{project.detail}</p>
        </div>
      ))}
    </div>
  );
}

function MemoryView() {
  return (
    <div className="memory-layout">
      <div className="info-card">
        <strong>Daily Memory</strong>
        <div className="list-stack">
          {missionData.memory.daily.map((item) => <div key={item} className="memory-item">{item}</div>)}
        </div>
      </div>
      <div className="info-card">
        <strong>Long-Term Memory</strong>
        <div className="list-stack">
          {missionData.memory.longTerm.map((item) => <div key={item} className="memory-item">{item}</div>)}
        </div>
      </div>
    </div>
  );
}

function DocsView() {
  return (
    <div className="simple-grid two">
      {missionData.docs.map((item) => (
        <div className="info-card" key={item}>
          <strong>{item}</strong>
          <div className="muted-line">Searchable document</div>
        </div>
      ))}
    </div>
  );
}

function OfficeView() {
  return (
    <div className="info-card office-box">
      <strong>Office</strong>
      <p>A playful 2D office layer should come after Tasks, Agents, Approvals, and Calendar are properly real. It should visualize Sir Alex, Bruno, Builder, Researcher, and Infra-operator hanging out and "working" in a funny, low-stakes way.</p>
    </div>
  );
}

function TeamView() {
  return (
    <div className="simple-grid one">
      <div className="info-card">
        <strong>Team Structure</strong>
        <div className="muted-line">{missionData.team.mission}</div>
        <div className="list-stack">
          {missionData.team.structure.map((item) => (
            <div key={`${item.parent}-${item.child}`} className="memory-item">{item.parent} → {item.child}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function labelFor(key) {
  const map = {
    tasks: 'Tasks',
    agents: 'Agents',
    approvals: 'Approvals',
    calendar: 'Calendar',
    projects: 'Projects',
    memory: 'Memory',
    docs: 'Docs',
    office: 'Office',
    team: 'Team',
  };
  return map[key] || 'Mission Control';
}

function descriptionFor(key) {
  const map = {
    tasks: 'Track active work across backlog, in progress, review, done, and live activity.',
    agents: 'See your named agents, their roles, heartbeat, and current status.',
    approvals: 'Everything currently waiting on your sign-off.',
    calendar: 'Scheduled cron jobs and proactive tasks.',
    projects: 'High-level progress across active initiatives.',
    memory: 'Daily memory and long-term memory views.',
    docs: 'All generated docs, plans, and specs.',
    office: 'A future playful 2D visualization of agent activity.',
    team: 'Role alignment and delegation structure for Sir Alex, Bruno, and the current agents.',
  };
  return map[key] || '';
}
