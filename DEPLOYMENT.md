# Guía de Despliegue - Ruta Escondida Marketplace

Este documento describe paso a paso cómo conectar los servicios externos (Base de Datos en la nube, Inteligencia Artificial Gratuita y Pasarelas de Pago) y cómo subir la aplicación a **Namecheap**.

---

## 1. Base de Datos: Supabase (PostgreSQL)

La aplicación está pre-configurada para conectarse automáticamente a **Supabase** en producción. Si no se detectan las credenciales, el sistema usará un motor simulado local (`localStorage`) para que puedas seguir probando de forma local.

### Pasos para configurar tu base de datos en la nube:
1. Regístrate en [Supabase](https://supabase.com/) y crea un proyecto nuevo (Gratuito).
2. Ve a la sección **SQL Editor** en el panel de control de Supabase.
3. Copia el contenido del archivo [`supabase_setup.sql`](file:///Users/test/Web%20Rutaescondida.com/supabase_setup.sql) que creamos en el proyecto y pégalo en el editor de Supabase.
4. Presiona **Run** para crear todas las tablas (`businesses`, `products`, `bookings`, `leads`), configurar las políticas de seguridad de lectura/escritura (RLS) y cargar los datos iniciales de prueba (seed).
5. Ve a **Project Settings > API** y copia tu:
   * **Project API URL**
   * **anon public key**

---

## 2. Inteligencia Artificial Gratuita: Gemini 2.5 Flash

Para alimentar el asistente de IA (`AiAssistant.js`) con respuestas inteligentes reales y gratuitas, la mejor opción del mercado es la **Gemini API** de Google en su capa gratuita (Google AI Studio).

### Pasos para obtenerla:
1. Entra a [Google AI Studio](https://aistudio.google.com/) e inicia sesión con tu cuenta de Google.
2. Haz clic en **Get API Key** y genera una clave de API gratuita para un nuevo proyecto.
   * *La capa gratuita de Gemini 2.5 Flash ofrece hasta 15 consultas por minuto y 1 millón de tokens por minuto sin costo.*
3. Para activarla de forma segura en tu aplicación, el sistema lee la variable de entorno:
   `NEXT_PUBLIC_GEMINI_API_KEY`

---

## 3. Pasarelas de Pago

La plataforma cuenta con 3 métodos de cobro pre-integrados en la caja de reservas de los negocios Premium:

1. **WhatsApp Business (Sin Comisiones)**:
   * Deriva la orden directamente al chat del productor local.
   * Configura los números de teléfono locales en la propiedad `phone` del negocio (ej: `593984480203` para Ecuador).
2. **PayPhone (Recomendado para Ecuador)**:
   * Es el procesador local líder en Ecuador con la comisión más baja y el flujo más simple.
   * Regístrate en [PayPhone Developer Portal](https://partner.payphone.app/) y obtén tus credenciales para habilitar los cobros con tarjeta y número de teléfono.
3. **Stripe (Internacional)**:
   * Añade tus claves públicas de Stripe para procesar tarjetas internacionales en tu cuenta bancaria.

---

## 4. Despliegue en Namecheap

Existen dos alternativas de despliegue en tu hosting de Namecheap:

### Opción A: Exportación Estática (Recomendada - Rápida, Segura y Gratis)
Dado que la base de datos corre de forma serverless en Supabase y los pagos/IA se ejecutan del lado del cliente, puedes compilar todo el sitio como páginas HTML/CSS/JS estáticas ultrarrápidas y subirlas a Namecheap sin necesidad de configurar un servidor Node.js.

1. Abre [`next.config.ts`](file:///Users/test/Web%20Rutaescondida.com/next.config.ts) o `next.config.js` y añade:
   ```javascript
   const nextConfig = {
     output: 'export', // Fuerza la compilación a HTML estático
     images: { unoptimized: true }
   };
   ```
2. Ejecuta en tu terminal:
   ```bash
   npm run build
   ```
3. Esto generará una carpeta llamada `out` en la raíz de tu proyecto.
4. Entra a tu **cPanel de Namecheap > Administrador de Archivos** y sube el contenido de la carpeta `out` directamente dentro del directorio `public_html`.
5. ¡Listo! Tu web cargará al instante con costo de CPU cero en Namecheap.

### Opción B: Aplicación Dinámica en Node.js Selector (cPanel)
Si requieres mantener el enrutamiento dinámico en servidor en Next.js:

1. Modifica tu `next.config.ts` para usar compilación Standalone:
   ```javascript
   const nextConfig = {
     output: 'standalone'
   };
   ```
2. Compila el proyecto con `npm run build`.
3. Ve a **cPanel de Namecheap > Setup Node.js App**.
4. Crea una aplicación nueva:
   * **Node.js Version**: Selecciona la última disponible (v18 o v20 recomendada).
   * **Application startup file**: Escribe `server.js` (copia el archivo `.next/standalone/server.js` que se genera tras compilar a la raíz de tu hosting).
5. Sube tu carpeta `.next`, `public` y `package.json` a la carpeta de la app en Namecheap.
6. Haz clic en **Run JS Install** para instalar las dependencias en Namecheap y reinicia la aplicación.

---

## 5. Configuración de Variables de Entorno (Archivo `.env`)

Crea un archivo llamado `.env.local` en la raíz de tu proyecto (o añade estas variables en la sección **Application Environment Variables** del cPanel de Namecheap / Vercel):

```env
# Conexión a Base de Datos Supabase
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-de-supabase

# API Key de Inteligencia Artificial
NEXT_PUBLIC_GEMINI_API_KEY=tu-api-key-gratuita-de-gemini

# Configuración de Pasarelas de Pago
NEXT_PUBLIC_PAYPHONE_CLIENT_ID=tu-id-de-cliente-payphone
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=tu-public-key-de-stripe
```
