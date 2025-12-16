export class ApiService {  
  private baseUrl = process.env.REACT_APP_API_URL;  
    
  async getPortfolio(address: string) {  
    const response = await fetch(`${this.baseUrl}/portfolio/${address}`);  
    return response.json();  
  }  
    
  async getMarketData() {  
    const response = await fetch(`${this.baseUrl}/market`);  
    return response.json();  
  }  
}