"use client";

import { useState, useEffect } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

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
        padding: scrolled ? '16px 48px' : '28px 48px',
        background: scrolled ? 'rgba(255,255,255,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--glass-border)' : 'none',
        transition: 'all 0.4s ease'
      }}
    >
      <a href="/" className="nav-logo" style={{ display: 'flex', alignItems: 'center' }}>
        <img src="/assets/img/logo.png" alt="Ruta Escondida" className="logo-img" style={{ height: '50px' }} />
      </a>

      <ul className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '30px', listStyle: 'none', margin: 0, padding: 0 }}>
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
          <a href="/#tienda" style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '.15em', textTransform: 'uppercase', textDecoration: 'none', color: scrolled ? 'var(--verde-andes)' : '#fff' }}>
            Tienda
          </a>
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
            Negocios
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

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <a href="/login" style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '.1em', textTransform: 'uppercase', textDecoration: 'none', color: scrolled ? 'var(--verde-andes)' : '#fff' }}>
          SaaS LogIn
        </a>
        <a href="/negocios" className="btn-cta" style={{ border: '1px solid var(--oro)', padding: '10px 22px', fontSize: '10px', fontWeight: '600', letterSpacing: '.25em', textTransform: 'uppercase', color: varColor(scrolled), textDecoration: 'none', background: 'transparent' }}>
          Reservar
        </a>
      </div>
    </nav>
  );
}

function varColor(scrolled) {
  return scrolled ? 'var(--verde-andes)' : 'var(--oro)';
}
