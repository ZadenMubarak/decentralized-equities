import { ethers } from "hardhat";  
  
async function main() {  
  const [deployer] = await ethers.getSigners();  
  console.log("Deploying contracts with:", deployer.address);  
  
  // Deploy Asset Registry  
  const AssetRegistry = await ethers.getContractFactory("AssetRegistry");  
  const assetRegistry = await AssetRegistry.deploy();  
  await assetRegistry.waitForDeployment();  
  console.log("AssetRegistry deployed to:", assetRegistry.target);  
  
  // Deploy sample tokenized assets  
  const TokenizedAsset = await ethers.getContractFactory("TokenizedAsset");  
    
  // Tesla Stock Token  
  const teslaToken = await TokenizedAsset.deploy(  
    "Tesla Stock Token",  
    "TSLA-T",  
    "stock",  
    "Tesla Inc.",  
    ethers.parseEther("1000000"),  
    ethers.parseEther("245.67")  
  );  
  await teslaToken.waitForDeployment();  
  console.log("Tesla Token deployed to:", teslaToken.target);  
  
  // Register Tesla token  
  await assetRegistry.registerAsset(  
    teslaToken.target as string,  
    "Tesla Stock Token",  
    "TSLA-T",  
    "stock"  
  );  
  
  // Apple Stock Token  
  const appleToken = await TokenizedAsset.deploy(  
    "Apple Stock Token",   
    "AAPL-T",  
    "stock",  
    "Apple Inc.",  
    ethers.parseEther("1000000"),  
    ethers.parseEther("189.45")  
  );  
  await appleToken.waitForDeployment();  
  console.log("Apple Token deployed to:", appleToken.target);  
  
  await assetRegistry.registerAsset(  
    appleToken.target as string,  
    "Apple Stock Token",  
    "AAPL-T",   
    "stock"  
  );  
  
  console.log("Deployment completed!");  
}  
  
main().catch(console.error);