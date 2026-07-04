"use client";

import { useState } from 'react';

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: '¡Hola! Soy tu asistente virtual de Ruta Escondida. 🌿 ¿En qué puedo ayudarte hoy? Puedo informarte sobre nuestros destinos, hospedajes, la tienda de aguacates o cómo reservar.'
    }
  ]);
  const [input, setInput] = useState('');

  const getAiResponse = (msg) => {
    const text = msg.toLowerCase();
    
    if (text.includes('glamping') || text.includes('domo') || text.includes('hospedaje') || text.includes('hotel') || text.includes('dormir')) {
      return "Contamos con increíbles opciones de hospedaje rural. La más destacada es el 'Glamping Andes Escondidos' en Chavezpamba, que ofrece un domo de lujo con jacuzzi y desayuno agroecológico por $120 USD/noche. También disponemos de la 'Hostería Sol de Minas' en Minas. Puedes revisar detalles en la pestaña de 'Negocios'.";
    }
    
    if (text.includes('café') || text.includes('cafe') || text.includes('restaurante') || text.includes('fritada') || text.includes('comer') || text.includes('comida')) {
      return "¡La gastronomía de la Ruta Escondida es deliciosa! Te recomiendo 'El Mirador de Alchipichí' en Puéllaro (comida típica orgánica) y el 'Café de Especialidad Andino' en Perucho (café cosechado a 2100 msnm). Encuéntralos en nuestra sección de 'Negocios'.";
    }

    if (text.includes('mandarina') || text.includes('aceite') || text.includes('serum') || text.includes('tienda') || text.includes('comprar') || text.includes('aguacate') || text.includes('fruta')) {
      return "En nuestra Tienda (del campo a tu mesa) puedes adquirir Aceite Extra Virgen de Aguacate ($7.50), Sérum Facial ($6.50), Mandarinas Frescas de Alchipichí ($3.00/kg) e infusiones orgánicas. ¡Agrega tus productos al carrito y coordinamos el envío directo!";
    }

    if (text.includes('llegar') || text.includes('como llego') || text.includes('cómo llego') || text.includes('ruta') || text.includes('distancia') || text.includes('bus') || text.includes('auto')) {
      return "La Ruta Escondida está a solo 1.5 horas al norte de Quito. En auto, toma la Panamericana Norte hacia Guayllabamba y desvíate a Puéllaro. En bus, puedes tomar las cooperativas 'Minas' o 'Flor de Valle' desde la Terminal Carcelén.";
    }

    if (text.includes('puellaro') || text.includes('perucho') || text.includes('chavezpamba') || text.includes('atahualpa') || text.includes('minas')) {
      return "La Ruta Escondida une 5 bellas parroquias: Puéllaro (jardín frutal), Perucho (iglesia histórica y mandarinas), Chavezpamba (miradores), Atahualpa (bosques nublados y cascadas), y San José de Minas (aventuras de montaña). ¡Todas con un clima templado y acogedor!";
    }

    if (text.includes('gratis') || text.includes('free') || text.includes('plan') || text.includes('suscripcion') || text.includes('precio') || text.includes('saas')) {
      return "Para emprendedores rurales, ofrecemos 3 planes SaaS en Ruta Escondida: Plan FREE (directorio básico, 3 fotos), Plan BÁSICO ($35/mes, hasta 10 fotos, catálogo de productos) y Plan PREMIUM ($180/mes, reservas directas, videos, IA y estadísticas).";
    }

    if (text.includes('reserva') || text.includes('reservar') || text.includes('calendario') || text.includes('cupo')) {
      return "Para reservar una experiencia o estadía, dirígete a la pestaña 'Negocios', selecciona el negocio que te interesa y haz clic en 'Ver Detalles'. Si el negocio tiene plan Premium, podrás reservar directamente llenando un formulario en línea.";
    }

    return "¡Excelente pregunta! Ruta Escondida es un corredor turístico sostenible en el norte de Pichincha. ¿Deseas información específica sobre alguna parroquia, la Tienda local, o quieres saber cómo afiliar tu negocio al sistema?";
  };

  const handleClientGeminiFallback = async (userText) => {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "AIzaSyBa5ROukjBsVcrgvno4GSgvOiTYO1rDmf0";
    if (!apiKey) {
      const fallbackText = getAiResponse(userText);
      setMessages(prev => [...prev, { sender: 'ai', text: fallbackText }]);
      return;
    }

    try {
      const path = typeof window !== 'undefined' ? window.location.pathname : '/';
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [
              ...messages.slice(-4).map(msg => ({
                role: msg.sender === 'user' ? 'user' : 'model',
                parts: [{ text: msg.text }]
              })),
              { role: 'user', parts: [{ text: userText }] }
            ],
            systemInstruction: {
              parts: [{ text: `
                Eres el Asistente Virtual de "Ruta Escondida", un corredor turístico en Pichincha, Ecuador (Puéllaro, Perucho, Chavezpamba, Atahualpa, San José de Minas).
                Usa un tono cálido ecuatoriano, sé breve (máximo 2 párrafos). Actualmente el usuario está en la página: "${path}".
                Recomienda Glamping Andes Escondidos ($120/noche en Chavezpamba) o comida en El Mirador de Alchipichí (Puéllaro) si es pertinente.
                Sugiere navegar con enlaces: [Cueva de los Tayos](/tayos), [Ruta del Agua](/sendero-agua), [Negocios](/negocios).
              ` }]
            },
            generationConfig: {
              maxOutputTokens: 350,
              temperature: 0.7
            }
          })
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        const reply = responseData.candidates?.[0]?.content?.parts?.[0]?.text || "No pude procesar la respuesta.";
        setMessages(prev => [...prev, { sender: 'ai', text: reply }]);
      } else {
        const fallbackText = getAiResponse(userText);
        setMessages(prev => [...prev, { sender: 'ai', text: fallbackText }]);
      }
    } catch (e) {
      const fallbackText = getAiResponse(userText);
      setMessages(prev => [...prev, { sender: 'ai', text: fallbackText }]);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input;
    const userMessage = { sender: 'user', text: userText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: userText,
          history: messages.slice(-5), // Send last 5 messages for memory context
          currentPage: typeof window !== 'undefined' ? window.location.pathname : '/'
        })
      });

      if (res.ok) {
        const data = await res.json();
        setMessages(prev => [...prev, { sender: 'ai', text: data.text }]);
      } else {
        await handleClientGeminiFallback(userText);
      }
    } catch (error) {
      await handleClientGeminiFallback(userText);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '25px', right: '25px', zIndex: 9999, fontFamily: 'Outfit, sans-serif' }}>
      
      {/* CHAT ICON */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          style={{
            background: 'var(--verde-andes)',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(27,67,50,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            transition: 'all 0.3s ease'
          }}
          title="Asistente de IA de Ruta Escondida"
        >
          💬
        </button>
      )}

      {/* CHAT WINDOW */}
      {isOpen && (
        <div style={{
          width: '350px',
          height: '480px',
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 12px 36px rgba(0,0,0,0.15)',
          border: '1px solid rgba(27,67,50,0.1)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'slideUp 0.3s ease'
        }}>
          
          {/* Header */}
          <div style={{
            background: 'var(--verde-andes)',
            padding: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#fff'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '20px' }}>🌿</span>
              <div>
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>Guía Virtual Ruta Escondida</h4>
                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)' }}>En línea • Asistente de IA</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '18px', cursor: 'pointer' }}
            >
              ✕
            </button>
          </div>

          {/* Messages body */}
          <div style={{
            flex: 1,
            padding: '15px',
            overflowY: 'auto',
            background: '#F9F8F6',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {messages.map((m, idx) => (
              <div 
                key={idx} 
                style={{
                  alignSelf: m.sender === 'ai' ? 'flex-start' : 'flex-end',
                  background: m.sender === 'ai' ? '#fff' : 'var(--verde-medio)',
                  color: m.sender === 'ai' ? '#1B352B' : '#fff',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  maxWidth: '85%',
                  fontSize: '13px',
                  lineHeight: '1.5',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                  border: m.sender === 'ai' ? '1px solid rgba(27,67,50,0.05)' : 'none'
                }}
              >
                {m.text}
              </div>
            ))}
            {isLoading && (
              <div style={{
                alignSelf: 'flex-start',
                background: '#fff',
                color: '#888',
                padding: '10px 14px',
                borderRadius: '12px',
                maxWidth: '85%',
                fontSize: '13px',
                fontStyle: 'italic',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                border: '1px solid rgba(27,67,50,0.05)',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                <span className="typing-dot">●</span>
                <span className="typing-dot" style={{ animationDelay: '0.2s' }}>●</span>
                <span className="typing-dot" style={{ animationDelay: '0.4s' }}>●</span>
                Escribiendo...
              </div>
            )}
          </div>

          {/* Input Footer */}
          <form 
            onSubmit={handleSend}
            style={{
              padding: '12px',
              borderTop: '1px solid rgba(0,0,0,0.05)',
              display: 'flex',
              gap: '8px',
              background: '#fff'
            }}
          >
            <input 
              type="text" 
              placeholder="Pregúntame algo..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                flex: 1,
                padding: '10px 14px',
                border: '1px solid rgba(27,67,50,0.15)',
                borderRadius: '8px',
                outline: 'none',
                fontSize: '13px',
                fontFamily: 'Outfit'
              }}
            />
            <button 
              type="submit"
              style={{
                background: 'var(--verde-andes)',
                color: '#fff',
                border: 'none',
                padding: '0 16px',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '13px'
              }}
            >
              Enviar
            </button>
          </form>
          
        </div>
      )}
      
      <style jsx global>{`
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes typingBlink {
          0% { opacity: 0.2; }
          20% { opacity: 1; }
          100% { opacity: 0.2; }
        }
        .typing-dot {
          display: inline-block;
          font-size: 8px;
          color: var(--verde-medio);
          animation: typingBlink 1.4s infinite both;
        }
      `}</style>
    </div>
  );
}
