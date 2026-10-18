# Siddharth: Backend Java Developer portfolio

A single-page portfolio built with **React + Vite**. Sections follow the reference layout:
Home, About, My Work (with screenshots and case studies), The road so far, Certifications,
the **Siddharth AI Assistant**, and Contact.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the build locally
```

Deploy the `dist/` folder to Netlify, Vercel, GitHub Pages or any static host. Asset paths are
relative, so it also works from a sub-path.

## Edit content

Everything text-based lives in **`src/data/portfolio.js`**: profile, links, skills, projects,
timeline and certifications. The AI assistant's offline answers read from the same file.

### Add or edit a project

Each project in `src/data/portfolio.js` has `summary`, `stack`, `highlights` (shown on the card),
an optional `features` list (shown in the case study), a `caseStudy`, `links` and `screenshots`.
Set `pending: true` to show a "coming soon" card instead.

### Replace or add screenshots

Screenshots live in `public/screenshots/`. The first item in a project's `screenshots` array is
its card image; all of them appear in the case-study gallery. The `url` field is the text shown
in the browser-frame address bar.

Current screenshots:

| File | What it shows |
| --- | --- |
| `agripro-live.webp` | AgriPro landing page, live at agripro-ai.vercel.app (card image) |
| `cosmiclife-home.webp` | Cosmic Life storefront, live at cosmiclife.in (card image) |
| `cosmiclife-build-your-box.webp` | Build Your Own Box page |
| `cosmiclife-admin-dashboard.webp` | ForgeX admin dashboard, captured locally against the repo's API test double (sample data) |
| `cosmiclife-admin-order.webp` | Admin order detail, same sample data |
| `agripro-api-docs.webp` | AgriPro API docs in Swagger UI, generated from the project's controllers |
| `agripro-sensor-endpoint.webp` | AgriPro sensor ingestion endpoint (device key header + JSON body) |
| `fitness-api-docs.webp` | Fitness Tracker API docs in Swagger UI |
| `fitness-activity-endpoint.webp` | Fitness Tracker "track activity" endpoint |
| `email-reply-generator.webp` | The Email Reply Generator React client producing a reply |

Screenshots with a different shape than 16:10 can set `width` and `height` so the page reserves
the right space while they load.

The hero photo is `src/assets/siddharth.webp`; the assistant's avatar is `src/assets/siddharth-face.webp`.

## Siddharth AI Assistant

The assistant appears as a section on the page and as a floating "Ask Siddharth's AI" button.

- **With a backend:** set `VITE_API_BASE_URL` to the Spring Boot backend from the original
  repo. Questions are sent as `text/plain` to `POST {VITE_API_BASE_URL}/api/ask-question` and the
  plain-text answer is shown. If the backend is served from the same domain, set
  `VITE_USE_SAME_ORIGIN_API=true` instead.
- **Without a backend (default):** answers come from `src/data/assistantKnowledge.js`, a
  keyword-matched answer set built only from the portfolio data. If the backend is configured but
  unreachable, the assistant falls back to these answers automatically.

The backend must allow CORS from the site's domain when it is hosted separately.

## Contact form

With `VITE_API_BASE_URL` set, the form posts JSON `{ name, email, message }` to
`{VITE_API_BASE_URL}/api/contact`. Without it, or if that call fails, it opens the visitor's
email app with the message filled in.

## Environment variables

Copy `.env.example` to `.env` and set what you need. Vite reads these at build time, so rebuild
after changing them.

## Structure

```
public/
  screenshots/            project screenshots
  Siddharth_Resume.pdf    linked from "Download resume"
src/
  data/portfolio.js       all site content
  data/assistantKnowledge.js  offline assistant answers
  components/
    Navbar.jsx  Hero.jsx  About.jsx  Work.jsx  Journey.jsx
    Assistant.jsx  Contact.jsx  Icons.jsx
  hooks/useInView.js
  styles.css              design tokens and all styles
```

Fonts (Bricolage Grotesque, Instrument Sans, JetBrains Mono) are self-hosted through Fontsource,
so the site makes no third-party font requests.
