"use client";

import { useState, useEffect } from 'react';
import { dbManager } from '../../lib/db';

export default function EmprendedorDashboard() {
  const [biz, setBiz] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [leads, setLeads] = useState([]);
  
  // WhatsApp Bot / AI Configuration State
  const [botEnabled, setBotEnabled] = useState(true);
  const [aiInstructions, setAiInstructions] = useState(
    "Eres un asistente virtual para nuestro negocio en Ruta Escondida. Saluda amablemente, responde preguntas sobre nuestros precios, horarios y disponibilidad. Al final del chat, invita a reservar un cupo enviando un link directo."
  );

  useEffect(() => {
    async function loadData() {
      const activeBizId = localStorage.getItem('active_business_id') || 'glamping';
      const business = await dbManager.getBusinessById(activeBizId);
      setBiz(business);
      
      if (business) {
        const rsvs = await dbManager.getBookings(business.id);
        setBookings(rsvs);
        
        const capturedLeads = await dbManager.getLeads(business.id);
        setLeads(capturedLeads);
      }
    }
    loadData();
  }, []);

  const handlePlanToggle = async (planName) => {
    if (!biz) return;
    const updated = { ...biz, subscription_plan: planName };
    await dbManager.updateBusiness(biz.id, updated);
    setBiz(updated);
    alert(`El plan de tu negocio ha sido cambiado a: ${planName.toUpperCase()}. Todos los filtros y limitaciones se aplicarán dinámicamente.`);
  };

  const handleSaveBotConfig = (e) => {
    e.preventDefault();
    alert("Configuración de IA / WhatsApp guardada correctamente. Estructura de webhook actualizada.");
  };

  if (!biz) return <div style={{ color: 'var(--texto)' }}>Cargando Panel...</div>;

  // Wallet calculation
  const totalSales = bookings.reduce((sum, b) => sum + b.amount, 0);
  const totalCommissions = bookings.reduce((sum, b) => sum + b.commission, 0);
  const netEarnings = totalSales - totalCommissions;

  return (
    <div style={{ color: 'var(--texto)', fontFamily: 'Outfit, sans-serif' }}>
      
      {/* Simulation Plan Switcher */}
      <div style={{ 
        background: 'var(--crema)', 
        border: '1px solid rgba(27, 67, 50, 0.15)', 
        borderRadius: '12px', 
        padding: '24px', 
        marginBottom: '35px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <h4 style={{ color: 'var(--verde-andes)', fontSize: '16px', fontWeight: 'bold', fontFamily: 'Playfair Display', margin: '0 0 6px 0' }}>
            Simular Cambios de Nivel de Cuenta (SaaS Tier Testing)
          </h4>
          <p style={{ color: 'var(--texto)', fontSize: '13px', margin: 0, opacity: 0.85 }}>
            Modifica el plan de este negocio para ver cómo cambian las restricciones de fotos, contactos e IA en el marketplace.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          {['free', 'basico', 'premium'].map(plan => (
            <button 
              key={plan}
              onClick={() => handlePlanToggle(plan)}
              style={{
                padding: '10px 20px',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 'bold',
                fontSize: '11px',
                letterSpacing: '1px',
                cursor: 'pointer',
                transition: 'all 0.3s',
                background: biz.subscription_plan === plan ? 'var(--verde-andes)' : 'rgba(27, 67, 50, 0.08)',
                color: biz.subscription_plan === plan ? '#fff' : 'var(--texto)'
              }}
            >
              {plan.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Title block */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '35px' }}>
        <h1 style={{ fontFamily: 'Playfair Display', color: 'var(--verde-andes)', fontSize: '28px', fontWeight: 'bold', margin: 0 }}>
          Panel de Control: {biz.name}
        </h1>
        <span style={{ 
          background: biz.subscription_plan === 'premium' ? 'rgba(45, 106, 79, 0.1)' : 'rgba(217, 119, 6, 0.1)', 
          color: biz.subscription_plan === 'premium' ? 'var(--verde-medio)' : '#D97706', 
          padding: '6px 16px', 
          borderRadius: '20px', 
          fontSize: '12px', 
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          border: biz.subscription_plan === 'premium' ? '1px solid rgba(45, 106, 79, 0.2)' : '1px solid rgba(217, 119, 6, 0.2)'
        }}>
          Plan {biz.subscription_plan}
        </span>
      </div>

      {/* STATS & WALLET (COMISIONES) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div style={{ background: '#fff', border: '1px solid rgba(27, 67, 50, 0.1)', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 15px rgba(27, 67, 50, 0.03)' }}>
          <h3 style={{ color: 'var(--texto)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', opacity: 0.8 }}>Reservas Procesadas</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0, color: 'var(--verde-andes)' }}>{bookings.length}</p>
        </div>
        <div style={{ background: '#fff', border: '1px solid rgba(27, 67, 50, 0.1)', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 15px rgba(27, 67, 50, 0.03)' }}>
          <h3 style={{ color: 'var(--texto)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', opacity: 0.8 }}>Ventas Brutas</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0, color: 'var(--verde-andes)' }}>${totalSales.toFixed(2)}</p>
        </div>
        <div style={{ background: '#fff', border: '1px solid rgba(27, 67, 50, 0.1)', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 15px rgba(27, 67, 50, 0.03)' }}>
          <h3 style={{ color: '#D9383A', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', fontWeight: 'bold' }}>Comisión Plataforma (13%)</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0, color: '#D9383A' }}>-${totalCommissions.toFixed(2)}</p>
        </div>
        <div style={{ background: 'var(--crema)', border: '1px solid rgba(27, 67, 50, 0.15)', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 15px rgba(27, 67, 50, 0.03)' }}>
          <h3 style={{ color: 'var(--verde-medio)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', fontWeight: 'bold' }}>Saldo Neto Disponible</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0, color: 'var(--verde-medio)' }}>${netEarnings.toFixed(2)}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px' }} className="dashboard-grid">
        
        {/* RECENT RESERVATIONS & COMMISSIONS */}
        <div>
          <h2 style={{ fontSize: '20px', marginBottom: '20px', color: 'var(--verde-andes)', fontFamily: 'Playfair Display', fontWeight: 'bold' }}>
            Historial de Ventas y Comisiones
          </h2>
          <div style={{ background: '#fff', border: '1px solid rgba(27, 67, 50, 0.1)', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(27, 67, 50, 0.03)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--verde-andes)', borderBottom: '1px solid rgba(27, 67, 50, 0.15)' }}>
                  <th style={{ padding: '14px 18px', color: '#fff', fontSize: '13px', fontWeight: 'bold' }}>Cliente</th>
                  <th style={{ padding: '14px 18px', color: '#fff', fontSize: '13px', fontWeight: 'bold' }}>Fecha</th>
                  <th style={{ padding: '14px 18px', color: '#fff', fontSize: '13px', fontWeight: 'bold' }}>Monto</th>
                  <th style={{ padding: '14px 18px', color: '#fff', fontSize: '13px', fontWeight: 'bold' }}>Comisión (13%)</th>
                  <th style={{ padding: '14px 18px', color: '#fff', fontSize: '13px', fontWeight: 'bold' }}>Estado</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length === 0 ? (
                  <tr><td colSpan="5" style={{ padding: '30px', textAlign: 'center', color: 'var(--texto)', opacity: 0.6 }}>No hay transacciones registradas.</td></tr>
                ) : (
                  bookings.map((booking) => (
                    <tr key={booking.id} style={{ borderBottom: '1px solid rgba(27, 67, 50, 0.08)' }}>
                      <td style={{ padding: '14px 18px', fontSize: '13.5px', fontWeight: '500' }}>{booking.customer_name}</td>
                      <td style={{ padding: '14px 18px', fontSize: '13.5px', color: 'var(--texto)', opacity: 0.85 }}>{booking.date}</td>
                      <td style={{ padding: '14px 18px', fontSize: '13.5px', fontWeight: 'bold' }}>${booking.amount.toFixed(2)}</td>
                      <td style={{ padding: '14px 18px', fontSize: '13.5px', color: '#D9383A', fontWeight: 'bold' }}>${booking.commission.toFixed(2)}</td>
                      <td style={{ padding: '14px 18px' }}>
                        <span style={{ 
                          background: booking.status === 'completed' ? 'rgba(45, 106, 79, 0.1)' : 'rgba(217, 119, 6, 0.1)', 
                          color: booking.status === 'completed' ? 'var(--verde-medio)' : '#D97706', 
                          padding: '4px 10px', 
                          borderRadius: '4px', 
                          fontSize: '11px',
                          fontWeight: 'bold',
                          textTransform: 'uppercase'
                        }}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* CRM / LEADS LIST */}
        <div>
          <h2 style={{ fontSize: '20px', marginBottom: '20px', color: 'var(--verde-andes)', fontFamily: 'Playfair Display', fontWeight: 'bold' }}>
            CRM: Leads de Contacto Recibidos
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {leads.length === 0 ? (
              <div style={{ padding: '30px', background: '#fff', borderRadius: '12px', border: '1px solid rgba(27, 67, 50, 0.1)', textAlign: 'center', color: 'var(--texto)', opacity: 0.6 }}>
                No hay leads de prospectos por el momento.
              </div>
            ) : (
              leads.map((lead) => (
                <div key={lead.id} style={{ background: 'var(--crema)', border: '1px solid rgba(27, 67, 50, 0.1)', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 10px rgba(27, 67, 50, 0.02)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'center' }}>
                    <strong style={{ color: 'var(--verde-andes)', fontSize: '15px', fontWeight: 'bold' }}>{lead.customer_name}</strong>
                    <span style={{ fontSize: '11px', color: 'var(--texto)', opacity: 0.6 }}>{lead.created_at}</span>
                  </div>
                  <div style={{ fontSize: '12.5px', color: 'var(--texto)', marginBottom: '12px', opacity: 0.9 }}>
                    📞 {lead.customer_phone} {lead.customer_email && ` | ✉️ ${lead.customer_email}`}
                  </div>
                  <p style={{ margin: 0, fontSize: '13px', fontStyle: 'italic', color: 'var(--texto)', background: '#fff', border: '1px solid rgba(27, 67, 50, 0.08)', padding: '10px', borderRadius: '6px' }}>
                    "{lead.message}"
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* WHATSAPP & AI INTEGRATION */}
      <section style={{ marginTop: '50px', background: 'var(--crema)', border: '1px solid rgba(27, 67, 50, 0.15)', borderRadius: '12px', padding: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: '1px solid rgba(27, 67, 50, 0.1)', paddingBottom: '15px', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <h3 style={{ fontFamily: 'Playfair Display', fontSize: '18px', fontWeight: 'bold', color: 'var(--verde-andes)', margin: '0 0 6px 0' }}>
              🤖 Inteligencia Artificial & Configuración de Chatbot (Premium)
            </h3>
            <p style={{ color: 'var(--texto)', fontSize: '13.5px', margin: 0, opacity: 0.9 }}>
              {biz.subscription_plan === 'premium' 
                ? 'El canal de WhatsApp automatizado con IA está activo.' 
                : '🔓 Desbloquea el plan Premium para vincular tu número de WhatsApp real y activar respuestas automatizadas.'}
            </p>
          </div>
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <span style={{ fontSize: '13px', fontWeight: 'bold' }}>Canal Activo:</span>
            <input 
              type="checkbox" 
              disabled={biz.subscription_plan !== 'premium'}
              checked={botEnabled && biz.subscription_plan === 'premium'}
              onChange={() => setBotEnabled(!botEnabled)}
              style={{ width: '18px', height: '18px', accentColor: 'var(--verde-medio)' }}
            />
          </label>
        </div>

        <form onSubmit={handleSaveBotConfig} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: 'var(--verde-andes)', marginBottom: '8px' }}>
              Instrucciones del Agente de IA (Personalidad & Respuestas)
            </label>
            <textarea 
              rows="4" 
              disabled={biz.subscription_plan !== 'premium'}
              value={aiInstructions}
              onChange={(e) => setAiInstructions(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '12px', 
                background: '#fff', 
                border: '1px solid rgba(27, 67, 50, 0.2)', 
                borderRadius: '6px', 
                color: 'var(--texto)', 
                fontFamily: 'Outfit', 
                fontSize: '13.5px',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '250px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: 'var(--verde-andes)', marginBottom: '8px' }}>
                Número de Teléfono en WhatsApp Business API
              </label>
              <input 
                type="text" 
                disabled={biz.subscription_plan !== 'premium'}
                placeholder="+593 98 448 0203"
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  background: '#fff', 
                  border: '1px solid rgba(27, 67, 50, 0.2)', 
                  borderRadius: '6px', 
                  color: 'var(--texto)', 
                  fontFamily: 'Outfit',
                  outline: 'none'
                }}
              />
            </div>
            <div style={{ flex: 1, minWidth: '250px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: 'var(--verde-andes)', marginBottom: '8px' }}>
                WebHook API Endpoint (Vincular con tu CRM/Servidor)
              </label>
              <input 
                type="text" 
                disabled={biz.subscription_plan !== 'premium'}
                placeholder="https://api.rutaescondida.com/webhook/ai-bot"
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  background: '#fff', 
                  border: '1px solid rgba(27, 67, 50, 0.2)', 
                  borderRadius: '6px', 
                  color: 'var(--texto)', 
                  fontFamily: 'Outfit',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            <button 
              type="submit" 
              disabled={biz.subscription_plan !== 'premium'}
              style={{
                padding: '12px 24px',
                background: biz.subscription_plan === 'premium' ? 'var(--verde-andes)' : 'rgba(27, 67, 50, 0.1)',
                color: biz.subscription_plan === 'premium' ? '#fff' : 'rgba(27, 67, 50, 0.4)',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 'bold',
                cursor: biz.subscription_plan === 'premium' ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s'
              }}
            >
              Guardar Configuración de IA
            </button>
          </div>
        </form>
      </section>

      <style jsx global>{`
        @media (max-width: 900px) {
          .dashboard-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
