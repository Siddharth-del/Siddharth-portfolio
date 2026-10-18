import { useId, useRef, useState } from 'react';
import { METHODS, knownPaths, request, statusText, suggestions } from '../data/api';

// Turn a JSON value into highlighted lines. Strings that are API paths become runnable,
// URLs open in a new tab, emails open the mail app, and "#anchors" scroll the page.
function JsonView({ value, onRun }) {
  const text = JSON.stringify(value, null, 2);
  const re = /("(?:\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*")(\s*:)?|\b(true|false|null)\b|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g;
  const out = [];
  let last = 0;
  let m;
  let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] && m[2]) {
      out.push(
        <span className="j-key" key={k++}>
          {m[1]}
        </span>,
        m[2]
      );
    } else if (m[1]) {
      out.push(<StringToken raw={m[1]} key={k++} onRun={onRun} />);
    } else if (m[3]) {
      out.push(
        <span className={m[3] === 'null' ? 'j-null' : 'j-bool'} key={k++}>
          {m[3]}
        </span>
      );
    } else {
      out.push(
        <span className="j-num" key={k++}>
          {m[4]}
        </span>
      );
    }
    last = re.lastIndex;
  }
  out.push(text.slice(last));
  return <code>{out}</code>;
}

function StringToken({ raw, onRun }) {
  const v = JSON.parse(raw);
  if (knownPaths.includes(v)) {
    return (
      <button type="button" className="j-str j-link" onClick={() => onRun('GET', v)} title={`Run GET ${v}`}>
        {raw}
      </button>
    );
  }
  if (/^https?:\/\//.test(v)) {
    return (
      <a className="j-str j-link" href={v} target="_blank" rel="noopener noreferrer">
        {raw}
      </a>
    );
  }
  if (/^[\w.+-]+@[\w-]+\.[\w.]+$/.test(v)) {
    return (
      <a className="j-str j-link" href={`mailto:${v}`}>
        {raw}
      </a>
    );
  }
  if (/^#[\w-]+$/.test(v) || /\.pdf$/.test(v)) {
    return (
      <a className="j-str j-link" href={v} {...(v.endsWith('.pdf') ? { download: true } : {})}>
        {raw}
      </a>
    );
  }
  return <span className="j-str">{raw}</span>;
}

const first = request('GET', '/api/siddharth');

export default function ApiConsole() {
  const [method, setMethod] = useState('GET');
  const [path, setPath] = useState('/api/siddharth');
  const [res, setRes] = useState({ ...first, method: 'GET', ms: 12 });
  const [busy, setBusy] = useState(false);
  const bodyRef = useRef(null);
  const ids = { method: useId(), path: useId(), list: useId() };

  async function run(m = method, p = path) {
    if (busy) return;
    setMethod(m);
    setPath(p);
    setBusy(true);
    const t0 = performance.now();
    const r = request(m, p);
    // A little latency so the request visibly round-trips.
    await new Promise((resolve) => setTimeout(resolve, 140 + Math.random() * 160));
    const ms = Math.max(4, Math.round((performance.now() - t0) / 9));
    setRes({ ...r, method: m, ms });
    setPath(r.path);
    setBusy(false);
    bodyRef.current?.scrollTo({ top: 0 });
  }

  function submit(e) {
    e.preventDefault();
    run();
  }

  const ok = res.status < 300;

  return (
    <div className="api" aria-label="Siddharth API console">
      <div className="api__head">
        <span className="api__title">Siddharth API</span>
        <span className="api__note">Mock REST API of this portfolio. Try a request.</span>
      </div>

      <ul className="api__try" aria-label="Example requests">
        {suggestions.map((s) => (
          <li key={s.method + s.path}>
            <button
              type="button"
              className={`api__chip ${res.method === s.method && res.path === s.path ? 'is-active' : ''}`}
              onClick={() => run(s.method, s.path)}
            >
              <b className={`verb verb--${s.method.toLowerCase()}`}>{s.method}</b> {s.path}
            </button>
          </li>
        ))}
      </ul>

      <form className="api__req" onSubmit={submit}>
        <label className="sr-only" htmlFor={ids.method}>
          Method
        </label>
        <select
          id={ids.method}
          className={`api__method verb--${method.toLowerCase()}`}
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          {METHODS.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
        <label className="sr-only" htmlFor={ids.path}>
          Path
        </label>
        <input
          id={ids.path}
          className="api__path"
          value={path}
          onChange={(e) => setPath(e.target.value)}
          list={ids.list}
          spellCheck="false"
          autoComplete="off"
          autoCapitalize="off"
        />
        <datalist id={ids.list}>
          {knownPaths.map((p) => (
            <option key={p} value={p} />
          ))}
        </datalist>
        <button className="api__send" type="submit" disabled={busy}>
          {busy ? 'Sending' : 'Send'}
        </button>
      </form>

      <div className="api__res" aria-live="polite" aria-busy={busy}>
        <div className="api__status">
          <span className={`api__code ${ok ? 'is-ok' : 'is-err'}`}>
            {res.status} {statusText(res.status)}
          </span>
          <span className="api__meta">
            {res.ms} ms · application/json
            {res.headers?.location && (
              <>
                {' · '}
                <a href={res.headers.location}>location: {res.headers.location}</a>
              </>
            )}
            {res.headers?.allow && <> · allow: {res.headers.allow}</>}
          </span>
        </div>
        <pre className={`api__body ${busy ? 'is-busy' : ''}`} ref={bodyRef} tabIndex={0}>
          <JsonView value={res.body} onRun={run} />
        </pre>
      </div>
    </div>
  );
}
