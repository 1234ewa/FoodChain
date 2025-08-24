'use client'

import { useState, useEffect } from 'react';
import { ConnectButton } from "@/components/ConnectButton";
import { InfoList } from "@/components/InfoList";
import { ActionButtonList } from "@/components/ActionButtonList";
import Image from 'next/image';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [showMain, setShowMain] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [activeCategory, setActiveCategory] = useState('todas');

  // Productos con sus categorías (13 productos total)
  const products = [
    {
      id: 1,
      name: "Manzanas Rojas",
      image: "/img/manzana roja.jpg",
      rating: 4.5,
      reviews: 128,
      category: "Frutas Frescas",
      categoryFilter: "frutas",
      ethPrice: "0.002",
      usdPrice: "3.5"
    },
    {
      id: 2,
      name: "Plátanos",
      image: "/img/platano.jpg",
      rating: 4.3,
      reviews: 95,
      category: "Frutas Frescas",
      categoryFilter: "frutas",
      ethPrice: "0.0015",
      usdPrice: "2.8"
    },
    {
      id: 3,
      name: "Tomates Orgánicos",
      image: "/img/jitomate.jpg",
      rating: 4.7,
      reviews: 203,
      category: "Verduras Orgánicas",
      categoryFilter: "verduras",
      ethPrice: "0.003",
      usdPrice: "4.2"
    },
    {
      id: 4,
      name: "Lechuga Romana",
      image: "/img/lechuga.jpg",
      rating: 4.2,
      reviews: 87,
      category: "Verduras Frescas",
      categoryFilter: "verduras",
      ethPrice: "0.0018",
      usdPrice: "2.1"
    },
    {
      id: 5,
      name: "Fresas Orgánicas",
      image: "/img/fresas.jpg",
      rating: 4.6,
      reviews: 156,
      category: "Frutas Frescas",
      categoryFilter: "frutas",
      ethPrice: "0.0025",
      usdPrice: "3.8"
    },
    {
      id: 6,
      name: "Zanahorias",
      image: "/img/zanahoria.jpg",
      rating: 4.4,
      reviews: 92,
      category: "Verduras Frescas",
      categoryFilter: "verduras",
      ethPrice: "0.0012",
      usdPrice: "1.9"
    },
    {
      id: 7,
      name: "Uvas Frescas",
      image: "/img/uva.jpg",
      rating: 4.8,
      reviews: 134,
      category: "Frutas Frescas",
      categoryFilter: "frutas",
      ethPrice: "0.0032",
      usdPrice: "4.8"
    },
    {
      id: 8,
      name: "Aguacate",
      image: "/img/aguacate.jpg",
      rating: 4.1,
      reviews: 78,
      category: "Frutas Frescas",
      categoryFilter: "frutas",
      ethPrice: "0.0028",
      usdPrice: "4.0"
    },
    {
      id: 9,
      name: "Papaya",
      image: "/img/papaya.jpg",
      rating: 4.3,
      reviews: 65,
      category: "Frutas Frescas",
      categoryFilter: "frutas",
      ethPrice: "0.0035",
      usdPrice: "5.2"
    },
    {
      id: 10,
      name: "Piña",
      image: "/img/piña.jpg",
      rating: 4.6,
      reviews: 112,
      category: "Frutas Frescas",
      categoryFilter: "frutas",
      ethPrice: "0.004",
      usdPrice: "6.0"
    },
    {
      id: 11,
      name: "Brócoli",
      image: "/img/brocoli.jpg",
      rating: 4.0,
      reviews: 89,
      category: "Verduras Frescas",
      categoryFilter: "verduras",
      ethPrice: "0.0022",
      usdPrice: "3.3"
    },
    {
      id: 12,
      name: "Papas",
      image: "/img/papa.jpg",
      rating: 4.2,
      reviews: 156,
      category: "Verduras Frescas",
      categoryFilter: "verduras",
      ethPrice: "0.0018",
      usdPrice: "2.7"
    },
    {
      id: 13,
      name: "Elote",
      image: "/img/elote.jpg",
      rating: 4.4,
      reviews: 98,
      category: "Verduras Frescas",
      categoryFilter: "verduras",
      ethPrice: "0.0025",
      usdPrice: "3.7"
    }
  ];

  // Filtrar productos según la categoría seleccionada
  const filteredProducts = activeCategory === 'todas' 
    ? products 
    : products.filter(product => product.categoryFilter === activeCategory);

  useEffect(() => {
    // Splash screen animation
    const timer = setTimeout(() => {
      setShowSplash(false);
      setTimeout(() => setShowMain(true), 500);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <div className="splash-screen">
        <div className="splash-content">
          <div className="logo-container">
            <div className="foodchain-logo">
              <img src="/img/logoo.jpg" alt="FoodChain Logo" className="splash-logo" />
              <div className="logo-glow"></div>
            </div>
          </div>
          <div className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`foodchain-app ${showMain ? 'fade-in' : ''}`}>
      {/* Header */}
      <header className="foodchain-header">
        <div className="header-content">
          <div className="header-left">
            <div className="logo-section">
              <div className="app-logo">
                <img src="/img/logoo.jpg" alt="FoodChain" className="header-logo" />
              </div>
              <h1 className="app-title">FoodChain</h1>
            </div>
          </div>
          <div className="header-right">
            <div className="user-profile">
              <div className="profile-avatar">
                <span className="avatar-initial">U</span>
              </div>
              <div className="profile-info">
                <span className="user-name">Usuario</span>
                <div className="progress-container">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '60%' }}></div>
                  </div>
                  <span className="progress-text">3/5 compras - 30% descuento</span>
                </div>
              </div>
            </div>
            <ConnectButton />
          </div>
        </div>
      </header>

      

      {/* Categories Section */}
      <section className="categories-section">
        <h2 className="section-title">Categorías</h2>
        <div className="categories-buttons">
          <button 
            className={`category-btn ${activeCategory === 'todas' ? 'active' : ''}`}
            onClick={() => setActiveCategory('todas')}
          >
            Todas
          </button>
          <button 
            className={`category-btn ${activeCategory === 'frutas' ? 'active' : ''}`}
            onClick={() => setActiveCategory('frutas')}
          >
            Frutas
          </button>
          <button 
            className={`category-btn ${activeCategory === 'verduras' ? 'active' : ''}`}
            onClick={() => setActiveCategory('verduras')}
          >
            Verduras
          </button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <h2 className="section-title">Productos Destacados</h2>
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <div className="product-rating">
                  <span className="rating-stars">⭐ {product.rating} ({product.reviews})</span>
                </div>
                <div className="product-category">{product.category}</div>
                <div className="price-container">
                  <span className="eth-price">{product.ethPrice} ETH</span>
                  <span className="usd-price">${product.usdPrice}</span>
                </div>
                                 <button className="location-btn" onClick={() => window.location.href = `/location/${product.id}`}>IR</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shopping Cart FAB */}
      <div className="cart-fab">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17C17 17.6 16.6 18 16 18H8C7.4 18 7 17.6 7 17V13H17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="cart-count">3</span>
      </div>

             {/* Bottom Navigation */}
       <nav className="bottom-nav">
         <div 
           className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
           onClick={() => setActiveTab('home')}
         >
           <svg className="nav-icon" viewBox="0 0 24 24" fill="none">
             <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
             <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
           </svg>
           <span>Inicio</span>
         </div>
         
         <div 
           className={`nav-item ${activeTab === 'transactions' ? 'active' : ''}`}
           onClick={() => window.location.href = '/transactions'}
         >
           <svg className="nav-icon" viewBox="0 0 24 24" fill="none">
             <rect x="1" y="4" width="22" height="16" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
             <line x1="1" y1="10" x2="23" y2="10" stroke="currentColor" strokeWidth="2"/>
           </svg>
           <span>Transacciones</span>
         </div>
         
         <div 
           className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
           onClick={() => window.location.href = '/profile'}
         >
           <svg className="nav-icon" viewBox="0 0 24 24" fill="none">
             <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
             <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
           </svg>
           <span>Perfil</span>
         </div>
       </nav>
    </div>
  );
}