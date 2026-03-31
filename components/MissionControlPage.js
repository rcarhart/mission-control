'use client';

import { useMemo, useState } from 'react';
import { missionData } from '../lib/data';

const toneClass = {
  blue: 'tone-blue',
  green: 'tone-green',
  yellow: 'tone-yellow',
  red: 'tone-red',
  purple: 'tone-purple',
};

export default function MissionControlPage() {
  const [activeSection, setActiveSection] = useState('tasks');

  const activeLabel = useMemo(
    () => missionData.sections.find((section) => section.id === activeSection)?.label || 'Tasks',
    [activeSection]
  );

  return (
    <div className="app-shell">
      <aside className="left-rail">
        <div className="brand-panel">
          <div className="brand-mark">MC</div>
          <div>
            <div className="brand-title">{missionData.brand.title}</div>
            <div className="brand-subtitle">{missionData.brand.subtitle}</div>
          </div>
        </div>

        <div className="environment-pill">{missionData.brand.environment}</div>

        <nav className="nav-stack" aria-label="Primary sections">
          {missionData.sections.map((section) => (
            <button
              key={section.id}
              type="button"
              className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id)}
            >
              <span className="nav-icon">{section.icon}</span>
              <span>{section.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-card">
          <div className="sidebar-label">Operating notes</div>
          <div className="sidebar-copy">
            Keep the board central. Make decisions visible. Avoid dashboard taxidermy.
          </div>
        </div>
      </aside>

      <main className="workspace-shell">
        <section className="topbar-card">
          <div>
            <div className="eyebrow">{activeLabel}</div>
            <h1>{missionData.headline.title}</h1>
            <p>{missionData.headline.summary}</p>
          </div>
          <div className="topbar-actions">
            <div className="filter-row">
              {missionData.filters.map((filter) => (
                <span className="filter-chip" key={filter}>{filter}</span>
              ))}
            </div>
            <button type="button" className="primary-button">{missionData.headline.cta}</button>
          </div>
        </section>

        <section className="metric-row">
          {missionData.overview.map((item) => (
            <article className="metric-card" key={item.label}>
              <div className="metric-label">{item.label}</div>
              <div className="metric-value">{item.value}</div>
              <div className={`metric-note ${toneClass[item.tone] || ''}`}>{item.detail}</div>
            </article>
          ))}
        </section>

        <div className="content-grid">
          <section className="main-panel">
            {activeSection === 'tasks' && <TasksView />}
            {activeSection === 'calendar' && <CalendarView />}
            {activeSection === 'projects' && <ProjectsView />}
            {activeSection === 'agents' && <AgentsView />}
            {activeSection === 'team' && <TeamView />}
          </section>

          <aside className="activity-panel">
            <div className="panel-head">
              <div>
                <div className="eyebrow">Live activity</div>
                <h2>What just moved</h2>
              </div>
              <span className="subtle-chip">Real work only</span>
            </div>

            <div className="activity-list">
              {missionData.activity.map((item) => (
                <article className="activity-item" key={`${item.time}-${item.title}`}>
                  <div className="activity-meta">
                    <span className="actor-pill">{item.actor}</span>
                    <span className="activity-time">{item.time}</span>
                  </div>
                  <strong>{item.title}</strong>
                  <p>{item.detail}</p>
                </article>
              ))}
            </div>

            <div className="insight-card">
              <div className="eyebrow">Operational readout</div>
              <div className="insight-list">
                {missionData.insights.map((item) => (
                  <div className="insight-row" key={item.label}>
                    <div>
                      <strong>{item.label}</strong>
                      <div className="meta-copy">{item.note}</div>
                    </div>
                    <span className={`count-pill ${toneClass[item.tone] || ''}`}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

function TasksView() {
  return (
    <div className="panel-shell">
      <div className="panel-head">
        <div>
          <div className="eyebrow">Main view</div>
          <h2>Task board</h2>
        </div>
        <span className="subtle-chip">Kanban is the center of gravity</span>
      </div>

      <div className="board-grid">
        {missionData.boardColumns.map((column) => (
          <section className="kanban-column" key={column.id}>
            <div className="column-head">
              <div className="column-title-wrap">
                <span className={`accent-dot ${column.accent}`} />
                <strong>{column.title}</strong>
              </div>
              <span className="column-count">{column.count}</span>
            </div>

            <div className="card-stack">
              {column.cards.map((card) => (
                <article className="task-card" key={card.title}>
                  <div className="task-topline">
                    <span className="task-project">{card.project}</span>
                    <span className="task-priority">{card.priority}</span>
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.summary}</p>
                  <div className="task-meta">
                    <span>{card.owner}</span>
                    <span>{card.eta}</span>
                  </div>
                  <div className="tag-row">
                    {card.tags.map((tag) => (
                      <span className="tag-chip" key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function CalendarView() {
  return (
    <div className="panel-shell">
      <div className="panel-head">
        <div>
          <div className="eyebrow">Scheduled agent work</div>
          <h2>Cron calendar</h2>
        </div>
        <div className="mini-metrics">
          {missionData.scheduleSummary.map((item) => (
            <span className={`count-pill ${toneClass[item.tone] || ''}`} key={item.label}>
              {item.label}: {item.value}
            </span>
          ))}
        </div>
      </div>

      <div className="calendar-grid">
        {missionData.calendarDays.map((day) => (
          <section className="calendar-day" key={day.day}>
            <div className="calendar-head">
              <div>
                <strong>{day.day}</strong>
                <div className="meta-copy">{day.focus}</div>
              </div>
            </div>
            <div className="calendar-stack">
              {day.items.map((item) => (
                <article className="calendar-item" key={`${day.day}-${item.name}`}>
                  <div className="calendar-time">{item.time}</div>
                  <strong>{item.name}</strong>
                  <div className="meta-copy">{item.type}</div>
                  <div className="calendar-owner">{item.owner}</div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function ProjectsView() {
  return (
    <div className="panel-shell">
      <div className="panel-head">
        <div>
          <div className="eyebrow">Current work</div>
          <h2>Projects</h2>
        </div>
        <span className="subtle-chip">Believable, current, useful</span>
      </div>

      <div className="project-list">
        {missionData.projects.map((project) => (
          <article className="project-row" key={project.name}>
            <div className="project-row-main">
              <div className="task-topline">
                <span className="task-project">{project.status}</span>
                <span className="task-priority">{project.health}</span>
              </div>
              <h3>{project.name}</h3>
              <p>{project.summary}</p>
            </div>
            <div className="project-facts">
              <InfoItem label="Owner" value={project.owner} />
              <InfoItem label="Phase" value={project.phase} />
              <InfoItem label="Next" value={project.next} />
              <InfoItem label="Blockers" value={project.blockers} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function AgentsView() {
  return (
    <div className="panel-shell">
      <div className="panel-head">
        <div>
          <div className="eyebrow">People running the place</div>
          <h2>Agents</h2>
        </div>
        <span className="subtle-chip">Bio cards, not cardboard cutouts</span>
      </div>

      <div className="agent-grid">
        {missionData.agents.map((agent) => (
          <article className="agent-card" key={agent.name}>
            <div className="agent-header">
              <div>
                <h3>{agent.name}</h3>
                <div className="meta-copy">{agent.role}</div>
              </div>
              <div className="agent-status">
                <span className="subtle-chip">{agent.status}</span>
                <span className="count-pill tone-blue">{agent.load}</span>
              </div>
            </div>
            <p>{agent.bio}</p>
            <InfoItem label="Current focus" value={agent.focus} />
            <div className="tag-row spaced-top">
              {agent.traits.map((trait) => (
                <span className="tag-chip" key={trait}>{trait}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function TeamView() {
  return (
    <div className="panel-shell">
      <div className="panel-head">
        <div>
          <div className="eyebrow">Who reports through what</div>
          <h2>Team structure</h2>
        </div>
        <span className="subtle-chip">Simple org chart, clearer ownership</span>
      </div>

      <div className="org-grid">
        {missionData.team.org.map((node) => (
          <article className="org-card" key={node.title}>
            <h3>{node.title}</h3>
            <div className="meta-copy">{node.subtitle}</div>
            <div className="org-children">
              {node.children.map((child) => (
                <span className="tag-chip" key={child}>{child}</span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="principles-card">
        <div className="eyebrow">Operating principles</div>
        <div className="principles-list">
          {missionData.team.principles.map((principle) => (
            <div className="principle-item" key={principle}>{principle}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className="info-item">
      <div className="eyebrow">{label}</div>
      <div>{value}</div>
    </div>
  );
}
