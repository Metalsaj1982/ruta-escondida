"use client";

import { useState, useEffect } from 'react';
import { dbManager } from '../../lib/db';

export default function NegociosMarketplace() {
  const [role, setRole] = useState('tourist'); // 'tourist' | 'vendor' | 'admin'
  const [businesses, setBusinesses] = useState([]);
  const [products, setProducts] = useState([]);
  const [bookings, setBookings] = useState([]);
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedParish, setSelectedParish] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [maxPrice, setMaxPrice] = useState(150);

  // Selected entities for modals
  const [selectedBiz, setSelectedBiz] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  // Business registration modal states
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registerStep, setRegisterStep] = useState(1);
  const [regPlan, setRegPlan] = useState('free');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regDescription, setRegDescription] = useState('');
  const [regParish, setRegParish] = useState('Puéllaro');
  const [regCategory, setRegCategory] = useState('hospedaje');
  const [regPaymentRef, setRegPaymentRef] = useState('');

  // Form states inside business detail drawer
  const [bookingDate, setBookingDate] = useState('');
  const [bookingGuests, setBookingGuests] = useState(2);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  // Lead / Contact states
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadMessage, setLeadMessage] = useState('');
  const [leadSuccess, setLeadSuccess] = useState(false);

  // Checkout states
  const [checkoutName, setCheckoutName] = useState('');
  const [checkoutEmail, setCheckoutEmail] = useState('');
  const [checkoutPhone, setCheckoutPhone] = useState('');
  const [checkoutAddress, setCheckoutAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('stripe'); // 'stripe' | 'payphone' | 'whatsapp'
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentStep, setPaymentStep] = useState('form'); // 'form' | 'gateway_mock' | 'completed'

  // Card details mock
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  useEffect(() => {
    async function loadData() {
      const bizList = await dbManager.getBusinesses();
      setBusinesses(bizList);
      
      const prodList = await dbManager.getProducts();
      setProducts(prodList);
    }
    loadData();
  }, []);

  const handleParishClick = (parishName) => {
    setSelectedParish(parishName === selectedParish ? 'all' : parishName);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (regPlan !== 'free' && registerStep === 2) {
      setRegisterStep(3);
      return;
    }
    await completeRegistration('');
  };

  const completeRegistration = async (paymentRefVal = '') => {
    const newId = regName.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
    const newBiz = {
      id: newId,
      name: regName,
      email: regEmail,
      parish: regParish,
      category: regCategory,
      categoryLabel: regCategory === 'hospedaje' ? '🏡 Hospedaje' : (regCategory === 'gastronomia' ? '🍴 Gastronomía' : (regCategory === 'experiencias' ? '🗺️ Experiencias' : '🏺 Artesanías')),
      phone: regPhone,
      description: regDescription,
      status: regPlan === 'free' ? 'pending' : 'pending_payment',
      subscription_plan: regPlan,
      photo: '/assets/img/logo.png',
      photos: ['/assets/img/logo.png'],
      commission_balance: 0,
      payment_ref: paymentRefVal || '',
      payment_status: regPlan === 'free' ? 'none' : 'pending_verification'
    };

    const success = await dbManager.addBusiness(newBiz);
    if (success) {
      setShowRegisterModal(false);
      setRegName('');
      setRegEmail('');
      setRegPhone('');
      setRegDescription('');
      setRegPlan('free');
      setRegPaymentRef('');
      setRegisterStep(1);
      if (regPlan === 'free') {
        alert('¡Registro enviado con éxito! Tu cuenta de emprendedor ha sido creada en estado PENDIENTE. Un administrador la activará pronto.');
      } else {
        alert('¡Comprobante de pago enviado con éxito! Tu suscripción (' + regPlan.toUpperCase() + ') está en verificación. El administrador activará tu cuenta en un plazo máximo de 24 horas.');
      }
    }
  };

  const handleAddToCart = (item) => {
    setCart([...cart, item]);
    alert(`"${item.name}" se agregó a tu carrito de compras.`);
  };

  const handleRemoveFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  };

  // Perform Bookings simulation (Premium Tier only)
  const handleCreateBooking = async (e) => {
    e.preventDefault();
    if (!bookingDate) {
      alert("Por favor selecciona una fecha");
      return;
    }

    const bookingAmount = selectedBiz.category === 'hospedaje' ? 120.00 : 35.00;
    const bookingData = {
      business_id: selectedBiz.id,
      customer_name: leadName || "Turista Simulado",
      customer_phone: leadPhone || "0999999999",
      date: bookingDate,
      guests: Number(bookingGuests),
      amount: bookingAmount,
      status: 'pending'
    };

    const newBooking = await dbManager.createBooking(bookingData);
    if (newBooking) {
      setBookingCode(newBooking.id);
      setBookingSuccess(true);
      setBookingDate('');
      
      // Auto-save lead as CRM item
      await dbManager.createLead({
        business_id: selectedBiz.id,
        name: leadName || "Turista Reservante",
        phone: leadPhone || "0999999999",
        message: `Hizo una reserva para el ${bookingDate} (${bookingGuests} personas).`
      });
    }
  };

  // Contact lead submission (Free/Básico/Premium CRM collection)
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!leadName || !leadPhone) {
      alert("Por favor ingresa tu nombre y teléfono.");
      return;
    }

    const leadData = {
      business_id: selectedBiz.id,
      name: leadName,
      phone: leadPhone,
      message: leadMessage || "Solicita más información de contacto."
    };

    const saved = await dbManager.createLead(leadData);
    if (saved) {
      setLeadSuccess(true);
      setTimeout(() => {
        setLeadSuccess(false);
        setLeadName('');
        setLeadPhone('');
        setLeadMessage('');
      }, 3000);
    }
  };

  // Complete cart transaction checkout
  const handleStartCheckout = () => {
    if (cart.length === 0) return;
    setShowCart(false);
    setShowCheckoutModal(true);
    setPaymentStep('form');
  };

  const handleProcessCheckout = (e) => {
    e.preventDefault();
    if (paymentMethod === 'whatsapp') {
      const message = encodeURIComponent(
        `¡Hola Ruta Escondida! Quiero concretar mi compra de la tienda:\n\n` +
        cart.map(item => `- ${item.name} ($${item.price.toFixed(2)})`).join('\n') +
        `\n\nTotal: $${getCartTotal().toFixed(2)} USD\nCliente: ${checkoutName}\nTeléfono: ${checkoutPhone}\nDirección: ${checkoutAddress}`
      );
      window.open(`https://wa.me/593999999999?text=${message}`, '_blank');
      setCart([]);
      setShowCheckoutModal(false);
      return;
    }
    
    // Simulate gateway load
    setPaymentStep('gateway_mock');
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
    }, 2000);
  };

  const handleConfirmMockPayment = async () => {
    setIsProcessingPayment(true);
    
    // Distribute platform commissions (13%) and sales balances dynamically to business owners!
    for (const item of cart) {
      const commissionAmount = item.price * 0.13;
      await dbManager.createBooking({
        business_id: item.business.id,
        customer_name: checkoutName || "Comprador de Tienda",
        customer_phone: checkoutPhone || "0999999999",
        date: new Date().toLocaleDateString(),
        guests: 1,
        amount: item.price,
        status: 'completed' // Auto-completed as it was paid via Stripe/Payphone simulation
      });
    }

    setTimeout(() => {
      setIsProcessingPayment(false);
      setPaymentStep('completed');
    }, 1500);
  };

  const handleFinishCheckout = () => {
    setCart([]);
    setShowCheckoutModal(false);
  };

  // SaaS Limit helper: Get photos slice based on active plan
  const getPlanPhotos = (biz) => {
    const photos = biz.photos || [];
    if (biz.subscription_plan === 'free') {
      return photos.slice(0, 3);
    }
    if (biz.subscription_plan === 'basico') {
      return photos.slice(0, 10);
    }
    return photos; // Premium is unlimited
  };

  // Compile active directory elements (businesses & products) sorted by subscription plan
  const getFilteredItems = () => {
    const list = [];
    
    // Filter active businesses
    const activeBiz = businesses.filter(b => b.status === 'active');
    
    // Add businesses as clickable cards
    activeBiz.forEach(biz => {
      const matchesSearch = biz.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            biz.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesParish = selectedParish === 'all' || biz.parish === selectedParish;
      const matchesCategory = selectedCategory === 'all' || biz.category === selectedCategory;
      
      if (matchesSearch && matchesParish && matchesCategory) {
        list.push({
          itemType: 'business',
          id: biz.id,
          name: biz.name,
          description: biz.description,
          photo: (biz.photos && biz.photos[0]) || '/assets/img/logo.png',
          price: biz.category === 'hospedaje' ? 120.00 : 0, // Mock base price
          categoryLabel: biz.category.toUpperCase(),
          parish: biz.parish,
          business: biz,
          tierScore: biz.subscription_plan === 'premium' ? 3 : (biz.subscription_plan === 'basico' ? 2 : 1)
        });
      }
    });

    // Add individual products if basic or premium
    products.forEach(prod => {
      const biz = businesses.find(b => b.id === prod.business_id);
      if (!biz || biz.status !== 'active') return;
      
      // Basic / Premium rules permit products
      if (biz.subscription_plan === 'free') return;

      const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            prod.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesParish = selectedParish === 'all' || biz.parish === selectedParish;
      const matchesCategory = selectedCategory === 'all' || selectedCategory === 'artesanias' || selectedCategory === 'gastronomia';
      const matchesPrice = prod.price <= maxPrice;

      if (matchesSearch && matchesParish && matchesCategory && matchesPrice) {
        list.push({
          itemType: 'product',
          id: prod.id,
          name: prod.name,
          description: prod.description,
          photo: prod.photo || '/assets/img/logo.png',
          price: prod.price,
          categoryLabel: 'PRODUCTO LOCAL',
          parish: biz.parish,
          business: biz,
          tierScore: biz.subscription_plan === 'premium' ? 3 : 2
        });
      }
    });

    // Sort by tier: Premium -> Basic -> Free
    return list.sort((a, b) => b.tierScore - a.tierScore);
  };

  const filteredItems = getFilteredItems();

  return (
    <div style={{ background: 'var(--fondo)', color: 'var(--texto)', minHeight: '100vh', fontFamily: 'Outfit, sans-serif' }}>
      
      {/* ROLE SWITCHER BAR */}
      <div className="role-selector-bar" style={{ background: '#e2ece9', borderBottom: '1px solid rgba(27,67,50,0.15)', padding: '10px 0' }}>
        <div className="role-bar-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <span className="role-label" style={{ fontSize: '12px', color: 'var(--verde-andes)', fontWeight: 'bold' }}>
            <i className="fa-solid fa-server" style={{ marginRight: '8px', color: 'var(--verde-medio)' }}></i> MODO DE VISUALIZACIÓN:
          </span>
          <div className="role-buttons" style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => setRole('tourist')} 
              style={{ padding: '6px 12px', border: '1px solid var(--verde-medio)', borderRadius: '4px', background: role === 'tourist' ? 'var(--verde-medio)' : 'transparent', color: role === 'tourist' ? '#fff' : 'var(--verde-andes)', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              💼 Turista / Viajero
            </button>
            <button 
              onClick={() => { setRole('vendor'); window.location.href = '/emprendedor'; }} 
              style={{ padding: '6px 12px', border: '1px solid var(--verde-medio)', borderRadius: '4px', background: 'transparent', color: 'var(--verde-andes)', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              🏪 Emprendedor Rural (Panel)
            </button>
            <button 
              onClick={() => { setRole('admin'); window.location.href = '/admin'; }} 
              style={{ padding: '6px 12px', border: '1px solid var(--verde-medio)', borderRadius: '4px', background: 'transparent', color: 'var(--verde-andes)', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              🛠️ Admin Plataforma (Panel)
            </button>
          </div>
        </div>
      </div>

      {/* NAV */}
      <nav id="main-nav" className="scrolled" style={{ position: 'sticky', top: 0, zIndex: 99, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 48px' }}>
        <a href="/" className="nav-logo" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/assets/img/logo.png" alt="Ruta Escondida" className="logo-img" style={{ height: '50px' }} />
        </a>
        
        {/* Unified Navigation Links (Light Theme compliant) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          <a href="/" style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '.15em', textTransform: 'uppercase', textDecoration: 'none', color: 'var(--verde-andes)' }}>Inicio</a>
          <a href="/negocios" style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '.15em', textTransform: 'uppercase', textDecoration: 'none', color: 'var(--verde-medio)' }}>Negocios</a>
          <a href="/#tienda" style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '.15em', textTransform: 'uppercase', textDecoration: 'none', color: 'var(--verde-andes)' }}>Tienda</a>
          <a href="/salidas-pedagogicas" style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '.15em', textTransform: 'uppercase', textDecoration: 'none', color: 'var(--verde-andes)' }}>Salidas Pedagógicas</a>
          <a href="/galeria" style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '.15em', textTransform: 'uppercase', textDecoration: 'none', color: 'var(--verde-andes)' }}>Galería</a>
          <a href="/blog" style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '.15em', textTransform: 'uppercase', textDecoration: 'none', color: 'var(--verde-andes)' }}>Blog</a>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <a href="/login" style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '.1em', textTransform: 'uppercase', textDecoration: 'none', color: 'var(--verde-andes)' }}>SaaS LogIn</a>
          <button onClick={() => setShowCart(true)} style={{ background: 'transparent', border: 'none', color: 'var(--verde-andes)', cursor: 'pointer', fontSize: '18px', position: 'relative' }}>
            <i className="fa-solid fa-shopping-cart"></i>
            {cart.length > 0 && (
              <span style={{ position: 'absolute', top: '-10px', right: '-10px', background: '#ff4d4d', color: '#fff', fontSize: '10px', borderRadius: '50%', padding: '2px 6px', fontWeight: 'bold' }}>
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* HERO & SEARCH ENGINE */}
      <header className="hero" style={{ height: '55vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <video autoPlay loop muted playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }}>
          <source src="/assets/img/hero_video.mp4" type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(26,48,40,0.75), rgba(26,48,40,0.9))', zIndex: 2 }}></div>

        <div className="hero-content" style={{ textAlign: 'center', padding: '0 20px', maxWidth: '800px', position: 'relative', zIndex: 3 }}>
          <div className="badge-premium" style={{ border: '1px solid var(--oro)', color: 'var(--oro)', padding: '6px 12px', borderRadius: '30px', fontSize: '11px', fontWeight: 'bold', letterSpacing: '1px', display: 'inline-flex', gap: '6px', marginBottom: '20px' }}>
            <i className="fa-solid fa-sparkles"></i> FACEBOOK MARKETPLACE LOCAL
          </div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: '800', marginBottom: '16px', color: '#fff' }}>Marketplace de la Ruta Escondida</h1>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.8)', marginBottom: '32px' }}>Compra artesanías, reserva hospedajes o contrata guías directamente a los productores locales.</p>

          {/* SEARCH BAR */}
          <div className="search-engine" style={{ background: '#fff', borderRadius: '12px', padding: '15px', display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr auto', gap: '10px', alignItems: 'center', boxShadow: '0 10px 30px rgba(27,67,50,0.15)' }}>
            <div className="search-field" style={{ borderRight: '1px solid #eee', textAlign: 'left', padding: '0 10px' }}>
              <label style={{ fontSize: '9px', fontWeight: '800', color: '#888', textTransform: 'uppercase' }}><i className="fa-solid fa-search"></i> Buscar Producto/Negocio</label>
              <input 
                type="text" 
                placeholder="Ej: Domo, Fritada, Café..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ border: 'none', outline: 'none', width: '100%', fontSize: '14px', fontWeight: 'bold', color: '#000', padding: '4px 0' }}
              />
            </div>
            <div className="search-field" style={{ borderRight: '1px solid #eee', textAlign: 'left', padding: '0 10px' }}>
              <label style={{ fontSize: '9px', fontWeight: '800', color: '#888', textTransform: 'uppercase' }}><i className="fa-solid fa-map-pin"></i> Parroquia</label>
              <select 
                value={selectedParish}
                onChange={(e) => setSelectedParish(e.target.value)}
                style={{ border: 'none', outline: 'none', width: '100%', fontSize: '14px', fontWeight: 'bold', color: '#000', cursor: 'pointer' }}
              >
                <option value="all">Todo territorio</option>
                <option value="Puéllaro">Puéllaro</option>
                <option value="Perucho">Perucho</option>
                <option value="Chavezpamba">Chavezpamba</option>
                <option value="Atahualpa">Atahualpa</option>
                <option value="Minas">San José de Minas</option>
              </select>
            </div>
            <div className="search-field" style={{ textAlign: 'left', padding: '0 10px' }}>
              <label style={{ fontSize: '9px', fontWeight: '800', color: '#888', textTransform: 'uppercase' }}><i className="fa-solid fa-tags"></i> Actividad</label>
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{ border: 'none', outline: 'none', width: '100%', fontSize: '14px', fontWeight: 'bold', color: '#000', cursor: 'pointer' }}
              >
                <option value="all">Todas categorías</option>
                <option value="hospedaje">Hospedaje</option>
                <option value="gastronomia">Gastronomía</option>
                <option value="experiencias">Tours & Experiencias</option>
                <option value="artesanias">Artesanías</option>
              </select>
            </div>
            <button style={{ background: 'var(--verde-medio)', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <i className="fa-solid fa-compass"></i> Buscar
            </button>
          </div>
        </div>
      </header>

      {/* SVG INTERACTIVE MAP OF PARROQUIAS */}
      <section style={{ padding: '60px 24px', background: 'var(--crema)', borderBottom: '1px solid rgba(27,67,50,0.1)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', marginBottom: '10px', color: 'var(--verde-andes)' }}>Territorios de la Ruta Escondida</h2>
          <p style={{ color: 'var(--texto)', fontSize: '14px', marginBottom: '40px' }}>Selecciona una parroquia en el mapa interactivo para ver exclusivamente sus servicios.</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px', alignItems: 'center' }}>
            <div style={{ background: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid rgba(27,67,50,0.1)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
              <svg viewBox="0 0 500 400" style={{ width: '100%', height: 'auto' }}>
                {/* Minas */}
                <path 
                  onClick={() => handleParishClick('Minas')}
                  style={{ cursor: 'pointer', fill: selectedParish === 'Minas' ? 'var(--oro)' : 'rgba(27, 67, 50, 0.08)', stroke: 'var(--verde-andes)', strokeWidth: 1.5, transition: 'all 0.3s' }}
                  d="M 50,50 L 250,30 L 350,120 L 200,180 Z" 
                />
                <text x="180" y="90" fill="var(--verde-andes)" style={{ fontSize: '12px', fontWeight: 'bold', pointerEvents: 'none' }}>San José de Minas</text>

                {/* Atahualpa */}
                <path 
                  onClick={() => handleParishClick('Atahualpa')}
                  style={{ cursor: 'pointer', fill: selectedParish === 'Atahualpa' ? 'var(--oro)' : 'rgba(27, 67, 50, 0.08)', stroke: 'var(--verde-andes)', strokeWidth: 1.5, transition: 'all 0.3s' }}
                  d="M 250,30 L 450,80 L 380,200 L 350,120 Z" 
                />
                <text x="340" y="100" fill="var(--verde-andes)" style={{ fontSize: '12px', fontWeight: 'bold', pointerEvents: 'none' }}>Atahualpa</text>

                {/* Chavezpamba */}
                <path 
                  onClick={() => handleParishClick('Chavezpamba')}
                  style={{ cursor: 'pointer', fill: selectedParish === 'Chavezpamba' ? 'var(--oro)' : 'rgba(27, 67, 50, 0.08)', stroke: 'var(--verde-andes)', strokeWidth: 1.5, transition: 'all 0.3s' }}
                  d="M 200,180 L 350,120 L 380,200 L 220,240 Z" 
                />
                <text x="260" y="180" fill="var(--verde-andes)" style={{ fontSize: '11px', fontWeight: 'bold', pointerEvents: 'none' }}>Chavezpamba</text>

                {/* Perucho */}
                <path 
                  onClick={() => handleParishClick('Perucho')}
                  style={{ cursor: 'pointer', fill: selectedParish === 'Perucho' ? 'var(--oro)' : 'rgba(27, 67, 50, 0.08)', stroke: 'var(--verde-andes)', strokeWidth: 1.5, transition: 'all 0.3s' }}
                  d="M 100,220 L 200,180 L 220,240 L 150,300 Z" 
                />
                <text x="145" y="250" fill="var(--verde-andes)" style={{ fontSize: '12px', fontWeight: 'bold', pointerEvents: 'none' }}>Perucho</text>

                {/* Puéllaro */}
                <path 
                  onClick={() => handleParishClick('Puéllaro')}
                  style={{ cursor: 'pointer', fill: selectedParish === 'Puéllaro' ? 'var(--oro)' : 'rgba(27, 67, 50, 0.08)', stroke: 'var(--verde-andes)', strokeWidth: 1.5, transition: 'all 0.3s' }}
                  d="M 220,240 L 320,260 L 290,340 L 150,300 Z" 
                />
                <text x="235" y="300" fill="var(--verde-andes)" style={{ fontSize: '12px', fontWeight: 'bold', pointerEvents: 'none' }}>Puéllaro</text>
              </svg>
            </div>

            <div style={{ textAlign: 'left' }}>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.75rem', color: 'var(--verde-andes)', marginBottom: '15px' }}>
                {selectedParish === 'all' ? 'Selecciona un Destino' : selectedParish}
              </h3>
              <p style={{ color: 'var(--texto)', fontSize: '14.5px', lineHeight: '1.6' }}>
                {selectedParish === 'all' && 'Haz clic en cualquier parroquia del mapa para ver los negocios locales y microcréditos turísticos activos en ese territorio.'}
                {selectedParish === 'Puéllaro' && 'Conocida como el "Jardín Frutal de los Andes". Famosa por sus aguacates, chirimoyas, templos históricos del siglo XIX y miradores imponentes.'}
                {selectedParish === 'Perucho' && 'El corazón histórico de la Ruta Escondida. Aquí se encuentra la iglesia de madera tallada más antigua del país y deliciosos cultivos cítricos de mandarinas.'}
                {selectedParish === 'Chavezpamba' && 'El "Balcón del Viento". Ofrece miradores espectaculares y senderos que conectan directamente con el cañón del río Guayllabamba.'}
                {selectedParish === 'Atahualpa' && 'Rodeado de naturaleza exuberante, bosques nublados, senderos de cascadas cristalinas y florícolas de exportación de clase mundial.'}
                {selectedParish === 'Minas' && 'San José de Minas, tierra de leyendas andinas, producción de caña y derivados, y rutas de aventura de alta montaña.'}
              </p>
              {selectedParish !== 'all' && (
                <button 
                  onClick={() => setSelectedParish('all')}
                  style={{ marginTop: '20px', background: 'transparent', border: '1px solid var(--verde-medio)', color: 'var(--verde-andes)', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Limpiar Filtro de Destino
                </button>
              )}
            </div>
          </div>
        </div>
      </section>



      {/* FACEBOOK STYLE MARKETPLACE FEED */}
      <section style={{ padding: '80px 48px', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '40px' }}>
          
          {/* LEFT SIDEBAR FILTERS (Facebook Marketplace style) */}
          <aside style={{ background: 'var(--crema)', border: '1px solid rgba(27,67,50,0.1)', borderRadius: '12px', padding: '24px', height: 'fit-content' }}>
            <h3 style={{ fontFamily: 'Playfair Display', fontSize: '1.25rem', marginBottom: '20px', color: 'var(--verde-andes)' }}>Filtros</h3>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '11px', color: 'var(--texto)', fontWeight: 'bold', marginBottom: '8px' }}>FILTRAR POR PRECIO MÁXIMO</label>
              <input 
                type="range" 
                min="5" 
                max="200" 
                step="5"
                value={maxPrice} 
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--verde-medio)' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginTop: '6px', fontWeight: 'bold' }}>
                <span>$5 USD</span>
                <span style={{ color: 'var(--verde-medio)' }}>${maxPrice} USD</span>
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(27,67,50,0.1)', paddingTop: '20px' }}>
              <label style={{ display: 'block', fontSize: '11px', color: 'var(--texto)', fontWeight: 'bold', marginBottom: '10px' }}>CATEGORÍAS</label>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { value: 'all', label: 'Todos' },
                  { value: 'hospedaje', label: '🏨 Hospedajes' },
                  { value: 'gastronomia', label: '🍴 Gastronomía' },
                  { value: 'experiencias', label: '🧗 Tours & Guías' },
                  { value: 'artesanias', label: '🏺 Productos Locales' }
                ].map(cat => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    style={{
                      textAlign: 'left',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: 'none',
                      background: selectedCategory === cat.value ? 'rgba(27, 67, 50, 0.1)' : 'transparent',
                      color: selectedCategory === cat.value ? 'var(--verde-andes)' : 'var(--texto)',
                      fontWeight: selectedCategory === cat.value ? 'bold' : 'normal',
                      cursor: 'pointer',
                      fontSize: '13px'
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* MAIN GRID */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontFamily: 'Playfair Display', fontSize: '1.75rem', color: 'var(--verde-andes)' }}>Explorar Artículos y Experiencias</h2>
              <span style={{ color: 'var(--texto)', fontSize: '14px' }}>{filteredItems.length} resultados encontrados</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
              {filteredItems.map(item => (
                <article 
                  key={`${item.itemType}-${item.id}`}
                  style={{
                    background: '#fff',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid rgba(27,67,50,0.1)',
                    boxShadow: '0 4px 15px rgba(27,67,50,0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    position: 'relative'
                  }}
                  onClick={() => setSelectedBiz(item.business)}
                >
                  {/* Premium Badge */}
                  {item.business.subscription_plan === 'premium' && (
                    <span style={{ position: 'absolute', top: '10px', right: '10px', background: 'var(--oro)', color: 'var(--negro)', fontSize: '9px', fontWeight: 'bold', padding: '4px 8px', borderRadius: '4px', zIndex: 5 }}>
                      ⭐ PREMIUM
                    </span>
                  )}
                  
                  <div style={{ height: '180px', position: 'relative', overflow: 'hidden' }}>
                    <img 
                      src={item.photo} 
                      alt={item.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { e.target.src = '/assets/img/logo.png'; }}
                    />
                  </div>

                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '11px', color: 'var(--verde-medio)', textTransform: 'uppercase', fontWeight: 'bold' }}>{item.categoryLabel}</span>
                      <span style={{ fontSize: '11px', color: 'var(--texto)' }}>📍 {item.parish}</span>
                    </div>

                    <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--verde-andes)', marginBottom: '8px', minHeight: '44px' }}>{item.name}</h3>
                    
                    <p style={{ fontSize: '13px', color: 'var(--texto)', lineHeight: '1.5', flex: 1, marginBottom: '15px' }}>
                      {item.description.substring(0, 100)}...
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(27,67,50,0.1)', paddingTop: '15px' }}>
                      <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--verde-medio)' }}>
                        {item.price > 0 ? `$${item.price.toFixed(2)}` : 'Consultar'}
                      </span>
                      {item.itemType === 'product' && item.price > 0 && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleAddToCart(item); }}
                          style={{ background: 'var(--verde-andes)', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}
                        >
                          + Añadir
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DUAL MAPS / SATELITAL DIRECTORY SECTION */}
      <section style={{ padding: '80px 48px', borderTop: '1px solid rgba(27,67,50,0.1)', background: 'var(--crema)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2.2rem', color: 'var(--verde-andes)' }}>Mapa y Localización Satelital</h2>
            <p style={{ color: 'var(--texto)' }}>Ubica de forma geográfica los emprendimientos asociados a la Ruta Escondida.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px' }}>
            {/* Interactive Leaflet Map Placeholder */}
            <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid rgba(27,67,50,0.15)', height: '400px', overflow: 'hidden', position: 'relative' }}>
              <div id="satelital-map" style={{ width: '100%', height: '100%', background: '#eaeaea' }}>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15959.088661646274!2d-78.4357497127909!3d0.13401569429447738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8cd0884df002d0cf%3A0xe9ccb75b9f71c4c8!2sPu%C3%A9llaro!5e0!3m2!1ses!2sec!4v1719946552000!5m2!1ses!2sec" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            {/* Satelital list sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <h4 style={{ fontFamily: 'Outfit', fontWeight: 'bold', color: 'var(--verde-andes)' }}>Negocios Destacados en {selectedParish === 'all' ? 'la Ruta' : selectedParish}</h4>
              <div style={{ overflowY: 'auto', maxHeight: '330px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {businesses
                  .filter(b => b.status === 'active' && (selectedParish === 'all' || b.parish === selectedParish))
                  .map(biz => (
                    <div 
                      key={biz.id} 
                      onClick={() => setSelectedBiz(biz)}
                      style={{ background: '#fff', border: '1px solid rgba(27,67,50,0.1)', borderRadius: '8px', padding: '16px', display: 'flex', gap: '15px', cursor: 'pointer', transition: 'all 0.3s' }}
                    >
                      <img src={(biz.photos && biz.photos[0]) || '/assets/img/logo.png'} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} alt="" />
                      <div>
                        <h5 style={{ margin: 0, fontSize: '14px', color: 'var(--verde-andes)' }}>{biz.name}</h5>
                        <span style={{ fontSize: '11px', color: 'var(--texto)' }}>{biz.parish} • {biz.category.toUpperCase()}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER - CTA */}
      <section style={{ padding: '80px 24px', background: 'var(--verde-andes)', textAlign: 'center', color: '#fff' }}>
        <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem', marginBottom: '16px' }}>¿Eres Emprendedor Rural?</h2>
        <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '0 auto 30px auto' }}>
          Digitaliza tu negocio, sube tus productos y recibe reservas de turistas de todo el país directamente en tu WhatsApp.
        </p>
        <button onClick={() => setShowRegisterModal(true)} style={{ background: 'var(--oro)', color: 'var(--negro)', border: 'none', padding: '12px 30px', borderRadius: '6px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', display: 'inline-block' }}>
          Registrar Mi Negocio Ahora
        </button>
      </section>

      {/* DETALLES DE NEGOCIO / BOOKING SIDE DRAWER MODAL */}
      {selectedBiz && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px', overflowY: 'auto' }}>
          <div style={{ background: '#fff', border: '1px solid rgba(27,67,50,0.15)', borderRadius: '16px', maxWidth: '850px', width: '100%', overflow: 'hidden', position: 'relative', color: 'var(--texto)' }}>
            
            {/* Close */}
            <button 
              onClick={() => { setSelectedBiz(null); setBookingSuccess(false); setLeadSuccess(false); }}
              style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(0,0,0,0.05)', border: 'none', color: 'var(--verde-andes)', fontSize: '18px', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', zIndex: 10 }}
            >
              ✕
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', maxHeight: '80vh', overflowY: 'auto' }}>
              
              {/* Left Side: Images & Info */}
              <div style={{ borderRight: '1px solid rgba(27,67,50,0.1)', padding: '24px' }}>
                {/* Portada Cover Media (Video if Premium with video_url, otherwise Photo) */}
                {selectedBiz.subscription_plan === 'premium' && selectedBiz.video_url ? (
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    controls 
                    style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: '8px', marginBottom: '20px', background: '#000' }}
                  >
                    <source src={selectedBiz.video_url} type="video/mp4" />
                  </video>
                ) : (
                  <img 
                    src={selectedBiz.photo || '/assets/img/logo.png'} 
                    style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: '8px', marginBottom: '20px' }} 
                    alt="" 
                    onError={(e) => { e.target.src = '/assets/img/logo.png'; }}
                  />
                )}

                <span style={{ color: 'var(--verde-medio)', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase' }}>{selectedBiz.categoryLabel}</span>
                <h2 style={{ fontFamily: 'Playfair Display', fontSize: '24px', margin: '8px 0 16px 0', color: 'var(--verde-andes)' }}>{selectedBiz.name}</h2>
                
                {/* Image Gallery (thumbnails of other photos) */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', marginBottom: '20px' }}>
                  {getPlanPhotos(selectedBiz).map((photo, i) => (
                    <img 
                      key={i} 
                      src={photo} 
                      alt={`Gallery item ${i}`} 
                      style={{ width: '100%', height: '60px', objectFit: 'cover', borderRadius: '6px', cursor: 'pointer', border: '1px solid rgba(0,0,0,0.08)' }}
                      onError={(e) => { e.target.src = '/assets/img/logo.png'; }}
                    />
                  ))}
                </div>

                <p style={{ fontSize: '14px', color: 'var(--texto)', lineHeight: '1.6' }}>{selectedBiz.description}</p>
                <div style={{ marginTop: '15px', borderTop: '1px solid rgba(27,67,50,0.1)', paddingTop: '15px' }}>
                  <span style={{ display: 'block', fontSize: '11px', color: 'var(--texto)' }}>📍 DIRECCIÓN</span>
                  <span style={{ fontSize: '13px', fontWeight: 'bold' }}>{selectedBiz.location}</span>
                </div>
              </div>

              {/* Right Side: Tier-restricted Contact & Reservation */}
              <div style={{ padding: '24px', background: 'var(--crema)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                
                {/* Social Links & Contact */}
                <div>
                  <h4 style={{ fontSize: '12px', color: 'var(--verde-andes)', textTransform: 'uppercase', marginBottom: '12px', fontWeight: 'bold' }}>Enlaces & Contacto</h4>
                  
                  {/* Social media list */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                    {selectedBiz.instagram && (
                      <a href={selectedBiz.instagram} target="_blank" rel="noopener" style={{ color: '#c13584', textDecoration: 'none', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <i className="fa-brands fa-instagram"></i> Instagram
                      </a>
                    )}
                    
                    {/* Básico / Premium only links */}
                    {selectedBiz.subscription_plan !== 'free' ? (
                      <>
                        {selectedBiz.facebook && (
                          <a href={selectedBiz.facebook} target="_blank" rel="noopener" style={{ color: '#1877f2', textDecoration: 'none', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <i className="fa-brands fa-facebook"></i> Facebook
                          </a>
                        )}
                        {selectedBiz.tiktok && (
                          <a href={selectedBiz.tiktok} target="_blank" rel="noopener" style={{ color: '#000', textDecoration: 'none', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <i className="fa-brands fa-tiktok"></i> TikTok
                          </a>
                        )}
                        {selectedBiz.google_maps_url && (
                          <a href={selectedBiz.google_maps_url} target="_blank" rel="noopener" style={{ color: '#ea4335', textDecoration: 'none', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <i className="fa-solid fa-map-location-dot"></i> Ubicación Google Maps
                          </a>
                        )}
                      </>
                    ) : (
                      <div style={{ padding: '6px', background: 'rgba(0,0,0,0.05)', borderRadius: '4px', fontSize: '11.5px', color: 'var(--texto)', fontStyle: 'italic' }}>
                        🔒 Redes sociales bloqueadas (Plan Free)
                      </div>
                    )}
                  </div>

                  {/* Private phone/whatsapp locks */}
                  <div style={{ background: '#fff', padding: '12px', borderRadius: '8px', border: '1px solid rgba(27,67,50,0.1)', marginBottom: '20px' }}>
                    <h5 style={{ fontSize: '11px', color: 'var(--texto)', marginBottom: '6px' }}>DATOS DE CONTACTO DIRECTO</h5>
                    {selectedBiz.subscription_plan === 'free' ? (
                      <div style={{ fontSize: '11px', color: '#ea4335' }}>
                        ⚠️ El contacto telefónico y WhatsApp están ocultos para usuarios del Plan Free.
                      </div>
                    ) : (
                      <div style={{ fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <span>📞 Teléfono: <strong>{selectedBiz.phone}</strong></span>
                        <span>✉️ Correo: <strong>{selectedBiz.email}</strong></span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Reservation / Lead form */}
                <div style={{ borderTop: '1px solid rgba(27,67,50,0.1)', paddingTop: '20px' }}>
                  {selectedBiz.subscription_plan === 'premium' ? (
                    // PREMIUM RESERVATIONS
                    <div>
                      <h4 style={{ fontSize: '13px', color: 'var(--verde-andes)', fontWeight: 'bold', marginBottom: '10px' }}>⚡ RESURVA EN LÍNEA DIRECTA</h4>
                      {bookingSuccess ? (
                        <div style={{ background: 'rgba(0,255,128,0.1)', color: 'var(--verde-andes)', border: '1px solid var(--verde-medio)', borderRadius: '4px', padding: '10px', fontSize: '12px', textAlign: 'center', fontWeight: 'bold' }}>
                          ¡Reserva realizada con éxito!<br />
                          Código: {bookingCode}<br />
                          El emprendedor coordinará contigo.
                        </div>
                      ) : (
                        <form onSubmit={handleCreateBooking} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <input 
                            type="text" 
                            placeholder="Tu Nombre" 
                            required
                            value={leadName}
                            onChange={(e) => setLeadName(e.target.value)}
                            style={{ padding: '8px', background: '#fff', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '4px', color: 'var(--texto)' }}
                          />
                          <input 
                            type="tel" 
                            placeholder="Tu WhatsApp" 
                            required
                            value={leadPhone}
                            onChange={(e) => setLeadPhone(e.target.value)}
                            style={{ padding: '8px', background: '#fff', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '4px', color: 'var(--texto)' }}
                          />
                          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '6px' }}>
                            <input 
                              type="date" 
                              required
                              value={bookingDate}
                              onChange={(e) => setBookingDate(e.target.value)}
                              style={{ padding: '8px', background: '#fff', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '4px', color: 'var(--texto)' }}
                            />
                            <input 
                              type="number" 
                              min="1" 
                              max="10" 
                              value={bookingGuests}
                              onChange={(e) => setBookingGuests(Number(e.target.value))}
                              style={{ padding: '8px', background: '#fff', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '4px', color: 'var(--texto)' }}
                            />
                          </div>
                          <button type="submit" style={{ background: 'var(--verde-andes)', color: '#fff', border: 'none', padding: '10px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
                            Confirmar Reserva Directa
                          </button>
                        </form>
                      )}
                    </div>
                  ) : (
                    // FREE & BÁSICO LEAD FORM (Connect via WA)
                    <div>
                      <h4 style={{ fontSize: '13px', color: 'var(--verde-andes)', fontWeight: 'bold', marginBottom: '10px' }}>Enviar Mensaje de WhatsApp</h4>
                      {leadSuccess ? (
                        <div style={{ background: '#e2ece9', color: 'var(--verde-andes)', borderRadius: '4px', padding: '10px', fontSize: '12px', textAlign: 'center' }}>
                          ¡Mensaje enviado al WhatsApp del vendedor!
                        </div>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <input 
                            type="text" 
                            placeholder="Tu Nombre" 
                            value={leadName}
                            onChange={(e) => setLeadName(e.target.value)}
                            style={{ padding: '8px', background: '#fff', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '4px', color: 'var(--texto)' }}
                          />
                          <input 
                            type="tel" 
                            placeholder="Tu Teléfono" 
                            value={leadPhone}
                            onChange={(e) => setLeadPhone(e.target.value)}
                            style={{ padding: '8px', background: '#fff', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '4px', color: 'var(--texto)' }}
                          />
                          <textarea 
                            placeholder="Mensaje: Hola, me interesa contactarme contigo..." 
                            value={leadMessage}
                            onChange={(e) => setLeadMessage(e.target.value)}
                            rows="2"
                            style={{ padding: '8px', background: '#fff', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '4px', color: 'var(--texto)', resize: 'none' }}
                          />
                          <button 
                            onClick={handleContactSubmit}
                            style={{ width: '100%', background: '#25d366', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
                          >
                            <i className="fa-brands fa-whatsapp"></i> Mandar WhatsApp
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

      {/* SHOPPING CART DRAWER (Float Right) */}
      {showCart && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'flex-end', zIndex: 1000 }}>
          <div style={{ background: '#fff', borderLeft: '1px solid rgba(27,67,50,0.15)', width: '100%', maxWidth: '400px', padding: '24px', display: 'flex', flexDirection: 'column', height: '100vh', color: 'var(--texto)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid rgba(27,67,50,0.1)', paddingBottom: '15px' }}>
              <h3 style={{ fontFamily: 'Playfair Display', fontSize: '20px', margin: 0, color: 'var(--verde-andes)' }}>Tu Carrito</h3>
              <button onClick={() => setShowCart(false)} style={{ background: 'transparent', border: 'none', color: 'var(--verde-andes)', fontSize: '18px', cursor: 'pointer' }}>✕</button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--texto)', opacity: 0.6 }}>
                  <i className="fa-solid fa-cart-shopping" style={{ fontSize: '40px', marginBottom: '15px', color: 'var(--verde-medio)' }}></i>
                  <p>Tu carrito está vacío.</p>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '15px', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '10px' }}>
                    <img src={item.photo} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px' }} alt="" />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: 0, fontSize: '14px', color: 'var(--verde-andes)' }}>{item.name}</h4>
                      <span style={{ fontSize: '11px', color: 'var(--texto)' }}>De: {item.business.name}</span>
                      <div style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--verde-medio)', marginTop: '4px' }}>${item.price.toFixed(2)} USD</div>
                    </div>
                    <button 
                      onClick={() => handleRemoveFromCart(idx)}
                      style={{ background: 'transparent', border: 'none', color: '#ff4d4d', cursor: 'pointer' }}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div style={{ borderTop: '1px solid rgba(27,67,50,0.1)', paddingTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontWeight: 'bold', fontSize: '16px' }}>
                  <span>Total a pagar:</span>
                  <span style={{ color: 'var(--verde-medio)' }}>${getCartTotal().toFixed(2)} USD</span>
                </div>
                <button 
                  onClick={handleStartCheckout}
                  style={{ width: '100%', background: 'var(--verde-andes)', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  Concretar Pedido
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CHECKOUT POPUP / PAYMENT GATEWAY SIMULATION */}
      {showCheckoutModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1050, padding: '20px' }}>
          <div style={{ background: '#fff', border: '1px solid rgba(27,67,50,0.15)', borderRadius: '12px', maxWidth: '500px', width: '100%', padding: '24px', position: 'relative', color: 'var(--texto)' }}>
            
            <button 
              onClick={() => setShowCheckoutModal(false)}
              style={{ position: 'absolute', top: '15px', right: '15px', background: 'transparent', border: 'none', color: 'var(--verde-andes)', fontSize: '16px', cursor: 'pointer' }}
            >
              ✕
            </button>

            {paymentStep === 'form' && (
              <form onSubmit={handleProcessCheckout}>
                <h3 style={{ fontFamily: 'Playfair Display', fontSize: '20px', marginBottom: '15px', color: 'var(--verde-andes)' }}>Datos de Entrega</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                  <input 
                    type="text" 
                    placeholder="Nombre Completo" 
                    required
                    value={checkoutName}
                    onChange={(e) => setCheckoutName(e.target.value)}
                    style={{ padding: '10px', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '4px' }}
                  />
                  <input 
                    type="email" 
                    placeholder="Correo Electrónico" 
                    required
                    value={checkoutEmail}
                    onChange={(e) => setCheckoutEmail(e.target.value)}
                    style={{ padding: '10px', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '4px' }}
                  />
                  <input 
                    type="tel" 
                    placeholder="WhatsApp de Contacto" 
                    required
                    value={checkoutPhone}
                    onChange={(e) => setCheckoutPhone(e.target.value)}
                    style={{ padding: '10px', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '4px' }}
                  />
                  <input 
                    type="text" 
                    placeholder="Dirección Física (Envío)" 
                    required
                    value={checkoutAddress}
                    onChange={(e) => setCheckoutAddress(e.target.value)}
                    style={{ padding: '10px', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '4px' }}
                  />
                  
                  <label style={{ fontSize: '12px', fontWeight: 'bold', marginTop: '10px', color: 'var(--verde-andes)' }}>MÉTODO DE PAGO</label>
                  <select 
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    style={{ padding: '10px', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    <option value="stripe">💳 Stripe (Tarjetas de Crédito)</option>
                    <option value="payphone">📱 Payphone (Ecuador Tarjeta/App)</option>
                    <option value="whatsapp">💬 WhatsApp (Coordinar transferencia)</option>
                  </select>
                </div>

                <button type="submit" style={{ width: '100%', background: 'var(--verde-andes)', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                  Proceder a Pagar (${getCartTotal().toFixed(2)} USD)
                </button>
              </form>
            )}

            {paymentStep === 'gateway_mock' && (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ marginBottom: '20px' }}>
                  <img 
                    src={paymentMethod === 'stripe' ? 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg' : 'https://payphone.app/wp-content/uploads/2021/04/LogoPayphone.png'} 
                    style={{ height: '40px', objectFit: 'contain' }} 
                    alt="Payment Gateway" 
                  />
                </div>
                <h4 style={{ marginBottom: '15px', color: 'var(--verde-andes)' }}>
                  Pasarela de Pago Segura {paymentMethod.toUpperCase()} (Simulador)
                </h4>
                
                {isProcessingPayment ? (
                  <div>
                    <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '30px', color: 'var(--verde-medio)', marginBottom: '15px' }}></i>
                    <p>Verificando credenciales bancarias...</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left', maxWidth: '350px', margin: '0 auto' }}>
                    <input 
                      type="text" 
                      placeholder="Número de Tarjeta (16 dígitos)" 
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <input 
                        type="text" 
                        placeholder="MM/AA" 
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                      />
                      <input 
                        type="password" 
                        placeholder="CVV" 
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                      />
                    </div>
                    <button 
                      onClick={handleConfirmMockPayment}
                      style={{ marginTop: '15px', width: '100%', background: '#00ff80', color: '#000', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                      PAGAR ${getCartTotal().toFixed(2)} USD
                    </button>
                  </div>
                )}
              </div>
            )}

            {paymentStep === 'completed' && (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <i className="fa-solid fa-circle-check" style={{ fontSize: '60px', color: '#00ff80', marginBottom: '20px' }}></i>
                <h3 style={{ fontFamily: 'Playfair Display', color: 'var(--verde-andes)', marginBottom: '10px' }}>¡Transacción Exitosa!</h3>
                <p style={{ color: 'var(--texto)', fontSize: '14px', marginBottom: '25px' }}>
                  El pago se ha procesado correctamente. Los emprendedores de la Ruta Escondida han sido notificados y coordinarán el envío de tus productos.
                </p>
                <button 
                  onClick={handleFinishCheckout}
                  style={{ background: 'var(--verde-andes)', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  Regresar al Catálogo
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {showRegisterModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ 
            background: '#fff', 
            borderRadius: '16px', 
            padding: '35px', 
            width: '100%', 
            maxWidth: registerStep === 1 ? '850px' : '500px', 
            border: '1px solid rgba(27,67,50,0.1)', 
            color: 'var(--texto)', 
            overflowY: 'auto', 
            maxHeight: '90vh',
            transition: 'all 0.3s ease-in-out',
            boxShadow: '0 20px 50px rgba(0,0,0,0.2)'
          }}>
            
            {registerStep === 1 ? (
              <div>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                  <span style={{ background: 'rgba(27,67,50,0.06)', color: 'var(--verde-andes)', fontSize: '10px', fontWeight: 'bold', padding: '6px 12px', borderRadius: '30px', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Planes de Crecimiento</span>
                  <h3 style={{ fontFamily: 'Playfair Display', color: 'var(--verde-andes)', fontSize: '24px', fontWeight: 'bold', margin: '10px 0 8px 0' }}>Elige tu Plan de Afiliación</h3>
                  <p style={{ fontSize: '13.5px', color: '#666', maxWidth: '600px', margin: '0 auto' }}>Únete al marketplace turístico de la Ruta Escondida. Elige la suscripción que mejor se adapte a tu negocio.</p>
                </div>

                {/* PRICING GRID */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                  
                  {/* CARD: FREE */}
                  <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#F9F8F6' }}>
                    <div>
                      <span style={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', color: '#666', letterSpacing: '1px' }}>Directorio Básico</span>
                      <h4 style={{ margin: '8px 0', fontSize: '20px', fontFamily: 'Playfair Display', color: 'var(--verde-andes)' }}>Plan FREE</h4>
                      <div style={{ margin: '15px 0' }}>
                        <span style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--negro)' }}>$0</span>
                        <span style={{ color: '#777', fontSize: '12px' }}> / gratis</span>
                      </div>
                      <p style={{ fontSize: '12.5px', color: '#555', marginBottom: '20px', lineHeight: '1.4' }}>Ideal para tener presencia digital en el mapa y catálogo básico de la Ruta.</p>
                      
                      <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '12.5px', color: '#333', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <li>Aparece en el Directorio local</li>
                        <li>Ubicación en el Mapa Interactivo</li>
                        <li>Hasta 3 fotos de galería</li>
                        <li>Contacto vía WhatsApp</li>
                      </ul>
                    </div>
                    <button 
                      onClick={() => { setRegPlan('free'); setRegisterStep(2); }}
                      style={{ marginTop: '24px', width: '100%', padding: '10px', border: '1.5px solid var(--verde-medio)', borderRadius: '6px', background: 'transparent', color: 'var(--verde-medio)', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}
                    >
                      Comenzar con FREE
                    </button>
                  </div>

                  {/* CARD: BASICO */}
                  <div style={{ border: '1.5px solid var(--verde-medio)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#fff', position: 'relative', boxShadow: '0 8px 24px rgba(27,67,50,0.04)' }}>
                    <span style={{ position: 'absolute', top: '-11px', left: '50%', transform: 'translateX(-50%)', background: 'var(--verde-medio)', color: '#fff', fontSize: '9px', fontWeight: 'bold', padding: '3px 8px', borderRadius: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Popular</span>
                    <div>
                      <span style={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--verde-medio)', letterSpacing: '1px' }}>Catálogo Digital</span>
                      <h4 style={{ margin: '8px 0', fontSize: '20px', fontFamily: 'Playfair Display', color: 'var(--verde-andes)' }}>Plan BÁSICO</h4>
                      <div style={{ margin: '15px 0' }}>
                        <span style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--negro)' }}>$35</span>
                        <span style={{ color: '#777', fontSize: '12px' }}> / mes</span>
                      </div>
                      <p style={{ fontSize: '12.5px', color: '#555', marginBottom: '20px', lineHeight: '1.4' }}>Perfecto para negocios que desean mostrar un menú o portafolio de productos.</p>
                      
                      <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '12.5px', color: '#333', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <li>Todo lo del plan **Free**</li>
                        <li>**Catálogo digital de productos**</li>
                        <li>Hasta 10 fotos de galería</li>
                        <li>Botón de compra inmediata</li>
                        <li>Estadísticas básicas del perfil</li>
                      </ul>
                    </div>
                    <button 
                      onClick={() => { setRegPlan('basico'); setRegisterStep(2); }}
                      style={{ marginTop: '24px', width: '100%', padding: '10px', borderRadius: '6px', background: 'var(--verde-medio)', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}
                    >
                      Elegir BÁSICO ($35)
                    </button>
                  </div>

                  {/* CARD: PREMIUM */}
                  <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'var(--crema)' }}>
                    <div>
                      <span style={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--oro)', letterSpacing: '1px' }}>Plataforma Completa</span>
                      <h4 style={{ margin: '8px 0', fontSize: '20px', fontFamily: 'Playfair Display', color: 'var(--verde-andes)' }}>Plan PREMIUM</h4>
                      <div style={{ margin: '15px 0' }}>
                        <span style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--negro)' }}>$180</span>
                        <span style={{ color: '#777', fontSize: '12px' }}> / mes</span>
                      </div>
                      <p style={{ fontSize: '12.5px', color: '#555', marginBottom: '20px', lineHeight: '1.4' }}>Para comercios líderes que buscan reservas, cobros online e Inteligencia Artificial.</p>
                      
                      <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '12.5px', color: '#333', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <li>Todo lo del plan **Básico**</li>
                        <li>**Reservas en línea con calendario**</li>
                        <li>**Pasarela de Pago (PayPhone / Stripe)**</li>
                        <li>Integración de Videos de Portada</li>
                        <li>**Asistente de IA (Gemini) propio**</li>
                        <li>Analíticas completas de ventas</li>
                      </ul>
                    </div>
                    <button 
                      onClick={() => { setRegPlan('premium'); setRegisterStep(2); }}
                      style={{ marginTop: '24px', width: '100%', padding: '10px', borderRadius: '6px', background: 'var(--verde-andes)', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}
                    >
                      Elegir PREMIUM ($180)
                    </button>
                  </div>

                </div>

                <div style={{ textAlign: 'center' }}>
                  <button 
                    onClick={() => setShowRegisterModal(false)}
                    style={{ background: 'transparent', border: 'none', color: '#666', cursor: 'pointer', fontSize: '13px', textDecoration: 'underline' }}
                  >
                    Cerrar y Volver al Catálogo
                  </button>
                </div>
              </div>
            ) : registerStep === 2 ? (
              <div>
                {/* FORM HEADER */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #f0f0f0' }}>
                  <button 
                    onClick={() => setRegisterStep(1)} 
                    style={{ background: 'transparent', border: 'none', color: 'var(--verde-medio)', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}
                  >
                    ← Cambiar Plan
                  </button>
                  <span style={{ 
                    background: regPlan === 'premium' ? 'var(--oro)' : (regPlan === 'basico' ? 'var(--verde-medio)' : '#ddd'), 
                    color: regPlan === 'premium' ? 'var(--negro)' : '#fff',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    textTransform: 'uppercase'
                  }}>
                    Plan: {regPlan}
                  </span>
                </div>

                <h3 style={{ fontFamily: 'Playfair Display', color: 'var(--verde-andes)', fontSize: '20px', fontWeight: 'bold', margin: '0 0 15px 0' }}>Registrar Mi Negocio</h3>
                <p style={{ fontSize: '13px', color: 'var(--texto)', opacity: 0.8, marginBottom: '20px' }}>Ingresa los detalles básicos de tu emprendimiento para enviar la afiliación a revisión.</p>
                
                <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px', color: 'var(--verde-andes)' }}>Nombre del Emprendimiento / Negocio</label>
                    <input type="text" required value={regName} onChange={(e) => setRegName(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '6px', fontSize: '13.5px', color: 'var(--texto)', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px', color: 'var(--verde-andes)' }}>Email del Negocio (Acceso al Panel)</label>
                    <input type="email" required value={regEmail} onChange={(e) => setRegEmail(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '6px', fontSize: '13.5px', color: 'var(--texto)', outline: 'none' }} />
                  </div>
                  <div style={{ display: 'flex', gap: '15px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px', color: 'var(--verde-andes)' }}>Parroquia</label>
                      <select value={regParish} onChange={(e) => setRegParish(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '6px', fontSize: '13.5px', color: 'var(--texto)', outline: 'none' }}>
                        <option value="Puéllaro">Puéllaro</option>
                        <option value="Perucho">Perucho</option>
                        <option value="Chavezpamba">Chavezpamba</option>
                        <option value="Atahualpa">Atahualpa</option>
                        <option value="Minas">Minas</option>
                      </select>
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px', color: 'var(--verde-andes)' }}>Categoría</label>
                      <select value={regCategory} onChange={(e) => setRegCategory(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '6px', fontSize: '13.5px', color: 'var(--texto)', outline: 'none' }}>
                        <option value="hospedaje">🏡 Hospedaje</option>
                        <option value="gastronomia">🍴 Gastronomía</option>
                        <option value="experiencias">🗺️ Experiencias</option>
                        <option value="artesanias">🏺 Artesanías</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px', color: 'var(--verde-andes)' }}>WhatsApp de Reservas / Teléfono</label>
                    <input type="text" required value={regPhone} onChange={(e) => setRegPhone(e.target.value)} placeholder="Ej: 593984480203" style={{ width: '100%', padding: '10px', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '6px', fontSize: '13.5px', color: 'var(--texto)', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px', color: 'var(--verde-andes)' }}>Descripción de tus Servicios</label>
                    <textarea required value={regDescription} onChange={(e) => setRegDescription(e.target.value)} rows="3" style={{ width: '100%', padding: '10px', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '6px', fontSize: '13.5px', color: 'var(--texto)', resize: 'vertical', outline: 'none' }}></textarea>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '15px' }}>
                    <button type="button" onClick={() => { setShowRegisterModal(false); setRegisterStep(1); }} style={{ background: '#f5f5f5', border: 'none', padding: '10px 18px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', color: '#333' }}>Cancelar</button>
                    <button type="submit" style={{ background: 'var(--verde-andes)', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}>Siguiente: Registrar Pago →</button>
                  </div>
                </form>
              </div>
            ) : (
              <div>
                {/* PAYMENT STEP 3 */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #f0f0f0' }}>
                  <button 
                    onClick={() => setRegisterStep(2)} 
                    style={{ background: 'transparent', border: 'none', color: 'var(--verde-medio)', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}
                  >
                    ← Volver al formulario
                  </button>
                  <span style={{ 
                    background: regPlan === 'premium' ? 'var(--oro)' : 'var(--verde-medio)', 
                    color: regPlan === 'premium' ? 'var(--negro)' : '#fff',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    textTransform: 'uppercase'
                  }}>
                    Plan: {regPlan}
                  </span>
                </div>

                <h3 style={{ fontFamily: 'Playfair Display', color: 'var(--verde-andes)', fontSize: '20px', fontWeight: 'bold', margin: '0 0 15px 0', textAlign: 'center' }}>
                  Activa tu Suscripción {regPlan.toUpperCase()}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--texto)', opacity: 0.85, marginBottom: '20px', textAlign: 'center' }}>
                  Para finalizar la afiliación de tu negocio, por favor realiza una transferencia por el valor de <strong>{regPlan === 'premium' ? '$180.00' : '$35.00'}</strong> y registra el comprobante a continuación.
                </p>

                <div style={{ background: 'var(--crema)', border: '1px solid rgba(27,67,50,0.12)', padding: '20px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px', lineHeight: '1.6' }}>
                  <strong style={{ color: 'var(--verde-andes)', display: 'block', fontSize: '14px', marginBottom: '10px' }}>Detalles de Cuenta para Transferencia:</strong>
                  📌 <strong>Banco:</strong> Banco Pichincha (Ahorros)<br />
                  📌 <strong>Número de Cuenta:</strong> 2204567890<br />
                  📌 <strong>Titular:</strong> Ruta Escondida S.A.<br />
                  📌 <strong>RUC:</strong> 1792456890001<br />
                  📌 <strong>Email:</strong> pagos@rutaescondida.com
                </div>

                <form onSubmit={(e) => { e.preventDefault(); completeRegistration(regPaymentRef); }} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 'bold', marginBottom: '6px', color: 'var(--verde-andes)' }}>Número de Referencia de Transferencia / Comprobante</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Ej: 948302058 o ID de Transacción" 
                      value={regPaymentRef} 
                      onChange={(e) => setRegPaymentRef(e.target.value)} 
                      style={{ width: '100%', padding: '10px', border: '1px solid rgba(27,67,50,0.2)', borderRadius: '6px', fontSize: '13.5px', color: 'var(--texto)', outline: 'none' }} 
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '15px' }}>
                    <button type="button" onClick={() => { setShowRegisterModal(false); setRegisterStep(1); }} style={{ background: '#f5f5f5', border: 'none', padding: '10px 18px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', color: '#333' }}>Cancelar</button>
                    <button type="submit" style={{ background: 'var(--verde-andes)', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}>Completar Registro y Notificar Pago</button>
                  </div>
                </form>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
