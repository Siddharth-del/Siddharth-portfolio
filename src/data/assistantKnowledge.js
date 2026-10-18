// Offline answer engine for the Siddharth AI Assistant.
// Used when no backend is configured (VITE_API_BASE_URL unset) or the backend is unreachable,
// so the assistant still works on a static deploy. Every answer is built from portfolio.js.
import { profile, projects, education, certifications, skillGroups } from './portfolio.js';

const project = (id) => projects.find((p) => p.id === id);

function projectAnswer(id) {
  const p = project(id);
  if (!p) return null;
  if (p.pending) {
    return `**${p.name}** is one of Siddharth's projects. Its full write-up is still being added to this site, so I don't have verified details yet. You can ask him directly at ${profile.email}.`;
  }
  const links = p.links.map((l) => `- ${l.label}: ${l.url}`).join('\n');
  return [
    `**${p.name}** (${p.subtitle})`,
    p.summary,
    (p.features || p.highlights).map((h) => `- ${h}`).join('\n'),
    `**Stack:** ${p.stack.join(', ')}`,
    links,
  ]
    .filter(Boolean)
    .join('\n');
}

const intents = [
  {
    keys: ['agripro', 'agri', 'agriculture', 'farm', 'farmer', 'esp32', 'sensor', 'iot', 'irrigation', 'soil', 'crop'],
    weight: 2,
    answer: () => projectAnswer('agripro'),
  },
  {
    keys: ['fitness', 'tracker', 'workout', 'activity', 'activities'],
    weight: 2,
    answer: () => projectAnswer('fitness-tracker'),
  },
  {
    keys: ['email reply', 'reply generator', 'gmail', 'extension', 'email generator', 'smart email', 'email project', 'reply'],
    weight: 2,
    answer: () => projectAnswer('email-reply-generator'),
  },
  {
    keys: ['cosmiclife', 'cosmic', 'forgex', 'perfume', 'attar', 'ecommerce', 'e-commerce', 'store', 'shop', 'razorpay', 'payment', 'payments', 'checkout', 'cash on delivery', 'cod', 'admin panel'],
    weight: 2,
    answer: () => projectAnswer('cosmiclife'),
  },
  {
    keys: ['strongest', 'best at', 'expert', 'specialty', 'speciality', 'core strength', 'good at'],
    answer: () =>
      [
        "His strongest area is **secure REST API development with Spring Boot**:",
        '- Spring Security with JWT authentication and role-based access control',
        '- Spring Data JPA (Hibernate) on PostgreSQL and MySQL',
        '- Validation, structured error handling and pagination',
        '- Shipping with Docker and CI/CD',
        'The Fitness Tracker and AgriPro backends are the clearest examples.',
      ].join('\n'),
  },
  {
    keys: ['ready', 'hire', 'hiring', 'role', 'job', 'position', 'candidate', 'fit', 'why should', 'available', 'internship', 'open to'],
    answer: () =>
      [
        'Based on his resume, the evidence for a backend role:',
        '- Production-style Spring Boot APIs secured with JWT and role-based access control',
        '- Docker images and CI/CD pipelines, not just local demos',
        '- A live IoT system (AgriPro) handling real sensor data and automated alerts',
        '- 15+ API endpoints tested with Postman and ReadyAPI, including edge cases',
        '- 250+ LeetCode problems and a CGPA of 8.34',
        `He graduates in 2026 and is open to backend engineering roles. Reach him at ${profile.email}.`,
      ].join('\n'),
  },
  {
    keys: ['ai', 'artificial', 'llm', 'spring ai', 'gpt', 'gemini', 'groq', 'llama', 'machine learning', 'ml', 'prompt'],
    weight: 3,
    answer: () =>
      [
        'Yes, in two shipped projects:',
        '- **AgriPro** uses Spring AI for crop and disease guidance based on live field conditions',
        '- **Smart Email Reply Generator** calls an external AI API from a Spring Boot endpoint and returns structured replies, with request validation and error handling around the third-party call',
        'In both, the AI sits behind a validated REST API rather than being called straight from the browser.',
      ].join('\n'),
  },
  {
    keys: ['security', 'secure', 'jwt', 'auth', 'authentication', 'authorization', 'rbac', 'role-based', 'token', 'login'],
    answer: () =>
      [
        'Security is built into every backend he ships:',
        '- **Fitness Tracker:** stateless JWT authentication with a custom filter and role-restricted endpoints',
        '- **AgriPro:** JWT for users, refresh tokens, OTP password reset, an admin role, and separate API keys for ESP32 devices',
        '- **CosmicLife:** JWT accounts, ROLE_ADMIN on every admin endpoint, server-side Razorpay signature checks, and CORS limited to known origins',
      ].join('\n'),
  },
  {
    keys: ['docker', 'devops', 'ci/cd', 'cicd', 'pipeline', 'deploy', 'deployment', 'container'],
    answer: () =>
      [
        'He containerizes services with **Docker** and sets up **CI/CD** for automated builds.',
        '- The Fitness Tracker runs with a production PostgreSQL configuration and a CI/CD pipeline',
        '- The Email Reply Generator backend ships with a Dockerfile',
        '- AgriPro is deployed with a live demo at https://agripro-ai.vercel.app/',
        '- CosmicLife runs live at https://www.cosmiclife.in, deployed on Render',
      ].join('\n'),
  },
  {
    keys: ['database', 'postgres', 'postgresql', 'mysql', 'sql', 'jpa', 'hibernate', 'schema', 'db'],
    answer: () =>
      'He works with **PostgreSQL** and **MySQL** through **Spring Data JPA (Hibernate)**: designing entity relationships, writing queries, and configuring production databases. Both the Fitness Tracker and AgriPro run on PostgreSQL.',
  },
  {
    keys: ['test', 'testing', 'postman', 'readyapi', 'qa'],
    answer: () =>
      'He tested **15+ API endpoints** on the Fitness Tracker using **Postman** and **ReadyAPI**, covering authentication flows, CRUD operations, security checks and edge cases.',
  },
  {
    keys: ['education', 'degree', 'college', 'university', 'study', 'studies', 'cgpa', 'gpa', 'b.tech', 'btech', 'graduate', 'graduation'],
    answer: () =>
      `${education.degree} at ${education.school}, ${education.years}, with a CGPA of **${education.cgpa}**.`,
  },
  {
    keys: ['dsa', 'leetcode', 'algorithm', 'algorithms', 'data structure', 'problem solving', 'oop', 'object-oriented'],
    answer: () =>
      'He has solved **250+ LeetCode problems**, holds the PW Skills certification in Java with Data Structures and Algorithms, and has a strong grounding in Object-Oriented Programming.',
  },
  {
    keys: ['certification', 'certifications', 'certificate', 'course', 'courses', 'udemy', 'pw skills', 'achievement'],
    answer: () =>
      ['Certifications and achievements:', ...certifications.map((c) => `- ${c.title} (${c.issuer}, ${c.date})`)].join('\n'),
  },
  {
    keys: ['skill', 'skills', 'stack', 'tech', 'technologies', 'tools', 'language', 'languages', 'know', 'java', 'spring', 'python'],
    answer: () =>
      ['Here is his toolkit:', ...skillGroups.map((g) => `- **${g.title}:** ${g.items.join(', ')}`)].join('\n'),
  },
  {
    keys: ['project', 'projects', 'built', 'portfolio', 'work', 'made'],
    weight: 0.5,
    answer: () =>
      [
        'His projects:',
        ...projects.map((p) => `- **${p.name}**: ${p.pending ? 'write-up coming soon' : p.subtitle}`),
        'Ask about any of them for details.',
      ].join('\n'),
  },
  {
    keys: ['contact', 'reach', 'email', 'mail', 'phone', 'call', 'linkedin', 'github', 'connect'],
    answer: () =>
      [
        'You can reach Siddharth here:',
        `- Email: ${profile.email}`,
        `- Phone: ${profile.phone}`,
        `- LinkedIn: ${profile.links.linkedin}`,
        `- GitHub: ${profile.links.github}`,
      ].join('\n'),
  },
  {
    keys: ['where', 'location', 'based', 'live', 'city', 'relocate'],
    answer: () => `He is based in ${profile.location}.`,
  },
  {
    keys: ['resume', 'cv'],
    answer: () => `You can download his resume from the "Download resume" button at the top of the page (${profile.resume}).`,
  },
  {
    keys: ['who', 'about', 'introduce', 'summary', 'tell me about him', 'yourself', 'siddharth'],
    answer: () =>
      `Siddharth is a **${profile.role}** who builds secure, containerized REST APIs with Java, Spring Boot, Spring Security and Spring Data JPA. He works with PostgreSQL and MySQL, Docker and CI/CD, and has integrated third-party and AI APIs into shipped projects. He is completing a B.Tech in Computer Science at Gautam Buddha University (2022 – 2026).`,
  },
  {
    keys: ['hi', 'hello', 'hey', 'namaste'],
    exact: true,
    answer: () =>
      "Hi! I can answer questions about Siddharth's skills, projects, education and how to reach him. What would you like to know?",
  },
];

const FALLBACK =
  "I can only answer from Siddharth's resume and project data, and I don't have that detail. Try asking about his projects (AgriPro, Fitness Tracker, Email Reply Generator), his backend skills, education, or how to contact him.";

export function answerLocally(question) {
  const q = ` ${question.toLowerCase().replace(/[^a-z0-9/.\-+' ]/g, ' ').replace(/\s+/g, ' ')} `;
  let best = null;
  let bestScore = 0;
  for (const intent of intents) {
    let score = 0;
    for (const k of intent.keys) {
      const hit = intent.exact ? new RegExp(`\\b${k}\\b`).test(q) : q.includes(k.length <= 3 && !k.includes(' ') ? ` ${k} ` : k);
      if (hit) score += (k.length > 6 ? 2 : 1) * (intent.weight || 1);
    }
    if (score > bestScore) {
      best = intent;
      bestScore = score;
    }
  }
  return best ? best.answer() : FALLBACK;
}
