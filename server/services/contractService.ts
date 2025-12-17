import { ethers } from 'ethers';  
import TokenizedAsset from '../artifacts/contracts/TokenizedAsset.sol/TokenizedAsset.json';  
import DecentralizedExchange from '../artifacts/contracts/DecentralizedExchange.sol/DecentralizedExchange.json';  
  
export class ContractService {  
  private provider: ethers.Provider;  
  private exchangeContract: ethers.Contract;  
    
  constructor(rpcUrl: string, exchangeAddress: string) {  
    this.provider = new ethers.JsonRpcProvider(rpcUrl);  
    this.exchangeContract = new ethers.Contract(  
      exchangeAddress,  
      DecentralizedExchange.abi,  
      this.provider  
    );  
  }  
    
  async deployAssetToken(params: {  
    name: string;  
    symbol: string;  
    assetType: string;  
    realWorldAsset: string;  
    initialSupply: number;  
    pricePerToken: number;  
  }, deployer: ethers.Wallet) {  
    const factory = new ethers.ContractFactory(  
      TokenizedAsset.abi,  
      TokenizedAsset.bytecode,  
      deployer  
    );  
      
    const contract = await factory.deploy(  
      params.name,  
      params.symbol,  
      params.assetType,  
      params.realWorldAsset,  
      params.initialSupply,  
      params.pricePerToken  
    );  
      
    await contract.waitForDeployment();  
    return contract.getAddress();  
  }  
    
  async placeOrder(tokenAddress: string, isBuy: boolean, amount: number, price: number, signer: ethers.Wallet) {  
    const contractWithSigner = this.exchangeContract.connect(signer);  
    const tx = await contractWithSigner.placeOrder(tokenAddress, isBuy, amount, price);  
    return tx.wait();  
  }  
    
  async getUserOrders(userAddress: string) {  
    const orders = [];  
    for (let i = 0; i < await this.exchangeContract.orderCounter(); i++) {  
      const order = await this.exchangeContract.orders(i);  
      if (order.trader.toLowerCase() === userAddress.toLowerCase()) {  
        orders.push(order);  
      }  
    }  
    return orders;  
  }  
}