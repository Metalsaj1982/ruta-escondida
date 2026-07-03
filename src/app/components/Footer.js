export default function Footer() {
  return (
    <footer style={{ background: 'var(--verde-andes)', color: '#fff', padding: '80px 48px 40px 48px', marginTop: 'auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', maxWidth: '1200px', margin: '0 auto', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '40px' }}>
        <div>
          <h4 style={{ color: 'var(--oro)', marginBottom: '15px', fontFamily: 'Outfit' }}>Ruta Escondida</h4>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6' }}>Conectamos agricultores y emprendedores locales con turistas que buscan desconexión y naturaleza en el norte de Pichincha, Ecuador.</p>
        </div>
        <div>
          <h4 style={{ color: 'var(--oro)', marginBottom: '15px', fontFamily: 'Outfit' }}>Destinos Andinos</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', padding: 0 }}>
            <li><a href="/negocios?parish=Puéllaro" style={{ color: '#fff', textDecoration: 'none' }}>Puéllaro</a></li>
            <li><a href="/negocios?parish=Perucho" style={{ color: '#fff', textDecoration: 'none' }}>Perucho</a></li>
            <li><a href="/negocios?parish=Chavezpamba" style={{ color: '#fff', textDecoration: 'none' }}>Chavezpamba</a></li>
            <li><a href="/negocios?parish=Atahualpa" style={{ color: '#fff', textDecoration: 'none' }}>Atahualpa</a></li>
            <li><a href="/negocios?parish=Minas" style={{ color: '#fff', textDecoration: 'none' }}>San José de Minas</a></li>
          </ul>
        </div>
        <div>
          <h4 style={{ color: 'var(--oro)', marginBottom: '15px', fontFamily: 'Outfit' }}>Explora</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', padding: 0 }}>
            <li><a href="/negocios" style={{ color: '#fff', textDecoration: 'none' }}>Negocios Locales</a></li>
            <li><a href="/salidas-pedagogicas" style={{ color: '#fff', textDecoration: 'none' }}>Salidas Pedagógicas</a></li>
            <li><a href="/galeria" style={{ color: '#fff', textDecoration: 'none' }}>Galería de Fotos</a></li>
            <li><a href="/blog" style={{ color: '#fff', textDecoration: 'none' }}>Blog & Artículos</a></li>
          </ul>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
        <span>© 2026 Ruta Escondida · Corredor Turístico Norcentral · Todos los derechos reservados</span>
        <div style={{ display: 'flex', gap: '15px' }}>
          <a href="https://instagram.com" style={{ color: '#fff' }}><i className="fa-brands fa-instagram"></i></a>
          <a href="https://facebook.com" style={{ color: '#fff' }}><i className="fa-brands fa-facebook"></i></a>
        </div>
      </div>
    </footer>
  );
}
