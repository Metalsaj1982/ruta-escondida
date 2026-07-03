"use client";

import { useState } from 'react';

export default function AdminUsuarios() {
  const [users] = useState([
    { id: 1, name: 'Carlos Puéllaro', email: 'carlos@puellaro.com', role: 'Emprendedor', status: 'Activo' },
    { id: 2, name: 'Sofía Perucho', email: 'sofia@perucho.org', role: 'Emprendedor', status: 'Activo' },
    { id: 3, name: 'Admin General', email: 'admin@rutaescondida.com', role: 'Administrador', status: 'Activo' }
  ]);

  return (
    <div style={{ fontFamily: 'Outfit, sans-serif' }}>
      <h1 style={{ fontFamily: 'Playfair Display', color: 'var(--verde-andes)', fontSize: '28px', fontWeight: 'bold', margin: 0, marginBottom: '30px' }}>
        Control de Usuarios de la Plataforma
      </h1>

      <div style={{ background: '#fff', border: '1px solid rgba(27,67,50,0.1)', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(27,67,50,0.03)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--verde-andes)', borderBottom: '1px solid rgba(27, 67, 50, 0.15)' }}>
              <th style={{ padding: '15px 20px', color: '#fff', fontWeight: 'bold', fontSize: '13px' }}>ID</th>
              <th style={{ padding: '15px 20px', color: '#fff', fontWeight: 'bold', fontSize: '13px' }}>Nombre</th>
              <th style={{ padding: '15px 20px', color: '#fff', fontWeight: 'bold', fontSize: '13px' }}>Email</th>
              <th style={{ padding: '15px 20px', color: '#fff', fontWeight: 'bold', fontSize: '13px' }}>Rol</th>
              <th style={{ padding: '15px 20px', color: '#fff', fontWeight: 'bold', fontSize: '13px' }}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} style={{ borderBottom: '1px solid rgba(27,67,50,0.08)' }}>
                <td style={{ padding: '15px 20px', color: 'var(--texto)', opacity: 0.6, fontSize: '13.5px' }}>#{user.id}</td>
                <td style={{ padding: '15px 20px', color: 'var(--verde-andes)', fontWeight: 'bold', fontSize: '13.5px' }}>{user.name}</td>
                <td style={{ padding: '15px 20px', fontSize: '13.5px' }}>{user.email}</td>
                <td style={{ padding: '15px 20px', fontSize: '13.5px', fontWeight: '500' }}>{user.role}</td>
                <td style={{ padding: '15px 20px' }}>
                  <span style={{ 
                    background: 'rgba(45, 106, 79, 0.1)', 
                    color: 'var(--verde-medio)', 
                    padding: '4px 10px', 
                    borderRadius: '4px', 
                    fontSize: '11px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase'
                  }}>
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
