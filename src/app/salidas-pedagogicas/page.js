"use client";

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function SalidasPedagogicas() {
  const [activePrg, setActivePrg] = useState(1); // 1 | 2
  const [activeAge, setActiveAge] = useState('menores'); // 'menores' | 'mayores'

  const handleBookingClick = () => {
    const text = encodeURIComponent("¡Hola! Me interesa información para una Salida Pedagógica escolar en Ruta Escondida.");
    window.open(`https://wa.me/593984480203?text=${text}`, '_blank');
  };

  return (
    <div style={{ background: 'var(--fondo)', color: 'var(--texto)', minHeight: '100vh', fontFamily: 'Outfit, sans-serif' }}>
      <Header />

      {/* HERO SECTION */}
      <section style={{
        position: 'relative',
        height: '70vh',
        background: 'linear-gradient(rgba(26,48,40,0.55), rgba(26,48,40,0.9)), url("/assets/img/salidas_pedagogicas.png") center/cover',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}>
        <div style={{ padding: '0 20px', maxWidth: '850px' }}>
          <span style={{ color: 'var(--oro)', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '15px' }}>
            ✦ EDUCACIÓN · AGROECOLOGÍA · SOSTENIBILIDAD
          </span>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: '#fff', fontWeight: '800', lineHeight: '1.1', marginBottom: '15px' }}>
            Salidas Pedagógicas
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)', marginBottom: '30px' }}>
            Traemos el aula a los Andes para que el conocimiento nazca de la tierra misma. Laboratorios vivos alineados al currículo nacional.
          </p>
          <a href="#programas" style={{ padding: '12px 28px', background: 'var(--verde-medio)', color: '#fff', border: 'none', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block' }}>
            Ver Programas Educativos
          </a>
        </div>
      </section>

      {/* QUICK INFO BAR */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', background: 'var(--verde-andes)', color: '#fff', padding: '30px 48px', textAlign: 'center' }}>
        {[
          { icon: '🎓', label: 'Dirigido a', val: 'Colegios y Universidades' },
          { icon: '📅', label: 'Duración', val: 'Medio Día o Full Day' },
          { icon: '👥', label: 'Grupo Mínimo', val: '15 a 60 estudiantes' },
          { icon: '🌱', label: 'Enfoque', val: 'Agroecología & Geología' },
          { icon: '📋', label: 'Material', val: 'Guía digital pedagógica' },
          { icon: '💵', label: 'Precio', val: 'Desde $12 / estudiante' }
        ].map((item, idx) => (
          <div key={idx} style={{ padding: '10px' }}>
            <span style={{ fontSize: '24px', display: 'block', marginBottom: '6px' }}>{item.icon}</span>
            <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', display: 'block', letterSpacing: '1px' }}>{item.label}</span>
            <strong style={{ fontSize: '14px', fontFamily: 'Outfit' }}>{item.val}</strong>
          </div>
        ))}
      </section>

      {/* PROPÓSITO SECTION */}
      <section style={{ padding: '100px 48px', background: 'var(--fondo)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '50px', maxWidth: '1200px', margin: '0 auto' }}>
          <div>
            <span style={{ color: 'var(--verde-medio)', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '10px' }}>
              ¿Por qué Ruta Escondida?
            </span>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', color: 'var(--verde-andes)', marginBottom: '20px', lineHeight: '1.2' }}>
              La educación más poderosa nace de la tierra
            </h2>
            <p style={{ lineHeight: '1.8', color: 'var(--texto)', marginBottom: '15px' }}>
              En Ruta Escondida no realizamos "paseos escolares" tradicionales. Transformamos el entorno natural en <strong>Laboratorios Vivos</strong> utilizando la metodología de <strong>Aprendizaje Basado en Proyectos (ABP)</strong>. Cada salida está alineada a destrezas del currículo nacional.
            </p>
            <p style={{ lineHeight: '1.8', color: 'var(--texto)', marginBottom: '30px' }}>
              Respaldamos toda nuestra logística con estrictos protocolos de gestión de riesgos y una infraestructura y guianza profesional de primer nivel, garantizando a las instituciones educativas y familias absoluta tranquilidad.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { icon: '📚', title: 'Metodología ABP', desc: 'Los estudiantes resuelven problemas del mundo real vinculando la teoría científica con la práctica en el campo.' },
                { icon: '🎯', title: 'Alineado al Currículo Nacional', desc: 'Destrezas con criterios de desempeño evaluables para Ciencias Naturales, Biología, Geografía e Historia.' },
                { icon: '🛡️', title: 'Gestión de Riesgos Completa', desc: 'Protocolos de contingencia certificados, seguros de accidentes activos y coordinadores de campo dedicados.' }
              ].map((h, i) => (
                <div key={i} style={{ display: 'flex', gap: '15px' }}>
                  <span style={{ fontSize: '24px' }}>{h.icon}</span>
                  <div>
                    <strong style={{ color: 'var(--verde-andes)', fontSize: '15px', display: 'block', marginBottom: '4px' }}>{h.title}</strong>
                    <p style={{ fontSize: '13px', color: 'var(--texto)', lineHeight: '1.5' }}>{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <img src="/assets/img/salidas_pedagogicas.png" style={{ width: '100%', borderRadius: '16px', border: '1px solid rgba(27,67,50,0.1)', boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }} alt="Estudiantes" />
            <div style={{ background: 'var(--crema)', border: '1px solid rgba(27,67,50,0.1)', borderRadius: '8px', padding: '16px', textAlign: 'center', marginTop: '20px' }}>
              <strong style={{ fontSize: '24px', color: 'var(--verde-medio)', display: 'block' }}>350+</strong>
              <span style={{ fontSize: '12px', color: 'var(--texto)' }}>Estudiantes han vivido la experiencia este año</span>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMAS TABS SECTION */}
      <section id="programas" style={{ padding: '100px 48px', background: 'var(--crema)', borderTop: '1px solid rgba(27,67,50,0.1)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span style={{ color: 'var(--verde-medio)', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>Laboratorios Vivos</span>
            <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2.2rem', color: 'var(--verde-andes)' }}>Nuestros Programas Pedagógicos</h2>
          </div>

          {/* Program Selectors */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}>
            <button 
              onClick={() => setActivePrg(1)}
              style={{
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid rgba(27,67,50,0.2)',
                background: activePrg === 1 ? 'var(--verde-andes)' : '#fff',
                color: activePrg === 1 ? '#fff' : 'var(--verde-andes)',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              🌱 Programa 1: Inmersión en Alchipichí (Ecoturismo)
            </button>
            <button 
              onClick={() => setActivePrg(2)}
              style={{
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid rgba(27,67,50,0.2)',
                background: activePrg === 2 ? 'var(--verde-andes)' : '#fff',
                color: activePrg === 2 ? '#fff' : 'var(--verde-andes)',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              🍊 Programa 2: Exploración en Puéllaro (Agro-Histórico)
            </button>
          </div>

          {/* Active Program Box */}
          <div style={{ background: '#fff', border: '1px solid rgba(27,67,50,0.1)', borderRadius: '12px', padding: '30px' }}>
            {activePrg === 1 ? (
              <div>
                <div style={{ display: 'flex', gap: '30px', borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '20px' }}>
                  <span>Precio: <strong>$13.50 / estudiante</strong></span>
                  <span>Enfoque: <strong>Ciencias Naturales y Geología</strong></span>
                </div>
                
                {/* Age selector */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                  <button 
                    onClick={() => setActiveAge('menores')}
                    style={{ padding: '6px 12px', background: activeAge === 'menores' ? 'var(--verde-medio)' : 'transparent', color: activeAge === 'menores' ? '#fff' : 'var(--texto)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                  >
                    Exploradores Menores (Inicial y Básica)
                  </button>
                  <button 
                    onClick={() => setActiveAge('mayores')}
                    style={{ padding: '6px 12px', background: activeAge === 'mayores' ? 'var(--verde-medio)' : 'transparent', color: activeAge === 'mayores' ? '#fff' : 'var(--texto)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                  >
                    Exploradores Mayores (Básica Superior y Bachillerato)
                  </button>
                </div>

                {activeAge === 'menores' ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                    <div style={{ background: 'var(--crema)', padding: '15px', borderRadius: '8px' }}>
                      <h5 style={{ margin: '0 0 8px 0', fontSize: '12px', color: 'var(--verde-medio)' }}>📍 DESTINO PRINCIPAL</h5>
                      <p style={{ margin: 0, fontSize: '14.5px', fontWeight: 'bold' }}>Cascada de Alchipichí</p>
                    </div>
                    <div style={{ background: 'var(--crema)', padding: '15px', borderRadius: '8px' }}>
                      <h5 style={{ margin: '0 0 8px 0', fontSize: '12px', color: 'var(--verde-medio)' }}>🎯 OBJETIVOS CURRICULARES</h5>
                      <p style={{ margin: 0, fontSize: '13.5px' }}>Estimulación sensorial, reconocimiento de ecosistemas locales, el ciclo natural del agua.</p>
                    </div>
                    <div style={{ background: 'var(--crema)', padding: '15px', borderRadius: '8px' }}>
                      <h5 style={{ margin: '0 0 8px 0', fontSize: '12px', color: 'var(--verde-medio)' }}>👟 DINÁMICA DE CAMPO</h5>
                      <p style={{ margin: 0, fontSize: '13.5px' }}>Caminata interpretativa corta, recolección de texturas andinas y juegos de respeto por el medio ambiente.</p>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                    <div style={{ background: 'var(--crema)', padding: '15px', borderRadius: '8px' }}>
                      <h5 style={{ margin: '0 0 8px 0', fontSize: '12px', color: 'var(--verde-medio)' }}>📍 DESTINO PRINCIPAL</h5>
                      <p style={{ margin: 0, fontSize: '14.5px', fontWeight: 'bold' }}>El Encañonado de los Tayos</p>
                    </div>
                    <div style={{ background: 'var(--crema)', padding: '15px', borderRadius: '8px' }}>
                      <h5 style={{ margin: '0 0 8px 0', fontSize: '12px', color: 'var(--verde-medio)' }}>🎯 OBJETIVOS CURRICULARES</h5>
                      <p style={{ margin: 0, fontSize: '13.5px' }}>Geología de formaciones basálticas, biología de ecosistemas húmedos, desarrollo de resiliencia y trabajo en equipo.</p>
                    </div>
                    <div style={{ background: 'var(--crema)', padding: '15px', borderRadius: '8px' }}>
                      <h5 style={{ margin: '0 0 8px 0', fontSize: '12px', color: 'var(--verde-medio)' }}>👟 DINÁMICA DE CAMPO</h5>
                      <p style={{ margin: 0, fontSize: '13.5px' }}>Cruce técnico de obstáculos naturales, análisis geográfico y dinámicas de liderazgo grupal.</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', gap: '30px', borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '20px' }}>
                  <span>Precio: <strong>$15.00 / estudiante</strong></span>
                  <span>Enfoque: <strong>Historia de la Tierra y Agroecología</strong></span>
                </div>
                
                {/* Age selector */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                  <button 
                    onClick={() => setActiveAge('menores')}
                    style={{ padding: '6px 12px', background: activeAge === 'menores' ? 'var(--verde-medio)' : 'transparent', color: activeAge === 'menores' ? '#fff' : 'var(--texto)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                  >
                    Exploradores Menores (Inicial y Básica)
                  </button>
                  <button 
                    onClick={() => setActiveAge('mayores')}
                    style={{ padding: '6px 12px', background: activeAge === 'mayores' ? 'var(--verde-medio)' : 'transparent', color: activeAge === 'mayores' ? '#fff' : 'var(--texto)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                  >
                    Exploradores Mayores (Básica Superior y Bachillerato)
                  </button>
                </div>

                {activeAge === 'menores' ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                    <div style={{ background: 'var(--crema)', padding: '15px', borderRadius: '8px' }}>
                      <h5 style={{ margin: '0 0 8px 0', fontSize: '12px', color: 'var(--verde-medio)' }}>📍 DESTINO PRINCIPAL</h5>
                      <p style={{ margin: 0, fontSize: '14.5px', fontWeight: 'bold' }}>Huerta de Mandarinas (Perucho)</p>
                    </div>
                    <div style={{ background: 'var(--crema)', padding: '15px', borderRadius: '8px' }}>
                      <h5 style={{ margin: '0 0 8px 0', fontSize: '12px', color: 'var(--verde-medio)' }}>🎯 OBJETIVOS CURRICULARES</h5>
                      <p style={{ margin: 0, fontSize: '13.5px' }}>Fotosíntesis básica, polinización, ciclo de las plantas frutales, motricidad fina de cosecha.</p>
                    </div>
                    <div style={{ background: 'var(--crema)', padding: '15px', borderRadius: '8px' }}>
                      <h5 style={{ margin: '0 0 8px 0', fontSize: '12px', color: 'var(--verde-medio)' }}>👟 DINÁMICA DE CAMPO</h5>
                      <p style={{ margin: 0, fontSize: '13.5px' }}>Cosecha directa de fruta, explicación del compostaje de desechos y alimentación de animales de granja.</p>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                    <div style={{ background: 'var(--crema)', padding: '15px', borderRadius: '8px' }}>
                      <h5 style={{ margin: '0 0 8px 0', fontSize: '12px', color: 'var(--verde-medio)' }}>📍 DESTINO PRINCIPAL</h5>
                      <p style={{ margin: 0, fontSize: '14.5px', fontWeight: 'bold' }}>Finca Agroecológica Integral</p>
                    </div>
                    <div style={{ background: 'var(--crema)', padding: '15px', borderRadius: '8px' }}>
                      <h5 style={{ margin: '0 0 8px 0', fontSize: '12px', color: 'var(--verde-medio)' }}>🎯 OBJETIVOS CURRICULARES</h5>
                      <p style={{ margin: 0, fontSize: '13.5px' }}>Fisiología vegetal, control biológico de plagas sin pesticidas, química del suelo orgánico, soberanía alimentaria.</p>
                    </div>
                    <div style={{ background: 'var(--crema)', padding: '15px', borderRadius: '8px' }}>
                      <h5 style={{ margin: '0 0 8px 0', fontSize: '12px', color: 'var(--verde-medio)' }}>👟 DINÁMICA DE CAMPO</h5>
                      <p style={{ margin: 0, fontSize: '13.5px' }}>Análisis de pH de suelos, siembra participativa en huertas, preparación cooperativa de abono orgánico.</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA RESERVATION FORM */}
      <section id="formulario" style={{ padding: '80px 24px', background: 'var(--verde-andes)', color: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem', marginBottom: '15px' }}>Reserva una Salida Pedagógica</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '30px' }}>Coordinemos una llamada técnica para adaptar la salida a los objetivos curriculares de tu institución educativa.</p>
          <button 
            onClick={handleBookingClick}
            style={{ background: 'var(--oro)', color: 'var(--negro)', border: 'none', padding: '14px 30px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}
          >
            Contactar Asesor Educativo (WhatsApp)
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
