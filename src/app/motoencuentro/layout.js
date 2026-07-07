export const metadata = {
  title: 'Moto Encuentro Ruta Escondida 2026 – Edición Alchipichí',
  description: 'Inscríbete y asegura tu ticket de sorteo para el 1er Moto Encuentro 2026.',
  openGraph: {
    title: 'Moto Encuentro Ruta Escondida 2026 – Edición Alchipichí',
    description: 'Inscríbete y asegura tu ticket de sorteo para el 1er Moto Encuentro 2026.',
    images: [
      {
        url: 'https://rutaescondida.com/assets/img/motoencuentro_logo.png',
        width: 800,
        height: 600,
        alt: 'Logo Moto Encuentro 2026',
      },
    ],
    type: 'website',
  },
};

export default function MotoEncuentroLayout({ children }) {
  return <>{children}</>;
}
