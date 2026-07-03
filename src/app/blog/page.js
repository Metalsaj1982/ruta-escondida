"use client";

import Header from '../components/Header';
import Footer from '../components/Footer';

const articles = [
  {
    id: 'san-jose-minas',
    slug: '/blog/san-jose-minas',
    title: 'San José de Minas: Entre Cascadas Sagradas y Leyendas de Oro y Plata',
    excerpt: 'Explora el tesoro mejor guardado de la Ruta Escondida. Una guía definitiva por sus senderos ecológicos, cascadas cristalinas, rica historia agrícola y gastronomía local.',
    date: 'Junio 2026 · 9 min lectura',
    category: 'Ecoturismo e Historia',
    photo: '/assets/img/minas_landscape.png'
  },
  {
    id: 'sendero-agua',
    slug: '/blog/sendero-agua',
    title: 'El Sendero del Agua: La aventura familiar que Ecuador necesita',
    excerpt: 'Un riachuelo como sendero, una cascada como recompensa y la naturaleza andina como aula. Descubre por qué el Sendero del Agua se convierte en el plan de fin de semana favorito de las familias ecuatorianas.',
    date: 'Mayo 2026 · 8 min lectura',
    category: 'Turismo Familiar',
    photo: '/assets/img/sendero_agua_1.jpg'
  },
  {
    id: 'salidas-pedagogicas',
    slug: '/blog/salidas-pedagogicas',
    title: 'Salidas Pedagógicas en la Naturaleza: Por qué los niños aprenden mejor en el campo',
    excerpt: 'La educación desconectada de la tierra tiene un costo invisible. En Ruta Escondida llevamos a colegios y universidades a aprender agroecología, biodiversidad y conservación directamente en los Andes ecuatorianos.',
    date: 'Mayo 2026 · 11 min lectura',
    category: 'Educación Ambiental',
    photo: '/assets/img/salidas_pedagogicas.png'
  },
  {
    id: 'gigante-dormido',
    slug: '/blog/gigante-dormido',
    title: 'El Gigante Dormido: La cumbre andina que cambia perspectivas',
    excerpt: 'Conquistar El Campanario no es solo escalar una montaña — es redescubrir la escala de las cosas. Las vistas 360° de los Andes desde Alchipichí son de las más impresionantes cercanas a Quito.',
    date: 'Mayo 2026 · 9 min lectura',
    category: 'Senderismo',
    photo: '/assets/img/gigante_dormido_2.jpg'
  }
];

const tags = [
  'San José de Minas', 'Minas', 'ecoturismo', 'naturaleza', 'andes', 'Ecuador', 
  'familias', 'senderismo', 'agroecología', 'educación ambiental', 
  'turismo consciente', 'Alchipichí', 'cascadas', 'biodiversidad', 
  'colegios', 'aventura', 'Quito', 'montaña'
];

export default function BlogIndex() {
  return (
    <div style={{ background: 'var(--fondo)', color: 'var(--texto)', minHeight: '100vh', fontFamily: 'Outfit, sans-serif' }}>
      <Header />

      {/* HERO SECTION */}
      <section style={{
        position: 'relative',
        height: '50vh',
        background: 'linear-gradient(rgba(26,48,40,0.65), rgba(26,48,40,0.92)), url("/assets/img/hero.jpg") center/cover',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}>
        <div style={{ padding: '0 20px', zIndex: 1 }}>
          <span style={{ color: 'var(--oro)', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '15px' }}>
            ✦ ALCHIPICHÍ · 2.100 MSN · ECUADOR
          </span>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: '#fff', fontWeight: '800', lineHeight: '1.1', marginBottom: '15px' }}>
            Relatos, Naturaleza y Aventura
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.85)', maxWidth: '600px', margin: '0 auto' }}>
            Guías, reflexiones y anécdotas de ecoturismo andino. Escritos directamente desde el territorio por Diego Ruiz H., de Ruta Escondida.
          </p>
        </div>
      </section>

      {/* ARTICLES GRID */}
      <section style={{ padding: '80px 48px', background: 'var(--fondo)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span style={{ color: 'var(--verde-medio)', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>Historias desde el camino</span>
            <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2.2rem', color: 'var(--verde-andes)' }}>Artículos Recientes</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
            {articles.map((art) => (
              <a 
                key={art.id} 
                href={art.slug}
                style={{
                  background: '#fff',
                  border: '1px solid rgba(27,67,50,0.1)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  textDecoration: 'none',
                  color: 'var(--texto)',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 4px 15px rgba(27,67,50,0.04)',
                  transition: 'transform 0.3s ease'
                }}
                className="blog-card-item"
              >
                <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                  <img src={art.photo} alt={art.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{ position: 'absolute', top: '15px', left: '15px', background: 'var(--verde-andes)', color: 'var(--oro)', fontSize: '9px', fontWeight: 'bold', padding: '4px 10px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {art.category}
                  </span>
                </div>
                
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <span style={{ fontSize: '11px', color: 'var(--verde-medio)', fontWeight: 'bold', marginBottom: '8px' }}>
                    {art.date}
                  </span>
                  <h3 style={{ fontFamily: 'Playfair Display', fontSize: '18px', color: 'var(--verde-andes)', margin: '0 0 10px 0', lineHeight: '1.3', fontWeight: 'bold' }}>
                    {art.title}
                  </h3>
                  <p style={{ fontSize: '13.5px', color: 'var(--texto)', lineHeight: '1.6', flex: 1, margin: 0 }}>
                    {art.excerpt}
                  </p>
                  <span style={{ marginTop: '20px', fontSize: '11px', fontWeight: 'bold', color: 'var(--verde-medio)', borderBottom: '1px solid var(--verde-medio)', alignSelf: 'flex-start', paddingBottom: '2px' }}>
                    Leer artículo →
                  </span>
                </div>
              </a>
            ))}
          </div>

        </div>
      </section>

      {/* TAGS CLOUD */}
      <section style={{ padding: '60px 48px', background: 'var(--crema)', borderTop: '1px solid rgba(27,67,50,0.1)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ color: 'var(--verde-medio)', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '20px' }}>
            Temas que exploramos en el blog
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
            {tags.map((tag, idx) => (
              <span 
                key={idx}
                style={{
                  background: '#fff',
                  border: '1px solid rgba(27,67,50,0.15)',
                  color: 'var(--verde-andes)',
                  fontSize: '12px',
                  padding: '6px 16px',
                  borderRadius: '30px'
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{ padding: '80px 24px', background: 'var(--verde-andes)', color: '#fff', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2.2rem', marginBottom: '15px' }}>De la lectura a la experiencia real</h2>
        <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '500px', margin: '0 auto 30px auto' }}>Cada artículo que escribimos es una invitación directa a que vengas a Alchipichí y vivas la inmersión andina en carne propia.</p>
        <a 
          href="https://wa.me/593984480203?text=Hola%20Diego,%20leí%20el%20blog%20de%20Ruta%20Escondida%20y%20quiero%20reservar%20una%20experiencia" 
          target="_blank"
          rel="noopener"
          style={{ background: 'var(--oro)', color: 'var(--negro)', border: 'none', padding: '12px 30px', borderRadius: '6px', fontWeight: 'bold', fontSize: '14px', textDecoration: 'none', display: 'inline-block' }}
        >
          📲 Reservar Expedición (WhatsApp)
        </a>
      </section>

      <Footer />
    </div>
  );
}
