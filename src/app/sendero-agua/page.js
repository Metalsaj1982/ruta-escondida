"use client";

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function SenderoAgua() {
  const handleBookingClick = () => {
    const text = encodeURIComponent("¡Hola! Me interesa reservar el tour 'El Sendero del Agua'. ¿Me pueden dar más información?");
    window.open(`https://wa.me/593984480203?text=${text}`, '_blank');
  };

  return (
    <div style={{ background: 'var(--fondo)', color: 'var(--texto)', minHeight: '100vh', fontFamily: 'Outfit, sans-serif' }}>
      <Header />

      {/* HERO SECTION */}
      <section style={{
        position: 'relative',
        height: '75vh',
        background: 'linear-gradient(rgba(26,48,40,0.4), rgba(26,48,40,0.85)), url("/assets/img/ruta_agua.png") center/cover',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}>
        <div style={{ padding: '0 20px', maxWidth: '800px' }}>
          <span style={{ color: 'var(--oro)', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '15px' }}>
            ✦ ECOTURISMO & HISTORIA · PERUCHO
          </span>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: '#fff', fontWeight: '800', lineHeight: '1.1', marginBottom: '15px' }}>
            El Sendero del Agua
          </h1>
          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.9)', marginBottom: '30px' }}>
            Un recorrido por huertas de mandarinas centenarias, acequias históricas y el patrimonio colonial de Perucho. Ideal para familias y amantes de la cultura local.
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
          { icon: '🌱', label: 'Dificultad', val: 'Fácil - Familiar' },
          { icon: '📅', label: 'Duración', val: 'Medio Día (Half Day)' },
          { icon: '🍊', label: 'Enfoque', val: 'Agroecología & Cítricos' },
          { icon: '👥', label: 'Edad Mínima', val: 'Apto para todo público' },
          { icon: '🕒', label: 'Caminata', val: '2-3 horas' },
          { icon: '📍', label: 'Ubicación', val: 'Perucho, Ruta Escondida' }
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
              El Recorrido
            </span>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', color: 'var(--verde-andes)', marginBottom: '20px', lineHeight: '1.2' }}>
              Cítricos, acequias e historia viva
            </h2>
            <p style={{ lineHeight: '1.8', color: 'var(--texto)', marginBottom: '15px' }}>
              El Sendero del Agua es un paseo sensorial por el valle de Perucho. Caminarás junto a acequias de riego centenarias construidas en la época colonial, que hoy en día alimentan los huertos de mandarinas y limoneros más dulces de la provincia.
            </p>
            <p style={{ lineHeight: '1.8', color: 'var(--texto)', marginBottom: '30px' }}>
              Aprenderás sobre las técnicas de cultivo orgánico locales, cosecharás tus propias mandarinas directo del árbol y visitarás la iglesia de madera tallada de Perucho, considerada una joya arquitectónica única en el país.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {[
                { num: '01', title: 'Cosecha de Mandarinas', desc: 'Interactúa con los agricultores locales y llena tu cesta de cítricos dulces recién cosechados.' },
                { num: '02', title: 'Patrimonio de Perucho', desc: 'Visita guiada a la iglesia colonial construida con maderas nativas talladas a mano.' },
                { num: '03', title: 'Acequias Históricas', desc: 'Recorre los antiguos canales que canalizan el agua de montaña hacia el valle.' },
                { num: '04', title: 'Clima Templado Seco', desc: 'Disfruta de un clima cálido y libre de humedad, excelente para la salud pulmonar.' }
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
            <img src="/assets/img/sendero_agua.png" style={{ width: '100%', borderRadius: '16px', border: '1px solid rgba(27,67,50,0.1)', boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }} alt="Sendero Agua" />
          </div>
        </div>
      </section>

      {/* ITINERARIO TIMELINE */}
      <section id="itinerario" style={{ padding: '100px 48px', background: 'var(--crema)', borderTop: '1px solid rgba(27,67,50,0.1)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span style={{ color: 'var(--verde-medio)', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>Cronograma</span>
            <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2.2rem', color: 'var(--verde-andes)' }}>Itinerario General</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {[
              { time: '08:30', title: 'Arribo a Perucho', desc: 'Llegada a la plaza central de Perucho. Bienvenida con infusión de hojas de cítricos.' },
              { time: '09:00', title: 'Visita Cultural', desc: 'Exploración guiada del centro histórico e iglesia matriz de madera tallada.' },
              { time: '10:00', title: 'Caminata de las Acequias', desc: 'Inicio del sendero bordeando los canales de agua coloniales. Explicación de la geografía del riego.' },
              { time: '11:00', title: 'Inmersión Agrícola', desc: 'Entrada a la finca agroecológica. Cosecha y degustación libre de cítricos.' },
              { time: '12:30', title: 'Almuerzo de Origen', desc: 'Almuerzo típico preparado con ingredientes de la misma huerta.' },
              { time: '14:00', title: 'Retorno', desc: 'Tiempo libre para compras de conservas y despedida.' }
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
            <span style={{ color: 'var(--verde-medio)', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>Planes</span>
            <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem', color: 'var(--verde-andes)' }}>Elige tu Formato</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {[
              { name: 'Plan Familiar Básico', price: '$15', desc: 'Perfecto para pasar la mañana en Perucho.', items: ['Guía local bilingüe', 'Cesta de mandarinas de regalo', 'Ingreso a fincas', 'Hidratación'] },
              { name: 'Plan Familiar Completo', price: '$28', desc: 'La mejor opción para familias y paseos.', items: ['Guía local bilingüe', 'Cesta de mandarinas de regalo', 'Ingreso a fincas', 'Almuerzo típico completo', 'Degustación de dulces locales'] }
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
