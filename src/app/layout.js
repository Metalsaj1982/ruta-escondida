import './style.css';
import AiAssistant from './components/AiAssistant';
import WhatsappButton from './components/WhatsappButton';

export const metadata = {
  title: 'Ruta Escondida | Central de Reservas',
  description: 'Descubre los mejores destinos, hospedajes y experiencias de turismo rural en la Ruta Escondida.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning={true}>
      <head>
        <link rel="icon" type="image/jpeg" href="/assets/img/mountain_favicon.jpg" />
        <link rel="apple-touch-icon" href="/assets/img/logo.png" />
        
        {/* Vista previa en enlaces de WhatsApp y redes sociales (Logo Oficial) */}
        <meta property="og:title" content="Ruta Escondida | Central de Reservas" />
        <meta property="og:description" content="Descubre los mejores destinos, hospedajes y experiencias de turismo rural en la Ruta Escondida." />
        <meta property="og:image" content="https://rutaescondida.com/assets/img/logo.png" />
        <meta property="og:type" content="website" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,800;0,900;1,600&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" crossOrigin="" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" crossOrigin=""></script>
        <script src="https://unpkg.com/lucide@latest" async></script>
      </head>
      <body className="ruta-body">
        {children}
        <AiAssistant />
        <WhatsappButton />
      </body>
    </html>
  );
}
