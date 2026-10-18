// Single source of truth for everything on the site.
// Facts come from Siddharth's resume and from the code in his public GitHub repos.
// Edit here and every section (and the AI assistant's offline answers) updates.

// Files in /public are referenced through BASE so the site works at a domain root or a sub-path.
const BASE = import.meta.env?.BASE_URL ?? '/';

export const profile = {
  name: 'Siddharth',
  role: 'Backend Java Developer',
  focus: 'Spring Boot APIs that are secure, containerized and ready to deploy',
  location: 'Greater Noida, Uttar Pradesh, India',
  email: 'gautamsiddharth131004@gmail.com',
  phone: '+91-9368217462',
  phoneHref: '+919368217462',
  resume: `${BASE}Siddharth_Resume.pdf`,
  links: {
    github: 'https://github.com/Siddharth-del',
    linkedin: 'https://www.linkedin.com/in/siddharth-java-dev',
  },
};

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'My Work' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'assistant', label: 'AI Assistant' },
  { id: 'contact', label: 'Contact' },
];

export const heroStack = ['Java', 'Spring Boot', 'REST APIs', 'SQL'];

export const quickFacts = [
  { value: '8.34', label: 'CGPA, B.Tech CSE' },
  { value: '250+', label: 'LeetCode problems solved' },
  { value: '15+', label: 'API endpoints tested in Postman and ReadyAPI' },
  { value: '4', label: 'projects shipped' },
];

export const summary = [
  'I build backend services in Java and Spring Boot: REST APIs secured with Spring Security and JWT, role-based access control, and relational data models in PostgreSQL and MySQL.',
  'I care about the parts that make a service usable outside my laptop. That means Docker images, CI/CD pipelines, real database configuration, and testing the edge cases, not just the happy path.',
  'My most recent work runs in production: CosmicLife, a perfume store that takes real Razorpay and cash-on-delivery orders, and AgriPro, where ESP32 sensors feed a live agriculture platform with Spring AI guidance.',
];

export const coreAreas = [
  'REST API design with Spring Boot, validation, structured errors and pagination',
  'Authentication with Spring Security, JWT and role-based access control',
  'Data modelling with Spring Data JPA (Hibernate), PostgreSQL and MySQL',
  'Docker, CI/CD and production database configuration',
  'Third-party API integration: weather data, email, LLM providers',
  'Data Structures, Algorithms and Object-Oriented Programming',
];

export const skillGroups = [
  { title: 'Languages', items: ['Java', 'SQL', 'Python'] },
  {
    title: 'Backend',
    items: [
      'Spring Boot',
      'Spring Security',
      'Spring Data JPA (Hibernate)',
      'REST APIs',
      'JWT Authentication',
      'Role-Based Access Control',
      'Spring AI',
    ],
  },
  { title: 'Databases', items: ['PostgreSQL', 'MySQL'] },
  {
    title: 'Tools and DevOps',
    items: ['Docker', 'CI/CD', 'Git', 'GitHub', 'Postman', 'ReadyAPI', 'IntelliJ IDEA'],
  },
  { title: 'Core CS', items: ['Data Structures and Algorithms', 'Object-Oriented Programming'] },
];

export const principles = [
  {
    title: 'Reliability over cleverness',
    text: 'AgriPro reads noisy sensor data, so alerts go through a tri-state OK / WARNING / CRITICAL check with a cooldown. Farmers get a signal they trust instead of a stream of emails they learn to ignore.',
  },
  {
    title: 'Security from the first commit',
    text: 'Every API I ship starts with JWT authentication and role checks at the endpoint level, rather than bolting them on before a demo.',
  },
  {
    title: 'Deployable, not just working',
    text: 'Docker and CI/CD are part of building the service. A backend that only runs on my machine is not finished.',
  },
];

export const education = {
  degree: 'B.Tech, Computer Science and Engineering',
  school: 'Gautam Buddha University, Greater Noida',
  years: '2022 – 2026',
  cgpa: '8.34 / 10',
};

// `screenshots[0]` is the cover image on the project card.
// Drop new images into /public/screenshots and point `src` at them.
export const projects = [
  {
    id: 'agripro',
    name: 'AgriPro',
    subtitle: 'Smart agriculture system',
    summary:
      'An IoT platform that reads soil moisture, temperature and humidity from ESP32 sensors, combines it with live weather data, and emails irrigation alerts before crops suffer.',
    stack: ['Java', 'Spring Boot', 'Spring Security', 'JWT', 'Spring AI', 'PostgreSQL', 'ESP32', 'Weather API', 'Email'],
    highlights: [
      'REST endpoints for sensor ingestion and history, with input validation, structured error handling and pagination',
      'Tri-state irrigation alerts (OK / WARNING / CRITICAL) with cooldown logic so the same alert is not sent repeatedly',
      'Each ESP32 device posts readings with its own API key; farmers and admins sign in with JWT',
    ],
    caseStudy: {
      problem:
        'Farmers check fields by hand and react late. By the time dry soil or disease is visible, the damage is done.',
      solution:
        'ESP32 sensors stream readings to a Spring Boot service that classifies field conditions, pulls in weather data, asks Spring AI for crop and disease guidance, and emails the farmer automatically.',
      decisions: [
        'Device API keys sent in an X-Device-Api-Key header, separate from user JWTs, so hardware and people authenticate differently',
        'Alerts are classified into three states with a cooldown window to prevent alert fatigue',
        'Crop recommendation and disease detection run through dedicated endpoints, with image validation before an upload is analysed',
        'Password reset by email OTP, refresh tokens, and an admin area for managing farmer accounts',
      ],
      challenge:
        'Sensor data is noisy. A single threshold crossing should not wake anyone up, so the alert engine looks at state changes and respects a cooldown before emailing again.',
      endpoints: ['POST /api/sensor/data', 'GET /api/sensor/latest', 'POST /api/ai/crop', 'POST /api/disease/detect', 'GET /api/weather/city/{city}'],
    },
    links: [
      { label: 'Live demo', url: 'https://agripro-ai.vercel.app/', kind: 'live' },
      { label: 'GitHub', url: 'https://github.com/Siddharth-del/AgriPro', kind: 'github' },
    ],
    screenshots: [
      { src: `${BASE}screenshots/agripro-live.webp`, url: 'agripro-ai.vercel.app', caption: 'AgriPro landing page, live on Vercel', width: 1600, height: 759 },
      { src: `${BASE}screenshots/agripro-api-docs.webp`, url: 'localhost:8080/swagger-ui/index.html', caption: 'API documentation (Swagger UI) generated from the AgriPro controllers' },
      { src: `${BASE}screenshots/agripro-sensor-endpoint.webp`, url: 'localhost:8080/swagger-ui/index.html', caption: 'Sensor ingestion endpoint: device key header and JSON body' },
    ],
  },
  {
    id: 'cosmiclife',
    name: 'CosmicLife',
    subtitle: 'Perfume and attar e-commerce platform',
    summary:
      'A live online store for Cosmic Life Parfums & Attars, running on the ForgeX Spring Boot API. Customers sign in, fill a server-side cart, build their own gift box, and pay with Razorpay or cash on delivery. The owner runs everything from an admin panel.',
    stack: ['Java', 'Spring Boot', 'Spring Security', 'JWT', 'REST APIs', 'SQL', 'Razorpay', 'Cloudinary', 'React', 'TypeScript', 'Tailwind CSS', 'Render'],
    highlights: [
      'Payments are confirmed only by the server: the backend verifies each Razorpay signature, and a signed webhook marks orders paid even if the shopper closes the tab',
      'The cart lives on the server and belongs to the account, so the bag, checkout total and final order always match, with live stock checks like "Only 2 left"',
      'Admin panel behind ROLE_ADMIN: sales dashboard, product editor with Cloudinary uploads, order status flow, PDF invoices and coupons',
    ],
    features: [
      'JWT sign-in and sign-up, with password reset by emailed OTP',
      'Server-side cart shared across devices, with stock and price checks on every change',
      'Build Your Own Box: any 3 fragrances at one price, with box size, price and rules set by the backend',
      'Checkout with saved addresses, coupons (percent or fixed, minimum order, usage limits) and free shipping above ₹1,499',
      'Razorpay online payments and cash on delivery, with server-side signature verification and a payment webhook',
      'Orders with PDF invoices and a status flow from Paid to Confirmed, Shipped and Delivered',
      'Admin dashboard: orders to fulfil, 30-day sales, COD vs online, low-stock and missing-image alerts',
      'Admin tools for products, boxes, orders, coupons and customers',
    ],
    caseStudy: {
      problem:
        'A fragrance brand needed a store that takes real payments, including cash on delivery, never shows an order as paid when it is not, and can be run day to day by the owner without a developer.',
      solution:
        'The ForgeX Spring Boot API owns pricing, stock, carts, orders and payments. The React storefront and admin panel only show what the server returns, through one API client that sends the JWT, sets timeouts and tells 400, 401, 403, 404 and 409 errors apart.',
      decisions: [
        'Money is stored and sent in paise; totals, coupon discounts and shipping are calculated on the server through a checkout preview',
        'Orders follow a strict state machine: Paid → Confirmed or Cancelled, Confirmed → Shipped, Shipped → Delivered',
        'An unpaid online order reserves stock for 15 minutes and is reused if checkout is repeated, so a double click still creates one order',
        'A product that appears in past orders cannot be deleted (409 Conflict); the admin hides it instead',
        'Admin routes are protected by ROLE_ADMIN on /api/admin/**, and CORS only accepts known storefront origins',
      ],
      challenge:
        'Payment edge cases: a closed Razorpay window, a failed or forged payment, a payment that arrives after the 15-minute window, and stock bought by someone else mid-checkout. Each has a defined outcome, covered by 60 unit tests and browser test suites for checkout, boxes and the admin panel.',
      endpoints: [
        'POST /api/checkout',
        'POST /api/payments/verify',
        'POST /api/carts/bundles/{bundleId}',
        'PATCH /api/admin/orders/{id}/status',
        'GET /api/orders/{id}/invoice',
      ],
    },
    links: [
      { label: 'Live site', url: 'https://www.cosmiclife.in', kind: 'live' },
      { label: 'GitHub', url: 'https://github.com/Siddharth-del/ForgeX_Backend', kind: 'github' },
    ],
    screenshots: [
      { src: `${BASE}screenshots/cosmiclife-home.webp`, url: 'www.cosmiclife.in', caption: 'Cosmic Life storefront, live at cosmiclife.in', width: 1600, height: 742 },
      { src: `${BASE}screenshots/cosmiclife-build-your-box.webp`, url: 'localhost:5173/build-your-box', caption: 'Build Your Own Box: any 3 fragrances at a price set by the backend' },
      { src: `${BASE}screenshots/cosmiclife-admin-dashboard.webp`, url: 'localhost:5173/admin', caption: 'ForgeX admin dashboard: orders, revenue and catalogue health (sample data)' },
      { src: `${BASE}screenshots/cosmiclife-admin-order.webp`, url: 'localhost:5173/admin/orders/1', caption: 'Admin order detail with box contents, status actions and PDF invoice (sample data)' },
    ],
  },
  {
    id: 'fitness-tracker',
    name: 'Fitness Tracker',
    subtitle: 'Spring Boot REST API',
    summary:
      'A secure backend for logging workouts and generating fitness recommendations, with JWT sign-in, role-restricted endpoints, and a Dockerized build shipped through CI/CD.',
    stack: ['Java', 'Spring Boot', 'Spring Security', 'JWT', 'Spring Data JPA', 'PostgreSQL', 'Docker', 'CI/CD'],
    highlights: [
      'JWT authentication with role-based access control that restricts endpoints by user role',
      'PostgreSQL entity relationships and queries with Spring Data JPA, running on a production database configuration',
      'Containerized with Docker and built through a CI/CD pipeline for consistent deployments',
      'Tested 15+ API endpoints with Postman and ReadyAPI: auth flows, CRUD, security checks and edge cases',
    ],
    caseStudy: {
      problem:
        'A multi-user fitness app holds personal activity data, so every request has to prove who it is and what it is allowed to see.',
      solution:
        'Stateless JWT authentication with a custom filter, role checks at the API layer, and a layered controller / service / repository design backed by PostgreSQL.',
      decisions: [
        'DTOs keep the API contract separate from the JPA entities',
        'Database URL and credentials come from environment variables, never from source code',
        'Centralized exception handling returns consistent error responses',
        'OpenAPI documentation generated from the controllers',
      ],
      challenge:
        'Trusting a deployment means testing it properly, so the endpoints were exercised in both Postman and ReadyAPI against security checks and edge cases.',
      endpoints: ['POST /api/auth/register', 'POST /api/auth/login', 'POST /api/activities', 'POST /api/recommendation/generate'],
    },
    links: [{ label: 'GitHub', url: 'https://github.com/Siddharth-del/Fitness-Tracker', kind: 'github' }],
    screenshots: [
      { src: `${BASE}screenshots/fitness-api-docs.webp`, url: 'localhost:8080/swagger-ui/index.html', caption: 'Fitness Tracking API documentation (Swagger UI)' },
      { src: `${BASE}screenshots/fitness-activity-endpoint.webp`, url: 'localhost:8080/swagger-ui/index.html', caption: 'Track activity endpoint with its request schema' },
    ],
  },
  {
    id: 'email-reply-generator',
    name: 'Smart Email Reply Generator',
    subtitle: 'Spring Boot + AI API',
    summary:
      'Paste an email, pick a tone, and get a ready-to-send reply. A Spring Boot endpoint calls an external AI API and returns a structured response; a React app and a Gmail extension sit on top.',
    stack: ['Java', 'Spring Boot', 'REST API', 'Spring AI', 'External AI API', 'React', 'Chrome Extension', 'Docker'],
    highlights: [
      'One REST endpoint that turns email content and an optional tone into a generated reply',
      'Request validation and error handling for stable, predictable communication with the third-party AI API',
      'Works from a React + Material UI page or directly inside Gmail through a Chrome extension',
    ],
    caseStudy: {
      problem: 'Replying to routine email is slow, and tone drifts depending on who is writing and how busy they are.',
      solution:
        'A Spring Boot service builds a prompt from the email and requested tone (professional, casual or friendly), calls the AI provider through Spring AI, and returns the reply to whichever client asked.',
      decisions: [
        'Tone is an explicit request field, so the same endpoint serves every style',
        'Validation and error handling keep failures from the AI provider from leaking to the client',
        'Packaged with a Dockerfile for deployment',
      ],
      challenge:
        'LLM output varies from call to call. Prompt structure and validation make it predictable enough to expose as a stable API.',
      endpoints: ['POST /api/email/generate'],
    },
    links: [{ label: 'GitHub', url: 'https://github.com/Siddharth-del/Smart-Email-Reply-Generator', kind: 'github' }],
    screenshots: [{ src: `${BASE}screenshots/email-reply-generator.webp`, url: 'localhost:5173', caption: 'The React client generating a professional reply' }],
  },
];

export const journey = [
  {
    when: '2022',
    title: 'Started B.Tech in Computer Science',
    text: 'Gautam Buddha University, Greater Noida. Built the foundation in data structures, algorithms and OOP.',
  },
  {
    when: 'During degree',
    title: 'Java with Data Structures and Algorithms',
    text: 'PW Skills certification, backed by 250+ problems solved on LeetCode.',
  },
  {
    when: 'During degree',
    title: 'Shipped the Smart Email Reply Generator',
    text: 'First AI integration: a Spring Boot service that returns structured replies from an external AI API.',
  },
  {
    when: 'During degree',
    title: 'Shipped the Fitness Tracker API',
    text: 'JWT and role-based security, PostgreSQL, Docker and a CI/CD pipeline. The step from "runs locally" to "runs in production".',
  },
  {
    when: 'During degree',
    title: 'Shipped AgriPro',
    text: 'Real ESP32 sensors, weather data, AI guidance and automated irrigation alerts in one live system.',
  },
  {
    when: 'April 2026',
    title: 'Java Spring Boot Full Stack eCommerce Masterclass',
    text: 'Udemy. A project-based deep dive into production Spring Boot patterns.',
  },
  {
    when: '2026',
    title: 'Launched CosmicLife',
    text: 'A live perfume and attar store on the ForgeX Spring Boot API, with Razorpay and cash-on-delivery checkout and an admin panel.',
  },
  {
    when: '2026',
    title: 'Graduating, B.Tech CSE',
    text: 'Looking for a backend engineering role building systems that real people depend on.',
  },
];

export const certifications = [
  {
    title: 'Java Spring Boot Full Stack eCommerce Project Masterclass',
    issuer: 'Udemy',
    date: 'April 2026',
    kind: 'Certification',
  },
  {
    title: 'Java with Data Structures and Algorithms',
    issuer: 'PW Skills',
    date: 'During B.Tech',
    kind: 'Certification',
  },
  {
    title: '250+ problems solved on LeetCode',
    issuer: 'LeetCode',
    date: 'Ongoing',
    kind: 'Achievement',
  },
  {
    title: 'CGPA 8.34 / 10 in B.Tech Computer Science and Engineering',
    issuer: 'Gautam Buddha University',
    date: '2022 – 2026',
    kind: 'Academic',
  },
];

export const suggestedQuestions = [
  'Tell me about AgriPro',
  "What's his strongest backend skill?",
  'Has he integrated AI into real projects?',
  'Is he ready for a backend role?',
];
