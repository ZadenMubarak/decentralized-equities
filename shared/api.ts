/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */

export interface DemoResponse {  
  message: string;  
}  
  
export interface PortfolioResponse {  
  holdings: Holding[];  
}  
  
export interface Holding {  
  id: string;  
  name: string;  
  ticker: string;  
  shares: number;  
  costBasis: number;  
  currentPrice: number;  
  logo: string;  
  blockchain: string;  
}