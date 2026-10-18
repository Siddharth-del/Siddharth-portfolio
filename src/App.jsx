import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Work from './components/Work';
import { Certifications, Journey } from './components/Journey';
import { AssistantLauncher, AssistantProvider, AssistantSection } from './components/Assistant';
import Contact from './components/Contact';
import { profile } from './data/portfolio';
import { GitHubIcon, LinkedInIcon, MailIcon } from './components/Icons';

export default function App() {
  return (
    <AssistantProvider>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Work />
        <Journey />
        <Certifications />
        <AssistantSection />
        <Contact />
      </main>
      <footer className="footer">
        <div className="container footer__inner">
          <p>© {new Date().getFullYear()} Siddharth. All rights reserved.</p>
          <div className="footer__links">
            <a className="icon-btn" href={profile.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <GitHubIcon />
            </a>
            <a className="icon-btn" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <LinkedInIcon />
            </a>
            <a className="icon-btn" href={`mailto:${profile.email}`} aria-label="Email">
              <MailIcon />
            </a>
            <a href="#home" className="text-link">
              Back to top
            </a>
          </div>
        </div>
      </footer>
      <AssistantLauncher />
    </AssistantProvider>
  );
}
