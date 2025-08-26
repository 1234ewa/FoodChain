'use client'

import { wagmiAdapter, projectId, networks } from '@/config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createAppKit } from '@reown/appkit/react'
import React, { type ReactNode } from 'react'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'

// Set up queryClient
const queryClient = new QueryClient()

// Create the modal
export const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks,
  metadata: {
    name: 'FoodChain',
    description: 'Aplicación de delivery de alimentos con blockchain',
    url: 'http://localhost:3000',
    icons: ['http://localhost:3000/icon.png']
  },
  themeMode: 'light',
  features: {
    analytics: true
  },
  themeVariables: {
    '--w3m-accent': '#5034c4', // Usar el color lila de FoodChain
  }
})

function ContextProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default ContextProvider
