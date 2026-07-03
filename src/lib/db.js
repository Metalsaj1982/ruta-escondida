import { supabase, isMockEnv } from './supabase';

const DEFAULT_BUSINESSES = [
  {
    id: "glamping",
    name: "Glamping Andes Escondidos",
    category: "hospedaje",
    categoryLabel: "🏡 Hospedaje Premium",
    parish: "Chavezpamba",
    description: "Domo de lujo con vista panorámica de 360° al cañón de Alchipichí. Equipado con jacuzzi privado, fogata y desayuno agroecológico incluido.",
    phone: "593984480203",
    email: "glamping@andesescondidos.com",
    photo: "/assets/img/glamping_alchipichi.png",
    photos: [
      "/assets/img/glamping_alchipichi.png",
      "/assets/img/hero.jpg",
      "/assets/img/logo.png"
    ],
    video_url: "https://www.w3schools.com/html/mov_bbb.mp4",
    location: "Alchipichí, Sector El Campanario",
    google_maps_url: "https://maps.google.com/?q=0.1220,-78.3750",
    coords: [0.1220, -78.3750],
    instagram: "https://instagram.com/glamping.andesescondidos",
    facebook: "https://facebook.com/glamping.andesescondidos",
    tiktok: "https://tiktok.com/@glamping.andesescondidos",
    subscription_plan: "premium",
    status: "active",
    commission_balance: 120.00
  },
  {
    id: "restaurante",
    name: "El Mirador de Alchipichí",
    category: "gastronomia",
    categoryLabel: "🍴 Gastronomía Local",
    parish: "Puéllaro",
    description: "Comida típica ecuatoriana elaborada con ingredientes 100% orgánicos de nuestro propio huerto. Disfruta de la mejor fritada andina, truchas frescas y helados artesanales.",
    phone: "593984480204",
    email: "contacto@miradoralchipichi.com",
    photo: "/assets/img/restaurante_alchipichi.png",
    photos: [
      "/assets/img/restaurante_alchipichi.png"
    ],
    location: "Vía Principal a Alchipichí, Km 3",
    google_maps_url: "https://maps.google.com/?q=0.1180,-78.3810",
    coords: [0.1180, -78.3810],
    instagram: "https://instagram.com/mirador.alchipichi",
    facebook: "https://facebook.com/mirador.alchipichi",
    tiktok: "",
    subscription_plan: "basico",
    status: "active",
    commission_balance: 45.00
  },
  {
    id: "cafe",
    name: "Café de Especialidad Andino",
    category: "gastronomia",
    categoryLabel: "☕ Cafetería & Dulces",
    parish: "Perucho",
    description: "Barra de café cultivado y tostado localmente a 2.100 msnm. Ofrecemos lattes con arte y repostería artesanal con frutas de la zona.",
    phone: "593984480205",
    email: "cafe@perucho.com",
    photo: "/assets/img/cafe_alchipichi.png",
    photos: [
      "/assets/img/cafe_alchipichi.png"
    ],
    location: "Frente a la Plaza Central de Alchipichí",
    google_maps_url: "https://maps.google.com/?q=0.1205,-78.3780",
    coords: [0.1205, -78.3780],
    instagram: "https://instagram.com/cafe.perucho",
    facebook: "",
    tiktok: "",
    subscription_plan: "free",
    status: "active",
    commission_balance: 0.00
  }
];

const DEFAULT_PRODUCTS = [
  { id: "p1", business_id: "glamping", name: "Estadía Domo Luxury Fin de Semana", price: 120.00, description: "Hospedaje de 1 noche para 2 personas con jacuzzi y desayuno incluido.", type: "producto" },
  { id: "p2", business_id: "glamping", name: "Cena Romántica de Tres Tiempos", price: 40.00, description: "Cena privada bajo la luz de la luna con productos andinos.", type: "producto" },
  { id: "p3", business_id: "restaurante", name: "Fritada Andina Completa", price: 12.00, description: "Servido con mote, maduro, choclo y queso de la zona.", type: "producto" },
  { id: "p4", business_id: "restaurante", name: "Torta de Mandarina de Perucho", price: 3.50, description: "Bizcocho artesanal bañado en almíbar cítrico local.", type: "promocion" },
  { id: "p5", business_id: "cafe", name: "Café Filtrado + Humita Caliente", price: 4.50, description: "Combo desayuno típico de la serranía.", type: "producto" }
];

const DEFAULT_BOOKINGS = [
  { id: "b1", business_id: "glamping", customer_name: "Juan Pérez", date: "2026-07-12", amount: 120.00, commission: 12.00, status: "completed", created_at: "2026-07-01" },
  { id: "b2", business_id: "restaurante", customer_name: "María Gómez", date: "2026-07-15", amount: 45.00, commission: 4.50, status: "pending", created_at: "2026-07-02" }
];

const DEFAULT_LEADS = [
  { id: "l1", business_id: "glamping", customer_name: "Andrés Larrea", customer_phone: "0998877665", customer_email: "andres@mail.com", message: "Me interesa reservar el domo el próximo sábado.", created_at: "2026-07-02" }
];

// Helper to initialize local storage mock DB
const initMockDB = () => {
  if (typeof window === 'undefined') return;
  if (!localStorage.getItem('re_businesses')) {
    localStorage.setItem('re_businesses', JSON.stringify(DEFAULT_BUSINESSES));
  }
  if (!localStorage.getItem('re_products')) {
    localStorage.setItem('re_products', JSON.stringify(DEFAULT_PRODUCTS));
  }
  if (!localStorage.getItem('re_bookings')) {
    localStorage.setItem('re_bookings', JSON.stringify(DEFAULT_BOOKINGS));
  }
  if (!localStorage.getItem('re_leads')) {
    localStorage.setItem('re_leads', JSON.stringify(DEFAULT_LEADS));
  }
};

export const dbManager = {
  // --- BUSINESSES ---
  async getBusinesses() {
    if (!isMockEnv()) {
      const { data, error } = await supabase.from('businesses').select('*');
      if (!error) return data;
    }
    initMockDB();
    return JSON.parse(localStorage.getItem('re_businesses') || '[]');
  },

  async getBusinessById(id) {
    if (!isMockEnv()) {
      const { data, error } = await supabase.from('businesses').select('*').eq('id', id).single();
      if (!error) return data;
    }
    initMockDB();
    const list = JSON.parse(localStorage.getItem('re_businesses') || '[]');
    return list.find(b => b.id === id) || null;
  },

  async updateBusiness(id, updatedData) {
    if (!isMockEnv()) {
      const { data, error } = await supabase.from('businesses').update(updatedData).eq('id', id);
      if (!error) return true;
    }
    initMockDB();
    const list = JSON.parse(localStorage.getItem('re_businesses') || '[]');
    const index = list.findIndex(b => b.id === id);
    if (index !== -1) {
      list[index] = { ...list[index], ...updatedData };
      localStorage.setItem('re_businesses', JSON.stringify(list));
      return true;
    }
    return false;
  },

  async addBusiness(newBiz) {
    if (!isMockEnv()) {
      const { data, error } = await supabase.from('businesses').insert([newBiz]);
      if (!error) return true;
    }
    initMockDB();
    const list = JSON.parse(localStorage.getItem('re_businesses') || '[]');
    list.push(newBiz);
    localStorage.setItem('re_businesses', JSON.stringify(list));
    return true;
  },

  // --- PRODUCTS ---
  async getProducts() {
    if (!isMockEnv()) {
      const { data, error } = await supabase.from('products').select('*');
      if (!error) return data;
    }
    initMockDB();
    return JSON.parse(localStorage.getItem('re_products') || '[]');
  },

  async getProductsByBusiness(businessId) {
    if (!isMockEnv()) {
      const { data, error } = await supabase.from('products').select('*').eq('business_id', businessId);
      if (!error) return data;
    }
    initMockDB();
    const list = JSON.parse(localStorage.getItem('re_products') || '[]');
    return list.filter(p => p.business_id === businessId);
  },

  async addProduct(product) {
    if (!isMockEnv()) {
      const { data, error } = await supabase.from('products').insert([product]);
      if (!error) return true;
    }
    initMockDB();
    const list = JSON.parse(localStorage.getItem('re_products') || '[]');
    list.push(product);
    localStorage.setItem('re_products', JSON.stringify(list));
    return true;
  },

  async deleteProduct(productId) {
    if (!isMockEnv()) {
      const { data, error } = await supabase.from('products').delete().eq('id', productId);
      if (!error) return true;
    }
    initMockDB();
    const list = JSON.parse(localStorage.getItem('re_products') || '[]');
    const filtered = list.filter(p => p.id !== productId);
    localStorage.setItem('re_products', JSON.stringify(filtered));
    return true;
  },

  // --- BOOKINGS ---
  async getBookings(businessId = null) {
    if (!isMockEnv()) {
      const query = supabase.from('bookings').select('*');
      if (businessId) query.eq('business_id', businessId);
      const { data, error } = await query;
      if (!error) return data;
    }
    initMockDB();
    const list = JSON.parse(localStorage.getItem('re_bookings') || '[]');
    if (businessId) return list.filter(b => b.business_id === businessId);
    return list;
  },

  async addBooking(booking) {
    // Auto-calculate commission (13%)
    const commission = parseFloat((booking.amount * 0.13).toFixed(2));
    const newBooking = {
      ...booking,
      id: booking.id || `b-${Date.now()}`,
      commission,
      created_at: new Date().toISOString().split('T')[0]
    };

    if (!isMockEnv()) {
      const { data, error } = await supabase.from('bookings').insert([newBooking]);
      if (!error) return newBooking;
    }
    initMockDB();
    const list = JSON.parse(localStorage.getItem('re_bookings') || '[]');
    list.push(newBooking);
    localStorage.setItem('re_bookings', JSON.stringify(list));

    // Update business balance
    const businesses = JSON.parse(localStorage.getItem('re_businesses') || '[]');
    const bizIdx = businesses.findIndex(b => b.id === booking.business_id);
    if (bizIdx !== -1) {
      businesses[bizIdx].commission_balance = (businesses[bizIdx].commission_balance || 0) + commission;
      localStorage.setItem('re_businesses', JSON.stringify(businesses));
    }

    return newBooking;
  },

  async updateBookingStatus(bookingId, status) {
    if (!isMockEnv()) {
      const { data, error } = await supabase.from('bookings').update({ status }).eq('id', bookingId);
      if (!error) return true;
    }
    initMockDB();
    const list = JSON.parse(localStorage.getItem('re_bookings') || '[]');
    const index = list.findIndex(b => b.id === bookingId);
    if (index !== -1) {
      list[index].status = status;
      localStorage.setItem('re_bookings', JSON.stringify(list));
      return true;
    }
    return false;
  },

  // --- LEADS ---
  async getLeads(businessId = null) {
    if (!isMockEnv()) {
      const query = supabase.from('leads').select('*');
      if (businessId) query.eq('business_id', businessId);
      const { data, error } = await query;
      if (!error) return data;
    }
    initMockDB();
    const list = JSON.parse(localStorage.getItem('re_leads') || '[]');
    if (businessId) return list.filter(l => l.business_id === businessId);
    return list;
  },

  async addLead(lead) {
    const newLead = {
      ...lead,
      id: `l-${Date.now()}`,
      created_at: new Date().toISOString().split('T')[0]
    };
    if (!isMockEnv()) {
      const { data, error } = await supabase.from('leads').insert([newLead]);
      if (!error) return true;
    }
    initMockDB();
    const list = JSON.parse(localStorage.getItem('re_leads') || '[]');
    list.push(newLead);
    localStorage.setItem('re_leads', JSON.stringify(list));
    return true;
  }
};
