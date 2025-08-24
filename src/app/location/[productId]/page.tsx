'use client'

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ConnectButton } from "@/components/ConnectButton";
import { useAccount } from 'wagmi';

export default function LocationPage() {
  const params = useParams();
  const productId = params.productId;
  const { address, isConnected } = useAccount();
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showQuantityModal, setShowQuantityModal] = useState(false);

  // Datos del producto
  const products = [
    {
      id: 1,
      name: "Manzanas Rojas",
      image: "/img/manzana roja.jpg",
      ethPrice: "0.002",
      usdPrice: "3.5"
    },
    {
      id: 2,
      name: "Plátanos",
      image: "/img/platano.jpg",
      ethPrice: "0.0015",
      usdPrice: "2.8"
    },
    {
      id: 3,
      name: "Tomates Orgánicos",
      image: "/img/jitomate.jpg",
      ethPrice: "0.003",
      usdPrice: "4.2"
    },
    {
      id: 4,
      name: "Lechuga Romana",
      image: "/img/lechuga.jpg",
      ethPrice: "0.0018",
      usdPrice: "2.1"
    },
    {
      id: 5,
      name: "Fresas Orgánicas",
      image: "/img/fresas.jpg",
      ethPrice: "0.0025",
      usdPrice: "3.8"
    },
    {
      id: 6,
      name: "Zanahorias",
      image: "/img/zanahoria.jpg",
      ethPrice: "0.0012",
      usdPrice: "1.9"
    },
    {
      id: 7,
      name: "Uvas Frescas",
      image: "/img/uva.jpg",
      ethPrice: "0.0032",
      usdPrice: "4.8"
    },
    {
      id: 8,
      name: "Aguacate",
      image: "/img/aguacate.jpg",
      ethPrice: "0.0028",
      usdPrice: "4.0"
    },
    {
      id: 9,
      name: "Papaya",
      image: "/img/papaya.jpg",
      ethPrice: "0.0035",
      usdPrice: "5.2"
    },
    {
      id: 10,
      name: "Piña",
      image: "/img/piña.jpg",
      ethPrice: "0.004",
      usdPrice: "6.0"
    },
    {
      id: 11,
      name: "Brócoli",
      image: "/img/brocoli.jpg",
      ethPrice: "0.0022",
      usdPrice: "3.3"
    },
    {
      id: 12,
      name: "Papas",
      image: "/img/papa.jpg",
      ethPrice: "0.0018",
      usdPrice: "2.7"
    },
    {
      id: 13,
      name: "Elote",
      image: "/img/elote.jpg",
      ethPrice: "0.0025",
      usdPrice: "3.7"
    }
  ];

  const currentProduct = products.find(p => p.id === parseInt(productId as string));

  // Mercados mayoristas con ubicaciones y disponibilidad
  const markets = [
    {
      id: 1,
      name: "Central Mayorista de Antioquia",
      location: "Itagüí, Colombia",
      coordinates: { lat: 6.1726, lng: -75.6142 },
      availability: "2,500 kg",
      distance: "15 km",
      rating: 4.5
    },
    {
      id: 2,
      name: "Mercado Mayorista Lo Valledor",
      location: "Santiago, Chile",
      coordinates: { lat: -33.4489, lng: -70.6693 },
      availability: "1,800 kg",
      distance: "8 km",
      rating: 4.3
    },
    {
      id: 3,
      name: "Mercado Central de Buenos Aires",
      location: "Buenos Aires, Argentina",
      coordinates: { lat: -34.6118, lng: -58.3960 },
      availability: "3,200 kg",
      distance: "12 km",
      rating: 4.7
    },
    {
      id: 4,
      name: "Mercado Mayorista de Lima",
      location: "Lima, Perú",
      coordinates: { lat: -12.0464, lng: -77.0428 },
      availability: "2,800 kg",
      distance: "10 km",
      rating: 4.4
    },
    {
      id: 5,
      name: "Mercado Central de Quito",
      location: "Quito, Ecuador",
      coordinates: { lat: -0.2299, lng: -78.5249 },
      availability: "1,500 kg",
      distance: "6 km",
      rating: 4.2
    },
    {
      id: 6,
      name: "Mercado Central de San Salvador",
      location: "San Salvador, El Salvador",
      coordinates: { lat: 13.6929, lng: -89.2182 },
      availability: "1,200 kg",
      distance: "5 km",
      rating: 4.1
    },
    {
      id: 7,
      name: "Central de Abasto de la Ciudad de México (CEDA)",
      location: "Iztapalapa, CDMX",
      coordinates: { lat: 19.4326, lng: -99.1332 },
      availability: "5,000 kg",
      distance: "20 km",
      rating: 4.8
    },
    {
      id: 8,
      name: "Central de Abasto de Ecatepec",
      location: "Estado de México",
      coordinates: { lat: 19.6018, lng: -99.0506 },
      availability: "3,500 kg",
      distance: "25 km",
      rating: 4.6
    },
    {
      id: 9,
      name: "Central de Abasto de Toluca",
      location: "Estado de México",
      coordinates: { lat: 19.2833, lng: -99.6533 },
      availability: "2,200 kg",
      distance: "30 km",
      rating: 4.3
    },
    {
      id: 10,
      name: "Mercado de Abasto de Morelia",
      location: "Michoacán",
      coordinates: { lat: 19.7008, lng: -101.1844 },
      availability: "1,800 kg",
      distance: "35 km",
      rating: 4.4
    },
    {
      id: 11,
      name: "Central de Abasto de Cuautla",
      location: "Morelos",
      coordinates: { lat: 18.8126, lng: -98.9553 },
      availability: "1,500 kg",
      distance: "40 km",
      rating: 4.2
    },
    {
      id: 12,
      name: "Central de Abasto de Acapulco",
      location: "Guerrero",
      coordinates: { lat: 16.8531, lng: -99.8237 },
      availability: "2,800 kg",
      distance: "45 km",
      rating: 4.5
    }
  ];

  const handleMarketSelect = (market) => {
    setSelectedMarket(market);
    setShowQuantityModal(true);
  };

  const handlePurchase = () => {
    if (!isConnected) {
      alert('Por favor conecta tu wallet para realizar la compra');
      return;
    }
    
    const totalEth = (parseFloat(currentProduct.ethPrice) * quantity).toFixed(4);
    const totalUsd = (parseFloat(currentProduct.usdPrice) * quantity).toFixed(2);
    
    alert(`Compra realizada:\n${quantity} kg de ${currentProduct.name}\nTotal: ${totalEth} ETH ($${totalUsd})\nUbicación: ${selectedMarket.name}`);
    
    // Aquí se integraría la transacción real con la blockchain
    setShowQuantityModal(false);
    setSelectedMarket(null);
  };

  if (!currentProduct) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="location-app">
      {/* Header */}
      <header className="location-header">
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
            <ConnectButton />
          </div>
        </div>
      </header>

      {/* Product Info */}
      <section className="product-info-section">
        <div className="product-info-card">
          <div className="product-image">
            <img src={currentProduct.image} alt={currentProduct.name} />
          </div>
          <div className="product-details">
            <h2 className="product-name">{currentProduct.name}</h2>
            <div className="product-price">
              <span className="eth-price">{currentProduct.ethPrice} ETH</span>
              <span className="usd-price">${currentProduct.usdPrice}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <h2 className="section-title">Ubicaciones Disponibles</h2>
        <div className="map-container">
          <div className="map-placeholder">
            <div className="map-content">
              <div className="map-title">🌍 Mapa de Mercados Mayoristas</div>
              <div className="map-description">
                Selecciona un mercado para ver disponibilidad y realizar tu compra
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Markets List */}
      <section className="markets-section">
        <h3 className="section-subtitle">Mercados Cercanos</h3>
        <div className="markets-list">
          {markets.map((market) => (
            <div key={market.id} className="market-card" onClick={() => handleMarketSelect(market)}>
              <div className="market-info">
                <div className="market-name">{market.name}</div>
                <div className="market-location">{market.location}</div>
                <div className="market-details">
                  <span className="availability">📦 {market.availability} disponibles</span>
                  <span className="distance">📍 {market.distance}</span>
                  <span className="rating">⭐ {market.rating}</span>
                </div>
              </div>
              <div className="market-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quantity Modal */}
      {showQuantityModal && selectedMarket && (
        <div className="modal-overlay" onClick={() => setShowQuantityModal(false)}>
          <div className="quantity-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Seleccionar Cantidad</h3>
              <button className="close-btn" onClick={() => setShowQuantityModal(false)}>×</button>
            </div>
            <div className="modal-content">
              <div className="market-selected">
                <strong>{selectedMarket.name}</strong>
                <div className="market-availability">
                  Disponible: {selectedMarket.availability}
                </div>
              </div>
              <div className="quantity-selector">
                <label>Cantidad (kg):</label>
                <div className="quantity-controls">
                  <button 
                    className="quantity-btn"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                    className="quantity-input"
                  />
                  <button 
                    className="quantity-btn"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="purchase-summary">
                <div className="summary-row">
                  <span>Precio por kg:</span>
                  <span>{currentProduct.ethPrice} ETH (${currentProduct.usdPrice})</span>
                </div>
                <div className="summary-row">
                  <span>Cantidad:</span>
                  <span>{quantity} kg</span>
                </div>
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>
                    {(parseFloat(currentProduct.ethPrice) * quantity).toFixed(4)} ETH 
                    (${(parseFloat(currentProduct.usdPrice) * quantity).toFixed(2)})
                  </span>
                </div>
              </div>
              <button className="purchase-btn" onClick={handlePurchase}>
                {isConnected ? 'Confirmar Compra' : 'Conectar Wallet'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <div className="nav-item" onClick={() => window.location.href = '/'}>
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none">
            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Inicio</span>
        </div>
        
        <div className="nav-item" onClick={() => window.location.href = '/transactions'}>
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
            <line x1="1" y1="10" x2="23" y2="10" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <span>Transacciones</span>
        </div>
        
        <div className="nav-item" onClick={() => window.location.href = '/profile'}>
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
