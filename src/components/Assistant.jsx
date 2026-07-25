import { useRef, useState } from 'react';
import { SYSTEM_PROMPT, suggestedQuestions } from '../data/resume';
import { useReveal } from '../hooks/useReveal';

const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;

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
  const historyRef = useRef([]); // API-format history: [{role, content}]
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

    historyRef.current.push({ role: 'user', content: text });

    if (!API_KEY) {
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = {
          role: 'assistant',
          text: "The AI assistant isn't configured yet — add a `VITE_ANTHROPIC_API_KEY` to your `.env` file to enable live answers (see the README). In the meantime: check the Projects and Skills sections above for the details you're after.",
        };
        return copy;
      });
      setBusy(false);
      scrollToBottom();
      return;
    }

    try {
      const resp = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 500,
          system: SYSTEM_PROMPT,
          messages: historyRef.current,
        }),
      });
      const data = await resp.json();
      const answer =
        (data.content || [])
          .filter((b) => b.type === 'text')
          .map((b) => b.text)
          .join('\n')
          .trim() || "I don't have enough information to answer that from the resume data.";

      historyRef.current.push({ role: 'assistant', content: answer });
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
        {!API_KEY && (
          <div className="chat-warning">
            ⚠ No API key configured. Add VITE_ANTHROPIC_API_KEY to a .env file to enable live answers — see README.md.
          </div>
        )}
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
          Answers are generated live via the Claude API, constrained to Siddharth's resume content only.
        </p>
      </div>
    </section>
  );
}
