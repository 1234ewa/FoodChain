const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Desplegando contrato FoodChain en Monad Testnet...");

  // Obtener el contrato
  const FoodChain = await ethers.getContractFactory("FoodChain");
  
  // Desplegar el contrato
  const foodChain = await FoodChain.deploy();
  
  // Esperar a que se confirme el despliegue
  await foodChain.waitForDeployment();
  
  const contractAddress = await foodChain.getAddress();
  
  console.log("✅ Contrato FoodChain desplegado exitosamente!");
  console.log("📍 Dirección del contrato:", contractAddress);
  console.log("🏦 Treasury Wallet:", await foodChain.treasuryWallet());
  console.log("💎 Payment Amount:", ethers.formatEther(await foodChain.PAYMENT_AMOUNT()), "MON");
  console.log("🔗 Explorer:", `https://testnet.monadexplorer.com/address/${contractAddress}`);
  
  // Verificar el contrato (opcional)
  console.log("\n🔍 Verificando contrato...");
  try {
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: [],
    });
    console.log("✅ Contrato verificado exitosamente!");
  } catch (error) {
    console.log("⚠️ Error al verificar el contrato:", error.message);
  }
  
  console.log("\n📝 Actualiza la dirección del contrato en contracts/config.ts:");
  console.log(`CONTRACT_ADDRESS: "${contractAddress}"`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error al desplegar:", error);
    process.exit(1);
  });
