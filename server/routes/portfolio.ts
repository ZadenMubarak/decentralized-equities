import { RequestHandler } from "express";  
  
export const handlePortfolio: RequestHandler = (req, res) => {  
  const { address } = req.params;  
    
  if (!address) {  
    return res.status(400).json({ holdings: [] });  
  }  
  
  // Mock portfolio data  
  const mockHoldings = [  
    {  
      id: "1",  
      name: "Tesla Stock Token",  
      ticker: "TSLA-T",  
      shares: 25,  
      costBasis: 230.45,  
      currentPrice: 245.67,  
      logo: "🚗",  
      blockchain: "Ethereum",  
    },  
    {  
      id: "2",  
      name: "Apple Stock Token",  
      ticker: "AAPL-T",  
      shares: 50,  
      costBasis: 182.30,  
      currentPrice: 189.45,  
      logo: "🍎",  
      blockchain: "Ethereum",  
    },  
    {  
      id: "3",  
      name: "Gold Commodity",  
      ticker: "AU-T",  
      shares: 10,  
      costBasis: 2010.50,  
      currentPrice: 2045.23,  
      logo: "✨",  
      blockchain: "Polygon",  
    },  
    {  
      id: "4",  
      name: "Bitcoin",  
      ticker: "BTC-T",  
      shares: 0.5,  
      costBasis: 38900.00,  
      currentPrice: 42305.67,  
      logo: "₿",  
      blockchain: "Bitcoin L2",  
    },  
  ];  
  
  res.status(200).json({ holdings: mockHoldings });  
};