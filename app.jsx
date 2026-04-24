// Beyond Birds & Bees — App entry (router + tweaks)

const { useState: useS, useEffect: useE } = React;

function App() {
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "palette": "balanced",
    "lang": "en"
  }/*EDITMODE-END*/;

  const [tweaks, setTweak] = window.useTweaks(TWEAK_DEFAULTS);
  const [lang, setLang] = useS(TWEAK_DEFAULTS.lang);
  const [route, setRoute] = useS(() => {
    const h = window.location.hash.replace(/^#/, '') || '/';
    return h;
  });

  // Sync palette tweak to DOM
  useE(() => {
    document.documentElement.setAttribute('data-palette', tweaks.palette);
  }, [tweaks.palette]);

  useE(() => {
    if (tweaks.lang && tweaks.lang !== lang) setLang(tweaks.lang);
  }, [tweaks.lang]);

  // Router: hash-based
  useE(() => {
    const onHash = () => {
      const h = window.location.hash.replace(/^#/, '') || '/';
      setRoute(h);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navTo = (path) => {
    window.location.hash = path;
    setRoute(path);
  };

  const pathOnly = route.split('#')[0] || '/';
  const t = window.CONTENT[lang];

  const setLangBoth = (l) => {
    setLang(l);
    setTweak('lang', l);
  };

  let Page;
  if (pathOnly === '/' || pathOnly === '') Page = <Home t={t} setRoute={navTo}/>;
  else if (pathOnly.startsWith('/about')) Page = <About t={t} setRoute={navTo}/>;
  else if (pathOnly === '/programs') Page = <Programs t={t} setRoute={navTo}/>;
  else if (pathOnly === '/community') Page = <Community t={t} setRoute={navTo}/>;
  else if (pathOnly === '/contact') Page = <Contact t={t} route={route} setRoute={navTo}/>;
  else Page = <Home t={t} setRoute={navTo}/>;

  return (
    <div lang={lang}>
      <Nav route={pathOnly} setRoute={navTo} lang={lang} setLang={setLangBoth} t={t}/>
      <main key={pathOnly}>{Page}</main>
      <Footer t={t} route={pathOnly} setRoute={navTo}/>

      <window.TweaksPanel title="Tweaks">
        <window.TweakSection title="Palette" subtitle="Pastel pink & green — shift the balance.">
          <window.TweakRadio
            label="Color direction"
            value={tweaks.palette}
            onChange={(v) => setTweak('palette', v)}
            options={[
              { value: 'balanced', label: 'Balanced' },
              { value: 'pink',     label: 'Pink' },
              { value: 'green',    label: 'Green' },
            ]}
          />
        </window.TweakSection>

        <window.TweakSection title="Language">
          <window.TweakRadio
            label="Site language"
            value={tweaks.lang}
            onChange={(v) => { setTweak('lang', v); setLang(v); }}
            options={[
              { value: 'en', label: 'English' },
              { value: 'th', label: 'ภาษาไทย' },
            ]}
          />
        </window.TweakSection>
      </window.TweaksPanel>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
