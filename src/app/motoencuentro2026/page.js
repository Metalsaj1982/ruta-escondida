"use client";

import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { dbManager } from '../../lib/db';

export default function MotoEncuentro2026() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    motorcycle: '',
    parish: 'Puéllaro',
    passengers: '1'
  });
  const [raffleCode, setRaffleCode] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Generate a premium random raffle code
    const generatedCode = 'MOTO-2026-' + Math.floor(1000 + Math.random() * 9000);
    setRaffleCode(generatedCode);
    setSubmitted(true);

    // Save registration securely as a lead in the database
    const leadData = {
      business_id: 'restaurante', // El Mirador de Alchipichí is the host
      customer_name: formData.name,
      customer_phone: formData.phone,
      customer_email: formData.email,
      message: `Inscripción Moto Encuentro. Motocicleta: ${formData.motorcycle}. Origen: ${formData.parish}. Acompañantes: ${formData.passengers}. Código Sorteo: ${generatedCode}`
    };

    try {
      await dbManager.addLead(leadData);
    } catch (dbErr) {
      console.error("Failed to insert lead into database:", dbErr);
    }

    // Call API route to dispatch ticket email
    try {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          code: generatedCode,
          motorcycle: formData.motorcycle,
          parish: formData.parish,
          passengers: formData.passengers
        })
      });
    } catch (mailErr) {
      console.error("Failed to trigger email send route:", mailErr);
    }

    const text = encodeURIComponent(
      `¡Hola Ruta Escondida! Quiero inscribirme en el 1er Moto Encuentro 2026:\n\n` +
      `👤 Nombre: ${formData.name}\n` +
      `📧 Correo: ${formData.email}\n` +
      `📞 Teléfono: ${formData.phone}\n` +
      `🏍️ Motocicleta: ${formData.motorcycle}\n` +
      `📍 Parroquia de Origen: ${formData.parish}\n` +
      `👥 Pasajeros: ${formData.passengers}\n` +
      `🎟️ Código de Sorteo: ${generatedCode}`
    );
    window.open(`https://wa.me/593984480203?text=${text}`, '_blank');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(raffleCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ background: '#1B1B1F', color: '#FFFFFF', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <Header />

      {/* HERO SECTION */}
      <section style={{
        position: 'relative',
        minHeight: '80vh',
        background: 'linear-gradient(rgba(27,27,31,0.5), rgba(27,27,31,0.95)), url("/assets/img/motoencuentro.jpg") center/cover',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px 60px 24px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '850px', width: '100%' }}>
          <span style={{ color: 'var(--oro)', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '3px', display: 'block', marginBottom: '20px', fontFamily: 'Poppins' }}>
            Extraordinary Rural Experiences ✦ MOTO ENCUENTRO 2026
          </span>
          <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(2.5rem, 7vw, 4.5rem)', color: '#fff', fontWeight: '800', lineHeight: '1.1', marginBottom: '20px' }}>
            Pasión por el Asfalto
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.85)', marginBottom: '35px', lineHeight: '1.6', maxWidth: '700px', margin: '0 auto 35px auto' }}>
            Rueda por las majestuosas curvas del corredor Norcentral. Una ruta escénica espectacular que une a la comunidad motera en el corazón rural de Pichincha.
          </p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#inscribirse" style={{ padding: '14px 32px', background: 'var(--oro)', color: '#1B1B1F', textDecoration: 'none', fontWeight: '700', borderRadius: '8px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', transition: 'all 0.3s' }}>
              Inscribirme Ahora
            </a>
            <a href="#detalles" style={{ padding: '14px 32px', background: 'transparent', border: '1px solid #FFFFFF', color: '#FFFFFF', textDecoration: 'none', fontWeight: '700', borderRadius: '8px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', transition: 'all 0.3s' }}>
              Ver Detalles
            </a>
          </div>
        </div>
      </section>

      {/* QUICK EVENT METRICS BAR */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', background: '#35363A', color: '#fff', padding: '40px 48px', gap: '30px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        {[
          { icon: '📅', label: 'Fecha', val: 'Sábado 29 de Agosto, 2026' },
          { icon: '📍', label: 'Lugar de Encuentro', val: 'Alchipichí (Ruta Escondida)' },
          { icon: '🛣️', label: 'Tipo de Ruta', val: 'Asfalto y Paisajes Andinos' },
          { icon: '🎟️', label: 'Beneficio Especial', val: 'Sorteo Oficial con tu Código' }
        ].map((item, idx) => (
          <div key={idx}>
            <span style={{ fontSize: '28px', display: 'block', marginBottom: '8px' }}>{item.icon}</span>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', display: 'block', letterSpacing: '1px', marginBottom: '4px' }}>{item.label}</span>
            <strong style={{ fontSize: '15px', fontFamily: 'Poppins', fontWeight: '600' }}>{item.val}</strong>
          </div>
        ))}
      </section>

      {/* DETAILS SECTION */}
      <section id="detalles" style={{ padding: '100px 48px', background: '#1B1B1F' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '60px', maxWidth: '1200px', margin: '0 auto', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--oro)', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '10px', fontFamily: 'Poppins' }}>
              La Experiencia
            </span>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '2.5rem', color: '#fff', marginBottom: '24px', lineHeight: '1.2' }}>
              Edición Alchipichí: Curvas, Naturaleza y Hermandad
            </h2>
            <p style={{ lineHeight: '1.8', color: 'rgba(255,255,255,0.8)', marginBottom: '20px', fontSize: '15px' }}>
              Únete al primer encuentro de motociclismo de aventura y turismo rural de la Ruta Escondida. Partiremos en caravana cruzando los miradores escénicos de Puéllaro, Perucho y San José de Minas, para finalizar con un gran festival y almuerzo campestre en Alchipichí.
            </p>
            <p style={{ lineHeight: '1.8', color: 'rgba(255,255,255,0.8)', marginBottom: '35px', fontSize: '15px' }}>
              Abierto a todo tipo de motocicletas. Participa en el sorteo de indumentaria y accesorios de nuestros auspiciantes. Tu código oficial se genera al registrarte abajo para poder retirar tu ticket numerado en la entrada.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              {[
                { num: '01', title: 'Caravana Guiada', desc: 'Ruta planificada con seguridad vial, puntos fotográficos y paradas técnicas.' },
                { num: '02', title: 'Almuerzo Campestre', desc: 'Disfruta de un almuerzo tradicional con ingredientes orgánicos de la finca.' },
                { num: '03', title: 'Sorteo con Código', desc: 'Suscripción automática al sorteo oficial con tu código digital único.' },
                { num: '04', title: 'Zona Camping Gratis', desc: 'Espacio seguro para acampar en el mirador con vista al cañón del río.' }
              ].map((h, i) => (
                <div key={i} style={{ display: 'flex', gap: '15px' }}>
                  <span style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--oro)', fontFamily: 'Poppins' }}>{h.num}</span>
                  <div>
                    <strong style={{ color: '#fff', fontSize: '15px', display: 'block', marginBottom: '4px', fontFamily: 'Poppins' }}>{h.title}</strong>
                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.5' }}>{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img 
              src="/assets/img/motoencuentro.jpg" 
              alt="Moto Encuentro Poster" 
              style={{ width: '100%', maxWidth: '420px', borderRadius: '20px', boxShadow: '0 20px 45px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }} 
            />
          </div>
        </div>
      </section>

      {/* REGISTRATION FORM SECTION */}
      <section id="inscribirse" style={{ padding: '100px 48px', background: '#35363A' }}>
        <div style={{ maxWidth: '650px', margin: '0 auto', background: '#1B1B1F', padding: '50px', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ textAlign: 'center', marginBottom: '35px' }}>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '2rem', color: '#fff', marginBottom: '10px' }}>Inscripción Oficial</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>Completa tus datos para suscribirte, generar tu código único del sorteo del 29 de agosto y completar el pase digital.</p>
          </div>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '30px', background: 'rgba(245,158,11,0.05)', border: '1px solid var(--oro)', borderRadius: '16px' }}>
              <span style={{ fontSize: '40px', display: 'block', marginBottom: '15px' }}>🎟️</span>
              <h3 style={{ fontFamily: 'Poppins', fontSize: '22px', color: 'var(--oro)', marginBottom: '5px' }}>¡Código de Sorteo Generado!</h3>
              <div style={{ margin: '20px auto', padding: '15px', background: '#35363A', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', display: 'inline-block' }}>
                <code style={{ fontSize: '24px', letterSpacing: '2px', fontWeight: 'bold', color: '#fff', fontFamily: 'Poppins' }}>{raffleCode}</code>
              </div>
              <p style={{ color: '#fff', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
                Hemos copiado este código a tu portapapeles y se ha adjuntado a la solicitud de WhatsApp. Úsalo para retirar tu ticket físico en la entrada del evento. Te enviaremos una copia y la confirmación oficial a: <strong>{formData.email}</strong>.
              </p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button onClick={handleCopy} style={{ padding: '10px 20px', background: copied ? '#10B981' : '#35363A', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>
                  {copied ? '¡Copiado!' : 'Copiar Código'}
                </button>
                <button onClick={() => setSubmitted(false)} style={{ padding: '10px 20px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}>
                  Registrar otro piloto
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', color: 'rgba(255,255,255,0.8)' }}>Nombre Completo</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ej. Juan Pérez"
                  style={{ width: '100%', padding: '14px', background: '#35363A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '14px', fontFamily: 'Inter' }} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', color: 'rgba(255,255,255,0.8)' }}>Correo Electrónico</label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ejemplo@correo.com"
                  style={{ width: '100%', padding: '14px', background: '#35363A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '14px', fontFamily: 'Inter' }} 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', color: 'rgba(255,255,255,0.8)' }}>Teléfono Celular</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    required 
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Ej. +593999999999"
                    style={{ width: '100%', padding: '14px', background: '#35363A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '14px', fontFamily: 'Inter' }} 
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', color: 'rgba(255,255,255,0.8)' }}>Motocicleta / Modelo</label>
                  <input 
                    type="text" 
                    name="motorcycle" 
                    required 
                    value={formData.motorcycle}
                    onChange={handleChange}
                    placeholder="Ej. Honda Africa Twin 1100"
                    style={{ width: '100%', padding: '14px', background: '#35363A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '14px', fontFamily: 'Inter' }} 
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', color: 'rgba(255,255,255,0.8)' }}>Parroquia de Origen</label>
                  <select 
                    name="parish" 
                    value={formData.parish}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '14px', background: '#35363A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '14px', fontFamily: 'Inter' }}
                  >
                    <option value="Puéllaro">Puéllaro</option>
                    <option value="Perucho">Perucho</option>
                    <option value="Chavezpamba">Chavezpamba</option>
                    <option value="Atahualpa">Atahualpa</option>
                    <option value="San José de Minas">San José de Minas</option>
                    <option value="Quito/Otra">Quito / Otra ciudad</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', color: 'rgba(255,255,255,0.8)' }}>Número de Acompañantes</label>
                  <select 
                    name="passengers" 
                    value={formData.passengers}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '14px', background: '#35363A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '14px', fontFamily: 'Inter' }}
                  >
                    <option value="1">Solo Piloto (1)</option>
                    <option value="2">Piloto + Copiloto (2)</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit" 
                style={{ width: '100%', padding: '16px', background: 'var(--oro)', border: 'none', borderRadius: '8px', color: '#1B1B1F', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px', transition: 'all 0.3s', marginTop: '10px' }}
              >
                Suscribirme y Generar Código de Sorteo 🏍️
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
