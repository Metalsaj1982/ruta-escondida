-- ==========================================
-- SUPABASE_SETUP.SQL
-- Base de Datos del Marketplace Ruta Escondida
-- Motor: PostgreSQL / Supabase
-- ==========================================

-- Habilitar extensión para UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── 1. TABLA: BUSINESSES ─────────────────
CREATE TABLE IF NOT EXISTS businesses (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    categoryLabel VARCHAR(100),
    parish VARCHAR(100) NOT NULL,
    description TEXT,
    phone VARCHAR(50),
    email VARCHAR(255),
    photo VARCHAR(255),
    photos JSONB DEFAULT '[]'::jsonb,
    video_url VARCHAR(255),
    location TEXT,
    google_maps_url VARCHAR(255),
    coords DOUBLE PRECISION[] DEFAULT '{}',
    instagram VARCHAR(255),
    facebook VARCHAR(255),
    tiktok VARCHAR(255),
    subscription_plan VARCHAR(50) DEFAULT 'free',
    status VARCHAR(50) DEFAULT 'pending',
    commission_balance DECIMAL(10,2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Habilitar Row Level Security (RLS) para lectura pública y escritura libre en registro de nuevos emprendedores
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lectura pública de negocios" ON businesses FOR SELECT USING (true);
CREATE POLICY "Insertar nuevos negocios libremente" ON businesses FOR INSERT WITH CHECK (true);
CREATE POLICY "Actualizar negocios libremente" ON businesses FOR UPDATE USING (true) WITH CHECK (true);

-- ── 2. TABLA: PRODUCTS ───────────────────
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(100) PRIMARY KEY,
    business_id VARCHAR(100) NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    description TEXT,
    type VARCHAR(50) DEFAULT 'producto',
    photo VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lectura pública de productos" ON products FOR SELECT USING (true);
CREATE POLICY "Insertar productos libremente" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Eliminar productos libremente" ON products FOR DELETE USING (true);

-- ── 3. TABLA: BOOKINGS ───────────────────
CREATE TABLE IF NOT EXISTS bookings (
    id VARCHAR(100) PRIMARY KEY,
    business_id VARCHAR(100) NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    customer_name VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    commission DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lectura de reservas libre" ON bookings FOR SELECT USING (true);
CREATE POLICY "Insertar reservas libre" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Actualizar reservas libre" ON bookings FOR UPDATE USING (true) WITH CHECK (true);

-- ── 4. TABLA: LEADS ──────────────────────
CREATE TABLE IF NOT EXISTS leads (
    id VARCHAR(100) PRIMARY KEY,
    business_id VARCHAR(100) NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    customer_email VARCHAR(255),
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lectura de prospectos libre" ON leads FOR SELECT USING (true);
CREATE POLICY "Insertar prospectos libre" ON leads FOR INSERT WITH CHECK (true);

-- ── 5. SEED DATA (INSERCIÓN DE DATOS) ─────

-- Insertar Negocios
INSERT INTO businesses (id, name, category, categoryLabel, parish, description, phone, email, photo, photos, video_url, location, google_maps_url, coords, instagram, facebook, tiktok, subscription_plan, status, commission_balance)
VALUES 
('glamping', 'Glamping Andes Escondidos', 'hospedaje', '🏡 Hospedaje Premium', 'Chavezpamba', 'Domo de lujo con vista panorámica de 360° al cañón de Alchipichí. Equipado con jacuzzi privado, fogata y desayuno agroecológico incluido.', '593984480203', 'glamping@andesescondidos.com', '/assets/img/glamping_alchipichi.png', '["/assets/img/glamping_alchipichi.png", "/assets/img/hero.jpg", "/assets/img/logo.png"]'::jsonb, 'https://www.w3schools.com/html/mov_bbb.mp4', 'Alchipichí, Sector El Campanario', 'https://maps.google.com/?q=0.1220,-78.3750', ARRAY[0.1220, -78.3750], 'https://instagram.com/glamping.andesescondidos', 'https://facebook.com/glamping.andesescondidos', 'https://tiktok.com/@glamping.andesescondidos', 'premium', 'active', 120.00)
ON CONFLICT (id) DO NOTHING;

INSERT INTO businesses (id, name, category, categoryLabel, parish, description, phone, email, photo, photos, video_url, location, google_maps_url, coords, instagram, facebook, tiktok, subscription_plan, status, commission_balance)
VALUES 
('restaurante', 'El Mirador de Alchipichí', 'gastronomia', '🍴 Gastronomía Local', 'Puéllaro', 'Comida típica ecuatoriana elaborada con ingredientes 100% orgánicos de nuestro propio huerto. Disfruta de la mejor fritada andina, truchas frescas y helados artesanales.', '593984480204', 'contacto@miradoralchipichi.com', '/assets/img/restaurante_alchipichi.png', '["/assets/img/restaurante_alchipichi.png"]'::jsonb, NULL, 'Vía Principal a Alchipichí, Km 3', 'https://maps.google.com/?q=0.1180,-78.3810', ARRAY[0.1180, -78.3810], 'https://instagram.com/mirador.alchipichi', 'https://facebook.com/mirador.alchipichi', '', 'basico', 'active', 45.00)
ON CONFLICT (id) DO NOTHING;

INSERT INTO businesses (id, name, category, categoryLabel, parish, description, phone, email, photo, photos, video_url, location, google_maps_url, coords, instagram, facebook, tiktok, subscription_plan, status, commission_balance)
VALUES 
('cafe', 'Café de Especialidad Andino', 'gastronomia', '☕ Cafetería & Dulces', 'Perucho', 'Barra de café cultivado y tostado localmente a 2.100 msnm. Ofrecemos lattes con arte y repostería artesanal con frutas de la zona.', '593984480205', 'cafe@perucho.com', '/assets/img/cafe_alchipichi.png', '["/assets/img/cafe_alchipichi.png"]'::jsonb, NULL, 'Frente a la Plaza Central de Alchipichí', 'https://maps.google.com/?q=0.1205,-78.3780', ARRAY[0.1205, -78.3780], 'https://instagram.com/cafe.perucho', '', '', 'free', 'active', 0.00)
ON CONFLICT (id) DO NOTHING;

-- Insertar Productos
INSERT INTO products (id, business_id, name, price, description, type, photo)
VALUES 
('p1', 'glamping', 'Estadía Domo Luxury Fin de Semana', 120.00, 'Hospedaje de 1 noche para 2 personas con jacuzzi y desayuno incluido.', 'producto', NULL),
('p2', 'glamping', 'Cena Romántica de Tres Tiempos', 40.00, 'Cena privada bajo la luz de la luna con productos andinos.', 'producto', NULL),
('p3', 'restaurante', 'Fritada Andina Completa', 12.00, 'Servido con mote, maduro, choclo y queso de la zona.', 'producto', NULL),
('p4', 'restaurante', 'Torta de Mandarina de Perucho', 3.50, 'Bizcocho artesanal bañado en almíbar cítrico local.', 'promocion', NULL),
('p5', 'cafe', 'Café Filtrado + Humita Caliente', 4.50, 'Combo desayuno típico de la serranía.', 'producto', NULL)
ON CONFLICT (id) DO NOTHING;

-- Insertar Reservas
INSERT INTO bookings (id, business_id, customer_name, date, amount, commission, status, created_at)
VALUES 
('b1', 'glamping', 'Juan Pérez', '2026-07-12', 120.00, 12.00, 'completed', '2026-07-01 10:00:00+00'),
('b2', 'restaurante', 'María Gómez', '2026-07-15', 45.00, 4.50, 'pending', '2026-07-02 12:00:00+00')
ON CONFLICT (id) DO NOTHING;

-- Insertar Leads
INSERT INTO leads (id, business_id, customer_name, customer_phone, customer_email, message, created_at)
VALUES 
('l1', 'glamping', 'Andrés Larrea', '0998877665', 'andres@mail.com', 'Me interesa reservar el domo el próximo sábado.', '2026-07-02 15:00:00+00')
ON CONFLICT (id) DO NOTHING;
