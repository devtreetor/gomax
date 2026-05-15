// ─── ABOUT PAGE (cinematic dark redesign) ─────────────────────────────────────
import React, { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Check, ArrowRight, Award, Layers, Users } from 'lucide-react';
import { SOLUTION_CATS } from './data.jsx';
import { useScrollObserver, useIsMobile } from './shared.jsx';

// ── WordsPullUp: each word slides up from behind its clip ─────────────────────
function WordsPullUp({ text, baseDelay = 0, style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const words = text.split(' ');
  return (
    <span ref={ref} style={{ display: 'inline', ...style }}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            verticalAlign: 'bottom',
            marginRight: i < words.length - 1 ? '0.25em' : 0,
          }}
        >
          <motion.span
            style={{ display: 'block' }}
            initial={{ y: '110%' }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.75, delay: baseDelay + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// ── AnimatedLetter: scroll-linked opacity per character ───────────────────────
function AnimatedLetter({ char, scrollYProgress, index, total }) {
  const cp = index / total;
  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, cp - 0.1), cp + 0.05],
    [0.18, 1]
  );
  return <motion.span style={{ opacity }}>{char}</motion.span>;
}

function ScrollRevealText({ text, style = {} }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });
  const chars = text.split('');
  return (
    <p ref={ref} style={style}>
      {chars.map((ch, i) => (
        <AnimatedLetter
          key={i}
          char={ch}
          scrollYProgress={scrollYProgress}
          index={i}
          total={chars.length}
        />
      ))}
    </p>
  );
}

// ── Pill CTA button ───────────────────────────────────────────────────────────
function PillCTA({ label, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: hov ? '12px' : '8px',
        background: hov ? '#d44516' : 'var(--orange)',
        color: 'white',
        border: 'none',
        borderRadius: '9999px',
        padding: '10px 14px 10px 20px',
        fontFamily: 'var(--font-body)',
        fontWeight: 600,
        fontSize: '0.875rem',
        cursor: 'pointer',
        transition: 'gap 0.2s ease, background 0.2s ease',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
      <span
        style={{
          background: 'rgba(0,0,0,0.25)',
          borderRadius: '50%',
          width: 32,
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transform: hov ? 'scale(1.1)' : 'scale(1)',
          transition: 'transform 0.2s ease',
        }}
      >
        <ArrowRight size={14} color="white" />
      </span>
    </button>
  );
}

// ── First feature card: hero image ────────────────────────────────────────────
function HeroImageCard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.65, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      style={{
        borderRadius: '1rem',
        overflow: 'hidden',
        position: 'relative',
        minHeight: '340px',
        border: '1px solid rgba(13,27,42,0.08)',
        boxShadow: '0 2px 16px rgba(13,27,42,0.06)',
      }}
    >
      <img
        src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
        alt="Construction work"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.15) 60%)',
        }}
      />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem' }}>
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.5rem',
            color: 'white',
            letterSpacing: '0.04em',
            lineHeight: 1.05,
            marginBottom: '0.4rem',
          }}
        >
          Your construction canvas.
        </p>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          Karnal, Haryana — Est. 2006
        </p>
      </div>
    </motion.div>
  );
}

// ── Feature card ──────────────────────────────────────────────────────────────
function FeatureCard({ icon: Icon, num, title, items, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: 'white',
        borderRadius: '1rem',
        padding: '1.75rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        border: '1px solid rgba(13,27,42,0.08)',
        boxShadow: '0 2px 16px rgba(13,27,42,0.06)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div
          style={{
            background: 'rgba(232,82,26,0.12)',
            borderRadius: '8px',
            width: 44,
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon size={20} color="var(--orange)" strokeWidth={1.5} />
        </div>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            color: 'rgba(13,27,42,0.2)',
            letterSpacing: '0.12em',
          }}
        >
          {num}
        </span>
      </div>

      <div style={{ flex: 1 }}>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.2rem',
            color: 'var(--navy)',
            letterSpacing: '0.04em',
            lineHeight: 1.1,
            marginBottom: '0.875rem',
          }}
        >
          {title}
        </h3>
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {items.map((item, j) => (
            <li key={j} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
              <Check size={12} color="var(--orange)" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: '4px' }} />
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8rem',
                  color: 'rgba(13,27,42,0.5)',
                  lineHeight: 1.55,
                }}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

    </motion.div>
  );
}

// ── Sol icon set ──────────────────────────────────────────────────────────────
const SOL_ICONS = [
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></svg>,
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>,
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/></svg>,
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/></svg>,
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 17l3-12h12l3 12"/><line x1="3" y1="17" x2="21" y2="17"/><line x1="12" y1="5" x2="12" y2="17"/></svg>,
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>,
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>,
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="1"/></svg>,
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
];

// ── ABOUT PAGE ────────────────────────────────────────────────────────────────
function AboutPage({ navigate }) {
  const [refSols, visSols] = useScrollObserver();
  const isMobile = useIsMobile();

  const FEATURES = [
    {
      icon: Award,
      num: '01',
      title: 'EN 12004 CERTIFIED.',
      items: [
        'European standard tile adhesive classification',
        'EN 12004 and IS 15477:2019 compliant',
        'Open time, slip resistance, bond strength tested',
        'C1 normal and C2 improved grades available',
      ],
    },
    {
      icon: Users,
      num: '02',
      title: 'EXPERT TEAM.',
      items: [
        'Deep technical knowledge and field expertise',
        'On-site application support and guidance',
        'Dedicated training for contractors',
      ],
    },
    {
      icon: Layers,
      num: '03',
      title: 'FULL RANGE.',
      items: [
        '8 chemicals covering every tiling application',
        'Adhesives, grouts, epoxy, waterproofing',
        'Ceramic, marble, mosaic and large format',
      ],
    },
  ];

  return (
    <div style={{ background: 'var(--navy)', color: 'white' }}>

      {/* ═══════════════════════ HERO + STORY (merged, one screen) ═══ */}
      <section
        style={{
          height: '100vh',
          background: 'linear-gradient(175deg, #162638 0%, #0D1B2A 55%, #091522 100%)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          padding: '1rem',
          paddingTop: 'calc(72px + 0.75rem)',
        }}
      >
        {/* 2006 watermark */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(12rem, 36vw, 44rem)',
            color: 'rgba(255,255,255,0.022)',
            lineHeight: 1,
            pointerEvents: 'none',
            letterSpacing: '0.08em',
            userSelect: 'none',
          }}
        >
          2006
        </div>

        {/* Orange glow */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '20%',
            left: '30%',
            width: '50%',
            height: '60%',
            background: 'radial-gradient(ellipse, rgba(232,82,26,0.07) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* ── Full-height panel ── */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            flex: 1,
            borderRadius: '1.5rem',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            maxWidth: '1400px',
            margin: '0 auto',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* ── Header row ── */}
          <div
            style={{
              padding: 'clamp(1.2rem,2vw,1.8rem) clamp(1.25rem,4vw,3.5rem)',
              display: 'flex',
              alignItems: isMobile ? 'flex-start' : 'center',
              justifyContent: 'space-between',
              flexDirection: isMobile ? 'column' : 'row',
              gap: isMobile ? '1rem' : '2rem',
              flexShrink: 0,
            }}
          >
            <div>
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  color: 'var(--orange)',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '0.4rem',
                }}
              >
                Since 2006 — Karnal, Haryana
              </motion.span>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.6rem, 2.5vw, 2.6rem)',
                  color: 'white',
                  letterSpacing: '0.02em',
                  lineHeight: 1,
                  margin: 0,
                }}
              >
                <WordsPullUp text="GOMAX INDUSTRIES" baseDelay={0.3} />
              </h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: isMobile ? 'none' : 'flex', alignItems: 'center', gap: '1.5rem' }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.78rem',
                  color: 'rgba(255,255,255,0.45)',
                  lineHeight: 1.6,
                  maxWidth: '200px',
                  textAlign: 'right',
                  margin: 0,
                }}
              >
                Manufacturers, exporters and suppliers of advanced construction chemicals.
              </p>
              <PillCTA label="Get in touch" onClick={() => navigate('contact')} />
            </motion.div>
          </div>

          {/* ── Divider ── */}
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', marginInline: 'clamp(2rem,4vw,3.5rem)', flexShrink: 0 }} />

          {/* ── Main body: left content + right image ── */}
          <div
            style={{
              flex: 1,
              display: isMobile ? 'flex' : 'grid',
              flexDirection: 'column',
              gridTemplateColumns: isMobile ? '1fr' : '1fr clamp(260px,32vw,420px)',
              minHeight: 0,
              overflow: 'hidden',
            }}
          >
            {/* Left: headline + text */}
            <div
              style={{
                padding: 'clamp(2rem,3.5vw,3rem) clamp(2rem,4vw,3.5rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '1.75rem',
              }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  color: 'rgba(232,82,26,0.7)',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                }}
              >
                Construction Chemicals
              </motion.span>

              {/* Big pull-up heading */}
              <div style={{ fontSize: 'clamp(1.9rem, 3.8vw, 4rem)', lineHeight: 1.0 }}>
                <span style={{ fontFamily: 'var(--font-display)', color: 'white', letterSpacing: '0.02em' }}>
                  <WordsPullUp text="FOUNDED IN 2006," baseDelay={0.75} />
                </span>
                {' '}
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: 'rgba(255,255,255,0.45)',
                    letterSpacing: '0.02em'
                  }}
                >
                  <WordsPullUp text="a precision" baseDelay={0.85} />
                </span>
                <br />
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: 'rgba(255,255,255,0.45)',
                    letterSpacing: '0.02em'
                  }}
                >
                  <WordsPullUp text="manufacturer." baseDelay={1.0} />
                </span>
                {' '}
                <span style={{ fontFamily: 'var(--font-display)', color: 'white', letterSpacing: '0.02em' }}>
                  <WordsPullUp text="BRINGING" baseDelay={1.1} />
                </span>
                <br />
                <span style={{ fontFamily: 'var(--font-display)', color: 'white', letterSpacing: '0.02em' }}>
                  <WordsPullUp text="GERMAN-STANDARD CHEMICALS TO INDIA." baseDelay={1.2} />
                </span>
              </div>

              {/* Scroll-reveal paragraph */}
              <div style={{ maxWidth: '560px' }}>
                <ScrollRevealText
                  text="Over the last eighteen years, GoMax Industries has worked tirelessly from Karnal, Haryana — crafting construction chemicals that meet both European EN 12004 and Indian IS 15477:2019 standards. Together with architects, contractors and homeowners across India, we have built a reputation for structures of outstanding strength, durability and resilience."
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(0.78rem,1.2vw,0.9rem)',
                    color: 'rgba(255,255,255,0.75)',
                    lineHeight: 1.8,
                    margin: 0,
                  }}
                />
              </div>
            </div>

            {/* Right: image card with fact overlay */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{
                margin: '1.25rem 1.25rem 1.25rem 0',
                borderRadius: '1rem',
                overflow: 'hidden',
                position: 'relative',
                display: isMobile ? 'none' : 'block',
              }}
            >
              <img
                src="/about-img.png"
                alt="GoMax manufacturing facility"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {/* gradient overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(9,23,36,0.92) 0%, rgba(9,23,36,0.3) 45%, transparent 70%)',
                }}
              />

              {/* Top badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '1.25rem',
                  left: '1.25rem',
                  background: 'rgba(232,82,26,0.9)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '6px',
                  padding: '0.35rem 0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.58rem',
                    color: 'white',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}
                >
                  Est. 2006 — Karnal, Haryana
                </span>
              </div>

              {/* Bottom facts */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0',
                }}
              >
                {[
                  ['Manufacturer', 'Of construction chemicals'],
                  ['Exporter', 'Across India and beyond'],
                  ['Certified', 'EN 12004 · IS 15477:2019'],
                ].map(([t, d], idx) => (
                  <div
                    key={t}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.65rem 0',
                      borderTop: idx > 0 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.95rem',
                        color: 'white',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {t}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.58rem',
                        color: 'rgba(255,255,255,0.38)',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {d}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            left: '3rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            zIndex: 3,
          }}
        >
          <div className="hero-scroll-line" />
          <span className="hero-scroll-label">SCROLL</span>
        </div>
      </section>

      {/* ════════════════════════════════════════ FEATURES ═══ */}
      <section
        style={{
          background: 'var(--bg)',
          padding: 'clamp(4rem,8vw,7rem) 1.5rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle orange radial glow */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            height: '60%',
            background: 'radial-gradient(ellipse, rgba(232,82,26,0.05) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Section header */}
          <div style={{ marginBottom: '3rem' }}>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.6rem,3.5vw,3.2rem)',
                color: 'var(--navy)',
                letterSpacing: '0.02em',
                lineHeight: 1.05,
                marginBottom: '0.5rem',
              }}
            >
              <WordsPullUp text="PRECISION-ENGINEERED FOR EVERY SURFACE." />
            </div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: 'rgba(13,27,42,0.45)',
                marginTop: '0.75rem',
              }}
            >
              Built for professionals. Tested for performance.
            </p>
          </div>

          {/* 4-col cards grid */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4,1fr)', gap: '0.75rem' }}>
            <HeroImageCard />
            {FEATURES.map((f, i) => (
              <FeatureCard key={f.num} {...f} delay={0.12 + i * 0.12} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════ SOLUTIONS GRID ═══ */}
      <section
        ref={refSols}
        style={{
          background: 'var(--bg)',
          padding: 'clamp(4rem,7vw,6rem) 1.5rem',
          borderTop: '1px solid rgba(13,27,42,0.1)',
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'var(--orange)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '0.75rem',
                display: 'block',
              }}
            >
              Full Capability
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.8rem,4vw,3.5rem)',
                color: 'var(--navy)',
                letterSpacing: '0.03em',
                lineHeight: 1,
              }}
            >
              12 SOLUTION CATEGORIES
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)',
              gap: '1px',
              background: 'rgba(13,27,42,0.1)',
            }}
          >
            {SOLUTION_CATS.map((c, i) => (
              <div
                key={c.id}
                className={`fade-up${visSols ? ' vis' : ''}`}
                style={{
                  transitionDelay: `${i * 0.04}s`,
                  background: 'var(--bg)',
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.875rem',
                }}
              >
                <span style={{ color: 'var(--orange)', flexShrink: 0 }}>
                  {SOL_ICONS[i]}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    fontSize: '0.8rem',
                    color: 'var(--navy)',
                  }}
                >
                  {c.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

export { AboutPage };
