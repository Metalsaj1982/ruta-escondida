"use client";

import { useState } from 'react';

export default function AdminSaaSConfig() {
  const [comission, setComission] = useState(10);
  const [freePhotos, setFreePhotos] = useState(3);
  const [basicPhotos, setBasicPhotos] = useState(10);

  const handleSave = (e) => {
    e.preventDefault();
    alert('Configuración del SaaS guardada exitosamente.');
  };

  return (
    <div style={{ fontFamily: 'Outfit, sans-serif' }}>
      <h1 style={{ fontFamily: 'Playfair Display', color: 'var(--verde-andes)', fontSize: '28px', fontWeight: 'bold', margin: 0, marginBottom: '30px' }}>
        Configuración Global del SaaS
      </h1>

      <div style={{ background: '#fff', border: '1px solid rgba(27,67,50,0.1)', borderRadius: '12px', padding: '30px', maxWidth: '600px', boxShadow: '0 4px 15px rgba(27,67,50,0.03)' }}>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', fontSize: '14px', color: 'var(--texto)' }}>
              Comisión del Marketplace (%)
            </label>
            <input 
              type="number" 
              value={comission} 
              onChange={(e) => setComission(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid rgba(27,67,50,0.2)', outline: 'none', fontSize: '14px', fontFamily: 'Outfit' }}
            />
            <small style={{ color: 'var(--texto)', opacity: 0.6, fontSize: '12px', display: 'block', marginTop: '4px' }}>
              Porcentaje retenido automáticamente en las reservas y compras.
            </small>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', fontSize: '14px', color: 'var(--texto)' }}>
              Fotos Máximas - Plan FREE
            </label>
            <input 
              type="number" 
              value={freePhotos} 
              onChange={(e) => setFreePhotos(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid rgba(27,67,50,0.2)', outline: 'none', fontSize: '14px', fontFamily: 'Outfit' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', fontSize: '14px', color: 'var(--texto)' }}>
              Fotos Máximas - Plan BÁSICO
            </label>
            <input 
              type="number" 
              value={basicPhotos} 
              onChange={(e) => setBasicPhotos(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid rgba(27,67,50,0.2)', outline: 'none', fontSize: '14px', fontFamily: 'Outfit' }}
            />
          </div>

          <button 
            type="submit" 
            style={{ 
              background: 'var(--verde-andes)', 
              color: '#fff', 
              border: 'none', 
              padding: '12px', 
              borderRadius: '6px', 
              fontWeight: 'bold', 
              cursor: 'pointer', 
              marginTop: '10px',
              fontFamily: 'Outfit'
            }}
          >
            Guardar Configuración
          </button>
        </form>
      </div>
    </div>
  );
}
