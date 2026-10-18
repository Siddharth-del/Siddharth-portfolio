// "Siddharth API": a mock REST API of this portfolio, answered in the browser.
// Every response is built from portfolio.js, so the console never drifts from the rest of the page.
// Errors use Spring Boot's default error body (timestamp / status / error / path).
import { profile, education, skillGroups, projects, certifications, heroStack } from './portfolio';

const camel = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+(.)/g, (_, c) => c.toUpperCase())
    .replace(/[^a-zA-Z0-9]/g, '');

const linkOf = (p, kind) => p.links.find((l) => l.kind === kind)?.url ?? null;

const STATUS_TEXT = { 200: 'OK', 201: 'Created', 404: 'Not Found', 405: 'Method Not Allowed' };

function springError(status, path, message) {
  return {
    status,
    body: {
      timestamp: new Date().toISOString().replace('Z', '+00:00'),
      status,
      error: STATUS_TEXT[status],
      ...(message ? { message } : {}),
      path,
    },
  };
}

// Each route: method -> handler(params) returning { status, body, headers? }
const routes = [
  {
    path: '/api/siddharth',
    summary: 'Who I am',
    GET: () => ({
      status: 200,
      body: {
        name: profile.name,
        role: profile.role,
        location: 'Greater Noida, India',
        openToWork: true,
        lookingFor: 'Backend engineering roles',
        stack: heroStack,
        education: {
          degree: education.degree,
          school: 'Gautam Buddha University',
          years: education.years,
          cgpa: Number.parseFloat(education.cgpa),
        },
        _links: {
          projects: '/api/projects',
          skills: '/api/skills',
          certifications: '/api/certifications',
          hire: '/api/hire',
        },
      },
    }),
  },
  {
    path: '/api/skills',
    summary: 'What I build with',
    GET: () => ({
      status: 200,
      body: Object.fromEntries(skillGroups.map((g) => [camel(g.title), g.items])),
    }),
  },
  {
    path: '/api/projects',
    summary: 'Everything I have shipped',
    GET: () => ({
      status: 200,
      body: {
        count: projects.length,
        projects: projects.map((p) => ({
          id: p.id,
          name: p.name,
          type: p.subtitle,
          live: linkOf(p, 'live'),
          _link: `/api/projects/${p.id}`,
        })),
      },
    }),
  },
  {
    path: '/api/projects/{id}',
    summary: 'One project in detail',
    GET: ({ id }) => {
      const p = projects.find((x) => x.id === id);
      if (!p) return springError(404, `/api/projects/${id}`, `No project with id '${id}'. Try GET /api/projects`);
      return {
        status: 200,
        body: {
          id: p.id,
          name: p.name,
          type: p.subtitle,
          summary: p.summary,
          stack: p.stack,
          highlights: p.highlights,
          links: Object.fromEntries(p.links.map((l) => [l.kind === 'live' ? 'live' : 'github', l.url])),
        },
      };
    },
  },
  {
    path: '/api/certifications',
    summary: 'Courses and achievements',
    GET: () => ({
      status: 200,
      body: certifications.map((c) => ({ title: c.title, issuer: c.issuer, date: c.date, type: c.kind })),
    }),
  },
  {
    path: '/api/hire',
    summary: 'Start a conversation',
    POST: () => ({
      status: 201,
      headers: { location: '#contact' },
      body: {
        status: 'CREATED',
        message: "Request received. Let's talk about the role.",
        contact: {
          email: profile.email,
          phone: profile.phone,
          linkedin: profile.links.linkedin,
        },
        _links: { contactForm: '#contact', resume: profile.resume },
      },
    }),
  },
  {
    path: '/actuator/health',
    summary: 'Spring Boot Actuator health check',
    GET: () => ({ status: 200, body: { status: 'UP' } }),
  },
];

export const METHODS = ['GET', 'POST', 'PUT', 'DELETE'];

// Suggestions shown as one-click requests.
export const suggestions = [
  { method: 'GET', path: '/api/siddharth' },
  { method: 'GET', path: '/api/projects' },
  { method: 'GET', path: '/api/projects/cosmiclife' },
  { method: 'POST', path: '/api/hire' },
];

// Every concrete path, for the input's autocomplete list.
export const knownPaths = [
  ...routes.filter((r) => !r.path.includes('{')).map((r) => r.path),
  ...projects.map((p) => `/api/projects/${p.id}`),
];

function normalise(raw) {
  let p = (raw || '').trim();
  p = p.replace(/^https?:\/\/[^/]+/i, '');
  p = p.split(/[?#]/)[0];
  if (!p.startsWith('/')) p = `/${p}`;
  if (p.length > 1) p = p.replace(/\/+$/, '');
  return p.toLowerCase();
}

function match(path) {
  for (const r of routes) {
    const pattern = new RegExp(`^${r.path.replace(/\{(\w+)\}/g, '(?<$1>[^/]+)')}$`);
    const m = path.match(pattern);
    if (m) return { route: r, params: m.groups || {} };
  }
  return null;
}

export function request(method, rawPath) {
  const path = normalise(rawPath);
  const m = match(path);
  if (!m) return { path, ...springError(404, path) };
  const handler = m.route[method];
  if (!handler) {
    const allowed = METHODS.filter((x) => m.route[x]).join(', ');
    return {
      path,
      headers: { allow: allowed },
      ...springError(405, path, `Request method '${method}' is not supported`),
    };
  }
  return { path, headers: {}, ...handler(m.params) };
}

export const statusText = (code) => STATUS_TEXT[code] || '';
