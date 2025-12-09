import { ArrowUpRight, ArrowDownLeft, TrendingUp, Zap, Shield, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio Summary */}
        <div className="lg:col-span-2 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-8 text-white shadow-lg">
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium opacity-90">Total Portfolio Value</p>
              <h2 className="text-4xl md:text-5xl font-bold mt-2">$124,567.89</h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-white/20 rounded-full px-4 py-2">
                <ArrowUpRight size={18} />
                <span className="text-sm font-medium">+12.45% Today</span>
              </div>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs opacity-75 mb-2">Blockchain Assets</p>
                <p className="text-xl font-bold">$45,230.12</p>
              </div>
              <Link to="/wallet">
                <Button
                  variant="secondary"
                  className="bg-white text-blue-600 hover:bg-white/90"
                >
                  Manage Assets
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Unrealized Gains</p>
                <p className="text-2xl font-bold text-green-600">+$8,234</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp size={20} className="text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Wallet Balance</p>
                <p className="text-2xl font-bold">$12,450</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Zap size={20} className="text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio Assets */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Your Holdings</h3>
            <Link to="/portfolio">
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            {[
              {
                name: "Tesla Stock Token",
                ticker: "TSLA-T",
                shares: 25,
                price: 245.67,
                change: 5.23,
                logo: "🚗",
              },
              {
                name: "Apple Stock Token",
                ticker: "AAPL-T",
                shares: 50,
                price: 189.45,
                change: 3.45,
                logo: "🍎",
              },
              {
                name: "Gold Commodity",
                ticker: "AU-T",
                shares: 10,
                price: 2045.23,
                change: -1.23,
                logo: "✨",
              },
            ].map((asset, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-lg flex items-center justify-center text-2xl">
                    {asset.logo}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{asset.name}</p>
                    <p className="text-xs text-muted-foreground">{asset.shares} units • ${asset.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${(asset.shares * asset.price).toFixed(2)}</p>
                  <p className={`text-sm font-medium ${asset.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {asset.change >= 0 ? "+" : ""}{asset.change}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Highlight */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
          <h3 className="text-lg font-bold mb-4">Platform Features</h3>
          <div className="space-y-4">
            <div className="flex gap-3">
              <Shield size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Secure Blockchain</p>
                <p className="text-xs text-muted-foreground">Web3 wallet integration</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Zap size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Fast Trading</p>
                <p className="text-xs text-muted-foreground">Real-time market data</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Lock size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Tokenized Assets</p>
                <p className="text-xs text-muted-foreground">Fractional ownership</p>
              </div>
            </div>

            <Link to="/market" className="block pt-4">
              <Button className="w-full">Explore Market</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Recent Activity</h3>
          <Link to="/transactions">
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </Link>
        </div>

        <div className="space-y-3">
          {[
            {
              type: "buy",
              asset: "Tesla Stock Token",
              amount: 5,
              price: 1228.35,
              time: "2 hours ago",
            },
            {
              type: "sell",
              asset: "Bitcoin",
              amount: 0.5,
              price: 2340.50,
              time: "1 day ago",
            },
            {
              type: "buy",
              asset: "ETH Token",
              amount: 2.5,
              price: 5102.75,
              time: "3 days ago",
            },
          ].map((tx, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 border-b border-border last:border-0">
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    tx.type === "buy"
                      ? "bg-green-100"
                      : "bg-red-100"
                  }`}
                >
                  {tx.type === "buy" ? (
                    <ArrowDownLeft className={`text-green-600`} size={20} />
                  ) : (
                    <ArrowUpRight className={`text-red-600`} size={20} />
                  )}
                </div>
                <div>
                  <p className="font-medium">
                    {tx.type === "buy" ? "Bought" : "Sold"} {tx.asset}
                  </p>
                  <p className="text-xs text-muted-foreground">{tx.amount} units • {tx.time}</p>
                </div>
              </div>
              <p className="font-semibold">${tx.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
