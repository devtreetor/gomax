// ─── CONTACT PAGE ─────────────────────────────────────────────────────────────
import React, { useState } from 'react';
import { PRODUCTS } from './data.jsx';
import { useScrollObserver, PageHero } from './shared.jsx';

function ContactPage() {
  const [form, setForm] = useState({ name:'', phone:'', email:'', city:'', product:'', message:'' });
  const [sent, setSent] = useState(false);
  const [ref, vis] = useScrollObserver(0.05);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div>
      <PageHero title="Get in Touch" sub="We're Here to Help" image="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1920&q=80" page="contact" />

      <section style={{ background:'var(--bg)', padding:'5rem 0' }}>
        <div className="section-wrap" ref={ref}>

          {/* Form — full width, comfortable max-width */}
          <div className={`fade-up${vis?' vis':''}`} style={{ maxWidth:'760px' }}>
            <div style={{ marginBottom:'2.5rem' }}>
              <span className="overline">Send a Message</span>
              <h2 className={`section-h2 title-line${vis?' vis':''}`} style={{ color:'var(--navy)' }}>Let's Start a Conversation</h2>
            </div>

            {sent ? (
              <div style={{ background:'white', border:'1px solid var(--gray-light)', padding:'3rem', textAlign:'center' }}>
                <div style={{ width:64, height:64, background:'rgba(232,82,26,0.1)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 1.5rem' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3 style={{ fontWeight:700, color:'var(--navy)', fontSize:'1.35rem', marginBottom:'0.75rem' }}>Message Sent!</h3>
                <p style={{ color:'var(--gray)', lineHeight:1.7 }}>Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                <button className="btn btn-primary" style={{ marginTop:'1.5rem' }} onClick={() => setSent(false)}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={submit} style={{ background:'white', border:'1px solid var(--gray-light)', padding:'2.5rem' }}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem' }}>
                  <div className="form-group">
                    <input className="form-input" type="text" placeholder=" " value={form.name} onChange={e => set('name', e.target.value)} required />
                    <label className="form-label">Full Name *</label>
                  </div>
                  <div className="form-group">
                    <input className="form-input" type="tel" placeholder=" " value={form.phone} onChange={e => set('phone', e.target.value)} required />
                    <label className="form-label">Phone Number *</label>
                  </div>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem' }}>
                  <div className="form-group">
                    <input className="form-input" type="email" placeholder=" " value={form.email} onChange={e => set('email', e.target.value)} required />
                    <label className="form-label">Email Address *</label>
                  </div>
                  <div className="form-group">
                    <input className="form-input" type="text" placeholder=" " value={form.city} onChange={e => set('city', e.target.value)} />
                    <label className="form-label">City / State</label>
                  </div>
                </div>
                <div className="form-group">
                  <select className="form-select" value={form.product} onChange={e => set('product', e.target.value)} style={{ paddingTop:'1.25rem', paddingBottom:'0.75rem' }}>
                    <option value="">Product Interest</option>
                    {PRODUCTS.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                    <option value="General Enquiry">General Enquiry</option>
                  </select>
                </div>
                <div className="form-group">
                  <textarea className="form-textarea" placeholder=" " rows={5} value={form.message} onChange={e => set('message', e.target.value)}></textarea>
                  <label className="form-label">Your Message</label>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width:'100%', justifyContent:'center' }}>
                  Send Message
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </form>
            )}
          </div>

          {/* Quick action cards */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.5rem', marginTop:'3rem' }}>
            {[
              { icon:<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.62 19.79 19.79 0 01.01 6.08 2 2 0 012 3.92l3-.01c.96 0 1.78.72 1.9 1.67.12.94.36 1.87.71 2.74a2 2 0 01-.45 2.11L6.09 11.5a16 16 0 006.41 6.41l1.07-1.07a2 2 0 012.11-.45c.87.35 1.8.59 2.74.71a2 2 0 011.68 1.92z"/></svg>, title:"Call Us", detail:"+91 92158 44410", sub:"Mon–Sat, 9am–6pm", href:"tel:+919215844410" },
              { icon:<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="1.5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a6.13 6.13 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487"/></svg>, title:"WhatsApp", detail:"Chat Instantly", sub:"Usually within 1 hour", href:"https://wa.me/919215844410" },
              { icon:<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, title:"Email", detail:"info@gomaxindustries.com", sub:"Detailed enquiries", href:"mailto:info@gomaxindustries.com" },
            ].map((c, i) => (
              <a key={c.title} href={c.href} target="_blank" rel="noopener" className={`serve-card fade-up${vis?' vis':''}`} style={{ transitionDelay:`${i*0.1+0.1}s`, textDecoration:'none', display:'block' }}>
                <div style={{ marginBottom:'1rem' }}>{c.icon}</div>
                <div className="serve-title">{c.title}</div>
                <div className="mono" style={{ fontSize:'0.78rem', color:'var(--orange)', margin:'0.25rem 0' }}>{c.detail}</div>
                <div className="serve-desc">{c.sub}</div>
              </a>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}

export { ContactPage };
