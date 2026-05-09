// ─── SHARED HOOKS & COMPONENTS ───────────────────────────────────────────────
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';
import { PRODUCTS } from './data.jsx';
import './footer.css';

// ── HOOKS ─────────────────────────────────────────────────────────────────────
function useScrollObserver(threshold = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

function useCountUp(target, duration = 1800, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target]);
  return val;
}

// ── CURSOR — spring physics with rotation ──────────────────────────────────────
function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const isMobile = window.matchMedia('(hover:none)').matches;

  useEffect(() => {
    if (isMobile) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let target = { x: -200, y: -200 };
    let current = { x: -200, y: -200 };
    let velocity = { x: 0, y: 0 };
    const SPRING = 0.12;
    const DAMPING = 0.8;
    let isHovered = false;
    let rafId;

    const onMove = (e) => { target.x = e.clientX; target.y = e.clientY; };
    const onOver = (e) => {
      if (e.target.closest('a,button,.product-card,.filter-tab,.solution-card,.serve-card')) isHovered = true;
    };
    const onOut = () => { isHovered = false; };

    const tick = () => {
      velocity.x = (target.x - current.x) * SPRING + velocity.x * DAMPING;
      velocity.y = (target.y - current.y) * SPRING + velocity.y * DAMPING;
      current.x += velocity.x;
      current.y += velocity.y;

      const speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);

      dot.style.left = target.x + 'px';
      dot.style.top = target.y + 'px';
      dot.style.opacity = isHovered ? '0' : '1';

      const ringSize = isHovered ? 56 : 36;
      ring.style.left = current.x + 'px';
      ring.style.top = current.y + 'px';
      ring.style.width = ringSize + 'px';
      ring.style.height = ringSize + 'px';
      ring.style.opacity = isHovered ? '0.4' : '0.6';

      if (speed > 8 && !isHovered) {
        const rot = Math.atan2(velocity.y, velocity.x) * 180 / Math.PI;
        ring.style.transform = `translate(-50%,-50%) rotate(${rot}deg) scaleX(1.3) scaleY(0.8)`;
      } else {
        ring.style.transform = 'translate(-50%,-50%)';
      }

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      <div ref={dotRef} className="cursor" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}

// ── SCROLL BAR ────────────────────────────────────────────────────────────────
function ScrollBar() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const fn = () => { const d = document.documentElement; setPct(d.scrollTop / (d.scrollHeight - d.clientHeight) * 100); };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return <div className="scroll-bar" style={{ width: pct + '%' }} />;
}

// ── SECTION HEAD — letter-spacing materialise ──────────────────────────────────
function SectionHead({ overline, title, light = false, center = false }) {
  const [ref, vis] = useScrollObserver();
  return (
    <div ref={ref} style={{ textAlign: center ? 'center' : 'left' }}>
      {overline && <span className="overline">{overline}</span>}
      <h2 className={`section-h2 title-line title-materialise${vis ? ' vis' : ''}`} style={{ color: light ? 'white' : 'var(--navy)' }}>
        {title}
      </h2>
    </div>
  );
}

// ── FLOATING WHATSAPP ─────────────────────────────────────────────────────────
function FloatingWA() {
  return (
    <a href="https://wa.me/919215844410" className="wa-float" target="_blank" rel="noopener" title="Chat on WhatsApp">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.118.553 4.103 1.522 5.828L0 24l6.335-1.504A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.79 9.79 0 01-5.013-1.378l-.36-.213-3.76.893.942-3.664-.236-.376A9.818 9.818 0 012.18 12c0-5.42 4.4-9.818 9.82-9.818 5.42 0 9.818 4.398 9.818 9.818 0 5.42-4.398 9.818-9.818 9.818z"/>
      </svg>
    </a>
  );
}

// ── PAGE HERO — unique per page ────────────────────────────────────────────────
function PageHero({ title, sub, image, page }) {

  if (page === 'about') {
    return (
      <div className="page-hero-split">
        <div className="phs-image">
          <img src={image || 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80'} alt="" />
        </div>
        <div className="phs-navy">
          <div className="phs-watermark">2006</div>
          <div style={{ position:'relative', zIndex:2 }}>
            <p className="overline" style={{ color:'rgba(232,82,26,0.8)' }}>{sub || 'GOMAX Industries'}</p>
            <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(2.5rem,4.5vw,4.5rem)', color:'white', letterSpacing:'0.03em', lineHeight:1 }}>{title}</h1>
          </div>
        </div>
      </div>
    );
  }

  if (page === 'products') {
    return (
      <div className="page-hero" style={{ position:'relative' }}>
        <div className="hero-bg-wrap">
          <img src={image} alt="" className="hero-bg" style={{ animationDuration:'14s' }} />
          <div className="hero-overlay" />
          <div className="page-hero-grid-overlay" />
        </div>
        <div className="page-hero-content">
          <p className="overline">EN 12004 | IS 15477:2019</p>
          <h1 className="page-hero-title">{title}</h1>
        </div>
      </div>
    );
  }

  if (page === 'contact') {
    return (
      <div className="ph-contact-split">
        <div className="ph-contact-navy">
          <div>
            <p className="overline">{sub || 'Get in Touch'}</p>
            <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(2.5rem,5vw,4.5rem)', color:'white', letterSpacing:'0.03em', lineHeight:1, marginBottom:'2rem' }}>{title}</h1>
            <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
              {[
                ['Location', 'Vijay Nagar, Dyal Singh Colony, Karnal, Haryana 132001'],
                ['Phone', '+91 92158 44410'],
                ['Email', 'info@gomaxindustries.com'],
              ].map(([label, val]) => (
                <div key={label} style={{ display:'flex', gap:'0.75rem', alignItems:'flex-start' }}>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.68rem', color:'var(--orange)', minWidth:'52px', letterSpacing:'0.08em', paddingTop:'2px' }}>{label}</span>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.78rem', color:'rgba(255,255,255,0.55)', lineHeight:1.5 }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="ph-contact-warm">
          <div style={{ fontFamily:'var(--font-display)', fontSize:'clamp(4rem,8vw,9rem)', color:'rgba(255,255,255,0.12)', lineHeight:0.9, letterSpacing:'0.04em' }}>REACH<br/>OUT</div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-hero">
      <div className="hero-bg-wrap">
        <img src={image} alt="" className="hero-bg" style={{ animationDuration: '12s' }} />
        <div className="hero-overlay" style={{ background: 'linear-gradient(to top, rgba(13,27,42,0.92) 0%, rgba(13,27,42,0.5) 100%)' }} />
      </div>
      <div className="page-hero-content">
        <p className="overline" style={{ animationDelay: '0.1s' }}>{sub || 'GOMAX Industries'}</p>
        <h1 className="page-hero-title">{title}</h1>
      </div>
    </div>
  );
}

// ── PRODUCT CARD — 3D tilt + spotlight ────────────────────────────────────────
function ProductCard({ p, onClick }) {
  const isMobile = window.matchMedia('(hover:none)').matches;
  const [spot, setSpot] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const handleMove = (e) => {
    if (isMobile) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const relX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const relY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    card.style.transform = `perspective(800px) rotateX(${-relY * 8}deg) rotateY(${relX * 8}deg) translateZ(10px)`;
    card.style.transition = 'transform 0.1s ease';
    setSpot({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  };

  const handleEnter = () => { if (!isMobile) setHovered(true); };

  const handleLeave = (e) => {
    if (isMobile) return;
    const card = e.currentTarget;
    card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)';
    card.style.transition = 'transform 0.5s ease';
    setHovered(false);
  };

  return (
    <div
      className="product-card"
      onClick={() => onClick && onClick(p)}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{ transformStyle: 'preserve-3d', boxShadow: hovered ? '0 24px 56px rgba(13,27,42,0.14)' : undefined }}
    >
      {hovered && !isMobile && (
        <div style={{
          position:'absolute', inset:0, pointerEvents:'none', zIndex:1,
          background:`radial-gradient(circle 200px at ${spot.x}% ${spot.y}%, rgba(232,82,26,0.08) 0%, transparent 70%)`,
        }} />
      )}
      <div className="pc-image" style={{ position:'relative', zIndex:2 }}>
        <img src={p.image} alt={p.name} />
      </div>
      <div className="pc-header" style={{ position:'relative', zIndex:2 }}>
        {p.en !== '—' && <div className="pc-en-code">EN {p.en}</div>}
        <div className="pc-name bebas">{p.name}</div>
      </div>
      <div className="pc-body" style={{ position:'relative', zIndex:2 }}>
        <p className="pc-desc">{p.desc}</p>
        <div className="pc-chips">
          {p.chips.map(c => <span key={c} className="chip">{c}</span>)}
        </div>
        <div className="pc-footer">
          <span className="pc-cat mono">{p.catLabel}</span>
          <span className="pc-cta">View Details <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
        </div>
      </div>
      {p.en !== '—' && (
        <div className="pc-specs-overlay" style={{ position:'relative', zIndex:2 }}>
          <div style={{ fontWeight:600, marginBottom:'0.4rem', letterSpacing:'0.08em', fontSize:'0.7rem' }}>TECHNICAL SPECS</div>
          <div>Standard: {p.specs.standard}</div>
          <div>Coverage: {p.specs.coverage}</div>
          <div>Open Time: {p.specs.settingTime}</div>
        </div>
      )}
    </div>
  );
}

// ── CTA BAND ──────────────────────────────────────────────────────────────────
function CTABand() {
  const [ref, vis] = useScrollObserver(0.2);
  return (
    <section className="cta-band-section" ref={ref}>
      <div className={`cta-banner fade-up${vis ? ' vis' : ''}`}>
        <div className="cta-person">
          <img src="/Tiku call back image.png" alt="Tiku Talsania" />
        </div>
        <div className="cta-banner-text">
          <h2 className="cta-banner-heading">READY TO BUILD SOMETHING EXTRAORDINARY?</h2>
          <p className="cta-banner-sub">Get expert advice for your next construction project</p>
        </div>
        <div className="cta-banner-btn-wrap">
          <a href="tel:+919215844410" className="cta-contact-btn">Contact Us</a>
        </div>
      </div>
    </section>
  );
}

// ── FOOTER — Liquid Glass ──────────────────────────────────────────────────────
const FS = {
  section:    { position:'relative', width:'100%', overflow:'hidden', fontFamily:"'Helvetica Regular', Helvetica, Arial, sans-serif" },
  video:      { position:'absolute', top:0, left:0, width:'100%', height:'100%', objectFit:'cover', zIndex:0 },
  overlay:    { position:'absolute', top:0, left:0, width:'100%', height:'100%', background:'rgba(0,0,0,0.48)', zIndex:1 },
  inner:      { position:'relative', zIndex:2, display:'flex', flexDirection:'column', boxSizing:'border-box' },
  /* ── CTA ── */
  ctaWrap:    { display:'flex', alignItems:'flex-end', maxWidth:'80rem', margin:'0 auto', width:'100%', padding:'72px 32px 0', boxSizing:'border-box', gap:'2.5rem', position:'relative' },
  ctaText:    { flex:1, paddingBottom:'2rem' },
  ctaHeading: { fontFamily:"'Bebas Neue', sans-serif", fontSize:'clamp(2.2rem,4vw,3.5rem)', color:'white', lineHeight:1.05, letterSpacing:'0.04em', margin:'0 0 0.5rem' },
  ctaSub:     { color:'rgba(255,255,255,0.6)', fontSize:'0.95rem', margin:'0 0 1.5rem' },
  ctaBtn:     { display:'inline-block', background:'#E8521A', color:'white', fontWeight:700, fontSize:'0.85rem', padding:'13px 30px', borderRadius:'6px', textDecoration:'none', letterSpacing:'0.06em', textTransform:'uppercase', transition:'background .2s, transform .2s', boxShadow:'0 4px 20px rgba(232,82,26,0.4)' },
  ctaPerson:  { flexShrink:0, display:'flex', alignItems:'flex-end', height:'260px' },
  personImg:  { height:'100%', width:'auto', objectFit:'contain', objectPosition:'bottom', filter:'drop-shadow(-4px 0 20px rgba(0,0,0,0.4))' },
  /* ── Glass card ── */
  cardWrap:   { padding:'0 32px 48px', maxWidth:'80rem', margin:'0 auto', width:'100%', boxSizing:'border-box' },
  card:       { width:'100%', borderRadius:'1.5rem', padding:'2.5rem', color:'rgba(255,255,255,0.7)', boxSizing:'border-box' },
  topGrid:    { display:'grid', gridTemplateColumns:'minmax(0,5fr) minmax(0,7fr)', gap:'3rem', marginBottom:'2.5rem' },
  brand:      { display:'flex', flexDirection:'column', gap:'1rem' },
  linksGrid:  { display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'2rem' },
  colHead:    { fontSize:'0.72rem', textTransform:'uppercase', letterSpacing:'0.12em', color:'rgba(255,255,255,1)', fontWeight:600, marginBottom:'1rem', display:'block' },
  link:       { fontSize:'0.78rem', color:'rgba(255,255,255,0.6)', textDecoration:'none', display:'block', marginBottom:'0.5rem', transition:'color 0.2s' },
  contactRow: { display:'flex', alignItems:'flex-start', gap:'0.5rem', fontSize:'0.78rem', color:'rgba(255,255,255,0.6)', textDecoration:'none', marginBottom:'0.6rem' },
  bottom:     { borderTop:'1px solid rgba(255,255,255,0.1)', paddingTop:'1.5rem', display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:'1rem' },
  tiny:       { fontSize:'0.625rem', textTransform:'uppercase', letterSpacing:'0.12em', opacity:0.5, margin:0 },
  socialRow:  { display:'flex', alignItems:'center', gap:'0.75rem' },
  social:     { color:'white', opacity:0.7, transition:'opacity 0.2s', lineHeight:0 },
};

function Footer({ navigate }) {
  const hover = e => { e.currentTarget.style.color = 'white'; };
  const unhover = e => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; };
  const socialHover = e => { e.currentTarget.style.opacity = '1'; };
  const socialUnhover = e => { e.currentTarget.style.opacity = '0.7'; };

  return (
    <section style={{ ...FS.section, minHeight:'620px' }}>
      {/* Video background */}
      <video autoPlay muted loop playsInline preload="auto" style={FS.video}>
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260429_114316_1c7889ad-2885-410e-b493-98119fee0ddb.mp4" type="video/mp4" />
      </video>
      <div style={FS.overlay} />

      <div style={FS.inner}>
        {/* ── CTA ── */}
        <div style={FS.ctaWrap}>
            <div style={FS.ctaText}>
              <h2 style={FS.ctaHeading}>READY TO BUILD SOMETHING<br />EXTRAORDINARY?</h2>
              <p style={FS.ctaSub}>Get expert advice for your next construction project</p>
              <a href="tel:+919215844410" style={FS.ctaBtn}
                onMouseOver={e => { e.currentTarget.style.background='#d4470f'; e.currentTarget.style.transform='translateY(-2px)'; }}
                onMouseOut={e => { e.currentTarget.style.background='#E8521A'; e.currentTarget.style.transform='none'; }}>
                Contact Us
              </a>
            </div>
            <div style={FS.ctaPerson}>
              <img src="/Tiku call back image.png" alt="Tiku Talsania" style={FS.personImg} />
            </div>
          </div>

        {/* ── Glass footer card ── */}
        <div style={FS.cardWrap}>
          <motion.footer
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
            className="liquid-glass"
            style={FS.card}
          >
            {/* Top: brand + links */}
            <div style={FS.topGrid}>
              <div style={FS.brand}>
                <img src="/Logo/Dark background.png" alt="GoMax Industries" style={{ height:'40px', width:'auto', objectFit:'contain', display:'block' }} />
                <p style={{ fontSize:'0.875rem', lineHeight:1.65, maxWidth:'22rem', color:'rgba(255,255,255,0.6)', margin:0 }}>
                  GoMax Industries delivers premium construction chemicals for building excellence — engineered in Karnal, Haryana and trusted across India.
                </p>
              </div>

              <div style={FS.linksGrid}>
                <div>
                  <span style={FS.colHead}>Products</span>
                  {PRODUCTS.map(p => (
                    <a key={p.id} href="#" style={FS.link}
                      onClick={e => { e.preventDefault(); navigate && navigate('product-detail', p); }}
                      onMouseOver={hover} onMouseOut={unhover}>
                      {p.name}
                    </a>
                  ))}
                </div>
                <div>
                  <span style={FS.colHead}>Company</span>
                  {[['home','Home'],['about','About Us'],['products','Products'],['contact','Contact']].map(([pg, label]) => (
                    <a key={pg} href="#" style={FS.link}
                      onClick={e => { e.preventDefault(); navigate && navigate(pg); }}
                      onMouseOver={hover} onMouseOut={unhover}>
                      {label}
                    </a>
                  ))}
                </div>
                <div>
                  <span style={FS.colHead}>Contact</span>
                  <a href="tel:+919215844410" style={FS.contactRow} onMouseOver={hover} onMouseOut={unhover}>
                    <Phone size={13} style={{ flexShrink:0, marginTop:'1px' }} />
                    +91 92158 44410
                  </a>
                  <a href="mailto:info@gomaxindustries.com" style={FS.contactRow} onMouseOver={hover} onMouseOut={unhover}>
                    <Mail size={13} style={{ flexShrink:0, marginTop:'1px' }} />
                    info@gomaxindustries.com
                  </a>
                  <span style={FS.contactRow}>
                    <MapPin size={13} style={{ flexShrink:0, marginTop:'1px' }} />
                    Vijay Nagar, Dyal Singh Colony,<br />Karnal, Haryana 132001
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div style={FS.bottom}>
              <div>
                <p style={FS.tiny}>© 2025 GoMax Industries. All Rights Reserved.</p>
                <p style={{ ...FS.tiny, marginTop:'4px' }}>EN 12004 | IS 15477:2019 Compliant</p>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
                <span style={FS.tiny}>Follow Us:</span>
                <div style={FS.socialRow}>
                  <a href="#" style={FS.social} onMouseOver={socialHover} onMouseOut={socialUnhover}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                  </a>
                  <a href="#" style={FS.social} onMouseOver={socialHover} onMouseOut={socialUnhover}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                  </a>
                  <a href="https://www.youtube.com/@gomaxindustries" target="_blank" rel="noopener noreferrer" style={FS.social} onMouseOver={socialHover} onMouseOut={socialUnhover}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20.06 12 20.06 12 20.06s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98l5.75 3.02-5.75 3.02z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.footer>
        </div>
      </div>
    </section>
  );
}

// ── NAV — drawer with staggered links ─────────────────────────────────────────
function Nav({ currentPage, navigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  const go = (pg, extra) => { navigate(pg, extra); setDrawerOpen(false); };
  const NAV_ITEMS = ['home','about','products','contact'];
  const LABELS = { home:'Home', about:'About', products:'Products', contact:'Contact' };
  return (
    <>
      <nav className={scrolled ? 'scrolled' : ''}>
        <div className="nav-inner">
          <a href="#" className="nav-logo" onClick={e => { e.preventDefault(); go('home'); }}>
            <img
              src={scrolled ? '/Logo/Light background.png' : '/Logo/Dark background.png'}
              alt="GoMax Industries"
              style={{ height: '36px', width: 'auto', display: 'block', objectFit: 'contain' }}
            />
          </a>
          <ul className="nav-links">
            {NAV_ITEMS.map(pg => (
              <li key={pg} className="nav-link-item">
                <a href="#" className={currentPage === pg || (currentPage === 'product-detail' && pg === 'products') ? 'active' : ''}
                  onClick={e => { e.preventDefault(); go(pg); }}>
                  {LABELS[pg]}
                  {pg === 'products' && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft:2 }}><polyline points="6 9 12 15 18 9"/></svg>}
                </a>
                {pg === 'products' && (
                  <div className="nav-dropdown">
                    {PRODUCTS.map(p => (
                      <a key={p.id} href="#" onClick={e => { e.preventDefault(); go('product-detail', p); }}>{p.name}</a>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
          <div className="nav-right">
            <span className="nav-phone mono">+91 92158 44410</span>
            <a href="#" className="nav-cta" onClick={e => { e.preventDefault(); go('contact'); }}>Get Quote</a>
          </div>
          <div className="hamburger" onClick={() => setDrawerOpen(true)}>
            <span /><span /><span />
          </div>
        </div>
      </nav>
      <div className={`drawer-overlay${drawerOpen ? ' open' : ''}`} onClick={() => setDrawerOpen(false)} />
      <div className={`drawer${drawerOpen ? ' open' : ''}`}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <img src="/Logo/Dark background.png" alt="GoMax Industries" style={{ height: '32px', width: 'auto', objectFit: 'contain' }} />
          <button onClick={() => setDrawerOpen(false)} style={{ background:'none', border:'none', color:'white', fontSize:'1.5rem', cursor:'pointer' }}>✕</button>
        </div>
        <div className="drawer-links">
          {NAV_ITEMS.map(pg => (
            <a
              key={pg}
              href="#"
              className={`drawer-link-item${currentPage === pg ? ' active' : ''}`}
              onClick={e => { e.preventDefault(); go(pg); }}
            >
              {LABELS[pg]}
            </a>
          ))}
        </div>
        <div className="drawer-bottom">
          <p className="mono" style={{ fontSize:'0.8rem', color:'rgba(255,255,255,0.4)', marginBottom:'1rem' }}>+91 92158 44410</p>
          <a href="https://wa.me/919215844410" className="btn btn-whatsapp" style={{ width:'100%', justifyContent:'center' }}>WhatsApp Us</a>
        </div>
      </div>
    </>
  );
}

export { useScrollObserver, useCountUp, Cursor, ScrollBar, SectionHead, FloatingWA, PageHero, ProductCard, CTABand, Footer, Nav };
