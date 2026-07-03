// ═══════════════════════════════════════════════════════
// RUTA ESCONDIDA — main.js
// ═══════════════════════════════════════════════════════

gsap.registerPlugin(ScrollTrigger);

// ── STICKY NAV (Glassmorphism) ────────────────────────
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 80);
}, { passive: true });

// ── HERO PARALLAX ─────────────────────────────────────
const heroBg = document.getElementById('hero-bg');
if (heroBg) {
  gsap.to(heroBg, {
    yPercent: 30,
    ease: 'none',
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true }
  });
}

// ── PARALLAX SECTIONS ─────────────────────────────────
['pb-1','pb-2'].forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;
  gsap.to(el, {
    yPercent: 25,
    ease: 'none',
    scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
  });
});

// ── REVEAL ON SCROLL ──────────────────────────────────
document.querySelectorAll('.reveal').forEach((el, i) => {
  gsap.fromTo(el,
    { opacity: 0, y: 50 },
    {
      opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
      delay: (i % 3) * 0.15
    }
  );
});

// ── COUNTER ANIMATION ─────────────────────────────────
document.querySelectorAll('[data-target]').forEach(el => {
  const target = parseInt(el.dataset.target);
  const suffix = el.parentElement.querySelector('.impacto-label').textContent.includes('%') ? '%' : '+';
  ScrollTrigger.create({
    trigger: el,
    start: 'top 80%',
    onEnter: () => {
      gsap.to({ val: 0 }, {
        val: target,
        duration: 2.5,
        ease: 'power2.out',
        onUpdate: function() {
          el.textContent = Math.round(this.targets()[0].val) + (target === 100 ? '%' : '+');
        }
      });
    },
    once: true
  });
});

// ── RUTA CARDS STAGGER ────────────────────────────────
gsap.fromTo('.ruta-card',
  { opacity: 0, scale: 0.95 },
  {
    opacity: 1, scale: 1, duration: 1, ease: 'power3.out',
    stagger: 0.2,
    scrollTrigger: { trigger: '.rutas-grid', start: 'top 75%' }
  }
);

// ── PRODUCTO DETAIL DATA ───────────────────────────────
const productos = {
  aceite: {
    img: 'assets/img/aceite_hero.png',
    images: ['assets/img/aceite_hero.png', 'assets/img/ruta_hero.png', 'assets/img/aguacates_frescos.png'],
    badge: 'Más Vendido',
    stock: 'Disponible para entrega inmediata',
    category: 'Gastronomía · Origen Alchipichí · 2.100 msnm',
    title: 'Aceite Extra Virgen de Aguacate',
    price: '$7.50 / 250 ml',
    desc: 'Producido en las alturas de Alchipichí a 2.100 msnm, este aceite de aguacate extra virgen es prensado en frío preservando todos sus nutrientes. De color verde brillante con matices dorados, tiene un sabor delicado con notas herbáceas y un toque a fruto fresco.',
    icons: [
      { emoji: '🌿', label: 'Omega 3, 6 y 9' },
      { emoji: '❄️', label: 'Prensado al frío' },
      { emoji: '📍', label: 'Origen Alchipichí' },
      { emoji: '✓', label: 'Sin aditivos' }
    ],
    benefits: [
      { title: 'Riqueza en Ácidos Grasos', text: 'Alto contenido de Omega 3, 6 y 9. Apoya la salud cardiovascular, reduce la inflamación y mejora la absorción de nutrientes liposolubles.' },
      { title: 'Prensado en Frío', text: 'Extraído a baja temperatura para preservar vitaminas E y K, clorofila y antioxidantes naturales. Sin calor ni químicos.' },
      { title: 'Punto de Humo Superior', text: 'Con un punto de humo de 250°C es perfecto para todo tipo de cocción: salteados, asados, aliños y cosmética.' },
      { title: 'Origen Certificado', text: 'Producido en la finca de Ruta Escondida en Alchipichí a 2.100 msnm, bajo prácticas agroecológicas que protegen el ecosistema andino.' }
    ]
  },
  serum: {
    img: 'assets/img/serum_facial.png',
    images: ['assets/img/serum_facial.png', 'assets/img/shampoo.png', 'assets/img/aceite_hero.png'],
    badge: 'Nuevo',
    stock: 'Disponible para entrega inmediata',
    category: 'Cosmética Natural · Vegano · Sin crueldad animal',
    title: 'Sérum Facial de Aguacate',
    price: '$6.50 / 30 ml',
    desc: 'Formulación de alta concentración con aceite de aguacate extra virgen, vitamina E natural y extracto de aloe andino. Penetra profundamente para regenerar, nutrir e iluminar la piel sin obstruir los poros.',
    icons: [
      { emoji: '💧', label: 'Hidratación 24h' },
      { emoji: '🌱', label: '100% Vegano' },
      { emoji: '✨', label: 'Anti-edad' },
      { emoji: '🚫', label: 'Sin parabenos' }
    ],
    benefits: [
      { title: 'Vitamina E Natural', text: 'Poderoso antioxidante que combate el daño de los radicales libres, previene el envejecimiento prematuro y protege la barrera cutánea.' },
      { title: 'Omega 9 Regenerador', text: 'El ácido oleico del aguacate imita los lípidos naturales de la piel, facilitando la absorción y restaurando la elasticidad y suavidad.' },
      { title: 'Aloe Andino', text: 'Extracto de aloe cultivado en los páramos de los Andes. Calma, hidrata y acelera la regeneración celular gracias a sus polisacáridos únicos.' },
      { title: 'Formulación Limpia', text: 'Sin fragancias sintéticas, sulfatos, parabenos ni ingredientes de origen animal. Apto para pieles sensibles.' }
    ]
  },
  mandarinas: {
    img: 'assets/img/mandarinas_frescas.png',
    images: ['assets/img/mandarinas_frescas.png', 'assets/img/ruta_hero.png'],
    badge: 'Cosecha del Día',
    stock: 'Cosechado bajo pedido',
    category: 'Fruta Fresca · Agroecológico · 2.100 msnm',
    title: 'Mandarinas Frescas de Alchipichí',
    price: '$3.00 / kg',
    desc: 'Cultivadas a 2.100 msnm en los valles de Alchipichí, nuestras mandarinas son dulces, jugosas y con una acidez equilibrada única del clima andino. Cosechadas bajo pedido el mismo día para garantizar máxima frescura y sabor en tu mesa.',
    icons: [
      { emoji: '🍊', label: 'Dulces y Jugosas' },
      { emoji: '📍', label: '2.100 msnm' },
      { emoji: '☀️', label: 'Cosechadas a mano' },
      { emoji: '🌱', label: 'Sin pesticidas' }
    ],
    benefits: [
      { title: 'Dulzor Andino Natural', text: 'El microclima único de Alchipichí a 2.100 msnm, con noches frescas y días soleados, concentra los azúcares naturales de la fruta de forma excepcional.' },
      { title: 'Rica en Vitamina C', text: 'Cada mandarina aporta una alta dosis de vitamina C, antioxidantes y flavonoides que refuerzan el sistema inmunológico y la piel.' },
      { title: 'Cultivo Limpio', text: 'Producidas sin pesticidas ni agroquimicos. Nuestra finca utiliza compost orgánico y agua de vertiente andina pura.' },
      { title: 'Frescura Garantizada', text: 'Cosechamos bajo pedido el mismo día de tu envío para asegurar que lleguen en su punto óptimo de madurez y sabor.' }
    ]
  },
  te_naranja: {
    img: 'assets/img/te_aguacate.png',
    images: ['assets/img/te_aguacate.png', 'assets/img/ruta_hero.png'],
    badge: 'Recomendado',
    stock: 'Últimas 5 unidades',
    category: 'Infusión · Bienestar · 100% Orgánico',
    title: 'Té de Hojas de Aguacate con Naranja',
    price: '$5.00 / 100 g',
    desc: 'Nuestra infusión insigne combina las propiedades antioxidantes y altamente digestivas de las hojas del árbol de aguacate con el aroma cítrico y vibrante de las hojas de naranja deshidratadas. Cada sobre contiene hojas secadas lentamente a la sombra, logrando una taza equilibrada, reconfortante y naturalmente libre de cafeína. Perfecta para disfrutar caliente después de las comidas o fría en una tarde templada.',
    icons: [
      { emoji: '🍵', label: 'Antioxidante' },
      { emoji: '🍊', label: 'Toque Cítrico' },
      { emoji: '🚫', label: 'Libre de Cafeína' },
      { emoji: '🌿', label: 'Hojas Seleccionadas' }
    ],
    benefits: [
      { title: 'Riqueza Antioxidante', text: 'Las hojas de aguacate contienen polifenoles y flavonoides que combaten los radicales libres y fortalecen el sistema inmunitario.' },
      { title: 'Bálsamo Digestivo', text: 'Tradicionalmente valorada por calmar el sistema digestivo, aliviar la acidez y favorecer una digestión ligera y placentera.' },
      { title: 'Hojas de Naranja Deshidratadas', text: 'Nuestras hojas de naranja orgánica aportan un dulzor cítrico sutil que equilibra las notas herbales del té con un aroma envolvente.' },
      { title: 'Bienestar Diario', text: 'Una bebida 100% natural, sin conservantes ni aditivos químicos. Diseñada para tus rituales de calma y relajación.' }
    ]
  },
  aguacates: {
    img: 'assets/img/aguacates_frescos.png',
    images: ['assets/img/aguacates_frescos.png', 'assets/img/ruta_hero.png'],
    badge: 'Popular',
    stock: 'Disponible bajo pedido',
    category: 'Fruta Fresca · Agroecológico · 2.100 msnm',
    title: 'Aguacates Frescos de Alchipichí',
    price: '$2.30 / kg',
    desc: 'Disfruta del auténtico sabor andino con nuestra selección de aguacates frescos del día. Cultivados bajo un modelo agroecológico y de comercio justo en las laderas de Alchipichí a 2.100 msnm, nuestros frutos se benefician de un clima templado y suelos ricos en nutrientes. Seleccionamos manualmente cada pieza en su punto ideal de madurez para garantizar una textura cremosa incomparable (como mantequilla andina) y un sabor almendrado y profundo.',
    icons: [
      { emoji: '🥑', label: 'Textura Cremosa' },
      { emoji: '📍', label: 'Origen Alchipichí' },
      { emoji: '☀️', label: 'Cosechado a mano' },
      { emoji: '🚜', label: 'Agroecológico' }
    ],
    benefits: [
      { title: 'Textura de Mantequilla', text: 'Frutos con un alto contenido de aceites saludables naturales, lo que les confiere una cremosidad inigualable y deliciosa.' },
      { title: 'Cultivo Sostenible', text: 'Nuestros árboles se riegan con agua de vertiente andina y se abonan con compost orgánico de la misma finca.' },
      { title: 'Nutrición Pura', text: 'Excelente fuente de grasas monoinsaturadas (ácido oleico), potasio, fibra dietética y vitaminas B5, B6, C, E y K.' },
      { title: 'Cosechado bajo Pedido', text: 'Cortamos los aguacates del árbol el mismo día de tu pedido a 2.100 msnm para asegurar que lleguen frescos y con la máxima vida útil a tu hogar.' }
    ]
  },
  huevos: {
    img: 'assets/img/huevos_felices.png',
    images: ['assets/img/huevos_felices.png', 'assets/img/ruta_hero.png'],
    badge: 'Más Vendido',
    stock: 'Últimas 3 unidades',
    category: 'Granja · Pastoreo Libre · Alto Nutricional',
    title: 'Huevos Felices de Pastoreo',
    price: '$6.00',
    desc: 'Nuestros \'Huevos Felices\' provienen de gallinas criadas en total libertad de pastoreo en los prados de Ruta Escondida. Nuestras aves disfrutan del sol, corren libremente y complementan su alimentación de pasto y bichitos con pulpa de aguacate de descarte de nuestra producción de aceite y granos 100% naturales libres de hormonas. El resultado es un huevo de yema color naranja vibrante, clara consistente y un sabor campestre de verdad que deleitará tus desayunos.',
    icons: [
      { emoji: '🐓', label: 'Pastoreo Libre' },
      { emoji: '🥑', label: 'Dieta con Aguacate' },
      { emoji: '🥚', label: 'Yema Vibrante' },
      { emoji: '🚫', label: 'Sin Hormonas' }
    ],
    benefits: [
      { title: 'Gallinas en Libertad', text: 'Nuestras gallinas pasan el día al aire libre bajo los árboles de aguacate, lo que reduce su estrés y se traduce en huevos más saludables.' },
      { title: 'Alimentación Enriquecida', text: 'Al comer aguacate de la finca, sus huevos adquieren un perfil graso superior con más grasas saludables, Omega 3 y vitaminas.' },
      { title: 'Sabor y Calidad Campestre', text: 'La frescura de los huevos de pastoreo se nota en su cáscara firme, su yema densa y cremosa, y un sabor inigualable.' },
      { title: 'Apoyo Local Sostenible', text: 'Cada docena apoya la ganadería regenerativa y la economía circular al utilizar el aguacate sobrante como alimento de las aves.' }
    ]
  }
};

// Global image switcher for the product gallery
window.changeProductMainImg = function(url, thumbEl) {
  const mainImg = document.getElementById('pd-img');
  if (mainImg) mainImg.src = url;
  if (thumbEl) {
    const thumbs = thumbEl.parentElement.querySelectorAll('img');
    thumbs.forEach(t => t.classList.remove('active'));
    thumbEl.classList.add('active');
  }
};

// Global quantity control variable
let currentProductQty = 1;

document.addEventListener('DOMContentLoaded', () => {
  const minus = document.getElementById('pd-qty-minus');
  const plus = document.getElementById('pd-qty-plus');
  const val = document.getElementById('pd-qty-val');
  if (minus && plus && val) {
    minus.addEventListener('click', () => {
      if (currentProductQty > 1) {
        currentProductQty--;
        val.textContent = currentProductQty;
      }
    });
    plus.addEventListener('click', () => {
      currentProductQty++;
      val.textContent = currentProductQty;
    });
  }
});

// ── OPEN PRODUCTO DETALLE ─────────────────────────────
function openProducto(id) {
  const p = productos[id];
  if (!p) return;

  // Reset Quantity
  currentProductQty = 1;
  const valEl = document.getElementById('pd-qty-val');
  if (valEl) valEl.textContent = '1';

  // Primary Image & Category & Title & Description
  document.getElementById('pd-img').src = p.img;
  document.getElementById('pd-img').alt = p.title;
  document.getElementById('pd-category').textContent = p.category;
  document.getElementById('pd-title').textContent = p.title;
  document.getElementById('pd-price').textContent = p.price.split(' ')[0]; // Solo el precio numérico

  const pdUnit = document.getElementById('pd-price-unit');
  if (pdUnit) {
    const unitPart = p.price.split(' ');
    pdUnit.textContent = unitPart.length > 1 ? ` ${unitPart.slice(1).join(' ')}` : '';
  }

  document.getElementById('pd-desc').textContent = p.desc;
  
  // Guardar el ID del producto en el botón para el carrito
  document.getElementById('btn-comprar-now').setAttribute('data-product-id', id);

  // Floating Badge
  const badgeEl = document.getElementById('pd-badge');
  if (badgeEl) {
    if (p.badge) {
      badgeEl.textContent = p.badge;
      badgeEl.style.display = 'inline-block';
    } else {
      badgeEl.style.display = 'none';
    }
  }

  // Stock indicator
  const stockEl = document.getElementById('pd-stock');
  if (stockEl) {
    if (p.stock) {
      stockEl.textContent = p.stock;
      stockEl.style.display = 'inline-block';
      if (p.stock.includes('Últimas') || p.stock.includes('Pocas')) {
        stockEl.style.color = '#e05a47';
        stockEl.style.borderColor = '#e05a47';
      } else {
        stockEl.style.color = '#2d5a27';
        stockEl.style.borderColor = '#2d5a27';
      }
    } else {
      stockEl.style.display = 'none';
    }
  }

  // Image Gallery Thumbnails
  const thumbsEl = document.getElementById('pd-thumbs');
  if (thumbsEl) {
    if (p.images && p.images.length > 1) {
      thumbsEl.style.display = 'flex';
      thumbsEl.innerHTML = p.images.map((imgUrl, idx) => `
        <img src="${imgUrl}" class="${idx === 0 ? 'active' : ''}" onclick="changeProductMainImg('${imgUrl}', this)" alt="Vista ${idx + 1}" />
      `).join('');
    } else {
      thumbsEl.style.display = 'none';
      thumbsEl.innerHTML = '';
    }
  }

  // Icons
  const iconsEl = document.getElementById('pd-icons');
  iconsEl.innerHTML = p.icons.map(ic => `
    <div class="pd-icon">
      <div class="pd-icon-circle">${ic.emoji}</div>
      <span>${ic.label}</span>
    </div>
  `).join('');

  // Benefits
  const benEl = document.getElementById('pd-benefits');
  benEl.innerHTML = p.benefits.map((b, i) => `
    <div class="pd-benefit">
      <span class="pd-benefit-num">0${i+1}</span>
      <div class="pd-benefit-text">
        <h4>${b.title}</h4>
        <p>${b.text}</p>
      </div>
    </div>
  `).join('');

  // Related Products Section
  const relatedEl = document.getElementById('pd-related');
  if (relatedEl) {
    const keys = Object.keys(productos).filter(k => k !== id).slice(0, 2);
    relatedEl.innerHTML = keys.map(k => {
      const rp = productos[k];
      return `
        <a href="#" class="pd-related-card" onclick="openProducto('${k}'); return false;">
          <img src="${rp.img}" alt="${rp.title}" />
          <div class="pd-related-card-info">
            <h5>${rp.title}</h5>
            <span>${rp.price.split(' ')[0]}</span>
          </div>
        </a>
      `;
    }).join('');
  }

  const modal = document.getElementById('producto-detalle');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

document.getElementById('pd-close-btn').addEventListener('click', () => {
  document.getElementById('producto-detalle').classList.remove('active');
  document.body.style.overflow = '';
});

// ── RUTA MODAL DATA ───────────────────────────────────
const rutas = {
  gigante: { section: '#ruta-gigante' },
  agua:    { section: '#ruta-agua' },
  tayos:   { section: '#ruta-tayos' }
};

function openRuta(id) {
  // Scroll to turismo section for now
  document.getElementById('turismo').scrollIntoView({ behavior:'smooth' });
}

// ── SMOOTH ANCHOR LINKS ───────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── HERO ENTRANCE ANIMATION ───────────────────────────
function startHeroEntrance() {
  gsap.timeline()
    .to('.hero-content', { opacity: 1, duration: 0.1 }, 0.2)
    .fromTo('.hero-label',  { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .8 }, 0.3)
    .fromTo('.hero-title',  { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, 0.7)
    .fromTo('.hero-sub',    { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .8 }, 1.2)
    .fromTo('.hero-cta-group', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .8 }, 1.5)
    .fromTo('.scroll-hint', { opacity: 0 }, { opacity: .6, duration: 1 }, 2.0)
    .to('#main-nav', { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', pointerEvents: 'auto' }, 2.2);
}

// ── EXPEDITION LOADER LOGIC ───────────────────────────
// Solo mostrar el loader la primera vez que se abre la web en esta sesión
const loaderEl = document.getElementById('site-loader');
const hasSeenLoader = sessionStorage.getItem('ruta_loader_shown');

if (hasSeenLoader && loaderEl) {
  // Ya vio el loader en esta sesión — ocultarlo inmediatamente
  loaderEl.style.display = 'none';
  startHeroEntrance();
}

const loaderVal = { percent: 0 };
if (!hasSeenLoader) gsap.to(loaderVal, {
  percent: 100,
  duration: 3.0,
  ease: 'power1.inOut',
  onUpdate: () => {
    const valRounded = Math.round(loaderVal.percent);
    const displayVal = valRounded < 10 ? `0${valRounded}` : valRounded;
    
    const percentEl = document.getElementById('loader-percent');
    if (percentEl) percentEl.textContent = displayVal;
    
    const offset = 534 - (534 * loaderVal.percent / 100);
    const hudFillEl = document.querySelector('.hud-fill');
    if (hudFillEl) hudFillEl.style.strokeDashoffset = offset;
    
    const statusEl = document.getElementById('loader-status');
    if (statusEl) {
      if (valRounded <= 25) {
        statusEl.textContent = 'CONECTANDO';
      } else if (valRounded <= 50) {
        statusEl.textContent = 'ENLAZANDO ANDES';
      } else if (valRounded <= 75) {
        statusEl.textContent = 'BUSCANDO COORDENADAS';
      } else if (valRounded <= 99) {
        statusEl.textContent = 'SINCRONIZANDO TELEMETRÍA';
      } else {
        statusEl.textContent = 'CONEXIÓN ESTABLECIDA';
      }
    }
  },
  onComplete: () => {
    // Marcar como visto en esta sesión
    sessionStorage.setItem('ruta_loader_shown', '1');
    
    // Ocultar HUD y de inmediato desvanecer el loader para revelar la web
    gsap.timeline()
      .to('.hud-circle-wrapper', {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out',
        onComplete: () => {
          const wrapperEl = document.querySelector('.hud-circle-wrapper');
          if (wrapperEl) wrapperEl.style.display = 'none';
        }
      })
      .to('#site-loader', {
        opacity: 0,
        scale: 1.05,
        duration: 1.0,
        ease: 'power2.inOut',
        pointerEvents: 'none',
        onComplete: () => {
          const loader = document.getElementById('site-loader');
          if (loader) loader.style.display = 'none';
          startHeroEntrance();
        }
      }, "+=0.2"); // Breve pausa de 0.2s para mostrar el estado "CONEXIÓN ESTABLECIDA"
  }
});


// ── TIENDA STAGGER ────────────────────────────────────
gsap.fromTo('.producto-card',
  { opacity: 0, y: 60 },
  {
    opacity: 1, y: 0, duration: .9, ease: 'power3.out', stagger: 0.18,
    scrollTrigger: { trigger: '.productos-grid', start: 'top 80%' }
  }
);

// ── IMPACTO ITEMS ─────────────────────────────────────
gsap.fromTo('.impacto-item',
  { opacity: 0, y: 40 },
  {
    opacity: 1, y: 0, duration: .8, stagger: 0.15, ease: 'power3.out',
    scrollTrigger: { trigger: '.impacto-grid', start: 'top 80%' }
  }
);

// ── PDF BROCHURE (simulated download) ─────────────────
document.getElementById('btn-brochure-pdf').addEventListener('click', e => {
  e.preventDefault();
  alert('🌿 Brochure descargado. En la versión final, este botón registrará tu email y enviará el PDF automáticamente.');
});

// ── HAMBURGER MENU MÓVIL ──────────────────────────────
(function() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;

  const burger = document.createElement('button');
  burger.className = 'nav-hamburger';
  burger.setAttribute('aria-label', 'Menú');
  burger.innerHTML = '<span></span><span></span><span></span>';
  nav.appendChild(burger);

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

  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    panel.classList.toggle('open');
    document.body.style.overflow = panel.classList.contains('open') ? 'hidden' : '';
  });

  panel.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      panel.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

// ── TESTIMONIOS CATEGORY FILTER V2.0 ──────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.test-filter-btn');
  const cards = document.querySelectorAll('#testimonios-list .test-card');
  if (filterBtns.length === 0 || cards.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          gsap.fromTo(card, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4 });
        } else {
          card.style.display = 'none';
        }
      });
      // Refresh ScrollTrigger because layout shifted
      ScrollTrigger.refresh();
    });
  });
});

// ── MAP LEAFLET & TABS INITIALIZATION V2.0 ─────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Leaflet Map Initialization
  const mapEl = document.getElementById('map-leaflet');
  if (mapEl && typeof L !== 'undefined') {
    // Coordenadas exactas de Ruta Escondida (Alchipichí, Pichincha, Ecuador)
    const lat = 0.1200;
    const lng = -78.3791;
    const map = L.map('map-leaflet', { scrollWheelZoom: false }).setView([lat, lng], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Styled Marker
    const marker = L.marker([lat, lng]).addTo(map);
    marker.bindPopup(`
      <div style="font-family: 'Inter', sans-serif; font-size:12px; color:#1a1a1a; line-height:1.5;">
        <strong style="font-family: 'Cormorant Garamond', serif; font-size:15px; color:#1b4332; display:block; margin-bottom:4px;">Ruta Escondida</strong>
        Finca Agroecológica y Turismo de Inmersión<br>
        Alchipichí, Pichincha, Ecuador<br>
        <a href="https://maps.google.com/?q=${lat},${lng}" target="_blank" rel="noopener" style="color:#C8A96A; font-weight:bold; text-decoration:none; display:inline-block; margin-top:6px;">📍 Abrir en Google Maps</a>
      </div>
    `).openPopup();
  }

  // Tabs click handlers
  const tabBtns = document.querySelectorAll('.map-tab-btn');
  const tabContents = document.querySelectorAll('.map-tab-content');
  if (tabBtns.length > 0 && tabContents.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        tabContents.forEach(content => {
          if (content.id === `tab-${tabId}`) {
            content.classList.add('active');
          } else {
            content.classList.remove('active');
          }
        });
      });
    });
  }
});

