// ─── CONTACT PAGE ─────────────────────────────────────────────────────────────
import React, { useState } from 'react';
import { PRODUCTS } from './data.jsx';
import { useScrollObserver, useIsMobile } from './shared.jsx';

const INP = {
  width: '100%', padding: '0.875rem 1rem',
  border: '1.5px solid var(--gray-light)', background: 'white',
  fontFamily: 'inherit', fontSize: '0.875rem', color: 'var(--charcoal)',
  outline: 'none', borderRadius: '4px', transition: 'border-color .2s',
  boxSizing: 'border-box',
};

const FOCUS = e => { e.target.style.borderColor = 'var(--orange)'; };
const BLUR  = e => { e.target.style.borderColor = 'var(--gray-light)'; };

const INFO_ROWS = [
  {
    label: 'Location',
    value: 'Vijay Nagar, Dyal Singh Colony, Karnal, Haryana 132001',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
  {
    label: 'Phone',
    value: '+91 92158 44410',
    href: 'tel:+919215844410',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.62 19.79 19.79 0 01.01 6.08 2 2 0 012 3.92l3-.01c.96 0 1.78.72 1.9 1.67.12.94.36 1.87.71 2.74a2 2 0 01-.45 2.11L6.09 11.5a16 16 0 006.41 6.41l1.07-1.07a2 2 0 012.11-.45c.87.35 1.8.59 2.74.71a2 2 0 011.68 1.92z"/>
      </svg>
    ),
  },
  {
    label: 'Email',
    value: 'info@gomaxindustries.com',
    href: 'mailto:info@gomaxindustries.com',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
];

const CONTACT_CARDS = [
  {
    href: 'tel:+919215844410',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.62 19.79 19.79 0 01.01 6.08 2 2 0 012 3.92l3-.01c.96 0 1.78.72 1.9 1.67.12.94.36 1.87.71 2.74a2 2 0 01-.45 2.11L6.09 11.5a16 16 0 006.41 6.41l1.07-1.07a2 2 0 012.11-.45c.87.35 1.8.59 2.74.71a2 2 0 011.68 1.92z"/></svg>,
    title: 'Call Us', detail: '+91 92158 44410', sub: 'Mon–Sat, 9am–6pm',
  },
  {
    href: 'https://wa.me/919215844410', target: '_blank',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a6.13 6.13 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
    title: 'WhatsApp', detail: 'Chat Instantly', sub: 'Usually within 1 hour',
  },
  {
    href: 'mailto:info@gomaxindustries.com',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    title: 'Email', detail: 'info@gomaxindustries.com', sub: 'Detailed enquiries',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    title: 'Location', detail: 'Vijay Nagar, Dyal Singh Colony', sub: 'Karnal, Haryana 132001',
  },
];

function ContactPage() {
  const [form, setForm] = useState({ name:'', phone:'', email:'', city:'', product:'', message:'' });
  const [sent, setSent] = useState(false);
  const [ref, vis] = useScrollObserver(0.05);
  const isMobile = useIsMobile();

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const submit = (e) => { e.preventDefault(); setSent(true); };

  return (
    <div style={{ background: 'var(--bg)', paddingTop: '7rem', paddingBottom: '5rem' }}>
      <div className="section-wrap" ref={ref}>

        {/* ── Heading above the layout ── */}
        <div className={`fade-up${vis ? ' vis' : ''}`} style={{ marginBottom: '1.25rem' }}>
          <h2 className="bebas" style={{
            color: 'var(--navy)', fontSize: 'clamp(1.8rem, 2.8vw, 2.5rem)',
            letterSpacing: '0.04em', lineHeight: 1, marginBottom: '0.55rem',
          }}>LET'S START A CONVERSATION</h2>
          <div style={{ width: 48, height: 3, background: 'var(--orange)' }} />
        </div>

        {/* ── Hero: overlapping layout ── */}
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'stretch' : 'center', marginBottom: isMobile ? '3rem' : '5rem' }}>

          {/* Navy info card — overlaps the form card via negative right margin */}
          <div
            className={`fade-up${vis ? ' vis' : ''}`}
            style={{
              flexShrink: 0,
              width: isMobile ? '100%' : '43%',
              background: 'var(--navy)',
              borderRadius: '16px',
              padding: isMobile ? '2rem 1.5rem' : '2rem 3rem',
              position: 'relative',
              zIndex: 2,
              marginRight: isMobile ? 0 : '-4.5rem',
              marginBottom: isMobile ? '1.5rem' : 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <span className="mono" style={{
              color: 'var(--orange)', fontSize: '0.65rem', letterSpacing: '0.18em',
              textTransform: 'uppercase', display: 'block', marginBottom: '1rem',
            }}>WE'RE HERE TO HELP</span>

            <h1 className="bebas" style={{
              color: 'white', fontSize: 'clamp(2.8rem, 4.5vw, 4rem)',
              lineHeight: 1, marginBottom: '2.5rem', letterSpacing: '0.03em',
            }}>GET IN TOUCH</h1>

            {INFO_ROWS.map(({ label, value, href, icon }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem', marginBottom: '1.25rem' }}>
                {/* Icon circle */}
                <div style={{
                  width: 32, height: 32, borderRadius: '6px',
                  background: 'rgba(232,82,26,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, marginTop: '1px',
                }}>
                  {icon}
                </div>
                <div>
                  <span className="mono" style={{
                    color: 'var(--orange)', fontSize: '0.6rem', letterSpacing: '0.14em',
                    textTransform: 'uppercase', display: 'block', marginBottom: '0.15rem',
                  }}>{label}</span>
                  {href
                    ? <a href={href} style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.85rem', lineHeight: 1.55, textDecoration: 'none' }}>{value}</a>
                    : <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.85rem', lineHeight: 1.55 }}>{value}</span>
                  }
                </div>
              </div>
            ))}
          </div>

          {/* Form area */}
          <div
            className={`fade-up${vis ? ' vis' : ''}`}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', transitionDelay: '0.1s', minWidth: 0 }}
          >
            {/* White form card */}
            {sent ? (
              <div style={{
                flex: 1, background: 'white', border: '1px solid var(--gray-light)',
                borderRadius: '12px', padding: isMobile ? '2rem 1.5rem' : '3rem 2.5rem 3rem 6.5rem',
                textAlign: 'center', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{ width: 64, height: 64, background: 'rgba(232,82,26,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3 style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '1.35rem', marginBottom: '0.75rem' }}>Message Sent!</h3>
                <p style={{ color: 'var(--gray)', lineHeight: 1.7, maxWidth: '360px' }}>Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                <button className="btn btn-primary" style={{ marginTop: '1.5rem' }} onClick={() => setSent(false)}>Send Another</button>
              </div>
            ) : (
              <form
                onSubmit={submit}
                style={{
                  flex: 1, background: 'white', border: '1px solid var(--gray-light)',
                  borderRadius: '12px', padding: isMobile ? '1.5rem' : '2.5rem 2.5rem 2.5rem 6.5rem',
                  display: 'flex', flexDirection: 'column', gap: '1rem',
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1rem' }}>
                  <input style={INP} type="text" placeholder="Full Name *" value={form.name} onChange={e => set('name', e.target.value)} required onFocus={FOCUS} onBlur={BLUR} />
                  <input style={INP} type="tel" placeholder="Phone Number *" value={form.phone} onChange={e => set('phone', e.target.value)} required onFocus={FOCUS} onBlur={BLUR} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1rem' }}>
                  <input style={INP} type="email" placeholder="Email Address *" value={form.email} onChange={e => set('email', e.target.value)} required onFocus={FOCUS} onBlur={BLUR} />
                  <input style={INP} type="text" placeholder="City / State" value={form.city} onChange={e => set('city', e.target.value)} onFocus={FOCUS} onBlur={BLUR} />
                </div>
                <select style={{ ...INP, cursor: 'pointer', appearance: 'none' }} value={form.product} onChange={e => set('product', e.target.value)} onFocus={FOCUS} onBlur={BLUR}>
                  <option value="">Product Interest</option>
                  {PRODUCTS.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                  <option value="General Enquiry">General Enquiry</option>
                </select>
                <textarea style={{ ...INP, resize: 'none', height: '120px', display: 'block' }} placeholder="Your Message" rows={4} value={form.message} onChange={e => set('message', e.target.value)} onFocus={FOCUS} onBlur={BLUR} />
                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1rem 1.5rem', fontSize: '0.9rem', letterSpacing: '0.06em', marginTop: '0.25rem' }}>
                  Send Message &nbsp;→
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ── Bottom 4-column contact cards ── */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: '1.25rem' }}>
          {CONTACT_CARDS.map(({ href, target, icon, title, detail, sub }, i) => {
            const inner = (
              <>
                <div style={{ marginBottom: '1rem' }}>{icon}</div>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--navy)', marginBottom: '0.35rem' }}>{title}</div>
                <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--orange)', marginBottom: '0.25rem', wordBreak: 'break-all' }}>{detail}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--gray)' }}>{sub}</div>
              </>
            );
            const cardStyle = {
              background: 'white', border: '1px solid var(--gray-light)', borderRadius: '12px',
              padding: '1.75rem', display: 'block', textDecoration: 'none',
              transition: 'box-shadow .25s, border-color .25s',
            };
            return href ? (
              <a key={title} href={href} target={target} rel={target ? 'noopener' : undefined}
                className={`fade-up${vis ? ' vis' : ''}`} style={{ ...cardStyle, transitionDelay: `${i * 0.08}s` }}
                onMouseOver={e => { e.currentTarget.style.boxShadow = '0 8px 28px rgba(13,27,42,.1)'; e.currentTarget.style.borderColor = 'var(--orange)'; }}
                onMouseOut={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'var(--gray-light)'; }}>
                {inner}
              </a>
            ) : (
              <div key={title} className={`fade-up${vis ? ' vis' : ''}`} style={{ ...cardStyle, transitionDelay: `${i * 0.08}s` }}>
                {inner}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

export { ContactPage };
