'use client'

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ConnectButton } from "@/components/ConnectButton";
import { useAccount } from 'wagmi';
import QRScanner from '@/components/QRScanner';
import { useBlockchainTransaction } from '@/hooks/useBlockchainTransaction';
import { CONTRACT_CONFIG, MONAD_CONFIG } from '../../../config/contract';

export default function LocationPage() {
  const params = useParams();
  const productId = params.productId;
  const { address, isConnected } = useAccount();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showQuantityModal, setShowQuantityModal] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);
  
  // Hook para transacciones de blockchain
  const { 
    executeTransaction, 
    isProcessing, 
    transactionHash, 
    error, 
    isConnected: isWalletConnected 
  } = useBlockchainTransaction();

  // Datos del producto con precios en pesos mexicanos
  const products = [
    {
      id: 1,
      name: "Manzanas Rojas",
      image: "/img/manzana roja.jpg",
      originalPrice: "85.00",
      discountPrice: "68.00",
      discount: "20%",
      daysUntilSpoil: 7,
      nave: "I-J",
      local: "45"
    },
    {
      id: 2,
      name: "Plátanos",
      image: "/img/platano.jpg",
      originalPrice: "65.00",
      discountPrice: "52.00",
      discount: "20%",
      daysUntilSpoil: 3,
      nave: "K-L",
      local: "78"
    },
    {
      id: 3,
      name: "Tomates Orgánicos",
      image: "/img/jitomate.jpg",
      originalPrice: "120.00",
      discountPrice: "96.00",
      discount: "20%",
      daysUntilSpoil: 5,
      nave: "M-N",
      local: "112"
    },
    {
      id: 4,
      name: "Lechuga Romana",
      image: "/img/lechuga.jpg",
      originalPrice: "45.00",
      discountPrice: "36.00",
      discount: "20%",
      daysUntilSpoil: 4,
      nave: "O-P",
      local: "89"
    },
    {
      id: 5,
      name: "Fresas Orgánicas",
      image: "/img/fresas.jpg",
      originalPrice: "95.00",
      discountPrice: "76.00",
      discount: "20%",
      daysUntilSpoil: 2,
      nave: "Q-R",
      local: "156"
    },
    {
      id: 6,
      name: "Zanahorias",
      image: "/img/zanahoria.jpg",
      originalPrice: "35.00",
      discountPrice: "28.00",
      discount: "20%",
      daysUntilSpoil: 10,
      nave: "S-T",
      local: "203"
    },
    {
      id: 7,
      name: "Uvas Frescas",
      image: "/img/uva.jpg",
      originalPrice: "130.00",
      discountPrice: "104.00",
      discount: "20%",
      daysUntilSpoil: 6,
      nave: "U-V",
      local: "67"
    },
    {
      id: 8,
      name: "Aguacate",
      image: "/img/aguacate.jpg",
      originalPrice: "110.00",
      discountPrice: "88.00",
      discount: "20%",
      daysUntilSpoil: 4,
      nave: "W-X",
      local: "134"
    },
    {
      id: 9,
      name: "Papaya",
      image: "/img/papaya.jpg",
      originalPrice: "140.00",
      discountPrice: "112.00",
      discount: "20%",
      daysUntilSpoil: 3,
      nave: "I-J",
      local: "92"
    },
    {
      id: 10,
      name: "Piña",
      image: "/img/piña.jpg",
      originalPrice: "160.00",
      discountPrice: "128.00",
      discount: "20%",
      daysUntilSpoil: 8,
      nave: "K-L",
      local: "178"
    },
    {
      id: 11,
      name: "Brócoli",
      image: "/img/brocoli.jpg",
      originalPrice: "75.00",
      discountPrice: "60.00",
      discount: "20%",
      daysUntilSpoil: 5,
      nave: "M-N",
      local: "245"
    },
    {
      id: 12,
      name: "Papas",
      image: "/img/papa.jpg",
      originalPrice: "55.00",
      discountPrice: "44.00",
      discount: "20%",
      daysUntilSpoil: 15,
      nave: "O-P",
      local: "301"
    },
    {
      id: 13,
      name: "Elote",
      image: "/img/elote.jpg",
      originalPrice: "85.00",
      discountPrice: "68.00",
      discount: "20%",
      daysUntilSpoil: 4,
      nave: "Q-R",
      local: "167"
    }
  ];

  const currentProduct = products.find(p => p.id === parseInt(productId as string));

  const handlePurchase = () => {
    if (!isConnected) {
      alert('Por favor conecta tu wallet para realizar la compra');
      return;
    }
    
    // Cerrar el modal de cantidad y abrir el escáner de QR
    setShowQuantityModal(false);
    setShowQRScanner(true);
  };

  const handleQRScanComplete = async () => {
    if (!isWalletConnected) {
      alert('Por favor conecta tu wallet para realizar la transacción');
      setShowQRScanner(false);
      return;
    }

    try {
      // Ejecutar transacción real en Monad Testnet
      const result = await executeTransaction(currentProduct.id, currentProduct.name);
      
      if (result && result.success) {
        const totalOriginal = (parseFloat(currentProduct.originalPrice) * quantity).toFixed(2);
        const totalDiscount = (parseFloat(currentProduct.discountPrice) * quantity).toFixed(2);
        const totalSavings = (parseFloat(currentProduct.originalPrice) - parseFloat(currentProduct.discountPrice)) * quantity;
        
        const transactionDetails = `
🛒 ¡Compra realizada exitosamente en Monad Testnet!

📦 Producto: ${currentProduct.name}
💰 Cantidad: ${quantity} kg
💸 Precio original: $${totalOriginal} MXN
🎯 Precio con descuento: $${totalDiscount} MXN
💚 Ahorro total: $${totalSavings.toFixed(2)} MXN

🔗 Transacción: ${result.hash}
💎 Pago: ${CONTRACT_CONFIG.PAYMENT_AMOUNT} MON
🏦 Enviado a: ${CONTRACT_CONFIG.TREASURY_WALLET}
📍 Ubicación: Nave ${currentProduct.nave} - Local ${currentProduct.local}

🌐 Ver en Explorer: ${result.explorerUrl}

💡 ¿Por qué Blockchain?
• Transparencia total en la cadena de suministro
• Trazabilidad desde el productor hasta tu mesa
• Pagos instantáneos sin intermediarios
• Certificación de calidad inmutable
• Reducción de desperdicios con datos en tiempo real
        `;
        
        alert(transactionDetails);
      } else if (error) {
        alert(`Error en la transacción: ${error}`);
      }
    } catch (err) {
      console.error('Error al procesar la transacción:', err);
      alert('Error al procesar la transacción. Por favor intenta de nuevo.');
    }
    
    // Cerrar el escáner de QR
    setShowQRScanner(false);
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
          <div className="product-image-large">
            <img src={currentProduct.image} alt={currentProduct.name} />
          </div>
          <div className="product-details">
            <h2 className="product-name">{currentProduct.name}</h2>
            <div className="product-price">
              <div className="price-container">
                <span className="original-price">${currentProduct.originalPrice} MXN</span>
                <span className="discount-badge">{currentProduct.discount} OFF</span>
              </div>
              <div className="final-price">
                <span className="discount-price">${currentProduct.discountPrice} MXN</span>
                <span className="savings">Ahorras ${(parseFloat(currentProduct.originalPrice) - parseFloat(currentProduct.discountPrice)).toFixed(2)}</span>
              </div>
            </div>
            <div className="product-info-grid">
              <div className="info-item">
                <span className="info-label">Días hasta que se eche a perder:</span>
                <span className="info-value days-left">{currentProduct.daysUntilSpoil} días</span>
              </div>
              <div className="info-item">
                <span className="info-label">Ubicación en Central de Abasto:</span>
                <span className="info-value location">Nave {currentProduct.nave} - Local {currentProduct.local}</span>
              </div>
            </div>
            <div className="action-buttons">
              <button className="buy-btn" onClick={() => setShowQuantityModal(true)}>
                Comprar
              </button>
              <button className="sell-btn" onClick={() => setShowQuantityModal(true)}>
                Vender
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quantity Modal */}
      {showQuantityModal && (
        <div className="modal-overlay">
          <div className="quantity-modal">
            <h3>Seleccionar Cantidad</h3>
            <div className="quantity-input">
              <label>Cantidad (kg):</label>
              <input 
                type="number" 
                min="1" 
                value={quantity} 
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              />
            </div>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowQuantityModal(false)}>
                Cancelar
              </button>
              <button 
                className={`confirm-btn ${isProcessing ? 'processing' : ''}`} 
                onClick={handlePurchase}
                disabled={isProcessing}
              >
                {isProcessing ? 'Procesando...' : 'Confirmar Compra'}
              </button>
            </div>
            {error && (
              <div className="error-message">
                ❌ {error}
              </div>
            )}
            {transactionHash && (
              <div className="transaction-info">
                🔗 Transacción enviada: {transactionHash.slice(0, 10)}...{transactionHash.slice(-8)}
              </div>
            )}
          </div>
        </div>
      )}

      {/* QR Scanner */}
      <QRScanner
        isOpen={showQRScanner}
        onClose={() => setShowQRScanner(false)}
        onScanComplete={handleQRScanComplete}
        productName={currentProduct.name}
      />
    </div>
  );
}
