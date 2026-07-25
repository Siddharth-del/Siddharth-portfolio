import { useRef, useState } from 'react';
import { suggestedQuestions } from '../data/resume';
import { useReveal } from '../hooks/useReveal';

// Base URL of your Spring Boot backend.
// Local dev (backend on 8080, frontend on 5173): set VITE_API_BASE_URL=http://localhost:8080 in .env
// Same-origin deploy (backend serves the built frontend, or reverse-proxied under one domain): leave unset.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Tiny, safe markdown-lite renderer: bold, inline code, and "- " lists only.
function renderMarkdownLite(raw) {
  let s = escapeHtml(raw);
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  const lines = s.split('\n');
  let html = '';
  let inList = false;
  for (const line of lines) {
    const t = line.trim();
    if (t.startsWith('- ')) {
      if (!inList) {
        html += '<ul>';
        inList = true;
      }
      html += `<li>${t.slice(2)}</li>`;
    } else {
      if (inList) {
        html += '</ul>';
        inList = false;
      }
      if (t) html += `<p>${t}</p>`;
    }
  }
  if (inList) html += '</ul>';
  return html || `<p>${s}</p>`;
}

function BotBubble({ text, typing }) {
  return (
    <div className="msg bot">
      <span className="bot-label">assistant</span>
      {typing ? (
        <div className="typing">
          <span></span>
          <span></span>
          <span></span>
        </div>
      ) : (
        <div className="bot-body" dangerouslySetInnerHTML={{ __html: renderMarkdownLite(text) }} />
      )}
    </div>
  );
}

export default function Assistant() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "Hi — I can answer questions about Siddharth's skills, projects, and background. Try one of the suggestions below, or ask your own.",
    },
  ]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const bodyRef = useRef(null);

  function scrollToBottom() {
    requestAnimationFrame(() => {
      if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    });
  }

  async function sendMessage(text) {
    if (!text.trim() || busy) return;
    setBusy(true);
    setMessages((m) => [...m, { role: 'user', text }, { role: 'assistant', text: '', typing: true }]);
    scrollToBottom();

    try {
      const resp = await fetch(`${API_BASE_URL}/api/ask-question`, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=UTF-8',
        },
        body: text,
      });

      if (!resp.ok) {
        throw new Error(`Backend responded with ${resp.status}`);
      }

      const answer = (await resp.text()).trim() || "I don't have enough information to answer that from the resume data.";

      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = { role: 'assistant', text: answer };
        return copy;
      });
    } catch (err) {
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = {
          role: 'assistant',
          text: "Sorry — I couldn't reach the assistant service just now. Please try again in a moment, or reach Siddharth directly via the contact section.",
        };
        return copy;
      });
    } finally {
      setBusy(false);
      scrollToBottom();
    }
  }

  function handleSend() {
    const v = input.trim();
    if (!v) return;
    setInput('');
    sendMessage(v);
  }

  const [ref, visible] = useReveal();

  return (
    <section className="section" id="assistant" ref={ref}>
      <div className="section-inner reveal" data-in={visible}>
        <div className="eyebrow">06 / ask-ai</div>
        <h2>Ask my AI assistant</h2>
        <p className="lede">
          Grounded only in the resume, project, and skills data in this app — it won't invent an
          employer, a metric, or a link that isn't real. If it doesn't know, it says so.
        </p>
      </div>
      <div className="section-inner reveal" data-in={visible} style={{ transitionDelay: '100ms' }}>
        <div className="chat-shell">
          <div className="chat-head">
            <span className="dot"></span>
            <span className="title">resume-assistant · grounded on Siddharth's data</span>
          </div>
          <div className="chat-body" ref={bodyRef}>
            {messages.map((m, i) =>
              m.role === 'user' ? (
                <div className="msg user" key={i}>
                  {m.text}
                </div>
              ) : (
                <BotBubble text={m.text} typing={m.typing} key={i} />
              )
            )}
          </div>
          <div className="suggested">
            {suggestedQuestions.map((q) => (
              <button className="sugg-chip" key={q} onClick={() => sendMessage(q)}>
                {q}
              </button>
            ))}
          </div>
          <div className="chat-input-row">
            <input
              type="text"
              placeholder="Ask about a project, a skill, or his background…"
              aria-label="Message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className="chat-send" onClick={handleSend} disabled={busy}>
              Send
            </button>
          </div>
        </div>
        <p className="chat-note">
          Answers are generated by a Spring Boot backend, constrained to Siddharth's resume content only.
        </p>
      </div>
    </section>
  );
}
