import { Coins, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";  
import { useWallet } from "@/hooks/useWallet";  

export default function TokenizedAssets() {  
  const { wallet } = useWallet();  
  const [assets, setAssets] = useState([]);  
  const [loading, setLoading] = useState(false);  
  
  useEffect(() => {  
    fetchTokenizedAssets();  
  }, []);  
  
  const fetchTokenizedAssets = async () => {  
    try {  
      setLoading(true);  
      const response = await fetch('/api/assets');  
      const data = await response.json();  
      setAssets(data);  
    } catch (error) {  
      console.error('Error fetching assets:', error);  
    } finally {  
      setLoading(false);  
    }  
  };  
  
  return (  
    <div className="space-y-6 animate-fade-in">  
      {/* Header */}  
      <div>  
        <h1 className="text-3xl font-bold mb-2">Tokenized Assets</h1>  
        <p className="text-muted-foreground">  
          Blockchain-verified tokenized stocks, commodities, and currencies  
        </p>  
      </div>  
  
      {/* Assets List */}  
      <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">  
        <div className="p-6 border-b border-border">  
          <h3 className="text-lg font-bold">Available Tokens</h3>  
        </div>  
        <div className="divide-y divide-border">  
          {assets.map((asset) => (  
            <div key={asset.id} className="p-6 hover:bg-slate-50 transition-colors">  
              <div className="flex items-center justify-between gap-6">  
                <div className="flex items-center gap-4 flex-1">  
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-lg flex items-center justify-center text-2xl">  
                    {asset.logo}  
                  </div>  
                  <div className="flex-1">  
                    <p className="font-bold text-lg">{asset.name}</p>  
                    <p className="text-sm text-muted-foreground mb-2">{asset.symbol}</p>  
                    <div className="flex flex-wrap gap-3 text-xs">  
                      <span className="px-2 py-1 bg-slate-100 rounded text-muted-foreground">  
                        {asset.assetType}  
                      </span>  
                      <span className="px-2 py-1 bg-slate-100 rounded text-muted-foreground">  
                        ${asset.currentPrice}  
                      </span>  
                    </div>  
                  </div>  
                </div>  
                <div className="flex items-center gap-4">  
                  <div className="text-right">  
                    <p className="text-2xl font-bold">${asset.totalValue}</p>  
                    <p className="text-xs text-muted-foreground">Total Value</p>  
                  </div>  
                  <Link to={`/trade?token=${asset.contractAddress}`}>  
                    <Button>Trade</Button>  
                  </Link>  
                </div>  
              </div>  
              <div className="mt-4 pt-4 border-t border-border">  
                <p className="text-xs text-muted-foreground font-mono">  
                  Contract: {asset.contractAddress}  
                </p>  
              </div>  
            </div>  
          ))}  
        </div>  
      </div>  
    </div>  
  );  
}