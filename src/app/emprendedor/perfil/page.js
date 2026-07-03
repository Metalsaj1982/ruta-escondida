"use client";

import { useState, useEffect } from 'react';
import { dbManager } from '../../../lib/db';

export default function EmprendedorProfile() {
  const [biz, setBiz] = useState(null);
  const [saving, setSaving] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  useEffect(() => {
    async function loadData() {
      const activeBizId = localStorage.getItem('active_business_id') || 'glamping';
      const business = await dbManager.getBusinessById(activeBizId);
      setBiz(business);
    }
    loadData();
  }, []);

  const handleChange = (e) => {
    if (!biz) return;
    setBiz({ ...biz, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!biz) return;
    setSaving(true);
    
    await dbManager.updateBusiness(biz.id, biz);
    
    setSaving(false);
    alert('¡Perfil de negocio guardado y actualizado en el sistema!');
  };

  if (!biz) return <div style={{ color: 'var(--texto)' }}>Cargando Perfil...</div>;

  const plan = biz.subscription_plan;
  const isFree = plan === 'free';
  const isBasicoOrPremium = plan === 'basico' || plan === 'premium';
  const isPremium = plan === 'premium';

  return (
    <div style={{ color: 'var(--texto)', fontFamily: 'Outfit, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '35px' }}>
        <h1 style={{ fontFamily: 'Playfair Display', color: 'var(--verde-andes)', fontSize: '28px', fontWeight: 'bold', margin: 0 }}>
          Configurar mi Negocio
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '13px', color: 'var(--texto)', opacity: 0.8 }}>Plan Activo:</span>
            <strong style={{ background: 'var(--verde-medio)', color: '#fff', padding: '6px 14px', borderRadius: '4px', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '1px' }}>
              {plan}
            </strong>
          </div>
          <button 
            type="button"
            onClick={() => setShowUpgradeModal(true)}
            style={{ background: 'var(--oro)', color: 'var(--negro)', border: 'none', padding: '6px 14px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.5px' }}
          >
            Cambiar Plan
          </button>
        </div>
      </div>

      <div style={{ background: 'var(--crema)', border: '1px solid rgba(27,67,50,0.12)', borderRadius: '12px', padding: '35px', maxWidth: '900px', boxShadow: '0 4px 15px rgba(27,67,50,0.02)' }}>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '250px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--verde-andes)', fontSize: '13px', fontWeight: 'bold' }}>Nombre del Negocio</label>
              <input 
                type="text" 
                name="name" 
                value={biz.name} 
                onChange={handleChange}
                style={{ width: '100%', padding: '12px', background: '#fff', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '6px', color: 'var(--texto)', fontFamily: 'Outfit', outline: 'none' }}
              />
            </div>
            <div style={{ flex: 1, minWidth: '250px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--verde-andes)', fontSize: '13px', fontWeight: 'bold' }}>Categoría Principal</label>
              <select 
                name="category" 
                value={biz.category} 
                onChange={handleChange}
                style={{ width: '100%', padding: '12px', background: '#fff', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '6px', color: 'var(--texto)', fontFamily: 'Outfit', fontWeight: 'bold', outline: 'none' }}
              >
                <option value="hospedaje">🏡 Hospedaje</option>
                <option value="gastronomia">🍴 Gastronomía / Restaurantes</option>
                <option value="experiencias">🗺️ Experiencias & Guías</option>
                <option value="artesanias">🏺 Artesanías Locales</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '250px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--verde-andes)', fontSize: '13px', fontWeight: 'bold' }}>Parroquia de Ubicación</label>
              <select 
                name="parish" 
                value={biz.parish} 
                onChange={handleChange}
                style={{ width: '100%', padding: '12px', background: '#fff', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '6px', color: 'var(--texto)', fontFamily: 'Outfit', fontWeight: 'bold', outline: 'none' }}
              >
                <option value="Puéllaro">Puéllaro</option>
                <option value="Perucho">Perucho</option>
                <option value="Chavezpamba">Chavezpamba</option>
                <option value="Atahualpa">Atahualpa</option>
                <option value="Minas">San José de Minas</option>
              </select>
            </div>
            <div style={{ flex: 1, minWidth: '250px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--verde-andes)', fontSize: '13px', fontWeight: 'bold' }}>Horario de Atención</label>
              <input 
                type="text" 
                name="schedule" 
                placeholder="Lunes a Domingo: 08:00 - 18:00"
                value={biz.schedule || ''} 
                onChange={handleChange}
                style={{ width: '100%', padding: '12px', background: '#fff', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '6px', color: 'var(--texto)', fontFamily: 'Outfit', outline: 'none' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--verde-andes)', fontSize: '13px', fontWeight: 'bold' }}>
              Descripción {isFree && "(Plan FREE: Máximo 150 caracteres)"}
            </label>
            <textarea 
              name="description" 
              maxLength={isFree ? 150 : undefined}
              value={biz.description} 
              onChange={handleChange}
              rows="4"
              style={{ width: '100%', padding: '12px', background: '#fff', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '6px', color: 'var(--texto)', fontFamily: 'Outfit', resize: 'vertical', outline: 'none' }}
            ></textarea>
          </div>

          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '250px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--verde-andes)', fontSize: '13px', fontWeight: 'bold' }}>Foto Principal (URL o Ruta)</label>
              <input 
                type="text" 
                name="photo"
                value={biz.photo}
                onChange={handleChange}
                style={{ width: '100%', padding: '12px', background: '#fff', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '6px', color: 'var(--texto)', fontFamily: 'Outfit', outline: 'none' }}
              />
            </div>
            <div style={{ flex: 1, minWidth: '250px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--verde-andes)', fontSize: '13px', fontWeight: 'bold' }}>
                Video de Presentación (URL o Mp4) {!isPremium && "🔒 (Premium)"}
              </label>
              <input 
                type="text" 
                name="video_url"
                disabled={!isPremium}
                placeholder={isPremium ? "https://www.w3schools.com/html/mov_bbb.mp4" : "Bloqueado por plan actual"}
                value={biz.video_url || ''}
                onChange={handleChange}
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  background: isPremium ? '#fff' : 'rgba(27,67,50,0.05)', 
                  border: '1px solid rgba(27,67,50,0.2)', 
                  borderRadius: '6px', 
                  color: isPremium ? 'var(--texto)' : 'rgba(27,67,50,0.4)', 
                  fontFamily: 'Outfit',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '250px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--verde-andes)', fontSize: '13px', fontWeight: 'bold' }}>Dirección Física / Ubicación en texto</label>
              <input 
                type="text" 
                name="location"
                value={biz.location}
                onChange={handleChange}
                style={{ width: '100%', padding: '12px', background: '#fff', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '6px', color: 'var(--texto)', fontFamily: 'Outfit', outline: 'none' }}
              />
            </div>
            <div style={{ flex: 1, minWidth: '250px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--verde-andes)', fontSize: '13px', fontWeight: 'bold' }}>
                Enlace a Google Maps {isFree && "🔒 (Básico/Premium)"}
              </label>
              <input 
                type="text" 
                name="google_maps_url"
                disabled={isFree}
                placeholder={isFree ? "Bloqueado por plan FREE" : "https://maps.google.com/?q=..."}
                value={isFree ? '' : (biz.google_maps_url || '')}
                onChange={handleChange}
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  background: !isFree ? '#fff' : 'rgba(27,67,50,0.05)', 
                  border: '1px solid rgba(27,67,50,0.2)', 
                  borderRadius: '6px', 
                  color: !isFree ? 'var(--texto)' : 'rgba(27,67,50,0.4)', 
                  fontFamily: 'Outfit',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* CONTACT INFO (Restricted by Plan Free) */}
          <div style={{ background: '#fff', border: '1px solid rgba(27,67,50,0.1)', padding: '24px', borderRadius: '8px' }}>
            <h4 style={{ fontSize: '14px', color: 'var(--verde-medio)', fontWeight: 'bold', marginBottom: '18px' }}>Información de Contacto Pública para Visitantes</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', flexWrap: 'wrap' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--texto)', fontSize: '13px', fontWeight: '500' }}>
                  Teléfono / WhatsApp de Ventas {isFree && "🔒 (Oculto al visitante)"}
                </label>
                <input 
                  type="text" 
                  name="phone"
                  disabled={isFree}
                  placeholder={isFree ? "Privado (Oculto al público)" : "593984480203"}
                  value={isFree ? '' : biz.phone}
                  onChange={handleChange}
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    background: !isFree ? '#fff' : 'rgba(27,67,50,0.05)', 
                    border: '1px solid rgba(27,67,50,0.2)', 
                    borderRadius: '6px', 
                    color: !isFree ? 'var(--texto)' : 'rgba(27,67,50,0.4)', 
                    fontFamily: 'Outfit',
                    outline: 'none'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--texto)', fontSize: '13px', fontWeight: '500' }}>
                  Correo de Reservas {isFree && "🔒 (Oculto al visitante)"}
                </label>
                <input 
                  type="email" 
                  name="email"
                  disabled={isFree}
                  placeholder={isFree ? "Privado (Oculto al público)" : "reservas@negocio.com"}
                  value={isFree ? '' : (biz.email || '')}
                  onChange={handleChange}
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    background: !isFree ? '#fff' : 'rgba(27,67,50,0.05)', 
                    border: '1px solid rgba(27,67,50,0.2)', 
                    borderRadius: '6px', 
                    color: !isFree ? 'var(--texto)' : 'rgba(27,67,50,0.4)', 
                    fontFamily: 'Outfit',
                    outline: 'none'
                  }}
                />
              </div>
            </div>
          </div>

          {/* SOCIAL MEDIA EDITING */}
          <div style={{ background: '#fff', border: '1px solid rgba(27,67,50,0.1)', padding: '24px', borderRadius: '8px' }}>
            <h4 style={{ fontSize: '14px', color: 'var(--verde-medio)', fontWeight: 'bold', marginBottom: '18px' }}>Redes Sociales</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', flexWrap: 'wrap' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--texto)', fontSize: '13px', fontWeight: '500' }}>Instagram Link</label>
                <input 
                  type="text" 
                  name="instagram"
                  value={biz.instagram || ''}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '12px', background: '#fff', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '6px', color: 'var(--texto)', fontFamily: 'Outfit', outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--texto)', fontSize: '13px', fontWeight: '500' }}>
                  Facebook Link {isFree && "🔒 (Básico/Premium)"}
                </label>
                <input 
                  type="text" 
                  name="facebook"
                  disabled={isFree}
                  placeholder={isFree ? "Bloqueado por plan FREE" : "https://facebook.com/..."}
                  value={isFree ? '' : (biz.facebook || '')}
                  onChange={handleChange}
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    background: !isFree ? '#fff' : 'rgba(27,67,50,0.05)', 
                    border: '1px solid rgba(27,67,50,0.2)', 
                    borderRadius: '6px', 
                    color: !isFree ? 'var(--texto)' : 'rgba(27,67,50,0.4)', 
                    fontFamily: 'Outfit',
                    outline: 'none'
                  }}
                />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px', flexWrap: 'wrap' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--texto)', fontSize: '13px', fontWeight: '500' }}>
                  TikTok Link {isFree && "🔒 (Básico/Premium)"}
                </label>
                <input 
                  type="text" 
                  name="tiktok"
                  disabled={isFree}
                  placeholder={isFree ? "Bloqueado por plan FREE" : "https://tiktok.com/@..."}
                  value={isFree ? '' : (biz.tiktok || '')}
                  onChange={handleChange}
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    background: !isFree ? '#fff' : 'rgba(27,67,50,0.05)', 
                    border: '1px solid rgba(27,67,50,0.2)', 
                    borderRadius: '6px', 
                    color: !isFree ? 'var(--texto)' : 'rgba(27,67,50,0.4)', 
                    fontFamily: 'Outfit',
                    outline: 'none'
                  }}
                />
              </div>
              <div>
                {/* Simulated SEO setup for Premium tier */}
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--texto)', fontSize: '13px', fontWeight: '500' }}>
                  Meta keywords SEO {!isPremium && "🔒 (Premium)"}
                </label>
                <input 
                  type="text" 
                  name="seo_keywords"
                  disabled={!isPremium}
                  placeholder={isPremium ? "glamping, camping quito, turismo perucho, andes" : "Bloqueado por plan actual"}
                  value={isPremium ? (biz.seo_keywords || '') : ''}
                  onChange={handleChange}
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    background: isPremium ? '#fff' : 'rgba(27,67,50,0.05)', 
                    border: '1px solid rgba(27,67,50,0.2)', 
                    borderRadius: '6px', 
                    color: isPremium ? 'var(--texto)' : 'rgba(27,67,50,0.4)', 
                    fontFamily: 'Outfit',
                    outline: 'none'
                  }}
                />
              </div>
            </div>
          </div>

          <div style={{ marginTop: '20px', borderTop: '1px solid rgba(27,67,50,0.1)', paddingTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
            <button 
              type="submit" 
              disabled={saving}
              style={{ 
                padding: '12px 28px', 
                background: 'var(--verde-andes)', 
                color: '#fff', 
                border: 'none', 
                borderRadius: '6px', 
                fontWeight: 'bold', 
                cursor: saving ? 'not-allowed' : 'pointer', 
                fontFamily: 'Outfit',
                transition: 'all 0.3s'
              }}
            >
              {saving ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>

      {showUpgradeModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '35px', width: '100%', maxWidth: '800px', border: '1px solid rgba(27,67,50,0.1)', color: 'var(--texto)', overflowY: 'auto', maxHeight: '90vh', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <h3 style={{ fontFamily: 'Playfair Display', color: 'var(--verde-andes)', fontSize: '24px', fontWeight: 'bold', margin: '0 0 10px 0' }}>Cambiar Plan de Suscripción</h3>
              <p style={{ fontSize: '13.5px', color: '#666', maxWidth: '600px', margin: '0 auto' }}>Actualiza o modifica el plan de tu negocio para activar al instante nuevas características en el Marketplace.</p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              {/* FREE */}
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', background: '#F9F8F6', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ margin: '0 0 8px 0', fontSize: '18px', fontFamily: 'Playfair Display', color: 'var(--verde-andes)' }}>Plan FREE</h4>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', margin: '10px 0', color: 'var(--negro)' }}>$0</div>
                  <p style={{ fontSize: '12px', color: '#666', lineHeight: '1.4' }}>Directorio básico. Galería de 3 fotos. Botón WhatsApp.</p>
                </div>
                <button 
                  type="button"
                  onClick={async () => {
                    const updated = { ...biz, subscription_plan: 'free' };
                    await dbManager.updateBusiness(biz.id, updated);
                    setBiz(updated);
                    setShowUpgradeModal(false);
                    alert("Plan cambiado a FREE.");
                  }}
                  disabled={biz.subscription_plan === 'free'}
                  style={{ marginTop: '20px', width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--verde-medio)', background: biz.subscription_plan === 'free' ? '#e2e8f0' : 'transparent', color: 'var(--verde-medio)', fontWeight: 'bold', cursor: biz.subscription_plan === 'free' ? 'not-allowed' : 'pointer', fontSize: '12px' }}
                >
                  {biz.subscription_plan === 'free' ? 'Activo' : 'Activar FREE'}
                </button>
              </div>

              {/* BASICO */}
              <div style={{ border: '1.5px solid var(--verde-medio)', borderRadius: '12px', padding: '20px', background: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
                <div>
                  <h4 style={{ margin: '0 0 8px 0', fontSize: '18px', fontFamily: 'Playfair Display', color: 'var(--verde-andes)' }}>Plan BÁSICO</h4>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', margin: '10px 0', color: 'var(--negro)' }}>$35/mes</div>
                  <p style={{ fontSize: '12px', color: '#666', lineHeight: '1.4' }}>Catálogo de productos. Galería de 10 fotos. Botón de compra.</p>
                </div>
                <button 
                  type="button"
                  onClick={async () => {
                    const updated = { ...biz, subscription_plan: 'basico' };
                    await dbManager.updateBusiness(biz.id, updated);
                    setBiz(updated);
                    setShowUpgradeModal(false);
                    alert("Plan cambiado a BÁSICO.");
                  }}
                  disabled={biz.subscription_plan === 'basico'}
                  style={{ marginTop: '20px', width: '100%', padding: '8px', borderRadius: '4px', border: 'none', background: biz.subscription_plan === 'basico' ? '#e2e8f0' : 'var(--verde-medio)', color: '#fff', fontWeight: 'bold', cursor: biz.subscription_plan === 'basico' ? 'not-allowed' : 'pointer', fontSize: '12px' }}
                >
                  {biz.subscription_plan === 'basico' ? 'Activo' : 'Activar BÁSICO'}
                </button>
              </div>

              {/* PREMIUM */}
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', background: 'var(--crema)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ margin: '0 0 8px 0', fontSize: '18px', fontFamily: 'Playfair Display', color: 'var(--verde-andes)' }}>Plan PREMIUM</h4>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', margin: '10px 0', color: 'var(--negro)' }}>$180/mes</div>
                  <p style={{ fontSize: '12px', color: '#666', lineHeight: '1.4' }}>Reservas en línea con calendario. Pasarela de pagos. Videos de portada. Chatbot de IA propio.</p>
                </div>
                <button 
                  type="button"
                  onClick={async () => {
                    const updated = { ...biz, subscription_plan: 'premium' };
                    await dbManager.updateBusiness(biz.id, updated);
                    setBiz(updated);
                    setShowUpgradeModal(false);
                    alert("Plan cambiado a PREMIUM.");
                  }}
                  disabled={biz.subscription_plan === 'premium'}
                  style={{ marginTop: '20px', width: '100%', padding: '8px', borderRadius: '4px', border: 'none', background: biz.subscription_plan === 'premium' ? '#e2e8f0' : 'var(--verde-andes)', color: '#fff', fontWeight: 'bold', cursor: biz.subscription_plan === 'premium' ? 'not-allowed' : 'pointer', fontSize: '12px' }}
                >
                  {biz.subscription_plan === 'premium' ? 'Activo' : 'Activar PREMIUM'}
                </button>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <button 
                type="button"
                onClick={() => setShowUpgradeModal(false)}
                style={{ background: 'transparent', border: 'none', color: '#666', cursor: 'pointer', fontSize: '13px', textDecoration: 'underline' }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
