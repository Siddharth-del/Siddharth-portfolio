import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { suggestedQuestions, profile } from '../data/portfolio';
import { answerLocally } from '../data/assistantKnowledge';
import { CloseIcon, SendIcon, SparkIcon } from './Icons';
import avatarPoster from '../assets/siddharth-face.webp';

// ---------------------------------------------------------------------------
// Siddharth AI Assistant
// Remote mode: POST the question as text/plain to `${VITE_API_BASE_URL}/api/ask-question`
// (the Spring Boot backend from the original portfolio repo), which answers from resume data.
// Offline mode: if no backend is configured, or it can't be reached, answers come from
// src/data/assistantKnowledge.js so the assistant still works on any static host.
// ---------------------------------------------------------------------------
const RAW_BASE = import.meta.env.VITE_API_BASE_URL;
const SAME_ORIGIN = import.meta.env.VITE_USE_SAME_ORIGIN_API === 'true';
const API_BASE = (RAW_BASE || '').replace(/\/+$/, '');
const REMOTE_ENABLED = Boolean(API_BASE) || SAME_ORIGIN;

const AssistantContext = createContext(null);

const WELCOME = {
  role: 'assistant',
  text: "Hi, I'm Siddharth's AI assistant. Ask me about his projects, backend skills, education or how to reach him.",
};

function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function askRemote(question) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);
  try {
    const resp = await fetch(`${API_BASE}/api/ask-question`, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
      body: question,
      signal: controller.signal,
    });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const text = (await resp.text()).trim();
    if (!text) throw new Error('Empty answer');
    return text;
  } finally {
    clearTimeout(timer);
  }
}

export function AssistantProvider({ children }) {
  const [messages, setMessages] = useState([WELCOME]);
  const [busy, setBusy] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [source, setSource] = useState(REMOTE_ENABLED ? 'remote' : 'local');

  const send = useCallback(
    async (raw) => {
      const question = raw.trim();
      if (!question || busy) return;
      setBusy(true);
      setMessages((m) => [...m, { role: 'user', text: question }, { role: 'assistant', text: '', typing: true }]);

      let answer;
      if (REMOTE_ENABLED) {
        try {
          answer = await askRemote(question);
          setSource('remote');
        } catch (err) {
          if (import.meta.env.DEV) console.warn('Assistant backend unavailable, answering offline:', err);
          setSource('local');
        }
      }
      if (!answer) {
        await wait(450 + Math.random() * 400);
        answer = answerLocally(question);
      }

      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = { role: 'assistant', text: answer };
        return copy;
      });
      setBusy(false);
    },
    [busy]
  );

  const reset = useCallback(() => setMessages([WELCOME]), []);

  return (
    <AssistantContext.Provider value={{ messages, busy, send, reset, panelOpen, setPanelOpen, source }}>
      {children}
    </AssistantContext.Provider>
  );
}

export function useAssistant() {
  return useContext(AssistantContext);
}

// --- Safe markdown-lite: **bold**, `code`, "- " lists, and bare URLs / emails as links -----------
function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function inline(s) {
  let out = escapeHtml(s);
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/(https?:\/\/[^\s<]+[^\s<.,;:)])/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
  out = out.replace(/(^|[\s(])([\w.+-]+@[\w-]+\.[\w.]+[\w])/g, '$1<a href="mailto:$2">$2</a>');
  return out;
}

function renderMarkdownLite(raw) {
  const lines = raw.split('\n');
  let html = '';
  let inList = false;
  for (const line of lines) {
    const t = line.trim();
    if (t.startsWith('- ') || t.startsWith('* ')) {
      if (!inList) {
        html += '<ul>';
        inList = true;
      }
      html += `<li>${inline(t.slice(2))}</li>`;
    } else {
      if (inList) {
        html += '</ul>';
        inList = false;
      }
      if (t) html += `<p>${inline(t)}</p>`;
    }
  }
  if (inList) html += '</ul>';
  return html;
}

function Message({ m }) {
  if (m.role === 'user') return <div className="msg msg--user">{m.text}</div>;
  return (
    <div className="msg msg--bot">
      <img className="msg__avatar" src={avatarPoster} alt="" width="28" height="28" />
      {m.typing ? (
        <div className="typing" aria-label="Assistant is typing">
          <span />
          <span />
          <span />
        </div>
      ) : (
        <div className="msg__body" dangerouslySetInnerHTML={{ __html: renderMarkdownLite(m.text) }} />
      )}
    </div>
  );
}

export function ChatWindow({ variant = 'inline', onClose }) {
  const { messages, busy, send, source } = useAssistant();
  const [input, setInput] = useState('');
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (variant === 'floating') inputRef.current?.focus();
  }, [variant]);

  function submit(e) {
    e.preventDefault();
    if (!input.trim()) return;
    send(input);
    setInput('');
  }

  const onlyWelcome = messages.length === 1;

  return (
    <div className={`chat chat--${variant}`} role="region" aria-label="Siddharth AI Assistant">
      <header className="chat__head">
        <span className="chat__avatar">
          <img src={avatarPoster} alt="" width="36" height="36" />
          <span className="chat__online" aria-hidden="true" />
        </span>
        <span className="chat__title">
          <strong>Siddharth AI Assistant</strong>
          <small>{source === 'remote' ? 'Answering from his resume via the AI backend' : 'Answers only from his resume and projects'}</small>
        </span>
        {onClose && (
          <button className="icon-btn" onClick={onClose} aria-label="Close assistant">
            <CloseIcon />
          </button>
        )}
      </header>

      <div className="chat__body" ref={bodyRef} aria-live="polite">
        {messages.map((m, i) => (
          <Message m={m} key={i} />
        ))}
      </div>

      {onlyWelcome && (
        <div className="chat__suggest">
          {suggestedQuestions.map((q) => (
            <button key={q} className="chip-btn" onClick={() => send(q)} disabled={busy}>
              {q}
            </button>
          ))}
        </div>
      )}

      <form className="chat__input" onSubmit={submit}>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about a project, skill or his background"
          aria-label="Your question"
          maxLength={500}
        />
        <button type="submit" className="send-btn" disabled={busy || !input.trim()} aria-label="Send question">
          <SendIcon />
        </button>
      </form>
    </div>
  );
}

export function AssistantSection() {
  const { messages, send, busy } = useAssistant();
  const answered = messages.filter((m) => m.role === 'user').length;

  return (
    <section className="section assistant" id="assistant" aria-labelledby="assistant-title">
      <div className="container assistant__grid">
        <div className="assistant__intro">
          <h2 id="assistant-title" className="section-title">
            Ask my AI assistant
          </h2>
          <p className="lede">
            Short on time? Ask what you would ask in a first-round call. It answers only from my resume and project
            data, and says so when it does not know.
          </p>
          <ul className="assistant__try">
            {['What did he build with Spring Security?', 'Which databases has he used?', 'How do I contact him?'].map((q) => (
              <li key={q}>
                <button className="link-btn" onClick={() => send(q)} disabled={busy}>
                  {q}
                </button>
              </li>
            ))}
          </ul>
          {answered > 2 && (
            <p className="assistant__nudge">
              Prefer a real conversation? <a href={`mailto:${profile.email}`}>Email Siddharth</a>.
            </p>
          )}
        </div>
        <ChatWindow variant="inline" />
      </div>
    </section>
  );
}

// Floating launcher: available everywhere except while the assistant section itself is on screen.
export function AssistantLauncher() {
  const { panelOpen, setPanelOpen } = useAssistant();
  const [sectionVisible, setSectionVisible] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  // Keep the hero's own buttons clear: the launcher appears once the visitor scrolls on.
  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > 360);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const el = document.getElementById('assistant');
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([e]) => setSectionVisible(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (sectionVisible) setPanelOpen(false);
  }, [sectionVisible, setPanelOpen]);

  useEffect(() => {
    if (!panelOpen) return;
    const onKey = (e) => e.key === 'Escape' && setPanelOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [panelOpen, setPanelOpen]);

  return (
    <>
      {panelOpen && (
        <div className="chat-panel">
          <ChatWindow variant="floating" onClose={() => setPanelOpen(false)} />
        </div>
      )}
      <button
        className={`launcher ${sectionVisible || panelOpen || !pastHero ? 'launcher--hidden' : ''}`}
        onClick={() => setPanelOpen(true)}
        aria-label="Open Siddharth AI Assistant"
        tabIndex={sectionVisible || panelOpen || !pastHero ? -1 : 0}
      >
        <SparkIcon />
        <span>Ask Siddharth's AI</span>
      </button>
    </>
  );
}
