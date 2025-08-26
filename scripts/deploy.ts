import { ethers } from "hardhat";

async function main() {
  console.log("🚀 Iniciando despliegue del contrato FoodChain...");

  // Obtener el contrato
  const FoodChain = await ethers.getContractFactory("FoodChain");
  
  console.log("📦 Desplegando contrato...");
  
  // Desplegar el contrato
  const foodChain = await FoodChain.deploy();
  
  // Esperar a que se confirme el despliegue
  await foodChain.waitForDeployment();
  
  const contractAddress = await foodChain.getAddress();
  
  console.log("✅ Contrato desplegado exitosamente!");
  console.log("📍 Dirección del contrato:", contractAddress);
  console.log("🌐 Explorer URL:", `https://testnet.monadexplorer.com/address/${contractAddress}`);
  
  // Verificar el treasury wallet
  const treasuryWallet = await foodChain.treasuryWallet();
  console.log("🏦 Treasury Wallet:", treasuryWallet);
  
  // Verificar el payment amount
  const paymentAmount = await foodChain.PAYMENT_AMOUNT();
  console.log("💰 Payment Amount:", ethers.formatEther(paymentAmount), "MON");
  
  console.log("\n📋 Próximos pasos:");
  console.log("1. Actualiza CONTRACT_ADDRESS en src/config/contract.ts");
  console.log("2. Ejecuta: npm run dev");
  console.log("3. Prueba una transacción en la aplicación");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error en el despliegue:", error);
    process.exit(1);
  });
