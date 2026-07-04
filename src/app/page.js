"use client";

import { useState, useEffect } from 'react';
import { dbManager } from '../lib/db';
import Header from './components/Header';
import './style.css';
import './cart.css';

// The 6 original products from index.html
const baseProducts = [
  {
    id: 'aceite',
    name: 'Aceite Extra Virgen de Aguacate',
    category: 'Gastronomía · Origen Alchipichí · 2.100 msnm',
    description: 'Prensado en frío a 2.100 msnm. Rico en Omega 3, 6 y 9. Sabor a fruto verde con notas herbáceas. Acompaña ensaladas y carnes de forma exquisita.',
    price: 7.50,
    badge: 'Más Vendido',
    photo: '/assets/img/aceite_hero.png',
    business_id: 'mirador_alchipichi'
  },
  {
    id: 'serum',
    name: 'Sérum Facial de Aguacate',
    category: 'Cosmética · Vegano · Artesanal',
    description: 'Vitamina E natural, Omega 9 y extracto de aloe andino. Hidratación profunda sin químicos ni aditivos artificiales.',
    price: 6.50,
    badge: 'Nuevo',
    photo: '/assets/img/serum_facial.png',
    business_id: 'mirador_alchipichi'
  },
  {
    id: 'mandarinas',
    name: 'Mandarinas Frescas de Alchipichí',
    category: 'Fruta Fresca · Agroecológico · 2.100 msnm',
    description: 'Cultivadas a 2.100 msnm, dulces y jugosas. Cosechadas bajo pedido para asegurar su frescura directo del árbol.',
    price: 3.00,
    badge: 'Cosecha del Día',
    photo: '/assets/img/mandarinas_frescas.png',
    business_id: 'mirador_alchipichi'
  },
  {
    id: 'te-naranja',
    name: 'Té de Hojas de Aguacate con Naranja',
    category: 'Infusión · Bienestar · 100% Orgánico',
    description: 'Hojas de aguacate seleccionadas y de naranja deshidratadas. Un bálsamo digestivo y relajante natural sin cafeína.',
    price: 5.00,
    badge: 'Recomendado',
    photo: '/assets/img/te_aguacate.png',
    business_id: 'mirador_alchipichi'
  },
  {
    id: 'aguacates',
    name: 'Aguacates Frescos de Alchipichí',
    category: 'Fruta Fresca · Agroecológico · 2.100 msnm',
    description: 'Cosechados a mano en la Finca de Alchipichí. Textura cremosa, sabor andino auténtico y alto valor nutricional.',
    price: 2.30,
    badge: 'Popular',
    photo: '/assets/img/aguacates_frescos.png',
    business_id: 'mirador_alchipichi'
  },
  {
    id: 'huevos',
    name: 'Huevos Felices de Pastoreo',
    category: 'Granja · Pastoreo Libre · Alchipichí',
    description: 'Gallinas criadas en libertad alimentadas con aguacates, pasto fresco y granos seleccionados. Calidad excepcional.',
    price: 6.00,
    badge: 'Más Vendido',
    photo: '/assets/img/huevos_felices.png',
    business_id: 'mirador_alchipichi'
  }
];

// The 10 original experiences from index.html
const baseExperiences = [
  {
    id: 'exp_atahualpa',
    name: 'Cascadas de Atahualpa',
    category: 'aventura',
    parish: 'Atahualpa',
    photo: '/assets/img/sendero_portada.jpg',
    badge: 'Recomendado',
    price: 15.00,
    duration: '4 horas',
    rating: '4.9 (124 reviews)',
    description: 'Senderismo guiado hacia las cascadas indómitas de Atahualpa. Incluye ingreso a senderos de conservación, hidratación natural y almuerzo campestre.',
    business_id: 'restaurante_alchipichi'
  },
  {
    id: 'exp_tayos',
    name: 'Encañonado de los Tayos',
    category: 'aventura',
    parish: 'Atahualpa',
    photo: '/assets/img/tayos_cave_2.jpg',
    badge: 'Aventura',
    price: 19.00,
    duration: '6 horas',
    rating: '5.0 (98 reviews)',
    description: 'Una expedición inolvidable por un cañón de roca y agua a pocas horas de Quito. Cruce de ríos y senderismo guiado por el lecho andino.',
    business_id: 'restaurante_alchipichi'
  },
  {
    id: 'glamping',
    name: 'Legado Alchipichí',
    category: 'hospedaje',
    parish: 'Chavezpamba',
    photo: '/assets/img/glamping_alchipichi.png',
    badge: 'Premium',
    price: 45.00,
    duration: '1 noche',
    rating: '4.8 (82 reviews)',
    description: 'Duerme en un domo glamping de lujo con vista panorámica de 360° al cañón de Alchipichí. Jacuzzi privado, fogata andina y desayuno agroecológico.',
    business_id: 'glamping'
  },
  {
    id: 'exp_luz',
    name: 'Cerro La Luz',
    category: 'aventura',
    parish: 'Puéllaro',
    photo: '/assets/img/gigante_dormido_2.jpg',
    badge: 'Senderismo',
    price: 12.00,
    duration: '3 horas',
    rating: '4.9 (45 reviews)',
    description: 'Caminata de ascenso al mirador andino de Puéllaro. Contempla el valle del río Guayllabamba y participa en el sembrado de un árbol nativo.',
    business_id: 'glamping'
  },
  {
    id: 'restaurante',
    name: 'Paraíso Escondido',
    category: 'comunidad',
    parish: 'Chavezpamba',
    photo: '/assets/img/restaurante_alchipichi.png',
    badge: 'Comunitario',
    price: 25.00,
    duration: '1 día',
    rating: '4.9 (67 reviews)',
    description: 'Visita guiada al huerto comunitario de Alchipichí. Incluye cosecha de mandarinas, taller de cocina andina limpia y cata de aceites.',
    business_id: 'restaurante_alchipichi'
  },
  {
    id: 'cafe',
    name: 'Mindo Chocolate',
    category: 'gastronomia',
    parish: 'Perucho',
    photo: '/assets/img/cafe_alchipichi.png',
    badge: 'Taller Cacao',
    price: 15.00,
    duration: '2.5 horas',
    rating: '5.0 (130 reviews)',
    description: 'Descubre el proceso de elaboración del chocolate artesanal. Cata sensorial guiada con café andino cultivado y tostado localmente.',
    business_id: 'cafe_perucho'
  },
  {
    id: 'hosteria_sol_minas',
    name: 'Mariposario de la Ruta',
    category: 'comunidad',
    parish: 'Minas',
    photo: '/assets/img/hosteria_minas.png',
    badge: 'Conservación',
    price: 8.00,
    duration: '2 horas',
    rating: '4.7 (54 reviews)',
    description: 'Recorrido guiado dentro del santuario de mariposas en San José de Minas. Ideal para niños y avistamiento de biodiversidad andina.',
    business_id: 'hosteria_sol_minas'
  },
  {
    id: 'hosteria_sol_minas_moto',
    name: 'Ruta Motera La Culebrilla',
    category: 'aventura',
    parish: 'Minas',
    photo: '/assets/img/minas_landscape.png',
    badge: 'Aventura',
    price: 35.00,
    duration: '5 horas',
    rating: '4.9 (37 reviews)',
    description: 'Recorrido de adrenalina en motocicleta por las antiguas calzadas empedradas de La Culebrilla en las cumbres de Minas.',
    business_id: 'hosteria_sol_minas'
  },
  {
    id: 'artesanias',
    name: 'Salidas Pedagógicas',
    category: 'educativo',
    parish: 'Chavezpamba',
    photo: '/assets/img/salidas_pedagogicas.png',
    badge: 'Turismo Educativo',
    price: 20.00,
    duration: 'Escolar',
    rating: '5.0 (73 reviews)',
    description: 'Talleres interactivos de agroecología, siembra, cosecha y cata de aceites para escuelas, colegios y universidades.',
    business_id: 'mirador_alchipichi'
  },
  {
    id: 'artesanias_comunidad',
    name: 'Turismo Comunitario Alchipichí',
    category: 'comunidad',
    parish: 'Chavezpamba',
    photo: '/assets/img/artesanias_alchipichi.png',
    badge: 'Comunitario',
    price: 30.00,
    duration: 'Full Day',
    rating: '4.9 (41 reviews)',
    description: 'Inmersión cultural andina. Comparte con familias locales de Alchipichí, aprende alfarería y técnicas de siembra andina.',
    business_id: 'mirador_alchipichi'
  }
];

const testimonials = [
  {
    category: 'agua',
    stars: '⭐⭐⭐⭐⭐',
    quote: 'La primera aventura ecológica real de mis hijos (4 y 7 años). Su cara al llegar a la cascada y sellar su Pasaporte de Explorador no tiene precio. Diego es un guía sensacional, paciente y con un conocimiento increíble. ¡Volveremos!',
    author: 'Gabriela Torres',
    meta: 'Quito · Exploración Familiar',
    tag: '💧 Sendero del Agua'
  },
  {
    category: 'gigante',
    stars: '⭐⭐⭐⭐⭐',
    quote: 'El ascenso a El Campanario fue exigente pero totalmente recompensado con la vista 360° más espectacular de los Andes. El campamento base y el café de especialidad al amanecer completan una experiencia de montaña premium. ¡Altamente recomendado!',
    author: 'Sebastián Rengel',
    meta: 'Ambato · Senderismo Técnico',
    tag: '🏔️ Gigante Dormido'
  },
  {
    category: 'tayos',
    stars: '⭐⭐⭐⭐⭐',
    quote: 'Una expedición de aventura cinematográfica. Caminar entre esas paredes gigantes de piedra y cruzar el río es mágico. Se siente como estar explorando un mundo secreto a pocas horas de la ciudad. El almuerzo campestre con aguacates locales fue la gloria.',
    author: 'Estefanía Paz',
    meta: 'Quito · Exploración Extrema',
    tag: '⚡ Encañonado de los Tayos'
  },
  {
    category: 'pedagogica',
    stars: '⭐⭐⭐⭐⭐',
    quote: 'Trajimos a 40 alumnos de bachillerato y fue un éxito rotundo. Aprendieron agroecología y conservación en el campo, conectándose de verdad con el origen de los alimentos. El material didáctico previo y el taller de prensado son excelentes herramientas didácticas.',
    author: 'Mariana Vinueza',
    meta: 'Docente Colegio Bilingüe',
    tag: '🏫 Salida Pedagógica'
  }
];

export default function Home() {
  // Loader States
  const [loaderPercent, setLoaderPercent] = useState(0);
  const [loaderComplete, setLoaderComplete] = useState(false);
  const [hideLoader, setHideLoader] = useState(true);

  // Cart & Product Detail States
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  // General States
  const [points, setPoints] = useState(0);
  const [experienceFilter, setExperienceFilter] = useState('all');
  const [testimonialFilter, setTestimonialFilter] = useState('all');
  const [mapTab, setMapTab] = useState('auto'); // 'auto' | 'bus'

  // CRM Booking Modal State
  const [bookingExperience, setBookingExperience] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingStep, setBookingStep] = useState('form'); // 'form' | 'gateway_mock' | 'completed'

  // Form Fields for booking CRM
  const [crmName, setCrmName] = useState('');
  const [crmEmail, setCrmEmail] = useState('');
  const [crmPhone, setCrmPhone] = useState('');
  const [crmCity, setCrmCity] = useState('');
  const [crmCountry, setCrmCountry] = useState('');
  const [crmTripType, setCrmTripType] = useState('familia');
  const [crmGuests, setCrmGuests] = useState(2);
  const [crmDate, setCrmDate] = useState('');
  const [crmNotes, setCrmNotes] = useState('');

  // Stripe/Payphone Simulated Card Fields
  const [crmCardNumber, setCrmCardNumber] = useState('');
  const [crmCardExpiry, setCrmCardExpiry] = useState('');
  const [crmCardCvv, setCrmCardCvv] = useState('');
  const [isProcessingBooking, setIsProcessingBooking] = useState(false);

  // Checkout product states
  const [checkoutStep, setCheckoutStep] = useState('form'); // 'form' | 'gateway_mock' | 'completed'
  const [checkoutName, setCheckoutName] = useState('');
  const [checkoutPhone, setCheckoutPhone] = useState('');
  const [checkoutAddress, setCheckoutAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('stripe'); // 'stripe' | 'payphone' | 'whatsapp'
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const [searchParish, setSearchParish] = useState('all');
  const [searchCategory, setSearchCategory] = useState('all');
  const [searchDate, setSearchDate] = useState('');

  function handleEnterSite() {
    setHideLoader(true);
    setTimeout(() => {
      if (typeof window !== 'undefined' && window.L) {
        const lat = 0.1200;
        const lng = -78.3791;
        const container = window.L.DomUtil.get('map-leaflet');
        if (container != null) {
          container._leaflet_id = null;
        }
        const map = window.L.map('map-leaflet', { scrollWheelZoom: false }).setView([lat, lng], 13);
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const marker = window.L.marker([lat, lng]).addTo(map);
        marker.bindPopup(`
          <div style="font-family: 'Outfit', sans-serif; font-size:12px; color:#1a1a1a; line-height:1.5;">
            <strong style="font-family: 'Playfair Display', serif; font-size:15px; color:var(--verde-andes); display:block; margin-bottom:4px;">Ruta Escondida</strong>
            Finca Agroecológica y Turismo de Inmersión<br>
            Alchipichí, Pichincha, Ecuador<br>
            <a href="https://maps.google.com/?q=${lat},${lng}" target="_blank" rel="noopener" style="color:var(--oro); font-weight:bold; text-decoration:none; display:inline-block; margin-top:6px;">📍 Abrir en Google Maps</a>
          </div>
        `).openPopup();
      }
    }, 500);
  }

  // Loader Interval Simulation
  useEffect(() => {
    handleEnterSite();
  }, []);

  const handleSearchSubmit = () => {
    if (searchCategory !== 'all') {
      setExperienceFilter(searchCategory);
    } else {
      setExperienceFilter('all');
    }
    const section = document.getElementById('experiencias-destacadas');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddToCart = (product, quantity = 1) => {
    const itemsToAdd = Array(quantity).fill(product);
    setCart([...cart, ...itemsToAdd]);
    setSelectedProduct(null);
    setQty(1);
    setPoints(prev => prev + (5 * quantity)); // Minor loyalty points reward
  };

  const handleRemoveFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  };

  // Product E-commerce checkout submit
  const handleProcessCheckout = (e) => {
    e.preventDefault();
    if (paymentMethod === 'whatsapp') {
      const message = encodeURIComponent(
        `¡Hola Ruta Escondida! Quiero concretar mi compra de la tienda:\n\n` +
        cart.map(item => `- ${item.name} ($${item.price.toFixed(2)})`).join('\n') +
        `\n\nTotal: $${getCartTotal().toFixed(2)} USD\nCliente: ${checkoutName}\nTeléfono: ${checkoutPhone}\nDirección: ${checkoutAddress}`
      );
      window.open(`https://wa.me/593984480203?text=${message}`, '_blank');
      setCart([]);
      setShowCheckoutModal(false);
      setPoints(prev => prev + 25);
      return;
    }
    
    setCheckoutStep('gateway_mock');
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
    }, 1500);
  };

  const handleConfirmMockPayment = async () => {
    setIsProcessingPayment(true);
    
    // Distribute platform commissions (13%) dynamically to 'mirador_alchipichi' business account!
    for (const item of cart) {
      await dbManager.createBooking({
        business_id: 'mirador_alchipichi',
        customer_name: checkoutName || "Comprador de Tienda",
        customer_phone: checkoutPhone || "0999999999",
        date: new Date().toLocaleDateString(),
        guests: 1,
        amount: item.price,
        status: 'completed'
      });
    }

    setTimeout(() => {
      setIsProcessingPayment(false);
      setCheckoutStep('completed');
      setPoints(prev => prev + 150); // Large points reward on payment!
    }, 1500);
  };

  // Experience CRM Booking Flow submit
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingStep('gateway_mock');
    setIsProcessingBooking(true);
    setTimeout(() => {
      setIsProcessingBooking(false);
    }, 1200);
  };

  const handleConfirmBookingPayment = async () => {
    if (!bookingExperience) return;
    setIsProcessingBooking(true);

    const comVal = bookingExperience.price * 0.13;
    
    // Record simulation CRM lead
    await dbManager.createLead({
      business_id: bookingExperience.business_id,
      name: crmName,
      phone: crmPhone,
      message: `Reserva para "${bookingExperience.name}". Tipo: ${crmTripType}, Huespedes: ${crmGuests}, Fecha: ${crmDate}. Ciudad: ${crmCity}, Nota: ${crmNotes}`
    });

    // Record booking and distribute balance (87% to business, 13% platform fee)
    await dbManager.createBooking({
      business_id: bookingExperience.business_id,
      customer_name: crmName,
      customer_phone: crmPhone,
      date: crmDate,
      guests: Number(crmGuests),
      amount: bookingExperience.price,
      status: 'completed'
    });

    setTimeout(() => {
      setIsProcessingBooking(false);
      setBookingStep('completed');
      setPoints(prev => prev + 250); // Award points on booking success
    }, 1500);
  };

  const handleBookingWhatsappSkip = async () => {
    if (!bookingExperience) return;
    
    // Record lead in database anyway
    await dbManager.createLead({
      business_id: bookingExperience.business_id,
      name: crmName || "Interesado Anónimo",
      phone: crmPhone || "Sin Teléfono",
      message: `Interés en WhatsApp para "${bookingExperience.name}". Fecha sugerida: ${crmDate}`
    });

    const msg = encodeURIComponent(
      `¡Hola Ruta Escondida! Quiero cotizar/reservar por WhatsApp:\n\nExperiencia: ${bookingExperience.name}\nDestino: ${bookingExperience.parish}\nPrecio: $${bookingExperience.price.toFixed(2)} USD\nCliente: ${crmName}\nWhatsApp: ${crmPhone}\nPersonas: ${crmGuests}\nFecha: ${crmDate}\nNotas: ${crmNotes}`
    );
    window.open(`https://wa.me/593984480203?text=${msg}`, '_blank');
    setShowBookingModal(false);
    setPoints(prev => prev + 50);
  };

  // Triggers for modals
  const triggerExperienceBooking = (exp) => {
    setBookingExperience(exp);
    setBookingStep('form');
    setShowBookingModal(true);
  };

  const triggerGeneralPlanner = () => {
    setBookingExperience({
      id: 'general_planner',
      name: 'Planificación Personalizada de Ruta',
      price: 0,
      parish: 'Todas',
      business_id: 'mirador_alchipichi'
    });
    setBookingStep('form');
    setShowBookingModal(true);
  };

  const filteredExperiences = baseExperiences.filter(exp => {
    const matchesParish = searchParish === 'all' || exp.parish === searchParish;
    const matchesCategory = experienceFilter === 'all' || exp.category === experienceFilter;
    return matchesParish && matchesCategory;
  });

  const filteredTestimonials = testimonialFilter === 'all'
    ? testimonials
    : testimonials.filter(t => t.category === testimonialFilter);

  return (
    <>
      {/* 🚀 Loading HUD Loader */}
      {!hideLoader && (
        <div id="site-loader" style={{ display: 'block', opacity: 1, transition: 'opacity 0.5s ease' }}>
          <div className="loader-bg"></div>
          <div className="loader-grid-overlay"></div>
          <div className="loader-container">
            <div className="loader-info-top">
              <div className="info-line"><span className="prompt">&gt;</span> SISTEMA: <span className="val">EXPEDICIÓN ACTIVA</span></div>
              <div className="info-line"><span className="prompt">&gt;</span> REGÍMEN: <span className="val">CONSERVACIÓN ANDINA</span></div>
              <div className="info-line"><span className="prompt">&gt;</span> COORDENADAS: <span className="val">0°07'12"N / 78°22'45"W</span></div>
            </div>
            
            <div className="loader-info-right">
              <div className="info-line"><span className="prompt">&gt;</span> ALTITUD: <span className="val">2.100 MSN</span></div>
              <div className="info-line"><span className="prompt">&gt;</span> DESTINO: <span className="val">ALCHIPICHÍ, ECUADOR</span></div>
            </div>

            <div className="loader-hud">
              <div className="hud-circle-wrapper">
                <svg className="hud-svg" viewBox="0 0 200 200">
                  <circle className="hud-track" cx="100" cy="100" r="85" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" strokeDasharray="3 6" />
                  <circle className="hud-fill" cx="100" cy="100" r="85" fill="none" stroke="var(--oro)" strokeWidth="4" strokeDasharray="3 6" strokeDashoffset={534 - (534 * loaderPercent) / 100} />
                </svg>
                <div className="hud-data">
                  <div className="hud-number">{loaderPercent}</div>
                  <div className="hud-status">{loaderPercent < 100 ? 'CONECTANDO' : 'LISTO'}</div>
                </div>
              </div>
            </div>

            <div className="loader-copyright">
              <span>RUTA ESCONDIDA © 2026</span>
              <span>TURISMO DE INMERSIÓN DE ALTA GAMA</span>
            </div>

            {loaderComplete && (
              <div className="loader-action" style={{ display: 'block', opacity: 1 }}>
                <button className="btn-expedicion" onClick={handleEnterSite}>
                  <span className="btn-exp-text">INICIAR EXPEDICIÓN</span>
                  <span className="decor decor-tl"></span>
                  <span className="decor decor-tr"></span>
                  <span className="decor decor-bl"></span>
                  <span className="decor decor-br"></span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <Header cartCount={cart.length} onCartClick={() => setShowCart(true)} />

      {/* HERO SECTION */}
      <section id="hero">
        <div className="hero-bg" id="hero-bg" style={{ backgroundImage: "url('/assets/img/ruta_hero.png')" }}></div>
        <video autoPlay loop muted playsInline id="hero-video" poster="/assets/img/ruta_hero.png">
          <source src="/assets/img/hero_video.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-label">Experiencias Auténticas · Ecuador Rural</span>
          <h1 className="hero-title">
            Descubre pueblitos mágicos<br />en la <em>Ruta Escondida.</em>
          </h1>
          <p className="hero-sub">Reserva experiencias auténticas directamente con Ruta Escondida. Turismo comunitario, educativo, de aventura y gastronomía local sin intermediarios.</p>
          


          <div className="scroll-hint">
            <span>Explorar Experiencias</span>
            <div className="scroll-line"></div>
          </div>
        </div>
      </section>

      {/* 5 PARROQUIAS DESTINOS RECOMENDADOS SECTION */}
      <section style={{ background: 'var(--verde-andes)', padding: '100px 24px', color: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <span style={{ color: 'var(--oro)', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>Corredor de las 5 Parroquias</span>
          <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem', margin: '15px 0 20px 0', color: '#fff' }}>Destinos Recomendados</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '600px', margin: '0 auto 50px auto', fontSize: '14.5px' }}>
            Explora el patrimonio natural y cultural del norte de Pichincha. Destinos andinos con encanto rural, huertos de chirimoyas y miradores increíbles.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            {[
              { name: 'Puéllaro', desc: 'El portal frutal de la Ruta. Famoso por sus chirimoyas, aguacates y el Cerro de la Luz.', img: '/assets/img/puellaro_hero_humanized_1777073946552.png', tag: '🌄 Miradores · 🥑 Frutales', path: '/negocios?parish=Puéllaro', premium: true },
              { name: 'Perucho', desc: 'Historia viva y sabor tradicional. Iglesias de madera centenarias, sancocho y mandarinas.', img: '/assets/img/cafe_alchipichi.png', tag: '⛪ Templos · 🍊 Mandarinas', path: '/negocios?parish=Perucho' },
              { name: 'Atahualpa', desc: 'Tierra de agua. Portal de entrada a cascadas indómitas y al cañón secreto de los Tayos.', img: '/assets/img/minas_landscape.png', tag: '💧 Cascadas · ⚡ Aventura', path: '/negocios?parish=Atahualpa' },
              { name: 'Chavezpamba', desc: 'Balcón de Alchipichí. Glamping premium sobre el cañón, huertos ecológicos y cata de aceites.', img: '/assets/img/glamping_alchipichi.png', tag: '🏡 Glamping · 🔭 Cañón', path: '/negocios?parish=Chavezpamba' },
              { name: 'Minas', desc: 'San José de Minas, senderos de alta montaña, iglesias de piedra tallada y ciclismo rural.', img: '/assets/img/hosteria_minas.png', tag: '🚴 Ciclismo · 🏔️ Páramo', path: '/negocios?parish=Minas' }
            ].map((p, idx) => (
              <a 
                href={p.path} 
                key={idx} 
                style={{ display: 'block', textDecoration: 'none', color: 'inherit', position: 'relative', height: '320px', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.9)), url(${p.img}) center/cover` }}></div>
                {p.premium && (
                  <span style={{ position: 'absolute', top: '15px', left: '15px', background: 'var(--oro)', color: 'var(--negro)', fontSize: '10px', fontWeight: 'bold', padding: '4px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>⭐ Destino Premium</span>
                )}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px', textAlign: 'left' }}>
                  <h3 style={{ fontSize: '20px', fontFamily: 'Playfair Display', fontWeight: 'bold', color: '#fff', marginBottom: '6px' }}>{p.name}</h3>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.4', margin: '0 0 10px 0' }}>{p.desc}</p>
                  <span style={{ fontSize: '10px', fontWeight: 'bold', color: 'var(--oro)', letterSpacing: '0.5px' }}>{p.tag}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCIAS DESTACADAS (10 EXPERIENCIAS DIRECTAS) */}
      <section style={{ padding: '100px 24px', background: 'var(--crema)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ color: 'var(--verde-medio)', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>Catálogo de Reservas Directas</span>
          <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem', color: 'var(--verde-andes)', margin: '15px 0' }}>Experiencias Destacadas</h2>
          <p style={{ color: 'var(--texto)', opacity: 0.8, maxWidth: '600px', margin: '0 auto 40px auto', fontSize: '14.5px' }}>
            Reserva de forma segura tus actividades. Tu pago apoya directamente a los emprendedores locales.
          </p>

          {/* Filters */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginBottom: '40px' }}>
            {[
              { id: 'all', label: 'Todas' },
              { id: 'hospedaje', label: '🏡 Hospedajes' },
              { id: 'aventura', label: '🧭 Aventura' },
              { id: 'gastronomia', label: '🍴 Gastronomía' },
              { id: 'comunidad', label: '🏺 Turismo Comunitario' },
              { id: 'educativo', label: '🏫 Educativo' }
            ].map(f => (
              <button 
                key={f.id}
                onClick={() => setExperienceFilter(f.id)}
                style={{
                  padding: '8px 18px',
                  background: experienceFilter === f.id ? 'var(--verde-medio)' : '#fff',
                  color: experienceFilter === f.id ? '#fff' : 'var(--verde-andes)',
                  border: '1px solid var(--verde-medio)',
                  borderRadius: '30px',
                  fontWeight: 'bold',
                  fontSize: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
            {filteredExperiences.map((exp) => (
              <div 
                key={exp.id} 
                style={{ background: '#fff', border: '1px solid rgba(27,67,50,0.1)', borderRadius: '12px', overflow: 'hidden', textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}
              >
                <div>
                  <div style={{ position: 'relative', height: '180px' }}>
                    <img src={exp.photo} alt={exp.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span style={{ position: 'absolute', top: '12px', left: '12px', background: 'var(--verde-andes)', color: '#fff', fontSize: '10px', fontWeight: 'bold', padding: '3px 8px', borderRadius: '4px' }}>{exp.badge}</span>
                    <span style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'var(--oro)', color: 'var(--negro)', fontSize: '13px', fontWeight: 'bold', padding: '4px 10px', borderRadius: '6px' }}>${exp.price.toFixed(2)}</span>
                  </div>
                  <div style={{ padding: '20px' }}>
                    <span style={{ fontSize: '10px', color: 'var(--verde-medio)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{exp.category.toUpperCase()} / {exp.parish.toUpperCase()}</span>
                    <h4 style={{ fontSize: '17px', color: 'var(--verde-andes)', fontFamily: 'Playfair Display', fontWeight: 'bold', margin: '6px 0 10px 0' }}>{exp.name}</h4>
                    <p style={{ fontSize: '12.5px', color: 'var(--texto)', opacity: 0.8, lineHeight: '1.5', margin: '0 0 15px 0' }}>{exp.description}</p>
                    <div style={{ display: 'flex', gap: '15px', fontSize: '11px', color: 'var(--texto)', opacity: 0.7 }}>
                      <span>⏱️ {exp.duration}</span>
                      <span>⭐ {exp.rating}</span>
                    </div>
                  </div>
                </div>
                <div style={{ padding: '0 20px 20px 20px', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '10px' }}>
                  <button 
                    onClick={() => triggerExperienceBooking(exp)}
                    style={{ background: 'var(--verde-andes)', color: '#fff', padding: '10px', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}
                  >
                    Reservar ahora
                  </button>
                  <button 
                    onClick={() => triggerExperienceBooking(exp)}
                    style={{ background: 'transparent', border: '1px solid rgba(27,67,50,0.2)', color: 'var(--verde-andes)', padding: '10px', borderRadius: '6px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}
                  >
                    Solicitar info
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* TURISMO DE INMERSIÓN */}
      <section id="turismo" style={{ padding: '100px 48px', background: 'var(--crema)', borderTop: '1px solid rgba(27,67,50,0.08)' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span style={{ color: 'var(--verde-medio)', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>Las 3 Joyas de la Corona</span>
          <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem', color: 'var(--verde-andes)' }}>Turismo de Inmersión</h2>
        </div>

        <div className="rutas-grid">
          {/* RUTA 1 */}
          <a href="/gigante-dormido" className="ruta-card" id="ruta-gigante">
            <div className="ruta-card-bg" style={{ backgroundImage: "url('/assets/img/gigante_dormido_2.jpg')" }}></div>
            <div className="ruta-card-overlay"></div>
            <div className="ruta-card-content">
              <div className="ruta-meta-grid">
                <span className="ruta-meta-item">🏔️ Moderado-Exigente</span>
                <span className="ruta-meta-item">⏱️ Full Day</span>
                <span className="ruta-meta-item">🔭 Cumbre 360°</span>
              </div>
              <span className="ruta-tag">✦ El Campanario · Desde $25</span>
              <h3>La Ruta del Gigante Dormido</h3>
              <p>Conquista El Campanario, el guardián de Alchipichí. Las mejores vistas panorámicas 360° de toda la Ruta Escondida.</p>
              <span className="ruta-arrow">Descubrir la expedición →</span>
            </div>
          </a>

          {/* RUTA 2 */}
          <a href="/sendero-agua" className="ruta-card" id="ruta-agua">
            <div className="ruta-card-bg" style={{ backgroundImage: "url('/assets/img/sendero_portada.jpg')" }}></div>
            <div className="ruta-card-overlay"></div>
            <div className="ruta-card-content">
              <div className="ruta-meta-grid">
                <span className="ruta-meta-item">💧 Baja · Familiar</span>
                <span className="ruta-meta-item">⏱️ Medio Día</span>
                <span className="ruta-meta-item">🍊 Cosecha de Cítricos</span>
              </div>
              <span className="ruta-tag">✦ La Pequeña Cascada · Desde $15</span>
              <h3>El Sendero del Agua</h3>
              <p>Magia, agua y cítricos a la medida de la familia. La primera aventura ecológica de tus hijos en Perucho.</p>
              <span className="ruta-arrow">Descubrir la experiencia →</span>
            </div>
          </a>

          {/* RUTA 3 */}
          <a href="/tayos" className="ruta-card" id="ruta-tayos">
            <div className="ruta-card-bg" style={{ backgroundImage: "url('/assets/img/tayos_cave_2.jpg')" }}></div>
            <div className="ruta-card-overlay"></div>
            <div className="ruta-card-content">
              <div className="ruta-meta-grid">
                <span className="ruta-meta-item">🧗 Moderado-Exigente</span>
                <span className="ruta-meta-item">⏱️ Full Day</span>
                <span className="ruta-meta-item">🦇 Espeleología</span>
              </div>
              <span className="ruta-tag">✦ Caverna Secreta · Desde $35</span>
              <h3>El Encañonado de los Tayos</h3>
              <p>Una expedición emocionante entre cascadas subterráneas, paredes gigantes de roca y los misteriosos tayos.</p>
              <span className="ruta-arrow">Descubrir la aventura →</span>
            </div>
          </a>
        </div>
      </section>

      {/* PARALLAX SEPARATOR 1 */}
      <div className="parallax-section" style={{ height: '35vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: 'linear-gradient(rgba(26,48,40,0.65), rgba(26,48,40,0.85)), url("/assets/img/ruta_hero.png") center/cover fixed' }}>
        <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem', color: '#fff', margin: 0 }}>
          "La naturaleza no es un lugar a visitar. Es el hogar."
        </h2>
      </div>

      {/* TIENDA SECTION */}
      <section id="tienda" style={{ padding: '100px 48px', background: 'var(--fondo)' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span style={{ color: 'var(--verde-medio)', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>Del campo a tus manos</span>
          <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem', color: 'var(--verde-andes)' }}>Gastronomía & Productos</h2>
        </div>

        <div className="productos-grid">
          {baseProducts.map(prod => (
            <div 
              key={prod.id} 
              className="producto-card" 
              style={{ background: 'var(--crema)', border: '1px solid rgba(27,67,50,0.1)', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer' }}
              onClick={() => setSelectedProduct(prod)}
            >
              <div className="producto-img">
                <img src={prod.photo} alt={prod.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <span className="grid-badge">{prod.badge}</span>
              </div>
              <div className="producto-info" style={{ padding: '20px' }}>
                <span style={{ fontSize: '11px', color: 'var(--texto)', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '1px', display: 'block' }}>{prod.category}</span>
                <h3 style={{ color: 'var(--verde-andes)', fontSize: '18px', margin: '8px 0 12px 0', fontFamily: 'Playfair Display', fontWeight: 'bold' }}>{prod.name}</h3>
                <p style={{ fontSize: '13px', color: 'var(--texto)', lineHeight: '1.5', marginBottom: '15px' }}>{prod.description.substring(0, 80)}...</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 'bold', color: 'var(--verde-medio)', fontSize: '15px' }}>${prod.price.toFixed(2)} USD</span>
                  <button 
                    className="btn-add" 
                    style={{ background: 'var(--verde-andes)', color: '#fff', padding: '6px 14px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}
                    onClick={(e) => { e.stopPropagation(); handleAddToCart(prod); }}
                  >
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SALIDAS PEDAGÓGICAS SECTION */}
      <section id="pedagogicas" style={{ background: 'var(--crema)', borderTop: '1px solid rgba(27,67,50,0.08)', borderBottom: '1px solid rgba(27,67,50,0.08)' }}>
        <div className="pedagogicas-inner" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr' }}>
          <div className="ped-img" style={{ backgroundImage: "url('/assets/img/salidas_pedagogicas.png')", backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '400px' }}></div>
          <div className="ped-content" style={{ padding: '60px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ color: 'var(--verde-medio)', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '10px' }}>
              Educación y Sostenibilidad
            </span>
            <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem', color: 'var(--verde-andes)', margin: '0 0 15px 0' }}>
              Salidas Pedagógicas
            </h2>
            <p style={{ fontSize: '15px', lineHeight: '1.8', color: 'var(--texto)', marginBottom: '20px' }}>
              Un brochure digital de experiencia viva. Traemos colegios y universidades a la finca para una inmersión en agroecología, biodiversidad andina y producción sostenible. Cada visita es una semilla de conciencia.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 25px 0', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13.5px' }}>
              <li>✓ Proceso completo del aguacate (siembra a producto)</li>
              <li>✓ Taller de prensado en frío y cata de aceites</li>
              <li>✓ Senderismo didáctico e interpretativo de flora local</li>
              <li>✓ Certificado de participación ambiental escolar</li>
            </ul>
            <div style={{ display: 'flex', gap: '15px' }}>
              <a href="/salidas-pedagogicas" style={{ padding: '12px 24px', background: 'var(--verde-andes)', color: '#fff', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold', fontSize: '13px' }}>
                Ver Programas
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PARALLAX SEPARATOR 2 */}
      <div className="parallax-section" style={{ height: '35vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: 'linear-gradient(rgba(26,48,40,0.65), rgba(26,48,40,0.85)), url("/assets/img/gigante_dormido.png") center/cover fixed' }}>
        <div>
          <span style={{ color: 'var(--oro)', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '10px' }}>Origen: Alchipichí · 2.400 msnm</span>
          <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem', color: '#fff', margin: 0 }}>
            Cada producto es un acto de conservación.
          </h2>
        </div>
      </div>

      {/* HISTORIAS LOCALES (BLOG) SECTION */}
      <section style={{ padding: '100px 24px', background: 'var(--verde-andes)', color: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <span style={{ color: 'var(--oro)', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>Cultura e Historia Andina</span>
          <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem', margin: '15px 0 20px 0', color: '#fff' }}>Historias Locales</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '600px', margin: '0 auto 50px auto', fontSize: '14.5px' }}>
            Conoce los relatos, secretos y la mitología de las parroquias norcentrales del corredor turístico.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '30px', borderRadius: '12px', textAlign: 'left' }}>
              <span style={{ color: 'var(--oro)', fontSize: '11px', fontWeight: 'bold' }}>San José de Minas · Aventura</span>
              <h4 style={{ fontFamily: 'Playfair Display', fontSize: '18px', color: '#fff', margin: '10px 0' }}>El Gigante Dormido</h4>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6' }}>
                La leyenda del guardián del cerro El Campanario. Descubre el origen místico de la silueta de piedra que protege el valle de Alchipichí y atrae a montañistas.
              </p>
              <a href="/blog/gigante-dormido" style={{ color: 'var(--oro)', fontSize: '12px', fontWeight: 'bold', textDecoration: 'none', display: 'inline-block', marginTop: '15px' }}>Leer historia completa →</a>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '30px', borderRadius: '12px', textAlign: 'left' }}>
              <span style={{ color: 'var(--oro)', fontSize: '11px', fontWeight: 'bold' }}>Alchipichí · Ecoturismo</span>
              <h4 style={{ fontFamily: 'Playfair Display', fontSize: '18px', color: '#fff', margin: '10px 0' }}>El Sendero del Agua</h4>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6' }}>
                Un recorrido histórico por las acequias y vertientes naturales de agua dulce que alimentan a los huertos frutales del corredor.
              </p>
              <a href="/blog/sendero-agua" style={{ color: 'var(--oro)', fontSize: '12px', fontWeight: 'bold', textDecoration: 'none', display: 'inline-block', marginTop: '15px' }}>Leer historia completa →</a>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '30px', borderRadius: '12px', textAlign: 'left' }}>
              <span style={{ color: 'var(--oro)', fontSize: '11px', fontWeight: 'bold' }}>Educación · Sostenibilidad</span>
              <h4 style={{ fontFamily: 'Playfair Display', fontSize: '18px', color: '#fff', margin: '10px 0' }}>El Campo como Aula Viviente</h4>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6' }}>
                Por qué los niños y estudiantes asimilan mejor la educación ambiental al aire libre. La experiencia del huerto orgánico de Alchipichí y la cuna del aguacate.
              </p>
              <a href="/blog/salidas-pedagogicas" style={{ color: 'var(--oro)', fontSize: '12px', fontWeight: 'bold', textDecoration: 'none', display: 'inline-block', marginTop: '15px' }}>Leer historia completa →</a>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACTO SECTION */}
      <section id="impacto" style={{ padding: '100px 48px', background: 'var(--fondo)', textAlign: 'center' }}>
        <div style={{ marginBottom: '50px' }}>
          <span style={{ color: 'var(--verde-medio)', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>Nuestra Misión</span>
          <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem', color: 'var(--verde-andes)' }}>Midiendo Nuestro Impacto</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', maxWidth: '1000px', margin: '0 auto 50px auto' }}>
          {[
            { num: '800', label: 'Hectáreas conservadas' },
            { num: '12', label: 'Familias locales beneficiadas' },
            { num: '350+', label: 'Estudiantes impactados' },
            { num: '100%', label: 'Producción limpia y orgánica' }
          ].map((stat, idx) => (
            <div key={idx} style={{ background: 'var(--crema)', padding: '40px 20px', borderRadius: '12px', border: '1px solid rgba(27,67,50,0.1)' }}>
              <span style={{ fontSize: '42px', fontWeight: 'bold', color: 'var(--verde-medio)', display: 'block', marginBottom: '8px' }}>{stat.num}</span>
              <span style={{ fontSize: '13px', color: 'var(--texto)', fontWeight: 'bold' }}>{stat.label}</span>
            </div>
          ))}
        </div>

        <blockquote style={{ maxWidth: '800px', margin: '0 auto 40px auto', fontSize: '18px', fontStyle: 'italic', color: 'var(--verde-andes)', lineHeight: '1.6', borderLeft: '3px solid var(--oro)', paddingLeft: '20px' }}>
          "Proteger el ecosistema andino no es un lujo — es la única forma de garantizar agua, alimento y vida para las próximas generaciones."
          <cite style={{ display: 'block', fontSize: '12px', marginTop: '10px', color: 'var(--texto)', fontWeight: 'bold', fontStyle: 'normal' }}>— Ruta Escondida · Alchipichí, Ecuador</cite>
        </blockquote>
      </section>

      {/* TESTIMONIOS (REVIEWS) FILTER SECTION */}
      <section style={{ padding: '100px 48px', background: 'var(--crema)', borderTop: '1px solid rgba(27,67,50,0.08)' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span style={{ color: 'var(--verde-medio)', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>Expedicionarios Satisfechos</span>
          <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem', color: 'var(--verde-andes)' }}>Opiniones Reales</h2>
        </div>

        {/* Filter buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginBottom: '40px' }}>
          {[
            { id: 'all', label: 'Todos' },
            { id: 'agua', label: 'Sendero del Agua' },
            { id: 'gigante', label: 'Gigante Dormido' },
            { id: 'tayos', label: 'Encañonado Tayos' },
            { id: 'pedagogica', label: 'Salidas Pedagógicas' }
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => setTestimonialFilter(btn.id)}
              style={{
                padding: '8px 20px',
                border: '1px solid var(--verde-medio)',
                borderRadius: '30px',
                background: testimonialFilter === btn.id ? 'var(--verde-medio)' : '#fff',
                color: testimonialFilter === btn.id ? '#fff' : 'var(--verde-andes)',
                fontSize: '12px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Testimonials List */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', maxWidth: '1200px', margin: '0 auto' }}>
          {filteredTestimonials.map((t, i) => (
            <div key={i} style={{ background: '#fff', border: '1px solid rgba(27,67,50,0.1)', borderRadius: '12px', padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
              <div>
                <span style={{ fontSize: '14px', display: 'block', marginBottom: '10px' }}>{t.stars}</span>
                <blockquote style={{ fontSize: '13.5px', lineHeight: '1.6', fontStyle: 'italic', margin: '0 0 20px 0', color: 'var(--texto)' }}>
                  "{t.quote}"
                </blockquote>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #eee', paddingTop: '15px' }}>
                <div>
                  <cite style={{ fontSize: '13px', fontWeight: 'bold', fontStyle: 'normal', color: 'var(--verde-andes)', display: 'block' }}>{t.author}</cite>
                  <span style={{ fontSize: '11px', color: 'var(--texto)', opacity: 0.8 }}>{t.meta}</span>
                </div>
                <span style={{ fontSize: '11px', background: 'var(--crema)', color: 'var(--verde-medio)', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold' }}>{t.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </section>



      {/* UBICACIÓN & CÓMO LLEGAR */}
      <section id="ubicacion" style={{ padding: '100px 48px', background: 'var(--crema)', borderTop: '1px solid rgba(27,67,50,0.08)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '50px', maxWidth: '1200px', margin: '0 auto' }}>
          <div>
            <span style={{ color: 'var(--verde-medio)', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '10px' }}>Planifica tu Expedición</span>
            <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem', color: 'var(--verde-andes)', margin: '0 0 15px 0' }}>¿Cómo Llegar?</h2>
            <p style={{ fontSize: '14px', color: 'var(--texto)', lineHeight: '1.6', marginBottom: '25px' }}>
              Ruta Escondida se encuentra en la hermosa parroquia de Alchipichí, Ecuador, a solo 1.5 horas de Quito. El clima es templado, rodeado de huertos agroecológicos.
            </p>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              <button 
                onClick={() => setMapTab('auto')}
                style={{ padding: '8px 16px', background: mapTab === 'auto' ? 'var(--verde-medio)' : '#fff', color: mapTab === 'auto' ? '#fff' : 'var(--verde-andes)', border: '1px solid var(--verde-medio)', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
              >
                🚗 En Auto
              </button>
              <button 
                onClick={() => setMapTab('bus')}
                style={{ padding: '8px 16px', background: mapTab === 'bus' ? 'var(--verde-medio)' : '#fff', color: mapTab === 'bus' ? '#fff' : 'var(--verde-andes)', border: '1px solid var(--verde-medio)', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
              >
                🚌 En Autobús
              </button>
            </div>

            {mapTab === 'auto' ? (
              <div style={{ background: '#fff', border: '1px solid rgba(27,67,50,0.1)', padding: '20px', borderRadius: '8px' }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                  <li><strong>Ruta desde Quito (1.5 h):</strong> Toma la Panamericana Norte hacia Guayllabamba. Gira a la izquierda antes del peaje en dirección a Puéllaro/Ruta Escondida.</li>
                  <li><strong>Por Chavezpamba:</strong> Sigue por la vía asfaltada cruzando Puéllaro y Perucho, hasta el desvío señalizado a Chavezpamba/Alchipichí.</li>
                  <li><strong>Finca y Estacionamiento:</strong> El ingreso a la Finca es por un camino empedrado apto para todo tipo de auto. Contamos con parqueadero privado vigilado y gratis.</li>
                </ul>
                <a href="https://maps.google.com/?q=0.1200,-78.3791" target="_blank" rel="noopener" style={{ marginTop: '15px', display: 'inline-block', color: 'var(--oro)', fontWeight: 'bold', textDecoration: 'none', fontSize: '13px' }}>
                  📍 Abrir en Google Maps
                </a>
              </div>
            ) : (
              <div style={{ background: '#fff', border: '1px solid rgba(27,67,50,0.1)', padding: '20px', borderRadius: '8px' }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                  <li><strong>Salida desde Quito:</strong> Dirígete a la Terminal Terrestre de Carcelén.</li>
                  <li><strong>Cooperativas de Transporte:</strong> Toma los buses de la Cooperativa "Minas" o "Flor de Valle" con destino a San José de Minas (vía Ruta Escondida).</li>
                  <li><strong>Parada Alchipichí:</strong> Pídele al chofer bajarte en la parada principal de Alchipichí. Desde allí, son 10 minutos de caminata escénica o podemos recogerte si nos avisas antes.</li>
                </ul>
                <button 
                  onClick={triggerGeneralPlanner}
                  style={{ marginTop: '15px', display: 'inline-block', color: 'var(--oro)', background: 'transparent', border: 'none', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', padding: 0 }}
                >
                  📲 Consultar Horarios de Buses
                </button>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div id="map-leaflet" style={{ height: '380px', width: '100%', borderRadius: '12px', border: '1px solid rgba(27,67,50,0.1)' }}></div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: 'var(--verde-andes)', color: '#fff', padding: '80px 48px 40px 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', maxWidth: '1200px', margin: '0 auto', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '40px' }}>
          <div>
            <h4 style={{ color: 'var(--oro)', marginBottom: '15px', fontFamily: 'Outfit' }}>Ruta Escondida</h4>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6' }}>Conectamos agricultores y emprendedores locales con turistas que buscan desconexión y naturaleza en el norte de Pichincha, Ecuador.</p>
          </div>
          <div>
            <h4 style={{ color: 'var(--oro)', marginBottom: '15px', fontFamily: 'Outfit' }}>Enlaces Rápidos</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', padding: 0 }}>
              <li><a href="/negocios" style={{ color: '#fff', textDecoration: 'none' }}>Negocios Locales</a></li>
              <li><a href="/salidas-pedagogicas" style={{ color: '#fff', textDecoration: 'none' }}>Salidas Pedagógicas</a></li>
              <li><a href="/galeria" style={{ color: '#fff', textDecoration: 'none' }}>Galería de Fotos</a></li>
              <li><a href="/blog" style={{ color: '#fff', textDecoration: 'none' }}>Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: 'var(--oro)', marginBottom: '15px', fontFamily: 'Outfit' }}>Contacto</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', padding: 0 }}>
              <li><a href="mailto:hola@rutaescondida.com" style={{ color: '#fff', textDecoration: 'none' }}>hola@rutaescondida.com</a></li>
              <li><a href="https://wa.me/593984480203" style={{ color: '#fff', textDecoration: 'none' }}>+593 98 448 0203</a></li>
              <li><span>Alchipichí, Pichincha, Ecuador</span></li>
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

      {/* 🏺 PRODUCT DETAILS MODAL */}
      {selectedProduct && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: '#fff', border: '1px solid rgba(27,67,50,0.15)', borderRadius: '16px', maxWidth: '750px', width: '100%', overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr 1.2fr', position: 'relative', color: 'var(--texto)' }}>
            <button 
              onClick={() => { setSelectedProduct(null); setQty(1); }}
              style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(0,0,0,0.05)', border: 'none', color: 'var(--verde-andes)', fontSize: '18px', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', zIndex: 10 }}
            >
              ✕
            </button>
            <div style={{ background: '#000' }}>
              <img src={selectedProduct.photo} alt={selectedProduct.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--verde-medio)', fontWeight: 'bold' }}>{selectedProduct.category}</span>
                <h3 style={{ fontFamily: 'Playfair Display', fontSize: '22px', color: 'var(--verde-andes)', margin: '10px 0' }}>{selectedProduct.name}</h3>
                <p style={{ fontSize: '13.5px', color: 'var(--texto)', lineHeight: '1.6', marginBottom: '20px' }}>{selectedProduct.description}</p>
                <span style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--verde-medio)' }}>${selectedProduct.price.toFixed(2)} USD</span>
              </div>
              <div style={{ marginTop: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                  <span style={{ fontSize: '13px' }}>Cantidad:</span>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '4px' }}>
                    <button style={{ background: 'transparent', border: 'none', padding: '6px 12px', cursor: 'pointer' }} onClick={() => setQty(Math.max(1, qty - 1))}>—</button>
                    <span style={{ padding: '0 10px', fontSize: '14px', fontWeight: 'bold' }}>{qty}</span>
                    <button style={{ background: 'transparent', border: 'none', padding: '6px 12px', cursor: 'pointer' }} onClick={() => setQty(qty + 1)}>+</button>
                  </div>
                </div>
                <button 
                  onClick={() => handleAddToCart(selectedProduct, qty)}
                  style={{ width: '100%', padding: '12px', background: 'var(--verde-andes)', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🛒 CART DRAWER */}
      {showCart && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ background: '#fff', width: '100%', maxWidth: '420px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '30px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '20px' }}>
                <h3 style={{ fontFamily: 'Playfair Display', fontSize: '22px', color: 'var(--verde-andes)', margin: 0 }}>Tu Carrito</h3>
                <button onClick={() => setShowCart(false)} style={{ background: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer' }}>✕</button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', overflowY: 'auto', maxHeight: '60vh' }}>
                {cart.length === 0 ? (
                  <p style={{ color: 'var(--texto)', opacity: 0.6, fontStyle: 'italic' }}>Tu carrito está vacío.</p>
                ) : (
                  cart.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--crema)', padding: '12px', borderRadius: '8px' }}>
                      <div>
                        <strong style={{ fontSize: '13.5px', color: 'var(--verde-andes)', display: 'block' }}>{item.name}</strong>
                        <span style={{ fontSize: '12px', color: 'var(--verde-medio)' }}>${item.price.toFixed(2)} USD</span>
                      </div>
                      <button onClick={() => handleRemoveFromCart(idx)} style={{ background: 'transparent', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontSize: '14px' }}>✕</button>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #eee', paddingTop: '15px', marginBottom: '20px' }}>
                <strong>Total del Pedido:</strong>
                <strong style={{ color: 'var(--verde-medio)', fontSize: '18px' }}>${getCartTotal().toFixed(2)} USD</strong>
              </div>
              <button 
                onClick={() => { setShowCart(false); setShowCheckoutModal(true); setCheckoutStep('form'); }}
                disabled={cart.length === 0}
                style={{ width: '100%', padding: '14px', background: cart.length === 0 ? '#ccc' : 'var(--verde-andes)', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: cart.length === 0 ? 'not-allowed' : 'pointer' }}
              >
                Continuar al Pago
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 💳 CHECKOUT PRODUCT MODAL */}
      {showCheckoutModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1001, padding: '20px' }}>
          <div style={{ background: '#fff', border: '1px solid rgba(27,67,50,0.15)', borderRadius: '16px', maxWidth: '500px', width: '100%', padding: '30px', position: 'relative', color: 'var(--texto)' }}>
            <button 
              onClick={() => setShowCheckoutModal(false)}
              style={{ position: 'absolute', top: '15px', right: '15px', background: 'transparent', border: 'none', color: 'var(--verde-andes)', fontSize: '18px', cursor: 'pointer' }}
            >
              ✕
            </button>

            {checkoutStep === 'form' && (
              <form onSubmit={handleProcessCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <h3 style={{ fontFamily: 'Playfair Display', fontSize: '22px', color: 'var(--verde-andes)', margin: '0 0 10px 0' }}>Datos para el Envío</h3>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px' }}>Nombre Completo</label>
                  <input type="text" required value={checkoutName} onChange={(e) => setCheckoutName(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="María Augusta Ortega" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px' }}>WhatsApp / Teléfono</label>
                  <input type="tel" required value={checkoutPhone} onChange={(e) => setCheckoutPhone(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="0993356073" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px' }}>Dirección de Entrega</label>
                  <textarea required value={checkoutAddress} onChange={(e) => setCheckoutAddress(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', resize: 'none' }} placeholder="Pasaje Alchipichí y Av. Principal" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px' }}>Método de Pago</label>
                  <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontWeight: 'bold' }}>
                    <option value="stripe">💳 Stripe (Simulador de Tarjeta)</option>
                    <option value="payphone">💳 Payphone (Ecuador Tarjetas)</option>
                    <option value="whatsapp">📲 WhatsApp (Efectivo/Transferencia)</option>
                  </select>
                </div>
                <button type="submit" style={{ padding: '12px', background: 'var(--verde-andes)', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
                  Proceder al Pago
                </button>
              </form>
            )}

            {checkoutStep === 'gateway_mock' && (
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontFamily: 'Playfair Display', fontSize: '20px', color: 'var(--verde-andes)', margin: '0 0 10px 0' }}>Pago Seguro con Tarjeta</h3>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--verde-medio)', margin: '15px 0' }}>${getCartTotal().toFixed(2)} USD</div>
                
                <form onSubmit={(e) => { e.preventDefault(); handleConfirmMockPayment(); }} style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px' }}>Número de Tarjeta</label>
                    <input type="text" required placeholder="4575 •••• •••• ••••" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px' }}>Vencimiento</label>
                      <input type="text" required placeholder="MM / AA" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px' }}>Código CVV</label>
                      <input type="password" required placeholder="•••" value={cardCvv} onChange={(e) => setCardCvv(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
                    </div>
                  </div>
                  <button type="submit" disabled={isProcessingPayment} style={{ width: '100%', padding: '14px', background: 'var(--verde-andes)', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', marginTop: '15px' }}>
                    {isProcessingPayment ? 'Procesando Pago Seguro...' : '🔒 Pagar Seguro Ahora'}
                  </button>
                </form>
              </div>
            )}

            {checkoutStep === 'completed' && (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <span style={{ fontSize: '48px', display: 'block', marginBottom: '15px' }}>🎉</span>
                <h3 style={{ fontFamily: 'Playfair Display', fontSize: '22px', color: 'var(--verde-medio)', margin: '0 0 10px 0' }}>¡Pago Realizado con Éxito!</h3>
                <p style={{ fontSize: '14px', color: 'var(--texto)', lineHeight: '1.6', marginBottom: '25px' }}>
                  Tu transacción ha sido aprobada. El balance ha sido enviado al productor local con la retención de comisión correspondiente del 13%. Recibirás la guía de entrega en tu celular.
                </p>
                <button onClick={() => { setCart([]); setShowCheckoutModal(false); }} style={{ padding: '12px 30px', background: 'var(--verde-andes)', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                  Cerrar y Volver
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 🏺 CRM RESERVAS Y PLANIFICADOR MODAL (`lead-modal`) */}
      {showBookingModal && bookingExperience && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1001, padding: '20px', overflowY: 'auto' }}>
          <div style={{ background: 'var(--verde-andes)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', maxWidth: '550px', width: '100%', padding: '30px', position: 'relative', color: '#fff', maxHeight: '90vh', overflowY: 'auto' }}>
            <button 
              onClick={() => { setShowBookingModal(false); setBookingStep('form'); }}
              style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', fontSize: '18px', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer' }}
            >
              ✕
            </button>

            {bookingStep === 'form' && (
              <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <h3 style={{ fontFamily: 'Playfair Display', fontSize: '24px', color: 'var(--oro)', margin: '0' }}>
                  {bookingExperience.price > 0 ? `Reservar: ${bookingExperience.name}` : 'Planifica tu Viaje'}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '12.5px', lineHeight: '1.6', margin: '0 0 10px 0' }}>
                  Ingresa tus datos y preferencias de viaje. Te conectaremos de forma gratuita con la Central de Reservas para gestionar tu itinerario.
                </p>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: 'var(--oro)', marginBottom: '6px' }}>Nombre Completo</label>
                  <input type="text" required value={crmName} onChange={(e) => setCrmName(e.target.value)} style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#fff', outline: 'none' }} placeholder="Juan Pérez" />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: 'var(--oro)', marginBottom: '6px' }}>Correo Electrónico</label>
                    <input type="email" required value={crmEmail} onChange={(e) => setCrmEmail(e.target.value)} style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#fff', outline: 'none' }} placeholder="juan.perez@example.com" />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: 'var(--oro)', marginBottom: '6px' }}>WhatsApp / Celular</label>
                    <input type="tel" required value={crmPhone} onChange={(e) => setCrmPhone(e.target.value)} style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#fff', outline: 'none' }} placeholder="0984480203" />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: 'var(--oro)', marginBottom: '6px' }}>Ciudad de Origen</label>
                    <input type="text" required value={crmCity} onChange={(e) => setCrmCity(e.target.value)} style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#fff', outline: 'none' }} placeholder="Quito" />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: 'var(--oro)', marginBottom: '6px' }}>País</label>
                    <input type="text" required value={crmCountry} onChange={(e) => setCrmCountry(e.target.value)} style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#fff', outline: 'none' }} placeholder="Ecuador" />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: 'var(--oro)', marginBottom: '6px' }}>Tipo de Viaje</label>
                    <select value={crmTripType} onChange={(e) => setCrmTripType(e.target.value)} style={{ width: '100%', padding: '10px', background: '#1A3028', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#fff', fontWeight: 'bold', outline: 'none' }}>
                      <option value="familia">Con mi Familia</option>
                      <option value="pareja">En Pareja</option>
                      <option value="solo">Viajo Solo</option>
                      <option value="grupo">Grupo de amigos</option>
                      <option value="escolar">Grupo Escolar / Educativo</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: 'var(--oro)', marginBottom: '6px' }}>Nº Personas</label>
                    <input type="number" min="1" required value={crmGuests} onChange={(e) => setCrmGuests(e.target.value)} style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#fff', outline: 'none' }} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: 'var(--oro)', marginBottom: '6px' }}>Fecha Deseada</label>
                  <input type="date" required value={crmDate} onChange={(e) => setCrmDate(e.target.value)} style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#fff', outline: 'none' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: 'var(--oro)', marginBottom: '6px' }}>Requerimientos Especiales</label>
                  <textarea rows="2" value={crmNotes} onChange={(e) => setCrmNotes(e.target.value)} style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#fff', resize: 'none', outline: 'none' }} placeholder="¿Qué incluye la comida? ¿Se permiten mascotas?..." />
                </div>

                <button 
                  type="submit" 
                  style={{ width: '100%', padding: '13px', background: 'var(--oro)', color: 'var(--negro)', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}
                >
                  {bookingExperience.price > 0 ? 'Proceder al Pago Seguro' : 'Enviar Solicitud a Central'}
                </button>
              </form>
            )}

            {bookingStep === 'gateway_mock' && (
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontFamily: 'Playfair Display', fontSize: '22px', color: 'var(--oro)', margin: '0 0 10px 0' }}>Pago Seguro de Reserva</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', marginBottom: '15px' }}>
                  Estás pagando a <strong>Ruta Escondida</strong> por la reserva de <strong>{bookingExperience.name}</strong>:
                </p>
                <div style={{ fontSize: '36px', fontWeight: 'bold', color: 'var(--oro)', marginBottom: '25px' }}>${(bookingExperience.price).toFixed(2)} USD</div>

                <form onSubmit={(e) => { e.preventDefault(); handleConfirmBookingPayment(); }} style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: 'var(--oro)', marginBottom: '6px' }}>Número de Tarjeta</label>
                    <input type="text" required placeholder="4575 •••• •••• ••••" value={crmCardNumber} onChange={(e) => setCrmCardNumber(e.target.value)} style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#fff', outline: 'none' }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: 'var(--oro)', marginBottom: '6px' }}>Vencimiento</label>
                      <input type="text" required placeholder="MM / AA" value={crmCardExpiry} onChange={(e) => setCrmCardExpiry(e.target.value)} style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#fff', outline: 'none' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: 'var(--oro)', marginBottom: '6px' }}>Código CVV</label>
                      <input type="password" required placeholder="•••" value={crmCardCvv} onChange={(e) => setCrmCardCvv(e.target.value)} style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#fff', outline: 'none' }} />
                    </div>
                  </div>
                  <button 
                    type="submit" 
                    disabled={isProcessingBooking}
                    style={{ width: '100%', padding: '14px', background: 'var(--oro)', color: 'var(--negro)', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', marginTop: '15px' }}
                  >
                    {isProcessingBooking ? 'Procesando Transacción...' : '🔒 Confirmar Pago'}
                  </button>
                  <button 
                    type="button" 
                    onClick={handleBookingWhatsappSkip}
                    style={{ width: '100%', padding: '12px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', marginTop: '5px' }}
                  >
                    Omitir y cotizar por WhatsApp
                  </button>
                </form>
              </div>
            )}

            {bookingStep === 'completed' && (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <span style={{ fontSize: '48px', display: 'block', marginBottom: '15px' }}>🎉</span>
                <h3 style={{ fontFamily: 'Playfair Display', fontSize: '22px', color: 'var(--oro)', margin: '0 0 10px 0' }}>¡Reserva Confirmada Exitosamente!</h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', marginBottom: '25px' }}>
                  Hemos enviado los datos a la Finca/Emprendimiento local. Se ha descontado la comisión correspondiente del 13% y el balance restante fue acreditado en la cuenta del productor rural.
                </p>
                <button 
                  onClick={() => { setShowBookingModal(false); setBookingStep('form'); }} 
                  style={{ padding: '12px 30px', background: 'var(--oro)', color: 'var(--negro)', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  Cerrar y Volver
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 🗺️ FLOATING TRIP PLANNER BUTTON */}
      <button 
        onClick={triggerGeneralPlanner}
        style={{
          position: 'fixed',
          bottom: '30px',
          left: '30px',
          background: 'var(--verde-andes)',
          color: '#fff',
          border: '1px solid var(--oro)',
          borderRadius: '30px',
          padding: '12px 24px',
          fontSize: '13px',
          fontWeight: 'bold',
          cursor: 'pointer',
          zIndex: 99,
          boxShadow: '0 4px 15px rgba(27,67,50,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        🗺️ Planifica tu viaje
      </button>

      {/* ⭐ FLOATING POINTS INDICATOR */}
      <div 
        style={{
          position: 'fixed',
          bottom: '80px',
          left: '30px',
          background: 'var(--oro)',
          color: 'var(--negro)',
          borderRadius: '30px',
          padding: '6px 16px',
          fontSize: '11px',
          fontWeight: 'bold',
          zIndex: 99,
          boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}
      >
        ⭐ Mis Puntos: <span style={{ fontSize: '12px', fontWeight: '800' }}>{points}</span>
      </div>
    </>
  );
}
