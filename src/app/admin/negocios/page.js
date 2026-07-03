"use client";

import { useState, useEffect } from 'react';
import { dbManager } from '../../../lib/db';

export default function AdminNegocios() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newParish, setNewParish] = useState('Puéllaro');
  const [newCategory, setNewCategory] = useState('hospedaje');
  const [newPhone, setNewPhone] = useState('');
  const [newDescription, setNewDescription] = useState('');

  useEffect(() => {
    async function loadData() {
      const bizList = await dbManager.getBusinesses();
      setBusinesses(bizList);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    const success = await dbManager.updateBusiness(id, { status: newStatus });
    if (success) {
      setBusinesses(businesses.map(b => b.id === id ? { ...b, status: newStatus } : b));
      alert(`Estado del negocio #${id} cambiado a ${newStatus.toUpperCase()}.`);
    }
  };

  const handlePlanChange = async (id, newPlan) => {
    const success = await dbManager.updateBusiness(id, { subscription_plan: newPlan });
    if (success) {
      setBusinesses(businesses.map(b => b.id === id ? { ...b, subscription_plan: newPlan } : b));
      alert(`El plan del negocio #${id} ha sido actualizado a ${newPlan.toUpperCase()}.`);
    }
  };

  const handleAddBusiness = async (e) => {
    e.preventDefault();
    const newId = newName.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
    const newBiz = {
      id: newId,
      name: newName,
      email: newEmail,
      parish: newParish,
      category: newCategory,
      categoryLabel: newCategory === 'hospedaje' ? '🏡 Hospedaje' : (newCategory === 'gastronomia' ? '🍴 Gastronomía' : (newCategory === 'experiencias' ? '🗺️ Experiencias' : '🏺 Artesanías')),
      phone: newPhone,
      description: newDescription,
      status: 'active',
      subscription_plan: 'free',
      photo: '/assets/img/logo.png',
      photos: ['/assets/img/logo.png'],
      commission_balance: 0
    };

    const success = await dbManager.addBusiness(newBiz);
    if (success) {
      setBusinesses([...businesses, newBiz]);
      setShowAddModal(false);
      setNewName('');
      setNewEmail('');
      setNewPhone('');
      setNewDescription('');
      alert('Negocio afiliado exitosamente.');
    }
  };

  return (
    <div style={{ fontFamily: 'Outfit, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontFamily: 'Playfair Display', color: 'var(--verde-andes)', margin: 0, fontSize: '28px', fontWeight: 'bold' }}>
          Administración de Afiliados
        </h1>
        <button 
          onClick={() => setShowAddModal(true)}
          style={{ background: 'var(--verde-andes)', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', transition: 'opacity 0.2s' }}
        >
          + Afiliar Nuevo Negocio
        </button>
      </div>

      {showAddModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: '12px', padding: '30px', width: '100%', maxWidth: '500px', border: '1px solid rgba(27,67,50,0.1)', color: 'var(--texto)' }}>
            <h3 style={{ fontFamily: 'Playfair Display', color: 'var(--verde-andes)', fontSize: '20px', fontWeight: 'bold', margin: '0 0 20px 0' }}>Afiliar Nuevo Emprendimiento</h3>
            <form onSubmit={handleAddBusiness} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px', color: 'var(--verde-andes)' }}>Nombre</label>
                <input type="text" required value={newName} onChange={(e) => setNewName(e.target.value)} style={{ width: '100%', padding: '8px 12px', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '6px', fontSize: '13.5px', color: 'var(--texto)', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px', color: 'var(--verde-andes)' }}>Email del Dueño</label>
                <input type="email" required value={newEmail} onChange={(e) => setNewEmail(e.target.value)} style={{ width: '100%', padding: '8px 12px', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '6px', fontSize: '13.5px', color: 'var(--texto)', outline: 'none' }} />
              </div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px', color: 'var(--verde-andes)' }}>Parroquia</label>
                  <select value={newParish} onChange={(e) => setNewParish(e.target.value)} style={{ width: '100%', padding: '8px 12px', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '6px', fontSize: '13.5px', color: 'var(--texto)', outline: 'none' }}>
                    <option value="Puéllaro">Puéllaro</option>
                    <option value="Perucho">Perucho</option>
                    <option value="Chavezpamba">Chavezpamba</option>
                    <option value="Atahualpa">Atahualpa</option>
                    <option value="Minas">Minas</option>
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px', color: 'var(--verde-andes)' }}>Categoría</label>
                  <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)} style={{ width: '100%', padding: '8px 12px', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '6px', fontSize: '13.5px', color: 'var(--texto)', outline: 'none' }}>
                    <option value="hospedaje">Hospedaje</option>
                    <option value="gastronomia">Gastronomía</option>
                    <option value="experiencias">Experiencias</option>
                    <option value="artesanias">Artesanías</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px', color: 'var(--verde-andes)' }}>Teléfono / WhatsApp</label>
                <input type="text" required value={newPhone} onChange={(e) => setNewPhone(e.target.value)} placeholder="593984480203" style={{ width: '100%', padding: '8px 12px', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '6px', fontSize: '13.5px', color: 'var(--texto)', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px', color: 'var(--verde-andes)' }}>Descripción Corta</label>
                <textarea required value={newDescription} onChange={(e) => setNewDescription(e.target.value)} rows="3" style={{ width: '100%', padding: '8px 12px', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '6px', fontSize: '13.5px', color: 'var(--texto)', resize: 'vertical', outline: 'none' }}></textarea>
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '15px' }}>
                <button type="button" onClick={() => setShowAddModal(false)} style={{ background: '#f5f5f5', border: 'none', padding: '10px 18px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', color: '#333' }}>Cancelar</button>
                <button type="submit" style={{ background: 'var(--verde-andes)', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}>Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div style={{ background: '#fff', border: '1px solid rgba(27,67,50,0.1)', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(27,67,50,0.03)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--verde-andes)', borderBottom: '1px solid rgba(27, 67, 50, 0.15)' }}>
              <th style={{ padding: '15px 20px', color: '#fff', fontWeight: 'bold', fontSize: '13px' }}>ID</th>
              <th style={{ padding: '15px 20px', color: '#fff', fontWeight: 'bold', fontSize: '13px' }}>Negocio</th>
              <th style={{ padding: '15px 20px', color: '#fff', fontWeight: 'bold', fontSize: '13px' }}>Ubicación (Parroquia)</th>
              <th style={{ padding: '15px 20px', color: '#fff', fontWeight: 'bold', fontSize: '13px' }}>Categoría</th>
              <th style={{ padding: '15px 20px', color: '#fff', fontWeight: 'bold', fontSize: '13px' }}>Plan Actual (SaaS)</th>
              <th style={{ padding: '15px 20px', color: '#fff', fontWeight: 'bold', fontSize: '13px' }}>Estado</th>
              <th style={{ padding: '15px 20px', color: '#fff', fontWeight: 'bold', fontSize: '13px' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" style={{ padding: '30px', textAlign: 'center', color: 'var(--texto)', opacity: 0.6 }}>
                  Cargando directorio...
                </td>
              </tr>
            ) : (
              businesses.map((biz) => (
                <tr key={biz.id} style={{ borderBottom: '1px solid rgba(27,67,50,0.08)' }}>
                  <td style={{ padding: '15px 20px', color: 'var(--texto)', opacity: 0.6, fontSize: '13.5px' }}>#{biz.id}</td>
                  <td style={{ padding: '15px 20px', color: 'var(--verde-andes)', fontWeight: 'bold', fontSize: '13.5px' }}>{biz.name}</td>
                  <td style={{ padding: '15px 20px', fontSize: '13.5px' }}>{biz.parish}</td>
                  <td style={{ padding: '15px 20px', fontSize: '13.5px', textTransform: 'capitalize' }}>{biz.category}</td>
                  
                  {/* SaaS Plan Selector */}
                  <td style={{ padding: '15px 20px' }}>
                    <select 
                      value={biz.subscription_plan}
                      onChange={(e) => handlePlanChange(biz.id, e.target.value)}
                      style={{ 
                        padding: '6px 12px', 
                        background: '#fff', 
                        border: '1px solid rgba(27,67,50,0.2)', 
                        borderRadius: '6px', 
                        color: 'var(--texto)', 
                        fontFamily: 'Outfit', 
                        fontWeight: 'bold', 
                        fontSize: '12.5px',
                        outline: 'none'
                      }}
                    >
                      <option style={{color:'#1b352b'}} value="free">FREE (Sin costo)</option>
                      <option style={{color:'#1b352b'}} value="basico">BÁSICO ($35/mes)</option>
                      <option style={{color:'#1b352b'}} value="premium">PREMIUM ($180/mes)</option>
                    </select>
                  </td>
 
                  {/* Status */}
                  <td style={{ padding: '15px 20px' }}>
                    <span style={{ 
                      background: biz.status === 'active' ? 'rgba(45, 106, 79, 0.1)' : (biz.status === 'pending' ? 'rgba(217, 119, 6, 0.1)' : (biz.status === 'pending_payment' ? 'rgba(27,67,50,0.1)' : 'rgba(217, 51, 51, 0.1)')), 
                      color: biz.status === 'active' ? 'var(--verde-medio)' : (biz.status === 'pending' ? '#D97706' : (biz.status === 'pending_payment' ? 'var(--verde-medio)' : '#D93333')), 
                      padding: '4px 10px', 
                      borderRadius: '4px', 
                      fontSize: '11px',
                      fontWeight: 'bold',
                      textTransform: 'uppercase'
                    }}>
                      {biz.status === 'pending_payment' ? 'Pendiente Pago' : biz.status}
                    </span>
                    {biz.payment_ref && (
                      <div style={{ fontSize: '11px', color: '#666', marginTop: '5px' }}>
                        Ref: <strong style={{ color: 'var(--verde-medio)' }}>{biz.payment_ref}</strong>
                      </div>
                    )}
                  </td>
 
                  {/* Actions */}
                  <td style={{ padding: '15px 20px', display: 'flex', gap: '8px' }}>
                    {(biz.status === 'pending' || biz.status === 'pending_payment') && (
                      <button 
                        onClick={() => handleStatusChange(biz.id, 'active')} 
                        style={{ background: 'var(--verde-medio)', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '11.5px', fontWeight: 'bold' }}
                      >
                        {biz.status === 'pending_payment' ? 'Verificar Pago & Activar' : 'Aprobar'}
                      </button>
                    )}
                    {biz.status === 'active' ? (
                      <button 
                        onClick={() => handleStatusChange(biz.id, 'suspended')} 
                        style={{ background: 'rgba(217, 51, 51, 0.1)', border: '1px solid rgba(217, 51, 51, 0.2)', color: '#D93333', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '11.5px', fontWeight: 'bold' }}
                      >
                        Suspender
                      </button>
                    ) : (
                      biz.status === 'suspended' && (
                        <button 
                          onClick={() => handleStatusChange(biz.id, 'active')} 
                          style={{ background: 'rgba(45, 106, 79, 0.1)', border: '1px solid rgba(45, 106, 79, 0.2)', color: 'var(--verde-medio)', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '11.5px', fontWeight: 'bold' }}
                        >
                          Reactivar
                        </button>
                      )
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
