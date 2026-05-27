/* global React, ReactDOM */
const { useState, useEffect, useRef } = React;

/* ---------------- Palettes ---------------- */
const PALETTES = {
  classic: {
    name: "Classic Boom",
    orange: "#F26A1F",
    yellow: "#F9C429",
    brown: "#2A150A",
    cream: "#F6EDDD",
    paper: "#FFFAF1",
    red:    "#C8311B",
    ink:    "#1A0E07",
  },
  dusk: {
    name: "Dust Dusk",
    orange: "#E25822",
    yellow: "#EAB14A",
    brown: "#1E1410",
    cream: "#EFE6D6",
    paper: "#F9F2E4",
    red:    "#A0301A",
    ink:    "#120A05",
  },
  blueprint: {
    name: "Blueprint",
    orange: "#FF8E2E",
    yellow: "#FFD23F",
    brown: "#0B1E33",
    cream: "#E6EEF7",
    paper: "#F4F8FC",
    red:    "#D94A2A",
    ink:    "#08111E",
  },
};

const cls = (...a) => a.filter(Boolean).join(" ");

/* ---------------- Logo + marks ---------------- */
function BurstMark({ size = 56 }){
  return (
    <img src="assets/big-burst-logo.png" alt="Big Burst" width={size} height={size} style={{display:"block"}} />
  );
}

function Sticker({ children, rotate = -3, color, bg, className }){
  return (
    <span
      className={cls("sticker", className)}
      style={{
        transform: `rotate(${rotate}deg)`,
        background: bg || "var(--yellow)",
        color: color || "var(--ink)",
      }}
    >{children}</span>
  );
}

const Bolt = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" fill={color} stroke="var(--ink)" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);
const Plunger = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="6" y="10" width="12" height="10" rx="1.5" fill="var(--orange)" stroke="var(--ink)" strokeWidth="1.5"/>
    <rect x="9" y="3" width="6" height="7" rx="1" fill="var(--red)" stroke="var(--ink)" strokeWidth="1.5"/>
    <path d="M3 13h3M18 13h3M3 17h3M18 17h3" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

/* ---------------- NAV ---------------- */
function Nav({ onBook }){
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20);
    f(); window.addEventListener("scroll", f, {passive:true});
    return () => window.removeEventListener("scroll", f);
  }, []);
  const close = () => setMenuOpen(false);
  return (
    <>
      <nav className={cls("nav", scrolled && "nav--scrolled")}>
        <a href="#top" className="nav__brand" onClick={close}>
          <BurstMark size={44} />
          <span className="nav__wordmark">Big&nbsp;Burst</span>
        </a>
        <div className="nav__links">
          <a href="#what" onClick={close}>What we do</a>
          <a href="#properties" onClick={close}>Properties</a>
          <a href="#shop" onClick={close}>Shop</a>
          <a href="#merch" onClick={close}>Merch</a>
          <a href="#about" onClick={close}>About</a>
          <a href="#faq" onClick={close}>Q&amp;A</a>
        </div>
        <div className="nav__right">
          <button className="btn btn--primary nav__cta" onClick={onBook}>
            <Plunger size={16} />
            <span>Schedule a demolition</span>
          </button>
          <button
            className={cls("nav__burger", menuOpen && "nav__burger--open")}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(m => !m)}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>
      {menuOpen && (
        <div className="nav__mobile-menu">
          <a href="#what" onClick={close}>What we do</a>
          <a href="#properties" onClick={close}>Properties</a>
          <a href="#shop" onClick={close}>Shop</a>
          <a href="#merch" onClick={close}>Merch</a>
          <a href="#about" onClick={close}>About</a>
          <a href="#faq" onClick={close}>Q&amp;A</a>
          <button className="btn btn--primary btn--xl" style={{width:"100%",justifyContent:"center"}}
            onClick={() => { close(); onBook(); }}>
            <Plunger size={18}/> Schedule a demolition
          </button>
        </div>
      )}
    </>
  );
}

/* ---------------- HERO ---------------- */
function Hero({ voice, onBook, shakeEnabled }){
  const [shake, setShake] = useState(false);
  const fire = () => {
    if (!shakeEnabled) { onBook(); return; }
    setShake(true);
    setTimeout(() => { setShake(false); onBook(); }, 650);
  };
  const headline = <>Demolition is our <em>mission</em>.</>;
  const sub = voice === "serious"
    ? "Big Burst plans, executes, and clears controlled demolition on any property — residential, commercial, or industrial — in under five weeks. We also sell commercial-grade explosives, priced below the rest of the market."
    : "Professional explosions. Any property. Done in under five weeks — and cheaper than whatever you've been quoted. Hover anything below for our number.";

  return (
    <header id="top" className={cls("hero", shake && "shake")}>
      <div className="hero__grid">
        <div className="hero__col hero__col--copy">
          <div className="hero__eyebrow">
            <span className="dot dot--live" /> Booking demolitions · free walkthroughs
          </div>
          <h1 className="hero__title">{headline}</h1>
          <p className="hero__sub">{sub}</p>
          <div className="hero__ctas">
            <button className="btn btn--primary btn--xl" onClick={fire}>
              <Plunger size={22} />
              <span>Schedule a demolition</span>
            </button>
            <a className="btn btn--ghost btn--xl" href="#what">What we do →</a>
          </div>
          <div className="hero__chips">
            <span className="chip">Under 5 weeks, start to clear</span>
            <span className="chip">All property types</span>
            <span className="chip chip--hot">Cheaper than the next quote</span>
            <span className="chip">Dynamite &amp; explosives</span>
          </div>
        </div>

        <div className="hero__col hero__col--art" aria-hidden="true">
          <div className="hero__sun" />
          <div className="hero__rays">
            {Array.from({length: 18}).map((_, i) => (
              <span key={i} style={{ transform: `rotate(${i * 20}deg)` }} />
            ))}
          </div>
          <img className="hero__logo" src="assets/big-burst-logo.png" alt="" />
          <Sticker rotate={-9} className="hero__stickerA">CHEAPER</Sticker>
          <Sticker rotate={8} bg="var(--ink)" color="var(--cream)" className="hero__stickerB">DYNAMITE&nbsp;FOR&nbsp;SALE</Sticker>
        </div>
      </div>
    </header>
  );
}

/* ---------------- VALUE STRIP ---------------- */
function ValueStrip(){
  const items = [
    "PROFESSIONAL EXPLOSIONS",
    "ANY PROPERTY",
    "CHEAPER THAN THE REST",
    "DONE IN UNDER 5 WEEKS",
    "DYNAMITE FOR SALE",
    "SITE LEFT CLEAR",
  ];
  return (
    <div className="value-strip" aria-hidden="true">
      <div className="value-strip__track">
        {Array.from({length: 3}).flatMap((_, k) =>
          items.map((t, i) => (
            <span className="value-strip__item" key={`${k}-${i}`}>
              <Bolt size={18} color="var(--yellow)"/> {t}
            </span>
          ))
        )}
      </div>
    </div>
  );
}

/* ---------------- WHAT WE DO ---------------- */
function WhatWeDo(){
  const items = [
    {
      n: "01",
      t: "Plan it",
      d: "A walkthrough, a written drop plan, and a fixed quote before anything is signed.",
      accent: "var(--orange)",
    },
    {
      n: "02",
      t: "Prep it",
      d: "Utilities cut, openings cleared, neighbors notified, monitors and barriers placed.",
      accent: "var(--yellow)",
    },
    {
      n: "03",
      t: "Burst it",
      d: "Engineered charges placed and verified. The structure collapses inward in seconds.",
      accent: "var(--red)",
    },
    {
      n: "04",
      t: "Clear it",
      d: "Debris is sorted on site. Steel and concrete go to recyclers; the lot is left graded.",
      accent: "var(--ink)",
    },
  ];
  return (
    <section id="what" className="section">
      <div className="sec-head">
        <div className="sec-head__kicker"><Bolt size={14} color="var(--orange)" />What we do</div>
        <h2 className="sec-head__title">Four steps. <em>One</em> result.</h2>
        <p className="sec-head__intro">Controlled demolition is a regulated, well-established method of bringing a structure down on purpose, with a plan. Here is the plan.</p>
      </div>
      <div className="steps-grid">
        {items.map((s, i) => (
          <article key={i} className="step-card" style={{"--accent": s.accent}}>
            <div className="step-card__n">{s.n}</div>
            <h3 className="step-card__t">{s.t}</h3>
            <p className="step-card__d">{s.d}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------------- TAGLINE BANNER ---------------- */
function Tagline(){
  return (
    <section className="tagline" aria-label="Big Burst tagline">
      <div className="tagline__inner">
        <div className="tagline__line">
          <span>WHERE YOU NEED ROOM,</span>
          <span className="tagline__boom">WE GO BOOM.</span>
        </div>
      </div>
    </section>
  );
}

/* ---------------- HOODIE BANNER (MERCH) ---------------- */
function HoodieBanner(){
  return (
    <section id="merch" className="hoodie-banner">
      <div className="hoodie-banner__frame">
        <img
          src="assets/hoodie-promo.png"
          alt="Big Burst hoodies — For sale 10% off until May 30th"
          className="hoodie-banner__img"
        />
      </div>
    </section>
  );
}

/* ---------------- SHOP (EXPLOSIVES) ---------------- */
const PRODUCTS = [
  {
    t: "Commercial dynamite",
    u: "per stick",
    d: "Standard nitroglycerin-based dynamite cartridges. Used for general demolition and rock work.",
    badge: "DYNAMITE",
    accent: "var(--red)",
    price: "$1.80", market: "$3.00",
  },
  {
    t: "Emulsion explosives",
    u: "per pound",
    d: "Water-resistant cartridged emulsion for wet boreholes and controlled blasting.",
    badge: "EMULSION",
    accent: "var(--orange)",
    price: "$1.20", market: "$2.00",
  },
  {
    t: "ANFO",
    u: "per pound, bulk",
    d: "Ammonium nitrate / fuel oil mix. The workhorse of large-scale civil and quarry blasting.",
    badge: "ANFO",
    accent: "var(--yellow)",
    price: "$0.60", market: "$1.00",
  },
  {
    t: "Detonating cord",
    u: "per foot",
    d: "Flexible PETN-cored cord for linking and initiating charges across a shot.",
    badge: "DET CORD",
    accent: "var(--orange)",
    price: "$0.36", market: "$0.60",
  },
  {
    t: "Blasting caps",
    u: "per detonator",
    d: "Electric detonators and shock-tube (Nonel) caps with a range of delay periods.",
    badge: "DETONATORS",
    accent: "var(--red)",
    price: "$3.00", market: "$5.00",
  },
  {
    t: "Cast boosters",
    u: "per booster",
    d: "Cast pentolite boosters for reliable initiation of ANFO and emulsion main charges.",
    badge: "BOOSTERS",
    accent: "var(--ink)",
    price: "$3.60", market: "$6.00",
  },
];
function Shop(){
  return (
    <section id="shop" className="section">
      <div className="sec-head">
        <div className="sec-head__kicker"><Bolt size={14} color="var(--orange)" />Shop</div>
        <h2 className="sec-head__title">We also sell <em>the explosives</em>.</h2>
        <p className="sec-head__intro">
          Commercial-grade dynamite, detonators, cord, and accessories. Same product, name
          brands, fresh stock — just priced lower than the rest of the market.
          Hover any product for our price.
        </p>
      </div>
      <div className="shop-grid">
        {PRODUCTS.map((p, i) => (
          <article key={i} className="prod" style={{"--accent": p.accent}} tabIndex={0}>
            <div className="prod__badge">{p.badge}</div>
            <h3 className="prod__t">{p.t}</h3>
            <div className="prod__u">{p.u}</div>
            <p className="prod__d">{p.d}</p>
            <div className="prod__foot">
              <span>Hover for price</span><strong className="prod__hint">→</strong>
            </div>
            <div className="prod__price">
              <div className="prod__price__row">
                <span className="prod__price__from">our price</span>
                <span className="prod__price__n">{p.price}</span>
                <span className="prod__price__u">{p.u}</span>
              </div>
              <div className="prod__price__mkt">
                <s>elsewhere: {p.market}</s>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------------- PROPERTIES WE HANDLE ---------------- */
const PROPERTIES = [
  { t: "Houses",        d: "Single-family, duplex, garage, ADU.",        price: "$2,400",  unit: "per structure", market: "$4,000" },
  { t: "Apartments",    d: "Low-rise residential, vacant blocks.",       price: "$15,000", unit: "per building",  market: "$25,000" },
  { t: "Offices & retail", d: "Strip malls, office boxes, mid-rise.",   price: "$12,000", unit: "per structure", market: "$20,000" },
  { t: "Warehouses",    d: "Steel-frame and tilt-up concrete.",          price: "$21,000", unit: "per building",  market: "$35,000" },
  { t: "Industrial",    d: "Silos, stacks, cooling towers, kilns.",      price: "$36,000", unit: "per structure", market: "$60,000" },
  { t: "Specialty",     d: "Chimneys, billboards, bridges, weird.",      price: "$9,000",  unit: "per job",       market: "$15,000" },
];
function Properties(){
  return (
    <section id="properties" className="section section--alt">
      <div className="sec-head">
        <div className="sec-head__kicker"><Bolt size={14} color="var(--orange)" />Properties we handle</div>
        <h2 className="sec-head__title"><em>Any</em> structure on any lot.</h2>
        <p className="sec-head__intro">If it's a built thing the owner wants gone, we will quote it. Hover any card for our starting price — cheaper than whatever the next crew quoted you.</p>
      </div>
      <div className="prop-grid">
        {PROPERTIES.map((p, i) => (
          <div key={i} className="prop" tabIndex={0}>
            <div className="prop__t">{p.t}</div>
            <div className="prop__d">{p.d}</div>
            <div className="prop__price">
              <div className="prop__price__row">
                <span className="prop__price__from">from</span>
                <span className="prop__price__n">{p.price}</span>
                <span className="prop__price__u">{p.unit}</span>
              </div>
              <div className="prop__price__mkt">
                <s>elsewhere: {p.market}</s>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- WEEK TIMELINE ---------------- */
const DAYS = [
  { d: "Week 1",   t: "Walkthrough & plan", x: "On-site measure, photo survey, and a written drop plan in your inbox by end of week." },
  { d: "Week 2",   t: "Engineering",        x: "3D drop modeling, vibration math, exclusion zones. Plan reviewed, fall pattern locked." },
  { d: "Week 3",   t: "Prep",               x: "Soft-strip, isolate utilities, set vibration monitors, brief the block." },
  { d: "Week 4",   t: "Placement & burst",  x: "Charges placed and verified. Countdown, all-clear, plunger. The structure is down in seconds." },
  { d: "Week 5",   t: "Clear & grade",      x: "Debris sorted and hauled. Lot graded. You get keys back to a clean pad." },
];
function Timeline(){
  return (
    <section className="section">
      <div className="sec-head">
        <div className="sec-head__kicker"><Bolt size={14} color="var(--orange)" />Your timeline</div>
        <h2 className="sec-head__title">Five weeks, <em>start to clear</em>.</h2>
        <p className="sec-head__intro">Most jobs fit in under five weeks. Complex industrial sites take longer; we tell you straight at the walkthrough.</p>
      </div>
      <ol className="timeline">
        {DAYS.map((d, i) => (
          <li key={i} className="tl">
            <div className="tl__dot" />
            <div className="tl__head">
              <span className="tl__day">{d.d}</span>
              <span className="tl__t">{d.t}</span>
            </div>
            <div className="tl__x">{d.x}</div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ---------------- ABOUT ---------------- */
function About({ onBook }){
  const facts = [
    { k: "What we do",     v: "Professional explosions", note: "Controlled demolition: planned, executed, and cleared." },
    { k: "Properties",     v: "All of them",             note: "Residential, commercial, industrial — any kind." },
    { k: "Turnaround",     v: "< 5 weeks",               note: "Most jobs go from walkthrough to cleared pad in under five weeks." },
    { k: "Our price",      v: "Lower than market",       note: "Show us the cheapest quote you can find. Ours will be lower." },
    { k: "After the burst",v: "Cleared & graded",        note: "We sort debris, send steel and concrete to recyclers, leave a clean lot." },
    { k: "Also for sale",  v: "Explosives",              note: "Dynamite, detonators, det cord, ANFO, boosters — priced below market." },
  ];
  return (
    <section id="about" className="section">
      <div className="sec-head">
        <div className="sec-head__kicker"><Bolt size={14} color="var(--orange)" />About us</div>
        <h2 className="sec-head__title">A demolition company that <em>shows up</em>.</h2>
        <p className="sec-head__intro">
          Big Burst plans and executes controlled demolitions on any property, finishes
          in a week or less, and leaves the lot graded. The walkthrough is free, the
          quote is written, and the team is small enough that the person on the phone
          is the person on site.
        </p>
      </div>
      <div className="facts">
        {facts.map((f, i) => (
          <div key={i} className="fact">
            <div className="fact__k">{f.k}</div>
            <div className="fact__v">{f.v}</div>
            <div className="fact__note">{f.note}</div>
          </div>
        ))}
      </div>
      <div className="about-cta">
        <button className="btn btn--primary btn--xl" onClick={onBook}>
          <Plunger size={22}/> Schedule a demolition
        </button>
      </div>
    </section>
  );
}

/* ---------------- BOOKING (single contact form) ---------------- */
function Booking({ open, onClose, voice }){
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState({
    name: "", email: "", phone: "", site: "", structure: "", notes: "",
  });

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setSubmitted(false);
      setData({ name: "", email: "", phone: "", site: "", structure: "", notes: "" });
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  if (!open) return null;

  const onSubmit = (e) => {
    e.preventDefault();
    const body =
      `Dear Big Burst Team,\n\nI am writing to schedule a demolition for my property. Below are my details:\n\nYour name: ${data.name}\n\nEmail: ${data.email}\n\nPhone (optional): ${data.phone || "—"}\n\nSite address: ${data.site}\n\nWhat needs to come down?: ${data.structure}\n\nAnything else we should know? (optional): ${data.notes || "—"}\n\n\nI look forward to hearing from you soon.\n\nBest regards`;
    const mailto = `mailto:mr.petrit.luci@gmail.com?subject=${encodeURIComponent("New Demolition Schedule Request")}&body=${encodeURIComponent(body)}`;
    window.open(mailto, "_blank");
    setSubmitted(true);
  };

  return (
    <div className="modal" role="dialog" aria-modal="true">
      <div className="modal__scrim" onClick={onClose} />
      <div className="modal__panel">
        <div className="modal__head">
          <div className="modal__head__left">
            <BurstMark size={36} />
            <div>
              <div className="modal__kicker">Schedule a demolition</div>
              <div className="modal__sub">
                {voice === "serious"
                  ? "We'll respond within one business day."
                  : "We're new — so we'll respond fast."}
              </div>
            </div>
          </div>
          <button className="modal__close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        {!submitted ? (
          <form className="modal__body" onSubmit={onSubmit}>
            <div className="form-grid">
              <label className="form-label">Your name</label>
              <input required type="text" className="form-input" value={data.name}
                onChange={e => setData({...data, name: e.target.value})} placeholder="Jane Property-Owner"/>

              <label className="form-label">Email</label>
              <input required type="email" className="form-input" value={data.email}
                onChange={e => setData({...data, email: e.target.value})} placeholder="jane@example.com"/>

              <label className="form-label">Phone (optional)</label>
              <input type="tel" className="form-input" value={data.phone}
                onChange={e => setData({...data, phone: e.target.value})} placeholder="(555) 555-0199"/>

              <label className="form-label">Site address</label>
              <input required type="text" className="form-input" value={data.site}
                onChange={e => setData({...data, site: e.target.value})} placeholder="Street address or parcel number"/>

              <label className="form-label">What needs to come down?</label>
              <input required type="text" className="form-input" value={data.structure}
                onChange={e => setData({...data, structure: e.target.value})} placeholder="House, silo, warehouse, chimney…"/>

              <label className="form-label">Anything else we should know? (optional)</label>
              <textarea className="form-input form-input--ta" value={data.notes}
                onChange={e => setData({...data, notes: e.target.value})}
                placeholder="Access constraints, nearby structures, ideal timing…"/>
            </div>
            <div className="modal__foot">
              <button type="button" className="btn btn--ghost" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn--primary">
                <Plunger size={18}/> Send request
              </button>
            </div>
          </form>
        ) : (
          <div className="modal__body">
            <div className="thanks">
              <div className="thanks__big">🧨</div>
              <h3>Thanks, {data.name || "friend"}.</h3>
              <p>
                We got your request{data.site ? <> for <strong>{data.site}</strong></> : null}.
                Since you're potentially our first-ever project, expect a fast reply.
              </p>
              <button className="btn btn--primary" onClick={onClose}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- FAQ ---------------- */
const FAQS = [
  {
    q: "What does 'professional explosions' mean?",
    a: "Controlled demolition: explosives are placed at engineered points on a structure so it collapses inward in a planned sequence, instead of being torn down piece by piece. It is a well-established method used worldwide."
  },
  {
    q: "What properties do you work on?",
    a: "All of them. Residential, commercial, and industrial. If it's a structure on a property and the owner wants it gone, we will quote it."
  },
  {
    q: "How long does a job take?",
    a: "Under five weeks from scheduling to a cleared site. Most of that time is planning and prep. The actual collapse takes seconds."
  },
  {
    q: "How are your prices so low?",
    a: "Lean overhead, no fancy office, owner on site. We make money on volume, not on margin. Whatever the cheapest competitor will charge you, we will undercut it."
  },
  {
    q: "Is the quality the same as more expensive crews?",
    a: "Same charges, same engineering math, same monitoring equipment. The structure comes down the same way regardless of what you paid. The difference is what you spent to get there."
  },
  {
    q: "Is controlled demolition loud?",
    a: "Yes. A typical building implosion produces a peak sound level in the range of about 100–130 decibels close to the site, similar to a loud concert or a jet at takeoff, lasting only a few seconds."
  },
  {
    q: "What happens to the rubble?",
    a: "Demolition debris is sorted on site. Steel and metals are sent to scrap recyclers; concrete and masonry are commonly crushed for reuse as aggregate or road base."
  },
  {
    q: "How do I get started?",
    a: "Click 'Schedule a demolition,' fill out the form, and we'll come back with a walkthrough time and a written price — cheaper than whatever the next crew quoted you."
  },
];

function FAQ(){
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="section section--alt">
      <div className="sec-head">
        <div className="sec-head__kicker"><Bolt size={14} color="var(--orange)" />Q&amp;A</div>
        <h2 className="sec-head__title">Reasonable <em>questions</em>.</h2>
        <p className="sec-head__intro">Honest answers about the company and the work.</p>
      </div>
      <div className="faq">
        {FAQS.map((f, i) => (
          <div key={i} className={cls("faq__item", open === i && "faq__item--open")}>
            <button className="faq__q" onClick={() => setOpen(open === i ? -1 : i)}>
              <span>{f.q}</span>
              <span className="faq__chev">{open === i ? "−" : "+"}</span>
            </button>
            <div className="faq__a">{f.a}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- BIG CTA ---------------- */
function BigCTA({ onBook }){
  return (
    <section className="big-cta">
      <div className="big-cta__inner">
        <h2>Got a structure that's overstayed its welcome?</h2>
        <p>Cleared lot in under five weeks. Priced cheaper than the next crew.</p>
        <div className="big-cta__row">
          <button className="btn btn--primary btn--xl" onClick={onBook}>
            <Plunger size={22}/> Schedule a demolition
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer(){
  return (
    <footer className="foot">
      <div className="foot__top">
        <div className="foot__brand">
          <BurstMark size={64} />
          <div>
            <div className="foot__wordmark">Big Burst</div>
            <div className="foot__tag">Where you need room, we go boom.</div>
          </div>
        </div>
        <div className="foot__cols">
          <div>
            <h4>The site</h4>
            <a href="#what">What we do</a>
            <a href="#properties">Properties</a>
            <a href="#shop">Shop</a>
            <a href="#about">About</a>
            <a href="#faq">Q&amp;A</a>
          </div>
          <div>
            <h4>Why us</h4>
            <span>Cheaper than the rest</span>
            <span>Under five weeks</span>
            <span>Any property, any size</span>
          </div>
        </div>
      </div>
      <div className="foot__bottom">
        <span>© 2026 Big Burst · Page current as of 5/20/2026</span>
        <span className="foot__bottom__bolt"><Bolt size={14} color="var(--yellow)"/> Boom for less</span>
      </div>
    </footer>
  );
}

/* ---------------- ROOT ---------------- */
function App(){
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    const p = PALETTES.blueprint;
    const r = document.documentElement.style;
    r.setProperty("--orange", p.orange);
    r.setProperty("--yellow", p.yellow);
    r.setProperty("--brown",  p.brown);
    r.setProperty("--cream",  p.cream);
    r.setProperty("--paper",  p.paper);
    r.setProperty("--red",    p.red);
    r.setProperty("--ink",    p.ink);
  }, []);

  return (
    <>
      <Nav onBook={() => setBooking(true)} />
      <Hero voice="serious" shakeEnabled={false} onBook={() => setBooking(true)} />
      <ValueStrip />
      <WhatWeDo />
      <Properties />
      <Tagline />
      <HoodieBanner />
      <Shop />
      <Timeline />
      <About onBook={() => setBooking(true)} />
      <BigCTA onBook={() => setBooking(true)} />
      <FAQ />
      <Footer />
      <Booking open={booking} onClose={() => setBooking(false)} voice="serious" />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
