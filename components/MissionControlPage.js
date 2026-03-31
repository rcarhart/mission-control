'use client';

import { missionData } from '../lib/data';

const toneClass = {
  blue: 'tone-blue',
  green: 'tone-green',
  yellow: 'tone-yellow',
  red: 'tone-red',
  purple: 'tone-purple',
};

export default function MissionControlPage() {
  return (
    <div className="layout-shell">
      <aside className="left-rail">
        <div className="brand-wrap">
          <div className="brand-badge">M</div>
          <div>
            <div className="brand-title">{missionData.header.title}</div>
            <div className="brand-subtitle">{missionData.header.eyebrow}</div>
          </div>
        </div>

        <nav className="tool-nav">
          <a className="tool-link active" href="#overview">Overview</a>
          <a className="tool-link" href="#projects">Projects</a>
          <a className="tool-link" href="#attention">Needs attention</a>
          <a className="tool-link" href="#workload">Agent workload</a>
          <a className="tool-link" href="#activity">Recent activity</a>
          <a className="tool-link" href="#hygiene">Repo hygiene</a>
          <a className="tool-link" href="#schedule">Scheduling</a>
          <a className="tool-link" href="#office">Office view</a>
        </nav>

        <div className="rail-box">
          <div className="rail-box-label">Operating priorities</div>
          <div className="rail-list compact">
            {missionData.priorities.map((item) => (
              <div className="memory-item" key={item}>{item}</div>
            ))}
          </div>
        </div>
      </aside>

      <main className="main-shell">
        <header className="hero-card" id="overview">
          <div className="hero-copy">
            <div className="eyebrow">{missionData.header.eyebrow}</div>
            <h1>{missionData.header.description}</h1>
            <p>{missionData.header.statusNote}</p>
            <div className="chip-row">
              {missionData.header.contextChips.map((chip) => (
                <span className="status-chip" key={chip}>{chip}</span>
              ))}
            </div>
          </div>
          <div className="hero-side">
            <div className="mini-label">Scan result</div>
            <div className="hero-score">Stable momentum</div>
            <div className="hero-note">The center of gravity is now active projects. Ross decisions, blockers, and operational drift are visible without mode-switching.</div>
          </div>
        </header>

        <section className="kpi-row">
          {missionData.overview.map((item) => (
            <div className="kpi-card" key={item.label}>
              <div className="kpi-label">{item.label}</div>
              <div className="kpi-value">{item.value}</div>
              <div className={`kpi-detail ${toneClass[item.tone] || ''}`}>{item.detail}</div>
            </div>
          ))}
        </section>

        <div className="dashboard-grid">
          <section className="panel panel-large" id="projects">
            <div className="section-head">
              <div>
                <div className="section-kicker">Center of gravity</div>
                <h2>Active projects</h2>
              </div>
              <span className="status-chip">{missionData.projects.length} tracked</span>
            </div>

            <div className="project-grid">
              {missionData.projects.map((project) => (
                <article className="project-card" key={project.id}>
                  <div className="project-topline">
                    <span className={`tag ${toneClass[project.health.tone] || ''}`}>{project.health.label}</span>
                    <span className="priority-chip">{project.priority}</span>
                  </div>
                  <h3>{project.name}</h3>
                  <p>{project.summary}</p>

                  <div className="project-meta-grid">
                    <MetaItem label="Status" value={project.status} />
                    <MetaItem label="Phase" value={project.phase} />
                    <MetaItem label="Owner" value={project.owner} />
                    <MetaItem label="Support" value={project.support} />
                    <MetaItem label="Updated" value={project.updated} />
                    <MetaItem label="Repo" value={project.repo} />
                  </div>

                  <div className="stack-block">
                    <div className="mini-label">Next action</div>
                    <div className="memory-item emphasis">{project.nextStep}</div>
                  </div>

                  <div className="project-footer-grid">
                    <div>
                      <div className="mini-label">Blockers</div>
                      {project.blockers.length ? (
                        <div className="rail-list compact">
                          {project.blockers.map((blocker) => (
                            <div className="memory-item warning" key={blocker}>{blocker}</div>
                          ))}
                        </div>
                      ) : (
                        <div className="muted-line">No active blockers.</div>
                      )}
                    </div>
                    <div>
                      <div className="mini-label">Ross input</div>
                      <div className={`decision-flag ${project.waitingOnRoss ? 'needs' : 'clear'}`}>
                        {project.waitingOnRoss ? 'Decision needed' : 'Clear for now'}
                      </div>
                      <div className="mini-label top-gap">Reference links</div>
                      <div className="link-row">
                        {project.links.map((link) => (
                          <span className="status-chip" key={link}>{link}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="panel" id="attention">
            <div className="section-head">
              <div>
                <div className="section-kicker">Immediate signal</div>
                <h2>{missionData.attention.headline}</h2>
              </div>
              <span className="status-chip alert-chip">Act on this first</span>
            </div>
            <div className="rail-list">
              {missionData.attention.items.map((item) => (
                <div className="activity-card attention-card" key={item.title}>
                  <div className="card-topline">
                    <span className={`tag ${toneClass[item.tone] || ''}`}>{item.kind}</span>
                  </div>
                  <strong>{item.title}</strong>
                  <div className="small-copy">{item.detail}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="panel" id="workload">
            <div className="section-head">
              <div>
                <div className="section-kicker">Delegation visibility</div>
                <h2>Agent workload snapshot</h2>
              </div>
              <span className="status-chip">Useful, not decorative</span>
            </div>
            <div className="rail-list">
              {missionData.workload.map((agent) => (
                <article className="workload-card" key={agent.agent}>
                  <div className="agent-line">
                    <strong>{agent.agent}</strong>
                    <span className="status-chip">{agent.status}</span>
                  </div>
                  <div className="muted-line">{agent.role}</div>
                  <div className="progress-row">
                    <div className="progress-track"><span style={{ width: `${agent.load}%` }} /></div>
                    <div className="progress-value">{agent.load}%</div>
                  </div>
                  <div className="small-copy"><strong>Focus:</strong> {agent.focus}</div>
                  <div className="mini-label top-gap">Working on</div>
                  <div className="link-row">
                    {agent.workingOn.map((item) => (
                      <span className="status-chip" key={item}>{item}</span>
                    ))}
                  </div>
                  <div className="small-copy top-gap"><strong>Risk:</strong> {agent.risk}</div>
                </article>
              ))}
            </div>
          </section>

          <section className="panel" id="activity">
            <div className="section-head">
              <div>
                <div className="section-kicker">Meaningful changes</div>
                <h2>Recent activity</h2>
              </div>
              <span className="status-chip">Last 24h</span>
            </div>
            <div className="rail-list">
              {missionData.activity.map((item) => (
                <article className="activity-card" key={`${item.time}-${item.title}`}>
                  <div className="activity-time">{item.time}</div>
                  <strong>{item.title}</strong>
                  <div className="small-copy">{item.detail}</div>
                </article>
              ))}
            </div>
          </section>

          <section className="panel" id="hygiene">
            <div className="section-head">
              <div>
                <div className="section-kicker">Keep the shop clean</div>
                <h2>Repo / workspace hygiene</h2>
              </div>
              <span className="status-chip">Score {missionData.hygiene.score}</span>
            </div>
            <p className="panel-copy">{missionData.hygiene.summary}</p>
            <div className="rail-list compact">
              {missionData.hygiene.checks.map((check) => (
                <div className="hygiene-row" key={check.label}>
                  <div>
                    <strong>{check.label}</strong>
                    <div className="muted-line">{check.state}</div>
                  </div>
                  <span className={`tag ${toneClass[check.tone] || ''}`}>{check.tone}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="panel" id="schedule">
            <div className="section-head">
              <div>
                <div className="section-kicker">Visible recurring work</div>
                <h2>Cron / scheduling</h2>
              </div>
              <span className="status-chip">{missionData.schedule.length} jobs</span>
            </div>
            <div className="rail-list compact">
              {missionData.schedule.map((job) => (
                <article className="schedule-card" key={job.name}>
                  <div className="project-topline">
                    <strong>{job.name}</strong>
                    <span className="status-chip">{job.status}</span>
                  </div>
                  <div className="schedule-grid">
                    <MetaItem label="Next run" value={job.nextRun} />
                    <MetaItem label="Cadence" value={job.cadence} />
                    <MetaItem label="Purpose" value={job.purpose} />
                    <MetaItem label="Owner" value={job.owner} />
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="panel office-panel" id="office">
            <div className="section-head">
              <div>
                <div className="section-kicker">Playful layer</div>
                <h2>Office view, kept in its lane</h2>
              </div>
            </div>
            <p className="panel-copy">{missionData.office.note}</p>
            <div className="office-strip">
              {missionData.office.agents.map((item) => (
                <div className="office-avatar" key={item}>{item}</div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function MetaItem({ label, value }) {
  return (
    <div className="meta-item">
      <div className="mini-label">{label}</div>
      <div>{value}</div>
    </div>
  );
}
