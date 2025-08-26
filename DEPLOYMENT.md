# 🚀 Guía de Despliegue - FoodChain Smart Contract

## 📋 Prerrequisitos

1. **Node.js** (versión 16 o superior)
2. **npm** o **yarn**
3. **Wallet con MON** en Monad Testnet
4. **Hardhat** configurado

## 🔧 Configuración

### 1. Instalar dependencias
```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
```

### 2. Configurar Hardhat
Crear `hardhat.config.js`:
```javascript
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.19",
  networks: {
    monadTestnet: {
      url: "https://testnet-rpc.monad.xyz",
      chainId: 10143,
      accounts: [process.env.PRIVATE_KEY], // Tu clave privada
    },
  },
  etherscan: {
    apiKey: {
      monadTestnet: "no-api-key-needed"
    },
    customChains: [
      {
        network: "monadTestnet",
        chainId: 10143,
        urls: {
          apiURL: "https://testnet.monadexplorer.com/api",
          browserURL: "https://testnet.monadexplorer.com"
        }
      }
    ]
  }
};
```

### 3. Configurar variables de entorno
Crear `.env`:
```env
PRIVATE_KEY=tu_clave_privada_aqui
```

## 🚀 Despliegue

### 1. Compilar el contrato
```bash
npx hardhat compile
```

### 2. Desplegar en Monad Testnet
```bash
npx hardhat run scripts/deploy.js --network monadTestnet
```

### 3. Actualizar configuración
Después del despliegue, actualiza `contracts/config.ts`:
```typescript
CONTRACT_ADDRESS: "0x...", // Dirección del contrato desplegado
```

## 📊 Verificación

### 1. Verificar en Explorer
- Ve a: https://testnet.monadexplorer.com
- Busca la dirección del contrato
- Verifica que el código fuente esté disponible

### 2. Probar el contrato
```bash
npx hardhat test
```

## 🔗 Configuración del Contrato

### Parámetros del Contrato:
- **Treasury Wallet**: `0xCc7266d0526f129dCe4c0BD24b1D32860e432b8A`
- **Payment Amount**: `0.1 MON`
- **Productos**: 13 productos inicializados automáticamente

### Funciones Principales:
- `purchaseProduct(uint256 productId)` - Comprar producto
- `getProduct(uint256 productId)` - Obtener información del producto
- `getTransaction(uint256 transactionId)` - Obtener transacción
- `getUserTransactions(address user)` - Obtener transacciones del usuario

## 🧪 Testing

### 1. Ejecutar tests
```bash
npx hardhat test
```

### 2. Test manual en el frontend
1. Conecta tu wallet (MetaMask)
2. Cambia a red Monad Testnet
3. Selecciona un producto
4. Confirma la compra
5. Verifica la transacción en el explorer

## 🔍 Monitoreo

### Eventos del Contrato:
- `ProductAdded` - Producto agregado
- `PurchaseCompleted` - Compra completada
- `PaymentReceived` - Pago recibido

### Explorer Links:
- **Contrato**: `https://testnet.monadexplorer.com/address/{CONTRACT_ADDRESS}`
- **Transacciones**: `https://testnet.monadexplorer.com/tx/{TX_HASH}`

## ⚠️ Notas Importantes

1. **Solo Testnet**: Este contrato está configurado para Monad Testnet
2. **Fondos**: Asegúrate de tener MON en tu wallet para gas fees
3. **Red**: Verifica que estés conectado a Monad Testnet (Chain ID: 10143)
4. **Seguridad**: Nunca compartas tu clave privada

## 🆘 Solución de Problemas

### Error: "Insufficient funds"
- Obtén MON de testnet desde el faucet oficial

### Error: "Wrong network"
- Cambia a Monad Testnet en MetaMask

### Error: "Contract not found"
- Verifica que el contrato esté desplegado correctamente
- Actualiza la dirección en `config.ts`

## 📞 Soporte

Para problemas técnicos:
1. Revisa los logs de Hardhat
2. Verifica la configuración de red
3. Consulta la documentación de Monad
