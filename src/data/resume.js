// Single source of truth for portfolio content.
// Every fact here is drawn directly from Siddharth's resume — nothing invented.

export const profile = {
  name: 'Siddharth',
  role: 'Backend Engineer',
  tagline: 'Java & Spring Boot backend engineer',
  location: 'Greater Noida, Uttar Pradesh, India',
  email: 'GautamSiddharth131004@gmail.com',
  phone: '+91-9368217462',
  phoneHref: '+919368217462',
};

export const navItems = [
  { id: 'overview', idx: '01', label: 'overview' },
  { id: 'about', idx: '02', label: 'about' },
  { id: 'skills', idx: '03', label: 'skills' },
  { id: 'journey', idx: '04', label: 'journey' },
  { id: 'projects', idx: '05', label: 'projects' },
  { id: 'assistant', idx: '06', label: 'ask-ai' },
  { id: 'contact', idx: '07', label: 'contact' },
];

export const heroStats = [
  { num: '4', label: "REST endpoints designed for AgriPro's sensor & AI pipeline" },
  { num: '15+', label: 'API routes validated across auth, DB ops & edge cases' },
  { num: '2', label: 'Production systems with live AI integration (Spring AI, Gemini)' },
];

export const philosophy = [
  {
    tag: 'Reliability over cleverness',
    text: "AgriPro's irrigation alerts run on real sensor data, which is noisy. Instead of firing an alert on every threshold crossing, I built a tri-state classifier (OK / WARNING / CRITICAL) with cooldown logic — so the system stays useful instead of becoming noise a farmer starts ignoring.",
  },
  {
    tag: 'Security is not an afterthought',
    text: 'Every backend I ship gets JWT-based authentication and role enforcement from the start, not bolted on later. On the Fitness-Tracker project, that meant validating 15+ routes against auth and edge cases before calling it done, not just the happy path.',
  },
  {
    tag: 'AI should be grounded, not decorative',
    text: "Both of my AI integrations — Spring AI for crop/disease guidance, Gemini API for email replies — are built around structured prompts and validated output, so the model produces something a real user can act on, not just a plausible-sounding paragraph.",
  },
  {
    tag: 'Ship it deployable, not just working',
    text: "I containerize with Docker and set up CI/CD as part of building, not as a separate \"deployment phase\" — a service that only runs on my laptop isn't finished.",
  },
];

export const education = {
  school: 'Gautam Buddha University, Greater Noida',
  degree: 'B.Tech, Computer Science and Engineering',
  years: '2022 — 2026',
};

export const skillDomains = [
  { title: 'Languages', desc: 'What I build with', chips: ['Java', 'SQL', 'Python','HTML','CSS'] },
  {
    title: 'Backend & Architecture',
    desc: 'Core of every system I ship',
    chips: ['Spring Boot', 'Spring Security', 'Spring Data JPA', 'REST APIs', 'JWT Auth', 'OAuth', 'Microservices'],
  },
  { title: 'Databases', desc: 'Where the state lives', chips: ['PostgreSQL', 'MySQL'] },
  {
    title: 'Tools & DevOps',
    desc: 'How it gets built and shipped',
    chips: ['Docker', 'Git / GitHub', 'Postman', 'IntelliJ IDEA', 'VS Code'],
  },
  {
    title: 'AI Integration',
    desc: 'Currently deepening this',
    chips: ['Spring AI', 'Gemini API', 'Prompt Engineering'],
  },
  { title: 'Core CS', desc: 'The foundation underneath', chips: ['Data Structures', 'Algorithms', 'OOP'] },
];

export const journey = [
  {
    when: '2022',
    type: 'Education',
    title: 'Started B.Tech, Computer Science and Engineering',
    text: 'Gautam Buddha University, Greater Noida. Built the core CS foundation — data structures, algorithms, OOP — that everything else sits on.',
  },
  {
    when: 'During degree',
    type: 'Certification',
    title: 'Java with Data Structures & Algorithms',
    text: 'PW Skills — deliberate practice on DSA fundamentals to back up applied project work with strong theory.',
  },
  {
    when: 'During degree',
    type: 'Project',
    title: 'Shipped the Smart Email Reply Generator',
    text: 'First AI-integration project — connected a Spring Boot service to the Gemini API with structured prompt templates and validated JSON output.',
  },
  {
    when: 'During degree',
    type: 'Project',
    title: 'Shipped the Fitness-Tracker backend',
    text: 'Secured with JWT and role enforcement, deployed to Neon Cloud via Docker with a CI/CD pipeline — moved from "runs locally" to "runs in production."',
  },
  {
    when: 'During degree',
    type: 'Project',
    title: 'Shipped AgriPro, a live IoT + AI agriculture platform',
    text: 'The most complete system to date — real ESP32 sensors, a weather API, tri-state alerting, and Spring AI-powered crop and disease guidance.',
  },
  {
    when: 'April 2026',
    type: 'Certification',
    title: 'Java Spring Boot Full Stack eCommerce Masterclass',
    text: 'Udemy — full-stack project-based deep dive into production Spring Boot patterns.',
  },
  {
    when: '2026',
    type: 'Education',
    title: 'Expected graduation, B.Tech CSE',
    text: 'Looking for a backend engineering role where I can keep building systems that touch real infrastructure.',
  },
];

export const projects = [
  {
    id: 'agripro',
    name: 'AgriPro — Smart Agriculture System',
    status: '● live demo',
    overview:
      'A live IoT and AI agriculture platform for real-time crop monitoring and automated irrigation guidance — built to replace manual field checks with continuous, sensor-driven decisions.',
    problem:
      'Farmers had no real-time visibility into field conditions and relied on manual, reactive checks for irrigation and disease — by the time an issue was visible, it was often too late.',
    solution:
      'Continuous ESP32 sensor ingestion feeding a Spring Boot service that classifies conditions, calls Spring AI for context-aware guidance, and alerts automatically — without needing a human watching a dashboard.',
    decisions: [
      '4 RESTful endpoints for ingestion, crop recommendation, and disease detection — with input validation, structured error handling, and pagination for sensor history',
      "Dynamic prompt engineering so Spring AI's output reflects live field conditions, not generic advice",
      'Tri-state alerting (OK / WARNING / CRITICAL) with cooldown logic to prevent alert fatigue',
    ],
    challenge:
      'Disease detection needed to be usable by non-expert farmers — so the module returns a confidence score alongside AI-generated treatment guidance written in plain language, not lab terminology.',
    stack: ['Spring Boot', 'JavaScript', 'ESP32', 'Weather API', 'Spring AI', 'Email Notifications'],
    diagram: 'agripro',
    link: { label: 'View live demo →', url: 'https://agripro-ai.vercel.app/' },
  },
  {
    id: 'fitness-tracker',
    name: 'Fitness-Tracker',
    status: '● open source',
    overview:
      'A RESTful backend for fitness activity management, built around secure multi-user access and a real deployment pipeline rather than a local-only demo.',
    problem:
      'A multi-user fitness platform needs secure, role-aware access to personal activity data — and a deployment process reliable enough to trust in production.',
    solution:
      'JWT-based authentication with role enforcement at the API layer, PostgreSQL with an optimized schema deployed on Neon Cloud, and a Dockerized build shipped through CI/CD.',
    decisions: [
      'Optimized entity relationships and query design for a production-ready PostgreSQL configuration',
      'Containerized with Docker; CI/CD pipeline for automated, repeatable builds',
    ],
    challenge:
      'Trusting a deployment means testing it properly — validated 15+ API routes with both Postman and ReadyAPI, covering security checks, database operations, and edge cases, not just the happy path.',
    stack: ['Spring Boot', 'Spring Security', 'JWT', 'PostgreSQL (Neon)', 'Docker', 'CI/CD', 'Postman', 'ReadyAPI'],
    diagram: 'fitness',
    link: { label: 'View on GitHub →', url: 'https://github.com/Siddharth-del/Fitness-Tracker' },
  },
  {
    id: 'email-reply-generator',
    name: 'Smart Email Reply Generator',
    status: '● AI integration',
    overview:
      'A Spring Boot service that reads incoming email content and generates a context-aware, structured reply via the Gemini API — turning an LLM call into a dependable API contract.',
    problem:
      'Manually replying to routine emails is slow, and reply tone and formatting drift depending on who is writing.',
    solution:
      'A Spring Boot service analyzes incoming content and returns a structured JSON reply through a single REST endpoint, using prompt templates to keep tone and format consistent across email types.',
    decisions: [
      'Designed prompt templates specifically to improve relevance and keep formatting consistent across intents',
      'Request validation and error handling to keep backend ↔ AI model communication stable',
    ],
    challenge:
      'LLM output is naturally variable — the templates and validation layer exist specifically to make that output predictable enough to expose as a stable API.',
    stack: ['Spring Boot', 'Gemini API', 'REST', 'JSON'],
    diagram: 'email',
    link: { label: 'View on GitHub →', url: 'https://github.com/Siddharth-del/Smart-Email-Reply-Generator' },
  },
];
 
// Full context block sent to the AI assistant as grounding data.
export const RESUME_CONTEXT = `
Siddharth — Backend Engineer (Java / Spring Boot)
Location: Greater Noida, UP, India. Email: GautamSiddharth131004@gmail.com. Phone: +91-9368217462.

PROFESSIONAL SUMMARY
Backend engineer experienced in building Java and Spring Boot systems. Developed AgriPro, a live IoT and AI powered agriculture platform for real-time crop monitoring and automated irrigation using sensor data and weather APIs. Proficient across the backend stack: REST API design, JWT authentication, Docker deployment, AI integration. Strong focus on scalable, reliable systems.

EDUCATION
Gautam Buddha University, Greater Noida — B.Tech, Computer Science and Engineering, 2022–2026.

TECHNICAL SKILLS
Languages: Java, SQL, Python.
Backend & Frameworks: Spring Boot, Spring Security, Spring Data JPA, REST API Development, JWT Authentication, Microservice Architecture, Spring AI, OAuth.
Databases: PostgreSQL, MySQL.
Tools: Docker, VS Code, Postman, IntelliJ IDEA, Git, GitHub.
Core CS: Data Structures and Algorithms, Object Oriented Programming.

PROJECT: AgriPro (Smart Agriculture System) — Live Demo
Built an IoT and AI agriculture platform with a Spring Boot backend and JavaScript frontend, connecting ESP32 sensors and a Weather API to monitor soil moisture, temperature, and humidity in real time. Designed 4 RESTful endpoints for sensor ingestion, crop recommendation, and disease detection, with input validation, structured error handling, and pagination for historical sensor data. Integrated Spring AI with dynamic prompt engineering to generate context-aware crop recommendations and disease treatment guidance based on live field conditions. Implemented a tri-state irrigation alert system (OK / WARNING / CRITICAL) with automated email notifications and cooldown logic, removing the need for manual monitoring. Built a crop disease detection module that accepts image uploads, returns a confidence score, and delivers AI-generated treatment suggestions in plain language for non-expert farmers.

PROJECT: Fitness-Tracker — GitHub
Built a RESTful backend for fitness activity management using Spring Boot with JWT-based authentication and role enforcement. Integrated PostgreSQL with optimized entity relationships and query design, deployed to Neon Cloud with production-ready configuration. Containerized with Docker and set up a CI/CD pipeline for automated, consistent deployments. Validated all endpoints using Postman and ReadyAPI, covering security checks, database operations, and edge cases across 15+ API routes.

PROJECT: Smart Email Reply Generator (AI Integration) — GitHub
Built a Spring Boot service connecting to the Gemini API to analyze incoming email content and return context-aware replies as structured JSON through a REST endpoint. Designed prompt templates to improve reply relevance and keep output formatting consistent across email types and intents. Implemented request validation and error handling for stable communication between the backend service and the AI model.

CERTIFICATIONS
Java with Data Structures & Algorithms — PW Skills.
Java Spring Boot Full Stack eCommerce Project Masterclass — Udemy, April 2026.

NOTE: Exact LinkedIn, GitHub, and live-demo URLs are not included in this data. If asked for them, say they're linked from the resume/portfolio nav and suggest the visitor use the contact section to request them directly — never invent a URL.
`.trim();

export const SYSTEM_PROMPT = `You are a grounded, factual digital resume assistant representing Siddharth, a Java/Spring Boot backend engineer, to recruiters and visitors on his portfolio site.

Rules:
- Answer ONLY using the resume data provided below. Never invent employers, dates, metrics, URLs, or facts not present in the data.
- If asked something not covered by the data (e.g. exact salary expectations, personal details, a real URL that isn't given), say plainly that you don't have that information and suggest they use the contact section.
- Speak in third person about Siddharth ("he built...", "his experience includes...") in a professional, concise, warm tone — like a sharp colleague giving a recruiter a walkthrough, not a marketing bot.
- Prefer specifics from the data (endpoint counts, tech names, real bullet details) over vague praise.
- Keep answers tight: 2-5 sentences unless the question genuinely needs a list.
- You may use light markdown: **bold** for key terms, backticks for tech/code terms, and "- " for short lists.

RESUME DATA:
${RESUME_CONTEXT}`;

export const suggestedQuestions = [
  'Tell me about AgriPro',
  "What's his strongest backend skill?",
  'Has he integrated AI into any real projects?',
  'Is he ready for a backend engineering role?',
];
