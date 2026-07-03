"use client";

import { useState, useEffect } from 'react';
import { dbManager } from '../../../lib/db';

export default function EmprendedorGaleria() {
  const [biz, setBiz] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function loadData() {
      const activeBizId = localStorage.getItem('active_business_id') || 'glamping';
      const business = await dbManager.getBusinessById(activeBizId);
      setBiz(business);
      if (business) {
        setPhotos(business.photos || [business.photo]);
      }
    }
    loadData();
  }, []);

  const getLimit = () => {
    if (!biz) return 3;
    if (biz.subscription_plan === 'free') return 3;
    if (biz.subscription_plan === 'basico') return 10;
    return Infinity;
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!biz) return;

    const limit = getLimit();
    if (photos.length >= limit) {
      alert(`Límite de fotos alcanzado. Tu plan (${biz.subscription_plan.toUpperCase()}) tiene un límite máximo de ${limit} fotos. Por favor actualiza tu plan en el dashboard principal para agregar más.`);
      return;
    }

    if (!newPhotoUrl) {
      alert("Por favor ingresa una URL de imagen válida o sube un archivo.");
      return;
    }

    setUploading(true);
    setTimeout(async () => {
      const updatedPhotos = [...photos, newPhotoUrl];
      const updatedBiz = { ...biz, photos: updatedPhotos };
      await dbManager.updateBusiness(biz.id, updatedBiz);
      setPhotos(updatedPhotos);
      setBiz(updatedBiz);
      setNewPhotoUrl('');
      setUploading(false);
      alert("Imagen agregada a la galería.");
    }, 800);
  };

  const handleDelete = async (idx) => {
    if (!biz) return;
    const updatedPhotos = photos.filter((_, i) => i !== idx);
    const updatedBiz = { ...biz, photos: updatedPhotos };
    await dbManager.updateBusiness(biz.id, updatedBiz);
    setPhotos(updatedPhotos);
    setBiz(updatedBiz);
    alert("Imagen eliminada de la galería.");
  };

  // Reorder photos
  const movePhoto = async (index, direction) => {
    if (!biz) return;
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= photos.length) return;

    const reordered = [...photos];
    // Swap elements
    const temp = reordered[index];
    reordered[index] = reordered[newIndex];
    reordered[newIndex] = temp;

    const updatedBiz = { ...biz, photos: reordered };
    await dbManager.updateBusiness(biz.id, updatedBiz);
    setPhotos(reordered);
    setBiz(updatedBiz);
  };

  if (!biz) return <div style={{ color: 'var(--texto)' }}>Cargando Galería...</div>;

  const limit = getLimit();
  const limitReached = photos.length >= limit;

  return (
    <div style={{ color: 'var(--texto)', fontFamily: 'Outfit, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontFamily: 'Playfair Display', color: 'var(--verde-andes)', fontSize: '28px', fontWeight: 'bold', margin: 0 }}>
          Galería de Fotos del Negocio
        </h1>
        <div style={{ background: 'var(--crema)', border: '1px solid rgba(27,67,50,0.15)', padding: '8px 16px', borderRadius: '4px', fontSize: '13px', color: 'var(--verde-andes)', fontWeight: '500' }}>
          Fotos en Galería: <strong>{photos.length}</strong> / <strong>{limit === Infinity ? 'Ilimitadas' : limit}</strong>
        </div>
      </div>

      {limitReached && (
        <div style={{ background: 'rgba(217, 119, 6, 0.1)', border: '1px solid rgba(217, 119, 6, 0.3)', borderRadius: '8px', padding: '15px', color: '#D97706', fontWeight: 'bold', fontSize: '13px', marginBottom: '30px' }}>
          ⚠️ Has alcanzado el límite de {limit} fotos de tu Plan {biz.subscription_plan.toUpperCase()}. Actualiza de plan en el Resumen para desbloquear más espacio de almacenamiento.
        </div>
      )}

      {/* UPLOAD PHOTO CONTAINER */}
      <div style={{ background: 'var(--crema)', border: '1px solid rgba(27,67,50,0.12)', borderRadius: '12px', padding: '24px', marginBottom: '40px', boxShadow: '0 4px 15px rgba(27,67,50,0.02)' }}>
        <h3 style={{ color: 'var(--verde-andes)', fontSize: '16px', fontWeight: 'bold', marginBottom: '15px' }}>Subir o Registrar Nueva Fotografía</h3>
        <form onSubmit={handleUpload} style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
          <input 
            type="text" 
            placeholder="Introduce la URL de la imagen (ej: /assets/img/hero.jpg o enlace externo)" 
            value={newPhotoUrl}
            onChange={(e) => setNewPhotoUrl(e.target.value)}
            disabled={limitReached}
            style={{ 
              flex: 1, 
              minWidth: '280px', 
              padding: '12px', 
              background: '#fff', 
              border: '1px solid rgba(27,67,50,0.2)', 
              borderRadius: '6px', 
              color: 'var(--texto)', 
              fontFamily: 'Outfit',
              outline: 'none'
            }}
          />
          <button 
            type="submit" 
            disabled={uploading || limitReached}
            style={{ 
              padding: '12px 24px', 
              background: limitReached ? 'rgba(27,67,50,0.1)' : 'var(--verde-andes)', 
              color: limitReached ? 'rgba(27,67,50,0.4)' : '#fff', 
              border: 'none', 
              borderRadius: '6px', 
              fontWeight: 'bold', 
              cursor: uploading || limitReached ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s'
            }}
          >
            {uploading ? 'Subiendo...' : 'Añadir Imagen'}
          </button>
        </form>
      </div>

      {/* PHOTOS GRID & REORDERING */}
      <h3 style={{ fontFamily: 'Playfair Display', color: 'var(--verde-andes)', fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>
        Organizar Imágenes (Reordenar y Eliminar)
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '24px' }}>
        {photos.map((url, idx) => (
          <div key={idx} style={{ background: '#fff', border: '1px solid rgba(27,67,50,0.1)', borderRadius: '10px', overflow: 'hidden', position: 'relative', boxShadow: '0 4px 15px rgba(27,67,50,0.03)' }}>
            <img src={url} alt={`Gallery item ${idx}`} style={{ width: '100%', height: '160px', objectFit: 'cover' }} onError={(e) => { e.target.src = '/assets/img/logo.png'; }} />
            
            <div style={{ padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(27,67,50,0.05)', borderTop: '1px solid rgba(27,67,50,0.08)' }}>
              {/* Order Buttons */}
              <div style={{ display: 'flex', gap: '6px' }}>
                <button 
                  onClick={() => movePhoto(idx, -1)}
                  disabled={idx === 0}
                  style={{ background: '#fff', border: '1px solid rgba(27,67,50,0.15)', color: 'var(--texto)', borderRadius: '4px', padding: '6px 10px', cursor: idx === 0 ? 'not-allowed' : 'pointer', fontSize: '11px', transition: 'all 0.2s' }}
                  title="Mover Izquierda"
                >
                  ◀
                </button>
                <button 
                  onClick={() => movePhoto(idx, 1)}
                  disabled={idx === photos.length - 1}
                  style={{ background: '#fff', border: '1px solid rgba(27,67,50,0.15)', color: 'var(--texto)', borderRadius: '4px', padding: '6px 10px', cursor: idx === photos.length - 1 ? 'not-allowed' : 'pointer', fontSize: '11px', transition: 'all 0.2s' }}
                  title="Mover Derecha"
                >
                  ▶
                </button>
              </div>

              {/* Delete Button */}
              <button 
                onClick={() => handleDelete(idx)}
                style={{ background: 'rgba(217,83,79,0.1)', border: '1px solid rgba(217,83,79,0.2)', color: '#D9534F', borderRadius: '4px', padding: '6px 12px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold', transition: 'all 0.2s' }}
              >
                Eliminar
              </button>
            </div>
            
            {/* Index Badge */}
            <span style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(27,67,50,0.85)', color: '#fff', fontSize: '10px', fontWeight: 'bold', padding: '4px 10px', borderRadius: '20px', letterSpacing: '0.5px' }}>
              Posición: {idx + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
