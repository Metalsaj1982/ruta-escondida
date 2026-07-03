import '../style.css';

export default function EmprendedorLayout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--fondo)', color: 'var(--texto)', fontFamily: 'Outfit, sans-serif' }}>
      {/* Sidebar */}
      <aside style={{ width: '260px', backgroundColor: 'var(--crema)', borderRight: '1px solid rgba(27,67,50,0.08)', padding: '2rem', display: 'flex', flexDirection: 'column' }}>
        <a href="/" style={{ marginBottom: '2rem', display: 'block' }}>
          <img src="/assets/img/logo.png" alt="Ruta Escondida" style={{ width: '120px' }} />
        </a>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '2rem', fontWeight: '600', color: 'var(--verde-andes)', fontFamily: 'Playfair Display' }}>Panel Emprendedor</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <a href="/emprendedor" style={{ color: 'var(--texto)', textDecoration: 'none', padding: '10px', borderRadius: '6px', background: 'rgba(27,67,50,0.05)', fontWeight: 'bold' }}>
            <i className="fa-solid fa-chart-pie" style={{ marginRight: '10px', color: 'var(--verde-medio)' }}></i> Resumen
          </a>
          <a href="/emprendedor/perfil" style={{ color: 'var(--texto)', textDecoration: 'none', padding: '10px', fontWeight: '500' }}>
            <i className="fa-solid fa-store" style={{ marginRight: '10px' }}></i> Mi Negocio
          </a>
          <a href="/emprendedor/galeria" style={{ color: 'var(--texto)', textDecoration: 'none', padding: '10px', fontWeight: '500' }}>
            <i className="fa-solid fa-images" style={{ marginRight: '10px' }}></i> Galería
          </a>
          <a href="/emprendedor/productos" style={{ color: 'var(--texto)', textDecoration: 'none', padding: '10px', fontWeight: '500' }}>
            <i className="fa-solid fa-box" style={{ marginRight: '10px' }}></i> Mis Productos
          </a>
          <a href="/emprendedor/reservas" style={{ color: 'var(--texto)', textDecoration: 'none', padding: '10px', fontWeight: '500' }}>
            <i className="fa-solid fa-calendar-check" style={{ marginRight: '10px' }}></i> Reservas
          </a>
        </nav>
        <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid rgba(27,67,50,0.1)' }}>
          <a href="/login" style={{ color: '#D9383A', textDecoration: 'none', display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
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
