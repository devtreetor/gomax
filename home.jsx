// ─── HOME PAGE ────────────────────────────────────────────────────────────────
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS, REVIEWS } from './data.jsx';
import { useScrollObserver, useIsMobile, ProductCard, CTABand } from './shared.jsx';
import { WorldMap } from './world-map.jsx';

// ── SCROLL-EXPANSION HERO ─────────────────────────────────────────────────────
// Inspired by: https://21st.dev/r/arunachalam0606/scroll-expansion-hero
// Scroll hijacks page until card fully expands; title halves slide apart.
function HeroSection({ navigate }) {
  const isMobile = useIsMobile();
  const [prog, setProg] = useState(0);      // 0 → 1: expansion progress
  const [showContent, setShowContent] = useState(false);
  const progRef = useRef(0);
  const expandedRef = useRef(false);
  const touchYRef = useRef(0);

  useEffect(() => {
    const onWheel = (e) => {
      if (expandedRef.current) {
        // Fully expanded — let normal page scroll proceed, but allow collapse on scroll-up at top
        if (e.deltaY < 0 && window.scrollY <= 5) {
          expandedRef.current = false;
          e.preventDefault();
          // progRef stays at 1; next wheel event (delta<0) reduces it gradually
        }
      } else {
        e.preventDefault();
        const next = Math.min(Math.max(progRef.current + e.deltaY * 0.0015, 0), 1);
        progRef.current = next;
        setProg(next);
        if (next >= 1) { expandedRef.current = true; setShowContent(true); }
        else if (next < 0.75) { setShowContent(false); }
      }
    };

    const onScroll = () => { if (!expandedRef.current) window.scrollTo(0, 0); };

    const onTouchStart = (e) => { touchYRef.current = e.touches[0].clientY; };

    const onTouchMove = (e) => {
      const dy = touchYRef.current - e.touches[0].clientY;
      if (expandedRef.current && dy < -20 && window.scrollY <= 5) {
        expandedRef.current = false;
        e.preventDefault();
        return;
      }
      if (!expandedRef.current) {
        e.preventDefault();
        const next = Math.min(Math.max(progRef.current + dy * 0.006, 0), 1);
        progRef.current = next;
        setProg(next);
        if (next >= 1) { expandedRef.current = true; setShowContent(true); }
        else if (next < 0.75) { setShowContent(false); }
        touchYRef.current = e.touches[0].clientY;
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('scroll', onScroll);
    window.addEventListener('touchstart', onTouchStart, { passive: false });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  const cardW  = 300 + prog * (isMobile ? 320  : 1250);
  const cardH  = 400 + prog * (isMobile ? 120  : 380);
  const slide  = prog * (isMobile ? 24   : 42);   // vw units
  const textAlpha = Math.max(0, 1 - prog * 1.8);
  const hintAlpha = Math.max(0, 1 - prog * 5);
  const bgAlpha   = Math.max(0, 1 - prog * 1.4);

  return (
    <div style={{ overflowX: 'hidden' }}>
      <section style={{ position:'relative', height:'100vh', background:'var(--navy)', overflow:'hidden' }}>

        {/* Background person image — fades out as card expands */}
        <div style={{ position:'absolute', inset:0, zIndex:0, opacity:bgAlpha }}>
          <img
            src="/Hero.png"
            alt=""
            style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition: isMobile ? 'left top' : 'center top' }}
          />
          <div style={{ position:'absolute', inset:0, background:'rgba(13,27,42,0.72)' }} />
          <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle, rgba(255,255,255,.05) 1px, transparent 1px)', backgroundSize:'40px 40px' }} />
        </div>

        {/* Viewport-height flex container */}
        <div style={{ position:'relative', zIndex:10, height:'100%', display:'flex', alignItems:'center', justifyContent:'center' }}>

          {/* ── Expanding media card (z-1, behind title) ── */}
          <div style={{
            position:'absolute', top:'50%', left:'50%',
            transform:'translate(-50%,-50%)',
            width:`${cardW}px`, height:`${cardH}px`,
            maxWidth:'95vw', maxHeight:'85vh',
            borderRadius:`${Math.max(0, 14 * (1 - prog))}px`,
            overflow:'hidden',
            boxShadow:`0 8px 80px rgba(0,0,0,${0.5 - prog * 0.35})`,
            zIndex:1,
          }}>
            <video
              autoPlay
              muted
              loop
              playsInline
              style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
            >
              <source src="/hero-video-trim.mp4" type="video/mp4" />
            </video>
            {/* Overlay — lightens as card expands */}
            <div style={{ position:'absolute', inset:0, background:`rgba(13,27,42,${Math.max(0.05, 0.55 - prog * 0.5)})` }} />

            {/* Expanded-state content — fades in at prog = 1 */}
            <div style={{
              position:'absolute', inset:0, zIndex:2,
              background:'linear-gradient(to top, rgba(13,27,42,0.92) 0%, rgba(13,27,42,0.45) 40%, transparent 70%)',
              opacity: showContent ? 1 : 0,
              transition:'opacity 0.7s ease',
              pointerEvents: showContent ? 'all' : 'none',
            }}>
              {/* Bottom-left: tagline + description + CTAs */}
              <div style={{ position:'absolute', bottom:0, left:0, padding:'clamp(1.5rem,3vw,3.5rem)', maxWidth:'min(65%, 560px)' }}>
                <p className="overline" style={{ color:'rgba(232,82,26,.9)', letterSpacing:'0.18em', fontWeight:'800' }}>SINCE 2006 </p>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'clamp(.88rem,1.3vw,1rem)', color:'rgba(255,255,255,.7)', lineHeight:1.75, margin:'.75rem 0 2rem' }}>
                  Premium construction chemicals engineered to EN 12004 European standards. 18 years of building landmarks across India and beyond.
                </p>
                <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
                  <button className="btn btn-primary" onClick={() => navigate('products')}>Explore Products</button>
                  <button className="btn btn-ghost" onClick={() => navigate('contact')}>Contact us</button>
                </div>
              </div>
            </div>
          </div>

          {/* ── Title halves — z-2, slide apart on scroll ── */}
          <div style={{
            position:'relative', zIndex:2,
            display:'flex', flexDirection:'column',
            alignItems:'center', gap:'0.5rem',
            width:'100%', pointerEvents:'none', textAlign:'center',
          }}>
            <div style={{
              transform:`translateX(-${slide}vw)`,
              fontFamily:'var(--font-display)',
              fontSize: isMobile ? 'clamp(1.6rem, 5vw, 2.5rem)' : 'clamp(2.2rem,5.5vw,6.5rem)',
              color:'white', letterSpacing:'0.03em', lineHeight:1,
              opacity:textAlpha,
            }}>WHERE IMAGINATION</div>
            <div style={{
              transform:`translateX(${slide}vw)`,
              fontFamily:'var(--font-display)',
              fontSize: isMobile ? 'clamp(1.6rem, 5vw, 2.5rem)' : 'clamp(2.2rem,5.5vw,6.5rem)',
              color:'var(--orange)', letterSpacing:'0.03em', lineHeight:1,
              opacity:textAlpha,
            }}>MEETS ENGINEERING EXCELLENCE.</div>
          </div>

          {/* ── Scroll-to-expand hint ── */}
          <div style={{
            position:'absolute', bottom:'2.5rem', left:'2.5rem',
            zIndex:3, pointerEvents:'none',
            display:'flex', flexDirection:'column', alignItems:'center', gap:'8px',
            opacity:hintAlpha,
          }}>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:'.65rem', color:'rgba(255,255,255,.5)', letterSpacing:'.12em', writingMode:'vertical-rl' }}>SCROLL TO EXPAND</span>
            <div style={{ width:'1px', height:'32px', background:'rgba(255,255,255,.3)', animation:'scrollLine 1.8s ease-in-out infinite' }} />
          </div>
        </div>

      </section>
    </div>
  );
}

// ── SOLUTIONS ─────────────────────────────────────────────────────────────────
const SOLVE_CATS = [
  { id:'tile',        label:'Tile Adhesive',    iconKey:'grid',   productIds:[1,2,9,3,4] },
  { id:'waterproof',  label:'Waterproofing',    iconKey:'drop',   productIds:[]          },
  { id:'epoxy',       label:'Epoxy Grouting',   iconKey:'plus',   productIds:[5]         },
  { id:'surface',     label:'Surface Treatment',iconKey:'pencil', productIds:[8]         },
  { id:'sealant',     label:'Joint Sealants',   iconKey:'kit',    productIds:[6]         },
  { id:'highway',     label:'Highway Repairs',  iconKey:'road',   productIds:[7]         },
];

const CARD_TINTS = ['#EDE6D4','#E8DDCA','#F0E8D2','#EAE0CC','#E5D9C0'];

const SOLVE_ICONS = {
  grid:   <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3.5" y="3.5" width="7" height="7" rx="1.2"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.2"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.2"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.2"/></svg>,
  drop:   <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3.5c3.5 4.5 6 8 6 11a6 6 0 1 1-12 0c0-3 2.5-6.5 6-11z"/></svg>,
  plus:   <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 8v8M8 12h8"/></svg>,
  pencil: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20l4-1 11-11-3-3L5 16l-1 4z"/><path d="M14 7l3 3"/></svg>,
  kit:    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3.5" y="7" width="17" height="13" rx="1.5"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><path d="M12 11v6M9 14h6"/></svg>,
  road:   <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M7 4l-3 17"/><path d="M17 4l3 17"/><path d="M12 5v2M12 11v2M12 17v2"/></svg>,
};

function classTag(standard) {
  const m = standard?.match(/^(EN|IS)\s+[\d:]+\s*[—–]\s*(.+)$/);
  if (!m) return null;
  return `${m[1]} ${m[2].trim()}`;
}

const CARDS_VISIBLE = 3;

function SolutionProductCard({ p, onClick, animClass, animDelay }) {
  const tag = classTag(p.specs?.standard);
  return (
    <motion.div
      onClick={onClick}
      className={animClass}
      whileHover="hover"
      style={{
        flex:'1 1 0', minWidth:0, 
        maxWidth: animClass.includes('mobile') ? '100%' : 'calc(33.33% - 1rem)',
        position:'relative',
        width:'100%', aspectRatio:'1 / 0.68',
        cursor:'pointer',
        overflow:'visible',
        transitionDelay: animDelay,
      }}
    >
      {/* Card background — full card, top: 0 */}
      <div style={{
        position:'absolute',
        top:'17%', left:0, right:0, bottom:0,
        background:'#f3ede2',
        borderRadius:'24px',
        transition: 'background 0.3s ease',
      }} />

      {/* Image container — bleeds above card via negative top */}
      <motion.div 
        variants={{
          hover: { y: -8, scale: 1.03 }
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        style={{
          position:'absolute',
          top: animClass.includes('mobile') ? '-25%' : '-45%', left:'5%', right:'5%',
          height: animClass.includes('mobile') ? '105%' : '125%',
          display:'flex', alignItems:'center', justifyContent:'center',
          zIndex:2,
          pointerEvents:'none',
        }}
      >
        <img
          src={p.cutout}
          alt={p.name}
          style={{
            width:'100%', height:'100%',
            objectFit:'contain',
            filter:'drop-shadow(0 25px 45px rgba(13,27,42,.28))',
            mixBlendMode:'multiply',
          }}
        />
      </motion.div>

      {/* Badge + name — bottom left, inside card */}
      <div style={{
        position:'absolute',
        bottom:0, left:0, right:0,
        padding:'0 1.2rem 1.2rem',
        zIndex:2,
        display:'flex', flexDirection:'column',
        alignItems:'center', gap:'8px',
      }}>
        {tag && (
          <div style={{
            background:'#f5dcce', borderRadius:'26px',
            padding:'2px 10px',
            fontFamily:'var(--font-mono)', fontSize:'12px',
            color:'var(--orange)', letterSpacing:'.08em',
            whiteSpace:'nowrap',
          }}>
            {tag}
          </div>
        )}
        <div style={{
          fontFamily:'var(--font-display)',
          fontSize:'clamp(0.95rem, 1.3vw, 1.2rem)',
          color:'var(--navy)', letterSpacing:'.03em', lineHeight:1,
        }}>
          {p.name}
        </div>
      </div>
    </motion.div>
  );
}

function SolutionsSection({ navigate }) {
  const isMobile = useIsMobile();
  const [catIx, setCatIx] = useState(0);
  const [cardStart, setCardStart] = useState(0);
  const [ref, vis] = useScrollObserver(0.05);

  const CARDS_VISIBLE = isMobile ? 1 : 3;

  const cat = SOLVE_CATS[catIx];
  const catProds = cat.productIds.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);

  const handleCatChange = (i) => { setCatIx(i); setCardStart(0); };
  const canPrev = cardStart > 0;
  const canNext = cardStart + CARDS_VISIBLE < catProds.length;
  const visible = catProds.slice(cardStart, cardStart + CARDS_VISIBLE);

  return (
    <section style={{ background:'var(--bg)', padding: isMobile ? '4rem 0 5rem' : '8rem 0 10rem' }} ref={ref}>
      <div className="section-wrap">

        {/* ── Header: eyebrow + headline ── */}
        <div className={`fade-up${vis?' vis':''}`} style={{ textAlign:'center', marginBottom:'3rem' }}>
          <span className="overline">What We Solve</span>
          <h2 className={`section-h2${vis?' vis':''}`} style={{ color:'var(--navy)', fontSize: isMobile ? 'clamp(1.8rem, 6vw, 2.2rem)' : 'clamp(2.8rem,5vw,5rem)', letterSpacing:'.02em', display:'block' }}>
            The Right Solution For<br />Every <span style={{ color:'var(--orange)' }}>Building</span> Challenge
          </h2>
        </div>

        {/* ── Dock nav ── */}
        <div className={`fade-up${vis?' vis':''}`} style={{ 
          transitionDelay:'.1s', 
          marginBottom: isMobile ? '15rem' : '14rem', 
          display:'flex', 
          justifyContent: 'center',
          position:'relative',
          zIndex:10,
        }}>
          <nav style={{
            display:'inline-flex', flexWrap: isMobile ? 'wrap' : 'nowrap', justifyContent: 'center', alignItems:'stretch', gap: isMobile ? '8px' : '0', padding:'5px',
            borderRadius:'16px', background:'white',
            border:'1px solid rgba(13,27,42,.08)',
            boxShadow:'0 20px 50px -15px rgba(13,27,42,.22)',
            width:'fit-content', margin: isMobile ? '0 1rem' : '0 auto',
            flexShrink: 0,
          }}>
            {SOLVE_CATS.map((c, i) => {
              const active = i === catIx;
              return (
                <button key={c.id}
                  onClick={() => handleCatChange(i)}
                  style={{
                    flex: '0 0 auto',
                    display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'4px',
                    padding:'4px 14px', borderRadius:'12px',
                    marginLeft: 0,
                    color: active ? '#FBF7EF' : 'var(--navy)',
                    background: active ? 'var(--navy)' : 'transparent',
                    border:'none', cursor:'pointer', fontFamily:'var(--font-body)',
                    transition:'background .25s ease, color .25s ease',
                  }}
                >
                  {SOLVE_ICONS[c.iconKey]}
                  <span style={{ fontSize:'12px', letterSpacing:'.01em', fontWeight:700, whiteSpace:'nowrap' }}>{c.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* ── Product cards + carousel ── */}
        {catProds.length > 0 ? (
          <div style={{ position:'relative', display:'flex', alignItems:'center', gap:'1rem' }}>

            {/* Prev arrow */}
            <button
              onClick={() => setCardStart(s => Math.max(0, s - 1))}
              disabled={!canPrev}
              style={{
                ...(isMobile ? { position: 'absolute', left: '-10px', zIndex: 10, width: '44px', height: '44px' } : { flexShrink:0, width:'52px', height:'52px' }),
                borderRadius:'50%',
                background:'white', border:'1px solid rgba(13,27,42,.12)',
                boxShadow:'0 4px 16px rgba(13,27,42,.1)',
                display:'flex', alignItems:'center', justifyContent:'center',
                cursor: canPrev ? 'pointer' : 'default',
                opacity: canPrev ? 1 : 0.3,
                transition:'opacity .2s ease',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>

            {/* Cards row */}
            <div style={{ flex:1, display:'flex', gap:'1.5rem', alignItems:'stretch', overflow:'visible', justifyContent: visible.length < CARDS_VISIBLE ? 'center' : 'flex-start' }}>
              {visible.map((p, i) => (
                <SolutionProductCard
                  key={p.id}
                  p={p}
                  onClick={() => navigate('product-detail', p)}
                  animClass={`fade-up${vis?' vis':''}${isMobile ? ' mobile' : ''}`}
                  animDelay={`${0.1 + i * 0.08}s`}
                />
              ))}
            </div>

            {/* Next arrow */}
            <button
              onClick={() => setCardStart(s => Math.min(catProds.length - CARDS_VISIBLE, s + 1))}
              disabled={!canNext}
              style={{
                ...(isMobile ? { position: 'absolute', right: '-10px', zIndex: 10, width: '44px', height: '44px' } : { flexShrink:0, width:'52px', height:'52px' }),
                borderRadius:'50%',
                background:'white', border:'1px solid rgba(13,27,42,.12)',
                boxShadow:'0 4px 16px rgba(13,27,42,.1)',
                display:'flex', alignItems:'center', justifyContent:'center',
                cursor: canNext ? 'pointer' : 'default',
                opacity: canNext ? 1 : 0.3,
                transition:'opacity .2s ease',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>

          </div>
        ) : (
          <div className={`fade-up${vis?' vis':''}`} style={{
            textAlign:'center', padding:'5rem 2rem',
            background:'white', borderRadius:'16px',
            border:'1px solid var(--gray-light)',
          }}>
            <div style={{ fontFamily:'var(--font-display)', fontSize:'1.75rem', color:'var(--navy)', letterSpacing:'.04em', marginBottom:'.75rem' }}>
              COMING SOON
            </div>
            <p style={{ color:'var(--gray)', fontSize:'0.9rem', marginBottom:'1.75rem', maxWidth:400, margin:'0 auto 1.75rem' }}>
              Products in this category are custom-specified per project. Contact our technical team for formulation recommendations.
            </p>
            <button className="btn btn-primary" onClick={() => navigate('contact')}>Get Technical Advice →</button>
          </div>
        )}

      </div>
    </section>
  );
}

// ── STANDARDS BAND ────────────────────────────────────────────────────────────
const CERTS = [
  {
    code: 'EN 12004',
    tag: 'EUROPEAN STD',
    title: 'European Tile Adhesive Standard',
    badge: 'VERIFIED & COMPLIANT',
    logo: (
      <div aria-hidden="true" style={{ width:52, height:52, background:'rgba(255,255,255,0.1)', border:'1.5px solid rgba(255,255,255,0.3)', borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="14" stroke="rgba(255,255,255,0.9)" strokeWidth="1.2"/>
          {Array.from({length:12}).map((_,i) => {
            const a = (i * 30 - 90) * Math.PI / 180;
            const x = 18 + 10 * Math.cos(a);
            const y = 18 + 10 * Math.sin(a);
            return <circle key={i} cx={x} cy={y} r="1.4" fill="white"/>;
          })}
          <text x="18" y="21" textAnchor="middle" fontSize="7" fontWeight="800" fill="white" fontFamily="sans-serif">EN</text>
        </svg>
      </div>
    ),
  },
  {
    code: 'IS 15477:2019',
    tag: 'INDIAN STD',
    title: 'Bureau of Indian Standards',
    badge: 'VERIFIED & COMPLIANT',
    logo: (
      <div aria-hidden="true" style={{ width:52, height:52, background:'rgba(255,255,255,0.1)', border:'1.5px solid rgba(255,255,255,0.3)', borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <polygon points="18,4 32,30 4,30" stroke="white" strokeWidth="1.4" strokeLinejoin="round"/>
          <circle cx="18" cy="23" r="4" stroke="white" strokeWidth="1"/>
          {Array.from({length:8}).map((_,i) => {
            const a = (i * 45) * Math.PI / 180;
            return <line key={i} x1={18 + 1.8*Math.cos(a)} y1={23 + 1.8*Math.sin(a)} x2={18 + 3.8*Math.cos(a)} y2={23 + 3.8*Math.sin(a)} stroke="white" strokeWidth="0.9"/>;
          })}
          <text x="18" y="17" textAnchor="middle" fontSize="5.5" fontWeight="800" fill="white" fontFamily="sans-serif">ISI</text>
        </svg>
      </div>
    ),
  },
  {
    code: 'GERMAN QUALITY',
    tag: 'SINCE 2006',
    title: 'Benchmarked to German Precision',
    badge: 'VERIFIED & COMPLIANT',
    logo: (
      <div aria-hidden="true" style={{ width:52, height:52, background:'rgba(255,255,255,0.1)', border:'1.5px solid rgba(255,255,255,0.3)', borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          {/* Gear / precision mark */}
          <circle cx="18" cy="18" r="8" stroke="white" strokeWidth="1.2"/>
          <circle cx="18" cy="18" r="3" fill="white"/>
          {Array.from({length:8}).map((_,i) => {
            const a = (i * 45) * Math.PI / 180;
            const x1 = 18 + 9.5 * Math.cos(a), y1 = 18 + 9.5 * Math.sin(a);
            const x2 = 18 + 13 * Math.cos(a), y2 = 18 + 13 * Math.sin(a);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="2.2" strokeLinecap="round"/>;
          })}
          <circle cx="18" cy="18" r="13" stroke="rgba(255,255,255,0.35)" strokeWidth="0.8"/>
        </svg>
      </div>
    ),
  },
  {
    code: 'BNI MEMBER',
    tag: 'NETWORK',
    title: 'Business Network International',
    badge: 'ACTIVE MEMBER',
    logo: (
      <div aria-hidden="true" style={{ width:52, height:52, background:'rgba(255,255,255,0.1)', border:'1.5px solid rgba(255,255,255,0.3)', borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="13" stroke="white" strokeWidth="1.2"/>
          <ellipse cx="18" cy="18" rx="5.5" ry="13" stroke="rgba(255,255,255,0.55)" strokeWidth="0.9"/>
          <line x1="5" y1="18" x2="31" y2="18" stroke="rgba(255,255,255,0.55)" strokeWidth="0.9"/>
          <line x1="7" y1="12" x2="29" y2="12" stroke="rgba(255,255,255,0.35)" strokeWidth="0.7"/>
          <line x1="7" y1="24" x2="29" y2="24" stroke="rgba(255,255,255,0.35)" strokeWidth="0.7"/>
          <circle cx="18" cy="5" r="2" fill="white"/>
          <circle cx="31" cy="18" r="2" fill="white"/>
          <circle cx="5" cy="18" r="2" fill="white"/>
          <circle cx="18" cy="31" r="2" fill="white"/>
        </svg>
      </div>
    ),
  },
];

function StandardsBand() {
  const isMobile = useIsMobile();
  const [ref, vis] = useScrollObserver(0.15);
  return (
    <section
      aria-labelledby="standards-heading"
      style={{ position:'relative', overflow:'hidden', backgroundImage:'url("/Standard band background.png")', backgroundSize:'cover', backgroundPosition:'0% center', backgroundRepeat:'no-repeat' }}
      ref={ref}
    >
      {/* Gradient overlay — heavier on left so text passes WCAG AA, fades out right */}
      <div aria-hidden="true" style={{ position:'absolute', inset:0, background:'linear-gradient(to right, rgba(4,8,24,0.82) 0%, rgba(4,8,24,0.72) 45%, rgba(4,8,24,0.18) 100%)', pointerEvents:'none' }} />
      <div aria-hidden="true" style={{ position:'absolute', top:0, left:0, right:0, height:'2px', background:'linear-gradient(to right, transparent, var(--orange) 30%, var(--orange) 70%, transparent)' }} />

      <div style={{ maxWidth:'1400px', margin:'0 auto', padding: isMobile ? '4rem 1.5rem' : '5rem 2.5rem', display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '2rem' : '4rem', alignItems:'center' }}>

        {/* ── Left: heading + stacked cert rows ── */}
        <div className={`fade-left${vis?' vis':''}`} style={{ position:'relative', zIndex:1 }}>

          {/* Overline */}
          <p style={{ fontFamily:'var(--font-mono)', fontSize:'0.72rem', letterSpacing:'0.22em', color:'var(--orange)', textTransform:'uppercase', margin:'0 0 0.6rem' }}>
            Quality Assurance
          </p>

          {/* Main headline */}
          <h2 id="standards-heading" style={{ fontFamily:'var(--font-display)', fontSize:'clamp(1.4rem,2.6vw,2.4rem)', color:'#ffffff', lineHeight:1, letterSpacing:'0.04em', margin:'0 0 2rem', display:'flex', alignItems:'center', gap:'0.75rem', flexWrap:'wrap' }}>
            <span>CERTIFIED</span>
            <span aria-hidden="true" style={{ color:'var(--orange)', fontSize:'0.6em' }}>◆</span>
            <span>TRUSTED</span>
            <span aria-hidden="true" style={{ color:'var(--orange)', fontSize:'0.6em' }}>◆</span>
            <span>TESTED</span>
          </h2>

          {/* 4 cert rows stacked */}
          <ul style={{ listStyle:'none', margin:0, padding:0 }}>
            {CERTS.map((cert, i) => (
              <li
                key={cert.code}
                className={`fade-up${vis?' vis':''}`}
                style={{
                  transitionDelay:`${0.2 + i * 0.1}s`,
                  display:'flex', alignItems:'center', gap:'1rem',
                  padding:'1.1rem 0',
                  borderBottom: i < CERTS.length - 1 ? '1px solid rgba(255,255,255,0.12)' : 'none',
                }}
              >
                {/* Logo — decorative, info conveyed by text */}
                {cert.logo}

                {/* Text */}
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'0.6rem', marginBottom:'0.25rem', flexWrap:'wrap' }}>
                    <span style={{ fontFamily:'var(--font-display)', fontSize:'clamp(0.85rem,1.2vw,1.05rem)', color:'var(--orange)', letterSpacing:'0.06em', lineHeight:1 }}>{cert.code}</span>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', color:'rgba(255,255,255,0.78)', letterSpacing:'0.1em', background:'rgba(255,255,255,0.13)', padding:'2px 7px', borderRadius:2 }}>{cert.tag}</span>
                  </div>
                  <div style={{ fontSize:'0.82rem', color:'#ffffff', fontWeight:600, lineHeight:1.3 }}>{cert.title}</div>
                </div>

                {/* Verified badge */}
                <div aria-label="Verified" style={{ flexShrink:0, width:28, height:28, borderRadius:'50%', background:'rgba(232,82,26,0.18)', border:'1px solid rgba(232,82,26,0.5)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Right: transparent — background image shows through ── */}
        <div aria-hidden="true" />

      </div>
    </section>
  );
}

// ── PRODUCTS PREVIEW ──────────────────────────────────────────────────────────
function ProductsPreviewSection({ navigate }) {
  const isMobile = useIsMobile();
  const [ref, vis] = useScrollObserver(0.05);
  const preview = PRODUCTS.slice(0, 6);
  return (
    <section style={{ background:'var(--bg)', padding:'6rem 0' }}>
      <div className="section-wrap" ref={ref}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:'1.5rem', marginBottom:'3rem' }}>
          <div className={`fade-up${vis?' vis':''}`}>
            <span className="overline">Our Range</span>
            <h2 className={`section-h2 title-line${vis?' vis':''}`} style={{ color:'var(--navy)' }}>9 Premium Construction Chemicals</h2>
          </div>
          <button className={`btn btn-ghost-navy fade-up${vis?' vis':''}`} style={{ transitionDelay:'0.2s' }} onClick={() => navigate('products')}>View All 8 Products →</button>
        </div>
        <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap:'3rem 1.5rem', paddingTop:'5rem' }}>
          {preview.map((p,i) => (
            <div key={p.id} className={`fade-up${vis?' vis':''}`} style={{ transitionDelay:`${i*0.08}s` }}>
              <ProductCard p={p} onClick={() => navigate('product-detail', p)} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CLIENT LOGO STRIP ─────────────────────────────────────────────────────────
const CLIENT_LOGOS = [
  '/clients/2.png',
  '/clients/3.png',
  '/clients/4.jpg',
  '/clients/5.avif',
  '/clients/6.png',
  '/clients/VRC.png',
];

function LogoCard({ src }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: '180px',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        position: 'relative',
        borderLeft: '1px solid var(--gray-light)',
        background: 'white',
        transition: 'all 0.3s ease',
        cursor: 'default',
      }}
    >
      <img 
        src={src} 
        alt="Client Logo" 
        style={{ 
          maxWidth: '100%', 
          maxHeight: '52px', 
          objectFit: 'contain',
          filter: hov ? 'grayscale(0)' : 'grayscale(1)',
          opacity: hov ? 1 : 0.45,
          transition: 'all 0.3s ease',
          transform: hov ? 'scale(1.05)' : 'scale(1)',
        }} 
      />
      
      {/* Subtle orange accent on hover */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'var(--orange)',
        transform: hov ? 'scaleX(1)' : 'scaleX(0)',
        transition: 'transform 0.3s ease',
      }} />
    </div>
  );
}

function LogoStrip() {
  const isMobile = useIsMobile();
  const doubled = [...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS];
  return (
    <section style={{
      background: 'var(--bg)',
      borderTop: '1px solid var(--gray-light)',
      borderBottom: '1px solid var(--gray-light)',
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: isMobile ? '0 1rem' : '0 2.5rem',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'stretch',
        overflow: 'hidden',
      }}>
        {/* Label — aligned with page content edge */}
        <div style={{
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          paddingTop: isMobile ? '1rem' : '1.5rem',
          paddingBottom: isMobile ? '0.5rem' : '1.5rem',
          paddingRight: isMobile ? '0' : '2.5rem',
          borderRight: isMobile ? 'none' : '1px solid var(--gray-light)',
          background: 'var(--bg)',
          position: 'relative',
          zIndex: 2,
        }}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            fontWeight: 500,
            color: 'var(--orange)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            lineHeight: 1.6,
            width: isMobile ? '100%' : '100px',
            textAlign: isMobile ? 'center' : 'left',
          }}>
            Our Prestigious Clients
          </p>
        </div>

        {/* Scrolling marquee area */}
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          {/* Right fade mask */}
          <div style={{
            position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px',
            background: 'linear-gradient(to left, var(--bg), transparent)',
            zIndex: 1, pointerEvents: 'none',
          }} />

          <div className="logo-strip-track">
            {doubled.map((src, i) => <LogoCard key={i} src={src} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── GLOBAL PRESENCE ───────────────────────────────────────────────────────────

function GlobalPresenceSection() {
  const isMobile = useIsMobile();
  const [ref, vis] = useScrollObserver(0.08);
  const STATS = [
    { num:'15+', label:'STATES SERVED' },
    { num:'100+', label:'CITIES REACHED' },
    { num:'6+',  label:'EXPORT COUNTRIES' },
    { num:'18',  label:'YEARS OPERATING' },
  ];

  return (
    <section style={{ background:'var(--bg)', padding: isMobile ? '4rem 0' : '6rem 0', overflow:'hidden' }} ref={ref}>
      <div className="section-wrap">
        <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 3.5fr) minmax(0, 6.5fr)', gap: isMobile ? '2rem' : '4rem', alignItems:'center' }}>

          {/* ── Left: text + stats ── */}
          <div className={`fade-up${vis?' vis':''}`}>
            <span className="overline" style={{ color:'var(--orange)', letterSpacing:'0.2em' }}>OUR REACH</span>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(2.8rem,5vw,5rem)', lineHeight:1, color:'var(--navy)', margin:'0.5rem 0 0' }}>
              OUR GLOBAL
            </h2>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(2.8rem,5vw,5rem)', lineHeight:1, color:'var(--orange)', marginBottom:'1.75rem' }}>
              PRESENCE
            </h2>
            <p style={{ color:'var(--gray)', fontSize:'clamp(0.88rem,1.2vw,1rem)', lineHeight:1.8, maxWidth:440, marginBottom:'2.5rem' }}>
              From our manufacturing base in Karnal, Haryana, GoMax products reach construction sites across 15+ Indian states and international export markets.
            </p>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0' }}>
              {STATS.map((s) => (
                <div key={s.label} style={{ borderLeft:'2px solid rgba(232,82,26,0.5)', paddingLeft:'1.25rem', paddingBottom:'1.75rem' }}>
                  <div style={{ fontFamily:'var(--font-display)', fontSize:'clamp(2rem,3.5vw,2.75rem)', color:'var(--navy)', lineHeight:1 }}>{s.num}</div>
                  <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.65rem', color:'var(--gray)', letterSpacing:'0.15em', marginTop:'0.35rem' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: world map ── */}
          <div className={`fade-up${vis?' vis':''}`} style={{ transitionDelay:'0.15s' }}>
            <WorldMap />
          </div>

        </div>
      </div>
    </section>
  );
}

// ── TESTIMONIALS ──────────────────────────────────────────────────────────────
function TestimonialsSection() {
  const [ref, vis] = useScrollObserver(0.1);
  const doubled = [...REVIEWS, ...REVIEWS];
  return (
    <section style={{ padding:'6rem 0', background:'var(--bg)', overflow:'hidden' }} ref={ref}>
      <div className="section-wrap" style={{ marginBottom:'3rem' }}>
        <div className={`fade-up${vis?' vis':''}`} style={{ textAlign:'center' }}>
          <span className="overline">Social Proof</span>
          <h2 className={`section-h2 title-line${vis?' vis':''}`} style={{ color:'var(--navy)', display:'inline-block' }}>What Our Customers Say</h2>
          <p className="mono" style={{ fontSize:'0.8rem', color:'var(--gray)', marginTop:'0.75rem' }}>43 verified Google reviews · 5-star average</p>
        </div>
      </div>
      <div className="marquee-row"><div className="marquee-track left">{doubled.map((r,i) => <ReviewCard key={i} r={r}/>)}</div></div>
    </section>
  );
}

function ReviewCard({ r }) {
  return (
    <div className="review-card">
      <div className="review-stars">{'★'.repeat(r.stars)}</div>
      <p className="review-text">"{r.text}"</p>
      <div className="review-author">{r.name}</div>
      <div className="review-badge">
        <svg width="10" height="10" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
        Google Review
      </div>
    </div>
  );
}

// ── HOME PAGE ─────────────────────────────────────────────────────────────────
function HomePage({ navigate }) {
  return <>
    <HeroSection navigate={navigate} />
    <LogoStrip />
    <SolutionsSection navigate={navigate} />
    <StandardsBand />
    <GlobalPresenceSection />
    <TestimonialsSection />
  </>;
}

export { HomePage };
