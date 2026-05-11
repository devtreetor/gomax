// ─── PRODUCTS PAGE + PRODUCT DETAIL ──────────────────────────────────────────
import React, { useState } from 'react';
import { PRODUCTS } from './data.jsx';
import { useScrollObserver, PageHero, ProductCard } from './shared.jsx';

function ProductsPage({ navigate }) {
  const [filter, setFilter] = useState('all');
  const [ref, vis] = useScrollObserver(0.05);
  const CATS = [['all','All'],['tile-adhesive','Tile Adhesive'],['epoxy','Epoxy Grout'],['sealant','Sealant'],['cleaner','Cleaner'],['additive','Additive']];
  const filtered = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat === filter);

  return (
    <div>
      <PageHero title="Our Product Range" sub="9 Premium Construction Chemicals" image="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80" page="products" />
      <section style={{ background:'var(--bg)', padding:'5rem 0' }}>
        <div className="section-wrap" ref={ref}>
          <div className={`fade-up${vis?' vis':''}`}>
            <span className="overline">EN 12004 Classified</span>
            <h2 className={`section-h2 title-line${vis?' vis':''}`} style={{ color:'var(--navy)', marginBottom:'2rem' }}>Every Surface. Every Application.</h2>
          </div>
          <div className="filter-tabs">
            {CATS.map(([v,l]) => (
              <button key={v} className={`filter-tab${filter===v?' active':''}`} onClick={() => setFilter(v)}>{l}</button>
            ))}
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'1.25rem' }}>
            {filtered.map((p, i) => (
              <div key={p.id} className={`fade-up${vis?' vis':''}`} style={{ transitionDelay:`${i*0.07}s` }}>
                <ProductCard p={p} onClick={() => navigate('product-detail', p)} />
              </div>
            ))}
          </div>
          <div style={{ marginTop:'3rem', padding:'1.5rem 2rem', background:'white', border:'1px solid var(--gray-light)', display:'flex', alignItems:'center', gap:'1rem', flexWrap:'wrap' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span className="mono" style={{ fontSize:'0.78rem', color:'var(--gray)' }}>All cementitious adhesives classified per <strong style={{color:'var(--navy)'}}>EN 12004</strong> and <strong style={{color:'var(--navy)'}}>IS 15477:2019</strong>. Technical Data Sheets available on request — contact us for project specifications.</span>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── PRODUCT DETAIL ────────────────────────────────────────────────────────────
function ProductDetailPage({ product, navigate }) {
  const [ref, vis] = useScrollObserver(0.1);
  const related = PRODUCTS.filter(p => p.id !== product.id && (p.cat === product.cat)).slice(0,3);
  const allRelated = related.length < 3 ? [...related, ...PRODUCTS.filter(p => p.id !== product.id && !related.includes(p))].slice(0,3) : related;

  const ZONE_LABELS = { floors:"Floors", walls:"Walls", indoor:"Indoor", outdoor:"Outdoor", pools:"Swimming Pools", kitchens:"Kitchens" };
  const ZONE_ICONS = {
    floors: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 17l3-12h12l3 12"/><line x1="3" y1="17" x2="21" y2="17"/></svg>,
    walls: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 9h18M3 15h18M9 3v18"/></svg>,
    indoor: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>,
    outdoor: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>,
    pools: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 12h20M2 18c1.5 0 3-1 4.5-1s3 1 4.5 1 3-1 4.5-1S18.5 18 20 18"/><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/></svg>,
    kitchens: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg>,
  };

  return (
    <div>
      <div style={{ background:'var(--navy)', padding:'5rem 0 0' }}>
        <div className="section-wrap">
          <div className="breadcrumb">
            <a href="#" onClick={e=>{e.preventDefault();navigate('home');}}>Home</a>
            <span>›</span>
            <a href="#" onClick={e=>{e.preventDefault();navigate('products');}}>Products</a>
            <span>›</span>
            <span style={{color:'white'}}>{product.name}</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem', paddingBottom:'5rem', alignItems:'start' }}>
            <div style={{
              height: 480, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '4px', padding: '2rem',
            }}>
              <img
                src={product.cutout}
                alt={product.name}
                style={{
                  maxWidth: '100%', maxHeight: '100%', objectFit: 'contain',
                  filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.45))',
                }}
              />
            </div>
            <div>
              {product.en !== '—' && (
                <div className="mono" style={{ fontSize:'1rem', color:'var(--orange)', letterSpacing:'0.1em', marginBottom:'0.75rem', fontWeight:500 }}>EN {product.en}</div>
              )}
              <h1 style={{ fontFamily:'var(--font-body)', fontWeight:800, fontSize:'clamp(2.5rem,5vw,4.5rem)', color:'white', letterSpacing:'-0.01em', lineHeight:1.05, marginBottom:'1.25rem', textTransform:'uppercase' }}>{product.name}</h1>
              <p style={{ color:'rgba(255,255,255,0.65)', lineHeight:1.75, marginBottom:'2rem', fontSize:'0.95rem' }}>{product.fullDesc}</p>
              <div style={{ border:'1px solid rgba(255,255,255,0.1)', marginBottom:'2rem' }}>
                {Object.entries(product.specs).map(([k,v]) => (
                  <div key={k} style={{ display:'flex', borderBottom:'1px solid rgba(255,255,255,0.07)', padding:'0.75rem 1rem' }}>
                    <span className="mono" style={{ fontSize:'0.72rem', color:'rgba(255,255,255,0.4)', width:140, flexShrink:0, textTransform:'capitalize' }}>{k.replace(/([A-Z])/g,' $1').trim()}</span>
                    <span className="mono" style={{ fontSize:'0.8rem', color:'rgba(255,255,255,0.8)' }}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
                <button className="btn btn-primary" onClick={() => navigate('contact')}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.62 19.79 19.79 0 01.01 6.08 2 2 0 012 3.92l3-.01"/></svg>
                  Get a Quote
                </button>
                <button className="btn btn-ghost">Download TDS</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section style={{ background:'var(--bg)', padding:'5rem 0' }} ref={ref}>
        <div className="section-wrap">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'3rem' }}>
            <div className={`fade-up${vis?' vis':''}`}>
              <span className="overline">Key Features</span>
              <h3 style={{ fontWeight:700, color:'var(--navy)', fontSize:'1.35rem', marginBottom:'1.5rem' }}>Product Capabilities</h3>
              <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
                {product.features.map((f,i) => (
                  <div key={i} style={{ display:'flex', gap:'0.75rem', alignItems:'flex-start' }}>
                    <div style={{ width:20, height:20, background:'rgba(232,82,26,0.1)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:'2px' }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <span style={{ fontSize:'0.9rem', color:'var(--charcoal)', lineHeight:1.6 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={`fade-up${vis?' vis':''}`} style={{ transitionDelay:'0.15s' }}>
              <span className="overline">Application Zones</span>
              <h3 style={{ fontWeight:700, color:'var(--navy)', fontSize:'1.35rem', marginBottom:'1.5rem' }}>Where to Use</h3>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
                {product.zones.map(z => (
                  <div key={z} style={{ border:'1px solid var(--gray-light)', padding:'1.25rem', display:'flex', flexDirection:'column', alignItems:'center', gap:'0.75rem', textAlign:'center', background:'white' }}>
                    <span style={{ color:'var(--orange)' }}>{ZONE_ICONS[z]}</span>
                    <span style={{ fontWeight:600, fontSize:'0.85rem', color:'var(--navy)' }}>{ZONE_LABELS[z]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginTop:'4rem' }}>
            <span className="overline">Also Consider</span>
            <h3 style={{ fontWeight:700, color:'var(--navy)', fontSize:'1.35rem', marginBottom:'2rem' }}>Related Products</h3>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'1.5rem', alignItems:'stretch' }}>
              {allRelated.map(p => (
                <ProductCard key={p.id} p={p} onClick={() => navigate('product-detail', p)} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export { ProductsPage, ProductDetailPage };
