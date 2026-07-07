"use client";

import { useState, useEffect } from 'react';
import { supabase, isMockEnv } from '../../lib/supabase';
import { dbManager } from '../../lib/db';
import { useRouter } from 'next/navigation';
import '../style.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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

  // Recovery states
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  const router = useRouter();

  // Detect recovery redirect from Supabase
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const query = new URLSearchParams(window.location.search);
      const hasResetParam = query.get('reset') === 'true';
      const hasHashToken = window.location.hash.includes('access_token');
      
      if (hasResetParam || hasHashToken) {
        setIsResettingPassword(true);
      }
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Check if running on localhost to permit simulation fallback
    const isLocalhost = typeof window !== 'undefined' && 
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

    // If using mock DB, simulate login
    if (isMockEnv()) {
      if (!isLocalhost) {
        setError("Error de Configuración: La base de datos de producción de Supabase no está vinculada. Por favor, configura las variables de entorno en el panel del hosting.");
        setLoading(false);
        return;
      }

      // Enforce validation password check on local simulation for safety
      if (password !== 'admin123' && password !== 'Ruta2026!') {
        setError("Contraseña simulada incorrecta para pruebas locales (usa 'admin123' o 'Ruta2026!')");
        setLoading(false);
        return;
      }

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

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(recoveryEmail, {
      redirectTo: `${window.location.origin}/login?reset=true`
    });

    setLoading(false);
    if (resetError) {
      setError(resetError.message);
    } else {
      setResetSent(true);
      setRecoveryEmail('');
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword
    });

    setLoading(false);
    if (updateError) {
      setError(updateError.message);
    } else {
      alert("¡Tu contraseña ha sido restablecida con éxito! Ya puedes iniciar sesión.");
      setIsResettingPassword(false);
      setIsForgotPassword(false);
      setNewPassword('');
      router.push('/login');
    }
  };

  return (
    <div className="login-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--fondo)', padding: '20px' }}>
      <div className="login-box" style={{ background: 'var(--crema)', border: '1px solid rgba(27,67,50,0.15)', borderRadius: '12px', padding: '40px', width: '100%', maxWidth: isRegistering ? '550px' : '400px', textAlign: 'center', boxShadow: '0 4px 20px rgba(27,67,50,0.03)', transition: 'max-width 0.3s ease' }}>
        <a href="/">
          <img src="/assets/img/logo.png" alt="Logo" style={{ width: '120px', marginBottom: '20px' }} />
        </a>
        
        {/* Recovery: Set New Password Form */}
        {isResettingPassword ? (
          <>
            <h2 style={{ color: 'var(--verde-andes)', marginBottom: '15px', fontFamily: 'Playfair Display', fontWeight: 'bold' }}>Nueva Contraseña</h2>
            <p style={{ fontSize: '13px', color: 'var(--texto)', opacity: 0.8, marginBottom: '20px' }}>Escribe tu nueva contraseña de seguridad a continuación.</p>
            
            {error && <div style={{ color: '#D93333', background: 'rgba(217,51,51,0.08)', border: '1px solid rgba(217,51,51,0.2)', padding: '10px', borderRadius: '6px', marginBottom: '20px', fontSize: '13px' }}>{error}</div>}
            
            <form onSubmit={handleUpdatePassword} style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 'bold', marginBottom: '4px', color: 'var(--verde-andes)' }}>Contraseña de Seguridad</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Escribe al menos 6 caracteres" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    style={{ width: '100%', padding: '12px', paddingRight: '45px', background: '#fff', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '6px', color: 'var(--texto)', fontSize: '14.5px', outline: 'none' }}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: 'var(--verde-andes)', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}
                  >
                    {showPassword ? 'Ocultar' : 'Ver'}
                  </button>
                </div>
              </div>
              <button 
                type="submit" 
                disabled={loading}
                style={{ marginTop: '10px', padding: '12px', background: 'var(--verde-andes)', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '14.5px' }}
              >
                {loading ? 'Guardando...' : 'Restablecer Contraseña'}
              </button>
            </form>
          </>
        ) : isForgotPassword ? (
          /* Recovery: Request Reset Email Form */
          <>
            <h2 style={{ color: 'var(--verde-andes)', marginBottom: '15px', fontFamily: 'Playfair Display', fontWeight: 'bold' }}>Recuperar Acceso</h2>
            
            {resetSent ? (
              <div style={{ color: 'var(--verde-andes)', background: 'rgba(27,67,50,0.08)', border: '1px solid rgba(27,67,50,0.2)', padding: '15px', borderRadius: '6px', marginBottom: '20px', fontSize: '13.5px', textAlign: 'left' }}>
                <strong>¡Correo Enviado!</strong> Si la dirección está registrada, recibirás un enlace de restablecimiento seguro en unos minutos. Revisa también tu carpeta de SPAM.
              </div>
            ) : (
              <p style={{ fontSize: '13px', color: 'var(--texto)', opacity: 0.8, marginBottom: '25px' }}>Ingresa tu correo y te enviaremos un enlace de recuperación seguro.</p>
            )}

            {error && <div style={{ color: '#D93333', background: 'rgba(217,51,51,0.08)', border: '1px solid rgba(217,51,51,0.2)', padding: '10px', borderRadius: '6px', marginBottom: '20px', fontSize: '13px' }}>{error}</div>}
            
            <form onSubmit={handleForgotPassword} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input 
                type="email" 
                placeholder="Ingresa tu correo de cuenta" 
                value={recoveryEmail}
                onChange={(e) => setRecoveryEmail(e.target.value)}
                required
                disabled={resetSent}
                style={{ width: '100%', padding: '12px', background: '#fff', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '6px', color: 'var(--texto)', fontSize: '14.5px', outline: 'none' }}
              />
              <button 
                type="submit" 
                disabled={loading || resetSent}
                style={{ marginTop: '10px', padding: '12px', background: 'var(--verde-andes)', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: (loading || resetSent) ? 'not-allowed' : 'pointer', fontSize: '14.5px' }}
              >
                {loading ? 'Enviando...' : 'Enviar Enlace de Recuperación'}
              </button>
            </form>

            <button 
              onClick={() => { setIsForgotPassword(false); setError(null); setResetSent(false); }}
              style={{ marginTop: '25px', background: 'transparent', border: 'none', color: 'var(--verde-medio)', fontWeight: 'bold', cursor: 'pointer', fontSize: '13.5px' }}
            >
              Volver al inicio de sesión
            </button>
          </>
        ) : !isRegistering ? (
          /* Normal Login Form */
          <>
            <h2 style={{ color: 'var(--verde-andes)', marginBottom: '30px', fontFamily: 'Playfair Display', fontWeight: 'bold' }}>Iniciar Sesión</h2>
            
            {error && <div style={{ color: '#D93333', background: 'rgba(217,51,51,0.08)', border: '1px solid rgba(217,51,51,0.2)', padding: '10px', borderRadius: '6px', marginBottom: '20px', fontSize: '13.5px', fontWeight: '500' }}>{error}</div>}
            
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 'bold', marginBottom: '4px', color: 'var(--verde-andes)' }}>Email de Acceso</label>
                <input 
                  type="email" 
                  placeholder="Correo electrónico" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ width: '100%', padding: '12px', background: '#fff', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '6px', color: 'var(--texto)', fontSize: '14.5px', outline: 'none' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <label style={{ fontSize: '11.5px', fontWeight: 'bold', color: 'var(--verde-andes)' }}>Contraseña</label>
                  <button 
                    type="button"
                    onClick={() => { setIsForgotPassword(true); setError(null); }}
                    style={{ background: 'transparent', border: 'none', color: 'var(--verde-medio)', cursor: 'pointer', fontSize: '11.5px', padding: 0 }}
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
                <div style={{ position: 'relative' }}>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Contraseña" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ width: '100%', padding: '12px', paddingRight: '45px', background: '#fff', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '6px', color: 'var(--texto)', fontSize: '14.5px', outline: 'none' }}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: 'var(--verde-andes)', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}
                  >
                    {showPassword ? 'Ocultar' : 'Ver'}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                style={{ marginTop: '15px', padding: '12px', background: 'var(--verde-andes)', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '14.5px' }}
              >
                {loading ? 'Ingresando...' : 'Entrar al Panel'}
              </button>
            </form>

            <div style={{ marginTop: '25px', fontSize: '13.5px', color: 'var(--texto)', opacity: 0.8 }}>
              <p>¿Eres emprendedor y no tienes cuenta? <button onClick={() => { setIsRegistering(true); setError(null); setRegSuccess(false); }} style={{ background: 'transparent', border: 'none', color: 'var(--verde-medio)', fontWeight: 'bold', cursor: 'pointer', fontSize: '13.5px', padding: 0 }}>Regístrate aquí</button></p>
            </div>
          </>
        ) : (
          /* Entrepreneur Registration Form */
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
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 'bold', marginBottom: '4px', color: 'var(--verde-andes)' }}>Nombre del Negocio *</label>
                <input type="text" required value={regName} onChange={(e) => setRegName(e.target.value)} style={{ width: '100%', padding: '10px', background: '#fff', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '6px', color: 'var(--texto)', fontSize: '13.5px', outline: 'none' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 'bold', marginBottom: '4px', color: 'var(--verde-andes)' }}>Email de Acceso *</label>
                  <input type="email" required value={regEmail} onChange={(e) => setRegEmail(e.target.value)} style={{ width: '100%', padding: '10px', background: '#fff', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '6px', color: 'var(--texto)', fontSize: '13.5px', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 'bold', marginBottom: '4px', color: 'var(--verde-andes)' }}>Contraseña *</label>
                  <div style={{ position: 'relative' }}>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      required 
                      value={regPassword} 
                      onChange={(e) => setRegPassword(e.target.value)} 
                      style={{ width: '100%', padding: '10px', paddingRight: '45px', background: '#fff', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '6px', color: 'var(--texto)', fontSize: '13.5px', outline: 'none' }} 
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: 'var(--verde-andes)', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
                    >
                      {showPassword ? 'Ocultar' : 'Ver'}
                    </button>
                  </div>
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
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 'bold', marginBottom: '4px', color: 'var(--verde-andes)' }}>Teléfono / WhatsApp *</label>
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
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 'bold', marginBottom: '4px', color: 'var(--verde-andes)' }}>🎁 Cortesía Web Exclusiva para Clientes *</label>
                <input type="text" required value={regCourtesy} onChange={(e) => setRegCourtesy(e.target.value)} placeholder="Ej: Cafe gratis por comer en el local, 10% descuento, etc." style={{ width: '100%', padding: '10px', background: '#fff', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '6px', color: 'var(--texto)', fontSize: '13.5px', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 'bold', marginBottom: '4px', color: 'var(--verde-andes)' }}>Descripción Corta *</label>
                <textarea required value={regDescription} onChange={(e) => setRegDescription(e.target.value)} rows="2" style={{ width: '100%', padding: '10px', background: '#fff', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '6px', color: 'var(--texto)', fontSize: '13.5px', resize: 'vertical', outline: 'none' }}></textarea>
              </div>
              <div style={{ background: 'rgba(217, 56, 58, 0.05)', border: '1px solid rgba(217, 56, 58, 0.15)', padding: '12px', borderRadius: '6px', fontSize: '11px', lineHeight: '1.5', color: '#B32D2F', marginTop: '5px', textAlign: 'left' }}>
                ⚠️ <strong>Términos de Afiliación:</strong> Al registrarte, te comprometes a otorgar la cortesía indicada a todos los clientes que te contacten o compren por la web. Asimismo, comprendes y aceptas que la plataforma retiene una comisión de intermediación del <strong>13%</strong> sobre el valor total de las reservas confirmadas a través del Marketplace de la Ruta Escondida.
              </div>
              <button 
                type="submit" 
                disabled={loading}
                style={{ marginTop: '10px', padding: '12px', background: 'var(--verde-andes)', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '14.5px', textAlign: 'center', width: '100%' }}
              >
                {loading ? 'Registrando...' : 'Registrar Negocio'}
              </button>
            </form>

            <div style={{ marginTop: '20px', fontSize: '13.5px', color: 'var(--texto)', opacity: 0.8 }}>
              <p>¿Ya tienes una cuenta? <button onClick={() => { setIsRegistering(false); setError(null); }} style={{ background: 'transparent', border: 'none', color: 'var(--verde-medio)', fontWeight: 'bold', cursor: 'pointer', fontSize: '13.5px', padding: 0 }}>Inicia Sesión aquí</button></p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
