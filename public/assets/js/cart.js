/* ==========================================================================
   RUTA ESCONDIDA — cart.js (Lógica Premium del Carrito de Compras)
   ========================================================================== */

// ── CONFIGURACIÓN DE CONTACTO Y PAGOS ──────────────────────────────────
const CONFIG = {
  whatsappPhone: '593993356073', // Cambia este número por tu WhatsApp (con código de país, ej: 593 para Ecuador)
  payphoneToken: 'TU_TOKEN_DE_PAYPHONE_AQUÍ', // Si integras Payphone real
  stripePublicKey: 'TU_LLAVE_PUBLICA_STRIPE_AQUÍ' // Si integras Stripe real
};

// ── ESTADO DEL CARRITO ─────────────────────────────────────────────────
let cart = [];

// Cargar carrito desde localStorage al iniciar
function initCart() {
  const savedCart = localStorage.getItem('ruta_cart');
  if (savedCart) {
    try {
      cart = JSON.parse(savedCart);
    } catch (e) {
      cart = [];
    }
  }
  
  // Enlazar eventos de la UI
  setupCartEventListeners();
  
  // Renderizar estado inicial
  renderCart();
}

// Guardar en localStorage
function saveCart() {
  localStorage.setItem('ruta_cart', JSON.stringify(cart));
  renderCart();
}

// ── ENLAZAR EVENTOS ───────────────────────────────────────────────────
function setupCartEventListeners() {
  // Abrir carrito desde el botón flotante
  const floatBtn = document.getElementById('cart-float-btn');
  if (floatBtn) {
    floatBtn.addEventListener('click', () => toggleCartDrawer(true));
  }

  // Cerrar carrito
  const closeBtn = document.getElementById('cart-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => toggleCartDrawer(false));
  }

  // Overlay / Backdrop de cierre
  const overlay = document.getElementById('cart-overlay');
  if (overlay) {
    overlay.addEventListener('click', () => {
      toggleCartDrawer(false);
      closeGatewayModal();
    });
  }

  // Botón "Agregar al Carrito" en el Modal de Producto
  const modalBuyBtn = document.getElementById('btn-comprar-now');
  if (modalBuyBtn) {
    modalBuyBtn.addEventListener('click', () => {
      const productId = modalBuyBtn.getAttribute('data-product-id');
      if (productId) {
        const valEl = document.getElementById('pd-qty-val');
        const qty = valEl ? parseInt(valEl.textContent) || 1 : 1;
        addToCart(productId, qty);
        // Pequeño feedback visual de éxito
        const originalText = modalBuyBtn.textContent;
        modalBuyBtn.textContent = '¡Añadido! 🥑';
        modalBuyBtn.style.background = '#2d5a27';
        setTimeout(() => {
          modalBuyBtn.textContent = originalText;
          modalBuyBtn.style.background = '';
          // Cerrar modal de detalle de producto para que el usuario vea el carrito
          document.getElementById('producto-detalle').classList.remove('active');
          document.body.style.overflow = '';
          toggleCartDrawer(true);
        }, 800);
      }
    });
  }

  // Formulario de envío / checkout
  const checkoutForm = document.getElementById('cart-checkout-form');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
    });
  }

  // Checkout por WhatsApp
  const btnWa = document.getElementById('btn-checkout-whatsapp');
  if (btnWa) {
    btnWa.addEventListener('click', handleWhatsAppCheckout);
  }

  // Checkout por Tarjeta
  const btnCard = document.getElementById('btn-checkout-card');
  if (btnCard) {
    btnCard.addEventListener('click', handleCardCheckout);
  }

  // Cerrar modal de tarjeta simulada
  const gatewayClose = document.getElementById('gateway-close');
  if (gatewayClose) {
    gatewayClose.addEventListener('click', closeGatewayModal);
  }

  // Simulación de procesado de tarjeta
  const creditCardForm = document.getElementById('simulated-card-form');
  if (creditCardForm) {
    creditCardForm.addEventListener('submit', processSimulatedPayment);
  }

  // Enmascaramiento / Formateador en tiempo real de tarjeta
  const cardNumberInput = document.getElementById('card-number');
  if (cardNumberInput) {
    cardNumberInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
      let formattedValue = '';
      for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) {
          formattedValue += ' ';
        }
        formattedValue += value[i];
      }
      e.target.value = formattedValue;
    });
  }

  const cardExpiryInput = document.getElementById('card-expiry');
  if (cardExpiryInput) {
    cardExpiryInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
      if (value.length > 2) {
        e.target.value = value.substring(0, 2) + ' / ' + value.substring(2, 4);
      } else {
        e.target.value = value;
      }
    });
  }
}

// ── MOSTRAR / OCULTAR CARRITO ──────────────────────────────────────────
function toggleCartDrawer(isOpen) {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');
  
  if (isOpen) {
    drawer.classList.add('active');
    overlay.classList.add('active');
  } else {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
  }
}

// ── OPERACIONES DEL CARRITO ────────────────────────────────────────────

// Agregar al carrito
function addToCart(productId, qty = 1) {
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.qty += qty;
  } else {
    cart.push({ id: productId, qty: qty });
  }
  
  saveCart();
  animateCartButton();
}

// Cambiar cantidad
function updateQuantity(productId, change) {
  const item = cart.find(item => item.id === productId);
  if (!item) return;
  
  item.qty += change;
  
  if (item.qty <= 0) {
    removeFromCart(productId);
  } else {
    saveCart();
  }
}

// Eliminar ítem
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
}

// Obtener datos del producto de forma segura
function getProductData(id) {
  // Lee desde main.js si está cargado
  if (window.productos && window.productos[id]) {
    return window.productos[id];
  }
  if (typeof productos !== 'undefined' && productos[id]) {
    return productos[id];
  }
  // Fallback genérico por seguridad
  return {
    title: id.charAt(0).toUpperCase() + id.slice(1),
    price: '$0.00',
    img: 'assets/img/logo.png'
  };
}

// ── RENDERIZADO DE LA INTERFAZ ─────────────────────────────────────────
function renderCart() {
  const itemsContainer = document.getElementById('cart-items-list');
  const badge = document.getElementById('cart-badge');
  const totalVal = document.getElementById('cart-total-amount');
  
  if (!itemsContainer) return;

  // Limpiar lista
  itemsContainer.innerHTML = '';
  
  let totalItems = 0;
  let subtotal = 0.0;

  if (cart.length === 0) {
    itemsContainer.innerHTML = `
      <div class="cart-empty-message">
        <svg viewBox="0 0 24 24">
          <path d="M17.21 9l-4.38-6.56c-.19-.28-.51-.42-.83-.42-.32 0-.64.14-.83.43L6.79 9H2c-1.1 0-2 .9-2 2v2c0 .96.69 1.76 1.62 1.93L3.38 20c.15.58.68 1 1.28 1h14.68c.6 0 1.13-.42 1.28-1l1.76-5.07c.93-.17 1.62-.97 1.62-1.93v-2c0-1.1-.9-2-2-2h-4.79zM9 9l3-4.5L15 9H9zm3 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
        </svg>
        <p>Tu carrito está vacío</p>
      </div>
    `;
    
    // Ocultar sección de datos y botones de checkout
    document.getElementById('cart-checkout-section').style.display = 'none';
    document.getElementById('btn-checkout-whatsapp').style.display = 'none';
    document.getElementById('btn-checkout-card').style.display = 'none';
    
    // Actualizar badge
    badge.textContent = '0';
    badge.classList.remove('has-items');
    totalVal.textContent = '$0.00';
    return;
  }

  // Mostrar secciones correspondientes si hay ítems
  document.getElementById('cart-checkout-section').style.display = 'block';
  document.getElementById('btn-checkout-whatsapp').style.display = 'flex';
  document.getElementById('btn-checkout-card').style.display = 'flex';

  cart.forEach(item => {
    const prod = getProductData(item.id);
    const priceNum = parseFloat(prod.price.replace('$', ''));
    const itemTotal = priceNum * item.qty;
    
    totalItems += item.qty;
    subtotal += itemTotal;

    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item';
    itemEl.innerHTML = `
      <img src="${prod.img}" alt="${prod.title}" class="cart-item-img">
      <div class="cart-item-details">
        <h5 class="cart-item-title">${prod.title}</h5>
        <p class="cart-item-price">${prod.price} <span style="font-size:12px;color:#888;">x ${item.qty}</span></p>
      </div>
      <div class="cart-item-actions">
        <div class="quantity-controls">
          <button class="qty-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
          <span class="qty-val">${item.qty}</span>
          <button class="qty-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
        </div>
        <button class="remove-item-btn" onclick="removeFromCart('${item.id}')" aria-label="Eliminar item">
          <svg viewBox="0 0 24 24" width="18" height="18">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
          </svg>
        </button>
      </div>
    `;
    itemsContainer.appendChild(itemEl);
  });

  // Actualizar totales y badge
  badge.textContent = totalItems;
  badge.classList.add('has-items');
  totalVal.textContent = `$${subtotal.toFixed(2)}`;
}

// Animación táctil y elástica en el botón del carrito al añadir productos
function animateCartButton() {
  const floatBtn = document.getElementById('cart-float-btn');
  if (floatBtn && typeof gsap !== 'undefined') {
    gsap.timeline()
      .to(floatBtn, { scale: 1.3, rotate: 15, duration: 0.15, ease: 'power1.out' })
      .to(floatBtn, { scale: 0.9, rotate: -10, duration: 0.15, ease: 'power1.inOut' })
      .to(floatBtn, { scale: 1.0, rotate: 0, duration: 0.3, ease: 'elastic.out(1, 0.5)' });
  }
}

// ── CHECOUT DE COMPRA ──────────────────────────────────────────────────

// Validar formulario de envío
function validateCheckoutForm() {
  const nombre = document.getElementById('cart-c-name').value.trim();
  const telefono = document.getElementById('cart-c-phone').value.trim();
  const direccion = document.getElementById('cart-c-address').value.trim();

  if (!nombre || !telefono || !direccion) {
    alert('⚠️ Por favor, completa todos los campos del formulario para realizar tu pedido.');
    return null;
  }

  return { nombre, telefono, direccion };
}

// Enviar pedido por WhatsApp
function handleWhatsAppCheckout() {
  const clientData = validateCheckoutForm();
  if (!clientData) return;

  let message = `🌿 *NUEVO PEDIDO — RUTA ESCONDIDA*\n\n`;
  message += `👤 *Cliente:* ${clientData.nombre}\n`;
  message += `📞 *Teléfono:* ${clientData.telefono}\n`;
  message += `📍 *Dirección de Entrega:* ${clientData.direccion}\n\n`;
  message += `🛒 *Detalle del Pedido:*\n`;

  let total = 0;
  let itemsInfo = [];
  cart.forEach(item => {
    const prod = getProductData(item.id);
    const priceNum = parseFloat(prod.price.replace('$', ''));
    const itemTotal = priceNum * item.qty;
    total += itemTotal;
    message += `• _${item.qty}x_ *${prod.title}* — ${prod.price} c/u (Subtotal: $${itemTotal.toFixed(2)})\n`;
    itemsInfo.push({ title: prod.title, price: prod.price, qty: item.qty, img: prod.img });
  });

  message += `\n💵 *TOTAL A PAGAR:* $${total.toFixed(2)}\n\n`;
  message += `💬 _Deseo coordinar el pago por transferencia bancaria o contra entrega. ¡Muchas gracias!_`;

  const orderData = {
    client: clientData,
    items: itemsInfo,
    total: total.toFixed(2),
    paymentMethod: 'WhatsApp (Transferencia Bancaria / Contra Entrega)',
    date: new Date().toLocaleDateString('es-EC', { day: 'numeric', month: 'long', year: 'numeric' })
  };

  localStorage.setItem('ruta_last_order', JSON.stringify(orderData));

  const encodedText = encodeURIComponent(message);
  const waUrl = `https://wa.me/${CONFIG.whatsappPhone}?text=${encodedText}`;
  
  // Limpiar carrito
  cart = [];
  saveCart();
  
  // Limpiar formulario
  document.getElementById('cart-checkout-form').reset();

  // Abrir enlace en pestaña nueva y redirigir pestaña actual
  window.open(waUrl, '_blank');
  window.location.href = 'gracias.html';
}

// Enviar pedido mediante Tarjeta (Simulación y Preparación Gateway)
function handleCardCheckout() {
  const clientData = validateCheckoutForm();
  if (!clientData) return;

  // Actualizar montos en la simulación
  let total = 0;
  cart.forEach(item => {
    const prod = getProductData(item.id);
    const priceNum = parseFloat(prod.price.replace('$', ''));
    total += priceNum * item.qty;
  });

  document.getElementById('gateway-total-amount').textContent = `$${total.toFixed(2)}`;

  // Abrir modal de pago simulado
  const drawer = document.getElementById('cart-drawer');
  const gatewayModal = document.getElementById('gateway-modal');
  const overlay = document.getElementById('cart-overlay');

  // Cerrar el drawer lateral para enfocar el popup del pago
  drawer.classList.remove('active');
  gatewayModal.classList.add('active');
  overlay.classList.add('active');
}

// Cerrar pasarela de tarjeta
function closeGatewayModal() {
  const gatewayModal = document.getElementById('gateway-modal');
  if (gatewayModal) {
    gatewayModal.classList.remove('active');
  }
  // Si el carrito está vacío, quitar overlay por completo
  if (cart.length === 0) {
    const overlay = document.getElementById('cart-overlay');
    if (overlay) overlay.classList.remove('active');
  }
}

// Simulación de procesado del pago
function processSimulatedPayment(e) {
  e.preventDefault();

  const payBtn = document.getElementById('simulated-pay-btn');
  const originalText = payBtn.textContent;
  
  payBtn.disabled = true;
  payBtn.textContent = 'Procesando pago seguro... 🔒';
  payBtn.style.background = '#d4af37';

  // Simular latencia de red (2 segundos)
  setTimeout(() => {
    const nombre = document.getElementById('cart-c-name').value.trim();
    const telefono = document.getElementById('cart-c-phone').value.trim();
    const direccion = document.getElementById('cart-c-address').value.trim();
    
    let itemsInfo = [];
    let subtotal = 0;
    cart.forEach(item => {
      const prod = getProductData(item.id);
      const priceNum = parseFloat(prod.price.replace('$', ''));
      itemsInfo.push({ title: prod.title, price: prod.price, qty: item.qty, img: prod.img });
      subtotal += priceNum * item.qty;
    });

    const orderData = {
      client: { nombre, telefono, direccion },
      items: itemsInfo,
      total: subtotal.toFixed(2),
      paymentMethod: 'Tarjeta de Crédito / Débito',
      date: new Date().toLocaleDateString('es-EC', { day: 'numeric', month: 'long', year: 'numeric' })
    };

    localStorage.setItem('ruta_last_order', JSON.stringify(orderData));

    // Limpiar carrito y cerrar modales
    cart = [];
    saveCart();
    
    closeGatewayModal();
    
    // Limpiar campos del formulario
    document.getElementById('cart-checkout-form').reset();
    document.getElementById('simulated-card-form').reset();

    // Restablecer botón
    payBtn.disabled = false;
    payBtn.textContent = originalText;
    payBtn.style.background = '';

    // Redirigir a gracias.html
    window.location.href = 'gracias.html';
  }, 2200);
}

// Inicializar el carrito al cargar el DOM
document.addEventListener('DOMContentLoaded', initCart);
