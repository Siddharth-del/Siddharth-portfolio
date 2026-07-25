export default function MobileNav({ open, onToggle, onClose }) {
  return (
    <>
      <button className="menu-toggle" id="menuToggle" aria-label="Toggle navigation" onClick={onToggle}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div className={`scrim${open ? ' show' : ''}`} onClick={onClose}></div>
    </>
  );
}
