// ─── BLOG PAGE + ARTICLE ──────────────────────────────────────────────────────
import React from 'react';
import { BLOG_ARTICLES, PRODUCTS } from './data.jsx';
import { useScrollObserver, PageHero } from './shared.jsx';

function BlogPage({ navigate }) {
  const [ref, vis] = useScrollObserver(0.05);
  const [featured, ...rest] = BLOG_ARTICLES;

  return (
    <div>
      <PageHero title="Expert Insights" sub="The GoMax Knowledge Base" image="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80" page="blog" />
      <section style={{ background:'var(--bg)', padding:'5rem 0' }}>
        <div className="section-wrap" ref={ref}>
          <div className={`fade-up${vis?' vis':''}`} style={{ marginBottom:'3rem' }}>
            <span className="overline">Latest</span>
            <h2 className={`section-h2 title-line${vis?' vis':''}`} style={{ color:'var(--navy)' }}>From the GoMax Blog</h2>
          </div>

          {/* Featured article */}
          <div className={`fade-up${vis?' vis':''}`} style={{ transitionDelay:'0.1s', marginBottom:'3rem' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', background:'white', border:'1px solid var(--gray-light)', overflow:'hidden', cursor:'pointer', transition:'box-shadow 0.25s' }}
              onClick={() => navigate('blog-article', featured)}
              onMouseEnter={e => e.currentTarget.style.boxShadow='0 20px 48px rgba(13,27,42,0.1)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow='none'}>
              <div style={{ height:380, overflow:'hidden' }}>
                <img src={featured.image} alt={featured.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s' }}
                  onMouseEnter={e => e.currentTarget.style.transform='scale(1.04)'}
                  onMouseLeave={e => e.currentTarget.style.transform='scale(1)'} />
              </div>
              <div style={{ padding:'3rem', display:'flex', flexDirection:'column', justifyContent:'center' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'1rem' }}>
                  <span className="mono" style={{ fontSize:'0.72rem', color:'var(--orange)', letterSpacing:'0.08em' }}>{featured.dateShort}</span>
                  <span style={{ width:4, height:4, background:'var(--gray-light)', borderRadius:'50%', display:'inline-block' }} />
                  <span className="mono" style={{ fontSize:'0.72rem', color:'var(--gray)' }}>Featured Article</span>
                </div>
                <h2 style={{ fontWeight:700, fontSize:'1.5rem', color:'var(--navy)', lineHeight:1.25, marginBottom:'1rem' }}>{featured.title}</h2>
                <p style={{ color:'var(--gray)', lineHeight:1.7, fontSize:'0.9rem', marginBottom:'1.5rem' }}>{featured.excerpt}</p>
                <span style={{ display:'inline-flex', alignItems:'center', gap:'6px', fontWeight:600, color:'var(--orange)', fontSize:'0.875rem' }}>
                  Read Full Article
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </span>
              </div>
            </div>
          </div>

          {/* Other articles */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'1.5rem' }}>
            {rest.map((a, i) => (
              <div key={a.id} className={`blog-card fade-up${vis?' vis':''}`} style={{ transitionDelay:`${i*0.1+0.2}s` }} onClick={() => navigate('blog-article', a)}>
                <div className="blog-thumb" style={{ height:200 }}><img src={a.image} alt={a.title} /></div>
                <div className="blog-meta">
                  <div className="blog-date mono">{a.dateShort}</div>
                  <h3 className="blog-title">{a.title}</h3>
                  <p className="blog-excerpt">{a.excerpt}</p>
                  <span className="blog-link">Read More <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ── BLOG ARTICLE ──────────────────────────────────────────────────────────────
function BlogArticlePage({ article, navigate }) {
  const [ref, vis] = useScrollObserver(0.05);
  const related = PRODUCTS.filter(p => p.cat === 'tile-adhesive').slice(0,2);

  return (
    <div>
      <div style={{ background:'var(--navy)', padding:'5rem 0 0' }}>
        <div className="section-wrap">
          <div className="breadcrumb">
            <a href="#" onClick={e=>{e.preventDefault();navigate('home');}}>Home</a>
            <span>›</span>
            <a href="#" onClick={e=>{e.preventDefault();navigate('blog');}}>Blog</a>
            <span>›</span>
            <span style={{color:'white'}}>{article.title}</span>
          </div>
          <div style={{ maxWidth:800, paddingBottom:'4rem' }}>
            <span className="mono" style={{ fontSize:'0.75rem', color:'var(--orange)', letterSpacing:'0.1em' }}>{article.dateShort}</span>
            <h1 className="bebas" style={{ fontSize:'clamp(2.5rem,5vw,4rem)', color:'white', letterSpacing:'0.03em', lineHeight:1.05, margin:'1rem 0 1.5rem' }}>{article.title}</h1>
            <p style={{ color:'rgba(255,255,255,0.6)', fontSize:'1.05rem', lineHeight:1.7 }}>{article.excerpt}</p>
          </div>
        </div>
      </div>

      <div style={{ height:400, overflow:'hidden' }}>
        <img src={article.image} alt={article.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
      </div>

      <section style={{ background:'var(--bg)', padding:'5rem 0' }} ref={ref}>
        <div className="section-wrap">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 340px', gap:'4rem', alignItems:'start' }}>
            <div>
              {article.sections.map((s, i) => (
                <div key={i} className={`fade-up${vis?' vis':''}`} style={{ transitionDelay:`${i*0.07}s`, marginBottom:'2.5rem' }}>
                  <h3 style={{ fontWeight:700, fontSize:'1.2rem', color:'var(--navy)', marginBottom:'0.875rem', paddingLeft:'1rem', borderLeft:'3px solid var(--orange)' }}>{s.title}</h3>
                  <p style={{ color:'var(--gray)', lineHeight:1.85, fontSize:'0.95rem' }}>{s.body}</p>
                </div>
              ))}
              <div style={{ marginTop:'3rem', padding:'1.5rem 2rem', background:'white', border:'1px solid var(--gray-light)', borderLeft:'4px solid var(--orange)' }}>
                <p className="mono" style={{ fontSize:'0.75rem', color:'var(--orange)', marginBottom:'0.5rem', letterSpacing:'0.08em' }}>ABOUT THE AUTHOR</p>
                <p style={{ color:'var(--gray)', fontSize:'0.875rem', lineHeight:1.7 }}>This article was prepared by the GoMax Industries technical team, drawing on 18+ years of construction chemicals expertise and field applications across India.</p>
              </div>
            </div>

            <div style={{ position:'sticky', top:'5rem' }}>
              <div style={{ background:'white', border:'1px solid var(--gray-light)', padding:'1.75rem', marginBottom:'1.5rem' }}>
                <p style={{ fontWeight:700, color:'var(--navy)', marginBottom:'1.25rem', fontSize:'0.9rem' }}>Related Products</p>
                {related.map(p => (
                  <div key={p.id} style={{ display:'flex', gap:'1rem', alignItems:'center', padding:'0.875rem 0', borderBottom:'1px solid var(--gray-light)', cursor:'pointer' }}
                    onClick={() => navigate('product-detail', p)}>
                    <div style={{ width:52, height:52, borderRadius:'2px', overflow:'hidden', flexShrink:0 }}>
                      <img src={p.image} alt={p.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                    </div>
                    <div>
                      <div style={{ fontWeight:700, fontSize:'0.82rem', color:'var(--navy)' }}>{p.name}</div>
                      {p.en !== '—' && <div className="mono" style={{ fontSize:'0.68rem', color:'var(--orange)' }}>EN {p.en}</div>}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ background:'var(--navy)', padding:'1.75rem' }}>
                <p style={{ fontWeight:700, color:'white', marginBottom:'0.75rem', fontSize:'0.9rem' }}>Get Expert Advice</p>
                <p style={{ color:'rgba(255,255,255,0.55)', fontSize:'0.82rem', lineHeight:1.65, marginBottom:'1.25rem' }}>Need help choosing the right adhesive for your project? Our technical team is ready to help.</p>
                <button className="btn btn-primary" style={{ width:'100%', justifyContent:'center' }} onClick={() => navigate('contact')}>Contact Us</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export { BlogPage, BlogArticlePage };
