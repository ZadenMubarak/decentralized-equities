import { ArrowRightLeft, TrendingUp, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Trade() {
  const [orderType, setOrderType] = useState<"buy" | "sell">("buy");
  const [selectedAsset, setSelectedAsset] = useState("TSLA-T");

  const assets = [
    { symbol: "TSLA-T", name: "Tesla Stock Token", price: 245.67 },
    { symbol: "AAPL-T", name: "Apple Stock Token", price: 189.45 },
    { symbol: "AU-T", name: "Gold Token", price: 2045.23 },
    { symbol: "ETH-T", name: "Ethereum Token", price: 2204.56 },
  ];

  const selectedAssetData = assets.find((a) => a.symbol === selectedAsset);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Trade</h1>
        <p className="text-muted-foreground">
          Buy and sell tokenized assets instantly
        </p>
      </div>

      {/* Trading Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Form */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-border shadow-sm p-6">
          {/* Order Type Toggle */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setOrderType("buy")}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                orderType === "buy"
                  ? "bg-green-600 text-white"
                  : "bg-slate-100 text-foreground hover:bg-slate-200"
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => setOrderType("sell")}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                orderType === "sell"
                  ? "bg-red-600 text-white"
                  : "bg-slate-100 text-foreground hover:bg-slate-200"
              }`}
            >
              Sell
            </button>
          </div>

          {/* Asset Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Asset</label>
            <select
              value={selectedAsset}
              onChange={(e) => setSelectedAsset(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {assets.map((asset) => (
                <option key={asset.symbol} value={asset.symbol}>
                  {asset.name} ({asset.symbol}) - ${asset.price}
                </option>
              ))}
            </select>
          </div>

          {/* Amount Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">
              Amount ({selectedAsset})
            </label>
            <div className="relative">
              <Input
                type="number"
                placeholder="0.00"
                className="pr-12"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                {selectedAsset}
              </span>
            </div>
          </div>

          {/* Price and Total */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Price</p>
              <p className="text-lg font-bold">
                ${selectedAssetData?.price.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Total</p>
              <p className="text-lg font-bold">$0.00</p>
            </div>
          </div>

          {/* Order Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Order Type</label>
            <div className="flex gap-2">
              <button className="flex-1 px-4 py-2 rounded-lg border border-primary text-primary font-medium hover:bg-primary hover:text-primary-foreground transition-all">
                Market
              </button>
              <button className="flex-1 px-4 py-2 rounded-lg border border-input text-foreground hover:bg-slate-100 transition-all">
                Limit
              </button>
            </div>
          </div>

          {/* Fee Info */}
          <div className="bg-slate-50 rounded-lg p-4 mb-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">$0.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Trading Fee (0.5%)</span>
              <span className="font-medium">$0.00</span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between text-sm font-semibold">
              <span>Total Cost</span>
              <span>$0.00</span>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            className={`w-full py-3 text-base font-semibold ${
              orderType === "buy"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {orderType === "buy" ? "Buy Now" : "Sell Now"}
          </Button>
        </div>

        {/* Price Chart and Info */}
        <div className="space-y-4">
          {/* Price Chart Placeholder */}
          <div className="bg-white rounded-xl border border-border shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground">{selectedAsset}</p>
                <p className="text-2xl font-bold">${selectedAssetData?.price}</p>
              </div>
              <TrendingUp className="text-green-600" size={24} />
            </div>
            <div className="h-48 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground text-sm">Price chart</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-border shadow-sm p-6 space-y-3">
            <h3 className="font-bold mb-4">Quick Actions</h3>
            <button className="w-full px-4 py-2 rounded-lg border border-input hover:bg-slate-50 transition-colors font-medium text-sm">
              Set Price Alert
            </button>
            <button className="w-full px-4 py-2 rounded-lg border border-input hover:bg-slate-50 transition-colors font-medium text-sm">
              View History
            </button>
            <button className="w-full px-4 py-2 rounded-lg border border-input hover:bg-slate-50 transition-colors font-medium text-sm">
              Share Asset
            </button>
          </div>
        </div>
      </div>

      {/* Risk Disclosure */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <p className="text-sm text-yellow-800">
          ⚠️ <strong>Risk Disclosure:</strong> Trading involves risk. Past performance
          is not indicative of future results. Only invest what you can afford to lose.
        </p>
      </div>
    </div>
  );
}
