"use client";

import { useState, useEffect } from 'react';

export default function Header({ cartCount = 0, onCartClick = null }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav 
        id="main-nav" 
        className={scrolled ? 'scrolled' : ''} 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: scrolled ? '12px 24px' : '20px 24px',
          background: scrolled || mobileMenuOpen ? 'rgba(255,255,255,0.98)' : 'transparent',
          backdropFilter: scrolled || mobileMenuOpen ? 'blur(20px)' : 'none',
          borderBottom: scrolled || mobileMenuOpen ? '1px solid var(--glass-border)' : 'none',
          transition: 'all 0.4s ease'
        }}
      >
        <a href="/" className="nav-logo" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/assets/img/logo.png" alt="Ruta Escondida" className="logo-img" style={{ height: '40px' }} />
        </a>

        {/* Desktop Links */}
        <ul className="nav-links-desktop-list" style={{ display: 'flex', alignItems: 'center', gap: '24px', listStyle: 'none', margin: 0, padding: 0 }}>
          <li className="nav-dropdown" style={{ position: 'relative' }}>
            <a href="/#turismo" style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '.15em', textTransform: 'uppercase', textDecoration: 'none', color: scrolled ? 'var(--verde-andes)' : '#fff' }}>
              Turismo de Inmersión
            </a>
            <div className="dropdown-menu">
              <a href="/gigante-dormido">El Gigante Dormido</a>
              <a href="/sendero-agua">El Sendero del Agua</a>
              <a href="/tayos">Encañonado de los Tayos</a>
            </div>
          </li>
          <li>
            <a href="/salidas-pedagogicas" style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '.15em', textTransform: 'uppercase', textDecoration: 'none', color: scrolled ? 'var(--verde-andes)' : '#fff' }}>
              Salidas Pedagógicas
            </a>
          </li>
          <li>
            <a href="/galeria" style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '.15em', textTransform: 'uppercase', textDecoration: 'none', color: scrolled ? 'var(--verde-andes)' : '#fff' }}>
              Galería
            </a>
          </li>
          <li>
            <a href="/blog" style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '.15em', textTransform: 'uppercase', textDecoration: 'none', color: scrolled ? 'var(--verde-andes)' : '#fff' }}>
              Blog
            </a>
          </li>
          <li className="nav-dropdown" style={{ position: 'relative' }}>
            <a href="/negocios" style={{ fontSize: '10px', fontWeight: 'bold', letterSpacing: '.15em', textTransform: 'uppercase', textDecoration: 'none', color: scrolled ? 'var(--verde-medio)' : '#fff' }}>
              Marketplace
            </a>
            <div className="dropdown-menu">
              <a href="/negocios">Ver Todo</a>
              <a href="/negocios?parish=Puéllaro">Puéllaro</a>
              <a href="/negocios?parish=Perucho">Perucho</a>
              <a href="/negocios?parish=Chavezpamba">Chavezpamba</a>
              <a href="/negocios?parish=Atahualpa">Atahualpa</a>
              <a href="/negocios?parish=Minas">Minas</a>
            </div>
          </li>
        </ul>

        {/* Right Buttons / Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }} className="nav-right-actions">
          {onCartClick && (
            <button 
              onClick={onCartClick} 
              aria-label="Ver Carrito"
              style={{ 
                background: 'transparent', 
                border: 'none', 
                color: scrolled || mobileMenuOpen ? 'var(--verde-andes)' : '#fff', 
                cursor: 'pointer', 
                fontSize: '18px', 
                position: 'relative',
                marginRight: '5px'
              }}
            >
              <i className="fa-solid fa-shopping-cart"></i>
              {cartCount > 0 && (
                <span style={{ position: 'absolute', top: '-10px', right: '-10px', background: '#ff4d4d', color: '#fff', fontSize: '10px', borderRadius: '50%', padding: '2px 6px', fontWeight: 'bold' }}>
                  {cartCount}
                </span>
              )}
            </button>
          )}

          <a href="/negocios" className="btn-cta-desktop" style={{ border: '1px solid var(--oro)', padding: '8px 16px', fontSize: '9px', fontWeight: '600', letterSpacing: '.25em', textTransform: 'uppercase', color: scrolled ? 'var(--verde-andes)' : 'var(--oro)', textDecoration: 'none', background: 'transparent' }}>
            Reservar
          </a>
          
          {/* Hamburger Icon */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menú móvil"
            style={{
              background: 'transparent',
              border: 'none',
              color: scrolled || mobileMenuOpen ? 'var(--verde-andes)' : '#fff',
              fontSize: '22px',
              cursor: 'pointer',
              display: 'none',
              padding: '4px'
            }}
            className="mobile-menu-btn"
          >
            <i className={mobileMenuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '64px',
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(255,255,255,0.98)',
          zIndex: 99,
          display: 'flex',
          flexDirection: 'column',
          padding: '30px 24px',
          gap: '20px',
          overflowY: 'auto',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid rgba(27,67,50,0.1)'
        }} className="mobile-drawer">
          <a href="/" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--verde-andes)' }}>Inicio</a>
          <a href="/negocios" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--verde-medio)' }}>Directorio de Negocios</a>
          
          <div style={{ paddingLeft: '15px', display: 'flex', flexDirection: 'column', gap: '10px', borderLeft: '2px solid var(--oro)' }}>
            <a href="/gigante-dormido" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '13px', color: 'var(--texto)' }}>El Gigante Dormido</a>
            <a href="/sendero-agua" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '13px', color: 'var(--texto)' }}>El Sendero del Agua</a>
            <a href="/tayos" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '13px', color: 'var(--texto)' }}>Encañonado de los Tayos</a>
          </div>

          <a href="/salidas-pedagogicas" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--verde-andes)' }}>Salidas Pedagógicas</a>
          <a href="/galeria" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--verde-andes)' }}>Galería de Fotos</a>
          <a href="/blog" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--verde-andes)' }}>Blog de Aventura</a>
          
          
          {onCartClick && (
            <button 
              onClick={() => { setMobileMenuOpen(false); onCartClick(); }} 
              style={{ 
                background: 'var(--verde-medio)', 
                color: '#fff', 
                border: 'none', 
                padding: '12px', 
                borderRadius: '6px', 
                fontWeight: 'bold', 
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '10px'
              }}
            >
              <span>🛒 Ver Carrito</span>
              <span>{cartCount} items</span>
            </button>
          )}
        </div>
      )}
      
      <style jsx global>{`
        .mobile-menu-btn {
          display: none !important;
        }
        @media (max-width: 1024px) {
          .nav-links-desktop-list {
            display: none !important;
          }
          .login-link-desktop, .btn-cta-desktop {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}
