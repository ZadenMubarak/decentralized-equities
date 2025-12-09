import { Coins, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function TokenizedAssets() {
  const tokenizedAssets = [
    {
      id: 1,
      name: "Tesla Stock Token",
      symbol: "TSLA-T",
      totalValue: "$234.5M",
      holders: "15,234",
      blockchain: "Ethereum",
      smartContract: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
      icon: "🚗",
    },
    {
      id: 2,
      name: "Gold Token",
      symbol: "AU-T",
      totalValue: "$1.2B",
      holders: "82,456",
      blockchain: "Polygon",
      smartContract: "0x9ad6C38BE94206cA50bb0d0B6Ba20a1038d44916",
      icon: "✨",
    },
    {
      id: 3,
      name: "Apple Stock Token",
      symbol: "AAPL-T",
      totalValue: "$567.8M",
      holders: "34,567",
      blockchain: "Ethereum",
      smartContract: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
      icon: "🍎",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Tokenized Assets</h1>
        <p className="text-muted-foreground">
          Blockchain-verified tokenized stocks, commodities, and currencies
        </p>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <Coins className="text-blue-600" size={24} />
          </div>
          <h3 className="font-bold mb-1">Total Tokenized Assets</h3>
          <p className="text-3xl font-bold text-primary">$5.2B+</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <Shield className="text-purple-600" size={24} />
          </div>
          <h3 className="font-bold mb-1">Smart Contracts</h3>
          <p className="text-3xl font-bold">250+</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <ArrowRight className="text-green-600" size={24} />
          </div>
          <h3 className="font-bold mb-1">Active Holders</h3>
          <p className="text-3xl font-bold">450K+</p>
        </div>
      </div>

      {/* Tokenized Assets List */}
      <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-bold">Featured Tokens</h3>
        </div>
        <div className="divide-y divide-border">
          {tokenizedAssets.map((asset) => (
            <div
              key={asset.id}
              className="p-6 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center justify-between gap-6 flex-col md:flex-row">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-lg flex items-center justify-center text-2xl">
                    {asset.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-lg">{asset.name}</p>
                    <p className="text-sm text-muted-foreground mb-2">{asset.symbol}</p>
                    <div className="flex flex-wrap gap-3 text-xs">
                      <span className="px-2 py-1 bg-slate-100 rounded text-muted-foreground">
                        {asset.blockchain}
                      </span>
                      <span className="px-2 py-1 bg-slate-100 rounded text-muted-foreground">
                        {asset.holders} holders
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 flex-col sm:flex-row">
                  <div className="text-right">
                    <p className="text-2xl font-bold">{asset.totalValue}</p>
                    <p className="text-xs text-muted-foreground">Total Value</p>
                  </div>
                  <Link to="/trade">
                    <Button>Trade</Button>
                  </Link>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground font-mono">
                  Contract: {asset.smartContract}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How it Works */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-bold mb-4">How Tokenization Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              step: 1,
              title: "Real Asset",
              description: "Physical or digital assets are registered",
            },
            {
              step: 2,
              title: "Smart Contract",
              description: "Created on blockchain network",
            },
            {
              step: 3,
              title: "Token Issuance",
              description: "Tokens represent fractional ownership",
            },
            {
              step: 4,
              title: "Trading",
              description: "Trade 24/7 on our platform",
            },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3">
                {item.step}
              </div>
              <p className="font-semibold mb-1">{item.title}</p>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
