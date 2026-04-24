// Beyond Birds & Bees — Community & Contact pages

function Community({ t, setRoute }) {
  const [activeIdx, setActiveIdx] = React.useState(0);

  return (
    <div className="page-community">
      <section className="page-hero wrap">
        <Reveal>
          <div className="eyebrow">{t.community.eyebrow}</div>
          <h1 className="display-tight page-title tight-wrap">{t.community.title}</h1>
        </Reveal>
        <Reveal delay={100}>
          <p className="page-lead pretty-wrap">{t.community.lead}</p>
        </Reveal>
      </section>

      {/* Stories / testimonials rotator */}
      <section className="stories">
        <div className="wrap">
          <Reveal>
            <div className="eyebrow">{t.community.storiesEyebrow}</div>
          </Reveal>

          <div className="stories-layout">
            <div className="stories-main">
              {t.community.stories.map((s, i) => (
                <div key={i} className={`story-slide ${i === activeIdx ? 'active' : ''}`}>
                  <div className="story-quote display pretty-wrap">
                    <span className="quote-mark">“</span>
                    {s.q}
                  </div>
                  <div className="story-who mono">— {s.who}</div>
                </div>
              ))}
            </div>

            <div className="stories-side">
              {t.community.stories.map((s, i) => (
                <button
                  key={i}
                  className={`story-tab ${i === activeIdx ? 'active' : ''}`}
                  onClick={() => setActiveIdx(i)}
                >
                  <span className="story-tab-n mono">0{i + 1}</span>
                  <span className="story-tab-who">{s.who.split(' · ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="stories-submit">
            <div>
              <h3 className="display-tight">{t.community.submitTitle}</h3>
              <p className="pretty-wrap">{t.community.submitBody}</p>
            </div>
            <button className="btn btn-primary">{t.community.submitCta}</button>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="blog wrap">
        <Reveal>
          <div className="eyebrow">{t.community.blogEyebrow}</div>
          <h2 className="display-tight">{t.community.blogTitle}</h2>
        </Reveal>

        <div className="blog-grid">
          {t.community.posts.map((p, i) => (
            <Reveal key={i} delay={i * 50} as="article" className={`post post-${i}`}>
              <Photo
                variant={['pink', 'green', 'butter', 'sky', 'pink', 'green'][i]}
                className="post-photo"
                label={`cover · ${p.kind.toLowerCase()}`}
              />
              <div className="post-meta">
                <Chip variant={p.kind === 'Video' || p.kind === 'วิดีโอ' ? 'sky' : p.kind.includes('fogr') || p.kind === 'Infographic' || p.kind === 'อินโฟกราฟิก' ? 'butter' : ''}>
                  {p.kind}
                </Chip>
                <span className="mono">{p.date}</span>
              </div>
              <h4 className="post-title display-tight tight-wrap">{p.title}</h4>
              <div className="post-read mono">{p.read} →</div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}

// ===== CONTACT =====

function Contact({ t, route, setRoute }) {
  const [form, setForm] = React.useState({ name: '', email: '', role: '', message: '' });
  const [errors, setErrors] = React.useState({});
  const [sent, setSent] = React.useState(false);

  const [vForm, setVForm] = React.useState({ name: '', email: '', phone: '', interest: '', skills: '', availability: '' });
  const [vErrors, setVErrors] = React.useState({});
  const [vSent, setVSent] = React.useState(false);

  React.useEffect(() => {
    const hash = (route.split('#')[1]) || (window.location.hash.split('#')[2]) || '';
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [route]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'required';
    if (!form.email.trim()) e.email = 'required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'invalid email';
    if (!form.message.trim() || form.message.trim().length < 10) e.message = 'a little more, please';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSent(true);
  };

  const validateV = () => {
    const e = {};
    if (!vForm.name.trim()) e.name = 'required';
    if (!vForm.email.trim()) e.email = 'required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vForm.email)) e.email = 'invalid email';
    if (!vForm.interest.trim() || vForm.interest.trim().length < 20) e.interest = 'tell us a bit more';
    if (!vForm.availability) e.availability = 'pick one';
    setVErrors(e);
    return Object.keys(e).length === 0;
  };

  const submitV = (ev) => {
    ev.preventDefault();
    if (!validateV()) return;
    setVSent(true);
  };

  return (
    <div className="page-contact">
      <section className="page-hero wrap">
        <Reveal>
          <div className="eyebrow">{t.contact.eyebrow}</div>
          <h1 className="display-tight page-title tight-wrap">{t.contact.title}</h1>
        </Reveal>
        <Reveal delay={100}>
          <p className="page-lead pretty-wrap">{t.contact.lead}</p>
        </Reveal>
      </section>

      {/* Three paths */}
      <section className="paths wrap">
        <div className="paths-grid">
          {t.contact.paths.map((p, i) => (
            <Reveal key={i} delay={i * 60} className="path-card">
              <Chip variant={['', 'alt', 'butter'][i]}>{p.tag}</Chip>
              <h3 className="display-tight path-title">{p.title}</h3>
              <p className="path-body pretty-wrap">{p.body}</p>
              <a href={p.href} className="link-arrow" onClick={(e) => {
                if (p.href.startsWith('#/')) {
                  e.preventDefault();
                  const [path, hash] = p.href.replace('#', '').split('#');
                  setRoute(path + (hash ? '#' + hash : ''));
                  setTimeout(() => {
                    const el = document.getElementById(hash);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 120);
                }
              }}>
                {p.cta}
                <svg width="14" height="10" viewBox="0 0 14 10"><path d="M1 5h11m0 0L8 1m4 4L8 9" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* General contact form */}
      <section id="contact" className="form-section">
        <div className="wrap form-wrap">
          <Reveal className="form-head">
            <h2 className="display-tight">{t.contact.formTitle}</h2>
          </Reveal>

          {sent ? (
            <Reveal className="form-sent">
              <div className="display-tight" style={{ fontSize: 40 }}>✿</div>
              <p>{t.contact.formFields.sent}</p>
            </Reveal>
          ) : (
            <form className="form" onSubmit={submit} noValidate>
              <div className="field">
                <label>{t.contact.formFields.name}</label>
                <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}/>
                {errors.name && <span className="err">{errors.name}</span>}
              </div>
              <div className="field">
                <label>{t.contact.formFields.email}</label>
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}/>
                {errors.email && <span className="err">{errors.email}</span>}
              </div>
              <div className="field full">
                <label>{t.contact.formFields.role}</label>
                <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                  <option value="">—</option>
                  {t.contact.roleOptions.map((r, i) => <option key={i} value={r}>{r}</option>)}
                </select>
              </div>
              <div className="field full">
                <label>{t.contact.formFields.message}</label>
                <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}/>
                {errors.message && <span className="err">{errors.message}</span>}
              </div>
              <div className="field full form-submit">
                <button type="submit" className="btn btn-primary">{t.contact.formFields.submit}</button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Volunteer form */}
      <section id="volunteer" className="form-section form-section-alt">
        <div className="wrap form-wrap">
          <Reveal className="form-head">
            <h2 className="display-tight">{t.contact.volunteerTitle}</h2>
            <p>{t.contact.volunteerBody}</p>
          </Reveal>

          {vSent ? (
            <Reveal className="form-sent">
              <div className="display-tight" style={{ fontSize: 40 }}>🌱</div>
              <p>{t.contact.volunteerFields.sent}</p>
            </Reveal>
          ) : (
            <form className="form" onSubmit={submitV} noValidate>
              <div className="field">
                <label>{t.contact.volunteerFields.name}</label>
                <input type="text" value={vForm.name} onChange={e => setVForm({ ...vForm, name: e.target.value })}/>
                {vErrors.name && <span className="err">{vErrors.name}</span>}
              </div>
              <div className="field">
                <label>{t.contact.volunteerFields.email}</label>
                <input type="email" value={vForm.email} onChange={e => setVForm({ ...vForm, email: e.target.value })}/>
                {vErrors.email && <span className="err">{vErrors.email}</span>}
              </div>
              <div className="field">
                <label>{t.contact.volunteerFields.phone}</label>
                <input type="tel" value={vForm.phone} onChange={e => setVForm({ ...vForm, phone: e.target.value })}/>
              </div>
              <div className="field">
                <label>{t.contact.volunteerFields.availability}</label>
                <select value={vForm.availability} onChange={e => setVForm({ ...vForm, availability: e.target.value })}>
                  <option value="">—</option>
                  {t.contact.availabilityOptions.map((r, i) => <option key={i} value={r}>{r}</option>)}
                </select>
                {vErrors.availability && <span className="err">{vErrors.availability}</span>}
              </div>
              <div className="field full">
                <label>{t.contact.volunteerFields.interest}</label>
                <textarea value={vForm.interest} onChange={e => setVForm({ ...vForm, interest: e.target.value })}/>
                {vErrors.interest && <span className="err">{vErrors.interest}</span>}
              </div>
              <div className="field full">
                <label>{t.contact.volunteerFields.skills}</label>
                <textarea value={vForm.skills} onChange={e => setVForm({ ...vForm, skills: e.target.value })}/>
              </div>
              <div className="field full form-submit">
                <button type="submit" className="btn btn-primary">{t.contact.volunteerFields.submit}</button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Workshop request anchor */}
      <section id="workshop" className="form-section">
        <div className="wrap form-wrap">
          <Reveal className="form-head">
            <h2 className="display-tight">{t.programs.requestCta}</h2>
            <p>{t.programs.how[0].body}</p>
          </Reveal>
          <div className="workshop-cta">
            <a href="mailto:beyond_bnb@gmail.com" className="btn btn-primary">✉ beyond_bnb@gmail.com</a>
            <span className="mono">or DM us on Instagram @beyond_bnb</span>
          </div>
        </div>
      </section>

      {/* Social links */}
      <section className="socials">
        <div className="wrap">
          <div className="eyebrow">{t.contact.socialEyebrow}</div>
          <div className="socials-grid">
            <a href="https://instagram.com/beyond_bnb" target="_blank" rel="noopener" className="social-card">
              <div className="mono">Instagram</div>
              <div className="display social-handle">@Beyond_BnB</div>
              <div className="link-arrow">Follow →</div>
            </a>
            <a href="https://facebook.com/beyondbirdsandbees" target="_blank" rel="noopener" className="social-card">
              <div className="mono">Facebook</div>
              <div className="display social-handle">Beyond Birds and Bees</div>
              <div className="link-arrow">Follow →</div>
            </a>
            <a href="mailto:beyond_bnb@gmail.com" className="social-card">
              <div className="mono">Email</div>
              <div className="display social-handle">beyond_bnb@gmail.com</div>
              <div className="link-arrow">Write →</div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { Community, Contact });
