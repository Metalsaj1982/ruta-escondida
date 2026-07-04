import Header from '../../components/Header';
import Footer from '../../components/Footer';

const articlesDb = {
  'san-jose-minas': {
    title: 'San José de Minas: Entre Cascadas Sagradas y Leyendas de Oro y Plata',
    category: 'Ecoturismo e Historia',
    date: 'Junio 2026 · 9 min lectura',
    author: 'Diego Ruiz H. · Guía de Aventura',
    photo: '/assets/img/minas_landscape.png',
    paragraphs: [
      'En el extremo norte del distrito metropolitano de Quito, donde la cordillera de los Andes se suaviza para encontrarse con los valles subtropicales, se halla una de las parroquias más ricas, diversas y enigmáticas de la provincia de Pichincha: San José de Minas. Este territorio forma parte fundamental del corredor turístico de la Ruta Escondida y representa un destino imperdible para los entusiastas del ecoturismo, el senderismo de montaña y el turismo de inmersión cultural en Ecuador.',
      'Caminar por San José de Minas es viajar en el tiempo. Aquí, el aire andino se mezcla con el aroma de plantaciones frutales y de caña de azúcar, mientras que las imponentes laderas montañosas esconden senderos que conducen a cascadas de aguas cristalinas y antiguos vestigios de una de las actividades que dio nombre a esta tierra: la minería colonial de metales preciosos.',
      'Durante la época de la Real Audiencia de Quito (siglos XVI y XVII), expedicionarios españoles e indígenas identificaron ricos yacimientos de oro, plata y otros minerales en las quebradas circundantes del río Guayllabamba. Aunque la explotación minera cesó hace siglos, el nombre persistió y en 1897 la parroquia fue consagrada bajo la protección de San José, consolidando el nombre oficial de San José de Minas. Hoy en día, la verdadera riqueza de la parroquia brota de la fertilidad de su suelo agrícola y la majestuosidad de su entorno natural.',
      'San José de Minas goza de un microclima privilegiado conocido como templado-subtropical de tierras altas. La altitud promedio es de 2.440 metros sobre el nivel del mar, lo que genera temperaturas agradables que oscilan entre los 12 °C y 22 °C a lo largo del año. Minas ofrece un balance perfecto: mañanas soleadas ideales para el senderismo y tardes frescas perfectas para relajarse junto a una chimenea andina.',
      'Para quienes buscan aventura y desconexión absoluta, el principal atractivo natural son sus circuitos hídricos y cascadas. La Cascada Las Naspas, una caída espectacular de aproximadamente 40 metros de altura, y la Cascada Chirisacha ("agua fría y purificadora"), un encañonado estrecho rodeado de helechos gigantes, son espacios sagrados para la meditación andina, el avistamiento de aves y baños energéticos naturales.'
    ],
    infoBox: {
      title: 'Consejos Prácticos para Visitar Minas',
      items: [
        'Lleva ropa de abrigo ligera para las tardes y calzado de senderismo con buen agarre.',
        'Prueba el tradicional helado de chirimoya y las melcochas elaboradas con caña local.',
        'La distancia desde Quito es de aproximadamente 2 horas en auto privado o transporte colectivo.'
      ]
    }
  },
  'sendero-agua': {
    title: 'El Sendero del Agua: La aventura familiar que Ecuador necesita',
    category: 'Turismo Familiar',
    date: 'Mayo 2026 · 8 min lectura',
    author: 'Diego Ruiz H. · Guía de Aventura',
    photo: '/assets/img/sendero_agua_1.jpg',
    paragraphs: [
      'El ritmo de la vida urbana actual impone dinámicas aceleradas que muchas veces aíslan a los niños de la naturaleza. En este contexto, el Sendero del Agua, ubicado en la parroquia de Perucho a lo largo del corredor de la Ruta Escondida, surge como un espacio de desconexión y recreación activa diseñado especialmente para el disfrute seguro de las familias.',
      'Caminar por el Sendero del Agua no es una caminata extenuante de alta montaña. Se trata de un paseo interpretativo de nivel fácil que sigue el curso de antiguos canales de riego coloniales (acequias) y senderos sombreados por densos huertos de mandarinas y limoneros.',
      'El principal atractivo para los niños es la inmediatez del agua. El recorrido invita a cruzar pequeños puentes de madera, interactuar con el riachuelo andino y descubrir la vida silvestre del sector: desde colibríes gigantes hasta mariposas y escarabajos de colores vibrantes.',
      'A mitad del recorrido, el camino desemboca en la emblemática Pequeña Cascada de Alchipichí, un paraje refrescante de aguas puras donde las familias pueden descansar, compartir un box lunch agroecológico y recargar energías bajo el suave sol andino.',
      'Además del valor recreativo, el sendero tiene un importante enfoque pedagógico. Los niños aprenden de dónde provienen las frutas que consumen en casa, observan el compostaje orgánico de primera mano y entran en contacto con los saberes ancestrales del manejo sostenible del agua en las comunidades rurales.'
    ],
    infoBox: {
      title: 'Preparación para el Sendero del Agua',
      items: [
        'Dificultad baja, apta para niños desde los 3 años y adultos mayores.',
        'Llevar sandalias de río o calzado que se pueda mojar, además de una muda de ropa extra.',
        'No olvides protector solar orgánico y repelente de insectos biodegradable.'
      ]
    }
  },
  'salidas-pedagogicas': {
    title: 'Salidas Pedagógicas en la Naturaleza: Por qué los niños aprenden mejor en el campo',
    category: 'Educación Ambiental',
    date: 'Mayo 2026 · 11 min lectura',
    author: 'Diego Ruiz H. · Educador Ambiental',
    photo: '/assets/img/salidas_pedagogicas.png',
    paragraphs: [
      'Estudios pedagógicos recientes demuestran que el aprendizaje abstracto sin contacto práctico reduce significativamente la retención del conocimiento en estudiantes de primaria y secundaria. En Ruta Escondida, abordamos esta problemática transformando la naturaleza andina en un aula de inmersión total.',
      'Nuestras Salidas Pedagógicas están estructuradas bajo la metodología de Aprendizaje Basado en Proyectos (ABP). Los alumnos no asisten a una simple excursión; se transforman en jóvenes científicos que recolectan muestras de suelo, miden el pH de los sustratos agrícolas y analizan las adaptaciones evolutivas de la vegetación del bosque seco andino.',
      'Vinculamos de forma directa la teoría de las aulas con la práctica en el campo. Conceptos de fotosíntesis, geología volcánica, química del nitrógeno y ecología de poblaciones cobran sentido inmediato cuando el estudiante siembra su propia planta o camina entre las formaciones basálticas del cañón de Alchipichí.',
      'Complementamos el rigor educativo con la formación en valores. Las actividades grupales en los senderos andinos fomentan la resiliencia, el liderazgo colaborativo, la empatía y un profundo sentido de corresponsabilidad ecológica en la conservación de los recursos naturales del planeta.',
      'La seguridad es nuestra prioridad número uno. Contamos con coordinadores certificados de primeros auxilios en áreas silvestres, seguros contra accidentes escolares activos y control logístico digitalizado para garantizar una jornada de aprendizaje segura e inolvidable.'
    ],
    infoBox: {
      title: 'Módulos Pedagógicos Disponibles',
      items: [
        'Módulo A: Introducción a la Agroecología y Soberanía Alimentaria.',
        'Módulo B: Geología de los Andes y Formaciones Volcánicas del Cañón.',
        'Módulo C: Biodiversidad y Conservación de Flora y Fauna Endémica.'
      ]
    }
  },
  'gigante-dormido': {
    title: 'El Gigante Dormido: La cumbre andina que cambia perspectivas',
    category: 'Senderismo',
    date: 'Mayo 2026 · 9 min lectura',
    author: 'Diego Ruiz H. · Guía de Aventura',
    photo: '/assets/img/gigante_dormido_2.jpg',
    paragraphs: [
      'Ascender una montaña no es solo una prueba de resistencia física; es una metáfora de superación personal. En la parroquia de Puéllaro, la cordillera andina se alza de forma imponente para dar forma a El Campanario, cariñosamente conocido por los locales como El Gigante Dormido.',
      'Esta ruta de senderismo técnico está recomendada para personas con una condición física moderada y jóvenes a partir de los 10 años. El camino comienza en la base del valle y asciende gradualmente a través de una densa vegetación nativa de tunas, pencos y bosques secos interandinos.',
      'A medida que ganamos altitud, el esfuerzo de las piernas se ve recompensado con la apertura de vistas cada vez más espectaculares. El aire se vuelve más fresco y el zumbido de la ciudad es reemplazado por el silbido constante del viento contra las rocas basálticas.',
      'Hacer cumbre en El Campanario ofrece una de las panorámicas 360° más hermosas y completas de toda la provincia. En un día despejado, es posible divisar las cumbres nevadas del Cayambe y el Cotopaxi, así como el profundo encañonado del río Guayllabamba serpenteando miles de metros abajo.',
      'El descenso se realiza por una ruta alterna que permite visitar cuevas naturales y miradores comunales, completando un circuito de aproximadamente 5 horas que dejará en tu memoria una sensación de logro y paz mental imborrable.'
    ],
    infoBox: {
      title: 'Ficha Técnica del Campanario',
      items: [
        'Altitud máxima: 2.600 metros sobre el nivel del mar.',
        'Tiempo de caminata: Entre 4 y 6 horas dependiendo del ritmo del grupo.',
        'Equipo indispensable: Zapatos de senderismo con buena tracción, gorra, cortavientos, gafas de sol y 2 litros de agua por persona.'
      ]
    }
  }
};

export function generateStaticParams() {
  return [
    { slug: 'san-jose-minas' },
    { slug: 'sendero-agua' },
    { slug: 'salidas-pedagogicas' },
    { slug: 'gigante-dormido' }
  ];
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const article = articlesDb[slug];

  if (!article) {
    return (
      <div style={{ background: 'var(--fondo)', color: 'var(--texto)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '100px 20px' }}>
          <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem', color: 'var(--verde-andes)' }}>Artículo no encontrado</h2>
          <p style={{ margin: '15px 0' }}>El artículo solicitado no existe en nuestro blog.</p>
          <a href="/blog" style={{ color: 'var(--verde-medio)', fontWeight: 'bold' }}>Regresar al Blog</a>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--fondo)', color: 'var(--texto)', minHeight: '100vh', fontFamily: 'Outfit, sans-serif' }}>
      <Header />

      {/* ARTICLE HERO */}
      <section style={{
        position: 'relative',
        height: '55vh',
        background: `linear-gradient(rgba(26,48,40,0.5), rgba(26,48,40,0.9)), url("${article.photo}") center/cover`,
        display: 'flex',
        alignItems: 'flex-end',
        padding: '60px 48px'
      }}>
        <div style={{ maxWidth: '900px', width: '100%', zIndex: 1 }}>
          <a href="/blog" style={{ color: 'var(--oro)', textDecoration: 'none', fontSize: '13px', display: 'inline-block', marginBottom: '15px' }}>
            ← Volver al Blog
          </a>
          <span style={{ color: 'var(--oro)', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '10px' }}>
            ✦ {article.category}
          </span>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#fff', fontWeight: '800', lineHeight: '1.2', margin: '0 0 15px 0' }}>
            {article.title}
          </h1>
          <div style={{ display: 'flex', gap: '20px', fontSize: '12.5px', color: 'rgba(255,255,255,0.7)' }}>
            <span>📅 {article.date}</span>
            <span>✍️ Por {article.author}</span>
          </div>
        </div>
      </section>

      {/* ARTICLE LAYOUT */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 320px',
        gap: '50px',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '80px 48px'
      }} className="article-container">
        
        {/* Main Content */}
        <article style={{ fontSize: '16.5px', lineHeight: '1.8', color: 'var(--texto)' }}>
          {article.paragraphs.map((p, idx) => (
            <p key={idx} style={{ marginBottom: '24px', textAlign: 'justify' }}>
              {p}
            </p>
          ))}

          {/* Info Box */}
          {article.infoBox && (
            <div style={{
              background: 'var(--crema)',
              borderLeft: '4px solid var(--oro)',
              borderRadius: '0 8px 8px 0',
              padding: '24px',
              margin: '35px 0'
            }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '13px', fontWeight: 'bold', color: 'var(--verde-andes)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {article.infoBox.title}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {article.infoBox.items.map((item, idx) => (
                  <li key={idx} style={{ fontSize: '13.5px', display: 'flex', gap: '10px' }}>
                    <span style={{ color: 'var(--oro)' }}>✦</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p style={{ marginTop: '40px', fontSize: '15px', color: 'var(--texto)', fontStyle: 'italic' }}>
            ¿Te gustaría vivir esta experiencia en persona? La Ruta Escondida te espera para una inmersión completa.
          </p>
        </article>

        {/* Sidebar */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          {/* Booking box */}
          <div style={{ background: 'var(--verde-andes)', color: '#fff', padding: '30px 24px', borderRadius: '12px', textAlign: 'center' }}>
            <h3 style={{ fontFamily: 'Playfair Display', fontSize: '20px', color: 'var(--oro)', margin: '0 0 12px 0' }}>Reserva esta Aventura</h3>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', marginBottom: '20px' }}>
              Coordina directamente con nuestro guía local Diego Ruiz H. para planificar tu expedición rural a medida.
            </p>
            <a 
              href="https://wa.me/593984480203?text=Hola%20Diego,%20quiero%20reservar%20una%20expedición%20rural%20a%20Ruta%20Escondida"
              target="_blank"
              rel="noopener"
              style={{
                background: 'var(--oro)',
                color: 'var(--negro)',
                textDecoration: 'none',
                padding: '12px',
                borderRadius: '6px',
                fontWeight: 'bold',
                display: 'block',
                fontSize: '13px'
              }}
            >
              💬 WhatsApp de Reservas
            </a>
          </div>

          {/* Quick specs */}
          <div style={{ background: 'var(--crema)', border: '1px solid rgba(27,67,50,0.1)', padding: '24px', borderRadius: '12px' }}>
            <h4 style={{ margin: '0 0 15px 0', fontSize: '11px', color: 'var(--verde-medio)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Detalles del Destino
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
              <div>
                <strong style={{ display: 'block', color: 'var(--verde-andes)' }}>📍 Ubicación:</strong>
                <span>Alchipichí, Pichincha, Ecuador</span>
              </div>
              <div>
                <strong style={{ display: 'block', color: 'var(--verde-andes)' }}>☀️ Clima:</strong>
                <span>Templado Seco (12°C - 22°C)</span>
              </div>
              <div>
                <strong style={{ display: 'block', color: 'var(--verde-andes)' }}>🧗 Guianza:</strong>
                <span>100% Personalizada e inclusiva</span>
              </div>
            </div>
          </div>

        </aside>

      </div>

      <Footer />
    </div>
  );
}
