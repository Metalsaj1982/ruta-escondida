"use client";

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Tayos() {
  const handleBookingClick = () => {
    const text = encodeURIComponent("¡Hola! Me interesa reservar el tour 'Encañonado de los Tayos'. ¿Me pueden dar más información?");
    window.open(`https://wa.me/593984480203?text=${text}`, '_blank');
  };

  return (
    <div style={{ background: 'var(--fondo)', color: 'var(--texto)', minHeight: '100vh', fontFamily: 'Outfit, sans-serif' }}>
      <Header />

      {/* HERO SECTION */}
      <section style={{
        position: 'relative',
        height: '75vh',
        background: 'linear-gradient(rgba(26,48,40,0.4), rgba(26,48,40,0.85)), url("/assets/img/tayos_enca.png") center/cover',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}>
        <div style={{ padding: '0 20px', maxWidth: '800px' }}>
          <span style={{ color: 'var(--oro)', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '15px' }}>
            ✦ AVENTURA EXTREMA & ESPELEOLOGÍA
          </span>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: '#fff', fontWeight: '800', lineHeight: '1.1', marginBottom: '15px' }}>
            Encañonado de los Tayos
          </h1>
          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.9)', marginBottom: '30px' }}>
            Explora las cavernas subterráneas de los pájaros tayos, desciende por cascadas y vive el barranquismo en su estado más puro entre Chavezpamba y Atahualpa.
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
          { icon: '🧗', label: 'Dificultad', val: 'Alta - Exigente' },
          { icon: '📅', label: 'Duración', val: 'Full Day' },
          { icon: '🦇', label: 'Enfoque', val: 'Espeleología & Barranquismo' },
          { icon: '👥', label: 'Edad Mínima', val: 'Desde 15 años' },
          { icon: '🕒', label: 'Caminata/Actividad', val: '5-7 horas' },
          { icon: '📍', label: 'Lugar', val: 'Atahualpa / Chavezpamba' }
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
              El misterio de las cavernas y cascadas ocultas
            </h2>
            <p style={{ lineHeight: '1.8', color: 'var(--texto)', marginBottom: '15px' }}>
              El Encañonado de los Tayos es la expedición más emocionante de la Ruta Escondida. Nos adentraremos en un espectacular cañón rocoso tallado por el agua durante miles de años, donde habitan las legendarias aves nocturnas Tayos.
            </p>
            <p style={{ lineHeight: '1.8', color: 'var(--texto)', marginBottom: '30px' }}>
              Equipados con cascos, arneses y neoprenos, realizaremos descenso de rappel controlado por cascadas cristalinas de hasta 15 metros, exploraremos túneles oscuros y caminaremos entre gargantas de roca monumentales cubiertas de vegetación subtropical.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {[
                { num: '01', title: 'Rappel en Cascadas', desc: 'Desciende de forma segura con equipo homologado por hermosas caídas de agua natural.' },
                { num: '02', title: 'Exploración de Cavernas', desc: 'Descubre las grietas y cuevas donde habitan los Tayos en la penumbra andina.' },
                { num: '03', title: 'Barranquismo de Aventura', desc: 'Cruce de ríos subterráneos, saltos controlados y nado en pozas de agua pura.' },
                { num: '04', title: 'Naturaleza Intacta', desc: 'Disfruta de la flora endémica y un ecosistema de bosque de niebla virgen.' }
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
            <img src="/assets/img/tayos_cave.png" style={{ width: '100%', borderRadius: '16px', border: '1px solid rgba(27,67,50,0.1)', boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }} alt="Tayos" />
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
              { time: '06:00', title: 'Salida de Quito', desc: 'Encuentro en el punto de encuentro y transporte en van privada hacia Atahualpa.' },
              { time: '07:30', title: 'Desayuno Montañés', desc: 'Desayuno caliente tradicional (mote con chicharrón, café y queso andino).' },
              { time: '08:30', title: 'Equipamiento', desc: 'Entrega del equipo de seguridad (neopreno, casco, arnés, cuerdas) y charla de seguridad de espeleología.' },
              { time: '09:30', title: 'Entrada al Cañón', desc: 'Inicio del descenso al encañonado. Primeras pruebas de rappel en seco.' },
              { time: '11:00', title: 'Rutas de Caverna y Tayos', desc: 'Exploración de las gargantas subterráneas y visualización (con respeto ambiental) de las cuevas de tayos.' },
              { time: '13:00', title: 'Rappel de Cascadas', desc: 'Descenso acuático en cascada. Box lunch en una playa de río interior.' },
              { time: '15:30', title: 'Salida del Cañón', desc: 'Caminata de ascenso de regreso a la comunidad. Refrigerio final.' },
              { time: '17:00', title: 'Retorno a Quito', desc: 'Traslado de regreso a la ciudad.' }
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
            <span style={{ color: 'var(--verde-medio)', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>Elige tu Reto</span>
            <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem', color: 'var(--verde-andes)' }}>Tarifas de Aventura</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {[
              { name: 'Aventura Estándar', price: '$35', desc: 'Perfecto para quienes buscan emoción básica.', items: ['Guías especializados en barranquismo', 'Casco y arnés homologados', 'Ingreso a las cavernas', 'Box Lunch'] },
              { name: 'Aventura Premium', price: '$55', desc: 'La máxima experiencia de exploración.', items: ['Guías especializados en barranquismo', 'Neopreno completo de alta gama', 'Casco, arnés y cuerdas homologados', 'Desayuno andino y almuerzo campestre', 'Fotos y video GoPro de la expedición'] }
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
