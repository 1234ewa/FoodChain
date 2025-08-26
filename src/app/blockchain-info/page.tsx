'use client'

import { useState } from 'react';
import { ConnectButton } from "@/components/ConnectButton";

export default function BlockchainInfoPage() {
  const [activeTab, setActiveTab] = useState('blockchain-info');

  return (
    <div className="blockchain-info-app">
      {/* Header */}
      <header className="blockchain-info-header">
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

      {/* Blockchain Info Section */}
      <section className="blockchain-info-section">
        <div className="info-card">
          <h2 className="info-title">¿Por qué Blockchain en FoodChain?</h2>
          
          <div className="benefits-grid">
            <div className="benefit-item">
              <div className="benefit-icon">🔍</div>
              <h3 className="benefit-title">Transparencia Total</h3>
              <p className="benefit-description">
                Cada transacción es visible públicamente en la blockchain de Monad. 
                Puedes verificar exactamente de dónde viene tu comida y cómo llegó a tu mesa.
              </p>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">📊</div>
              <h3 className="benefit-title">Trazabilidad Completa</h3>
              <p className="benefit-description">
                Desde el productor hasta tu mesa, cada paso está registrado en la blockchain. 
                Sabes exactamente quién cultivó, transportó y vendió tu comida.
              </p>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">⚡</div>
              <h3 className="benefit-title">Pagos Instantáneos</h3>
              <p className="benefit-description">
                Sin intermediarios bancarios. Los pagos se procesan directamente en la blockchain 
                de Monad, reduciendo costos y tiempo de transacción.
              </p>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">🛡️</div>
              <h3 className="benefit-title">Certificación Inmutable</h3>
              <p className="benefit-description">
                La calidad y origen de los productos están certificados en la blockchain. 
                Una vez registrado, no se puede alterar ni falsificar.
              </p>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">🌱</div>
              <h3 className="benefit-title">Reducción de Desperdicios</h3>
              <p className="benefit-description">
                Con datos en tiempo real sobre inventario y demanda, optimizamos la cadena 
                de suministro para reducir el desperdicio de alimentos.
              </p>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">💎</div>
              <h3 className="benefit-title">Monad Testnet</h3>
              <p className="benefit-description">
                Utilizamos Monad Testnet para transacciones rápidas y económicas. 
                Cada compra genera un comprobante público verificable en el explorer.
              </p>
            </div>
          </div>

          <div className="verification-section">
            <h3 className="verification-title">¿Cómo Verificar una Transacción?</h3>
            <div className="verification-steps">
              <div className="step">
                <span className="step-number">1</span>
                <p>Realiza una compra en FoodChain</p>
              </div>
              <div className="step">
                <span className="step-number">2</span>
                <p>Recibe el hash de la transacción</p>
              </div>
              <div className="step">
                <span className="step-number">3</span>
                <p>Visita <a href="https://testnet.monadexplorer.com" target="_blank" rel="noopener noreferrer">Monad Explorer</a></p>
              </div>
              <div className="step">
                <span className="step-number">4</span>
                <p>Pega el hash para ver los detalles completos</p>
              </div>
            </div>
          </div>

          <div className="example-transaction">
            <h3 className="example-title">Ejemplo de Transacción en Monad</h3>
            <div className="transaction-example">
              <div className="example-item">
                <strong>Hash:</strong> 0x57a8b9c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0
              </div>
              <div className="example-item">
                <strong>Bloque:</strong> #1234567
              </div>
              <div className="example-item">
                <strong>Producto:</strong> Manzanas Rojas
              </div>
              <div className="example-item">
                <strong>Cantidad:</strong> 1 kg
              </div>
              <div className="example-item">
                <strong>Valor:</strong> 0.002 MON ($3.5)
              </div>
              <div className="example-item">
                <strong>Ubicación:</strong> Nave I-J - Local 45
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <div 
          className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => window.location.href = '/'}
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
