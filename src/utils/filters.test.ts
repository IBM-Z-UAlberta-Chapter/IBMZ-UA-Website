import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CLUB_EMAILS,
  DISCORD_URL,
  GITHUB_URL,
  JOIN_FORM_URL,
  LINKEDIN_URL,
} from '../config';
import { EVENTS } from '../data/events';
import { LEARN_MODULES } from '../data/learn';
import { PRESENTATIONS } from '../data/presentations';
import { PROJECTS } from '../data/projects';
import { SPONSOR_TIERS } from '../data/sponsors';
import { LEADERSHIP_TEAM, VP_TEAM } from '../data/team';
import {
  filterEvents,
  formatEventDateBlock,
  getNextModuleIndex,
  getPageTitle,
  isKnownRootRoute,
  normalizeRoute,
  resolveRoute,
} from './filters';

test('filterEvents returns all upcoming seeded events for All + upcoming', () => {
  const result = filterEvents(EVENTS, 'All', 'upcoming');
  assert.equal(result.length, 4);
});

test('filterEvents filters Labs, Competitions, and Talks accurately', () => {
  const labs = filterEvents(EVENTS, 'Labs', 'upcoming');
  assert.equal(labs.length, 2);
  assert.ok(labs.every((e) => e.tag === 'Lab'));

  const comps = filterEvents(EVENTS, 'Competitions', 'upcoming');
  assert.equal(comps.length, 1);
  assert.equal(comps[0].id, 'evt-mini-datathon');

  const talks = filterEvents(EVENTS, 'Talks', 'upcoming');
  assert.equal(talks.length, 1);
  assert.equal(talks[0].id, 'evt-career-panel');
});

test('filterEvents returns empty list for past timeline on initial launch', () => {
  const past = filterEvents(EVENTS, 'All', 'past');
  assert.equal(past.length, 0);
});

test('formatEventDateBlock renders TBD for null and parses valid ISO dates', () => {
  assert.deepEqual(formatEventDateBlock(null), { month: 'DATE', day: 'TBD' });
  assert.deepEqual(formatEventDateBlock('2026-10-14'), { month: 'OCT', day: '14' });
  assert.deepEqual(formatEventDateBlock('invalid'), { month: 'DATE', day: 'TBD' });
});

test('getNextModuleIndex wraps cleanly with keyboard arrow/home/end keys for 4 tracks', () => {
  assert.equal(getNextModuleIndex(0, 'ArrowRight', 4), 1);
  assert.equal(getNextModuleIndex(3, 'ArrowRight', 4), 0);
  assert.equal(getNextModuleIndex(0, 'ArrowLeft', 4), 3);
  assert.equal(getNextModuleIndex(2, 'Home', 4), 0);
  assert.equal(getNextModuleIndex(1, 'End', 4), 3);
  assert.equal(getNextModuleIndex(1, 'Enter', 4), null);
});

test('resolveRoute and normalizeRoute handle all individual chapter pages and reject unknown routes', () => {
  assert.equal(normalizeRoute('/index.html'), '/');
  assert.equal(normalizeRoute('/events/'), '/events');
  assert.equal(resolveRoute('/'), '/');
  assert.equal(resolveRoute('/about'), '/about');
  assert.equal(resolveRoute('/events/'), '/events');
  assert.equal(resolveRoute('/learn'), '/learn');
  assert.equal(resolveRoute('/projects'), '/projects');
  assert.equal(resolveRoute('/talks'), '/talks');
  assert.equal(resolveRoute('/team'), '/team');
  assert.equal(resolveRoute('/sponsors'), '/sponsors');
  assert.equal(resolveRoute('/join'), '/join');
  assert.equal(resolveRoute('/unknown/page'), null);
  assert.equal(isKnownRootRoute('/events'), true);
  assert.equal(isKnownRootRoute('/events-old'), false);
  assert.match(getPageTitle('/events'), /Events/);
});

test('learn tracks exclude panel/datathon and avoid MOD-0X codes', () => {
  assert.equal(LEARN_MODULES.length, 4);
  assert.ok(LEARN_MODULES.every((m) => !m.code.startsWith('MOD-')));
  assert.ok(LEARN_MODULES.every((m) => !/datathon|speaker panel/i.test(m.title)));
});

test('sponsor tiers, contact emails, social URLs, and unconfirmed mock data meet chapter spec', () => {
  assert.deepEqual(
    SPONSOR_TIERS.map((t) => t.price),
    ['$500+', '$1,050+', '$1,450+']
  );
  assert.deepEqual([...CLUB_EMAILS], ['rsethi3@ualberta.ca', 'yzhou44@ualberta.ca']);
  assert.equal(DISCORD_URL, 'https://discord.gg/nvnH6vgTY');
  assert.equal(GITHUB_URL, 'https://github.com/IBM-Z-UAlberta-Chapter');
  assert.equal(LINKEDIN_URL, 'https://www.linkedin.com/company/ibm-z-ualberta-chapter/');
  assert.equal(JOIN_FORM_URL, 'https://forms.gle/CdvncDrEwxqctv4V7');
  assert.ok(PROJECTS.every((p) => p.confirmed === false));
  assert.ok(
    PRESENTATIONS.every(
      (d) => d.speaker === 'Speaker TBD' && d.dateLabel === 'Date TBD' && d.confirmed === false
    )
  );
  assert.ok(
    EVENTS.every(
      (e) =>
        e.date === null &&
        e.durationLabel === 'Time TBD' &&
        /TBD/i.test(e.location) &&
        e.isConfirmed === false
    )
  );
  assert.ok(LEARN_MODULES.every((m) => m.duration === 'Duration TBD'));
  assert.deepEqual(
    LEADERSHIP_TEAM.map((m) => ({ name: m.name, role: m.role, confirmed: m.confirmed })),
    [
      { name: 'Rumaiza Norova', role: 'IBM Z Ambassador', confirmed: true },
      { name: 'Raghav Sethi', role: 'Co-President & IBM Z Ambassador', confirmed: true },
      { name: 'Yifan Zhou', role: 'Co-President & IBM Z Ambassador', confirmed: true },
    ]
  );
  assert.ok(
    LEADERSHIP_TEAM.every(
      (m) => /IBM Z Ambassador/i.test(m.role) && m.responsibility.trim().length > 40
    )
  );
  assert.equal(VP_TEAM.length, 7);
  assert.ok(
    VP_TEAM.every((m) => m.name === 'To Be Hired' && m.initials === 'TBH' && m.confirmed === false)
  );
});
