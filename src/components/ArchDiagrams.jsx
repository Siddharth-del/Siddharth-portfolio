// Hand-built architecture diagrams reflecting each project's real structure —
// not decorative, each box/arrow maps to an actual component described in the resume.

export function AgriProDiagram() {
  return (
    <svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg" fontFamily="IBM Plex Mono, monospace">
      <defs>
        <marker id="arrow1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#4B5563" />
        </marker>
      </defs>
      <g fill="none" stroke="#2A3038" strokeWidth="1">
        <rect x="10" y="20" width="120" height="46" rx="6" fill="#181D22" stroke="#2A3038" />
        <rect x="10" y="150" width="120" height="46" rx="6" fill="#181D22" stroke="#2A3038" />
        <rect x="200" y="85" width="150" height="50" rx="6" fill="#1E252B" stroke="#E8A33D" strokeOpacity="0.5" />
        <rect x="420" y="20" width="130" height="46" rx="6" fill="#181D22" stroke="#2A3038" />
        <rect x="420" y="150" width="130" height="46" rx="6" fill="#181D22" stroke="#2A3038" />
        <rect x="600" y="20" width="110" height="46" rx="6" fill="#181D22" stroke="#2A3038" />
        <rect x="600" y="150" width="110" height="46" rx="6" fill="#181D22" stroke="#2A3038" />
      </g>
      <g fill="#E7E9EC" fontSize="11">
        <text x="70" y="47" textAnchor="middle">ESP32</text>
        <text x="70" y="59" textAnchor="middle" fill="#8B94A0" fontSize="9">soil / temp / humidity</text>
        <text x="70" y="177" textAnchor="middle">Weather API</text>
        <text x="70" y="189" textAnchor="middle" fill="#8B94A0" fontSize="9">external feed</text>
        <text x="275" y="105" textAnchor="middle" fill="#E8A33D" fontWeight="600">Spring Boot</text>
        <text x="275" y="119" textAnchor="middle" fill="#8B94A0" fontSize="9">4 REST endpoints · validation · pagination</text>
        <text x="485" y="47" textAnchor="middle">Spring AI</text>
        <text x="485" y="59" textAnchor="middle" fill="#8B94A0" fontSize="9">crop + disease reasoning</text>
        <text x="485" y="177" textAnchor="middle">PostgreSQL</text>
        <text x="485" y="189" textAnchor="middle" fill="#8B94A0" fontSize="9">sensor history</text>
        <text x="655" y="47" textAnchor="middle">Alert Engine</text>
        <text x="655" y="59" textAnchor="middle" fill="#8B94A0" fontSize="9">email + cooldown</text>
        <text x="655" y="177" textAnchor="middle">Farmer</text>
        <text x="655" y="189" textAnchor="middle" fill="#8B94A0" fontSize="9">plain-language output</text>
      </g>
      <g stroke="#4B5563" strokeWidth="1.2" markerEnd="url(#arrow1)">
        <path d="M130,43 L198,95" />
        <path d="M130,173 L198,125" />
        <path d="M350,98 L418,43" />
        <path d="M350,122 L418,170" />
        <path d="M550,43 L600,43" />
        <path d="M550,173 L600,173" />
      </g>
    </svg>
  );
}

export function FitnessDiagram() {
  return (
    <svg viewBox="0 0 720 190" xmlns="http://www.w3.org/2000/svg" fontFamily="IBM Plex Mono, monospace">
      <defs>
        <marker id="arrow2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#4B5563" />
        </marker>
      </defs>
      <g stroke="#2A3038" strokeWidth="1">
        <rect x="10" y="20" width="110" height="46" rx="6" fill="#181D22" />
        <rect x="175" y="20" width="130" height="46" rx="6" fill="#1E252B" stroke="#E8A33D" strokeOpacity="0.5" />
        <rect x="360" y="20" width="140" height="46" rx="6" fill="#181D22" />
        <rect x="555" y="20" width="150" height="46" rx="6" fill="#181D22" />
        <rect x="10" y="120" width="110" height="46" rx="6" fill="#181D22" />
        <rect x="175" y="120" width="150" height="46" rx="6" fill="#181D22" />
      </g>
      <g fill="#E7E9EC" fontSize="11">
        <text x="65" y="47" textAnchor="middle">Client</text>
        <text x="240" y="42" textAnchor="middle" fill="#E8A33D" fontWeight="600">JWT + Role Guard</text>
        <text x="240" y="56" textAnchor="middle" fill="#8B94A0" fontSize="9">auth filter</text>
        <text x="430" y="42" textAnchor="middle">Spring Boot REST</text>
        <text x="430" y="56" textAnchor="middle" fill="#8B94A0" fontSize="9">15+ validated routes</text>
        <text x="630" y="42" textAnchor="middle">PostgreSQL</text>
        <text x="630" y="56" textAnchor="middle" fill="#8B94A0" fontSize="9">Neon Cloud</text>
        <text x="65" y="147" textAnchor="middle">Docker Build</text>
        <text x="250" y="142" textAnchor="middle">CI/CD Pipeline</text>
        <text x="250" y="156" textAnchor="middle" fill="#8B94A0" fontSize="9">automated, consistent deploys</text>
      </g>
      <g stroke="#4B5563" strokeWidth="1.2" markerEnd="url(#arrow2)">
        <path d="M120,43 L173,43" />
        <path d="M305,43 L358,43" />
        <path d="M500,43 L553,43" />
        <path d="M120,143 L173,143" />
      </g>
    </svg>
  );
}

export function EmailDiagram() {
  return (
    <svg viewBox="0 0 720 150" xmlns="http://www.w3.org/2000/svg" fontFamily="IBM Plex Mono, monospace">
      <defs>
        <marker id="arrow3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#4B5563" />
        </marker>
      </defs>
      <g stroke="#2A3038" strokeWidth="1">
        <rect x="10" y="20" width="130" height="46" rx="6" fill="#181D22" />
        <rect x="195" y="20" width="150" height="46" rx="6" fill="#181D22" />
        <rect x="400" y="20" width="150" height="46" rx="6" fill="#1E252B" stroke="#E8A33D" strokeOpacity="0.5" />
        <rect x="605" y="20" width="105" height="46" rx="6" fill="#181D22" />
      </g>
      <g fill="#E7E9EC" fontSize="11">
        <text x="75" y="42" textAnchor="middle">Email Payload</text>
        <text x="75" y="56" textAnchor="middle" fill="#8B94A0" fontSize="9">REST endpoint</text>
        <text x="270" y="42" textAnchor="middle">Prompt Templates</text>
        <text x="270" y="56" textAnchor="middle" fill="#8B94A0" fontSize="9">consistency by intent</text>
        <text x="475" y="42" textAnchor="middle" fill="#E8A33D" fontWeight="600">Gemini API</text>
        <text x="475" y="56" textAnchor="middle" fill="#8B94A0" fontSize="9">context-aware reply</text>
        <text x="657" y="42" textAnchor="middle">JSON Reply</text>
        <text x="657" y="56" textAnchor="middle" fill="#8B94A0" fontSize="9">validated output</text>
      </g>
      <g stroke="#4B5563" strokeWidth="1.2" markerEnd="url(#arrow3)">
        <path d="M140,43 L193,43" />
        <path d="M345,43 L398,43" />
        <path d="M550,43 L603,43" />
      </g>
    </svg>
  );
}

export const diagramMap = {
  agripro: AgriProDiagram,
  fitness: FitnessDiagram,
  email: EmailDiagram,
};
