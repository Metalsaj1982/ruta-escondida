"use client";

import { useState, useEffect } from 'react';
import { dbManager } from '../../../lib/db';

export default function EmprendedorReservas() {
  const [biz, setBiz] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function loadData() {
      const activeBizId = localStorage.getItem('active_business_id') || 'glamping';
      const business = await dbManager.getBusinessById(activeBizId);
      setBiz(business);
      if (business) {
        const rsvs = await dbManager.getBookings(business.id);
        setBookings(rsvs);
      }
    }
    loadData();
  }, []);

  const handleApproveBooking = async (id) => {
    const success = await dbManager.updateBookingStatus(id, 'completed');
    if (success) {
      setBookings(bookings.map(b => b.id === id ? { ...b, status: 'completed' } : b));
      alert("¡Reserva aprobada! Las comisiones del 13% se han descontado del saldo disponible.");
      
      // Reload business to update balance
      const activeBizId = localStorage.getItem('active_business_id') || 'glamping';
      const business = await dbManager.getBusinessById(activeBizId);
      setBiz(business);
    }
  };

  if (!biz) return <div style={{ color: 'var(--texto)' }}>Cargando Reservas...</div>;

  return (
    <div style={{ color: 'var(--texto)', fontFamily: 'Outfit, sans-serif' }}>
      <h1 style={{ fontFamily: 'Playfair Display', color: 'var(--verde-andes)', fontSize: '28px', fontWeight: 'bold', marginBottom: '30px' }}>
        Historial de Reservas
      </h1>
      
      <div style={{ background: '#fff', border: '1px solid rgba(27,67,50,0.1)', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(27,67,50,0.03)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--verde-andes)', borderBottom: '1px solid rgba(27, 67, 50, 0.15)' }}>
              <th style={{ padding: '15px 20px', color: '#fff', fontSize: '13px', fontWeight: 'bold' }}>Código</th>
              <th style={{ padding: '15px 20px', color: '#fff', fontSize: '13px', fontWeight: 'bold' }}>Cliente</th>
              <th style={{ padding: '15px 20px', color: '#fff', fontSize: '13px', fontWeight: 'bold' }}>Fecha de Reserva</th>
              <th style={{ padding: '15px 20px', color: '#fff', fontSize: '13px', fontWeight: 'bold' }}>Monto Total</th>
              <th style={{ padding: '15px 20px', color: '#fff', fontSize: '13px', fontWeight: 'bold' }}>Comisión (13%)</th>
              <th style={{ padding: '15px 20px', color: '#fff', fontSize: '13px', fontWeight: 'bold' }}>Estado</th>
              <th style={{ padding: '15px 20px', color: '#fff', fontSize: '13px', fontWeight: 'bold' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ padding: '30px', textAlign: 'center', color: 'var(--texto)', opacity: 0.6 }}>
                  Aún no hay reservas registradas.
                </td>
              </tr>
            ) : (
              bookings.map(booking => (
                <tr key={booking.id} style={{ borderBottom: '1px solid rgba(27,67,50,0.08)' }}>
                  <td style={{ padding: '15px 20px', fontSize: '13.5px', fontWeight: 'bold', color: 'var(--verde-andes)' }}>#{booking.id}</td>
                  <td style={{ padding: '15px 20px', fontSize: '13.5px' }}>{booking.customer_name}</td>
                  <td style={{ padding: '15px 20px', fontSize: '13.5px', color: 'var(--texto)', opacity: 0.85 }}>{booking.date}</td>
                  <td style={{ padding: '15px 20px', fontSize: '13.5px', fontWeight: 'bold' }}>${booking.amount.toFixed(2)} USD</td>
                  <td style={{ padding: '15px 20px', fontSize: '13.5px', color: '#D9383A', fontWeight: 'bold' }}>${booking.commission.toFixed(2)} USD</td>
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
                  <td style={{ padding: '15px 20px' }}>
                    {booking.status === 'pending' ? (
                      <button 
                        onClick={() => handleApproveBooking(booking.id)}
                        style={{ 
                          background: 'var(--verde-andes)', 
                          color: '#fff', 
                          border: 'none', 
                          padding: '6px 12px', 
                          borderRadius: '4px', 
                          cursor: 'pointer', 
                          fontSize: '12px', 
                          fontWeight: 'bold',
                          transition: 'all 0.2s'
                        }}
                      >
                        Aprobar Reserva
                      </button>
                    ) : (
                      <span style={{ color: 'var(--texto)', opacity: 0.5, fontSize: '12px' }}>Completado</span>
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
