"use client";

import { useState } from 'react';
import { supabase, isMockEnv } from '../../lib/supabase';
import { dbManager } from '../../lib/db';
import { useRouter } from 'next/navigation';
import '../style.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Registration states
  const [isRegistering, setIsRegistering] = useState(false);
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regParish, setRegParish] = useState('Puéllaro');
  const [regCategory, setRegCategory] = useState('hospedaje');
  const [regPhone, setRegPhone] = useState('');
  const [regCourtesy, setRegCourtesy] = useState('');
  const [regDescription, setRegDescription] = useState('');
  const [regPlan, setRegPlan] = useState('free');
  const [regSuccess, setRegSuccess] = useState(false);

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // If using mock DB, simulate login
    if (isMockEnv()) {
      setTimeout(async () => {
        if (email.includes('admin')) {
          localStorage.setItem('active_business_id', 'admin');
          router.push('/admin');
        } else {
          const list = await dbManager.getBusinesses();
          const found = list.find(b => b.email.toLowerCase().trim() === email.toLowerCase().trim());
          if (found) {
            localStorage.setItem('active_business_id', found.id);
          } else {
            localStorage.setItem('active_business_id', 'glamping');
          }
          router.push('/emprendedor');
        }
      }, 1000);
      return;
    }

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
    } else {
      // 🛡️ SECURE ROLE ROUTING (Verified Server-Side by Supabase Auth Session)
      const verifiedEmail = data.user.email?.toLowerCase().trim();

      // 1. Admin verification
      if (verifiedEmail === 'hola@rutaescondida.com' || verifiedEmail === 'admin@rutaescondida.com') {
        localStorage.setItem('active_business_id', 'admin');
        router.push('/admin');
      } else {
        // 2. Business Owner lookup by verified email
        const { data: biz } = await supabase
          .from('businesses')
          .select('id')
          .eq('email', verifiedEmail)
          .maybeSingle();

        if (biz) {
          localStorage.setItem('active_business_id', biz.id);
          router.push('/emprendedor');
        } else {
          // Fallback to local storage business mapping if database sync is pending
          const list = await dbManager.getBusinesses();
          const found = list.find(b => b.email.toLowerCase().trim() === verifiedEmail);
          if (found) {
            localStorage.setItem('active_business_id', found.id);
          } else {
            localStorage.setItem('active_business_id', 'glamping');
          }
          router.push('/emprendedor');
        }
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const newId = regName.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
    const newBiz = {
      id: newId,
      name: regName,
      email: regEmail,
      parish: regParish,
      category: regCategory,
      categoryLabel: regCategory === 'hospedaje' ? '🏡 Hospedaje' : (regCategory === 'gastronomia' ? '🍴 Gastronomía' : (regCategory === 'experiencias' ? '🗺️ Experiencias' : '🏺 Artesanías')),
      phone: regPhone,
      courtesy: regCourtesy,
      description: regDescription,
      status: 'active', // Active immediately so they can log in right away in mock env
      subscription_plan: regPlan,
      photo: '/assets/img/logo.png',
      photos: ['/assets/img/logo.png'],
      commission_balance: 0
    };

    if (!isMockEnv()) {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: regEmail,
        password: regPassword,
        options: {
          data: {
            role: 'emprendedor',
            business_name: regName
          }
        }
      });
      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }
    }

    const success = await dbManager.addBusiness(newBiz);
    setLoading(false);
    if (success) {
      localStorage.setItem('active_business_id', newId);
      setRegSuccess(true);
      // Clear fields
      setRegName('');
      setRegEmail('');
      setRegPassword('');
      setRegPhone('');
      setRegCourtesy('');
      setRegDescription('');
    } else {
      setError('Hubo un error al registrar el negocio. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="login-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--fondo)', padding: '20px' }}>
      <div className="login-box" style={{ background: 'var(--crema)', border: '1px solid rgba(27,67,50,0.15)', borderRadius: '12px', padding: '40px', width: '100%', maxWidth: isRegistering ? '500px' : '400px', textAlign: 'center', boxShadow: '0 4px 20px rgba(27,67,50,0.03)', transition: 'max-width 0.3s ease' }}>
        <a href="/">
          <img src="/assets/img/logo.png" alt="Logo" style={{ width: '120px', marginBottom: '20px' }} />
        </a>
        
        {!isRegistering ? (
          <>
            <h2 style={{ color: 'var(--verde-andes)', marginBottom: '30px', fontFamily: 'Playfair Display', fontWeight: 'bold' }}>Iniciar Sesión</h2>
            
            {error && <div style={{ color: '#D93333', background: 'rgba(217,51,51,0.08)', border: '1px solid rgba(217,51,51,0.2)', padding: '10px', borderRadius: '6px', marginBottom: '20px', fontSize: '13.5px', fontWeight: '500' }}>{error}</div>}
            
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input 
                type="email" 
                placeholder="Correo electrónico" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: '100%', padding: '12px', background: '#fff', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '6px', color: 'var(--texto)', fontFamily: 'Outfit', fontSize: '14.5px', outline: 'none' }}
              />
              <input 
                type="password" 
                placeholder="Contraseña" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: '100%', padding: '12px', background: '#fff', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '6px', color: 'var(--texto)', fontFamily: 'Outfit', fontSize: '14.5px', outline: 'none' }}
              />
              <button 
                type="submit" 
                disabled={loading}
                style={{ marginTop: '10px', padding: '12px', background: 'var(--verde-andes)', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'Outfit', fontSize: '14.5px' }}
              >
                {loading ? 'Ingresando...' : 'Entrar al Panel'}
              </button>
            </form>

            <div style={{ marginTop: '25px', fontSize: '13.5px', color: 'var(--texto)', opacity: 0.8 }}>
              <p>¿Eres emprendedor y no tienes cuenta? <button onClick={() => { setIsRegistering(true); setError(null); setRegSuccess(false); }} style={{ background: 'transparent', border: 'none', color: 'var(--verde-medio)', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'Outfit', fontSize: '13.5px', padding: 0 }}>Regístrate aquí</button></p>
            </div>
          </>
        ) : (
          <>
            <h2 style={{ color: 'var(--verde-andes)', marginBottom: '20px', fontFamily: 'Playfair Display', fontWeight: 'bold' }}>Crear Cuenta de Emprendedor</h2>
            
            {regSuccess && (
              <div style={{ color: 'var(--verde-andes)', background: 'rgba(27,67,50,0.08)', border: '1px solid rgba(27,67,50,0.2)', padding: '15px', borderRadius: '6px', marginBottom: '20px', fontSize: '13.5px', textAlign: 'left' }}>
                <strong>¡Registro Exitoso!</strong> Tu cuenta ha sido creada y activada. Ya puedes iniciar sesión con tus credenciales para configurar tu perfil.
              </div>
            )}

            {error && <div style={{ color: '#D93333', background: 'rgba(217,51,51,0.08)', border: '1px solid rgba(217,51,51,0.2)', padding: '10px', borderRadius: '6px', marginBottom: '20px', fontSize: '13.5px', fontWeight: '500' }}>{error}</div>}
            
            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 'bold', marginBottom: '4px', color: 'var(--verde-andes)' }}>Nombre del Negocio</label>
                <input type="text" required value={regName} onChange={(e) => setRegName(e.target.value)} style={{ width: '100%', padding: '10px', background: '#fff', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '6px', color: 'var(--texto)', fontSize: '13.5px', outline: 'none' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 'bold', marginBottom: '4px', color: 'var(--verde-andes)' }}>Email de Acceso</label>
                  <input type="email" required value={regEmail} onChange={(e) => setRegEmail(e.target.value)} style={{ width: '100%', padding: '10px', background: '#fff', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '6px', color: 'var(--texto)', fontSize: '13.5px', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 'bold', marginBottom: '4px', color: 'var(--verde-andes)' }}>Contraseña</label>
                  <input type="password" required value={regPassword} onChange={(e) => setRegPassword(e.target.value)} style={{ width: '100%', padding: '10px', background: '#fff', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '6px', color: 'var(--texto)', fontSize: '13.5px', outline: 'none' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 'bold', marginBottom: '4px', color: 'var(--verde-andes)' }}>Parroquia</label>
                  <select value={regParish} onChange={(e) => setRegParish(e.target.value)} style={{ width: '100%', padding: '10px', background: '#fff', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '6px', color: 'var(--texto)', fontSize: '13.5px', outline: 'none' }}>
                    <option value="Puéllaro">Puéllaro</option>
                    <option value="Perucho">Perucho</option>
                    <option value="Chavezpamba">Chavezpamba</option>
                    <option value="Atahualpa">Atahualpa</option>
                    <option value="Minas">Minas</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 'bold', marginBottom: '4px', color: 'var(--verde-andes)' }}>Categoría</label>
                  <select value={regCategory} onChange={(e) => setRegCategory(e.target.value)} style={{ width: '100%', padding: '10px', background: '#fff', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '6px', color: 'var(--texto)', fontSize: '13.5px', outline: 'none' }}>
                    <option value="hospedaje">🏡 Hospedaje</option>
                    <option value="gastronomia">🍴 Gastronomía</option>
                    <option value="experiencias">🗺️ Experiencias</option>
                    <option value="artesanias">🏺 Artesanías</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 'bold', marginBottom: '4px', color: 'var(--verde-andes)' }}>Teléfono / WhatsApp</label>
                  <input type="text" required value={regPhone} onChange={(e) => setRegPhone(e.target.value)} placeholder="Ej: 593984480203" style={{ width: '100%', padding: '10px', background: '#fff', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '6px', color: 'var(--texto)', fontSize: '13.5px', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 'bold', marginBottom: '4px', color: 'var(--verde-andes)' }}>Plan de Suscripción</label>
                  <select value={regPlan} onChange={(e) => setRegPlan(e.target.value)} style={{ width: '100%', padding: '10px', background: '#fff', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '6px', color: 'var(--texto)', fontSize: '13.5px', outline: 'none' }}>
                    <option value="free">FREE - Directorio básico ($0)</option>
                    <option value="basico">BÁSICO - Catálogo ($35/mes)</option>
                    <option value="premium">PREMIUM - Completo ($180/mes)</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 'bold', marginBottom: '4px', color: 'var(--verde-andes)' }}>🎁 Cortesía Web Exclusiva para Clientes</label>
                <input type="text" required value={regCourtesy} onChange={(e) => setRegCourtesy(e.target.value)} placeholder="Ej: Cafe gratis por comer en el local, 10% descuento, etc." style={{ width: '100%', padding: '10px', background: '#fff', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '6px', color: 'var(--texto)', fontSize: '13.5px', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 'bold', marginBottom: '4px', color: 'var(--verde-andes)' }}>Descripción Corta</label>
                <textarea required value={regDescription} onChange={(e) => setRegDescription(e.target.value)} rows="2" style={{ width: '100%', padding: '10px', background: '#fff', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '6px', color: 'var(--texto)', fontSize: '13.5px', resize: 'vertical', outline: 'none' }}></textarea>
              </div>
              <div style={{ background: 'rgba(217, 56, 58, 0.05)', border: '1px solid rgba(217, 56, 58, 0.15)', padding: '12px', borderRadius: '6px', fontSize: '11px', lineHeight: '1.5', color: '#B32D2F', marginTop: '5px', textAlign: 'left' }}>
                ⚠️ <strong>Términos de Afiliación:</strong> Al registrarte, te comprometes a otorgar la cortesía indicada a todos los clientes que te contacten o compren por la web. Asimismo, comprendes y aceptas que la plataforma retiene una comisión de intermediación del <strong>13%</strong> sobre el valor total de las reservas confirmadas a través del Marketplace de la Ruta Escondida.
              </div>
              <button 
                type="submit" 
                disabled={loading}
                style={{ marginTop: '10px', padding: '12px', background: 'var(--verde-andes)', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'Outfit', fontSize: '14.5px', textAlign: 'center', width: '100%' }}
              >
                {loading ? 'Registrando...' : 'Registrar Negocio'}
              </button>
            </form>

            <div style={{ marginTop: '20px', fontSize: '13.5px', color: 'var(--texto)', opacity: 0.8 }}>
              <p>¿Ya tienes una cuenta? <button onClick={() => { setIsRegistering(false); setError(null); }} style={{ background: 'transparent', border: 'none', color: 'var(--verde-medio)', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'Outfit', fontSize: '13.5px', padding: 0 }}>Inicia Sesión aquí</button></p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
