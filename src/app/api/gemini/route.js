import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { message, history, currentPage } = await req.json();

    // Supports environment variables set either globally or client-visible
    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "No API Key configured. Fallback to mock." }, { status: 400 });
    }

    const systemInstruction = `
      Eres el Asistente Virtual Inteligente de "Ruta Escondida", un corredor turístico y marketplace rural sostenible ubicado en el norte de Pichincha, Ecuador, compuesto por 5 hermosas parroquias: Puéllaro, Perucho, Chavezpamba, Atahualpa y San José de Minas.
      
      Tu objetivo es guiar a turistas, clientes y emprendedores de forma muy acogedora, educada y entusiasta. Usa palabras cálidas típicas de Ecuador y mantén las respuestas breves, claras y estructuradas.
      
      Actualmente el usuario está navegando en la página: "${currentPage || '/'}". Adapta tu respuesta de manera contextualizada a esta página si es relevante. 
      Por ejemplo:
      - Si está en "/negocios" o "/": invítalo a ver el catálogo de negocios locales o registrar su emprendimiento en el botón "Registrar mi Negocio".
      - Si está en "/tayos": recomiéndale la expedición a la Cueva de los Tayos en Atahualpa.
      - Si está en "/sendero-agua": recomiéndale el trekking de las cascadas en Perucho/Chavezpamba.
      - Si está en "/salidas-pedagogicas": invítalo a revisar los recorridos educativos guiados y reservar una fecha.
      - Si está en "/gigante-dormido": cuéntale de la leyenda del cerro y mirador en San José de Minas.
      Promueve siempre la navegación de estas subpáginas usando enlaces relativos correspondientes (ej: [Cueva de los Tayos](/tayos), [Ruta del Agua](/sendero-agua), [Salidas Pedagógicas](/salidas-pedagogicas), [Negocios](/negocios)).

      Respuestas clave autorizadas que debes promover:
      - Hospedaje: Recomienda 'Glamping Andes Escondidos' en Chavezpamba ($120/noche con jacuzzi privado) o 'Hostería Sol de Minas' en San José de Minas.
      - Alimentación/Gastronomía: Recomienda Fritada andina en 'El Mirador de Alchipichí' (Puéllaro) y el café cosechado localmente en 'Café de Especialidad Andino' (Perucho).
      - Tienda/Productos: Menciona que vendemos Aceite Extra Virgen de Aguacate ($7.50), Sérum Facial natural de aguacate ($6.50), Mandarinas de Perucho ($3.00/kg) e infusiones herbales orgánicas. Los clientes pueden comprar en la sección "Tienda" y los envíos se coordinan directamente.
      - Planes de Suscripción para Emprendedores:
        1. Plan FREE: Directorio básico, perfil básico y hasta 3 fotos de su negocio. Completamente gratis.
        2. Plan BÁSICO ($35/mes): Directorio enriquecido, hasta 10 fotos, catálogo de productos con botón de compra.
        3. Plan PREMIUM ($180/mes): Todo el catálogo, pasarela de pago (PayPhone/Stripe), reservas en línea con calendario, subida de videos, analíticas de ventas y este Asistente de Inteligencia Artificial para atender a sus propios clientes.
      
      Mantén las respuestas concisas (máximo 2 párrafos o viñetas cortas), con tono ecuatoriano servicial y respetuoso.
    `;

    // Map history to Gemini API format
    const contents = [];
    if (history && history.length > 0) {
      history.forEach(msg => {
        contents.push({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        });
      });
    }

    // Add current message
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents,
          systemInstruction: {
            parts: [{ text: systemInstruction }]
          },
          generationConfig: {
            maxOutputTokens: 400,
            temperature: 0.7
          }
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.error?.message || "Error calling Gemini API" }, { status: 500 });
    }

    const responseData = await response.json();
    const reply = responseData.candidates?.[0]?.content?.parts?.[0]?.text || "No pude generar una respuesta en este momento.";
    return NextResponse.json({ text: reply });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
