// Beyond Birds & Bees — Home, About, Programs pages

const { useState: useState1, useEffect: useEffect1 } = React;

function Home({ t, setRoute }) {
  return (
    <div className="page-home">
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" aria-hidden="true">
          <BlobDeco color="var(--accent-hero-bg)" size={520} style={{ top: -140, right: -120, opacity: 0.9 }}/>
          <BlobDeco color="var(--accent-hero-alt)" size={360} style={{ bottom: -80, left: -100, opacity: 0.75 }}/>
        </div>

        <div className="wrap hero-inner">
          <Reveal>
            <div className="eyebrow">{t.home.eyebrow}</div>
          </Reveal>

          <Reveal delay={60}>
            <h1 className="hero-title">
              <span className="display-tight">We educate.</span>
              <span className="display" style={{ color: 'var(--pink-500)' }}>We engage.</span>
              <span><span className="display-tight">We </span><em className="display" style={{ color: 'var(--green-500)', fontStyle: 'italic' }}>empower.</em></span>
            </h1>
          </Reveal>

          <Reveal delay={120} className="hero-sub">
            <p className="lead pretty-wrap">{t.home.heroLead}</p>
            <p className="lead-small pretty-wrap">{t.home.heroSmall}</p>
          </Reveal>

          <Reveal delay={180} className="hero-ctas">
            <button className="btn btn-primary" onClick={() => setRoute('/programs')}>
              {t.home.ctaPrimary}
              <svg width="14" height="10" viewBox="0 0 14 10"><path d="M1 5h11m0 0L8 1m4 4L8 9" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
            </button>
            <button className="btn btn-secondary" onClick={() => setRoute('/about')}>{t.nav.about}</button>
          </Reveal>

          <BeeSticker size={100} rotate={-18} style={{ position: 'absolute', top: 40, right: '6%' }}/>
          <BirdSticker size={110} rotate={12} style={{ position: 'absolute', bottom: 60, right: '12%' }}/>
        </div>

        {/* Marquee */}
        <div className="marquee-wrap" aria-hidden="true">
          <div className="marquee-track">
            {[...t.home.marquee, ...t.home.marquee, ...t.home.marquee].map((w, i) => (
              <span key={i} className="marquee-item">
                <em>{w}</em>
                <span className="marquee-dot">✽</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* STATS BAND */}
      <section className="stats-band">
        <div className="wrap stats-wrap">
          {t.home.stats.map((s, i) => (
            <Reveal key={i} delay={i * 60} className="stat">
              <div className="stat-n display">{s.n}</div>
              <div className="stat-k mono">{s.k}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PILLARS — Educate / Engage / Empower */}
      <section className="pillars wrap">
        {t.home.pillars.map((p, i) => (
          <Reveal key={i} delay={i * 80} className="pillar">
            <div className="pillar-num mono">0{i + 1} / 03</div>
            <div className="pillar-body">
              <div className="pillar-tag">{p.tag}</div>
              <h3 className="pillar-big display">{p.big}</h3>
              <p className="pillar-text">{p.body}</p>
            </div>
          </Reveal>
        ))}
      </section>

      {/* INTRO — the story */}
      <section className="intro wrap">
        <div className="intro-grid">
          <Reveal className="intro-copy">
            <div className="eyebrow">{t.home.introEyebrow}</div>
            <h2 className="display-tight intro-title tight-wrap">{t.home.introTitle}</h2>
            <p className="intro-body pretty-wrap">{t.home.introBody}</p>
            <a href="#/about" onClick={(e) => { e.preventDefault(); setRoute('/about'); }} className="link-arrow">
              {t.home.introLink}
              <svg width="14" height="10" viewBox="0 0 14 10"><path d="M1 5h11m0 0L8 1m4 4L8 9" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
            </a>
          </Reveal>

          <Reveal delay={100} className="intro-photos">
            <Photo className="intro-photo intro-photo-a" variant="pink" label="photo · workshop in session"/>
            <Photo className="intro-photo intro-photo-b" variant="green" label="photo · youth portrait"/>
            <div className="intro-stamp">
              <span className="mono">est.</span>
              <span className="display">2024</span>
              <span className="mono">/ Thailand</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHY BEYOND */}
      <section className="why-beyond">
        <div className="wrap">
          <div className="why-head">
            <Reveal>
              <div className="eyebrow">{t.home.whyBeyondEyebrow}</div>
              <h2 className="display-tight why-title tight-wrap">{t.home.whyBeyondTitle}</h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="why-body pretty-wrap">{t.home.whyBeyondBody}</p>
            </Reveal>
          </div>

          <div className="why-grid">
            {t.home.pillarsBeyond.map((p, i) => (
              <Reveal key={i} delay={i * 80} className="why-card">
                <div className="why-num display">{p.n}</div>
                <h4 className="why-card-title">{p.title}</h4>
                <p className="why-card-body">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="values wrap">
        <Reveal>
          <div className="eyebrow">{t.home.valuesEyebrow}</div>
          <h2 className="display-tight values-title">{t.home.valuesTitle}</h2>
        </Reveal>

        <div className="values-list">
          {t.home.values.map((v, i) => (
            <Reveal key={i} delay={i * 40} as="div" className="value-row">
              <div className="value-n mono">0{i + 1}</div>
              <div className="value-k display">{v.k}</div>
              <div className="value-v pretty-wrap">{v.v}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TEAM PREVIEW */}
      <section className="team-preview">
        <div className="wrap">
          <div className="team-head">
            <Reveal>
              <div className="eyebrow">{t.home.teamEyebrow}</div>
              <h2 className="display-tight">{t.home.teamTitle}</h2>
            </Reveal>
            <Reveal delay={80}>
              <a href="#/about" onClick={(e) => { e.preventDefault(); setRoute('/about#team'); }} className="link-arrow">
                {t.home.teamCta}
                <svg width="14" height="10" viewBox="0 0 14 10"><path d="M1 5h11m0 0L8 1m4 4L8 9" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
              </a>
            </Reveal>
          </div>
          <div className="team-grid">
            {t.about.team.map((m, i) => (
              <Reveal key={i} delay={i * 50} className="team-card">
                <Photo variant={['pink', 'green', 'butter', 'sky', 'pink'][i]} className="team-photo" label={`portrait · ${m.name}`}/>
                <div className="team-emoji">{m.emoji}</div>
                <h4 className="team-name display">{m.name}</h4>
                <div className="team-role mono">{m.role}</div>
                {m.ask && (
                  <div className="team-ask">
                    <div className="team-ask-label mono">ask me about</div>
                    <div className="team-ask-tags">
                      {m.ask.map((a, j) => <span key={j} className="team-ask-tag">{a}</span>)}
                    </div>
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TOPICS */}
      <section className="topics wrap">
        <div className="topics-head">
          <Reveal>
            <div className="eyebrow">{t.home.topicsEyebrow}</div>
            <h2 className="display-tight tight-wrap">{t.home.topicsTitle}</h2>
          </Reveal>
          <Reveal delay={80}>
            <a href="#/community" onClick={(e) => { e.preventDefault(); setRoute('/community'); }} className="link-arrow">
              {t.home.topicsLink}
              <svg width="14" height="10" viewBox="0 0 14 10"><path d="M1 5h11m0 0L8 1m4 4L8 9" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
            </a>
          </Reveal>
        </div>
        <div className="topics-grid">
          {t.home.topics.map((tp, i) => (
            <Reveal key={i} delay={i * 60} className="topic-card">
              <div className="topic-tag mono">{tp.tag}</div>
              <h4 className="topic-title display">{tp.title}</h4>
              <p className="topic-body">{tp.body}</p>
              <div className="topic-arrow" aria-hidden="true">
                <svg width="18" height="12" viewBox="0 0 14 10"><path d="M1 5h11m0 0L8 1m4 4L8 9" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SUPPORT */}
      <section className="support wrap">
        <Reveal className="support-inner">
          <div className="support-art" aria-hidden="true">
            <BlobDeco color="var(--accent-hero-bg)" size={180} style={{ top: -40, left: -40 }}/>
            <BlobDeco color="var(--accent-hero-alt)" size={140} style={{ bottom: -30, right: -30 }}/>
            <div className="support-heart display">♡</div>
          </div>
          <div className="support-copy">
            <h2 className="display-tight support-title">{t.home.supportTitle}</h2>
            <p className="support-body pretty-wrap">{t.home.supportBody}</p>
            <div className="support-actions">
              <button className="btn btn-primary" disabled style={{ cursor: 'default' }}>
                {t.home.supportCta}
                <span className="soon-pill mono">{t.home.supportComing}</span>
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="big-cta wrap">
        <Reveal className="big-cta-inner">
          <h2 className="display-tight big-cta-title tight-wrap">{t.home.ctaTitle}</h2>
          <p className="big-cta-body pretty-wrap">{t.home.ctaBody}</p>
          <div className="big-cta-actions">
            <button className="btn btn-primary" onClick={() => setRoute('/programs')}>{t.home.ctaPrimary}</button>
            <button className="btn btn-ghost" onClick={() => setRoute('/contact#volunteer')}>{t.home.ctaSecondary}</button>
          </div>
          <BeeSticker size={70} rotate={-20} style={{ position: 'absolute', top: -30, right: '8%' }}/>
        </Reveal>
      </section>
    </div>
  );
}

// ===== ABOUT =====

function About({ t, setRoute }) {
  return (
    <div className="page-about">
      <section className="page-hero wrap">
        <Reveal>
          <div className="eyebrow">{t.about.eyebrow}</div>
          <h1 className="display-tight page-title tight-wrap">{t.about.title}</h1>
        </Reveal>
        <Reveal delay={100}>
          <p className="page-lead pretty-wrap">{t.about.lead}</p>
        </Reveal>
      </section>

      {/* Vision */}
      <section id="vision" className="vision">
        <div className="wrap vision-inner">
          <Reveal className="vision-copy">
            <div className="eyebrow">{t.about.visionEyebrow}</div>
            <blockquote className="vision-quote display pretty-wrap">
              <span className="quote-mark">“</span>
              {t.about.vision}
            </blockquote>
          </Reveal>
          <div className="vision-deco" aria-hidden="true">
            <BlobDeco color="var(--accent-a)" size={300}/>
            <BeeSticker size={90} rotate={-10} style={{ position: 'absolute', top: 40, left: 40 }}/>
          </div>
        </div>
      </section>

      {/* Story */}
      <section id="story" className="story wrap">
        <div className="story-grid">
          <Reveal className="story-copy">
            <div className="eyebrow">{t.about.storyEyebrow}</div>
            <h2 className="display-tight tight-wrap">{t.about.storyTitle}</h2>
            {t.about.story.map((p, i) => (
              <p key={i} className="pretty-wrap">{p}</p>
            ))}
          </Reveal>
          <Reveal delay={100} className="story-photos">
            <Photo variant="pink" className="story-photo story-photo-a" label="photo · founding workshop"/>
            <Photo variant="green" className="story-photo story-photo-b" label="photo · team meeting"/>
            <Photo variant="butter" className="story-photo story-photo-c" label="photo · community dialogue"/>
          </Reveal>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="team-full">
        <div className="wrap">
          <Reveal>
            <div className="eyebrow">{t.about.teamEyebrow}</div>
            <h2 className="display-tight tight-wrap">{t.about.teamTitle}</h2>
          </Reveal>
          <div className="team-full-list">
            {t.about.team.map((m, i) => (
              <Reveal key={i} delay={i * 60} className="team-full-card">
                <Photo variant={['pink', 'green', 'butter', 'sky', 'pink'][i]} className="team-full-photo" label={`portrait · ${m.name}`}>
                  <div className="team-emoji-lg">{m.emoji}</div>
                </Photo>
                <div className="team-full-info">
                  <div className="team-full-meta">
                    <span className="mono">0{i + 1} / 05</span>
                    <span className="mono">{m.role}</span>
                  </div>
                  <h3 className="display team-full-name">{m.name}</h3>
                  <p className="team-full-bio pretty-wrap">{m.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ===== PROGRAMS =====

function Programs({ t, setRoute }) {
  return (
    <div className="page-programs">
      <section className="page-hero wrap">
        <Reveal>
          <div className="eyebrow">{t.programs.eyebrow}</div>
          <h1 className="display-tight page-title tight-wrap">{t.programs.title}</h1>
        </Reveal>
        <Reveal delay={100}>
          <p className="page-lead pretty-wrap">{t.programs.lead}</p>
        </Reveal>
      </section>

      <section className="offerings wrap">
        <div className="offerings-grid">
          {t.programs.offerings.map((o, i) => (
            <Reveal key={i} delay={i * 60} className="offering">
              <div className="offering-header">
                <Chip variant={['', 'alt', 'butter', 'sky'][i]}>{o.kind}</Chip>
                <span className="mono">{o.len}</span>
              </div>
              <h3 className="offering-title display-tight">{o.title}</h3>
              <div className="offering-who mono">for · {o.who}</div>
              <p className="offering-body pretty-wrap">{o.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="how">
        <div className="wrap">
          <Reveal>
            <div className="eyebrow">{t.programs.howEyebrow}</div>
            <h2 className="display-tight tight-wrap">{t.programs.howTitle}</h2>
          </Reveal>
          <div className="how-grid">
            {t.programs.how.map((h, i) => (
              <Reveal key={i} delay={i * 80} className="how-card">
                <div className="how-num display">{h.n}</div>
                <h4 className="how-title">{h.title}</h4>
                <p className="how-body pretty-wrap">{h.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="big-cta wrap">
        <Reveal className="big-cta-inner">
          <h2 className="display-tight big-cta-title tight-wrap">{t.home.ctaTitle}</h2>
          <div className="big-cta-actions">
            <button className="btn btn-primary" onClick={() => setRoute('/contact#workshop')}>{t.programs.requestCta}</button>
            <button className="btn btn-ghost">{t.programs.resourcesCta}</button>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

Object.assign(window, { Home, About, Programs });
