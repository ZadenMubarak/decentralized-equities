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
  
  constructor(rpcUrl: string = process.env.RPC_URL || "http://localhost:8545") {  
    this.provider = new ethers.JsonRpcProvider(rpcUrl);  
  }  
  
  // Initialize with signer for transactions  
  async initialize(privateKey?: string) {  
    if (privateKey) {  
      this.signer = new ethers.Wallet(privateKey, this.provider);  
    } else {  
      // Use provider's signer for MetaMask integration  
      this.signer = await this.provider.getSigner();  
    }  
      
    // Initialize exchange contract (you'll need to deploy this first)  
    const exchangeAddress = process.env.EXCHANGE_CONTRACT_ADDRESS;  
    if (exchangeAddress) {  
      this.exchangeContract = new ethers.Contract(  
        exchangeAddress,  
        DecentralizedExchange.abi,  
        this.signer  
      );  
    }  
  }  
  
  // Deploy a new tokenized asset  
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
  
    const contract = await tokenFactory.deploy(  
      name,  
      symbol,  
      assetType,  
      realWorldAsset,  
      ethers.parseEther(initialSupply),  
      ethers.parseEther(pricePerToken)  
    );  
  
    await contract.waitForDeployment();  
    return contract.target as string;  
  }  
  
  // Get token details  
  async getTokenDetails(tokenAddress: string): Promise<AssetToken> {  
    const contract = new ethers.Contract(tokenAddress, TokenizedAsset.abi, this.provider);  
      
    const [name, symbol, assetType, realWorldAsset, totalSupply, pricePerToken] = await Promise.all([  
      contract.name(),  
      contract.symbol(),  
      contract.assetType(),  
      contract.realWorldAsset(),  
      contract.totalSupply(),  
      contract.pricePerToken()  
    ]);  
  
    return {  
      address: tokenAddress,  
      name,  
      symbol,  
      assetType,  
      realWorldAsset,  
      totalSupply: ethers.formatEther(totalSupply),  
      pricePerToken: ethers.formatEther(pricePerToken)  
    };  
  }  
  
  // Place a trading order  
  async placeOrder(  
    tokenAddress: string,  
    isBuy: boolean,  
    amount: string,  
    price: string  
  ): Promise<number> {  
    if (!this.exchangeContract || !this.signer) {  
      throw new Error("Exchange contract not initialized");  
    }  
  
    const tx = await this.exchangeContract.placeOrder(  
      tokenAddress,  
      isBuy,  
      ethers.parseEther(amount),  
      ethers.parseEther(price)  
    );  
  
    const receipt = await tx.wait();  
      
    // Get order ID from event (simplified - you'd parse events properly)  
    return receipt?.logs.length || 0;  
  }  
  
  // Get user's orders  
  async getUserOrders(userAddress: string): Promise<Order[]> {  
    if (!this.exchangeContract) {  
      throw new Error("Exchange contract not initialized");  
    }  
  
    // This would typically query events or use a subgraph  
    // Simplified for demonstration  
    const orders: Order[] = [];  
    const orderCount = await this.exchangeContract.orderCounter();  
      
    for (let i = 0; i < Number(orderCount); i++) {  
      const order = await this.exchangeContract.orders(i);  
      if (order.trader.toLowerCase() === userAddress.toLowerCase()) {  
        orders.push({  
          id: i,  
          trader: order.trader,  
          tokenAddress: order.tokenAddress,  
          isBuy: order.isBuy,  
          amount: ethers.formatEther(order.amount),  
          price: ethers.formatEther(order.price),  
          filled: order.filled  
        });  
      }  
    }  
  
    return orders;  
  }  
  
  // Get token balance for user  
  async getTokenBalance(tokenAddress: string, userAddress: string): Promise<string> {  
    const contract = new ethers.Contract(tokenAddress, TokenizedAsset.abi, this.provider);  
    const balance = await contract.balanceOf(userAddress);  
    return ethers.formatEther(balance);  
  }  
  
  // Transfer tokens  
  async transferToken(  
    tokenAddress: string,  
    to: string,  
    amount: string  
  ): Promise<string> {  
    if (!this.signer) throw new Error("Contract service not initialized with signer");  
  
    const contract = new ethers.Contract(tokenAddress, TokenizedAsset.abi, this.signer);  
    const tx = await contract.transfer(to, ethers.parseEther(amount));  
    const receipt = await tx.wait();  
    return receipt?.hash || "";  
  }  
  
  // Get all deployed tokens (you'd maintain a registry in production)  
  async getAllTokens(): Promise<AssetToken[]> {  
    // This would typically query a registry contract or database  
    // For now, return known token addresses from environment  
    const tokenAddresses = process.env.TOKEN_ADDRESSES?.split(',') || [];  
      
    const tokens = await Promise.all(  
      tokenAddresses.map(address => this.getTokenDetails(address))  
    );  
  
    return tokens;  
  }  
}  
  
// Singleton instance  
export const contractService = new ContractService();