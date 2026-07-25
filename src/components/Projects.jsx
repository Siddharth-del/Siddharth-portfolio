import { projects } from '../data/resume';
import { diagramMap } from './ArchDiagrams';
import { useReveal } from '../hooks/useReveal';

function ProjectCard({ project, delay }) {
  const Diagram = diagramMap[project.diagram];
  const [ref, visible] = useReveal(0.05);
  return (
    <div className="project reveal" data-in={visible} style={{ transitionDelay: `${delay}ms` }} ref={ref}>
      <div className="project-head">
        <h3>{project.name}</h3>
        <span className="p-status">{project.status}</span>
      </div>
      <p className="p-overview">{project.overview}</p>

      <div className="arch-wrap" role="img" aria-label={`${project.name} architecture diagram`}>
        <Diagram />
      </div>

      <div className="p-cols">
        <div className="p-block">
          <h4>Problem</h4>
          <p>{project.problem}</p>
        </div>
        <div className="p-block">
          <h4>Solution</h4>
          <p>{project.solution}</p>
        </div>
      </div>
      <div className="p-cols">
        <div className="p-block">
          <h4>Technical decisions</h4>
          <ul>
            {project.decisions.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
        <div className="p-block">
          <h4>Challenge</h4>
          <p>{project.challenge}</p>
        </div>
      </div>
      <div className="stack-row">
        {project.stack.map((s) => (
          <span className="chip" key={s}>
            {s}
          </span>
        ))}
      </div>
      <div className="p-links">
        <a href={project.link.url}>Ask for the link →</a>
      </div>
    </div>
  );
}

export default function Projects() {
  const [headRef, headVisible] = useReveal();
  return (
    <section className="section" id="projects" ref={headRef}>
      <div className="section-inner reveal" data-in={headVisible}>
        <div className="eyebrow">05 / projects</div>
        <h2>Engineering case studies</h2>
        <p className="lede">
          Three systems, three different problems — each one built and reasoned through
          end-to-end, not a CRUD boilerplate.
        </p>
      </div>
      {projects.map((p, i) => (
        <ProjectCard project={p} delay={i * 40} key={p.id} />
      ))}
    </section>
  );
}
