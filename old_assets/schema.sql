-- ==========================================
-- SCHEMA.SQL
-- Base de Datos del Marketplace Ruta Escondida
-- Motor: PostgreSQL / Supabase
-- ==========================================

-- Habilitar extensión para UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── 1. TABLA: USERS ──────────────────────
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role VARCHAR(20) NOT NULL CHECK (role IN ('tourist', 'vendor', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index para búsquedas de usuarios por correo
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- ── 2. TABLA: BUSINESSES ─────────────────
CREATE TABLE IF NOT EXISTS businesses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('hospedaje', 'gastronomia', 'tours', 'agricultura', 'artesanias', 'transporte', 'servicios')),
    manager_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    whatsapp VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    parish VARCHAR(50) NOT NULL CHECK (parish IN ('Puéllaro', 'Perucho', 'Atahualpa', 'Chavezpamba', 'Minas')),
    coords_lat DECIMAL(9,6) NOT NULL,
    coords_lng DECIMAL(9,6) NOT NULL,
    schedule TEXT NOT NULL,
    instagram VARCHAR(255),
    facebook VARCHAR(255),
    tiktok VARCHAR(255),
    description_short VARCHAR(250) NOT NULL,
    description_long TEXT NOT NULL,
    subscription_plan VARCHAR(20) NOT NULL DEFAULT 'basico' CHECK (subscription_plan IN ('basico', 'visibilidad', 'digital_pro')),
    status VARCHAR(20) NOT NULL DEFAULT 'pending_approval' CHECK (status IN ('pending_approval', 'active', 'suspended')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices para búsquedas y filtros rápidos del catálogo
CREATE INDEX IF NOT EXISTS idx_businesses_parish ON businesses(parish);
CREATE INDEX IF NOT EXISTS idx_businesses_category ON businesses(category);
CREATE INDEX IF NOT EXISTS idx_businesses_status ON businesses(status);

-- ── 3. TABLA: PHOTOS ─────────────────────
CREATE TABLE IF NOT EXISTS photos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    order_index INT NOT NULL DEFAULT 0,
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index para optimizar la carga de galerías de fotos por negocio
CREATE INDEX IF NOT EXISTS idx_photos_business ON photos(business_id, order_index);

-- ── 4. TABLA: PRODUCTS (PRODUCTOS Y EXPERIENCIAS)
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    type VARCHAR(30) NOT NULL CHECK (type IN ('tour', 'hospedaje', 'gastronomia', 'transporte', 'experiencia_agricola', 'actividad_cultural', 'paquete')),
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    duration VARCHAR(50) NOT NULL,
    capacity INT NOT NULL CHECK (capacity > 0),
    blocked_dates DATE[] DEFAULT '{}',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index para el catálogo de productos por negocio y categoría
CREATE INDEX IF NOT EXISTS idx_products_business ON products(business_id);
CREATE INDEX IF NOT EXISTS idx_products_type ON products(type);

-- ── 5. TABLA: BOOKINGS (RESERVAS) ────────
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tourist_id UUID REFERENCES users(id) ON DELETE SET NULL,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    booking_date DATE NOT NULL,
    guests INT NOT NULL CHECK (guests > 0),
    total_price DECIMAL(10,2) NOT NULL CHECK (total_price >= 0),
    commission_amount DECIMAL(10,2) NOT NULL CHECK (commission_amount >= 0),
    vendor_amount DECIMAL(10,2) NOT NULL CHECK (vendor_amount >= 0),
    status VARCHAR(20) NOT NULL DEFAULT 'pending_payment' CHECK (status IN ('pending_payment', 'paid', 'cancelled', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices de reservas para administración y auditorías
CREATE INDEX IF NOT EXISTS idx_bookings_business ON bookings(business_id);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(booking_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);

-- ── 6. TABLA: WALLET_TRANSACTIONS ────────
CREATE TABLE IF NOT EXISTS wallet_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('sale', 'withdrawal')),
    status VARCHAR(20) NOT NULL DEFAULT 'completed' CHECK (status IN ('completed', 'pending', 'failed')),
    reference_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index para la wallet y contabilidad del panel de control
CREATE INDEX IF NOT EXISTS idx_wallet_business ON wallet_transactions(business_id);

-- ── 7. TABLA: CRM_LEADS (CONTROL DE PROSPECTOS)
CREATE TABLE IF NOT EXISTS crm_leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20) NOT NULL,
    interest_topic VARCHAR(100),
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index para seguimiento de campañas de marketing
CREATE INDEX IF NOT EXISTS idx_crm_created ON crm_leads(created_at);

-- ── 8. TABLA: LOYALTY_POINTS (PROGRAMA DE PUNTOS)
CREATE TABLE IF NOT EXISTS loyalty_points (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    points_earned INT NOT NULL CHECK (points_earned >= 0),
    status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'redeemed', 'expired')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_loyalty_user ON loyalty_points(user_id);

-- ── 9. TRIGGERS PARA UPDATED_AT ──────────
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_modtime BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_businesses_modtime BEFORE UPDATE ON businesses FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_products_modtime BEFORE UPDATE ON products FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_bookings_modtime BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_loyalty_modtime BEFORE UPDATE ON loyalty_points FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
