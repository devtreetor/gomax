// ─── APP ROUTER ───────────────────────────────────────────────────────────────
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { useTweaks, TweaksPanel, TweakSection, TweakColor, TweakText, TweakToggle } from './tweaks-panel.jsx';
import { ScrollBar, Cursor, Nav, Footer, FloatingWA } from './shared.jsx';
import { HomePage } from './home.jsx';
import { AboutPage } from './about.jsx';
import { ProductsPage, ProductDetailPage } from './products.jsx';
import { ContactPage } from './contact.jsx';

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentColor": "#E8521A",
  "heroText": "WHERE IMAGINATION MEETS ENGINEERING EXCELLENCE.",
  "showCursor": true,
  "bgColor": "#F7F4EF"
}/*EDITMODE-END*/;

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [pageKey, setPageKey] = useState(0);
  const curtainRef = useRef(null);
  const transitioning = useRef(false);
  const isFirst = useRef(true);

  const navigate = (page, data = null) => {
    if (transitioning.current) return;

    const swap = () => {
      setCurrentPage(page);
      setPageKey(k => k + 1);
      if (page === 'product-detail') setSelectedProduct(data);
      window.scrollTo({ top: 0 });
    };

    if (isFirst.current) { isFirst.current = false; swap(); return; }

    const curtain = curtainRef.current;
    if (!curtain) { swap(); return; }

    transitioning.current = true;
    curtain.className = 'phase-in';
    setTimeout(() => {
      swap();
      setTimeout(() => {
        curtain.className = 'phase-out';
        setTimeout(() => { curtain.className = ''; transitioning.current = false; }, 400);
      }, 180);
    }, 370);
  };

  useEffect(() => {
    window.navigate = navigate;
    document.documentElement.style.setProperty('--orange', TWEAK_DEFAULTS.accentColor);
    document.documentElement.style.setProperty('--bg', TWEAK_DEFAULTS.bgColor);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':    return <HomePage navigate={navigate} />;
      case 'about':   return <AboutPage navigate={navigate} />;
      case 'products': return <ProductsPage navigate={navigate} />;
      case 'product-detail': return selectedProduct ? <ProductDetailPage product={selectedProduct} navigate={navigate} /> : <ProductsPage navigate={navigate} />;
      case 'contact': return <ContactPage navigate={navigate} />;
      default:        return <HomePage navigate={navigate} />;
    }
  };

  return (
    <div style={{ minHeight:'100vh' }}>
      <div id="page-curtain" ref={curtainRef} />
      <ScrollBar />
      <Cursor />
      <Nav currentPage={currentPage} navigate={navigate} />
      <main key={pageKey}>
        {renderPage()}
      </main>
      <Footer navigate={navigate} />
      <FloatingWA />
      <TweaksSection />
    </div>
  );
}

function TweaksSection() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    document.documentElement.style.setProperty('--orange', tweaks.accentColor);
    document.documentElement.style.setProperty('--bg', tweaks.bgColor);
  }, [tweaks.accentColor, tweaks.bgColor]);

  return (
    <TweaksPanel>
      <TweakSection label="Brand">
        <TweakColor id="accentColor" label="Accent Color" value={tweaks.accentColor} onChange={v => setTweak('accentColor', v)} />
        <TweakColor id="bgColor" label="Background Tone" value={tweaks.bgColor} onChange={v => setTweak('bgColor', v)} />
      </TweakSection>
      <TweakSection label="Hero">
        <TweakText id="heroText" label="Hero Tagline" value={tweaks.heroText} onChange={v => setTweak('heroText', v)} />
        <TweakToggle id="showCursor" label="Custom Cursor" value={tweaks.showCursor} onChange={v => setTweak('showCursor', v)} />
      </TweakSection>
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
