'use client'

import { useState, useEffect } from 'react';

interface QRScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onScanComplete: () => void;
  productName: string;
}

export default function QRScanner({ isOpen, onClose, onScanComplete, productName }: QRScannerProps) {
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setScanning(true);
      setProgress(0);
      
      // Simular el proceso de escaneo
      const scanInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(scanInterval);
            setTimeout(() => {
              setScanning(false);
              onScanComplete();
            }, 1000);
            return 100;
          }
          return prev + 2;
        });
      }, 50);

      return () => clearInterval(scanInterval);
    }
  }, [isOpen, onScanComplete]);

  if (!isOpen) return null;

  return (
    <div className="qr-scanner-overlay">
      <div className="qr-scanner-modal">
        <div className="camera-header">
          <button className="close-btn" onClick={onClose}>✕</button>
          <h3 className="scanner-title">Escanear QR de Pago</h3>
          <div className="camera-indicator">📷</div>
        </div>

        <div className="camera-viewport">
          <div className="camera-frame">
            {/* Efecto de escaneo */}
            <div className={`scan-line ${scanning ? 'scanning' : ''}`}></div>
            
            {/* Puntos de esquina */}
            <div className="corner top-left"></div>
            <div className="corner top-right"></div>
            <div className="corner bottom-left"></div>
            <div className="corner bottom-right"></div>

            {/* Información del producto */}
            <div className="product-info-overlay">
              <div className="product-name">{productName}</div>
              <div className="scan-status">
                {scanning ? 'Escaneando...' : 'QR Detectado'}
              </div>
            </div>
          </div>

          {/* Barra de progreso */}
          <div className="scan-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="progress-text">
              {scanning ? `Procesando... ${progress}%` : 'Completado'}
            </div>
          </div>
        </div>

        <div className="scanner-instructions">
          <p>Coloca el código QR dentro del marco para procesar el pago</p>
          <div className="qr-example">
            <div className="qr-code-placeholder">
              <div className="qr-pattern"></div>
              <div className="qr-pattern"></div>
              <div className="qr-pattern"></div>
              <div className="qr-pattern"></div>
            </div>
            <span>Código QR de Monad</span>
          </div>
        </div>
      </div>
    </div>
  );
}
