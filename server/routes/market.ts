import { RequestHandler } from "express";  
  
export const handleMarketData: RequestHandler = async (req, res) => {  
  try {  
    // Fetch real-time data from CoinGecko API  
    const response = await fetch(  
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,tether&order=market_cap_desc&per_page=10&page=1&sparkline=false'  
    );  
      
    if (!response.ok) throw new Error('Failed to fetch market data');  
      
    const cryptoData = await response.json();  
      
    // Transform data to match your asset structure  
    const marketAssets = [  
      {  
        id: 1,  
        name: "Bitcoin",  
        ticker: "BTC-T",  
        price: cryptoData.find(c => c.id === 'bitcoin')?.current_price || 42305.67,  
        change: cryptoData.find(c => c.id === 'bitcoin')?.price_change_percentage_24h || 8.92,  
        volume: "$3.2B",  
        category: "crypto",  
        logo: "₿",  
      },  
      {  
        id: 2,  
        name: "Ethereum",   
        ticker: "ETH-T",  
        price: cryptoData.find(c => c.id === 'ethereum')?.current_price || 2204.56,  
        change: cryptoData.find(c => c.id === 'ethereum')?.price_change_percentage_24h || 6.78,  
        volume: "$1.9B",  
        category: "crypto",  
        logo: "Ξ",  
      },  
      // Add more assets with real or mock data  
      {  
        id: 3,  
        name: "Tesla",  
        ticker: "TSLA-T",   
        price: 245.67,  
        change: 5.23,  
        volume: "$2.3B",  
        category: "stocks",  
        logo: "🚗",  
      },  
      // ... other assets  
    ];  
  
    res.status(200).json({ assets: marketAssets });  
  } catch (error) {  
    console.error('Market data fetch error:', error);  
    // Fallback to mock data  
    res.status(200).json({   
      assets: [  
        {  
          id: 1,  
          name: "Bitcoin",  
          ticker: "BTC-T",  
          price: 42305.67,  
          change: 8.92,  
          volume: "$3.2B",   
          category: "crypto",  
          logo: "₿",  
        },  
        // ... rest of mock assets  
      ]  
    });  
  }  
};