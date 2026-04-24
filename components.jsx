// Shared UI components for Beyond Birds & Bees
// Exposes: Nav, Footer, Section, Photo, Chip, BeeSticker, BirdSticker, BlobDeco, Reveal

const { useState, useEffect, useRef } = React;

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, as: As = 'div', delay = 0, className = '', ...rest }) {
  const ref = useReveal();
  const style = delay ? { transitionDelay: `${delay}ms` } : undefined;
  return <As ref={ref} className={`reveal ${className}`} style={style} {...rest}>{children}</As>;
}

function Chip({ children, variant = '', style }) {
  return <span className={`chip ${variant}`} style={style}>{children}</span>;
}

function Photo({ label, className = '', variant = '', style, children }) {
  return (
    <div className={`photo ${variant} ${className}`} style={style}>
      {children || (label ? <div className="photo-label">{label}</div> : null)}
    </div>
  );
}

// Decorative "bee" sticker — abstract striped oval, no anatomical drawing
function BeeSticker({ size = 80, rotate = -12, style }) {
  const s = { width: size, height: size, transform: `rotate(${rotate}deg)`, ...style };
  return (
    <div className="bee-sticker" style={s} aria-hidden="true">
      <svg viewBox="0 0 80 80" width={size} height={size}>
        <defs>
          <pattern id="bee-stripes" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(25)">
            <rect width="10" height="10" fill="#f7e4a8"/>
            <rect width="5" height="10" fill="#2a2320"/>
          </pattern>
        </defs>
        <ellipse cx="40" cy="44" rx="28" ry="22" fill="url(#bee-stripes)" stroke="#2a2320" strokeWidth="1.5"/>
        <ellipse cx="28" cy="30" rx="14" ry="8" fill="#fff" opacity="0.9" stroke="#2a2320" strokeWidth="1.2"/>
        <ellipse cx="50" cy="28" rx="14" ry="8" fill="#fff" opacity="0.9" stroke="#2a2320" strokeWidth="1.2"/>
      </svg>
    </div>
  );
}

// Decorative "bird" sticker — abstract leaf-shape, reads as a silhouette
function BirdSticker({ size = 90, rotate = 8, style }) {
  const s = { width: size, height: size * 0.75, transform: `rotate(${rotate}deg)`, ...style };
  return (
    <div className="bird-sticker" style={s} aria-hidden="true">
      <svg viewBox="0 0 120 90" width={size} height={size * 0.75}>
        <path d="M10 70 Q 30 20 70 30 Q 100 35 115 25 Q 95 55 70 58 Q 50 60 40 78 Q 30 82 10 70 Z"
              fill="var(--pink-200)" stroke="#2a2320" strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="95" cy="35" r="2" fill="#2a2320"/>
      </svg>
    </div>
  );
}

function BlobDeco({ color = 'var(--accent-a)', size = 220, style }) {
  return (
    <svg className="blob" viewBox="0 0 200 200" width={size} height={size} style={style} aria-hidden="true">
      <path d="M44.7,-67.3C56.6,-59.1,63.6,-43.1,69.1,-27.5C74.6,-11.9,78.6,3.2,74.5,16.4C70.5,29.5,58.4,40.6,45.3,49.2C32.2,57.7,18,63.7,2.4,60.4C-13.1,57.1,-29.9,44.5,-44.1,31.3C-58.3,18.1,-69.9,4.3,-69.8,-9.3C-69.6,-22.9,-57.7,-36.3,-44.3,-45.1C-30.9,-53.9,-15.4,-58.1,0.9,-59.4C17.3,-60.7,34.5,-59.1,44.7,-67.3Z"
            transform="translate(100 100)" fill={color}/>
    </svg>
  );
}

function Section({ eyebrow, children, className = '', ...rest }) {
  return (
    <section className={`section ${className}`} {...rest}>
      {eyebrow && <div className="wrap"><div className="eyebrow section-eyebrow">{eyebrow}</div></div>}
      {children}
    </section>
  );
}

// ===== Nav =====

function Nav({ route, setRoute, lang, setLang, t }) {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setAboutOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const go = (path) => {
    setRoute(path);
    setAboutOpen(false);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isActive = (p) => route === p || (p === '/about' && route.startsWith('/about'));

  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#/" onClick={(e) => { e.preventDefault(); go('/'); }} className="logo">
          <img src="assets/logo-mark.png" alt="" className="logo-mark logo-mark-img"/>
          <span className="logo-text">Beyond <span className="logo-birds">Birds</span><span className="logo-amp">✦</span><span className="logo-bees">Bees</span></span>
        </a>

        <div className="nav-links" style={{ display: 'flex' }}>
          <a href="#/" onClick={(e) => { e.preventDefault(); go('/'); }}
             className={`nav-link ${isActive('/') ? 'active' : ''}`}>{t.nav.home}</a>

          <div className={`nav-dropdown ${aboutOpen ? 'open' : ''}`} ref={dropdownRef}>
            <button
              className={`nav-link ${isActive('/about') ? 'active' : ''}`}
              onClick={() => setAboutOpen(!aboutOpen)}
              aria-expanded={aboutOpen}
            >
              {t.nav.about}
              <svg width="10" height="6" viewBox="0 0 10 6" style={{ marginLeft: 4, transform: aboutOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              </svg>
            </button>
            <div className="nav-dropdown-menu">
              <a href="#/about" onClick={(e) => { e.preventDefault(); go('/about#vision'); }} className="nav-dropdown-item">{t.nav.aboutVision}</a>
              <a href="#/about" onClick={(e) => { e.preventDefault(); go('/about#story'); }} className="nav-dropdown-item">{t.nav.aboutStory}</a>
              <a href="#/about" onClick={(e) => { e.preventDefault(); go('/about#team'); }} className="nav-dropdown-item">{t.nav.aboutTeam}</a>
            </div>
          </div>

          <a href="#/programs" onClick={(e) => { e.preventDefault(); go('/programs'); }}
             className={`nav-link ${isActive('/programs') ? 'active' : ''}`}>{t.nav.programs}</a>
          <a href="#/community" onClick={(e) => { e.preventDefault(); go('/community'); }}
             className={`nav-link ${isActive('/community') ? 'active' : ''}`}>{t.nav.community}</a>

          <span style={{ width: 12 }}></span>

          <div className="lang">
            <button onClick={() => setLang('en')} className={lang === 'en' ? 'active' : ''}>EN</button>
            <button onClick={() => setLang('th')} className={lang === 'th' ? 'active' : ''}>TH</button>
          </div>

          <a href="#/contact" onClick={(e) => { e.preventDefault(); go('/contact'); }}
             className="btn btn-primary" style={{ marginLeft: 8, padding: '10px 18px', fontSize: 13 }}>
            {t.nav.contact}
          </a>
        </div>
      </div>
    </nav>
  );
}

// ===== Footer =====

function Footer({ t, route, setRoute }) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const go = (path) => {
    setRoute(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <footer>
      <div className="footer-inner">
        <div>
          <div className="logo" style={{ color: 'var(--bg)', marginBottom: 16 }}>
            <img src="assets/logo-mark.png" alt="" className="logo-mark logo-mark-img logo-mark-footer"/>
            <span className="logo-text">Beyond <span className="logo-birds">Birds</span><span className="logo-amp">✦</span><span className="logo-bees">Bees</span></span>
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.6, maxWidth: 320, color: 'color-mix(in srgb, var(--bg) 80%, transparent)' }}>
            {t.footer.blurb}
          </p>
        </div>

        <div>
          <h4>{t.footer.explore}</h4>
          <a href="#/" onClick={(e) => { e.preventDefault(); go('/'); }}>{t.nav.home}</a>
          <a href="#/about" onClick={(e) => { e.preventDefault(); go('/about'); }}>{t.nav.about}</a>
          <a href="#/programs" onClick={(e) => { e.preventDefault(); go('/programs'); }}>{t.nav.programs}</a>
          <a href="#/community" onClick={(e) => { e.preventDefault(); go('/community'); }}>{t.nav.community}</a>
        </div>

        <div>
          <h4>{t.footer.connect}</h4>
          <a href="https://facebook.com/beyondbirdsandbees" target="_blank" rel="noopener">Facebook</a>
          <a href="https://instagram.com/beyond_bnb" target="_blank" rel="noopener">Instagram <span className="mono" style={{ color: 'inherit', fontSize: 10 }}>@beyond_bnb</span></a>
          <a href="mailto:beyond_bnb@gmail.com">beyond_bnb@gmail.com</a>
        </div>

        <div>
          <h4>{t.footer.act}</h4>
          <a href="#/contact" onClick={(e) => { e.preventDefault(); go('/contact'); }}>{t.nav.contact}</a>
          <a href="#/programs" onClick={(e) => { e.preventDefault(); go('/programs'); }}>{t.programs.requestCta}</a>
          <a href="#/contact" onClick={(e) => { e.preventDefault(); go('/contact#volunteer'); }}>Volunteer</a>
        </div>
      </div>

      <div className="footer-newsletter">
        <div className="fn-copy">
          <h4 className="fn-title display">{t.home.newsletterTitle}</h4>
          <p className="fn-body">{t.home.newsletterBody}</p>
        </div>
        <form className="fn-form" onSubmit={(e) => { e.preventDefault(); if (email.includes('@')) { setSent(true); setEmail(''); setTimeout(() => setSent(false), 4000); } }}>
          <input type="email" required placeholder={t.home.newsletterPlaceholder} value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email"/>
          <button type="submit" className="btn btn-primary">{t.home.newsletterCta}</button>
          {sent && <div className="fn-sent mono">✓ {t.home.newsletterSent}</div>}
        </form>
      </div>

      <div className="footer-bottom">
        <span>{t.footer.copyright}</span>
        <span>beyond-bnb.com</span>
      </div>
    </footer>
  );
}

Object.assign(window, { useReveal, Reveal, Chip, Photo, BeeSticker, BirdSticker, BlobDeco, Section, Nav, Footer });
