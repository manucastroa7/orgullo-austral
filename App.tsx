
import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import AdminPanel from './components/AdminPanel';
import { Product, Size, AuthState } from './types';
import { INITIAL_PRODUCTS } from './services/mockData';
import { SOL_DE_MAYO_SVG } from './constants';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false
  });

  const [loginForm, setLoginForm] = useState({ username: '', password: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === 'admin' && loginForm.password === 'admin') {
      setAuth({
        user: { id: '1', username: 'admin', role: 'admin' },
        token: 'fake-jwt-token',
        isAuthenticated: true
      });
      setShowLogin(false);
      setIsAdminOpen(true);
    } else {
      alert('Credenciales incorrectas');
    }
  };

  const addProduct = (newP: Omit<Product, 'id' | 'createdAt'>) => {
    const product: Product = {
      ...newP,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };
    setProducts([product, ...products]);
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen">
      <Navbar 
        onAdminClick={() => auth.isAuthenticated ? setIsAdminOpen(true) : setShowLogin(true)}
        isAdmin={auth.isAuthenticated}
        onLogout={() => setAuth({ user: null, token: null, isAuthenticated: false })}
      />

      {/* Hero Section */}
      <section className="h-screen relative overflow-hidden flex items-center justify-center bg-[#FDFCF9]">
        {/* LARGE GOLD SUN BACKGROUND ELEMENT - Authentic Argentine Sun */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#C5A059] opacity-[0.05] pointer-events-none z-0">
          {SOL_DE_MAYO_SVG("w-[700px] h-[700px] md:w-[900px] md:h-[900px] animate-[spin_120s_linear_infinite]")}
        </div>

        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/orau-hero/1920/1080?grayscale" 
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        
        <div className="relative z-10 text-center px-6">
          <div className="flex justify-center mb-8 text-[#C5A059] sun-glow">
            {SOL_DE_MAYO_SVG("w-16 h-16")}
          </div>
          <span className="text-[10px] uppercase tracking-[0.5em] text-brand-taupe font-bold mb-4 block animate-fade-in">
            España & Argentina unidos
          </span>
          <h2 className="text-5xl md:text-8xl font-light tracking-tighter brand-font mb-8">
            Orgullo Austral
          </h2>
          <p className="max-w-xl mx-auto text-zinc-500 text-sm md:text-lg leading-relaxed font-light tracking-[0.2em] mb-12">
            No es distancia. Es perspectiva. <br />
            Identidad sutil que te acompaña donde estés.
          </p>
          <a 
            href="#products" 
            className="inline-block border border-black px-12 py-5 text-[10px] uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-500 font-medium bg-white/50 backdrop-blur-sm"
          >
            Explorar Colección
          </a>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[8px] uppercase tracking-[0.3em] text-zinc-400">Descubre más</span>
          <div className="animate-bounce">
            <svg className="w-5 h-5 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* About / Identity Section */}
      <section id="about" className="py-32 px-6 bg-white relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute -top-10 -left-10 text-[#C5A059] opacity-[0.06] -z-10">
               {SOL_DE_MAYO_SVG("w-56 h-56")}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://picsum.photos/seed/texture1/400/600" className="w-full h-auto grayscale" />
              <img src="https://picsum.photos/seed/texture2/400/500" className="w-full h-auto mt-12" />
            </div>
          </div>
          <div className="space-y-8">
            <div className="text-[#C5A059]">
              {SOL_DE_MAYO_SVG("w-12 h-12")}
            </div>
            <h3 className="text-4xl brand-font leading-tight">Un detalle que reconocés sin que nadie te lo explique.</h3>
            <div className="w-20 h-px bg-brand-taupe"></div>
            <p className="text-zinc-500 leading-loose text-lg font-light">
              ORAU nace de la necesidad de llevar nuestras raíces de una manera contemporánea. 
              Minimalismo, texturas limpias y una simbología que viaja con vos. 
              No hacemos ropa con banderas, hacemos identidad sutil bordada en oro mate.
            </p>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section id="products" className="py-32 px-6 bg-brand-cream relative overflow-hidden">
         {/* Subtle pattern background */}
         <div className="absolute top-0 right-0 p-20 text-[#C5A059] opacity-[0.03] pointer-events-none">
            {SOL_DE_MAYO_SVG("w-96 h-96")}
         </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4">
            <div>
              <h2 className="text-5xl brand-font">Nueva Temporada</h2>
              <p className="text-xs uppercase tracking-[0.4em] text-brand-taupe mt-4 font-bold">Identidad Austral • Invierno 2025</p>
            </div>
            <div className="flex space-x-8 text-[10px] uppercase tracking-widest border-b border-zinc-200 pb-2">
              <button className="font-bold border-b-2 border-brand-taupe pb-2">Todos</button>
              <button className="hover:text-brand-taupe transition-colors pb-2">Buzos</button>
              <button className="hover:text-brand-taupe transition-colors pb-2">Remeras</button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            {products.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onClick={setSelectedProduct} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 text-white py-24 px-6 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 text-white opacity-[0.02] translate-y-1/2 translate-x-1/4">
           {SOL_DE_MAYO_SVG("w-[600px] h-[600px]")}
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-4 mb-8">
              <h4 className="brand-font text-4xl">ORAU</h4>
              <div className="text-[#C5A059]">
                 {SOL_DE_MAYO_SVG("w-8 h-8")}
              </div>
            </div>
            <p className="text-zinc-500 max-w-sm text-sm leading-loose tracking-wide font-light">
              Orgullo Austral es una marca de indumentaria casual moderna creada en España con identidad argentina en cada detalle. Diseño minimalista con alma austral.
            </p>
          </div>
          <div>
            <h5 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8 text-zinc-400">Contacto</h5>
            <ul className="space-y-4 text-sm text-zinc-300 font-light">
              <li className="hover:text-[#C5A059] transition-colors cursor-pointer">hola@orau.es</li>
              <li>Madrid, España</li>
              <li className="hover:text-[#C5A059] transition-colors cursor-pointer">@orgullo.austral</li>
            </ul>
          </div>
          <div>
            <h5 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8 text-zinc-400">Ayuda</h5>
            <ul className="space-y-4 text-sm text-zinc-300 font-light">
              <li className="hover:underline cursor-pointer">Guía de Talles</li>
              <li className="hover:underline cursor-pointer">Envíos y Devoluciones</li>
              <li className="hover:underline cursor-pointer">Términos y Condiciones</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-zinc-900 flex justify-between items-center text-[10px] uppercase tracking-[0.2em] text-zinc-600">
          <p>© 2025 ORAU - ORGULLO AUSTRAL | ESPAÑA</p>
          <div className="flex space-x-8">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">TikTok</a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setSelectedProduct(null)} />
          <div className="relative bg-white w-full max-w-4xl h-full max-h-[90vh] md:max-h-[80vh] overflow-hidden flex flex-col md:flex-row shadow-2xl">
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-6 right-6 z-20 p-2 bg-white/50 backdrop-blur-md hover:bg-white rounded-full transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            <div className="md:w-1/2 h-80 md:h-auto overflow-hidden relative">
              <img src={selectedProduct.imageUrl} className="w-full h-full object-cover" />
              <div className="absolute top-8 left-8 text-[#C5A059] p-3 bg-white/20 backdrop-blur-md rounded-full shadow-lg">
                {SOL_DE_MAYO_SVG("w-10 h-10")}
              </div>
            </div>
            <div className="md:w-1/2 p-10 md:p-14 flex flex-col justify-center bg-[#FDFCF9]">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] uppercase tracking-widest text-zinc-400">{selectedProduct.category}</span>
                <div className="text-[#C5A059]">
                   {SOL_DE_MAYO_SVG("w-4 h-4")}
                </div>
              </div>
              <h2 className="text-4xl brand-font mb-4">{selectedProduct.name}</h2>
              <p className="text-2xl font-light mb-8 text-brand-taupe">{selectedProduct.price}€</p>
              <p className="text-zinc-500 text-sm leading-loose mb-10 font-light tracking-wide italic">
                {selectedProduct.description}
              </p>
              
              <div className="mb-12">
                <p className="text-[10px] uppercase tracking-widest font-bold mb-6 text-zinc-400">Seleccionar Talle</p>
                <div className="flex flex-wrap gap-4">
                  {selectedProduct.sizes.map(size => (
                    <button key={size} className="w-14 h-14 border border-zinc-200 text-[10px] font-bold tracking-widest hover:border-black hover:bg-zinc-50 transition-all uppercase">
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <button className="w-full bg-black text-white py-5 text-[10px] uppercase tracking-[0.4em] font-medium hover:bg-zinc-800 transition-all shadow-xl">
                Añadir al Carrito
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowLogin(false)} />
          <div className="relative bg-white p-12 max-w-md w-full shadow-2xl text-center">
            <div className="flex justify-center mb-8 text-[#C5A059]">
               {SOL_DE_MAYO_SVG("w-14 h-14")}
            </div>
            <h3 className="text-2xl brand-font mb-8 uppercase tracking-widest">Acceso Gestión</h3>
            <form onSubmit={handleLogin} className="space-y-6">
              <input 
                type="text" 
                placeholder="USUARIO"
                required
                className="w-full border-b border-zinc-300 py-4 text-[10px] tracking-widest focus:border-brand-taupe outline-none transition-colors uppercase"
                value={loginForm.username}
                onChange={e => setLoginForm({...loginForm, username: e.target.value})}
              />
              <input 
                type="password" 
                placeholder="CONTRASEÑA"
                required
                className="w-full border-b border-zinc-300 py-4 text-[10px] tracking-widest focus:border-brand-taupe outline-none transition-colors uppercase"
                value={loginForm.password}
                onChange={e => setLoginForm({...loginForm, password: e.target.value})}
              />
              <button className="w-full bg-brand-taupe text-white py-4 text-[10px] uppercase tracking-[0.3em] font-bold mt-8 shadow-lg hover:bg-zinc-800 transition-all">
                Ingresar
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Admin Panel Modal */}
      {isAdminOpen && auth.isAuthenticated && (
        <AdminPanel 
          products={products}
          onAddProduct={addProduct}
          onDeleteProduct={deleteProduct}
          onClose={() => setIsAdminOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
