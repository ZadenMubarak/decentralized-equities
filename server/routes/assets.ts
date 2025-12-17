import { RequestHandler } from "express";  
import { ContractService } from "../services/contractService";  
  
const contractService = new ContractService(  
  process.env.RPC_URL || "http://localhost:8545",  
  process.env.EXCHANGE_ADDRESS || ""  
);  
  
export const createTokenizedAsset: RequestHandler = async (req, res) => {  
  try {  
    const { name, symbol, assetType, realWorldAsset, initialSupply, pricePerToken } = req.body;  
      
    // Deploy new token contract  
    const deployer = new ethers.Wallet(process.env.PRIVATE_KEY!, contractService.provider);  
    const tokenAddress = await contractService.deployAssetToken({  
      name,  
      symbol,  
      assetType,  
      realWorldAsset,  
      initialSupply,  
      pricePerToken  
    }, deployer);  
      
    // Save to database  
    const newAsset = await db.asset.create({  
      data: {  
        name,  
        symbol,  
        assetType,  
        realWorldAsset,  
        contractAddress: tokenAddress,  
        totalSupply: initialSupply,  
        pricePerToken,  
        createdAt: new Date()  
      }  
    });  
      
    res.status(201).json(newAsset);  
  } catch (error) {  
    console.error('Error creating tokenized asset:', error);  
    res.status(500).json({ error: 'Failed to create tokenized asset' });  
  }  
};  
  
export const getTokenizedAssets: RequestHandler = async (req, res) => {  
  try {  
    const assets = await db.asset.findMany({  
      orderBy: { createdAt: 'desc' }  
    });  
      
    // Get real-time prices from contracts  
    const assetsWithPrices = await Promise.all(  
      assets.map(async (asset) => {  
        const contract = new ethers.Contract(  
          asset.contractAddress,  
          TokenizedAsset.abi,  
          contractService.provider  
        );  
        const currentPrice = await contract.pricePerToken();  
          
        return {  
          ...asset,  
          currentPrice: ethers.formatUnits(currentPrice, 18),  
          smartContract: asset.contractAddress  
        };  
      })  
    );  
      
    res.json(assetsWithPrices);  
  } catch (error) {  
    console.error('Error fetching assets:', error);  
    res.status(500).json({ error: 'Failed to fetch assets' });  
  }  
};