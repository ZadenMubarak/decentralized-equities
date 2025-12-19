import { ethers } from "hardhat";  
  
async function main() {  
  console.log("Deploying to Sepolia Testnet...");  
    
  const [deployer] = await ethers.getSigners();  
  console.log("Deploying contracts with:", deployer.address);  
    
  // Check testnet balance  
  const balance = await deployer.provider.getBalance(deployer.address);  
  console.log("Account balance:", ethers.formatEther(balance), "ETH");  
    
  if (balance < ethers.parseEther("0.01")) {  
    console.log("⚠️  Warning: Low testnet ETH balance. Get more from Sepolia faucet.");  
  }  
  
  // Deploy Asset Registry  
  const AssetRegistry = await ethers.getContractFactory("AssetRegistry");  
  const assetRegistry = await AssetRegistry.deploy();  
  await assetRegistry.waitForDeployment();  
  console.log("AssetRegistry deployed to:", await assetRegistry.getAddress());  
  
  // Deploy Exchange  
  const DecentralizedExchange = await ethers.getContractFactory("DecentralizedExchange");  
  const exchange = await DecentralizedExchange.deploy();  
  await exchange.waitForDeployment();  
  console.log("Exchange deployed to:", await exchange.getAddress());  
  
  // Deploy sample tokens  
  const TokenizedAsset = await ethers.getContractFactory("TokenizedAsset");  
    
  const teslaToken = await TokenizedAsset.deploy(  
    "Tesla Stock Token",  
    "TSLA-T",  
    "stock",  
    "Tesla Inc.",  
    ethers.parseEther("1000000"),  
    ethers.parseEther("245.67")  
  );  
  await teslaToken.waitForDeployment();  
  console.log("Tesla Token deployed to:", await teslaToken.getAddress());  
  
  console.log("\n✅ Testnet deployment complete!");  
  console.log("Update your .env file with these addresses:");  
  console.log(`ASSET_REGISTRY_ADDRESS=${await assetRegistry.getAddress()}`);  
  console.log(`EXCHANGE_CONTRACT_ADDRESS=${await exchange.getAddress()}`);  
}  
  
main().catch(console.error);