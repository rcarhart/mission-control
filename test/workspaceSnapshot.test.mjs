import test from 'node:test';
import assert from 'node:assert/strict';
import {
  parseActiveHandoffs,
  parseApprovalQueue,
  relatesToProject,
  findProjectHandoff,
} from '../lib/workspaceSnapshot.js';

test('parseApprovalQueue handles empty inline queue syntax', () => {
  const content = `version: 1\nupdated: 2026-04-02\nqueue: []\n\nrules:\n  - keep it tidy`;
  assert.deepEqual(parseApprovalQueue(content), []);
});

test('parseApprovalQueue reads queue entries with detail fields', () => {
  const content = `version: 1\nqueue:\n  - id: gate-1\n    project: mission-control\n    owner: Sir Alex\n    state: waiting-on-ross\n    task: confirm approval drawer copy\n    why: decide whether summary should be terse\n    next_review: 2026-04-03\n\nrules:\n  - keep it tidy`;

  assert.deepEqual(parseApprovalQueue(content), [
    {
      id: 'gate-1',
      project: 'mission-control',
      owner: 'Sir Alex',
      state: 'waiting-on-ross',
      task: 'confirm approval drawer copy',
      why: 'decide whether summary should be terse',
      next_review: '2026-04-03',
    },
  ]);
});

test('parseActiveHandoffs captures verification and done-means fields', () => {
  const content = `# Active Handoffs\n\n## Active\n\nProject: mission-control\nTask: tighten semi-live snapshot parsing\nOwner: Sir Alex\nStatus: in-progress\nLast update: 2026-04-02\nNext checkpoint: add parser tests\nBlocker: none\nApproval needed: no\nVerification: run build and node tests\nDone means: approval and blocker detail show up in the UI\n`;

  assert.deepEqual(parseActiveHandoffs(content), [
    {
      project: 'mission-control',
      task: 'tighten semi-live snapshot parsing',
      owner: 'Sir Alex',
      status: 'in-progress',
      lastUpdate: '2026-04-02',
      nextCheckpoint: 'add parser tests',
      blocker: 'none',
      approvalNeeded: 'no',
      verification: 'run build and node tests',
      doneMeans: 'approval and blocker detail show up in the UI',
    },
  ]);
});

test('relatesToProject matches umbrella and slice naming safely', () => {
  assert.equal(relatesToProject('mission-control', 'mission-control'), true);
  assert.equal(relatesToProject('mealie-selective-sharing', 'mealie-selective-sharing'), true);
  assert.equal(relatesToProject('home-assistant-dashboard', 'home-assistant'), true);
  assert.equal(relatesToProject('repo-hygiene', 'mission-control'), false);
});

test('findProjectHandoff returns the matching active ledger entry', () => {
  const handoffs = [
    { project: 'repo-hygiene', task: 'cleanup drift', owner: 'Keano', status: 'monitoring' },
    { project: 'mission-control', task: 'build approval drill-down', owner: 'Sir Alex', status: 'in-progress' },
  ];

  assert.deepEqual(
    findProjectHandoff({ id: 'mission-control' }, handoffs),
    { project: 'mission-control', task: 'build approval drill-down', owner: 'Sir Alex', status: 'in-progress' }
  );
});
