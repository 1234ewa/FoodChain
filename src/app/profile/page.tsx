'use client'

import { useState, useEffect } from 'react';
import { ConnectButton } from "@/components/ConnectButton";
import { useAccount } from 'wagmi';
import { ImpactDashboard } from "@/components/ImpactDashboard";
import Image from 'next/image';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');
  const { address, isConnected } = useAccount();
  
  // Formatear la dirección de la wallet
  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  // Datos de ejemplo para las transacciones (se llenarán con datos reales)
  const transactions = [
    {
      id: 1,
      product: "Manzanas Rojas",
      date: "2024-01-15 14:30:25",
      ethValue: "0.002",
      hash: "0x57a8b9c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0",
      status: "completed"
    },
    {
      id: 2,
      product: "Tomates Orgánicos",
      date: "2024-01-14 09:15:42",
      ethValue: "0.003",
      hash: "0x12b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3",
      status: "completed"
    },
    {
      id: 3,
      product: "Plátanos",
      date: "2024-01-13 16:45:18",
      ethValue: "0.0015",
      hash: "0x34c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5",
      status: "completed"
    }
  ];

  // Estadísticas calculadas (coinciden con transacciones)
  const totalSpent = transactions.reduce((sum, tx) => sum + parseFloat(tx.ethValue), 0);
  const successfulPurchases = transactions.length;

  // Métodos de pago
  const paymentMethods = [
    {
      id: 1,
      name: "USDC",
      balance: "50",
      symbol: "USDC"
    },
    {
      id: 2,
      name: "USDT",
      balance: "25",
      symbol: "USDT"
    },
    {
      id: 3,
      name: "Ethereum",
      balance: "0.5",
      symbol: "ETH"
    }
  ];

  return (
    <div className="profile-app">
      {/* Header */}
      <header className="profile-header">
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

      {/* User Profile Card */}
      <section className="profile-card-section">
        <div className="profile-card">
                       <div className="profile-info">
               <div className="profile-name">Wallet</div>
               <div className="profile-wallet">
                 {isConnected && address ? formatAddress(address) : 'No conectada'}
               </div>
             </div>
        </div>
      </section>

      {/* Impact Dashboard - Featured Section */}
      <section className="impact-section">
        <ImpactDashboard />
      </section>

      {/* Summary Cards */}
      <section className="summary-section">
        <div className="summary-cards">
          <div className="summary-card">
            <div className="summary-value">${(totalSpent * 1750).toFixed(2)}</div>
            <div className="summary-label">TOTAL GASTADO</div>
          </div>
          <div className="summary-card">
            <div className="summary-value">{successfulPurchases}</div>
            <div className="summary-label">COMPRAS REALIZADAS</div>
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="payment-methods-section">
        <h2 className="section-title">Métodos de Pago</h2>
        <div className="payment-methods-list">
          {paymentMethods.map((method) => (
            <div key={method.id} className="payment-method-item">
              <div className="payment-method-info">
                <div className="payment-method-name">{method.name}</div>
                <div className="payment-method-balance">{method.balance} {method.symbol}</div>
              </div>
              <div className="payment-method-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Options Section */}
      <section className="options-section">
        <h2 className="section-title">Opciones</h2>
        <div className="options-list">
          <div className="option-item" onClick={() => window.location.href = '/transactions'}>
            <div className="option-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                <line x1="1" y1="10" x2="23" y2="10" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <div className="option-text">Transacciones</div>
            <div className="option-arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
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
          onClick={() => setActiveTab('profile')}
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
