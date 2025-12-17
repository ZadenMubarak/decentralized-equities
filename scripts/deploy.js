async function main() {  
  const [deployer] = await ethers.getSigners();  
    
  console.log("Deploying contracts with:", deployer.address);  
    
  // Deploy TokenizedAsset contracts  
  const teslaToken = await ethers.deployContract("TokenizedAsset", [  
    "Tesla Stock Token",  
    "TSLA-T",   
    "stock",  
    "Tesla Inc.",  
    ethers.parseEther("1000000"),  
    ethers.parseEther("245.67")  
  ]);  
    
  await teslaToken.waitForDeployment();  
  console.log("Tesla Token deployed to:", teslaToken.target);  
    
  // Deploy Exchange  
  const exchange = await ethers.deployContract("DecentralizedExchange");  
  await exchange.waitForDeployment();  
  console.log("Exchange deployed to:", exchange.target);  
}  
  
main().catch(console.error);