document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // =========================================================================
    // 1. DATA MODELS & STATE (HYBRID CONNECTED TO LOCALSTORAGE)
    // =========================================================================
    
    // Core Local State
    const state = {
        currentRole: 'tourist', // tourist | vendor | admin
        language: 'es',
        cart: [],
        wallet: {
            available: 0.00,
            blocked: 150.00,
            ledger: []
        },
        crm: [],
        experiences: [
            {
                id: 'exp-1',
                bizId: 'restaurante',
                bizName: 'El Mirador de Alchipichí',
                title: 'Cosecha de Chirimoya Orgánica y Almuerzo de Campo',
                description: 'Aprende sobre la fruticultura tradicional andina, cosecha tus propias chirimoyas directo del árbol y disfruta de un almuerzo típico preparado con ingredientes cultivados en la finca.',
                price: 25.00,
                duration: '4 horas',
                capacity: 15,
                parroquia: 'Puéllaro',
                category: 'Tour',
                activity: 'Cosecha',
                difficulty: 'baja',
                languages: ['es', 'en'],
                accessibility: ['silla_ruedas'],
                includes: ['Guía local nativo', 'Degustación libre de frutas', 'Almuerzo tradicional', 'Caja de chirimoyas de 3kg'],
                recommendations: ['Ropa cómoda para caminar', 'Sombrero y protector solar', 'Repelente de insectos'],
                image: 'assets/img/puellaro_hero_humanized_1782405073692.jpg'
            },
            {
                id: 'exp-2',
                bizId: 'restaurante',
                bizName: 'El Mirador de Alchipichí',
                title: 'Tour de Cítricos y Caminata al Río en Perucho',
                description: 'Visita los huertos de mandarinas más antiguos de Perucho, descubre la historia de la iglesia tallada en madera y haz una caminata de baja dificultad hasta las pozas del río.',
                price: 15.00,
                duration: '3 horas',
                capacity: 20,
                parroquia: 'Perucho',
                category: 'Tour',
                activity: 'Gastronomía',
                difficulty: 'baja',
                languages: ['es', 'en', 'fr'],
                accessibility: [],
                includes: ['Recorrido guiado', 'Cosecha libre de mandarinas', 'Entrada al museo local', 'Almuerzo ligero'],
                recommendations: ['Calzado deportivo con buen agarre', 'Gorra', 'Botella de agua reutilizable'],
                image: 'assets/img/la_ruta_escondida_branding_1777073987461.png'
            },
            {
                id: 'exp-3',
                bizId: 'glamping',
                bizName: 'Glamping Andes Escondidos',
                title: 'Hospedaje de Altura y Mirador de Estrellas',
                description: 'Descansa en cabañas rústicas de lujo con vista al cañón de Chavezpamba. La noche incluye una fogata comunitaria y sesión de astronomía andina en nuestro mirador natural.',
                price: 55.00,
                duration: '1 noche',
                capacity: 8,
                parroquia: 'Chavezpamba',
                category: 'Hospedaje',
                activity: 'Camping',
                difficulty: 'baja',
                languages: ['es', 'en'],
                accessibility: ['silla_ruedas'],
                includes: ['Alojamiento privado', 'Desayuno de la casa', 'Fogata y malvaviscos', 'Charla astronómica'],
                recommendations: ['Abrigo térmico grueso', 'Cámara fotográfica', 'Zapatos cómodos'],
                image: 'assets/img/metodologia_3v_infographic_1777073964755.png'
            },
            {
                id: 'exp-4',
                bizId: 'hosteria_sol_minas',
                bizName: 'Hostería Sol de Minas',
                title: 'Caminata Extrema al Cerro Fuya Fuya y Camping',
                description: 'Para los amantes del senderismo exigente. Asciende por el cerro andino, disfruta de vistas 360 y pernocta bajo las estrellas con equipamiento profesional provisto.',
                price: 45.00,
                duration: '2 días / 1 noche',
                capacity: 10,
                parroquia: 'San José de Minas',
                category: 'Tour',
                activity: 'Caminata',
                difficulty: 'alta',
                languages: ['es', 'en', 'de'],
                accessibility: [],
                includes: ['Equipo de camping profesional', 'Alimentación completa (3 comidas)', 'Guía certificado ASEGUIM', 'Seguro de aventura'],
                image: 'assets/img/hosteria_minas.png'
            },
            {
                id: 'exp-5',
                bizId: 'artesanias',
                bizName: 'Taller Cerámico Casa Alchipichí',
                title: 'Taller de Pan de Leña y Menú Campestre',
                description: 'Aprende a preparar el tradicional pan de leche en horno de leña con las abuelas de la parroquia Atahualpa, seguido de un almuerzo gourmet con trucha de río.',
                price: 18.00,
                duration: '3.5 horas',
                capacity: 12,
                parroquia: 'Atahualpa',
                category: 'Restaurante',
                activity: 'Gastronomía',
                difficulty: 'baja',
                languages: ['es'],
                accessibility: ['silla_ruedas'],
                includes: ['Ingredientes para taller', 'Degustación de panes recién horneados', 'Almuerzo completo', 'Recetario digital'],
                recommendations: ['Mandil de cocina (opcional)', 'Cabello recogido', 'Apetito amplio'],
                image: 'assets/img/puellaro_hero_humanized_1782405073697.jpg'
            },
            {
                id: 'exp-6',
                bizId: 'artesanias',
                bizName: 'Taller Cerámico Casa Alchipichí',
                title: 'Taller Vivencial de Tejido en Cabuya',
                description: 'Conoce el ciclo del penco andino y elabora tu propio bolso o artesanía de cabuya guiado por maestras artesanas de Chavezpamba.',
                price: 12.00,
                duration: '2 horas',
                capacity: 8,
                parroquia: 'Chavezpamba',
                category: 'Artesanía',
                activity: 'Artesanía',
                difficulty: 'baja',
                languages: ['es', 'en', 'fr'],
                accessibility: ['silla_ruedas'],
                includes: ['Fibras y herramientas de trabajo', 'Pieza elaborada para llevar', 'Café de haba con humita'],
                recommendations: ['Ropa que se pueda ensuciar', 'Ganas de aprender'],
                image: 'assets/img/artesanias_alchipichi.png'
            }
        ]
    };

    // Parishes details for Interactive Map info
    const parishData = {
        'Puéllaro': {
            desc: 'Conocida como el "Jardín Frutal de Pichincha". Famosa por sus cultivos de chirimoya, aguacate, limones y por la majestuosa Iglesia Matriz construida en adobe.',
            vendors: 15,
            tours: 6
        },
        'Perucho': {
            desc: 'La parroquia más histórica de la ruta. Alberga la iglesia de madera tallada más antigua de la zona norcentral y destaca por su producción de mandarinas y licores.',
            vendors: 12,
            tours: 4
        },
        'Chavezpamba': {
            desc: 'El balcón mirador de la ruta. Rodeada de colinas andinas que se prestan para la observación paisajística, caminatas y talleres de artesanía en fibras naturales.',
            vendors: 8,
            tours: 3
        },
        'Atahualpa': {
            desc: 'Rodeada de bosques húmedos y cascadas. Destaca por su agricultura florícola, truchicultura de río y la tranquilidad de sus senderos boscosos.',
            vendors: 10,
            tours: 5
        },
        'San José de Minas': {
            desc: 'La parroquia más extensa. Famosa por sus leyendas, su templo gótico-andino hecho de piedra de mina, senderos de alta montaña y el dulce licor de caña.',
            vendors: 18,
            tours: 7
        }
    };

    // Sync state collections from real localStorage on boot
    syncStateFromLocalStorage();

    function syncStateFromLocalStorage() {
        // 1. Sync CRM
        const storedLeads = localStorage.getItem('ruta_escondida_crm_leads');
        if (storedLeads) {
            state.crm = JSON.parse(storedLeads).map(l => ({
                id: l.id,
                name: l.name,
                phone: l.phone,
                email: l.email,
                interest: l.interest_topic || 'Planificación de viaje',
                spent: 125.00, // mock base value
                bookings: 1,
                interaction: 'caliente',
                status: 'Activo'
            }));
        } else {
            state.crm = [
                { id: 'CRM-101', name: 'Galo Cárdenas', phone: '+593 98 432 9010', email: 'g.cardenas@out.com', interest: 'Aventura en Minas', spent: 185.00, bookings: 3, interaction: 'caliente', status: 'Activo' },
                { id: 'CRM-102', name: 'Sophie Dubois', phone: '+33 6 12 34 56 78', email: 'sophie.d@traveler.fr', interest: 'Cosecha de Chirimoya', spent: 85.00, bookings: 1, interaction: 'tibio', status: 'Interesado' }
            ];
        }

        // 2. Sync Wallet based on active business session
        const activeBiz = getActiveBusinessSession();
        if (activeBiz) {
            const bookings = activeBiz.bookings || [];
            let available = 0;
            const ledger = [];
            bookings.forEach(b => {
                available += b.net || 0;
                ledger.push({
                    id: b.id,
                    date: new Date(b.timestamp || Date.now()).toISOString().split('T')[0],
                    desc: `Abono Reserva - ${b.service}`,
                    amount: b.net || 0,
                    type: 'credito_reserva'
                });
            });
            state.wallet.available = available;
            state.wallet.ledger = ledger;
        } else {
            state.wallet.available = 1234.80;
            state.wallet.ledger = [
                { id: 'TX-8912', date: '2026-06-25', desc: 'Abono Reserva #A8FD41', amount: 48.50, type: 'credito_reserva' },
                { id: 'TX-8910', date: '2026-06-23', desc: 'Retiro Procesado', amount: -350.00, type: 'debito_retiro' }
            ];
        }
    }

    function getActiveBusinessSession() {
        const savedSession = sessionStorage.getItem('active_biz_session');
        if (savedSession) {
            const tempBiz = JSON.parse(savedSession);
            const storedBizs = localStorage.getItem('ruta_escondida_negocios');
            if (storedBizs) {
                const bizList = JSON.parse(storedBizs);
                return bizList.find(b => b.id === tempBiz.id) || tempBiz;
            }
            return tempBiz;
        }
        return null;
    }

    // =========================================================================
    // 2. DOM ELEMENTS
    // =========================================================================
    
    // Role tabs
    const roleBtns = document.querySelectorAll('.role-btn');
    const roleViews = document.querySelectorAll('.role-view');
    const navLinksTourist = document.querySelector('.nav-links.tourist-only') || document.querySelector('.nav-links');
    const touristOnlyElements = document.querySelectorAll('.tourist-only');

    // Marketplace Search & Filter Elements
    const searchDest = document.getElementById('search-destination');
    const searchAct = document.getElementById('search-activity');
    const searchCat = document.getElementById('search-category');
    const searchPrice = document.getElementById('search-price');
    const priceValDisplay = document.getElementById('price-val');
    const searchDiff = document.getElementById('search-difficulty');
    const searchAccess = document.getElementById('search-accessibility');
    const searchLang = document.getElementById('search-language');
    const mainSearchTrigger = document.getElementById('main-search-trigger');
    const advancedToggle = document.getElementById('advanced-toggle');
    const advancedPanel = document.getElementById('advanced-panel');
    const categoryIconCards = document.querySelectorAll('.category-icon-card');
    const experiencesContainer = document.getElementById('experiences-container');
    const searchStatusBar = document.getElementById('search-status');
    const clearFiltersBtn = document.getElementById('clear-filters');

    // SVG Map Elements
    const mapRegions = document.querySelectorAll('.map-region');
    const mapEmptyState = document.querySelector('.map-empty-state');
    const mapRealContent = document.getElementById('map-real-content');
    const mapDetailBadge = document.getElementById('map-detail-badge');
    const mapDetailTitle = document.getElementById('map-detail-title');
    const mapDetailDesc = document.getElementById('map-detail-desc');
    const mapStatVendors = document.getElementById('map-stat-vendors');
    const mapStatTours = document.getElementById('map-stat-tours');
    const mapFilterBtn = document.getElementById('map-filter-btn');

    // Cart Elements
    const cartToggle = document.getElementById('cart-toggle');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartBackdrop = document.getElementById('cart-backdrop');
    const closeCart = document.getElementById('close-cart');
    const cartItemsList = document.getElementById('cart-items-list');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartTax = document.getElementById('cart-tax');
    const cartTotal = document.getElementById('cart-total');
    const cartCommissionInfo = document.getElementById('cart-commission-info');
    const cartCountBadge = document.getElementById('cart-count');
    const btnCheckout = document.getElementById('btn-checkout');

    // Checkout Modal Elements
    const checkoutModal = document.getElementById('checkout-modal');
    const closeCheckoutModal = document.getElementById('close-checkout-modal');
    const payOptions = document.querySelectorAll('.pay-opt');
    const checkoutSplitPreview = document.getElementById('checkout-split-preview');
    const btnCompletePayment = document.getElementById('btn-complete-payment');

    // Experience Detail Modal Elements
    const experienceDetailModal = document.getElementById('experience-detail-modal');
    const closeDetailModal = document.getElementById('close-detail-modal');
    const detailModalTitle = document.getElementById('detail-modal-title');
    const detailModalImg = document.getElementById('detail-modal-img');
    const detailModalParroquia = document.getElementById('detail-modal-parroquia');
    const detailModalDuration = document.getElementById('detail-modal-duration');
    const detailModalDifficulty = document.getElementById('detail-modal-difficulty');
    const detailModalBizName = document.getElementById('detail-modal-biz-name');
    const detailModalDesc = document.getElementById('detail-modal-desc');
    const detailModalIncludes = document.getElementById('detail-modal-includes');
    const detailModalRecommendations = document.getElementById('detail-modal-recommendations');
    const detailModalPrice = document.getElementById('detail-modal-price');
    const bookingQtySelect = document.getElementById('booking-qty-select');
    const btnAddToCartFromModal = document.getElementById('btn-add-to-cart-from-modal');
    let activeDetailExperienceId = null;

    // AI Chat Elements
    const aiBubble = document.getElementById('ai-chat-bubble-toggle');
    const aiSidebar = document.getElementById('ai-chat-sidebar');
    const closeAi = document.getElementById('close-ai');
    const aiSendBtn = document.getElementById('ai-send-btn');
    const aiInput = document.getElementById('ai-chat-input');
    const aiMsgsContainer = document.getElementById('ai-chat-msgs-container');
    const aiSuggestBtns = document.querySelectorAll('.ai-suggest-btn');

    // Vendor Dashboard Elements
    const walletBalanceBox = document.getElementById('vendor-available-balance');
    const ledgerListContainer = document.getElementById('vendor-ledger');
    const btnRequestPayout = document.getElementById('btn-request-payout');
    const dragDropZone = document.getElementById('drag-drop-uploader');
    const uploadProgressBox = document.getElementById('upload-progress-box');
    const uploadProgressFill = document.getElementById('upload-progress-fill');
    const uploadProgressText = document.getElementById('upload-progress-text');
    const uploadedPreviewsContainer = document.getElementById('uploaded-previews-container');
    const btnCreateExperience = document.getElementById('btn-create-experience');
    const btnSaveProfile = document.getElementById('btn-save-profile');

    // Admin Panel Elements
    const crmTableBody = document.getElementById('crm-table-body');
    const crmSearchInput = document.getElementById('crm-search-input');
    const automationLogConsole = document.getElementById('automation-log-console');
    const autoCartCheckbox = document.getElementById('auto-cart');
    const autoTripCheckbox = document.getElementById('auto-trip');
    const autoFeedbackCheckbox = document.getElementById('auto-feedback');
    const adminTotalSales = document.getElementById('admin-total-sales');
    const adminTotalCommissions = document.getElementById('admin-total-commissions');

    // General CTAs
    const btnCentralReservas = document.getElementById('btn-central-reservas');
    const btnQuoteEdu = document.getElementById('btn-quote-edu');

    // =========================================================================
    // 3. ROLE ROUTING & VIEW CONTROLLER
    // =========================================================================
    
    roleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const role = btn.getAttribute('data-role');
            switchRole(role);
        });
    });

    function switchRole(role) {
        state.currentRole = role;
        
        // Update tab buttons active classes
        roleBtns.forEach(b => {
            if (b.getAttribute('data-role') === role) {
                b.classList.add('active');
            } else {
                b.classList.remove('active');
            }
        });

        // Hide all views, then show current role's view
        roleViews.forEach(v => {
            if (v.id === `${role}-view`) {
                v.classList.remove('hidden');
            } else {
                v.classList.add('hidden');
            }
        });

        // Toggle navigation links visible to the role
        if (role === 'tourist') {
            if (navLinksTourist) navLinksTourist.classList.remove('hidden');
            touristOnlyElements.forEach(el => el.classList.remove('hidden'));
        } else if (role === 'vendor') {
            if (navLinksTourist) navLinksTourist.classList.add('hidden');
            touristOnlyElements.forEach(el => el.classList.add('hidden'));
            
            // Seed active business session if empty
            const activeBiz = getActiveBusinessSession();
            if (!activeBiz) {
                const storedBiz = localStorage.getItem('ruta_escondida_negocios');
                if (storedBiz) {
                    const list = JSON.parse(storedBiz);
                    if (list.length > 0) {
                        sessionStorage.setItem('active_biz_session', JSON.stringify(list[0]));
                    }
                }
            }
            
            syncStateFromLocalStorage();
            renderVendorLedger();
            loadProfileFieldsInSimulator();
        } else if (role === 'admin') {
            if (navLinksTourist) navLinksTourist.classList.add('hidden');
            touristOnlyElements.forEach(el => el.classList.add('hidden'));
            
            syncStateFromLocalStorage();
            renderCrmTable();
            calculateAdminMetrics();
            addAutomationLog('Operador', 'Inicio de sesión en panel de control general');
        }

        // Recreate Lucide Icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    function loadProfileFieldsInSimulator() {
        const biz = getActiveBusinessSession();
        if (biz) {
            document.getElementById('edit-biz-name').value = biz.name || '';
            document.getElementById('edit-biz-category').value = biz.category === 'gastronomia' ? 'Restaurante' : (biz.category === 'artesanias' ? 'Finca' : 'Hospedaje');
            document.getElementById('edit-biz-parish').value = biz.parish || 'Puéllaro';
            document.getElementById('edit-biz-history').value = biz.description || '';
        }
    }

    function calculateAdminMetrics() {
        const storedReservations = localStorage.getItem('ruta_escondida_reservas');
        if (storedReservations) {
            const list = JSON.parse(storedReservations);
            let totalSales = 0;
            let totalCommission = 0;
            list.forEach(b => {
                totalSales += b.total || 0;
                totalCommission += b.commission || 0;
            });
            if (adminTotalSales) adminTotalSales.textContent = `$${totalSales.toFixed(2)}`;
            if (adminTotalCommissions) adminTotalCommissions.textContent = `$${totalCommission.toFixed(2)}`;
        }
    }

    // =========================================================================
    // 4. MARKETPLACE FILTER & SEARCH LÓGICA
    // =========================================================================
    
    let activeFilters = {
        destination: '',
        activity: '',
        category: '',
        maxPrice: 150,
        difficulty: '',
        accessibility: '',
        language: ''
    };

    // Toggle advanced filters panel
    if (advancedToggle) {
        advancedToggle.addEventListener('click', () => {
            advancedPanel.classList.toggle('hidden');
        });
    }

    // Update range input visual value
    if (searchPrice) {
        searchPrice.addEventListener('input', () => {
            priceValDisplay.textContent = searchPrice.value;
            activeFilters.maxPrice = parseFloat(searchPrice.value);
        });
    }

    // Main Search Buttons click
    if (mainSearchTrigger) {
        mainSearchTrigger.addEventListener('click', () => {
            activeFilters.destination = searchDest.value;
            activeFilters.activity = searchAct.value;
            activeFilters.category = searchCat.value;
            activeFilters.difficulty = searchDiff.value;
            activeFilters.accessibility = searchAccess.value;
            activeFilters.language = searchLang.value;
            
            applyFilters();
        });
    }

    // Top Category icons selector click
    categoryIconCards.forEach(card => {
        card.addEventListener('click', () => {
            categoryIconCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            
            const cat = card.getAttribute('data-cat');
            activeFilters.category = cat;
            if (searchCat) searchCat.value = cat; // Sync selection
            applyFilters();
        });
    });

    // Apply filters and re-render catalog
    function applyFilters() {
        const filtered = state.experiences.filter(exp => {
            // 1. Destination (Parroquia)
            if (activeFilters.destination && exp.parroquia !== activeFilters.destination) return false;
            // 2. Activity
            if (activeFilters.activity && exp.activity !== activeFilters.activity) return false;
            // 3. Category
            if (activeFilters.category && exp.category !== activeFilters.category) return false;
            // 4. Max Price
            if (exp.price > activeFilters.maxPrice) return false;
            // 5. Difficulty
            if (activeFilters.difficulty && exp.difficulty !== activeFilters.difficulty) return false;
            // 6. Accessibility
            if (activeFilters.accessibility && !exp.accessibility.includes(activeFilters.accessibility)) return false;
            // 7. Language
            if (activeFilters.language && !exp.languages.includes(activeFilters.language)) return false;
            
            return true;
        });

        // Toggle search status badge
        const hasActiveFilters = Object.values(activeFilters).some(v => v !== '' && v !== 150);
        if (searchStatusBar) {
            if (hasActiveFilters) {
                searchStatusBar.style.display = 'flex';
            } else {
                searchStatusBar.style.display = 'none';
            }
        }

        renderExperiences(filtered);
    }

    // Reset filters
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', () => {
            activeFilters = {
                destination: '',
                activity: '',
                category: '',
                maxPrice: 150,
                difficulty: '',
                accessibility: '',
                language: ''
            };
            
            if (searchDest) searchDest.value = '';
            if (searchAct) searchAct.value = '';
            if (searchCat) searchCat.value = '';
            if (searchPrice) {
                searchPrice.value = 150;
                priceValDisplay.textContent = 150;
            }
            if (searchDiff) searchDiff.value = '';
            if (searchAccess) searchAccess.value = '';
            if (searchLang) searchLang.value = '';
            
            categoryIconCards.forEach(c => c.classList.remove('active'));
            categoryIconCards[0].classList.add('active'); // Todo
    
            applyFilters();
        });
    }

    // Render experiences catalog
    function renderExperiences(list) {
        if (!experiencesContainer) return;
        experiencesContainer.innerHTML = '';
        
        if (list.length === 0) {
            experiencesContainer.innerHTML = `
                <div class="map-empty-state" style="grid-column: 1 / -1; padding: 60px 0;">
                    <i data-lucide="frown" style="width: 48px; height: 48px; color: var(--border);"></i>
                    <h4 style="margin-top: 15px;">No se encontraron resultados</h4>
                    <p>Prueba limpiando los filtros de búsqueda o buscando en otra parroquia.</p>
                </div>
            `;
            if (typeof lucide !== 'undefined') lucide.createIcons();
            return;
        }

        list.forEach(exp => {
            const card = document.createElement('div');
            card.className = 'experience-card';
            card.innerHTML = `
                <div class="exp-img-box">
                    <img class="exp-img" src="${exp.image}" alt="${exp.title}" onerror="this.src='assets/img/logo.png'">
                    <span class="exp-parroquia-badge"><i data-lucide="map-pin" style="width:10px;height:10px;display:inline-block;margin-right:2px;"></i> ${exp.parroquia}</span>
                    <span class="exp-price-badge">$${exp.price}<span>/pers</span></span>
                </div>
                <div class="exp-body">
                    <span class="exp-biz">${exp.bizName}</span>
                    <h3>${exp.title}</h3>
                    <p>${exp.description}</p>
                    <div class="exp-meta">
                        <span><i data-lucide="clock"></i> ${exp.duration}</span>
                        <span><i data-lucide="users"></i> Máx ${exp.capacity}</span>
                        <span><i data-lucide="bar-chart-2"></i> ${exp.difficulty.charAt(0).toUpperCase() + exp.difficulty.slice(1)}</span>
                    </div>
                </div>
            `;
            
            // Clicking card opens Detail Modal
            card.addEventListener('click', () => {
                openExperienceDetail(exp.id);
            });

            experiencesContainer.appendChild(card);
        });

        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    // =========================================================================
    // 5. INTERACTIVE SVG MAP EVENTS
    // =========================================================================
    
    let mapSelectedParroquia = '';

    mapRegions.forEach(region => {
        region.addEventListener('click', () => {
            const name = region.getAttribute('data-name');
            selectMapParroquia(name);
        });
    });

    function selectMapParroquia(name) {
        // Toggle class on SVG elements
        mapRegions.forEach(r => {
            if (r.getAttribute('data-name') === name) {
                r.classList.add('selected');
            } else {
                r.classList.remove('selected');
            }
        });

        mapSelectedParroquia = name;
        const info = parishData[name];

        if (info && mapEmptyState && mapRealContent) {
            mapEmptyState.classList.add('hidden');
            mapRealContent.classList.remove('hidden');
            
            mapDetailBadge.textContent = 'Parroquia';
            mapDetailTitle.textContent = name;
            mapDetailDesc.textContent = info.desc;
            mapStatVendors.textContent = info.vendors;
            mapStatTours.textContent = info.tours;
        }
    }

    // Filter button inside map details
    if (mapFilterBtn) {
        mapFilterBtn.addEventListener('click', () => {
            if (mapSelectedParroquia) {
                activeFilters.destination = mapSelectedParroquia;
                if (searchDest) searchDest.value = mapSelectedParroquia; // Sync select input
                applyFilters();
                
                // Scroll to experiences catalog
                const catHeader = document.getElementById('experiencias');
                if (catHeader) {
                    window.scrollTo({
                        top: catHeader.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }

    // Clicking Destinations Cards filters too
    const clickDests = document.querySelectorAll('.clickable-dest');
    clickDests.forEach(card => {
        card.addEventListener('click', () => {
            const p = card.getAttribute('data-parroquia');
            activeFilters.destination = p;
            if (searchDest) searchDest.value = p;
            applyFilters();
            
            // Scroll down
            const catHeader = document.getElementById('experiencias');
            if (catHeader) {
                window.scrollTo({
                    top: catHeader.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // =========================================================================
    // 6. DETAIL MODAL & BOOKING LOGIC
    // =========================================================================
    
    function openExperienceDetail(id) {
        const exp = state.experiences.find(e => e.id === id);
        if (!exp) return;

        activeDetailExperienceId = id;
        detailModalTitle.textContent = exp.title;
        detailModalImg.src = exp.image;
        detailModalBizName.textContent = exp.bizName;
        detailModalDesc.textContent = exp.description;
        
        detailModalParroquia.innerHTML = `<i data-lucide="map-pin"></i> ${exp.parroquia}`;
        detailModalDuration.innerHTML = `<i data-lucide="clock"></i> ${exp.duration}`;
        detailModalDifficulty.innerHTML = `<i data-lucide="bar-chart-2"></i> Dificultad ${exp.difficulty.charAt(0).toUpperCase() + exp.difficulty.slice(1)}`;
        detailModalPrice.textContent = `$${exp.price.toFixed(2)}`;

        // List includes
        detailModalIncludes.innerHTML = '';
        exp.includes.forEach(inc => {
            const li = document.createElement('li');
            li.textContent = inc;
            detailModalIncludes.appendChild(li);
        });

        // List recommendations
        detailModalRecommendations.innerHTML = '';
        if (exp.recommendations) {
            exp.recommendations.forEach(rec => {
                const li = document.createElement('li');
                li.textContent = rec;
                detailModalRecommendations.appendChild(li);
            });
        }

        if (bookingQtySelect) bookingQtySelect.value = "2"; // Default quantity select

        if (experienceDetailModal) {
            experienceDetailModal.classList.remove('hidden');
        }
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    if (closeDetailModal) {
        closeDetailModal.addEventListener('click', () => {
            experienceDetailModal.classList.add('hidden');
            activeDetailExperienceId = null;
        });
    }

    // Add to cart from modal
    if (btnAddToCartFromModal) {
        btnAddToCartFromModal.addEventListener('click', () => {
            if (!activeDetailExperienceId) return;
            
            const qty = parseInt(bookingQtySelect.value);
            addToCart(activeDetailExperienceId, qty);
            experienceDetailModal.classList.add('hidden');
            activeDetailExperienceId = null;
    
            // Open cart to show item added
            openCartSidebar();
        });
    }

    // =========================================================================
    // 7. CART STATE & SYSTEM (SPLIT COMMISSIONS)
    // =========================================================================
    
    if (cartToggle) cartToggle.addEventListener('click', openCartSidebar);
    if (closeCart) closeCart.addEventListener('click', closeCartSidebar);
    if (cartBackdrop) cartBackdrop.addEventListener('click', closeCartSidebar);

    function openCartSidebar() {
        if (cartSidebar) cartSidebar.classList.add('open');
        if (cartBackdrop) cartBackdrop.classList.add('open');
        renderCart();
    }

    function closeCartSidebar() {
        if (cartSidebar) cartSidebar.classList.remove('open');
        if (cartBackdrop) cartBackdrop.classList.remove('open');
    }

    function addToCart(experienceId, quantity) {
        const exp = state.experiences.find(e => e.id === experienceId);
        if (!exp) return;

        // Check if item already exists
        const existing = state.cart.find(c => c.experience.id === experienceId);
        if (existing) {
            existing.qty += quantity;
        } else {
            state.cart.push({
                experience: exp,
                qty: quantity
            });
        }
        
        updateCartBadge();
    }

    function updateCartBadge() {
        const totalItems = state.cart.reduce((sum, item) => sum + item.qty, 0);
        if (cartCountBadge) cartCountBadge.textContent = totalItems;
    }

    function renderCart() {
        if (!cartItemsList) return;
        cartItemsList.innerHTML = '';
        
        if (state.cart.length === 0) {
            cartItemsList.innerHTML = `
                <div class="cart-empty-msg" style="text-align:center; padding: 48px 24px; color: var(--text-muted);">
                    <i data-lucide="shopping-bag" style="width:48px; height:48px; margin-bottom:12px;"></i>
                    <p>Tu carrito de compras está vacío.</p>
                </div>
            `;
            if (cartSubtotal) cartSubtotal.textContent = '$0.00';
            if (cartTax) cartTax.textContent = '$0.00';
            if (cartTotal) cartTotal.textContent = '$0.00';
            if (cartCommissionInfo) cartCommissionInfo.innerHTML = '';
            if (btnCheckout) btnCheckout.disabled = true;
            if (typeof lucide !== 'undefined') lucide.createIcons();
            return;
        }

        let subtotal = 0;

        state.cart.forEach((item, index) => {
            const itemCost = item.experience.price * item.qty;
            subtotal += itemCost;

            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.experience.title}</h4>
                    <span>Cant: ${item.qty} personas • ${item.experience.parroquia}</span>
                    <span>Emprendimiento: ${item.experience.bizName}</span>
                    <button class="cart-item-remove" data-index="${index}" style="margin-top:6px; color:#c0392b; font-size:11px; cursor:pointer;"><i data-lucide="trash-2" style="width:10px;height:10px;display:inline-block;margin-right:2px;"></i> Eliminar</button>
                </div>
                <div class="cart-item-price" style="font-weight:600;">
                    $${itemCost.toFixed(2)}
                </div>
            `;
            cartItemsList.appendChild(div);
        });

        const taxRate = 0.15; // 15% IVA Ecuador
        const tax = subtotal * taxRate;
        const total = subtotal + tax;
        
        // 10% commission on the subtotal (excl. IVA)
        const platformCommission = subtotal * 0.10;
        const netVendorPay = total - platformCommission;

        if (cartSubtotal) cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
        if (cartTax) cartTax.textContent = `$${tax.toFixed(2)}`;
        if (cartTotal) cartTotal.textContent = `$${total.toFixed(2)}`;
        
        // Commission Split visual calculation
        if (cartCommissionInfo) {
            cartCommissionInfo.innerHTML = `
                <strong>Modelo de Split en Tiempo Real:</strong><br>
                • Comisiones Ruta Escondida (10%): $${platformCommission.toFixed(2)}<br>
                • Saldo Emprendedores: $${netVendorPay.toFixed(2)} (Incluye IVA)
            `;
        }

        if (btnCheckout) btnCheckout.disabled = false;

        // Add event listeners to delete buttons
        document.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(btn.getAttribute('data-index'));
                state.cart.splice(idx, 1);
                updateCartBadge();
                renderCart();
            });
        });

        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    // =========================================================================
    // 8. CHECKOUT & REAL SPLIT PAYMENTS LOGGING
    // =========================================================================
    
    if (btnCheckout) {
        btnCheckout.addEventListener('click', () => {
            closeCartSidebar();
            openCheckoutModal();
        });
    }

    if (closeCheckoutModal) {
        closeCheckoutModal.addEventListener('click', () => {
            checkoutModal.classList.add('hidden');
        });
    }

    function openCheckoutModal() {
        if (!checkoutSplitPreview) return;
        checkoutSplitPreview.innerHTML = '';
        
        let subtotal = 0;
        state.cart.forEach(item => {
            subtotal += item.experience.price * item.qty;
        });
        const tax = subtotal * 0.15;
        const total = subtotal + tax;
        const platformFee = subtotal * 0.10;

        // Render Split Ledgers visually
        // 1. Platform cut
        const platformLedger = document.createElement('div');
        platformLedger.className = 'split-ledger-item';
        platformLedger.innerHTML = `
            <h5>1. Comisión Ruta Escondida</h5>
            <div class="split-amount" style="font-size:24px; color:#C8A96A; font-weight:700; margin: 4px 0;">$${platformFee.toFixed(2)}</div>
            <div class="split-dest" style="font-size:11px; color:#888;">Destino: Wallet Operaciones y Fondos Comunitarios</div>
        `;
        checkoutSplitPreview.appendChild(platformLedger);

        // 2. Breakdown per vendor in cart
        const vendorGroups = {};
        state.cart.forEach(item => {
            const biz = item.experience.bizName;
            const bizId = item.experience.bizId || 'general';
            const price = item.experience.price * item.qty;
            if (!vendorGroups[bizId]) {
                vendorGroups[bizId] = { name: biz, price: 0 };
            }
            vendorGroups[bizId].price += price;
        });

        let index = 2;
        for (const [bizId, data] of Object.entries(vendorGroups)) {
            const val = data.price;
            const itemTax = val * 0.15;
            const itemTotal = val + itemTax;
            const itemCommission = val * 0.10;
            const itemNet = itemTotal - itemCommission;

            const vendorLedger = document.createElement('div');
            vendorLedger.className = 'split-ledger-item';
            vendorLedger.innerHTML = `
                <h5>${index}. Payout Emprendimiento</h5>
                <div class="split-amount" style="font-size:24px; color:#2ecc71; font-weight:700; margin: 4px 0;">$${itemNet.toFixed(2)}</div>
                <div class="split-dest" style="font-size:11px; color:#888;">Negocio: ${data.name} (ID: ${bizId})</div>
            `;
            checkoutSplitPreview.appendChild(vendorLedger);
            index++;
        }

        checkoutModal.classList.remove('hidden');
    }

    // Payment Gateway select
    payOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            payOptions.forEach(o => o.classList.remove('active'));
            opt.classList.add('active');
        });
    });

    // Complete Checkout & trigger database/state side effects (Split, CRM, Wallet)
    if (btnCompletePayment) {
        btnCompletePayment.addEventListener('click', () => {
            btnCompletePayment.disabled = true;
            btnCompletePayment.textContent = 'Procesando Split de Transacción...';
    
            setTimeout(() => {
                let subtotal = 0;
                state.cart.forEach(item => {
                    subtotal += item.experience.price * item.qty;
                });
                const tax = subtotal * 0.15;
                const total = subtotal + tax;
                const platformFee = subtotal * 0.10;
                
                const clientName = document.getElementById('pay-name').value || 'Cliente Web';
                const clientPhone = "+593984480203"; // standard
                
                // Group by vendor and make real local storage abonos
                const storedBizList = localStorage.getItem('ruta_escondida_negocios');
                let bizList = storedBizList ? JSON.parse(storedBizList) : [];
                
                const storedBookingsList = localStorage.getItem('ruta_escondida_reservas');
                const bookingsList = storedBookingsList ? JSON.parse(storedBookingsList) : [];
                
                const bookingId = "res_" + Date.now();
                const timestamp = new Date().toISOString();
                
                state.cart.forEach(item => {
                    const itemCost = item.experience.price * item.qty;
                    const itemTax = itemCost * 0.15;
                    const itemTotal = itemCost + itemTax;
                    const itemComm = itemCost * 0.10;
                    const itemNet = itemTotal - itemComm;
                    const bizId = item.experience.bizId || 'general';
                    
                    const bookingData = {
                        id: bookingId,
                        bizId: bizId,
                        service: item.experience.title,
                        clientName: clientName,
                        clientPhone: clientPhone,
                        guests: item.qty,
                        total: itemTotal,
                        commission: itemComm,
                        net: itemNet,
                        status: "pagado",
                        timestamp: timestamp
                    };
                    
                    bookingsList.push(bookingData);
                    
                    // Credit to the merchant in list
                    let bizObj = bizList.find(b => b.id === bizId);
                    if (bizObj) {
                        if (!bizObj.bookings) bizObj.bookings = [];
                        bizObj.bookings.push(bookingData);
                        
                        bizList = bizList.filter(b => b.id !== bizId);
                        bizList.push(bizObj);
                    }
                });
                
                // Save updated bookings and business lists in localstorage
                localStorage.setItem('ruta_escondida_reservas', JSON.stringify(bookingsList));
                localStorage.setItem('ruta_escondida_negocios', JSON.stringify(bizList));
                
                // Register CRM lead in ruta_escondida_crm_leads
                const storedLeadsList = localStorage.getItem('ruta_escondida_crm_leads');
                const leadsList = storedLeadsList ? JSON.parse(storedLeadsList) : [];
                
                const leadData = {
                    id: "lead_" + Date.now(),
                    name: clientName,
                    email: `${clientName.toLowerCase().replace(/\s+/g, '.')}@correo.com`,
                    phone: clientPhone,
                    city: "Quito",
                    country: "Ecuador",
                    trip_type: "Familia",
                    interest_topic: `Reserva Simulator: ${state.cart[0].experience.title}`,
                    timestamp: timestamp
                };
                leadsList.push(leadData);
                localStorage.setItem('ruta_escondida_crm_leads', JSON.stringify(leadsList));
                
                // Fidelity points
                const earnedPoints = Math.round(total);
                let currentPoints = parseInt(localStorage.getItem('ruta_escondida_user_points')) || 0;
                currentPoints += earnedPoints;
                localStorage.setItem('ruta_escondida_user_points', currentPoints);
                
                // Update UI variables
                if (typeof updateFidelityDisplay === 'function') {
                    updateFidelityDisplay();
                }
    
                // Trigger Webhook Automations & log them on the admin console
                if (autoCartCheckbox && autoCartCheckbox.checked) {
                    addAutomationLog('Carrito', `Recuperador apagado: Carrito de ${clientName} pagado con éxito.`);
                }
                if (autoTripCheckbox && autoTripCheckbox.checked) {
                    addAutomationLog('WhatsApp', `Recordatorio programado enviado a ${clientName} (${clientPhone})`);
                }
                addAutomationLog('Facturación', `Envío de factura fiscal split a ${clientName} e Impuestos (SRI).`);
    
                // Clear Cart
                state.cart = [];
                updateCartBadge();
                
                checkoutModal.classList.add('hidden');
                btnCompletePayment.disabled = false;
                btnCompletePayment.innerHTML = 'Pagar Reserva Ahora';
                
                // Sync simulation states
                syncStateFromLocalStorage();
                
                alert(`¡Reserva completada de forma segura!\n\nSe ha realizado el split de pago:\n- Comisión de plataforma (10%): $${platformFee.toFixed(2)} transferida a Ruta Escondida.\n- Saldo neto acreditado instantáneamente a la Wallet del emprendedor.\n\nNotificación de reserva registrada en LocalStorage.`);
                
                // Redirect if in Tourist mode to WhatsApp
                let text = `🌿 *CONFIRMACIÓN DE COMPRA SIMULADOR — RUTA ESCONDIDA*\n\n`;
                text += `🎫 *Reserva:* ${bookingId}\n`;
                text += `👤 *Cliente:* ${clientName}\n`;
                text += `🧭 *Tour:* *${leadData.interest_topic}*\n`;
                text += `💵 *Monto Total:* $${total.toFixed(2)} (Tarjeta de Crédito)\n\n`;
                text += `💬 _Hola Diego, acabo de pagar en el simulador de Ruta Escondida. ¿Me ayudan a confirmar los cupos en la finca?_`;
                
                const waUrl = `https://wa.me/593984480203?text=${encodeURIComponent(text)}`;
                window.open(waUrl, '_blank');
                
            }, 1500);
        });
    }

    // =========================================================================
    // 9. VENDOR OPERATIONS (LEDGER, UPLOAD DRAG & DROP, PROFILE SAVE)
    // =========================================================================
    
    function renderVendorLedger() {
        if (!ledgerListContainer) return;
        ledgerListContainer.innerHTML = '';
        
        // Update balance visual
        if (walletBalanceBox) {
            walletBalanceBox.textContent = `$${state.wallet.available.toFixed(2)}`;
        }

        if (state.wallet.ledger.length === 0) {
            ledgerListContainer.innerHTML = '<p style="color:#888; font-style:italic; font-size:12px; padding:12px 0;">No hay movimientos recientes.</p>';
            return;
        }

        state.wallet.ledger.forEach(tx => {
            const row = document.createElement('div');
            row.className = 'ledger-row';
            row.style.display = 'flex';
            row.style.justifyContent = 'space-between';
            row.style.padding = '10px 0';
            row.style.borderBottom = '1px solid var(--border)';
            
            const isPositive = tx.amount > 0;
            const amtClass = isPositive ? 'positive' : 'negative';
            const sign = isPositive ? '+' : '';
            const color = isPositive ? '#2ecc71' : '#e74c3c';

            row.innerHTML = `
                <div class="ledger-meta">
                    <strong style="display:block; font-size:13px;">${tx.desc}</strong>
                    <span style="font-size:10px; color:#888;">${tx.date} • ID: ${tx.id}</span>
                </div>
                <div class="ledger-amt ${amtClass}" style="font-weight:600; color:${color}; font-size:13px;">
                    ${sign}$${tx.amount.toFixed(2)}
                </div>
            `;
            ledgerListContainer.appendChild(row);
        });
    }

    // Request Payout
    if (btnRequestPayout) {
        btnRequestPayout.addEventListener('click', () => {
            if (state.wallet.available <= 10) {
                alert('Saldo insuficiente para retirar. Saldo mínimo: $10.00');
                return;
            }
            
            const activeBiz = getActiveBusinessSession();
            if (!activeBiz) return;
            
            const payoutVal = state.wallet.available;
            
            // Sweep bookings status locally
            const storedBizs = localStorage.getItem('ruta_escondida_negocios');
            if (storedBizs) {
                let list = JSON.parse(storedBizs);
                let bizObj = list.find(b => b.id === activeBiz.id);
                if (bizObj) {
                    bizObj.bookings = []; // empty after withdrawal
                    list = list.filter(b => b.id !== activeBiz.id);
                    list.push(bizObj);
                    localStorage.setItem('ruta_escondida_negocios', JSON.stringify(list));
                    sessionStorage.setItem('active_biz_session', JSON.stringify(bizObj));
                }
            }
            
            syncStateFromLocalStorage();
            renderVendorLedger();
            alert(`Retiro de $${payoutVal.toFixed(2)} solicitado.\nEl valor será transferido a su cuenta bancaria registrada en menos de 24 horas laborables.`);
        });
    }

    // Drag & Drop Upload Mocking
    if (dragDropZone) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dragDropZone.addEventListener(eventName, preventDefaults, false);
        });
    
        function preventDefaults (e) {
            e.preventDefault();
            e.stopPropagation();
        }
    
        dragDropZone.addEventListener('dragover', () => {
            dragDropZone.style.borderColor = 'var(--primary)';
            dragDropZone.style.backgroundColor = 'var(--primary-bg)';
        });
    
        dragDropZone.addEventListener('dragleave', () => {
            dragDropZone.style.borderColor = 'var(--border)';
            dragDropZone.style.backgroundColor = 'transparent';
        });
    
        dragDropZone.addEventListener('drop', (e) => {
            dragDropZone.style.borderColor = 'var(--border)';
            dragDropZone.style.backgroundColor = 'transparent';
            const dt = e.dataTransfer;
            const files = dt.files;
            handleFiles(files);
        });
    
        dragDropZone.addEventListener('click', () => {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            fileInput.multiple = true;
            fileInput.addEventListener('change', () => {
                handleFiles(fileInput.files);
            });
            fileInput.click();
        });
    }

    function handleFiles(files) {
        if (!files.length) return;

        uploadProgressBox.classList.remove('hidden');
        uploadProgressFill.style.width = '0%';
        uploadProgressText.textContent = 'Conectando con Supabase Storage...';

        let progress = 0;
        const interval = setInterval(() => {
            progress += 20;
            uploadProgressFill.style.width = `${progress}%`;
            
            if (progress === 20) {
                uploadProgressText.textContent = 'Reduciendo peso de imagen (Compresión 75%)...';
            } else if (progress === 60) {
                uploadProgressText.textContent = 'Convirtiendo formato a WebP (Velocidad de carga)...';
            } else if (progress === 80) {
                uploadProgressText.textContent = 'Optimizando SEO: Generando Alt Tags con Inteligencia Artificial...';
            } else if (progress === 100) {
                clearInterval(interval);
                uploadProgressBox.classList.add('hidden');
                
                // Add optimized preview
                const preview = document.createElement('div');
                preview.className = 'uploaded-img-wrapper';
                preview.style.width = '80px';
                preview.style.height = '80px';
                preview.style.position = 'relative';
                preview.style.borderRadius = '8px';
                preview.style.overflow = 'hidden';
                preview.innerHTML = `
                    <img src="assets/img/logo.png" style="width:100%; height:100%; object-fit:cover;" alt="Optimized">
                    <span class="img-badge" style="position:absolute; bottom:2px; right:2px; font-size:8px; background:rgba(0,0,0,0.7); color:#fff; padding:1px 3px; border-radius:4px;">WebP -82%</span>
                `;
                if (uploadedPreviewsContainer) {
                    uploadedPreviewsContainer.appendChild(preview);
                }
                alert('Foto subida y optimizada para buscadores web e inteligencias artificiales con éxito.');
            }
        }, 400);
    }

    // Profile updates in LocalStorage
    if (btnSaveProfile) {
        btnSaveProfile.addEventListener('click', () => {
            const activeBiz = getActiveBusinessSession();
            if (!activeBiz) return;
            
            const name = document.getElementById('edit-biz-name').value;
            const parish = document.getElementById('edit-biz-parish').value;
            const history = document.getElementById('edit-biz-history').value;
    
            // Update in localStorage
            const storedBizs = localStorage.getItem('ruta_escondida_negocios');
            if (storedBizs) {
                let list = JSON.parse(storedBizs);
                let bizObj = list.find(b => b.id === activeBiz.id);
                if (bizObj) {
                    bizObj.name = name;
                    bizObj.parish = parish;
                    bizObj.description = history;
                    
                    list = list.filter(b => b.id !== activeBiz.id);
                    list.push(bizObj);
                    
                    localStorage.setItem('ruta_escondida_negocios', JSON.stringify(list));
                    sessionStorage.setItem('active_biz_session', JSON.stringify(bizObj));
                    
                    // Reload directory listing on screen
                    if (typeof cargarNegocios === 'function') {
                        cargarNegocios();
                    }
                }
            }
            alert('Información del perfil actualizada y sincronizada en el buscador del Marketplace.');
        });
    }

    // Create custom experiences
    if (btnCreateExperience) {
        btnCreateExperience.addEventListener('click', () => {
            const title = document.getElementById('exp-title').value;
            const price = parseFloat(document.getElementById('exp-price').value);
            const duration = document.getElementById('exp-duration').value;
            const capacity = parseInt(document.getElementById('exp-capacity').value);
            const includesInput = document.getElementById('exp-includes').value;
            const recommendInput = document.getElementById('exp-recommend').value;
    
            if (!title || isNaN(price) || !duration) {
                alert('Por favor complete los campos obligatorios: Título, Precio y Duración.');
                return;
            }
            
            const activeBiz = getActiveBusinessSession() || { name: 'Mi Finca', id: 'general', parish: 'Puéllaro' };
    
            const newExp = {
                id: `exp-${Date.now()}`,
                bizId: activeBiz.id,
                bizName: activeBiz.name,
                title: title,
                description: `Experiencia exclusiva provista por ${activeBiz.name} en la parroquia de ${activeBiz.parish}.`,
                price: price,
                duration: duration,
                capacity: capacity || 10,
                parroquia: activeBiz.parish,
                category: 'Tour',
                activity: 'Caminata',
                difficulty: 'media',
                languages: ['es'],
                accessibility: [],
                includes: includesInput ? includesInput.split(',').map(s => s.trim()) : ['Guía local'],
                recommendations: recommendInput ? recommendInput.split(',').map(s => s.trim()) : ['Ropa cómoda'],
                image: 'assets/img/puellaro_hero_humanized_1782405073692.jpg'
            };
    
            state.experiences.push(newExp);
            applyFilters();
    
            document.getElementById('vendor-experience-form').reset();
            alert('¡Felicitaciones! Tu nueva experiencia ha sido aprobada automáticamente y ya está a la venta en el Marketplace.');
        });
    }

    // =========================================================================
    // 10. ADMIN CONSOLE OPERATIONS (CRM TABLE, AUTOMATION LOGS)
    // =========================================================================
    
    function renderCrmTable(query = '') {
        if (!crmTableBody) return;
        crmTableBody.innerHTML = '';
        
        const filteredCrm = state.crm.filter(client => {
            return client.name.toLowerCase().includes(query.toLowerCase()) || 
                   client.interest.toLowerCase().includes(query.toLowerCase());
        });

        if (filteredCrm.length === 0) {
            crmTableBody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:24px; color:#888;">No hay registros en el CRM.</td></tr>';
            return;
        }

        filteredCrm.forEach(client => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <strong>${client.name}</strong><br>
                    <span style="font-size:0.65rem;color:#888;">${client.email}</span>
                </td>
                <td>
                    <a href="https://wa.me/${client.phone.replace(/[^0-9]/g, '')}" target="_blank" style="color:#C8A96A; font-weight:600;"><i data-lucide="message-circle" style="width:12px;height:12px;display:inline-block;margin-right:2px;"></i> ${client.phone}</a>
                </td>
                <td>${client.interest}</td>
                <td><strong>$${client.spent.toFixed(2)}</strong></td>
                <td>${client.bookings}</td>
                <td><span class="crm-badge-interaction ${client.interaction}" style="font-size:9px; background:rgba(200,169,106,0.2); color:#C8A96A; padding:2px 6px; border-radius:10px;">${client.interaction}</span></td>
                <td><span style="font-weight:600; color:#2ecc71;">${client.status}</span></td>
            `;
            crmTableBody.appendChild(tr);
        });

        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    if (crmSearchInput) {
        crmSearchInput.addEventListener('input', () => {
            renderCrmTable(crmSearchInput.value);
        });
    }

    function addAutomationLog(category, message) {
        if (!automationLogConsole) return;
        const time = new Date().toLocaleTimeString();
        const row = document.createElement('div');
        row.className = 'log-row';
        row.style.fontSize = '11px';
        row.style.color = '#888';
        row.style.margin = '4px 0';
        row.innerHTML = `<span class="log-time" style="color:#C8A96A;">[${time}]</span> <span style="color:#FFF;">[${category.toUpperCase()}]</span> ${message}`;
        
        automationLogConsole.appendChild(row);
        automationLogConsole.scrollTop = automationLogConsole.scrollHeight; // Auto scroll down
    }

    // =========================================================================
    // 11. AI CHATBOT AGENT (RUTA IA)
    // =========================================================================
    
    if (aiBubble) aiBubble.addEventListener('click', toggleAiChat);
    if (closeAi) closeAi.addEventListener('click', toggleAiChat);

    function toggleAiChat() {
        if (aiSidebar) aiSidebar.classList.toggle('open');
    }

    // Suggestions click
    aiSuggestBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const q = btn.getAttribute('data-query');
            if (aiInput) {
                aiInput.value = q;
                sendAiMessage();
            }
        });
    });

    if (aiSendBtn) aiSendBtn.addEventListener('click', sendAiMessage);
    if (aiInput) {
        aiInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendAiMessage();
            }
        });
    }

    function sendAiMessage() {
        const msgText = aiInput.value.trim();
        if (!msgText) return;

        // Append user message
        appendChatMessage(msgText, 'user');
        aiInput.value = '';

        // Simulate typing delay
        setTimeout(() => {
            const responseText = getAiResponse(msgText);
            appendChatMessage(responseText, 'bot');
        }, 500);
    }

    function appendChatMessage(text, sender) {
        if (!aiMsgsContainer) return;
        const div = document.createElement('div');
        div.className = `ai-msg ${sender}`;
        div.style.margin = '8px 0';
        div.style.padding = '8px 12px';
        div.style.borderRadius = '8px';
        div.style.maxWidth = '85%';
        
        if (sender === 'user') {
            div.style.background = '#C8A96A';
            div.style.color = '#000';
            div.style.marginLeft = 'auto';
        } else {
            div.style.background = 'rgba(255,255,255,0.05)';
            div.style.color = '#fff';
            div.style.marginRight = 'auto';
            div.style.border = '1px solid rgba(255,255,255,0.1)';
        }
        
        // Convert Markdown style bolding (**word**) and linebreaks to HTML
        let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        formattedText = formattedText.replace(/\n/g, '<br>');
        
        div.innerHTML = formattedText;
        aiMsgsContainer.appendChild(div);
        
        // Scroll to bottom
        aiMsgsContainer.scrollTop = aiMsgsContainer.scrollHeight;
    }

    function getAiResponse(query) {
        const q = query.toLowerCase();

        if (q.includes('hola') || q.includes('buenos dias') || q.includes('buenas tardes')) {
            return '¡Hola! Qué gusto saludarte. Soy **RutaIA**. ¿Estás buscando planificar un viaje o deseas información sobre los hospedajes y tours en la Ruta Escondida?';
        }
        
        if (q.includes('perucho') || q.includes('gastronom') || q.includes('mandarina')) {
            return 'En **Perucho** te recomiendo ampliamente el **"Tour de Cítricos y Caminata al Río"** de la Hostería Mandarina Real. Cuesta solo **$15.00/persona** e incluye caminata, cosecha directa de fruta y el almuerzo tradicional. 🍊\n\n¿Quieres que lo agregue directamente al carrito para ti?';
        }
        
        if (q.includes('hospedaje') || q.includes('minas') || q.includes('cabaña')) {
            return 'En **San José de Minas** contamos con hospedaje rural de alto nivel. La experiencia de **"Hospedaje de Altura y Mirador de Estrellas"** en Chavezpamba es fantástica (**$55.00/noche** por cabaña) con sesión de astronomía andina.\n\nTambién hay hosterías familiares en Perucho. ¿Para cuántas personas necesitas el alojamiento?';
        }

        if (q.includes('colegio') || q.includes('estudiante') || q.includes('grupo') || q.includes('empresa') || q.includes('escolar')) {
            return '¡Excelente! Diseñamos itinerarios especiales para grupos. Ofrecemos **"Aulas Vivas en Fincas"** donde los estudiantes cosechan chirimoya, y dinámicas de **Team Building** comunitario.\n\nHaz clic en el botón de **"Central de Reservas"** o escribe un correo para enviarte una cotización formal detallada en formato PDF.';
        }

        if (q.includes('precio') || q.includes('costo') || q.includes('barato')) {
            return 'Contamos con experiencias comunitarias desde **$10.00** (como el Taller de Tejido de Cabuya) hasta hospedajes de **$65.00/noche**.\n\nDime qué tipo de actividad buscas y te filtro las opciones de menor precio.';
        }

        if (q.includes('reservar') || q.includes('comprar') || q.includes('pago')) {
            return 'Reservar es muy fácil:\n1. Haz clic en la tarjeta de cualquier experiencia.\n2. Elige el número de personas y presiona **"Agregar al Carrito"**.\n3. Abre tu Carrito 🛍? en la esquina superior derecha y presiona **"Proceder al Pago"**.\n4. Realiza el pago seguro vía Kushki/PayPhone y recibirás tu voucher por WhatsApp automáticamente.';
        }

        return 'Entiendo tu interés. Como asistente de la **Ruta Escondida**, te sugiero visitar Puéllaro para probar chirimoyas o Minas si buscas senderismo de aventura. ¿Deseas que te recomiende un tour específico para este fin de semana?';
    }

    // =========================================================================
    // 12. GENERAL TRIGGERS (WHATSAPP REDIRECTS)
    // =========================================================================
    
    if (btnCentralReservas) {
        btnCentralReservas.addEventListener('click', () => {
            addAutomationLog('WhatsApp', 'Redirección a Central de Reservas vía WhatsApp');
            alert('Redirigiendo a la Central de Reservas de Ruta Escondida en WhatsApp (+593984480203)...');
            window.open('https://wa.me/593984480203?text=Hola%20Diego,%20quisiera%20planificar%20un%20viaje%20a%20la%20Ruta%20Escondida.', '_blank');
        });
    }

    if (btnQuoteEdu) {
        btnQuoteEdu.addEventListener('click', () => {
            addAutomationLog('Operador', 'Formulario de Cotización Grupal/Corporativa abierto.');
            alert('Abriendo formulario de solicitud de propuesta para turismo educativo/corporativo.\nNos contactaremos a su correo en menos de 24 horas.');
        });
    }

    // Language selector triggers
    const langSelect = document.getElementById('language-select');
    if (langSelect) {
        langSelect.addEventListener('change', () => {
            const lang = langSelect.value;
            state.language = lang;
            
            const langAlerts = {
                es: 'Idioma cambiado a Español.',
                en: 'Language changed to English.',
                fr: 'Langue changée en Français.',
                de: 'Sprache auf Deutsch geändert.'
            };
            
            alert(langAlerts[lang] || 'Idioma cambiado.');
            
            if (lang === 'en') {
                const centerSpan = document.querySelector('#btn-central-reservas span');
                if (centerSpan) centerSpan.textContent = 'Booking Center';
            } else {
                const centerSpan = document.querySelector('#btn-central-reservas span');
                if (centerSpan) centerSpan.textContent = 'Central de Reservas';
            }
        });
    }

    // =========================================================================
    // 13. INITIAL EXECUTION
    // =========================================================================
    applyFilters();
});
