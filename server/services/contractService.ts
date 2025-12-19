import { ethers } from 'ethers';  
import TokenizedAsset from '../../artifacts/contracts/TokenizedAsset.sol/TokenizedAsset.json';  
import DecentralizedExchange from '../../artifacts/contracts/DecentralizedExchange.sol/DecentralizedExchange.json';  
  
export interface AssetToken {  
  address: string;  
  name: string;  
  symbol: string;  
  assetType: string;  
  realWorldAsset: string;  
  totalSupply: string;  
  pricePerToken: string;  
}  
  
export interface Order {  
  id: number;  
  trader: string;  
  tokenAddress: string;  
  isBuy: boolean;  
  amount: string;  
  price: string;  
  filled: boolean;  
}  
  
export class ContractService {  
  private provider: ethers.JsonRpcProvider;  
  private signer: ethers.JsonRpcSigner | null = null;  
  private exchangeContract: ethers.Contract | null = null;  
  
  constructor(rpcUrl: string = process.env.SEPOLIA_URL || "https://sepolia.infura.io/v3/your_project_id") {  
    this.provider = new ethers.JsonRpcProvider(rpcUrl);  
  }  
  
  // Initialize with signer for testnet transactions  
  async initialize(privateKey?: string) {  
    if (privateKey) {  
      this.signer = new ethers.Wallet(privateKey, this.provider);  
    } else {  
      // Use provider's signer for MetaMask integration  
      this.signer = await this.provider.getSigner();  
    }  
      
    // Initialize exchange contract for testnet  
    const exchangeAddress = process.env.EXCHANGE_CONTRACT_ADDRESS;  
    if (exchangeAddress) {  
      this.exchangeContract = new ethers.Contract(  
        exchangeAddress,  
        DecentralizedExchange.abi,  
        this.signer  
      );  
    }  
  }  
  
  // Deploy tokenized asset on testnet  
  async deployTokenizedAsset(  
    name: string,  
    symbol: string,  
    assetType: string,  
    realWorldAsset: string,  
    initialSupply: string,  
    pricePerToken: string  
  ): Promise<string> {  
    if (!this.signer) throw new Error("Contract service not initialized with signer");  
  
    const tokenFactory = new ethers.ContractFactory(  
      TokenizedAsset.abi,  
      TokenizedAsset.bytecode,  
      this.signer  
    );  
  
    const tokenContract = await tokenFactory.deploy(  
      name,  
      symbol,  
      assetType,  
      realWorldAsset,  
      ethers.parseEther(initialSupply),  
      ethers.parseEther(pricePerToken)  
    );  
  
    await tokenContract.waitForDeployment();  
    return await tokenContract.getAddress();  
  }  
  
  // Get testnet ETH balance  
  async getTestnetBalance(address: string): Promise<string> {  
    const balance = await this.provider.getBalance(address);  
    return ethers.formatEther(balance);  
  }  
  
  // Request testnet ETH from faucet  
  async requestTestnetETH(address: string): Promise<boolean> {  
    try {  
      // Sepolia faucet URL  
      const faucetResponse = await fetch('https://sepoliafaucet.com/', {  
        method: 'POST',  
        headers: { 'Content-Type': 'application/json' },  
        body: JSON.stringify({ address })  
      });  
      return faucetResponse.ok;  
    } catch (error) {  
      console.error('Faucet request failed:', error);  
      return false;  
    }  
  }  
}  
  
// Singleton instance for testnet  
export const contractService = new ContractService();