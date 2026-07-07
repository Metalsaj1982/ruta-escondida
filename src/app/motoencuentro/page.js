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
  const [requireInvoice, setRequireInvoice] = useState(false);
  const [invoiceData, setInvoiceData] = useState({
    businessName: '',
    taxId: '',
    address: '',
    email: ''
  });

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

  const handleInvoiceChange = (e) => {
    setInvoiceData({
      ...invoiceData,
      [e.target.name]: e.target.value
    });
  };

  const handleCopyText = (text, label) => {
    navigator.clipboard.writeText(text);
    alert(`¡Copiado ${label}!: ${text}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const generatedCode = 'MOTO-2026-' + Math.floor(1000 + Math.random() * 9000);
    setRaffleCode(generatedCode);

    let invoiceString = "No requiere factura";
    if (requireInvoice) {
      invoiceString = `Requiere Factura. Razón Social: ${invoiceData.businessName}, RUC/CI: ${invoiceData.taxId}, Dirección: ${invoiceData.address}, Email Facturación: ${invoiceData.email || formData.email}`;
    }

    // Build lead details
    const leadData = {
      business_id: 'restaurante', // El Mirador de Alchipichí is the host
      customer_name: formData.name,
      customer_phone: formData.phone,
      customer_email: formData.email,
      message: `Inscripción Moto Encuentro 2026. Motocicleta: ${formData.motorcycle}. Club: ${formData.motoclub || 'Independiente'}. Alimentación: ${foodLabels[selectedFood]} (+$${foodPrice.toFixed(2)}). Total: $${totalPrice.toFixed(2)}. Factura: ${invoiceString}. Código Sorteo: ${generatedCode}`
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
      `💵 Total a Transferir: $${totalPrice.toFixed(2)}\n` +
      `📄 Factura: ${requireInvoice ? 'Sí (Detalles adjuntos)' : 'No'}\n` +
      (requireInvoice ? `   • Razón Social: ${invoiceData.businessName}\n   • RUC/CI: ${invoiceData.taxId}\n   • Dirección: ${invoiceData.address}\n` : '') +
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
    <div style={{ background: '#0E0E10', color: '#FAF6F0', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <Header />

      {/* 1. HERO SECTION WITH VIDEO (Video shows first, banner removed from top) */}
      <section style={{
        padding: '140px 24px 80px 24px',
        textAlign: 'center',
        background: 'linear-gradient(180deg, #121214 0%, #0E0E10 100%)',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{ maxWidth: '850px', margin: '0 auto', marginBottom: '40px' }}>
          {/* Small elegant official event logo */}
          <img 
            src="/assets/img/motoencuentro_logo.png" 
            alt="Logo Oficial Moto Encuentro" 
            style={{ width: '85px', height: 'auto', margin: '0 auto 20px auto', display: 'block', filter: 'brightness(1.1)' }} 
          />
          
          <span style={{ color: '#C5A880', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '3px', display: 'block', marginBottom: '15px', fontFamily: 'Poppins' }}>
            Extraordinary Rural Experiences
          </span>
          <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(2.2rem, 6vw, 3.8rem)', color: '#FFFFFF', fontWeight: '800', lineHeight: '1.15', marginBottom: '20px' }}>
            Moto Encuentro Ruta Escondida 2026 – Edición Alchipichí
          </h1>
          <p style={{ fontSize: '18px', color: '#A1A1AA', marginBottom: '30px', lineHeight: '1.6', fontFamily: 'Inter' }}>
            Pasión por el asfalto, compromiso con nuestra gente.
          </p>
          <button 
            onClick={scrollToRegister}
            style={{ 
              padding: '15px 35px', 
              background: '#C5A880', 
              color: '#0E0E10', 
              border: 'none',
              fontWeight: '700', 
              borderRadius: '30px', 
              fontSize: '14px', 
              textTransform: 'uppercase', 
              letterSpacing: '1.5px', 
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(197, 168, 128, 0.25)',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#FFFFFF';
              e.target.style.boxShadow = '0 4px 25px rgba(255, 255, 255, 0.3)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = '#C5A880';
              e.target.style.boxShadow = '0 4px 20px rgba(197, 168, 128, 0.25)';
            }}
          >
            Asegurar mi lugar en la ruta
          </button>
        </div>

        {/* Responsive Video Container - Displayed First */}
        <div style={{ 
          maxWidth: '850px', 
          margin: '0 auto', 
          borderRadius: '20px', 
          overflow: 'hidden', 
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
          border: '6px solid #1C1C21',
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
      <section style={{ background: '#161619', padding: '60px 24px', borderTop: '1px solid rgba(197,168,128,0.1)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginBottom: '40px' }}>
            
            <div style={{ background: '#1C1C21', padding: '30px', borderRadius: '16px', border: '1px solid rgba(197,168,128,0.08)' }}>
              <span style={{ fontSize: '28px', display: 'block', marginBottom: '15px' }}>📅</span>
              <h3 style={{ fontFamily: 'Poppins', fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: '#C5A880' }}>Fecha del Evento</h3>
              <p style={{ fontSize: '15px', color: '#FAF6F0', margin: 0, fontWeight: '500' }}>Sábado, 29 de agosto de 2026</p>
            </div>

            <div style={{ background: '#1C1C21', padding: '30px', borderRadius: '16px', border: '1px solid rgba(197,168,128,0.08)' }}>
              <span style={{ fontSize: '28px', display: 'block', marginBottom: '15px' }}>📍</span>
              <h3 style={{ fontFamily: 'Poppins', fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: '#C5A880' }}>Concentración</h3>
              <p style={{ fontSize: '15px', color: '#FAF6F0', margin: 0, fontWeight: '500' }}>Parque Bicentenario (Quito) a las 07:45 AM</p>
            </div>

            <div style={{ background: '#1C1C21', padding: '30px', borderRadius: '16px', border: '1px solid rgba(197,168,128,0.08)' }}>
              <span style={{ fontSize: '28px', display: 'block', marginBottom: '15px' }}>🏁</span>
              <h3 style={{ fontFamily: 'Poppins', fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: '#C5A880' }}>Salida Oficial</h3>
              <p style={{ fontSize: '15px', color: '#FAF6F0', margin: 0, fontWeight: '500' }}>08:15 AM (Puntual)</p>
            </div>

          </div>

          <div style={{ 
            background: '#1C1C21', 
            padding: '30px 40px', 
            borderRadius: '16px', 
            textAlign: 'center', 
            borderLeft: '5px solid #C5A880',
            borderRight: '1px solid rgba(197,168,128,0.1)',
            borderTop: '1px solid rgba(197,168,128,0.1)',
            borderBottom: '1px solid rgba(197,168,128,0.1)'
          }}>
            <p style={{ fontSize: '16px', color: '#FAF6F0', lineHeight: '1.7', margin: 0, fontStyle: 'italic', fontWeight: '500' }}>
              "Ruta 100% asfaltada. Un evento diseñado para verdaderos apasionados de las dos ruedas que buscan una experiencia de calidad, segura y con excelente organización."
            </p>
          </div>
        </div>
      </section>

      {/* 3. MANIFIESTO Y PROPÓSITO SOCIAL */}
      <section style={{ 
        padding: '90px 24px', 
        background: '#0E0E10', 
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span style={{ color: '#C5A880', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '15px', fontFamily: 'Poppins' }}>
            Nuestra Filosofía
          </span>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '2.2rem', color: '#FFFFFF', fontWeight: '700', marginBottom: '25px', lineHeight: '1.2' }}>
            Rodamos con Causa
          </h2>
          <p style={{ 
            fontSize: '20px', 
            lineHeight: '1.8', 
            color: '#C5A880', 
            fontWeight: '600', 
            fontFamily: 'Poppins',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            "Rodamos para descubrir, rodamos para apoyar. Con tu inscripción base, garantizas una logística impecable para tu rodada y fondeas directamente los proyectos de turismo comunitarios autogestionados por las familias de la parroquia."
          </p>
        </div>
      </section>

      {/* SPONSORS & RAFFLE ITEMS */}
      <section style={{ padding: '80px 24px', background: '#161619', borderTop: '1px solid rgba(197,168,128,0.1)', borderBottom: '1px solid rgba(197,168,128,0.1)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ color: '#C5A880', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '12px', fontFamily: 'Poppins' }}>
            Sponsors Oficiales
          </span>
          <h2 style={{ fontFamily: 'Poppins', fontSize: '2rem', fontWeight: '700', color: '#FFFFFF', marginBottom: '20px' }}>
            Gran Sorteo de Auspiciantes
          </h2>
          <p style={{ fontSize: '15px', color: '#A1A1AA', maxWidth: '700px', margin: '0 auto 40px auto', lineHeight: '1.6' }}>
            Con tu código único de inscripción digital, participas de manera automática en el sorteo oficial que se realizará en Finca Alchipichí. Estos son algunos de los premios auspiciados por nuestros colaboradores oficiales:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            {[
              { company: 'Motul Ecuador', prize: 'Kits de Lubricación y Cuidado de Cadena', icon: '🧴' },
              { company: 'Enduristan Ecuador', prize: 'Bolsos de Viaje Drybags 100% Impermeables', icon: '🎒' },
              { company: 'Klim Ecuador', prize: 'Guantes Técnicos y Accesorios de Aventura', icon: '🧤' },
              { company: 'Finca Alchipichí', prize: 'Canastas de Frutas Orgánicas & Café de la zona', icon: '🍊' },
              { company: 'El Mirador de Alchipichí', prize: 'Almuerzos Tradicionales y Cortesías de la Finca', icon: '🍲' }
            ].map((sponsor, index) => (
              <div key={index} style={{ background: '#1C1C21', padding: '24px', borderRadius: '16px', borderTop: '3px solid #C5A880', borderLeft: '1px solid rgba(197,168,128,0.05)', borderRight: '1px solid rgba(197,168,128,0.05)', borderBottom: '1px solid rgba(197,168,128,0.05)' }}>
                <span style={{ fontSize: '24px', display: 'block', marginBottom: '10px' }}>{sponsor.icon}</span>
                <strong style={{ fontSize: '13px', textTransform: 'uppercase', color: '#C5A880', display: 'block', letterSpacing: '1px', marginBottom: '4px' }}>{sponsor.company}</strong>
                <p style={{ fontSize: '14px', color: '#FFFFFF', fontWeight: 'bold', margin: 0, lineHeight: '1.4' }}>{sponsor.prize}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FORMULARIO INTERACTIVO DE REGISTRO */}
      <section id="registro" style={{ padding: '90px 24px', background: '#0E0E10' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px', alignItems: 'start' }}>
          
          {/* Left Column: Poster / Visual Details & Bank Transfer Info */}
          <div>
            <div style={{ position: 'sticky', top: '100px' }}>
              <img 
                src="/assets/img/motoencuentro.jpg" 
                alt="Afiche Moto Encuentro 2026" 
                style={{ width: '100%', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', marginBottom: '30px', border: '1px solid rgba(197,168,128,0.1)' }} 
              />
              
              {/* BANK TRANSFER DETAILS BLOCK */}
              <div style={{ background: '#161619', padding: '25px', borderRadius: '20px', border: '1px solid rgba(197,168,128,0.15)', marginBottom: '30px' }}>
                <h4 style={{ fontFamily: 'Poppins', fontSize: '15px', fontWeight: '700', marginBottom: '15px', color: '#C5A880', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Detalles de Pago y Cuentas
                </h4>
                <p style={{ fontSize: '13px', color: '#A1A1AA', lineHeight: '1.5', marginBottom: '20px' }}>
                  Realiza tu transferencia del valor total y envía el comprobante al WhatsApp de registro oficial para confirmar tu cupo. Haz clic en los números de cuenta para copiarlos:
                </p>

                {/* Account 1 */}
                <div 
                  onClick={() => handleCopyText('4084147700', 'Número de Cuenta (Diego)')}
                  style={{ background: '#1C1C21', padding: '14px 16px', borderRadius: '10px', marginBottom: '12px', cursor: 'pointer', border: '1px solid rgba(197,168,128,0.1)', transition: 'all 0.2s' }}
                >
                  <strong style={{ fontSize: '12px', color: '#C5A880', display: 'block', textTransform: 'uppercase' }}>Opción 1: Cuenta Personal</strong>
                  <span style={{ fontSize: '14px', fontWeight: 'bold', display: 'block', color: '#FFFFFF', marginTop: '2px' }}>Banco Pichincha</span>
                  <span style={{ fontSize: '13px', color: '#FAF6F0', display: 'block' }}>Ahorros: <strong style={{ color: '#C5A880' }}>4084147700</strong></span>
                  <span style={{ fontSize: '12px', color: '#A1A1AA', display: 'block' }}>Diego Ruiz (C.I. 171287197)</span>
                </div>

                {/* Account 2 */}
                <div 
                  onClick={() => handleCopyText('12006898561', 'Número de Cuenta (Ruta Escondida S.A.S.)')}
                  style={{ background: '#1C1C21', padding: '14px 16px', borderRadius: '10px', cursor: 'pointer', border: '1px solid rgba(197,168,128,0.1)', transition: 'all 0.2s' }}
                >
                  <strong style={{ fontSize: '12px', color: '#C5A880', display: 'block', textTransform: 'uppercase' }}>Opción 2: Cuenta Jurídica</strong>
                  <span style={{ fontSize: '14px', fontWeight: 'bold', display: 'block', color: '#FFFFFF', marginTop: '2px' }}>Banco Pichincha</span>
                  <span style={{ fontSize: '13px', color: '#FAF6F0', display: 'block' }}>Corriente: <strong style={{ color: '#C5A880' }}>12006898561</strong></span>
                  <span style={{ fontSize: '12px', color: '#A1A1AA', display: 'block' }}>Ruta Escondida Adventure S.A.S. (RUC 1793233724001)</span>
                </div>
              </div>

              <div style={{ background: '#161619', padding: '25px', borderRadius: '20px', border: '1px solid rgba(197,168,128,0.08)' }}>
                <h4 style={{ fontFamily: 'Poppins', fontSize: '15px', fontWeight: '700', marginBottom: '8px', color: '#FFFFFF' }}>Cupos Limitados</h4>
                <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#A1A1AA', margin: 0 }}>
                  El Moto Encuentro es un evento exclusivo con cupo limitado para garantizar la seguridad de los pilotos en ruta y la capacidad de la finca. Asegura tu ticket hoy.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Form */}
          <div style={{ background: '#161619', padding: '40px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', border: '1px solid rgba(197,168,128,0.15)' }}>
            
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                <span style={{ fontSize: '50px', display: 'block', marginBottom: '15px' }}>🎟️</span>
                <h3 style={{ fontFamily: 'Poppins', fontSize: '24px', color: '#C5A880', fontWeight: '700', marginBottom: '10px' }}>¡Registro Completo!</h3>
                <p style={{ color: '#FAF6F0', fontSize: '15px', lineHeight: '1.6', marginBottom: '25px' }}>
                  Hemos generado tu ticket de sorteo. Lo copiamos a tu portapapeles y te enviamos la confirmación oficial a: <strong>{formData.email}</strong>.
                </p>
                <div style={{ margin: '0 auto 25px auto', padding: '20px', background: '#1C1C21', borderRadius: '12px', display: 'inline-block', border: '1px solid rgba(197,168,128,0.25)' }}>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#C5A880', letterSpacing: '1px', display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Código Oficial</span>
                  <code style={{ fontSize: '26px', letterSpacing: '2px', fontWeight: 'bold', color: '#FFFFFF', fontFamily: 'monospace' }}>{raffleCode}</code>
                </div>
                
                {/* Visual Transfer Instructions for completed states */}
                <div style={{ background: '#121214', padding: '15px', borderRadius: '8px', border: '1px solid rgba(197,168,128,0.1)', fontSize: '13px', color: '#A1A1AA', lineHeight: '1.5', marginBottom: '25px', textAlign: 'left' }}>
                  ℹ️ <strong>Siguiente Paso:</strong> Recuerda transferir el total de tu experiencia <strong>(${totalPrice.toFixed(2)})</strong> a cualquiera de las cuentas del Banco Pichincha indicadas en el panel lateral y enviar el comprobante de transferencia al chat de WhatsApp que se acaba de abrir.
                </div>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button 
                    onClick={handleCopy} 
                    style={{ padding: '12px 24px', background: copied ? '#10B981' : '#C5A880', color: '#0E0E10', border: 'none', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', transition: 'all 0.3s' }}
                  >
                    {copied ? '¡Copiado!' : 'Copiar Código'}
                  </button>
                  <button 
                    onClick={() => setSubmitted(false)} 
                    style={{ padding: '12px 24px', background: 'transparent', border: '1px solid #C5A880', color: '#C5A880', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', transition: 'all 0.3s' }}
                  >
                    Inscribir otro piloto
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '22px' }}>
                <div>
                  <h3 style={{ fontFamily: 'Poppins', fontSize: '22px', fontWeight: '700', color: '#FFFFFF', marginBottom: '8px' }}>Pre-Registro Oficial</h3>
                  <div style={{ background: 'rgba(197,168,128,0.06)', borderLeft: '4px solid #C5A880', padding: '15px', borderRadius: '4px 8px 8px 4px', fontSize: '13px', lineHeight: '1.5', color: '#C5A880', fontWeight: '500' }}>
                    La inscripción base de <strong>$3.50</strong> es requerida para validar tu cupo e incluye: 1 Helado de Chirimoya, 1 Kit de productos locales, parqueo seguro y acceso a la ruta de trekking.
                  </div>
                </div>

                {/* Form fields */}
                <div>
                  <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px', fontWeight: 'bold', color: '#C5A880' }}>Nombre Completo *</label>
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ej. Juan Pérez"
                    style={{ width: '100%', padding: '12px 16px', border: '1px solid rgba(197,168,128,0.15)', borderRadius: '8px', fontSize: '14px', background: '#1C1C21', color: '#FFFFFF', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px', fontWeight: 'bold', color: '#C5A880' }}>Correo Electrónico *</label>
                    <input 
                      type="email" 
                      name="email" 
                      required 
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ejemplo@correo.com"
                      style={{ width: '100%', padding: '12px 16px', border: '1px solid rgba(197,168,128,0.15)', borderRadius: '8px', fontSize: '14px', background: '#1C1C21', color: '#FFFFFF', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px', fontWeight: 'bold', color: '#C5A880' }}>WhatsApp / Teléfono *</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      required 
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Ej. 0998877665"
                      style={{ width: '100%', padding: '12px 16px', border: '1px solid rgba(197,168,128,0.15)', borderRadius: '8px', fontSize: '14px', background: '#1C1C21', color: '#FFFFFF', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px', fontWeight: 'bold', color: '#C5A880' }}>Motoclub (Opcional)</label>
                    <input 
                      type="text" 
                      name="motoclub" 
                      value={formData.motoclub}
                      onChange={handleChange}
                      placeholder="Independiente o nombre del club"
                      style={{ width: '100%', padding: '12px 16px', border: '1px solid rgba(197,168,128,0.15)', borderRadius: '8px', fontSize: '14px', background: '#1C1C21', color: '#FFFFFF', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px', fontWeight: 'bold', color: '#C5A880' }}>Motocicleta / Cilindrada *</label>
                    <input 
                      type="text" 
                      name="motorcycle" 
                      required 
                      value={formData.motorcycle}
                      onChange={handleChange}
                      placeholder="Ej. Suzuki V-Strom 650"
                      style={{ width: '100%', padding: '12px 16px', border: '1px solid rgba(197,168,128,0.15)', borderRadius: '8px', fontSize: '14px', background: '#1C1C21', color: '#FFFFFF', outline: 'none' }}
                    />
                  </div>
                </div>

                {/* Food grid selection */}
                <div>
                  <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', fontWeight: 'bold', color: '#C5A880' }}>
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
                            border: isSelected ? '2px solid #C5A880' : '1px solid rgba(197,168,128,0.15)',
                            background: isSelected ? 'rgba(197,168,128,0.04)' : '#1C1C21',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            transition: 'all 0.2s'
                          }}
                        >
                          <div style={{ paddingRight: '15px' }}>
                            <span style={{ fontSize: '14px', fontWeight: 'bold', display: 'block', color: '#FFFFFF' }}>
                              {food.name} {food.price > 0 && `(+$${food.price.toFixed(2)})`}
                            </span>
                            <span style={{ fontSize: '12px', color: '#A1A1AA', display: 'block', marginTop: '2px' }}>
                              {food.desc}
                            </span>
                          </div>
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            border: isSelected ? '6px solid #C5A880' : '2px solid rgba(197,168,128,0.2)',
                            background: '#1C1C21',
                            boxSizing: 'border-box'
                          }} />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* BILLING INVOICE CHECKBOX & FORM */}
                <div style={{ borderTop: '1px solid rgba(197,168,128,0.15)', paddingTop: '15px', marginTop: '5px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13.5px', color: '#FFFFFF', fontWeight: 'bold' }}>
                    <input 
                      type="checkbox" 
                      checked={requireInvoice}
                      onChange={(e) => setRequireInvoice(e.target.checked)}
                      style={{ width: '18px', height: '18px', accentColor: '#C5A880', cursor: 'pointer' }}
                    />
                    <span>¿Requieres Factura Electrónica?</span>
                  </label>

                  {requireInvoice && (
                    <div style={{ display: 'grid', gap: '12px', marginTop: '15px', padding: '15px', background: '#121214', borderRadius: '12px', border: '1px solid rgba(197,168,128,0.15)' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px', fontWeight: 'bold', color: '#C5A880' }}>Razón Social / Nombre Completo *</label>
                        <input 
                          type="text" 
                          name="businessName"
                          required={requireInvoice}
                          value={invoiceData.businessName}
                          onChange={handleInvoiceChange}
                          placeholder="Nombre para la factura"
                          style={{ width: '100%', padding: '10px 12px', border: '1px solid rgba(197,168,128,0.15)', borderRadius: '6px', fontSize: '13.5px', background: '#1C1C21', color: '#FFFFFF', outline: 'none' }}
                        />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px', fontWeight: 'bold', color: '#C5A880' }}>RUC / C.I. *</label>
                          <input 
                            type="text" 
                            name="taxId"
                            required={requireInvoice}
                            value={invoiceData.taxId}
                            onChange={handleInvoiceChange}
                            placeholder="Ej. 1712871970"
                            style={{ width: '100%', padding: '10px 12px', border: '1px solid rgba(197,168,128,0.15)', borderRadius: '6px', fontSize: '13.5px', background: '#1C1C21', color: '#FFFFFF', outline: 'none' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px', fontWeight: 'bold', color: '#C5A880' }}>Email Facturación</label>
                          <input 
                            type="email" 
                            name="email"
                            value={invoiceData.email}
                            onChange={handleInvoiceChange}
                            placeholder="Dejar vacío para usar el principal"
                            style={{ width: '100%', padding: '10px 12px', border: '1px solid rgba(197,168,128,0.15)', borderRadius: '6px', fontSize: '13.5px', background: '#1C1C21', color: '#FFFFFF', outline: 'none' }}
                          />
                        </div>
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px', fontWeight: 'bold', color: '#C5A880' }}>Dirección Fiscal *</label>
                        <input 
                          type="text" 
                          name="address"
                          required={requireInvoice}
                          value={invoiceData.address}
                          onChange={handleInvoiceChange}
                          placeholder="Ej. Av. Amazonas y Colón, Quito"
                          style={{ width: '100%', padding: '10px 12px', border: '1px solid rgba(197,168,128,0.15)', borderRadius: '6px', fontSize: '13.5px', background: '#1C1C21', color: '#FFFFFF', outline: 'none' }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Real-time calculator */}
                <div style={{
                  background: '#121214',
                  padding: '20px',
                  borderRadius: '12px',
                  border: '1px solid rgba(197,168,128,0.1)'
                }}>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold', color: '#C5A880', display: 'block', marginBottom: '8px' }}>
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
                    borderTop: '1px solid rgba(197,168,128,0.2)', 
                    paddingTop: '10px',
                    marginTop: '10px',
                    color: '#FFFFFF'
                  }}>
                    <span>Total a Transferir:</span>
                    <span style={{ color: '#C5A880' }}>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  style={{ 
                    width: '100%', 
                    padding: '16px', 
                    background: '#C5A880', 
                    border: 'none', 
                    borderRadius: '30px', 
                    color: '#0E0E10', 
                    fontWeight: 'bold', 
                    fontSize: '14px', 
                    cursor: loading ? 'not-allowed' : 'pointer', 
                    textTransform: 'uppercase', 
                    letterSpacing: '1.5px', 
                    transition: 'all 0.3s'
                  }}
                  onMouseOver={(e) => !loading && (e.target.style.background = '#FFFFFF')}
                  onMouseOut={(e) => !loading && (e.target.style.background = '#C5A880')}
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
