"use client";

import { useState, useEffect } from 'react';
import { dbManager } from '../../lib/db';

export default function AdminDashboard() {
  const [businesses, setBusinesses] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const bizList = await dbManager.getBusinesses();
      setBusinesses(bizList);
      
      const rsvList = await dbManager.getBookings();
      setBookings(rsvList);
      
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) return <div style={{ color: 'var(--texto)', fontStyle: 'italic' }}>Cargando Métricas...</div>;

  // Global calculations
  const totalBiz = businesses.length;
  const pendingBiz = businesses.filter(b => b.status === 'pending').length;
  
  // Calculate MRR: Básico is $35/mo, Premium is $180/mo, Free is $0/mo
  const totalMRR = businesses.reduce((sum, b) => {
    if (b.status !== 'active') return sum;
    if (b.subscription_plan === 'basico') return sum + 35;
    if (b.subscription_plan === 'premium') return sum + 180;
    return sum;
  }, 0);

  const totalCommissions = bookings.reduce((sum, b) => sum + (b.commission || 0), 0);

  return (
    <div style={{ fontFamily: 'Outfit, sans-serif' }}>
      <h1 style={{ fontFamily: 'Playfair Display', color: 'var(--verde-andes)', fontSize: '28px', fontWeight: 'bold', margin: 0, marginBottom: '30px' }}>
        Dashboard Ejecutivo (SaaS Administrador)
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div style={{ background: 'var(--crema)', border: '1px solid rgba(27,67,50,0.12)', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 15px rgba(27,67,50,0.02)' }}>
          <h3 style={{ color: 'var(--texto)', opacity: 0.7, fontSize: '13px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '10px' }}>Total Negocios Registrados</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0, color: 'var(--verde-andes)' }}>{totalBiz}</p>
        </div>
        
        <div style={{ background: 'var(--crema)', border: '1px solid rgba(27,67,50,0.12)', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 15px rgba(27,67,50,0.02)' }}>
          <h3 style={{ color: 'var(--texto)', opacity: 0.7, fontSize: '13px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '10px' }}>Ingresos SaaS MRR (Suscripción)</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0, color: 'var(--verde-medio)' }}>${totalMRR.toFixed(2)} <span style={{ fontSize: '14px', fontWeight: 'normal' }}>/mes</span></p>
        </div>
        
        <div style={{ background: 'var(--crema)', border: '1px solid rgba(27,67,50,0.12)', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 15px rgba(27,67,50,0.02)' }}>
          <h3 style={{ color: 'var(--texto)', opacity: 0.7, fontSize: '13px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '10px' }}>Comisiones Acumuladas (Marketplace 13%)</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0, color: 'var(--verde-medio)' }}>${totalCommissions.toFixed(2)}</p>
        </div>
        
        <div style={{ 
          background: pendingBiz > 0 ? 'rgba(217,119,6,0.1)' : 'var(--crema)', 
          border: pendingBiz > 0 ? '1px solid rgba(217,119,6,0.3)' : '1px solid rgba(27,67,50,0.12)', 
          borderRadius: '12px', 
          padding: '20px',
          boxShadow: '0 4px 15px rgba(27,67,50,0.02)'
        }}>
          <h3 style={{ color: pendingBiz > 0 ? '#D97706' : 'var(--texto)', opacity: pendingBiz > 0 ? 1 : 0.7, fontSize: '13px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '10px' }}>Aprobaciones Pendientes</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0, color: pendingBiz > 0 ? '#D97706' : 'var(--texto)' }}>{pendingBiz} Negocios</p>
        </div>
      </div>

      <h2 style={{ fontSize: '20px', marginBottom: '20px', color: 'var(--verde-andes)', fontFamily: 'Playfair Display', fontWeight: 'bold' }}>
        Historial Global de Transacciones (Pasarelas de Pago)
      </h2>
      
      <div style={{ background: '#fff', border: '1px solid rgba(27,67,50,0.1)', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(27,67,50,0.03)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--verde-andes)', borderBottom: '1px solid rgba(27, 67, 50, 0.15)' }}>
              <th style={{ padding: '15px 20px', color: '#fff', fontWeight: 'bold', fontSize: '13px' }}>Código Transacción</th>
              <th style={{ padding: '15px 20px', color: '#fff', fontWeight: 'bold', fontSize: '13px' }}>Cliente</th>
              <th style={{ padding: '15px 20px', color: '#fff', fontWeight: 'bold', fontSize: '13px' }}>Monto Transado</th>
              <th style={{ padding: '15px 20px', color: '#fff', fontWeight: 'bold', fontSize: '13px' }}>Comisión Plataforma (13%)</th>
              <th style={{ padding: '15px 20px', color: '#fff', fontWeight: 'bold', fontSize: '13px' }}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ padding: '30px', textAlign: 'center', color: 'var(--texto)', opacity: 0.6 }}>
                  No se registran pagos en la plataforma.
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr key={booking.id} style={{ borderBottom: '1px solid rgba(27,67,50,0.08)' }}>
                  <td style={{ padding: '15px 20px', fontSize: '13.5px', fontWeight: 'bold', color: 'var(--verde-andes)' }}>
                    #TXN-{booking.id.toUpperCase()}
                  </td>
                  <td style={{ padding: '15px 20px', fontSize: '13.5px' }}>{booking.customer_name}</td>
                  <td style={{ padding: '15px 20px', fontSize: '13.5px', fontWeight: 'bold' }}>${booking.amount.toFixed(2)} USD</td>
                  <td style={{ padding: '15px 20px', fontSize: '13.5px', color: 'var(--verde-medio)', fontWeight: 'bold' }}>
                    +${booking.commission.toFixed(2)} USD
                  </td>
                  <td style={{ padding: '15px 20px' }}>
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
  );
}
