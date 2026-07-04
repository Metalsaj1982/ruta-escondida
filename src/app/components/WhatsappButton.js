"use client";

import React, { useState } from 'react';

export default function WhatsappButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div 
      style={{ 
        position: 'fixed', 
        bottom: '95px', 
        right: '25px', 
        zIndex: 9999, 
        fontFamily: 'Outfit, sans-serif' 
      }}
    >
      {showTooltip && (
        <div 
          style={{
            position: 'absolute',
            right: '65px',
            top: '12px',
            background: '#1b4332',
            color: '#fff',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '600',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            border: '1px solid rgba(255,255,255,0.1)',
            opacity: 0.95,
            transition: 'all 0.3s ease'
          }}
        >
          ¿Necesitas ayuda? ¡Escríbenos!
        </div>
      )}
      
      <a
        href="https://wa.me/593984480203?text=Hola%20Ruta%20Escondida%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: '#25D366',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: '26px',
          boxShadow: '0 8px 24px rgba(37,211,102,0.4)',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.backgroundColor = '#20ba5a';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.backgroundColor = '#25D366';
        }}
      >
        <i className="fa-brands fa-whatsapp"></i>
      </a>
    </div>
  );
}
