
import React, { useState } from 'react';
import { Product, Size } from '../types';

interface AdminPanelProps {
  products: Product[];
  onAddProduct: (p: Omit<Product, 'id' | 'createdAt'>) => void;
  onDeleteProduct: (id: string) => void;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ products, onAddProduct, onDeleteProduct, onClose }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    category: 'Buzos',
    sizes: [] as Size[]
  });

  const handleSizeToggle = (size: Size) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size) 
        ? prev.sizes.filter(s => s !== size) 
        : [...prev.sizes, size]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProduct(formData);
    setFormData({ name: '', description: '', price: 0, imageUrl: '', category: 'Buzos', sizes: [] });
    setShowAddForm(false);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-5xl h-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        <div className="p-8 border-b flex justify-between items-center bg-zinc-50">
          <div>
            <h2 className="text-2xl font-semibold uppercase tracking-widest">Panel de Gestión</h2>
            <p className="text-xs text-zinc-500 mt-1">Administración de catálogo ORAU</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-zinc-200 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          {!showAddForm ? (
            <>
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-sm font-bold uppercase tracking-widest">Productos Actuales ({products.length})</h3>
                <button 
                  onClick={() => setShowAddForm(true)}
                  className="bg-brand-taupe text-white px-6 py-3 text-[10px] uppercase tracking-widest hover:bg-zinc-800 transition-colors"
                >
                  + Agregar Producto
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <div key={product.id} className="border p-4 flex gap-4 items-start group relative">
                    <img src={product.imageUrl} className="w-20 h-24 object-cover" />
                    <div className="flex-1">
                      <h4 className="text-xs font-bold uppercase">{product.name}</h4>
                      <p className="text-[10px] text-zinc-500 mt-1">{product.price}€</p>
                      <p className="text-[8px] mt-2 uppercase text-zinc-400">Talles: {product.sizes.join(', ')}</p>
                    </div>
                    <button 
                      onClick={() => onDeleteProduct(product.id)}
                      className="text-red-400 hover:text-red-600 p-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
              <h3 className="text-lg font-bold uppercase tracking-widest mb-8 text-center">Nuevo Producto</h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-zinc-500">Nombre</label>
                  <input 
                    required 
                    className="w-full border-b border-zinc-300 py-2 focus:border-brand-taupe outline-none"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-zinc-500">Precio (€)</label>
                  <input 
                    required 
                    type="number"
                    className="w-full border-b border-zinc-300 py-2 focus:border-brand-taupe outline-none"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-zinc-500">Descripción</label>
                <textarea 
                  required 
                  rows={3}
                  className="w-full border border-zinc-300 p-3 focus:border-brand-taupe outline-none"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-zinc-500">MIME/URL Imagen (Cloudinary Sim)</label>
                <input 
                  required 
                  className="w-full border-b border-zinc-300 py-2 focus:border-brand-taupe outline-none"
                  placeholder="https://images.cloudinary.com/..."
                  value={formData.imageUrl}
                  onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-zinc-500 mb-2 block">Talles Disponibles</label>
                <div className="flex flex-wrap gap-3">
                  {Object.values(Size).map(size => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleSizeToggle(size)}
                      className={`px-4 py-2 text-xs border tracking-widest transition-all ${formData.sizes.includes(size) ? 'bg-brand-taupe text-white border-brand-taupe' : 'bg-white border-zinc-300 hover:border-brand-taupe'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-8">
                <button 
                  type="button" 
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 border border-zinc-300 py-4 text-[10px] uppercase tracking-widest hover:bg-zinc-50 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="flex-1 bg-black text-white py-4 text-[10px] uppercase tracking-widest hover:bg-zinc-800 transition-colors shadow-lg"
                >
                  Confirmar y Subir
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
