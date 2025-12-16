import { ethers } from 'ethers';  
  
export class TokenContract {  
  constructor(private contract: ethers.Contract) {}  
    
  async buyToken(amount: number, tokenAddress: string) {  
    const tx = await this.contract.buyTokens(tokenAddress, amount);  
    return tx.wait();  
  }  
    
  async sellToken(amount: number, tokenAddress: string) {  
    const tx = await this.contract.sellTokens(tokenAddress, amount);  
    return tx.wait();  
  }  
}