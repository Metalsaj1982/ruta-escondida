import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mock-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to check if we are using the mock environment
export const isMockEnv = () => {
  return supabaseUrl === 'https://mock.supabase.co';
};

// Mock data generator for fallback when Supabase is not configured
export const getMockBusinesses = () => {
  return [
    { 
      id: '1', 
      name: 'Hostería Las Cascadas', 
      parish: 'Atahualpa', 
      category: 'hospedaje', 
      subscription_plan: 'digital_pro', 
      description_short: 'Un escape en la naturaleza rodeado de cascadas y senderos ecológicos.',
      logo_url: '/assets/img/logo.png',
      cover_url: '/assets/img/logo.png',
      commission_rate: 10.00,
      status: 'active'
    },
    { 
      id: '2', 
      name: 'Café Perucho', 
      parish: 'Perucho', 
      category: 'gastronomia', 
      subscription_plan: 'visibilidad', 
      description_short: 'El mejor café de la región con vistas espectaculares a la montaña.',
      logo_url: '/assets/img/logo.png',
      cover_url: '/assets/img/logo.png',
      commission_rate: 12.00,
      status: 'active'
    },
    { 
      id: '3', 
      name: 'Ruta del Agave', 
      parish: 'Puéllaro', 
      category: 'experiencias', 
      subscription_plan: 'basico', 
      description_short: 'Descubre el proceso milenario de destilación del agave andino.',
      logo_url: '/assets/img/logo.png',
      cover_url: '/assets/img/logo.png',
      commission_rate: 15.00,
      status: 'active'
    }
  ];
};
