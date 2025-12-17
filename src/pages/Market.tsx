import { Search, TrendingUp, TrendingDown, Filter, RefreshCw } from "lucide-react";  
import { Button } from "@/components/ui/button";  
import { Input } from "@/components/ui/input";  
import { useState, useEffect } from "react";  
  
interface MarketAsset {  
  id: number;  
  name: string;  
  ticker: string;  
  price: number;  
  change: number;  
  volume: string;  
  category: "stocks" | "commodities" | "crypto" | "currencies";  
  logo: string;  
}  
  
export default function Market() {  
  const [searchTerm, setSearchTerm] = useState("");  
  const [selectedCategory, setSelectedCategory] = useState("all");  
  const [assets, setAssets] = useState<MarketAsset[]>([]);  
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState<string | null>(null);  
  
  const fetchMarketData = async () => {  
    try {  
      setLoading(true);  
      setError(null);  
        
      const response = await fetch('/api/market');  
      if (!response.ok) throw new Error('Failed to fetch market data');  
        
      const data = await response.json();  
      setAssets(data.assets || []);  
    } catch (err) {  
      setError(err instanceof Error ? err.message : 'Failed to load market data');  
      // Expanded fallback mock data with more instruments  
      setAssets([  
        // Stocks  
        {  
          id: 1,  
          name: "Tesla",  
          ticker: "TSLA-T",  
          price: 245.67,  
          change: 5.23,  
          volume: "$2.3B",  
          category: "stocks",  
          logo: "🚗",  
        },  
        {  
          id: 2,  
          name: "Apple",  
          ticker: "AAPL-T",  
          price: 189.45,  
          change: 3.45,  
          volume: "$1.8B",  
          category: "stocks",  
          logo: "🍎",  
        },  
        {  
          id: 3,  
          name: "Microsoft",  
          ticker: "MSFT-T",  
          price: 378.92,  
          change: -1.23,  
          volume: "$1.2B",  
          category: "stocks",  
          logo: "💻",  
        },  
        {  
          id: 4,  
          name: "Amazon",  
          ticker: "AMZN-T",  
          price: 145.32,  
          change: 2.87,  
          volume: "$2.1B",  
          category: "stocks",  
          logo: "📦",  
        },  
        {  
          id: 5,  
          name: "Google",  
          ticker: "GOOGL-T",  
          price: 138.21,  
          change: 1.95,  
          volume: "$1.5B",  
          category: "stocks",  
          logo: "🔍",  
        },  
        {  
          id: 6,  
          name: "NVIDIA",  
          ticker: "NVDA-T",  
          price: 485.09,  
          change: 8.45,  
          volume: "$3.8B",  
          category: "stocks",  
          logo: "🎮",  
        },  
        {  
          id: 7,  
          name: "Meta",  
          ticker: "META-T",  
          price: 312.45,  
          change: -2.15,  
          volume: "$1.9B",  
          category: "stocks",  
          logo: "📘",  
        },  
        {  
          id: 8,  
          name: "Netflix",  
          ticker: "NFLX-T",  
          price: 425.67,  
          change: 4.32,  
          volume: "$890M",  
          category: "stocks",  
          logo: "🎬",  
        },  
        // Commodities  
        {  
          id: 9,  
          name: "Gold",  
          ticker: "AU-T",  
          price: 2045.23,  
          change: 2.15,  
          volume: "$890M",  
          category: "commodities",  
          logo: "✨",  
        },  
        {  
          id: 10,  
          name: "Silver",  
          ticker: "AG-T",  
          price: 24.56,  
          change: 1.87,  
          volume: "$450M",  
          category: "commodities",  
          logo: "🥈",  
        },  
        {  
          id: 11,  
          name: "Oil (WTI)",  
          ticker: "WTI-T",  
          price: 78.45,  
          change: -2.34,  
          volume: "$650M",  
          category: "commodities",  
          logo: "🛢️",  
        },  
        {  
          id: 12,  
          name: "Natural Gas",  
          ticker: "NG-T",  
          price: 2.87,  
          change: -3.21,  
          volume: "$320M",  
          category: "commodities",  
          logo: "🔥",  
        },  
        {  
          id: 13,  
          name: "Platinum",  
          ticker: "PLAT-T",  
          price: 945.32,  
          change: 0.95,  
          volume: "$180M",  
          category: "commodities",  
          logo: "⚪",  
        },  
        {  
          id: 14,  
          name: "Copper",  
          ticker: "COP-T",  
          price: 3.78,  
          change: 1.45,  
          volume: "$290M",  
          category: "commodities",  
          logo: "🔧",  
        },  
        // Crypto  
        {  
          id: 15,  
          name: "Bitcoin",  
          ticker: "BTC-T",  
          price: 42305.67,  
          change: 8.92,  
          volume: "$3.2B",  
          category: "crypto",  
          logo: "₿",  
        },  
        {  
          id: 16,  
          name: "Ethereum",  
          ticker: "ETH-T",  
          price: 2204.56,  
          change: 6.78,  
          volume: "$1.9B",  
          category: "crypto",  
          logo: "Ξ",  
        },  
        {  
          id: 17,  
          name: "Binance Coin",  
          ticker: "BNB-T",  
          price: 245.78,  
          change: 4.56,  
          volume: "$780M",  
          category: "crypto",  
          logo: "🔶",  
        },  
        {  
          id: 18,  
          name: "Cardano",  
          ticker: "ADA-T",  
          price: 0.58,  
          change: -1.23,  
          volume: "$320M",  
          category: "crypto",  
          logo: "💙",  
        },  
        {  
          id: 19,  
          name: "Solana",  
          ticker: "SOL-T",  
          price: 98.45,  
          change: 12.34,  
          volume: "$1.1B",  
          category: "crypto",  
          logo: "🟣",  
        },  
        {  
          id: 20,  
          name: "Polkadot",  
          ticker: "DOT-T",  
          price: 7.89,  
          change: 3.21,  
          volume: "$290M",  
          category: "crypto",  
          logo: "⚫",  
        },  
        {  
          id: 21,  
          name: "Ripple",  
          ticker: "XRP-T",  
          price: 0.62,  
          change: -0.87,  
          volume: "$1.4B",  
          category: "crypto",  
          logo: "🌊",  
        },  
        {  
          id: 22,  
          name: "Dogecoin",  
          ticker: "DOGE-T",  
          price: 0.089,  
          change: 15.67,  
          volume: "$450M",  
          category: "crypto",  
          logo: "🐕",  
        },  
        // Currencies  
        {  
          id: 23,  
          name: "EUR/USD",  
          ticker: "EURUSD-T",  
          price: 1.0845,  
          change: 0.45,  
          volume: "$1.1B",  
          category: "currencies",  
          logo: "💱",  
        },  
        {  
          id: 24,  
          name: "GBP/USD",  
          ticker: "GBPUSD-T",  
          price: 1.2734,  
          change: -0.23,  
          volume: "$890M",  
          category: "currencies",  
          logo: "🇬🇧",  
        },  
        {  
          id: 25,  
          name: "USD/JPY",  
          ticker: "USDJPY-T",  
          price: 149.87,  
          change: 0.78,  
          volume: "$750M",  
          category: "currencies",  
          logo: "🇯🇵",  
        },  
        {  
          id: 26,  
          name: "USD/CHF",  
          ticker: "USDCHF-T",  
          price: 0.8956,  
          change: -0.12,  
          volume: "$420M",  
          category: "currencies",  
          logo: "🇨🇭",  
        },  
        {  
          id: 27,  
          name: "AUD/USD",  
          ticker: "AUDUSD-T",  
          price: 0.6543,  
          change: 1.23,  
          volume: "$380M",  
          category: "currencies",  
          logo: "🇦🇺",  
        },  
        {  
          id: 28,  
          name: "USD/CAD",  
          ticker: "USDCAD-T",  
          price: 1.3654,  
          change: -0.56,  
          volume: "$410M",  
          category: "currencies",  
          logo: "🇨🇦",  
        },  
      ]);  
    } finally {  
      setLoading(false);  
    }  
  };  
  
  // Load data on mount and set up auto-refresh  
  useEffect(() => {  
    fetchMarketData();  
      
    // Auto-refresh every 30 seconds  
    const interval = setInterval(fetchMarketData, 30000);  
    return () => clearInterval(interval);  
  }, []);  
  
  const categories = [  
    { value: "all", label: "All Assets" },  
    { value: "stocks", label: "Stocks" },  
    { value: "commodities", label: "Commodities" },  
    { value: "crypto", label: "Crypto" },  
    { value: "currencies", label: "Currencies" },  
  ];  
  
  const filteredAssets = assets.filter((asset) => {  
    const matchesSearch =  
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||  
      asset.ticker.toLowerCase().includes(searchTerm.toLowerCase());  
    const matchesCategory =  
      selectedCategory === "all" || asset.category === selectedCategory;  
    return matchesSearch && matchesCategory;  
  });  
  
  return (  
    <div className="space-y-6 animate-fade-in">  
      {/* Header */}  
      <div className="flex items-start justify-between gap-4 flex-col md:flex-row">  
        <div>  
          <h1 className="text-3xl font-bold mb-2">Market</h1>  
          <p className="text-muted-foreground">Discover and trade tokenized assets</p>  
        </div>  
        <Button variant="outline" onClick={fetchMarketData} disabled={loading} className="gap-2">  
          <RefreshCw size={18} className={loading ? "animate-spin" : ""} />  
          Refresh  
        </Button>  
      </div>  
  
      {/* Error State */}  
      {error && (  
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">  
          <p className="text-red-600">{error}</p>  
        </div>  
      )}  
  
      {/* Loading State */}  
      {loading && (  
        <div className="bg-white rounded-xl p-8 border border-border shadow-sm text-center">  
          <RefreshCw size={32} className="animate-spin mx-auto mb-4 text-muted-foreground" />  
          <p className="text-muted-foreground">Loading market data...</p>  
        </div>  
      )}  
  
      {/* Search and Filter */}  
      <div className="bg-white rounded-xl p-6 border border-border shadow-sm space-y-4">  
        <div className="flex gap-4 flex-col sm:flex-row">  
          <div className="flex-1 relative">  
            <Search  
              size={20}  
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"  
            />  
            <Input  
              placeholder="Search by name or ticker..."  
              className="pl-10"  
              value={searchTerm}  
              onChange={(e) => setSearchTerm(e.target.value)}  
            />  
          </div>  
          <Button variant="outline" className="gap-2">  
            <Filter size={18} />  
            Advanced  
          </Button>  
        </div>  
  
        {/* Category Filter */}  
        <div className="flex gap-2 overflow-x-auto pb-2">  
          {categories.map((cat) => (  
            <button  
              key={cat.value}  
              onClick={() => setSelectedCategory(cat.value)}  
              className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all ${  
                selectedCategory === cat.value  
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"  
                  : "bg-slate-100 text-foreground hover:bg-slate-200"  
              }`}  
            >  
              {cat.label}  
            </button>  
          ))}  
        </div>  
      </div>  
  
      {/* Assets Grid */}  
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">  
        {filteredAssets.map((asset) => (  
          <div  
            key={asset.id}  
            className="bg-white rounded-xl p-6 border border-border hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer group"  
          >  
            <div className="flex items-start justify-between mb-4">  
              <div className="flex items-center gap-3 flex-1">  
                <div className="w-12 h-12 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">  
                  {asset.logo}  
                </div>  
                <div className="flex-1 min-w-0">  
                  <p className="font-semibold truncate">{asset.name}</p>  
                  <p className="text-xs text-muted-foreground">{asset.ticker}</p>  
                </div>  
              </div>  
            </div>  
  
            <div className="mb-4">  
              <p className="text-2xl font-bold mb-2">${asset.price.toFixed(2)}</p>  
              <div className="flex items-center gap-2">  
                <div  
                  className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${  
                    asset.change >= 0  
                      ? "bg-green-100 text-green-700"  
                      : "bg-red-100 text-red-700"  
                  }`}  
                >  
                  {asset.change >= 0 ? (  
                    <TrendingUp size={16} />  
                  ) : (  
                    <TrendingDown size={16} />  
                  )}  
                  <span>{asset.change >= 0 ? "+" : ""}{asset.change}%</span>  
                </div>  
                <p className="text-xs text-muted-foreground">24h</p>  
              </div>  
            </div>  
  
            <div className="border-t border-border pt-4 mb-4">  
              <p className="text-xs text-muted-foreground mb-1">Volume</p>  
              <p className="font-semibold">{asset.volume}</p>  
            </div>  
  
            <Button className="w-full">Buy Now</Button>  
          </div>  
        ))}  
      </div>  
  
      {filteredAssets.length === 0 && !loading && (  
        <div className="text-center py-12">  
          <p className="text-muted-foreground">No assets found matching your criteria</p>  
        </div>  
      )}  
    </div>  
  );  
}