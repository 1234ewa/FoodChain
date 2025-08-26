'use client'

import { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { CONTRACT_CONFIG, MONAD_CONFIG } from '../config/contract';

export const useBlockchainTransaction = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const { address, isConnected } = useAccount();
  
  const { writeContract, data: hash, isPending, error: writeError } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const executeTransaction = async (productId: number, productName: string) => {
    if (!isConnected || !address) {
      setError('Por favor conecta tu wallet primero');
      return null;
    }

    setIsProcessing(true);
    setError(null);
    setTransactionHash(null);

    try {
      // Verificar que estamos en la red correcta
      if (typeof window !== 'undefined' && window.ethereum) {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        const expectedChainId = `0x${MONAD_CONFIG.CHAIN_ID.toString(16)}`;
        
        if (chainId !== expectedChainId) {
          // Solicitar cambio de red
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: expectedChainId }],
            });
          } catch (switchError: any) {
            // Si la red no existe, agregarla
            if (switchError.code === 4902) {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                  chainId: expectedChainId,
                  chainName: 'Monad Testnet',
                  nativeCurrency: {
                    name: 'Monad',
                    symbol: 'MON',
                    decimals: 18,
                  },
                  rpcUrls: [MONAD_CONFIG.RPC_URL],
                  blockExplorerUrls: [MONAD_CONFIG.EXPLORER_URL],
                }],
              });
            } else {
              throw switchError;
            }
          }
        }
      }

      // Ejecutar la transacción
      writeContract({
        address: CONTRACT_CONFIG.CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_CONFIG.ABI,
        functionName: 'purchaseProduct',
        args: [productId],
        value: parseEther(CONTRACT_CONFIG.PAYMENT_AMOUNT),
      });

    } catch (err: any) {
      console.error('Error en la transacción:', err);
      setError(err.message || 'Error al procesar la transacción');
      setIsProcessing(false);
      return null;
    }
  };

  // Observar cambios en el hash de la transacción
  if (hash && !transactionHash) {
    setTransactionHash(hash);
  }

  // Observar errores de escritura
  if (writeError && !error) {
    setError(writeError.message);
    setIsProcessing(false);
  }

  // Observar confirmación de transacción
  if (isConfirmed && transactionHash) {
    setIsProcessing(false);
    return {
      success: true,
      hash: transactionHash,
      explorerUrl: `${MONAD_CONFIG.EXPLORER_URL}/tx/${transactionHash}`
    };
  }

  return {
    executeTransaction,
    isProcessing: isProcessing || isPending || isConfirming,
    transactionHash,
    error,
    isConnected,
    address
  };
};
