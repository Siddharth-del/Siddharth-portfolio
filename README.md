# Siddharth — Backend Engineer Portfolio

A single-page portfolio built with **React + Vite**, styled around an engineering-documentation
aesthetic (IBM Plex Mono/Sans, blueprint grid, amber accent) instead of a generic AI-SaaS template.

Every fact on the site (endpoint counts, tech stack, timeline) is pulled from the resume data in
`src/data/resume.js` — nothing is fabricated.

## Structure

```
src/
  assets/avatar.jpg        real headshot, imported wherever the avatar appears
  data/resume.js           single source of truth for all content + AI system prompt
  components/
    Sidebar.jsx             left nav with scroll-spy active state
    MobileNav.jsx            hamburger + scrim for mobile
    Hero.jsx                 overview section
    About.jsx                engineering philosophy + education
    Skills.jsx                domain-based skill cards (no progress bars)
    Journey.jsx              real timeline — education, projects, certifications only
    Projects.jsx              engineering case studies
    ArchDiagrams.jsx           hand-built SVG architecture diagrams per project
    Assistant.jsx             AI resume assistant (calls Claude API)
    Contact.jsx                contact info + mailto form
    Footer.jsx
  App.jsx
  main.jsx
  index.css                 design system: tokens, layout, all component styles
```

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

## Enabling the AI assistant

The "Ask my AI assistant" section calls the Anthropic API directly from the browser, grounded
only in `RESUME_CONTEXT` inside `src/data/resume.js` (via a system prompt that instructs it to
never invent facts).

1. Copy `.env.example` to `.env`
2. Add your Anthropic API key:
   ```
   VITE_ANTHROPIC_API_KEY=sk-ant-...
   ```
3. Restart `npm run dev`

**⚠️ Before deploying this publicly:** calling `api.anthropic.com` straight from the browser means
your API key ships in the client bundle — anyone can read it in devtools and spend your quota.
That's fine for local use or a private demo link. For a real public deployment, move the fetch in
`src/components/Assistant.jsx` behind a small serverless function (Vercel/Netlify/Cloudflare
Workers all work well) that holds the key server-side and forwards the request. The frontend code
otherwise doesn't need to change — just point the `fetch` at your own `/api/chat` endpoint instead
of `api.anthropic.com`.

If no key is configured, the assistant UI still renders and explains that clearly instead of
failing silently.

## Editing content

Everything text-based lives in `src/data/resume.js` — update your info there and it propagates
everywhere (hero stats, skills, timeline, project case studies, and the AI assistant's grounding
data all read from this one file).

## Build for production

```bash
npm run build
npm run preview   # sanity-check the production build locally
```

Output goes to `dist/` — deploy that folder to Vercel, Netlify, GitHub Pages, or any static host.

## What's real vs. simplified

- ✅ Real resume content, real architecture diagrams matching the actual project structure
- ✅ Full-screen looping video hero (your animated avatar) with a live-status overlay badge
- ✅ Fully working AI assistant once you add an API key (see above)
- ✅ Responsive, accessible (focus states, semantic HTML, `prefers-reduced-motion` respected —
  falls back to a static poster frame instead of autoplaying video)
- ⚠️ No backend server is included — the AI assistant calls Anthropic's API directly from the
  client for simplicity. See the security note above before shipping this publicly.
- ⚠️ LinkedIn/GitHub/live-demo URLs weren't in the source resume, so they're intentionally left
  as "ask the assistant" rather than guessed at. Add real links in `src/data/resume.js` (search
  for `RESUME_CONTEXT` and the contact section) once you have them.

## Video assets

Two versions of your avatar clip are bundled, both muted/looped/no-audio and optimized for web:
- `src/assets/avatar-bg.mp4` (1280×720, ~1.4MB) — the full-screen hero background
- `src/assets/avatar-video.mp4` (480×480 cropped, ~400KB) — the small looping avatar in the sidebar

If you replace these with a new clip, keep them short (~10s), muted, and re-compress with
something like:
```bash
ffmpeg -i your-clip.mp4 -vf "scale=1280:720" -an -c:v libx264 -crf 24 -preset slow -pix_fmt yuv420p -movflags +faststart avatar-bg.mp4
```
