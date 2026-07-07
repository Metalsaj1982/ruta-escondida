"use client";

import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { dbManager } from '../../lib/db';

export default function MotoEncuentro() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    motorcycle: '',
    motoclub: '',
    parish: 'Puéllaro'
  });
  const [selectedFood, setSelectedFood] = useState('none'); // 'none', 'burger', 'hornado', 'alitas'
  const [raffleCode, setRaffleCode] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  // Pricing constants
  const basePrice = 3.50;
  const foodPrices = {
    none: 0.00,
    burger: 5.99,
    hornado: 5.99,
    alitas: 7.99
  };
  const foodLabels = {
    none: 'Sin alimentación adicional',
    burger: 'Combo Hamburguesa con papas y gaseosa',
    hornado: 'Combo Hornado tradicional con gaseosa',
    alitas: 'Porción de Alitas BBQ'
  };

  const foodPrice = foodPrices[selectedFood];
  const totalPrice = basePrice + foodPrice;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const generatedCode = 'MOTO-2026-' + Math.floor(1000 + Math.random() * 9000);
    setRaffleCode(generatedCode);

    // Build lead details
    const leadData = {
      business_id: 'restaurante', // El Mirador de Alchipichí is the host
      customer_name: formData.name,
      customer_phone: formData.phone,
      customer_email: formData.email,
      message: `Inscripción Moto Encuentro 2026. Motocicleta: ${formData.motorcycle}. Club: ${formData.motoclub || 'Independiente'}. Alimentación: ${foodLabels[selectedFood]} (+$${foodPrice.toFixed(2)}). Total: $${totalPrice.toFixed(2)}. Código Sorteo: ${generatedCode}`
    };

    try {
      await dbManager.addLead(leadData);
    } catch (dbErr) {
      console.error("Failed to insert lead:", dbErr);
    }

    // Call API to send confirmation email
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
          passengers: selectedFood === 'none' ? '1' : '2' // Maps mock passengers fields
        })
      });
    } catch (mailErr) {
      console.error("Failed to send email:", mailErr);
    }

    setLoading(false);
    setSubmitted(true);

    // Open WhatsApp Registry
    const text = encodeURIComponent(
      `¡Hola Ruta Escondida! Confirmación de pre-registro Moto Encuentro 2026:\n\n` +
      `👤 Nombre: ${formData.name}\n` +
      `📧 Correo: ${formData.email}\n` +
      `📞 WhatsApp: ${formData.phone}\n` +
      `🏍️ Moto: ${formData.motorcycle}\n` +
      `🛡️ Club: ${formData.motoclub || 'Independiente'}\n` +
      `🍽️ Alimentación: ${foodLabels[selectedFood]}\n` +
      `💵 Total: $${totalPrice.toFixed(2)}\n` +
      `🎟️ Código de Sorteo: ${generatedCode}`
    );
    window.open(`https://wa.me/593984480203?text=${text}`, '_blank');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(raffleCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToRegister = () => {
    document.getElementById('registro')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ background: '#FAF8F5', color: '#1B1B1F', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <Header />

      {/* 1. HERO SECTION WITH VIDEO */}
      <section style={{
        padding: '140px 24px 80px 24px',
        textAlign: 'center',
        background: '#FAF8F5',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{ maxWidth: '850px', margin: '0 auto', marginBottom: '40px' }}>
          <span style={{ color: '#365C42', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '3px', display: 'block', marginBottom: '15px', fontFamily: 'Poppins' }}>
            Extraordinary Rural Experiences
          </span>
          <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(2.2rem, 6vw, 3.8rem)', color: '#1B1B1F', fontWeight: '800', lineHeight: '1.15', marginBottom: '20px' }}>
            Moto Encuentro Ruta Escondida 2026 – Edición Alchipichí
          </h1>
          <p style={{ fontSize: '18px', color: '#35363A', marginBottom: '30px', lineHeight: '1.6', fontFamily: 'Inter' }}>
            Pasión por el asfalto, compromiso con nuestra gente.
          </p>
          <button 
            onClick={scrollToRegister}
            style={{ 
              padding: '15px 35px', 
              background: '#F59E0B', 
              color: '#FFFFFF', 
              border: 'none',
              fontWeight: '700', 
              borderRadius: '30px', 
              fontSize: '14px', 
              textTransform: 'uppercase', 
              letterSpacing: '1px', 
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)',
              transition: 'background 0.3s'
            }}
            onMouseOver={(e) => e.target.style.background = '#D97706'}
            onMouseOut={(e) => e.target.style.background = '#F59E0B'}
          >
            Asegurar mi lugar en la ruta
          </button>
        </div>

        {/* Responsive Video Container */}
        <div style={{ 
          maxWidth: '850px', 
          margin: '0 auto', 
          borderRadius: '20px', 
          overflow: 'hidden', 
          boxShadow: '0 20px 40px rgba(27,27,31,0.08)',
          border: '8px solid #F4F1EA',
          aspectRatio: '16/9'
        }}>
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/gvfop2Qo3sE?autoplay=0&mute=0"
            title="Moto Encuentro Ruta Escondida"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ display: 'block', width: '100%', height: '100%' }}
          ></iframe>
        </div>
      </section>

      {/* 2. DETALLES DE LA EXPERIENCIA (INFO BAR / CARDS) */}
      <section style={{ background: '#F4F1EA', padding: '60px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginBottom: '40px' }}>
            
            <div style={{ background: '#FFFFFF', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
              <span style={{ fontSize: '28px', display: 'block', marginBottom: '15px' }}>📅</span>
              <h3 style={{ fontFamily: 'Poppins', fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: '#365C42' }}>Fecha del Evento</h3>
              <p style={{ fontSize: '15px', color: '#1B1B1F', margin: 0, fontWeight: '500' }}>Sábado, 29 de agosto de 2026</p>
            </div>

            <div style={{ background: '#FFFFFF', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
              <span style={{ fontSize: '28px', display: 'block', marginBottom: '15px' }}>📍</span>
              <h3 style={{ fontFamily: 'Poppins', fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: '#365C42' }}>Concentración</h3>
              <p style={{ fontSize: '15px', color: '#1B1B1F', margin: 0, fontWeight: '500' }}>Parque Bicentenario (Quito) a las 07:45 AM</p>
            </div>

            <div style={{ background: '#FFFFFF', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
              <span style={{ fontSize: '28px', display: 'block', marginBottom: '15px' }}>🏁</span>
              <h3 style={{ fontFamily: 'Poppins', fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: '#365C42' }}>Salida Oficial</h3>
              <p style={{ fontSize: '15px', color: '#1B1B1F', margin: 0, fontWeight: '500' }}>08:15 AM (Puntual)</p>
            </div>

          </div>

          <div style={{ 
            background: '#FFFFFF', 
            padding: '30px 40px', 
            borderRadius: '16px', 
            textAlign: 'center', 
            borderLeft: '5px solid #365C42',
            boxShadow: '0 4px 20px rgba(0,0,0,0.02)' 
          }}>
            <p style={{ fontSize: '16px', color: '#1B1B1F', lineHeight: '1.7', margin: 0, fontStyle: 'italic', fontWeight: '500' }}>
              "Ruta 100% asfaltada. Un evento diseñado para verdaderos apasionados de las dos ruedas que buscan una experiencia de calidad, segura y con excelente organización."
            </p>
          </div>
        </div>
      </section>

      {/* 3. MANIFIESTO Y PROPÓSITO SOCIAL */}
      <section style={{ 
        padding: '90px 24px', 
        background: '#FFFFFF', 
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span style={{ color: '#365C42', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '15px', fontFamily: 'Poppins' }}>
            Nuestra Filosofía
          </span>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '2.2rem', color: '#1B1B1F', fontWeight: '700', marginBottom: '25px', lineHeight: '1.2' }}>
            Rodamos con Causa
          </h2>
          <p style={{ 
            fontSize: '20px', 
            lineHeight: '1.8', 
            color: '#365C42', 
            fontWeight: '600', 
            fontFamily: 'Poppins',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            "Rodamos para descubrir, rodamos para apoyar. Con tu inscripción base, garantizas una logística impecable para tu rodada y fondeas directamente los proyectos de turismo comunitario autogestionados por las familias de la parroquia."
          </p>
        </div>
      </section>

      {/* 4. FORMULARIO INTERACTIVO DE REGISTRO */}
      <section id="registro" style={{ padding: '90px 24px', background: '#F4F1EA' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px', alignItems: 'start' }}>
          
          {/* Left Column: Poster / Visual Details */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <img 
              src="/assets/img/motoencuentro.jpg" 
              alt="Afiche Moto Encuentro 2026" 
              style={{ width: '100%', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', marginBottom: '30px' }} 
            />
            <div style={{ background: '#FFFFFF', padding: '30px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
              <h4 style={{ fontFamily: 'Poppins', fontSize: '18px', fontWeight: '700', marginBottom: '10px', color: '#1B1B1F' }}>Cupos Limitados</h4>
              <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#35363A', margin: 0 }}>
                El Moto Encuentro es un evento exclusivo con cupo limitado para garantizar la seguridad de los pilotos en ruta y la capacidad logística en Finca Alchipichí. Asegura tu ticket hoy.
              </p>
            </div>
          </div>

          {/* Right Column: Dynamic Form */}
          <div style={{ background: '#FFFFFF', padding: '40px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(27,27,31,0.03)' }}>
            
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                <span style={{ fontSize: '50px', display: 'block', marginBottom: '15px' }}>🎟️</span>
                <h3 style={{ fontFamily: 'Poppins', fontSize: '24px', color: '#365C42', fontWeight: '700', marginBottom: '10px' }}>¡Registro Completo!</h3>
                <p style={{ color: '#1B1B1F', fontSize: '15px', lineHeight: '1.6', marginBottom: '25px' }}>
                  Hemos generado tu ticket de sorteo. Lo copiamos a tu portapapeles y te enviamos la confirmación oficial a: <strong>{formData.email}</strong>.
                </p>
                <div style={{ margin: '0 auto 25px auto', padding: '20px', background: '#F4F1EA', borderRadius: '12px', display: 'inline-block', border: '1px solid rgba(54,92,66,0.15)' }}>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#365C42', letterSpacing: '1px', display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Código Oficial</span>
                  <code style={{ fontSize: '26px', letterSpacing: '2px', fontWeight: 'bold', color: '#1B1B1F', fontFamily: 'monospace' }}>{raffleCode}</code>
                </div>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button 
                    onClick={handleCopy} 
                    style={{ padding: '12px 24px', background: copied ? '#10B981' : '#365C42', color: '#FFFFFF', border: 'none', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', transition: 'all 0.3s' }}
                  >
                    {copied ? '¡Copiado!' : 'Copiar Código'}
                  </button>
                  <button 
                    onClick={() => setSubmitted(false)} 
                    style={{ padding: '12px 24px', background: 'transparent', border: '1px solid #1B1B1F', color: '#1B1B1F', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', transition: 'all 0.3s' }}
                  >
                    Inscribir otro piloto
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '22px' }}>
                <div>
                  <h3 style={{ fontFamily: 'Poppins', fontSize: '22px', fontWeight: '700', color: '#1B1B1F', marginBottom: '8px' }}>Pre-Registro Oficial</h3>
                  <div style={{ background: 'rgba(54,92,66,0.06)', borderLeft: '4px solid #365C42', padding: '15px', borderRadius: '4px 8px 8px 4px', fontSize: '13px', lineHeight: '1.5', color: '#365C42', fontWeight: '500' }}>
                    La inscripción base de <strong>$3.50</strong> es requerida para validar tu cupo e incluye: 1 Helado de Chirimoya, 1 Kit de productos locales, parqueo seguro y acceso a la ruta de trekking.
                  </div>
                </div>

                {/* Form fields */}
                <div>
                  <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px', fontWeight: 'bold', color: '#1B1B1F' }}>Nombre Completo *</label>
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ej. Juan Pérez"
                    style={{ width: '100%', padding: '12px 16px', border: '1px solid #E7E8EA', borderRadius: '8px', fontSize: '14px', background: '#FAF8F5', color: '#1B1B1F' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px', fontWeight: 'bold', color: '#1B1B1F' }}>Correo Electrónico *</label>
                    <input 
                      type="email" 
                      name="email" 
                      required 
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ejemplo@correo.com"
                      style={{ width: '100%', padding: '12px 16px', border: '1px solid #E7E8EA', borderRadius: '8px', fontSize: '14px', background: '#FAF8F5', color: '#1B1B1F' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px', fontWeight: 'bold', color: '#1B1B1F' }}>WhatsApp / Teléfono *</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      required 
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Ej. 0998877665"
                      style={{ width: '100%', padding: '12px 16px', border: '1px solid #E7E8EA', borderRadius: '8px', fontSize: '14px', background: '#FAF8F5', color: '#1B1B1F' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px', fontWeight: 'bold', color: '#1B1B1F' }}>Motoclub (Opcional)</label>
                    <input 
                      type="text" 
                      name="motoclub" 
                      value={formData.motoclub}
                      onChange={handleChange}
                      placeholder="Independiente o nombre del club"
                      style={{ width: '100%', padding: '12px 16px', border: '1px solid #E7E8EA', borderRadius: '8px', fontSize: '14px', background: '#FAF8F5', color: '#1B1B1F' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px', fontWeight: 'bold', color: '#1B1B1F' }}>Motocicleta / Cilindrada *</label>
                    <input 
                      type="text" 
                      name="motorcycle" 
                      required 
                      value={formData.motorcycle}
                      onChange={handleChange}
                      placeholder="Ej. Suzuki V-Strom 650"
                      style={{ width: '100%', padding: '12px 16px', border: '1px solid #E7E8EA', borderRadius: '8px', fontSize: '14px', background: '#FAF8F5', color: '#1B1B1F' }}
                    />
                  </div>
                </div>

                {/* Food grid selection */}
                <div>
                  <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', fontWeight: 'bold', color: '#1B1B1F' }}>
                    Opciones de Alimentación (Selecciona una)
                  </label>
                  <div style={{ display: 'grid', gap: '10px' }}>
                    {[
                      { id: 'none', name: 'Inscripción base', desc: 'No incluye almuerzo adicional (helado y kit incluidos)', price: 0.00 },
                      { id: 'burger', name: 'Combo Hamburguesa', desc: 'Hamburguesa con papas y gaseosa', price: 5.99 },
                      { id: 'hornado', name: 'Combo Hornado Tradicional', desc: 'Hornado tradicional con gaseosa', price: 5.99 },
                      { id: 'alitas', name: 'Porción de Alitas BBQ', desc: 'Alitas BBQ con papas y gaseosa', price: 7.99 }
                    ].map((food) => {
                      const isSelected = selectedFood === food.id;
                      return (
                        <div 
                          key={food.id}
                          onClick={() => setSelectedFood(food.id)}
                          style={{
                            padding: '16px',
                            borderRadius: '12px',
                            border: isSelected ? '2px solid #365C42' : '1px solid #E7E8EA',
                            background: isSelected ? 'rgba(54,92,66,0.03)' : '#FFFFFF',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            transition: 'all 0.2s'
                          }}
                        >
                          <div style={{ paddingRight: '15px' }}>
                            <span style={{ fontSize: '14px', fontWeight: 'bold', display: 'block', color: '#1B1B1F' }}>
                              {food.name} {food.price > 0 && `(+$${food.price.toFixed(2)})`}
                            </span>
                            <span style={{ fontSize: '12px', color: '#35363A', display: 'block', marginTop: '2px' }}>
                              {food.desc}
                            </span>
                          </div>
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            border: isSelected ? '6px solid #365C42' : '2px solid #E7E8EA',
                            background: '#FFFFFF',
                            boxSizing: 'border-box'
                          }} />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Real-time calculator */}
                <div style={{
                  background: '#F4F1EA',
                  padding: '20px',
                  borderRadius: '12px',
                  border: '1px solid rgba(27,27,31,0.04)'
                }}>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold', color: '#365C42', display: 'block', marginBottom: '8px' }}>
                    Resumen del Pago
                  </span>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '6px' }}>
                    <span>Inscripción Base:</span>
                    <strong>${basePrice.toFixed(2)}</strong>
                  </div>
                  {foodPrice > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '6px' }}>
                      <span>Alimentación Adicional:</span>
                      <strong>+${foodPrice.toFixed(2)}</strong>
                    </div>
                  )}
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    fontSize: '16px', 
                    fontWeight: 'bold', 
                    borderTop: '1px solid rgba(27,27,31,0.1)', 
                    paddingTop: '10px',
                    marginTop: '10px',
                    color: '#1B1B1F'
                  }}>
                    <span>Total a Transferir:</span>
                    <span style={{ color: '#365C42' }}>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  style={{ 
                    width: '100%', 
                    padding: '16px', 
                    background: '#F59E0B', 
                    border: 'none', 
                    borderRadius: '30px', 
                    color: '#FFFFFF', 
                    fontWeight: 'bold', 
                    fontSize: '14px', 
                    cursor: loading ? 'not-allowed' : 'pointer', 
                    textTransform: 'uppercase', 
                    letterSpacing: '1px', 
                    transition: 'background 0.3s'
                  }}
                  onMouseOver={(e) => !loading && (e.target.style.background = '#D97706')}
                  onMouseOut={(e) => !loading && (e.target.style.background = '#F59E0B')}
                >
                  {loading ? 'Procesando...' : 'Registrarme y Proceder al Pago'}
                </button>
              </form>
            )}

          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
