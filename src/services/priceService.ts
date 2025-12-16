export class PriceService {  
  private prices = new Map<string, number>();  
    
  async updatePrices() {  
    // Connect to CoinGeck o API or similar  
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin&vs_currencies=usd');  
    const data = await response.json();  
      
    this.prices.set('ETH', data.ethereum.usd);  
    this.prices.set('BTC', data.bitcoin.usd);  
  }  
}