'use client'

import { useState } from 'react';
import { useImpactData } from '@/hooks/useImpactData';

export function ImpactDashboard() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { 
    foodRecovered, 
    co2Avoided, 
    familiesHelped, 
    totalTransactions, 
    isLoading, 
    error 
  } = useImpactData();

  return (
    <div className={`impact-dashboard ${isExpanded ? 'expanded' : ''}`}>
      <div className="dashboard-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="dashboard-title">
          <span className="impact-icon">📈</span>
          <h3>Impacto Medible</h3>
        </div>
        <button className="expand-button">
          {isExpanded ? '−' : '+'}
        </button>
      </div>

      <div className="dashboard-content">
        {error && (
          <div className="error-message">
            <span>⚠️ Error al cargar datos: {error}</span>
          </div>
        )}
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon">🥗</div>
            <div className="metric-info">
              <span className="metric-value">
                {isLoading ? '...' : foodRecovered.toLocaleString()}
              </span>
              <span className="metric-label">kg de alimentos recuperados</span>
            </div>
            <div className="metric-trend positive">+12%</div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">🌱</div>
            <div className="metric-info">
              <span className="metric-value">
                {isLoading ? '...' : co2Avoided.toLocaleString()}
              </span>
              <span className="metric-label">kg CO₂ evitados</span>
            </div>
            <div className="metric-trend positive">+8%</div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">👨‍👩‍👧‍👦</div>
            <div className="metric-info">
              <span className="metric-value">
                {isLoading ? '...' : familiesHelped.toLocaleString()}
              </span>
              <span className="metric-label">familias beneficiadas</span>
            </div>
            <div className="metric-trend positive">+15%</div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">💳</div>
            <div className="metric-info">
              <span className="metric-value">
                {isLoading ? '...' : totalTransactions.toLocaleString()}
              </span>
              <span className="metric-label">transacciones totales</span>
            </div>
            <div className="metric-trend positive">+5%</div>
          </div>
        </div>

        {isExpanded && (
          <div className="dashboard-details">
            <div className="impact-chart">
              <h4>Progreso Mensual</h4>
              <div className="chart-bars">
                <div className="chart-bar" style={{ height: '60%' }}>
                  <span className="bar-label">Sem 1</span>
                </div>
                <div className="chart-bar" style={{ height: '75%' }}>
                  <span className="bar-label">Sem 2</span>
                </div>
                <div className="chart-bar" style={{ height: '85%' }}>
                  <span className="bar-label">Sem 3</span>
                </div>
                <div className="chart-bar" style={{ height: '90%' }}>
                  <span className="bar-label">Sem 4</span>
                </div>
              </div>
            </div>

            <div className="impact-stats">
              <div className="stat-item">
                <span className="stat-label">Meta mensual:</span>
                <span className="stat-value">500 kg</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Progreso:</span>
                <span className="stat-value">78%</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Días restantes:</span>
                <span className="stat-value">8</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
