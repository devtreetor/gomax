// ─── GALLERY PAGE ─────────────────────────────────────────────────────────────
import React, { useState } from 'react';
import { useScrollObserver, PageHero } from './shared.jsx';

function GalleryPage({ navigate }) {
  const [filter, setFilter] = useState('all');
  const [ref, vis] = useScrollObserver(0.05);

  const IMGS = [
    { url:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", cat:"residential", label:"Modern Residential Kitchen" },
    { url:"https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80", cat:"residential", label:"Premium Kitchen Tiles" },
    { url:"https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80", cat:"commercial", label:"Commercial Construction Site" },
    { url:"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80", cat:"residential", label:"Luxury Floor Installation" },
    { url:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", cat:"commercial", label:"Large Format Tile Project" },
    { url:"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80", cat:"industrial", label:"Industrial Foundation Work" },
    { url:"https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80", cat:"industrial", label:"Precision Engineering" },
    { url:"https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80", cat:"exterior", label:"Exterior Facade Cladding" },
    { url:"https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=600&q=80", cat:"exterior", label:"Outdoor Terrace Installation" },
    { url:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80", cat:"residential", label:"Residential Interior Tiles" },
    { url:"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80", cat:"commercial", label:"Bathroom Epoxy Grouting" },
    { url:"https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&q=80", cat:"exterior", label:"Balcony Waterproofing" },
  ];

  const CATS = [['all','All'],['residential','Residential'],['commercial','Commercial'],['industrial','Industrial'],['exterior','Exterior']];
  const filtered = filter === 'all' ? IMGS : IMGS.filter(i => i.cat === filter);

  return (
    <div>
      <PageHero title="Project Gallery" sub="GoMax in the Field" image="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80" page="gallery" />
      <section style={{ background:'var(--bg)', padding:'5rem 0' }}>
        <div className="section-wrap" ref={ref}>
          <div className={`fade-up${vis?' vis':''}`} style={{ marginBottom:'0.5rem' }}>
            <span className="overline">Our Work</span>
            <h2 className={`section-h2 title-line${vis?' vis':''}`} style={{ color:'var(--navy)' }}>GoMax on Real Projects</h2>
          </div>
          <div className="filter-tabs">
            {CATS.map(([v,l]) => (
              <button key={v} className={`filter-tab${filter===v?' active':''}`} onClick={() => setFilter(v)}>{l}</button>
            ))}
          </div>
          <div className="gallery-grid">
            {filtered.map((img, i) => (
              <div key={img.url+filter} className={`gallery-item fade-up${vis?' vis':''}`} style={{ transitionDelay:`${(i%6)*0.06}s` }}>
                <img src={img.url} alt={img.label} loading="lazy" />
                <div className="gallery-overlay">
                  <div>
                    <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.65rem', color:'rgba(255,255,255,0.5)', letterSpacing:'0.1em', marginBottom:'4px', textTransform:'uppercase' }}>{img.cat}</div>
                    <div className="gallery-label">{img.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop:'3rem', textAlign:'center' }}>
            <p style={{ color:'var(--gray)', fontSize:'0.9rem', marginBottom:'1rem' }}>Want your project featured?</p>
            <button className="btn btn-primary" onClick={() => navigate('contact')}>Contact Us →</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export { GalleryPage };
