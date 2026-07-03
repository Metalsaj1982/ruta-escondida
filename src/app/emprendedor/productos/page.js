"use client";

import { useState, useEffect } from 'react';
import { dbManager } from '../../../lib/db';

export default function EmprendedorProductos() {
  const [biz, setBiz] = useState(null);
  const [products, setProducts] = useState([]);
  
  // Form State
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');
  const [type, setType] = useState('producto');

  useEffect(() => {
    async function loadData() {
      const activeBizId = localStorage.getItem('active_business_id') || 'glamping';
      const business = await dbManager.getBusinessById(activeBizId);
      setBiz(business);
      if (business) {
        const prodList = await dbManager.getProductsByBusiness(business.id);
        setProducts(prodList);
      }
    }
    loadData();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!biz) return;
    
    // Safety check for Plan Free
    if (biz.subscription_plan === 'free') {
      alert("Tu plan actual (FREE) no permite la publicación de productos o promociones. Por favor actualiza tu plan en el dashboard.");
      return;
    }

    if (!name || !price || !desc) {
      alert("Por favor completa todos los campos.");
      return;
    }

    const newProd = {
      id: `p-${Date.now()}`,
      business_id: biz.id,
      name,
      price: parseFloat(price),
      description: desc,
      type
    };

    await dbManager.addProduct(newProd);
    setProducts([...products, newProd]);
    
    // Clear form
    setName('');
    setPrice('');
    setDesc('');
    alert("¡Producto publicado en el Marketplace!");
  };

  const handleDeleteProduct = async (id) => {
    await dbManager.deleteProduct(id);
    setProducts(products.filter(p => p.id !== id));
    alert("Producto eliminado.");
  };

  if (!biz) return <div style={{ color: 'var(--texto)' }}>Cargando Productos...</div>;

  const isFreePlan = biz.subscription_plan === 'free';

  return (
    <div style={{ color: 'var(--texto)', fontFamily: 'Outfit, sans-serif' }}>
      <h1 style={{ fontFamily: 'Playfair Display', color: 'var(--verde-andes)', fontSize: '28px', fontWeight: 'bold', marginBottom: '10px' }}>
        Mis Productos y Promociones
      </h1>
      <p style={{ color: 'var(--texto)', opacity: 0.85, fontSize: '14px', marginBottom: '30px' }}>
        Administra el catálogo de servicios, paquetes, tours o productos físicos que se muestran en el Marketplace público.
      </p>

      {isFreePlan && (
        <div style={{ background: 'rgba(217,83,79,0.1)', border: '1px solid rgba(217,83,79,0.3)', borderRadius: '8px', padding: '15px', color: '#D9534F', fontWeight: 'bold', fontSize: '13px', marginBottom: '30px' }}>
          ⚠️ Tu cuenta está en el Plan FREE. La publicación de productos y promociones está deshabilitada. Actualiza a Plan BÁSICO o PREMIUM en el panel de Resumen para poder vender.
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '30px' }} className="productos-layout">
        
        {/* ADD PRODUCT FORM */}
        <div style={{ background: 'var(--crema)', border: '1px solid rgba(27,67,50,0.12)', borderRadius: '12px', padding: '24px', height: 'fit-content', boxShadow: '0 4px 15px rgba(27,67,50,0.02)' }}>
          <h3 style={{ fontFamily: 'Playfair Display', color: 'var(--verde-andes)', fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>Publicar en el Marketplace</h3>
          
          <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: 'var(--verde-andes)', marginBottom: '6px' }}>Nombre del Artículo / Servicio</label>
              <input 
                type="text" 
                disabled={isFreePlan}
                placeholder="Ej: Domo Glamping, Torta de Cítricos..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '10px', 
                  background: '#fff', 
                  border: '1px solid rgba(27,67,50,0.2)', 
                  borderRadius: '6px', 
                  color: 'var(--texto)', 
                  fontFamily: 'Outfit',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: 'var(--verde-andes)', marginBottom: '6px' }}>Precio ($ USD)</label>
                <input 
                  type="number" 
                  step="0.01"
                  disabled={isFreePlan}
                  placeholder="25.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  style={{ 
                    width: '100%', 
                    padding: '10px', 
                    background: '#fff', 
                    border: '1px solid rgba(27,67,50,0.2)', 
                    borderRadius: '6px', 
                    color: 'var(--texto)', 
                    fontFamily: 'Outfit',
                    outline: 'none'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: 'var(--verde-andes)', marginBottom: '6px' }}>Tipo de Oferta</label>
                <select 
                  disabled={isFreePlan}
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  style={{ 
                    width: '100%', 
                    padding: '10px', 
                    background: '#fff', 
                    border: '1px solid rgba(27,67,50,0.2)', 
                    borderRadius: '6px', 
                    color: 'var(--texto)', 
                    fontFamily: 'Outfit', 
                    fontWeight: 'bold',
                    outline: 'none'
                  }}
                >
                  <option value="producto">🛍️ Producto regular</option>
                  <option value="promocion">🏷️ Promoción especial</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: 'var(--verde-andes)', marginBottom: '6px' }}>Descripción Corta</label>
              <textarea 
                rows="3"
                disabled={isFreePlan}
                placeholder="Detalla lo que incluye este producto o servicio..."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '10px', 
                  background: '#fff', 
                  border: '1px solid rgba(27,67,50,0.2)', 
                  borderRadius: '6px', 
                  color: 'var(--texto)', 
                  fontFamily: 'Outfit', 
                  resize: 'none',
                  outline: 'none'
                }}
              />
            </div>

            <button 
              type="submit"
              disabled={isFreePlan}
              style={{
                width: '100%',
                padding: '12px',
                background: isFreePlan ? 'rgba(27,67,50,0.1)' : 'var(--verde-andes)',
                color: isFreePlan ? 'rgba(27,67,50,0.4)' : '#fff',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 'bold',
                cursor: isFreePlan ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s'
              }}
            >
              Publicar Artículo
            </button>
          </form>
        </div>

        {/* PRODUCTS LIST */}
        <div style={{ background: 'var(--crema)', border: '1px solid rgba(27,67,50,0.12)', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 15px rgba(27,67,50,0.02)' }}>
          <h3 style={{ fontFamily: 'Playfair Display', color: 'var(--verde-andes)', fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>Catálogo Activo</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {products.length === 0 ? (
              <p style={{ color: 'var(--texto)', opacity: 0.6, fontStyle: 'italic' }}>Aún no has registrado ningún producto.</p>
            ) : (
              products.map(prod => (
                <div key={prod.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', border: '1px solid rgba(27,67,50,0.08)', borderRadius: '8px', padding: '15px' }}>
                  <div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ fontSize: '10px', background: prod.type === 'promocion' ? 'rgba(212,175,55,0.15)' : 'rgba(27,67,50,0.08)', color: prod.type === 'promocion' ? 'var(--verde-medio)' : 'var(--texto)', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold', letterSpacing: '0.5px' }}>
                        {prod.type.toUpperCase()}
                      </span>
                      <strong style={{ color: 'var(--verde-andes)', fontSize: '14px' }}>{prod.name}</strong>
                    </div>
                    <p style={{ margin: 0, fontSize: '12px', color: 'var(--texto)', opacity: 0.85 }}>{prod.description}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <span style={{ color: 'var(--verde-medio)', fontWeight: 'bold', fontSize: '15px' }}>${prod.price.toFixed(2)}</span>
                    <button 
                      onClick={() => handleDeleteProduct(prod.id)}
                      style={{ background: 'transparent', border: 'none', color: '#ff6b6b', cursor: 'pointer', fontSize: '14px' }}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .productos-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
