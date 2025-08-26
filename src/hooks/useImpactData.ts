import { useState, useEffect } from 'react';
import { useReadContract } from 'wagmi';

// ABI simplificado para las funciones que necesitamos
const FOOD_CHAIN_ABI = [
  {
    "inputs": [],
    "name": "getTransactionCount",
    "outputs": [{"type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getProductCount",
    "outputs": [{"type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

// Dirección del contrato (se debe actualizar con la dirección real)
const FOOD_CHAIN_ADDRESS = '0x0000000000000000000000000000000000000000'; // Placeholder

export interface ImpactData {
  totalTransactions: number;
  totalProducts: number;
  foodRecovered: number;
  co2Avoided: number;
  familiesHelped: number;
  isLoading: boolean;
  error: string | null;
}

export function useImpactData(): ImpactData {
  const [impactData, setImpactData] = useState<ImpactData>({
    totalTransactions: 0,
    totalProducts: 0,
    foodRecovered: 0,
    co2Avoided: 0,
    familiesHelped: 0,
    isLoading: true,
    error: null
  });

  // Leer datos del smart contract
  const { 
    data: transactionCount, 
    isLoading: isLoadingTransactions,
    error: transactionError 
  } = useReadContract({
    address: FOOD_CHAIN_ADDRESS as `0x${string}`,
    abi: FOOD_CHAIN_ABI,
    functionName: 'getTransactionCount',
  });

  const { 
    data: productCount, 
    isLoading: isLoadingProducts,
    error: productError 
  } = useReadContract({
    address: FOOD_CHAIN_ADDRESS as `0x${string}`,
    abi: FOOD_CHAIN_ABI,
    functionName: 'getProductCount',
  });

  useEffect(() => {
    // Si no hay contrato desplegado, usar datos simulados
    if (!FOOD_CHAIN_ADDRESS || FOOD_CHAIN_ADDRESS === '0x0000000000000000000000000000000000000000') {
      const simulatedData = {
        totalTransactions: 156,
        totalProducts: 13,
        foodRecovered: 390, // 156 * 2.5 kg
        co2Avoided: 975, // 390 * 2.5 kg CO2
        familiesHelped: 187, // 156 * 1.2 familias
        isLoading: false,
        error: null
      };
      setImpactData(simulatedData);
      return;
    }

    // Procesar datos reales del contrato
    if (!isLoadingTransactions && !isLoadingProducts) {
      const transactions = Number(transactionCount) || 0;
      const products = Number(productCount) || 0;
      
      // Calcular métricas de impacto
      const foodPerTransaction = 2.5; // kg por transacción
      const co2PerKg = 2.5; // kg CO2 evitados por kg de comida
      const familiesPerTransaction = 1.2; // familias beneficiadas por transacción

      setImpactData({
        totalTransactions: transactions,
        totalProducts: products,
        foodRecovered: transactions * foodPerTransaction,
        co2Avoided: transactions * foodPerTransaction * co2PerKg,
        familiesHelped: Math.round(transactions * familiesPerTransaction),
        isLoading: false,
        error: transactionError?.message || productError?.message || null
      });
    }
  }, [transactionCount, productCount, isLoadingTransactions, isLoadingProducts, transactionError, productError]);

  return impactData;
}
