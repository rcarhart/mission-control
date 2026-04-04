'use client';

import { useMemo, useState, useCallback } from 'react';
import { missionData } from '../lib/data';

const toneClass = {
  blue: 'tone-blue',
  green: 'tone-green',
  yellow: 'tone-yellow',
  red: 'tone-red',
  purple: 'tone-purple',
};

export default function MissionControlPage({ missionSnapshot = missionData }) {
  const data = missionSnapshot;
  const [activeSection, setActiveSection] = useState('tasks');
  const [drawerItem, setDrawerItem] = useState(null);

  const openDrawer = useCallback((item) => setDrawerItem(item), []);
  const closeDrawer = useCallback(() => setDrawerItem(null), []);

  const activeLabel = useMemo(
    () => data.sections.find((section) => section.id === activeSection)?.label || 'Tasks',
    [activeSection, data.sections]
  );

  return (
    <div className="app-shell">
      <aside className="left-rail">
        <div className="brand-panel">
          <div className="brand-mark">MC</div>
          <div>
            <div className="brand-title">{data.brand.title}</div>
            <div className="brand-subtitle">{data.brand.subtitle}</div>
          </div>
        </div>

        <div className="environment-pill">{data.brand.environment}</div>

        <nav className="nav-stack" aria-label="Primary sections">
          {data.sections.map((section) => (
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
            <h1>{data.headline.title}</h1>
            <p>{data.headline.summary}</p>
          </div>

        </section>

        <section className="metric-row">
          {data.overview.map((item) => (
            <article className="metric-card" key={item.label}>
              <div className="metric-label">{item.label}</div>
              <div className="metric-value">{item.value}</div>
              <div className={`metric-note ${toneClass[item.tone] || ''}`}>{item.detail}</div>
            </article>
          ))}
        </section>

        <div className="content-grid">
          <section className="main-panel">
            {activeSection === 'tasks' && <TasksView data={data} openDrawer={openDrawer} />}
            {activeSection === 'calendar' && <CalendarView data={data} />}
            {activeSection === 'projects' && <ProjectsView data={data} openDrawer={openDrawer} />}
            {activeSection === 'agents' && <AgentsView data={data} openDrawer={openDrawer} />}
            {activeSection === 'team' && <TeamView data={data} />}
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
              {data.activity.map((item) => (
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
                {data.insights.map((item) => (
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

      <DetailDrawer item={drawerItem} onClose={closeDrawer} />
    </div>
  );
}

function DetailDrawer({ item, onClose }) {
  if (!item) return null;

  return (
    <>
      <div
        className="drawer-overlay"
        role="presentation"
        onClick={onClose}
      />
      <aside className="detail-drawer" role="dialog" aria-modal="true" aria-label="Item detail">
        <div className="drawer-header">
          <div>
            <div className="eyebrow">{item.drawerKind || 'Detail'}</div>
            <h2>{item.title || item.name}</h2>
            {item.project && <div className="meta-copy">{item.project}</div>}
          </div>
          <button type="button" className="drawer-close" onClick={onClose} aria-label="Close detail panel">
            ✕
          </button>
        </div>

        <div className="drawer-body">
          {item.summary && (
            <div className="drawer-section">
              <div className="eyebrow">Summary</div>
              <p>{item.summary}</p>
            </div>
          )}

          {item.bio && (
            <div className="drawer-section">
              <div className="eyebrow">Bio</div>
              <p>{item.bio}</p>
            </div>
          )}

          <div className="drawer-facts">
            {item.owner && <InfoItem label="Owner" value={item.owner} />}
            {item.priority && <InfoItem label="Priority" value={item.priority} />}
            {item.status && <InfoItem label="Status" value={item.status} />}
            {item.eta && <InfoItem label="ETA" value={item.eta} />}
            {item.phase && <InfoItem label="Phase" value={item.phase} />}
            {item.health && <InfoItem label="Health" value={item.health} />}
            {item.role && <InfoItem label="Role" value={item.role} />}
            {item.load && <InfoItem label="Load" value={item.load} />}
            {item.focus && <InfoItem label="Current focus" value={item.focus} />}
            {item.next && <InfoItem label="Next checkpoint" value={item.next} />}
            {item.blockers && item.blockers !== 'None right now.' && (
              <InfoItem label="Blockers" value={item.blockers} />
            )}
            {item.verification && <InfoItem label="Verification" value={item.verification} />}
            {item.doneMeans && <InfoItem label="Done means" value={item.doneMeans} />}
          </div>

          {item.tags && item.tags.length > 0 && (
            <div className="drawer-section">
              <div className="eyebrow">Tags</div>
              <div className="tag-row spaced-top">
                {item.tags.map((tag) => (
                  <span className="tag-chip" key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          )}

          {item.traits && item.traits.length > 0 && (
            <div className="drawer-section">
              <div className="eyebrow">Traits</div>
              <div className="tag-row spaced-top">
                {item.traits.map((trait) => (
                  <span className="tag-chip" key={trait}>{trait}</span>
                ))}
              </div>
            </div>
          )}

          {item.approval && (
            <div className="drawer-section">
              <div className="eyebrow">Approval gate · {item.approval.state}</div>
              <p>{item.approval.task}</p>
              {item.approval.why && <div className="meta-copy">{item.approval.why}</div>}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

function TasksView({ data, openDrawer }) {
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
        {data.boardColumns.map((column) => (
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
                <article
                  className="task-card clickable"
                  key={card.title}
                  role="button"
                  tabIndex={0}
                  onClick={() => openDrawer({ ...card, drawerKind: 'Task' })}
                  onKeyDown={(e) => e.key === 'Enter' && openDrawer({ ...card, drawerKind: 'Task' })}
                >
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

      <PressurePointsView data={data} />
    </div>
  );
}

function CalendarView({ data, openDrawer }) {
  return (
    <div className="panel-shell">
      <div className="panel-head">
        <div>
          <div className="eyebrow">Scheduled agent work</div>
          <h2>Cron calendar</h2>
        </div>
        <div className="mini-metrics">
          {data.scheduleSummary.map((item) => (
            <span className={`count-pill ${toneClass[item.tone] || ''}`} key={item.label}>
              {item.label}: {item.value}
            </span>
          ))}
        </div>
      </div>

      <div className="calendar-grid">
        {data.calendarDays.map((day) => (
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

function ProjectsView({ data, openDrawer }) {
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
        {data.projects.map((project) => (
          <article
            className="project-row clickable"
            key={project.name}
            role="button"
            tabIndex={0}
            onClick={() => openDrawer({ ...project, title: project.name, drawerKind: 'Project' })}
            onKeyDown={(e) => e.key === 'Enter' && openDrawer({ ...project, title: project.name, drawerKind: 'Project' })}
          >
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
              <InfoItem label="Verification" value={project.verification} />
              <InfoItem label="Done means" value={project.doneMeans} />
              {project.approval ? (
                <InfoItem
                  label={`Approval · ${project.approval.state}`}
                  value={`${project.approval.task} — ${project.approval.why} Review: ${project.approval.review}`}
                />
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function AgentsView({ data, openDrawer }) {
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
        {data.agents.map((agent) => (
          <article
            className="agent-card clickable"
            key={agent.name}
            role="button"
            tabIndex={0}
            onClick={() => openDrawer({ ...agent, title: agent.name, drawerKind: 'Agent' })}
            onKeyDown={(e) => e.key === 'Enter' && openDrawer({ ...agent, title: agent.name, drawerKind: 'Agent' })}
          >
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

function TeamView({ data }) {
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
        {data.team.org.map((node) => (
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
          {data.team.principles.map((principle) => (
            <div className="principle-item" key={principle}>{principle}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PressurePointsView({ data }) {
  if (!data.pressurePoints?.length) {
    return null;
  }

  return (
    <section className="pressure-points">
      <div className="panel-head compact">
        <div>
          <div className="eyebrow">Why something is stuck</div>
          <h2>Pressure points</h2>
        </div>
        <span className="subtle-chip">Blockers and approvals with actual detail</span>
      </div>

      <div className="pressure-grid">
        {data.pressurePoints.map((item) => (
          <article className="pressure-card" key={`${item.type}-${item.project}-${item.title}`}>
            <div className="task-topline">
              <span className="task-project">{item.project}</span>
              <span className={`count-pill ${toneClass[item.tone] || ''}`}>{item.type}</span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.detail}</p>
            <div className="project-facts single-column">
              <InfoItem label="Owner" value={item.owner} />
              <InfoItem label="Next move" value={item.next} />
            </div>
          </article>
        ))}
      </div>
    </section>
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
