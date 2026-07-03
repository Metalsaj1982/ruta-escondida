// ruta-page.js — Shared animations for individual route pages
gsap.registerPlugin(ScrollTrigger);

// Sticky nav
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 80);
}, { passive: true });

// Hero entrance
gsap.timeline()
  .fromTo('.back-link',      { opacity:0, x:-20 }, { opacity:1, x:0, duration:.6, delay:.2 })
  .fromTo('.ruta-hero-tag',  { opacity:0, y:20  }, { opacity:1, y:0, duration:.7 }, '-=.3')
  .fromTo('.ruta-hero h1',   { opacity:0, y:40  }, { opacity:1, y:0, duration:1, ease:'power3.out' }, '-=.4')
  .fromTo('.ruta-hero-sub',  { opacity:0, y:20  }, { opacity:1, y:0, duration:.8 }, '-=.5');

// Quick info stagger
gsap.fromTo('.qi-item',
  { opacity:0, y:30 },
  { opacity:1, y:0, duration:.6, stagger:.08, ease:'power2.out',
    scrollTrigger: { trigger:'.ruta-quickinfo', start:'top 85%' } }
);

// Highlights stagger
gsap.fromTo('.rh-item',
  { opacity:0, x:-30 },
  { opacity:1, x:0, duration:.7, stagger:.12, ease:'power3.out',
    scrollTrigger: { trigger:'.ruta-highlights', start:'top 80%' } }
);

// Itinerario days
gsap.fromTo('.ri-day',
  { opacity:0, y:40 },
  { opacity:1, y:0, duration:.8, stagger:.2, ease:'power3.out',
    scrollTrigger: { trigger:'.ri-grid', start:'top 80%' } }
);

// CTA section
gsap.fromTo('.ruta-cta-section h2',
  { opacity:0, y:40 },
  { opacity:1, y:0, duration:1, ease:'power3.out',
    scrollTrigger: { trigger:'.ruta-cta-section', start:'top 80%' } }
);

// ── HAMBURGER MENU MÓVIL (funciona en todas las páginas) ──
(function() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;

  // Crear botón hamburguesa
  const burger = document.createElement('button');
  burger.className = 'nav-hamburger';
  burger.setAttribute('aria-label', 'Menú');
  burger.innerHTML = '<span></span><span></span><span></span>';
  nav.appendChild(burger);

  // Crear panel móvil
  const panel = document.createElement('nav');
  panel.className = 'nav-mobile-panel';
  panel.innerHTML = `
    <a href="index.html">Inicio</a>
    <a href="gigante-dormido.html">El Gigante Dormido</a>
    <a href="sendero-agua.html">El Sendero del Agua</a>
    <a href="tayos.html">Encañonado de los Tayos</a>
    <a href="salidas-pedagogicas.html">Salidas Pedagógicas</a>
    <a href="galeria.html">Galería</a>
    <a href="blog.html">Blog</a>
    <a href="negocios.html">Las Parroquias (Ver Todo)</a>
    <a href="negocios.html?parish=Puéllaro" style="padding-left:20px; font-size:12px; opacity:0.8;">📍 Puéllaro</a>
    <a href="negocios.html?parish=Perucho" style="padding-left:20px; font-size:12px; opacity:0.8;">📍 Perucho</a>
    <a href="negocios.html?parish=Atahualpa" style="padding-left:20px; font-size:12px; opacity:0.8;">📍 Atahualpa</a>
    <a href="negocios.html?parish=Chavezpamba" style="padding-left:20px; font-size:12px; opacity:0.8;">📍 Chavezpamba</a>
    <a href="negocios.html?parish=Minas" style="padding-left:20px; font-size:12px; opacity:0.8;">📍 Minas</a>
    <a href="https://wa.me/593984480203?text=Hola%20Diego,%20quiero%20reservar" class="nav-mobile-cta" target="_blank" style="margin-top:12px;">📲 Reservar</a>
  `;
  document.body.appendChild(panel);

  // Toggle
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    panel.classList.toggle('open');
    document.body.style.overflow = panel.classList.contains('open') ? 'hidden' : '';
  });

  // Cerrar al hacer clic en un link
  panel.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      panel.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

// ── NATIVE BOOKING CONTROLLER V2.0 ────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const bookingForm = document.getElementById('booking-form');
  if (!bookingForm) return;

  const minus = document.getElementById('booking-qty-minus');
  const plus = document.getElementById('booking-qty-plus');
  const val = document.getElementById('booking-qty-val');
  const input = document.getElementById('booking-qty-input');
  
  // 1. Selector de Exploradores
  let qty = 2;
  if (minus && plus && val && input) {
    minus.addEventListener('click', () => {
      if (qty > 1) {
        qty--;
        val.textContent = qty;
        input.value = qty;
      }
    });
    plus.addEventListener('click', () => {
      qty++;
      val.textContent = qty;
      input.value = qty;
    });
  }

  // 2. Establecer fecha mínima como hoy
  const dateInput = document.getElementById('booking-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }

  // 3. Auto-configurar redirección de Formspree a gracias.html de forma dinámica
  const nextInput = document.createElement('input');
  nextInput.type = 'hidden';
  nextInput.name = '_next';
  nextInput.value = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, '/gracias.html');
  bookingForm.appendChild(nextInput);

  // 4. Submit de Reserva vía Correo
  bookingForm.addEventListener('submit', () => {
    const name = document.getElementById('booking-name').value.trim();
    const email = document.getElementById('booking-email').value.trim();
    const phone = document.getElementById('booking-wa').value.trim();
    const tripType = document.getElementById('booking-triptype').value;
    const city = document.getElementById('booking-city').value.trim();
    const country = document.getElementById('booking-country').value.trim();
    const dateVal = document.getElementById('booking-date').value;
    const msg = document.getElementById('booking-msg').value.trim();
    const ruta = document.getElementById('booking-ruta-input').value;
    
    // Guardar lead CRM
    const leadData = {
      id: "lead_" + Date.now(),
      name: name,
      email: email,
      phone: phone,
      city: city,
      country: country,
      trip_type: tripType,
      interest_topic: `Reserva Formspree: ${ruta}`,
      timestamp: new Date().toISOString()
    };
    
    const storedLeads = localStorage.getItem('ruta_escondida_crm_leads');
    const leadsList = storedLeads ? JSON.parse(storedLeads) : [];
    leadsList.push(leadData);
    localStorage.setItem('ruta_escondida_crm_leads', JSON.stringify(leadsList));

    // Guardar reserva local
    const bookingId = "res_" + Date.now();
    const bookingData = {
      id: bookingId,
      bizId: "general",
      service: ruta,
      clientName: name,
      clientPhone: phone,
      guests: parseInt(qty) || 2,
      total: 0, 
      commission: 0,
      net: 0,
      status: "pendiente",
      timestamp: new Date().toISOString()
    };
    const storedBookings = localStorage.getItem('ruta_escondida_reservas');
    const bookingsList = storedBookings ? JSON.parse(storedBookings) : [];
    bookingsList.push(bookingData);
    localStorage.setItem('ruta_escondida_reservas', JSON.stringify(bookingsList));
    
    // Serializar orden para gracias.html
    const orderData = {
      client: { nombre: name, telefono: phone, direccion: `Origen: ${city}, ${country}` },
      items: [{ title: `Aventura: ${ruta}`, price: 'Pago en Finca', qty: parseInt(qty) || 2, img: 'assets/img/logo.png' }],
      total: '0.00 (Pendiente)',
      paymentMethod: 'Transferencia Bancaria / Efectivo',
      date: new Date(dateVal + 'T00:00:00').toLocaleDateString('es-EC', { day: 'numeric', month: 'long', year: 'numeric' })
    };

    localStorage.setItem('ruta_last_order', JSON.stringify(orderData));
  });

  // 5. Reserva vía WhatsApp Express
  const btnWa = document.getElementById('btn-booking-wa');
  if (btnWa) {
    btnWa.addEventListener('click', () => {
      // Forzar validación de campos requeridos
      const nameInput = document.getElementById('booking-name');
      const emailInput = document.getElementById('booking-email');
      const waInput = document.getElementById('booking-wa');
      const triptypeInput = document.getElementById('booking-triptype');
      const cityInput = document.getElementById('booking-city');
      const countryInput = document.getElementById('booking-country');
      const dateValInput = document.getElementById('booking-date');
      const msgInput = document.getElementById('booking-msg');
      const ruta = document.getElementById('booking-ruta-input').value;

      if (!nameInput.value || !emailInput.value || !waInput.value || !dateValInput.value || !cityInput.value || !countryInput.value) {
        bookingForm.reportValidity();
        return;
      }

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const phone = waInput.value.trim();
      const tripType = triptypeInput.value;
      const city = cityInput.value.trim();
      const country = countryInput.value.trim();
      const dateVal = dateValInput.value;
      const msg = msgInput ? msgInput.value.trim() : '';

      // Guardar lead CRM
      const leadData = {
        id: "lead_" + Date.now(),
        name: name,
        email: email,
        phone: phone,
        city: city,
        country: country,
        trip_type: tripType,
        interest_topic: `Reserva WhatsApp: ${ruta}`,
        timestamp: new Date().toISOString()
      };
      
      const storedLeads = localStorage.getItem('ruta_escondida_crm_leads');
      const leadsList = storedLeads ? JSON.parse(storedLeads) : [];
      leadsList.push(leadData);
      localStorage.setItem('ruta_escondida_crm_leads', JSON.stringify(leadsList));

      // Guardar reserva local
      const bookingId = "res_" + Date.now();
      const bookingData = {
        id: bookingId,
        bizId: "general",
        service: ruta,
        clientName: name,
        clientPhone: phone,
        guests: parseInt(qty) || 2,
        total: 0, 
        commission: 0,
        net: 0,
        status: "pendiente",
        timestamp: new Date().toISOString()
      };
      const storedBookings = localStorage.getItem('ruta_escondida_reservas');
      const bookingsList = storedBookings ? JSON.parse(storedBookings) : [];
      bookingsList.push(bookingData);
      localStorage.setItem('ruta_escondida_reservas', JSON.stringify(bookingsList));

      // Mensaje de WhatsApp
      let text = `🌿 *NUEVA RESERVA — CENTRAL RUTA ESCONDIDA*\n\n`;
      text += `👤 *Nombre:* ${name}\n`;
      text += `📧 *Email:* ${email}\n`;
      text += `📞 *WhatsApp:* ${phone}\n`;
      text += `📍 *Origen:* ${city}, ${country}\n`;
      text += `👥 *Viajero:* ${tripType} (${qty} personas)\n`;
      text += `📅 *Fecha:* ${dateVal}\n`;
      text += `🧭 *Ruta:* ${ruta}\n`;
      if (msg) text += `💬 *Mensaje:* _${msg}_\n`;
      text += `\n💬 _Deseo confirmar disponibilidad para esta fecha. ¡Muchas gracias!_`;

      const orderData = {
        client: { nombre: name, telefono: phone, direccion: `Origen: ${city}, ${country}` },
        items: [{ title: `Aventura: ${ruta}`, price: 'WhatsApp Directo', qty: parseInt(qty) || 2, img: 'assets/img/logo.png' }],
        total: '0.00 (Pendiente)',
        paymentMethod: 'WhatsApp Express',
        date: new Date(dateVal + 'T00:00:00').toLocaleDateString('es-EC', { day: 'numeric', month: 'long', year: 'numeric' })
      };

      localStorage.setItem('ruta_last_order', JSON.stringify(orderData));

      const encodedText = encodeURIComponent(text);
      const waUrl = `https://wa.me/593984480203?text=${encodedText}`;

      // Redirigir y abrir WhatsApp
      window.open(waUrl, '_blank');
      window.location.href = 'gracias.html';
    });
  }
});
