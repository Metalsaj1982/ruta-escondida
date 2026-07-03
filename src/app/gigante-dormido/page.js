"use client";

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function GiganteDormido() {
  const handleBookingClick = () => {
    const text = encodeURIComponent("¡Hola! Me interesa reservar el tour 'El Gigante Dormido · El Campanario'. ¿Me pueden dar más información?");
    window.open(`https://wa.me/593984480203?text=${text}`, '_blank');
  };

  return (
    <div style={{ background: 'var(--fondo)', color: 'var(--texto)', minHeight: '100vh', fontFamily: 'Outfit, sans-serif' }}>
      <Header />

      {/* HERO SECTION */}
      <section style={{
        position: 'relative',
        height: '75vh',
        background: 'linear-gradient(rgba(26,48,40,0.4), rgba(26,48,40,0.85)), url("/assets/img/gigante_dormido.png") center/cover',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}>
        <div style={{ padding: '0 20px', maxWidth: '800px' }}>
          <span style={{ color: 'var(--oro)', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '15px' }}>
            ✦ SENDERISMO DE ALTURA · EL CAMPANARIO
          </span>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: '#fff', fontWeight: '800', lineHeight: '1.1', marginBottom: '15px' }}>
            El Gigante Dormido
          </h1>
          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.9)', marginBottom: '30px' }}>
            La conquista del guardián milenario de Alchipichí. Las mejores vistas panorámicas de toda la Ruta Escondida te esperan en la cima de El Campanario.
          </p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <a href="#planes" style={{ padding: '12px 24px', background: 'var(--verde-medio)', color: '#fff', border: 'none', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold' }}>
              Ver Planes y Precios
            </a>
            <a href="#itinerario" style={{ padding: '12px 24px', background: 'transparent', border: '1px solid #fff', color: '#fff', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold' }}>
              Ver Itinerario
            </a>
          </div>
        </div>
      </section>

      {/* QUICK INFO BAR */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', background: 'var(--verde-andes)', color: '#fff', padding: '30px 48px', textAlign: 'center' }}>
        {[
          { icon: '🏔️', label: 'Dificultad', val: 'Moderada-Exigente' },
          { icon: '📅', label: 'Duración', val: 'Full Day' },
          { icon: '🎯', label: 'Enfoque', val: 'Cumbre & Vistas 360°' },
          { icon: '👥', label: 'Edad Mínima', val: 'Desde 10 años' },
          { icon: '🕒', label: 'Caminata', val: '4-6 horas ida/vuelta' },
          { icon: '📍', label: 'Salida', val: 'Quito 06:00' }
        ].map((item, idx) => (
          <div key={idx} style={{ padding: '10px' }}>
            <span style={{ fontSize: '24px', display: 'block', marginBottom: '6px' }}>{item.icon}</span>
            <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', display: 'block', letterSpacing: '1px' }}>{item.label}</span>
            <strong style={{ fontSize: '14px', fontFamily: 'Outfit' }}>{item.val}</strong>
          </div>
        ))}
      </section>

      {/* EXPERIENCIA SECTION */}
      <section style={{ padding: '100px 48px', background: 'var(--fondo)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '50px', maxWidth: '1200px', margin: '0 auto' }}>
          <div>
            <span style={{ color: 'var(--verde-medio)', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '10px' }}>
              La Expedición
            </span>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', color: 'var(--verde-andes)', marginBottom: '20px', lineHeight: '1.2' }}>
              Donde el cielo y la montaña se encuentran
            </h2>
            <p style={{ lineHeight: '1.8', color: 'var(--texto)', marginBottom: '15px' }}>
              El Gigante Dormido no es un simple ascenso. Es un viaje de superación personal hacia la cumbre de El Campanario, el cerro guardián de Alchipichí, donde el esfuerzo se convierte en recompensa y el paisaje andino te ofrece una perspectiva que cambia la manera en que ves el mundo.
            </p>
            <p style={{ lineHeight: '1.8', color: 'var(--texto)', marginBottom: '30px' }}>
              Cada paso es un encuentro directo con la energía de los Andes. La ruta combina senderos naturales, diversidad de pisos climáticos y vistas panorámicas 360° de toda la Ruta Escondida que no encontrarás en ningún otro punto de la región.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {[
                { num: '01', title: 'Panorama 360°', desc: 'La cima ofrece una visual privilegiada y completa de toda la cordillera y los valles.' },
                { num: '02', title: 'Reto Físico', desc: 'Hacer cumbre es una sensación que no se olvida. Un logro personal único.' },
                { num: '03', title: 'Pisos Climáticos', desc: 'El ascenso atraviesa diferentes ecosistemas, desde frutales hasta bosque de neblina.' },
                { num: '04', title: 'Desconexión', desc: 'En la cumbre de El Campanario, el único sonido es el viento andino. Un reset mental.' }
              ].map((h, i) => (
                <div key={i} style={{ display: 'flex', gap: '15px' }}>
                  <span style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--oro)', fontFamily: 'Playfair Display' }}>{h.num}</span>
                  <div>
                    <strong style={{ color: 'var(--verde-andes)', fontSize: '14px', display: 'block', marginBottom: '4px' }}>{h.title}</strong>
                    <p style={{ fontSize: '13px', color: 'var(--texto)', lineHeight: '1.5' }}>{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <img src="/assets/img/gigante_dormido.png" style={{ width: '100%', borderRadius: '16px', border: '1px solid rgba(27,67,50,0.1)', boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }} alt="Campanario" />
          </div>
        </div>
      </section>

      {/* ITINERARIO TIMELINE */}
      <section id="itinerario" style={{ padding: '100px 48px', background: 'var(--crema)', borderTop: '1px solid rgba(27,67,50,0.1)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span style={{ color: 'var(--verde-medio)', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>Paso a Paso</span>
            <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2.2rem', color: 'var(--verde-andes)' }}>Itinerario del Día</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {[
              { time: '06:00', title: 'Encuentro en Quito', desc: 'Salida desde el punto acordado en transporte privado de turismo con destino a Alchipichí.' },
              { time: '07:30', title: 'Llegada y Desayuno', desc: 'Desayuno orgánico en la finca agroecológica de Alchipichí con frutas de temporada cosechadas en el día.' },
              { time: '08:30', title: 'Inicio del Ascenso', desc: 'Charla técnica e inicio del senderismo. Atravesamos los primeros senderos frutales y de aguacates.' },
              { time: '11:30', title: 'Cumbre de El Campanario', desc: '¡Hito alcanzado! Llegamos a la cumbre de 2.600 msnm. Tiempo libre para fotos, box lunch y meditación guiada.' },
              { time: '14:30', title: 'Descenso y Retorno', desc: 'Descenso por senderos alternos. Retorno a la finca principal para refrigerio.' },
              { time: '17:00', title: 'Regreso a Quito', desc: 'Fin de la expedición y traslado de regreso a la ciudad de Quito.' }
            ].map((step, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '20px', borderLeft: '2px solid var(--verde-medio)', paddingLeft: '20px', position: 'relative' }}>
                <span style={{
                  position: 'absolute',
                  left: '-7px',
                  top: '0',
                  background: 'var(--verde-andes)',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%'
                }}></span>
                <span style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--oro)', width: '60px', flexShrink: 0 }}>{step.time}</span>
                <div>
                  <h4 style={{ margin: 0, fontSize: '15px', color: 'var(--verde-andes)', fontWeight: 'bold' }}>{step.title}</h4>
                  <p style={{ margin: '5px 0 0 0', fontSize: '13.5px', color: 'var(--texto)', lineHeight: '1.5' }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLANES DE PRECIOS */}
      <section id="planes" style={{ padding: '100px 48px', background: 'var(--fondo)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span style={{ color: 'var(--verde-medio)', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>Elige tu Experiencia</span>
            <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem', color: 'var(--verde-andes)' }}>Planes de Expedición</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {[
              { name: 'Plan Esencial', price: '$25', desc: 'Ideal para grupos independientes.', items: ['Transporte incluido', 'Guía local experto', 'Ingreso a senderos', 'Box Lunch básico'] },
              { name: 'Plan Completo (Recomendado)', price: '$40', desc: 'La experiencia completa de inmersión.', items: ['Transporte incluido', 'Guía bilingüe experto', 'Desayuno agroecológico', 'Box lunch premium', 'Fotografía digital'] },
              { name: 'Plan Privado / Team Building', price: '$65', desc: 'Diseñado a medida para empresas o familias.', items: ['Transporte exclusivo', 'Guía privado', 'Desayuno y Almuerzo orgánico', 'Charla de desarrollo personal', 'Regalo local artesanal'] }
            ].map((p, i) => (
              <div key={i} style={{ background: 'var(--crema)', border: '1px solid rgba(27,67,50,0.1)', borderRadius: '12px', padding: '40px 30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontFamily: 'Playfair Display', fontSize: '20px', color: 'var(--verde-andes)', margin: 0 }}>{p.name}</h3>
                  <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--verde-medio)', margin: '15px 0' }}>{p.price} <small style={{ fontSize: '12px', color: 'var(--texto)' }}>/ persona</small></div>
                  <p style={{ fontSize: '13px', color: 'var(--texto)', marginBottom: '20px' }}>{p.desc}</p>
                  
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {p.items.map((item, idx) => (
                      <li key={idx} style={{ fontSize: '13px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <span style={{ color: 'var(--oro)' }}>✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  onClick={handleBookingClick}
                  style={{ marginTop: '30px', background: 'var(--verde-andes)', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  Reservar este Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
