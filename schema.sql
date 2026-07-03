-- Create custom types for ENUMs
CREATE TYPE user_role AS ENUM ('admin', 'emprendedor');
CREATE TYPE subscription_plan AS ENUM ('free', 'basico', 'visibilidad', 'digital_pro');
CREATE TYPE business_status AS ENUM ('pending', 'active', 'suspended');

-- Users table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT NOT NULL,
  role user_role DEFAULT 'emprendedor',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Businesses table
CREATE TABLE public.businesses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID REFERENCES public.profiles(id) NOT NULL,
  name TEXT NOT NULL,
  parish TEXT NOT NULL,
  category TEXT NOT NULL,
  description_short TEXT,
  description_long TEXT,
  logo_url TEXT,
  cover_url TEXT,
  gallery_urls TEXT[], -- Array of image URLs
  schedule TEXT,
  subscription_plan subscription_plan DEFAULT 'free',
  commission_rate DECIMAL(5,2) DEFAULT 10.00, -- e.g. 10.00%
  status business_status DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Bookings table
CREATE TABLE public.bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID REFERENCES public.businesses(id) NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  booking_date DATE NOT NULL,
  guests_count INTEGER DEFAULT 1,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, confirmed, cancelled, completed
  payment_status TEXT DEFAULT 'unpaid', -- unpaid, paid, partially_paid
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Businesses Policies
CREATE POLICY "Active businesses are viewable by everyone." ON public.businesses FOR SELECT USING (status = 'active');
CREATE POLICY "Users can view their own businesses." ON public.businesses FOR SELECT USING (auth.uid() = owner_id);
CREATE POLICY "Users can create a business." ON public.businesses FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Users can update their own business." ON public.businesses FOR UPDATE USING (auth.uid() = owner_id);

-- Bookings Policies
CREATE POLICY "Business owners can view their bookings." ON public.bookings FOR SELECT USING (
  business_id IN (SELECT id FROM public.businesses WHERE owner_id = auth.uid())
);
CREATE POLICY "Customers can insert bookings." ON public.bookings FOR INSERT WITH CHECK (true);
