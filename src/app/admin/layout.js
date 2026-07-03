import '../style.css';

export default function AdminLayout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--fondo)', color: 'var(--texto)', fontFamily: 'Outfit, sans-serif' }}>
      {/* Sidebar */}
      <aside style={{ width: '260px', backgroundColor: 'var(--crema)', borderRight: '1px solid rgba(27,67,50,0.12)', padding: '2rem', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 15px rgba(27,67,50,0.02)' }}>
        <a href="/" style={{ marginBottom: '2rem', display: 'inline-block' }}>
          <img src="/assets/img/logo.png" alt="Ruta Escondida" style={{ width: '130px' }} />
        </a>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '2rem', fontWeight: 'bold', color: 'var(--verde-andes)', fontFamily: 'Playfair Display' }}>
          Panel Admin
        </h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <a href="/admin" style={{ color: 'var(--verde-andes)', textDecoration: 'none', padding: '10px 14px', borderRadius: '6px', background: 'rgba(27,67,50,0.06)', fontWeight: 'bold', fontSize: '14px', display: 'flex', alignItems: 'center' }}>
            <i className="fa-solid fa-chart-line" style={{ marginRight: '10px', color: 'var(--verde-medio)' }}></i> Dashboard
          </a>
          <a href="/admin/negocios" style={{ color: 'var(--texto)', opacity: 0.85, textDecoration: 'none', padding: '10px 14px', fontSize: '14px', display: 'flex', alignItems: 'center', transition: 'all 0.2s' }}>
            <i className="fa-solid fa-store" style={{ marginRight: '10px', opacity: 0.7 }}></i> Gestión de Negocios
          </a>
          <a href="/admin/usuarios" style={{ color: 'var(--texto)', opacity: 0.85, textDecoration: 'none', padding: '10px 14px', fontSize: '14px', display: 'flex', alignItems: 'center', transition: 'all 0.2s' }}>
            <i className="fa-solid fa-users" style={{ marginRight: '10px', opacity: 0.7 }}></i> Usuarios
          </a>
          <a href="/admin/configuracion" style={{ color: 'var(--texto)', opacity: 0.85, textDecoration: 'none', padding: '10px 14px', fontSize: '14px', display: 'flex', alignItems: 'center', transition: 'all 0.2s' }}>
            <i className="fa-solid fa-cog" style={{ marginRight: '10px', opacity: 0.7 }}></i> Configuración (SaaS)
          </a>
        </nav>
        <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid rgba(27,67,50,0.12)' }}>
          <a href="/login" style={{ color: '#D9383A', fontWeight: 'bold', textDecoration: 'none', display: 'flex', alignItems: 'center', fontSize: '14px' }}>
            <i className="fa-solid fa-sign-out-alt" style={{ marginRight: '10px' }}></i> Cerrar Sesión
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '3rem', overflowY: 'auto', backgroundColor: 'var(--fondo)' }}>
        {children}
      </main>
    </div>
  )
}
