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

// ───────────────────────────────────────────────────────────
// CENTRAL DE RESERVAS Y EXPERIENCIAS — LÓGICA DE NEGOCIO
// ───────────────────────────────────────────────────────────

// ── 1. PRE-POBLAR NEGOCIOS PARA SIMULACIÓN ─────────────────
function inicializarNegociosLocales() {
  const stored = localStorage.getItem('ruta_escondida_negocios');
  if (!stored) {
    const list = [
      {
        id: "glamping",
        name: "Glamping Andes Escondidos",
        category: "hospedaje",
        manager_name: "Diego Ruiz",
        email: "glamping@rutaescondida.com",
        phone: "593984480203",
        whatsapp: "593984480203",
        address: "Alchipichí, Sector El Campanario",
        parish: "Chavezpamba",
        coords_lat: 0.1220,
        coords_lng: -78.3750,
        schedule: "Todos los días bajo reserva",
        description_short: "Domo de lujo con vista panorámica de 360° al cañón de Alchipichí.",
        description_long: "Domo de lujo con vista panorámica de 360° al cañón de Alchipichí. Equipado con jacuzzi privado, fogata y desayuno agroecológico incluido.",
        subscription_plan: "digital_pro",
        status: "active",
        photos: ["assets/img/glamping_alchipichi_1779939020087.png"],
        products: [
          { name: "Legado Alchipichí", type: "hospedaje", price: 45.00, duration: "1 noche", capacity: 2 }
        ],
        bookings: []
      },
      {
        id: "restaurante",
        name: "El Mirador de Alchipichí",
        category: "gastronomia",
        manager_name: "Rosa Ortiz",
        email: "restaurante@rutaescondida.com",
        phone: "593984480203",
        whatsapp: "593984480203",
        address: "Vía Principal a Alchipichí, Km 3",
        parish: "Puéllaro",
        coords_lat: 0.1180,
        coords_lng: -78.3810,
        schedule: "Viernes a Domingo, 9am - 6pm",
        description_short: "Comida típica ecuatoriana elaborada con ingredientes 100% orgánicos.",
        description_long: "Comida típica ecuatoriana elaborada con ingredientes 100% orgánicos de nuestro propio huerto. Disfruta de la mejor fritada andina, truchas frescas y helados artesanales.",
        subscription_plan: "visibilidad",
        status: "active",
        photos: ["assets/img/restaurante_alchipichi_1779939038740.png"],
        products: [
          { name: "Paraíso Escondido", type: "tour", price: 25.00, duration: "1 día", capacity: 15 }
        ],
        bookings: []
      },
      {
        id: "cafe",
        name: "Café de Especialidad Andino",
        category: "gastronomia",
        manager_name: "Francisco Proaño",
        email: "cafe@rutaescondida.com",
        phone: "593984480203",
        whatsapp: "593984480203",
        address: "Frente a la Plaza Central de Alchipichí",
        parish: "Perucho",
        coords_lat: 0.1205,
        coords_lng: -78.3780,
        schedule: "Todos los días 8am - 8pm",
        description_short: "Barra de café cultivado y tostado localmente a 2.100 msnm.",
        description_long: "Barra de café cultivado y tostado localmente a 2.100 msnm. Ofrecemos lattes, repostería artesanal y experiencias sensoriales del cacao.",
        subscription_plan: "basico",
        status: "active",
        photos: ["assets/img/cafe_alchipichi_1779939063539.png"],
        products: [
          { name: "Mindo Chocolate", type: "experiencia_agricola", price: 15.00, duration: "2.5 horas", capacity: 8 }
        ],
        bookings: []
      },
      {
        id: "artesanias",
        name: "Taller Cerámico Casa Alchipichí",
        category: "artesanias",
        manager_name: "Luis Anrango",
        email: "artesanias@rutaescondida.com",
        phone: "593984480203",
        whatsapp: "593984480203",
        address: "Callejón de los Artesanos, Casa N° 4",
        parish: "Atahualpa",
        coords_lat: 0.1215,
        coords_lng: -78.3820,
        schedule: "Bajo reserva previa",
        description_short: "Piezas únicas de vajilla de arcilla y talleres interactivos.",
        description_long: "Piezas únicas de vajilla de arcilla y utensilios de madera de aguacate tallados a mano. Ofrecemos talleres interactivos de modelado en torno cerámico.",
        subscription_plan: "visibilidad",
        status: "active",
        photos: ["assets/img/artesanias_alchipichi_1779939089369.png"],
        products: [
          { name: "Turismo Comunitario Alchipichí", type: "actividad_cultural", price: 30.00, duration: "Full Day", capacity: 10 },
          { name: "Salidas Pedagógicas", type: "paquete", price: 20.00, duration: "Escolar", capacity: 50 }
        ],
        bookings: []
      },
      {
        id: "hosteria_sol_minas",
        name: "Hostería Sol de Minas",
        category: "hospedaje",
        manager_name: "Patricia Terán",
        email: "minas@rutaescondida.com",
        phone: "593984480203",
        whatsapp: "593984480203",
        address: "Calle Principal y 24 de Septiembre, San José de Minas",
        parish: "Minas",
        coords_lat: 0.1742,
        coords_lng: -78.4312,
        schedule: "Todos los días",
        description_short: "Hospedaje de montaña rodeado de naturaleza andina.",
        description_long: "Hospedaje de montaña rodeado de naturaleza. Habitaciones acogedoras con chimenea, piscina temperada, senderismo guiado a cascadas y mariposario.",
        subscription_plan: "digital_pro",
        status: "active",
        photos: ["assets/img/hosteria_minas_1781486982089.png"],
        products: [
          { name: "Mariposario de la Ruta", type: "tour", price: 8.00, duration: "2 horas", capacity: 20 },
          { name: "Ruta Motera La Culebrilla", type: "tour", price: 35.00, duration: "5 horas", capacity: 6 }
        ],
        bookings: []
      }
    ];
    localStorage.setItem('ruta_escondida_negocios', JSON.stringify(list));
  }
}

// ── 2. GESTIÓN DEL MODAL DE LEADS CRM ──────────────────────
function openLeadModal(title) {
  const modal = document.getElementById('lead-modal');
  const titleEl = document.getElementById('lead-modal-title');
  if (modal) {
    if (title) titleEl.innerText = title;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Reset views
    document.getElementById('lead-step-form').style.display = 'block';
    document.getElementById('lead-step-payment').classList.remove('active');
  }
}

function closeLeadModal() {
  const modal = document.getElementById('lead-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    document.getElementById('crm-lead-form').reset();
    document.getElementById('lead-payment-form').reset();
  }
}

// Inicializar planificación genérica ("Planifica tu viaje")
window.iniciarPlanificacion = function(tripType) {
  openLeadModal('Planifica tu Viaje');
  document.getElementById('lead-exp-name').value = 'Planificación Personalizada';
  document.getElementById('lead-exp-price').value = '0';
  document.getElementById('lead-exp-parish').value = 'General';
  document.getElementById('lead-exp-category').value = 'planificacion';
  document.getElementById('lead-exp-biz-id').value = 'general';
  
  if (tripType) {
    document.getElementById('lead-trip-type').value = tripType;
  }
  
  // Ocultar fecha obligatoria y habilitar consultas genéricas
  document.getElementById('lead-date-group').style.display = 'block';
  document.getElementById('lead-guests-group').style.display = 'block';
  document.getElementById('btn-lead-submit').innerText = 'Enviar Consulta a WhatsApp';
};

// Inicializar consulta directa de experiencia
window.iniciarConsulta = function(expName, parish) {
  openLeadModal('Consultar Disponibilidad');
  document.getElementById('lead-exp-name').value = expName;
  document.getElementById('lead-exp-price').value = '0';
  document.getElementById('lead-exp-parish').value = parish;
  document.getElementById('lead-exp-category').value = 'consulta';
  document.getElementById('lead-exp-biz-id').value = 'general';
  
  document.getElementById('btn-lead-submit').innerText = 'Enviar Consulta por WhatsApp';
};

// Inicializar flujo de Reserva + Pasarela de Pago
window.iniciarReserva = function(expName, price, parish, category, bizId) {
  openLeadModal('Reservar Experiencia');
  document.getElementById('lead-exp-name').value = expName;
  document.getElementById('lead-exp-price').value = price;
  document.getElementById('lead-exp-parish').value = parish;
  document.getElementById('lead-exp-category').value = category;
  document.getElementById('lead-exp-biz-id').value = bizId || 'general';
  
  document.getElementById('btn-lead-submit').innerText = 'Continuar al Pago Seguro';
};

// ── 3. ENVÍO DE FORMULARIO DE LEADS Y CRM ──────────────────
document.addEventListener('DOMContentLoaded', () => {
  inicializarNegociosLocales();
  actualizarPuntosDisplay();
  
  const leadForm = document.getElementById('crm-lead-form');
  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('lead-name').value.trim();
      const email = document.getElementById('lead-email').value.trim();
      const phone = document.getElementById('lead-phone').value.trim();
      const city = document.getElementById('lead-city').value.trim();
      const country = document.getElementById('lead-country').value.trim();
      const tripType = document.getElementById('lead-trip-type').value;
      const guests = parseInt(document.getElementById('lead-guests').value) || 2;
      const dateVal = document.getElementById('lead-date').value;
      const notes = document.getElementById('lead-notes').value.trim();
      
      const expName = document.getElementById('lead-exp-name').value;
      const expPrice = parseFloat(document.getElementById('lead-exp-price').value) || 0;
      const parish = document.getElementById('lead-exp-parish').value;
      
      // 1. Guardar en el CRM Local (ruta_escondida_crm_leads)
      const leadData = {
        id: "lead_" + Date.now(),
        name: name,
        email: email,
        phone: phone,
        city: city,
        country: country,
        trip_type: tripType,
        interest_topic: expName ? `Interés en: ${expName} (${parish})` : 'Planificación general de viaje',
        timestamp: new Date().toISOString()
      };
      
      const storedLeads = localStorage.getItem('ruta_escondida_crm_leads');
      const leadsList = storedLeads ? JSON.parse(storedLeads) : [];
      leadsList.push(leadData);
      localStorage.setItem('ruta_escondida_crm_leads', JSON.stringify(leadsList));
      
      // 2. Determinar si requiere pago o es simple contacto
      if (expPrice > 0) {
        // Flujo con checkout
        document.getElementById('lead-step-form').style.display = 'none';
        document.getElementById('lead-step-payment').classList.add('active');
        document.getElementById('pay-summary-exp').innerText = `${expName} ($${expPrice.toFixed(2)} c/u)`;
        
        const totalAmount = expPrice * guests;
        document.getElementById('pay-total-val').innerText = totalAmount.toFixed(2);
      } else {
        // Flujo simple (Redirección directa a WhatsApp Central)
        let text = `🌿 *NUEVA CONSULTA — CENTRAL RUTA ESCONDIDA*\n\n`;
        text += `👤 *Nombre:* ${name}\n`;
        text += `📧 *Email:* ${email}\n`;
        text += `📞 *WhatsApp:* ${phone}\n`;
        text += `📍 *Origen:* ${city}, ${country}\n`;
        text += `👥 *Viaje:* ${tripType} (${guests} personas)\n`;
        if (dateVal) text += `📅 *Fecha Tentativa:* ${dateVal}\n`;
        text += `🧭 *Interés:* ${expName}\n`;
        if (notes) text += `💬 *Consultas:* _${notes}_\n`;
        text += `\n💬 _Hola Diego, me gustaría recibir más detalles sobre esta expedición rural._`;
        
        const encodedText = encodeURIComponent(text);
        const waUrl = `https://wa.me/593984480203?text=${encodedText}`;
        
        closeLeadModal();
        window.open(waUrl, '_blank');
      }
    });
  }
  
  // ── 4. SIMULACIÓN DE PAGO SEGURO Y WALLET SPLIT ───────────
  const paymentForm = document.getElementById('lead-payment-form');
  if (paymentForm) {
    paymentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const payBtn = document.getElementById('btn-pay-submit');
      const originalText = payBtn.innerHTML;
      
      payBtn.disabled = true;
      payBtn.innerHTML = '🔒 Procesando pago seguro...';
      
      setTimeout(() => {
        // Recuperar datos de la reserva
        const name = document.getElementById('lead-name').value.trim();
        const phone = document.getElementById('lead-phone').value.trim();
        const dateVal = document.getElementById('lead-date').value;
        const guests = parseInt(document.getElementById('lead-guests').value) || 2;
        
        const expName = document.getElementById('lead-exp-name').value;
        const expPrice = parseFloat(document.getElementById('lead-exp-price').value) || 0;
        const bizId = document.getElementById('lead-exp-biz-id').value;
        
        const total = expPrice * guests;
        const commission = total * 0.10; // 10% Comisión
        const net = total * 0.90;        // 90% para el Negocio
        
        const bookingId = "res_" + Date.now();
        const timestamp = new Date().toISOString();
        
        // Crear objeto de reserva
        const bookingData = {
          id: bookingId,
          bizId: bizId,
          service: expName,
          clientName: name,
          clientPhone: phone,
          guests: guests,
          total: total,
          commission: commission,
          net: net,
          status: "pagado",
          timestamp: timestamp
        };
        
        // 1. Guardar reserva en reservas globales
        const storedBookings = localStorage.getItem('ruta_escondida_reservas');
        const bookingsList = storedBookings ? JSON.parse(storedBookings) : [];
        bookingsList.push(bookingData);
        localStorage.setItem('ruta_escondida_reservas', JSON.stringify(bookingsList));
        
        // 2. Acreditar el 90% a la Wallet del comercio local en businesses
        const storedBiz = localStorage.getItem('ruta_escondida_negocios');
        if (storedBiz) {
          let bizList = JSON.parse(storedBiz);
          let biz = bizList.find(b => b.id === bizId);
          if (biz) {
            if (!biz.bookings) biz.bookings = [];
            biz.bookings.push({
              id: bookingId,
              clientName: name,
              clientPhone: phone,
              service: expName,
              guests: guests,
              total: total,
              commission: commission,
              net: net,
              status: "pagado",
              timestamp: timestamp
            });
            
            // Actualizar la lista y guardar
            bizList = bizList.filter(b => b.id !== bizId);
            bizList.push(biz);
            localStorage.setItem('ruta_escondida_negocios', JSON.stringify(bizList));
          }
        }
        
        // 3. Acumulación de puntos del programa de fidelización
        const earnedPoints = Math.round(total);
        acumularPuntosUsuario(earnedPoints);
        
        // 4. Redirección final con confirmación
        let text = `🌿 *CONFIRMACIÓN DE COMPRA — RUTA ESCONDIDA*\n\n`;
        text += `🎫 *Voucher:* ${bookingId}\n`;
        text += `👤 *Pasajero:* ${name}\n`;
        text += `🧭 *Experiencia:* *${expName}*\n`;
        text += `📅 *Fecha:* ${dateVal}\n`;
        text += `👥 *Exploradores:* ${guests} personas\n`;
        text += `💵 *Monto Pagado:* $${total.toFixed(2)} (Tarjeta de Crédito)\n\n`;
        text += `💬 _Hola Diego, acabo de pagar de forma segura en la web de Ruta Escondida. ¿Me ayudan a coordinar el encuentro?_`;
        
        const encodedText = encodeURIComponent(text);
        const waUrl = `https://wa.me/593984480203?text=${encodedText}`;
        
        // Registrar en local_order para gracias.html
        const orderData = {
          client: { nombre: name, telefono: phone, direccion: 'Reserva Segura Online' },
          items: [{ title: expName, price: `$${expPrice.toFixed(2)}`, qty: guests, img: 'assets/img/logo.png' }],
          total: total.toFixed(2),
          paymentMethod: 'Tarjeta de Crédito (Simulada split 10/90)',
          date: new Date(dateVal + 'T00:00:00').toLocaleDateString('es-EC', { day: 'numeric', month: 'long', year: 'numeric' })
        };
        localStorage.setItem('ruta_last_order', JSON.stringify(orderData));
        
        closeLeadModal();
        window.open(waUrl, '_blank');
        window.location.href = 'gracias.html';
      }, 2000);
    });
  }
  
  // ── 5. FILTRADO DE LA BARRA DE BÚSQUEDA Y CHIPS ─────────
  const btnSearch = document.getElementById('btn-search-submit');
  if (btnSearch) {
    btnSearch.addEventListener('click', () => {
      const selectedParish = document.getElementById('search-parish').value;
      const selectedCategory = document.getElementById('search-category').value;
      
      const cards = document.querySelectorAll('#experiencias-list .exp-card');
      let foundAny = false;
      
      cards.forEach(card => {
        const cardParish = card.getAttribute('data-parish');
        const cardCategory = card.getAttribute('data-category');
        
        const parishMatch = (selectedParish === 'all' || cardParish === selectedParish);
        const categoryMatch = (selectedCategory === 'all' || cardCategory === selectedCategory);
        
        if (parishMatch && categoryMatch) {
          card.style.display = 'flex';
          gsap.fromTo(card, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4 });
          foundAny = true;
        } else {
          card.style.display = 'none';
        }
      });
      
      // Smooth scroll a las experiencias filtradas
      document.getElementById('experiencias-destacadas').scrollIntoView({ behavior: 'smooth' });
      ScrollTrigger.refresh();
    });
  }
  
  // Filtrado de chips de categorías
  const filterChips = document.querySelectorAll('.experience-filters .exp-filter-btn');
  if (filterChips.length > 0) {
    filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        
        const filterVal = chip.getAttribute('data-filter');
        const cards = document.querySelectorAll('#experiencias-list .exp-card');
        
        cards.forEach(card => {
          const cat = card.getAttribute('data-category');
          if (filterVal === 'all' || cat === filterVal) {
            card.style.display = 'flex';
            gsap.fromTo(card, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4 });
          } else {
            card.style.display = 'none';
          }
        });
        
        ScrollTrigger.refresh();
      });
    });
  }
});

// ── 6. OMITIR PAGO Y PROCEDER POR WHATSAPP ─────────────────
window.cancelarPago = function() {
  if (!confirm("¿Deseas cancelar el pago en línea y coordinar el pago directo en efectivo o transferencia por WhatsApp?")) return;
  
  const name = document.getElementById('lead-name').value.trim();
  const email = document.getElementById('lead-email').value.trim();
  const phone = document.getElementById('lead-phone').value.trim();
  const city = document.getElementById('lead-city').value.trim();
  const country = document.getElementById('lead-country').value.trim();
  const tripType = document.getElementById('lead-trip-type').value;
  const guests = parseInt(document.getElementById('lead-guests').value) || 2;
  const dateVal = document.getElementById('lead-date').value;
  
  const expName = document.getElementById('lead-exp-name').value;
  const expPrice = parseFloat(document.getElementById('lead-exp-price').value) || 0;
  
  const total = expPrice * guests;
  
  let text = `🌿 *SOLICITUD DE RESERVA CON PAGO DIRECTO — RUTA ESCONDIDA*\n\n`;
  text += `👤 *Nombre:* ${name}\n`;
  text += `📧 *Email:* ${email}\n`;
  text += `📞 *WhatsApp:* ${phone}\n`;
  text += `📍 *Origen:* ${city}, ${country}\n`;
  text += `👥 *Viaje:* ${tripType} (${guests} personas)\n`;
  text += `📅 *Fecha:* ${dateVal}\n`;
  text += `🧭 *Experiencia:* *${expName}*\n`;
  text += `💵 *Monto:* $${total.toFixed(2)} (Pago directo en la finca)\n\n`;
  text += `💬 _Hola Diego, deseo confirmar esta reserva coordinando el pago contigo directamente. ¡Muchas gracias!_`;
  
  const encodedText = encodeURIComponent(text);
  const waUrl = `https://wa.me/593984480203?text=${encodedText}`;
  
  closeLeadModal();
  window.open(waUrl, '_blank');
};

// ── 7. LÓGICA DE PROGRAMA DE FIDELIZACIÓN (PUNTOS) ─────────
function acumularPuntosUsuario(puntos) {
  let current = parseInt(localStorage.getItem('ruta_points_balance'));
  if (isNaN(current)) current = 120; // Default para demostrar el programa activo
  
  current += puntos;
  localStorage.setItem('ruta_points_balance', current.toString());
  actualizarPuntosDisplay();
  
  // Alerta elástica de puntos acumulados
  alert(`✨ ¡Has acumulado +${puntos} Puntos Ruta! Tu nuevo saldo es de ${current} puntos.`);
}

function actualizarPuntosDisplay() {
  let current = parseInt(localStorage.getItem('ruta_points_balance'));
  if (isNaN(current)) {
    current = 120;
    localStorage.setItem('ruta_points_balance', '120');
  }
  const displayEl = document.getElementById('points-val');
  if (displayEl) displayEl.innerText = current.toString();
}


