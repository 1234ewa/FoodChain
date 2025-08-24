'use client'

import { useState } from 'react';
import { ConnectButton } from "@/components/ConnectButton";
import Image from 'next/image';

export default function TransactionsPage() {
  const [activeTab, setActiveTab] = useState('transactions');

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

  // Estadísticas calculadas
  const totalSpent = transactions.reduce((sum, tx) => sum + parseFloat(tx.ethValue), 0);
  const successfulPurchases = transactions.length;

  return (
    <div className="transactions-app">
      {/* Header */}
      <header className="transactions-header">
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
            <div className="wallet-info">
              <div className="wallet-balance">0.000 MON</div>
              <div className="wallet-address">0x57...eFE2A0</div>
            </div>
            <ConnectButton />
          </div>
        </div>
      </header>

      {/* Summary Cards */}
      <section className="summary-section">
        <div className="summary-cards">
          <div className="summary-card">
            <div className="summary-icon">💰</div>
            <div className="summary-value">{totalSpent.toFixed(4)} ETH</div>
            <div className="summary-label">TOTAL GASTADO</div>
          </div>
          <div className="summary-card">
            <div className="summary-icon">✅</div>
            <div className="summary-value">{successfulPurchases}</div>
            <div className="summary-label">COMPRAS EXITOSAS</div>
          </div>
        </div>
      </section>

      {/* Transaction History */}
      <section className="transactions-section">
        <h2 className="section-title">HISTORIAL DE TRANSACCIONES</h2>
        <div className="transactions-list">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="transaction-card">
              <div className="transaction-header">
                <h3 className="transaction-product">{transaction.product}</h3>
                <div className="transaction-status completed">✓ Completada</div>
              </div>
              <div className="transaction-details">
                <div className="transaction-row">
                  <span className="detail-label">FECHA DE COMPRA Y HORA:</span>
                  <span className="detail-value">{transaction.date}</span>
                </div>
                <div className="transaction-row">
                  <span className="detail-label">VALOR EN ETH:</span>
                  <span className="detail-value eth-value">{transaction.ethValue} ETH</span>
                </div>
                <div className="transaction-row">
                  <span className="detail-label">HASH:</span>
                  <span className="detail-value hash-value">{transaction.hash}</span>
                </div>
              </div>
            </div>
          ))}
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
           onClick={() => setActiveTab('transactions')}
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
