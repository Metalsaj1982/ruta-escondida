"use client";

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const videos = [
  { id: 'vid1', youtubeId: 'gvfop2Qo3sE', title: 'Ruta Escondida · Diego Ruiz H.', thumb: 'https://img.youtube.com/vi/gvfop2Qo3sE/maxresdefault.jpg', tag: '▶ YouTube' },
  { id: 'vid2', youtubeId: null, title: 'El Sendero del Agua · La Pequeña Cascada', thumb: '/assets/img/sendero_portada.jpg', tag: 'Próximamente' },
  { id: 'vid3', youtubeId: null, title: 'Encañonado de los Tayos · Aventura Subterránea', thumb: '/assets/img/tayos_cave.png', tag: 'Próximamente' }
];

const fotos = [
  { src: '/assets/img/sendero_agua_1.jpg', alt: 'Sendero del Agua — Alchipichí' },
  { src: '/assets/img/gigante_dormido_2.jpg', alt: 'El Gigante Dormido' },
  { src: '/assets/img/sendero_agua_4.jpg', alt: 'La Pequeña Cascada' },
  { src: '/assets/img/tayos_cave_2.jpg', alt: 'Encañonado de los Tayos' },
  { src: '/assets/img/sendero_agua_2.jpg', alt: 'Riachuelo en el sendero' },
  { src: '/assets/img/salidas_pedagogicas.png', alt: 'Salidas Pedagógicas' },
  { src: '/assets/img/sendero_agua_3.jpg', alt: 'Naturaleza Andina' },
  { src: '/assets/img/ruta_hero.png', alt: 'Ruta Escondida — Alchipichí' }
];

export default function Galeria() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const handleVideoClick = (video) => {
    if (video.youtubeId) {
      window.open(`https://www.youtube.com/watch?v=${video.youtubeId}`, '_blank');
    } else {
      setToastMessage(`🎬 Próximamente: "${video.title}" estará disponible muy pronto.`);
      setTimeout(() => setToastMessage(''), 3000);
    }
  };

  const handlePrev = () => {
    setLightboxIndex((prev) => (prev - 1 + fotos.length) % fotos.length);
  };

  const handleNext = () => {
    setLightboxIndex((prev) => (prev + 1) % fotos.length);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  return (
    <div style={{ background: 'var(--fondo)', color: 'var(--texto)', minHeight: '100vh', fontFamily: 'Outfit, sans-serif' }}>
      <Header />

      {/* HERO SECTION */}
      <section style={{
        position: 'relative',
        height: '50vh',
        background: 'linear-gradient(rgba(26,48,40,0.6), rgba(26,48,40,0.9)), url("/assets/img/hero.jpg") center/cover',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}>
        <div style={{ padding: '0 20px', zIndex: 1 }}>
          <span style={{ color: 'var(--oro)', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '15px' }}>
            ✦ ALCHIPICHÍ · ECUADOR
          </span>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: '#fff', fontWeight: '800', lineHeight: '1.1', marginBottom: '15px' }}>
            Galería Ruta Escondida
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '0 auto' }}>
            Cada fotografía es una invitación directa. Explora los paisajes andinos, las rutas, la gente y la biodiversidad que te esperan.
          </p>
        </div>
      </section>

      {/* 🎥 VIDEOS SECTION */}
      <section style={{ padding: '80px 48px', background: 'var(--crema)' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span style={{ color: 'var(--verde-medio)', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>Audiovisual</span>
          <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2.2rem', color: 'var(--verde-andes)' }}>Videos de la Expedición</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', maxWidth: '1200px', margin: '0 auto' }}>
          {videos.map(video => (
            <div 
              key={video.id}
              onClick={() => handleVideoClick(video)}
              style={{
                position: 'relative',
                aspectRatio: '16/9',
                background: '#000',
                borderRadius: '8px',
                overflow: 'hidden',
                cursor: 'pointer',
                border: '1px solid rgba(27,67,50,0.1)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
              }}
            >
              <img src={video.thumb} alt={video.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.65 }} />
              <span style={{ position: 'absolute', top: '12px', left: '12px', background: video.youtubeId ? '#FF0000' : 'var(--verde-medio)', color: '#fff', fontSize: '9px', fontWeight: 'bold', padding: '4px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                {video.tag}
              </span>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.2)',
                  border: '2px solid #fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '20px'
                }}>
                  ▶
                </div>
                <span style={{ fontSize: '11px', color: '#fff', textTransform: 'uppercase', fontWeight: 'bold', textAlign: 'center', padding: '0 15px' }}>
                  {video.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 📸 FOTOS SECTION */}
      <section style={{ padding: '80px 48px', background: 'var(--fondo)' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span style={{ color: 'var(--verde-medio)', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>Naturaleza Andina</span>
          <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2.2rem', color: 'var(--verde-andes)' }}>Galería de Fotos</h2>
        </div>

        <div style={{
          columnCount: 3,
          columnGap: '16px',
          maxWidth: '1200px',
          margin: '0 auto'
        }} className="masonry-grid">
          {fotos.map((foto, idx) => (
            <div 
              key={idx}
              onClick={() => setLightboxIndex(idx)}
              style={{
                breakInside: 'avoid',
                marginBottom: '16px',
                borderRadius: '8px',
                overflow: 'hidden',
                cursor: 'pointer',
                position: 'relative',
                border: '1px solid rgba(27,67,50,0.1)'
              }}
            >
              <img src={foto.src} alt={foto.alt} style={{ width: '100%', display: 'block', transition: 'transform 0.3s ease' }} />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(27,67,50,0.85) 0%, transparent 100%)',
                opacity: 0,
                display: 'flex',
                alignItems: 'flex-end',
                padding: '16px',
                color: '#fff',
                fontSize: '12px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                transition: 'opacity 0.3s ease'
              }}
              className="caption-overlay"
              >
                {foto.alt}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {lightboxIndex !== null && (
        <div 
          onClick={() => setLightboxIndex(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
        >
          <button 
            onClick={() => setLightboxIndex(null)}
            style={{ position: 'absolute', top: '20px', right: '25px', background: 'transparent', border: 'none', color: '#fff', fontSize: '30px', cursor: 'pointer' }}
          >
            ✕
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            style={{ position: 'absolute', left: '20px', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', fontSize: '30px', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer' }}
          >
            ‹
          </button>
          
          <img 
            src={fotos[lightboxIndex].src} 
            alt={fotos[lightboxIndex].alt} 
            style={{ maxWidth: '90vw', maxHeight: '80vh', objectFit: 'contain', borderRadius: '8px' }} 
            onClick={(e) => e.stopPropagation()}
          />
          
          <button 
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            style={{ position: 'absolute', right: '20px', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', fontSize: '30px', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer' }}
          >
            ›
          </button>

          <span style={{ position: 'absolute', bottom: '20px', color: 'rgba(255,255,255,0.6)', fontSize: '13px', letterSpacing: '1px' }}>
            {fotos[lightboxIndex].alt} ({lightboxIndex + 1} / {fotos.length})
          </span>
        </div>
      )}

      {/* TOAST WIDGET */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'var(--verde-andes)',
          borderLeft: '4px solid var(--oro)',
          color: '#fff',
          padding: '12px 24px',
          borderRadius: '4px',
          fontSize: '13.5px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
          zIndex: 99999
        }}>
          {toastMessage}
        </div>
      )}

      {/* Style tweaks for masonry hover */}
      <style jsx>{`
        .caption-overlay:hover, div:hover > .caption-overlay {
          opacity: 1 !important;
        }
      `}</style>

      <Footer />
    </div>
  );
}
