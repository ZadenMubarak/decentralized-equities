import { BarChart3, PieChart, Download, TrendingUp, TrendingDown } from "lucide-react";  
import { Button } from "@/components/ui/button";  
import { useState } from "react";  
import { ChartContainer, ChartTooltipContent, ChartLegendContent } from "@/components/ui/chart";    
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, Legend } from "recharts";  
  
export default function Portfolio() {  
  const [viewMode, setViewMode] = useState<"list" | "chart">("list");  
  
  const holdings = [  
    {  
      id: 1,  
      name: "Tesla Stock Token",  
      ticker: "TSLA-T",  
      shares: 25,  
      costBasis: 230.45,  
      currentPrice: 245.67,  
      logo: "🚗",  
      blockchain: "Ethereum",  
    },  
    {  
      id: 2,  
      name: "Apple Stock Token",  
      ticker: "AAPL-T",  
      shares: 50,  
      costBasis: 182.30,  
      currentPrice: 189.45,  
      logo: "🍎",  
      blockchain: "Ethereum",  
    },  
    {  
      id: 3,  
      name: "Gold Commodity",  
      ticker: "AU-T",  
      shares: 10,  
      costBasis: 2010.50,  
      currentPrice: 2045.23,  
      logo: "✨",  
      blockchain: "Polygon",  
    },  
    {  
      id: 4,  
      name: "Bitcoin",  
      ticker: "BTC-T",  
      shares: 0.5,  
      costBasis: 38900.00,  
      currentPrice: 42305.67,  
      logo: "₿",  
      blockchain: "Bitcoin L2",  
    },  
  ];  
  
  const calculateValue = (shares: number, price: number) => shares * price;  
  const calculateGain = (shares: number, costBasis: number, currentPrice: number) => {  
    return (shares * currentPrice) - (shares * costBasis);  
  };  
  
  const totalValue = holdings.reduce(  
    (sum, h) => sum + calculateValue(h.shares, h.currentPrice),  
    0  
  );  
  const totalCost = holdings.reduce(  
    (sum, h) => sum + calculateValue(h.shares, h.costBasis),  
    0  
  );  
  const totalGain = totalValue - totalCost;  
  const gainPercentage = ((totalGain / totalCost) * 100).toFixed(2);  
  
  return (  
    <div className="space-y-6 animate-fade-in">  
      {/* Header */}  
      <div className="flex items-start justify-between gap-4 flex-col md:flex-row">  
        <div>  
          <h1 className="text-3xl font-bold mb-2">Portfolio</h1>  
          <p className="text-muted-foreground">Manage your investment portfolio</p>  
        </div>  
        <Button className="gap-2">  
          <Download size={18} />  
          Export Report  
        </Button>  
      </div>  
  
      {/* Portfolio Summary Cards */}  
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">  
        <div className="bg-white rounded-xl p-6 border border-border shadow-sm">  
          <p className="text-xs text-muted-foreground mb-2">Total Value</p>  
          <p className="text-3xl font-bold text-foreground">${totalValue.toFixed(2)}</p>  
        </div>  
        <div className="bg-white rounded-xl p-6 border border-border shadow-sm">  
          <p className="text-xs text-muted-foreground mb-2">Total Cost Basis</p>  
          <p className="text-3xl font-bold text-muted-foreground">${totalCost.toFixed(2)}</p>  
        </div>  
        <div className="bg-white rounded-xl p-6 border border-border shadow-sm">  
          <p className="text-xs text-muted-foreground mb-2">Unrealized Gain</p>  
          <p className={`text-3xl font-bold ${totalGain >= 0 ? "text-green-600" : "text-red-600"}`}>  
            ${totalGain.toFixed(2)}  
          </p>  
        </div>  
        <div className="bg-white rounded-xl p-6 border border-border shadow-sm">  
          <p className="text-xs text-muted-foreground mb-2">Return %</p>  
          <p className={`text-3xl font-bold ${parseFloat(gainPercentage) >= 0 ? "text-green-600" : "text-red-600"}`}>  
            {parseFloat(gainPercentage) >= 0 ? "+" : ""}{gainPercentage}%  
          </p>  
        </div>  
      </div>  
  
      {/* View Mode Toggle */}  
      <div className="bg-white rounded-xl p-4 border border-border shadow-sm flex gap-2">  
        <button  
          onClick={() => setViewMode("list")}  
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${  
            viewMode === "list"  
              ? "bg-primary text-primary-foreground"  
              : "text-muted-foreground hover:text-foreground"  
          }`}  
        >  
          <BarChart3 size={18} />  
          List View  
        </button>  
        <button  
          onClick={() => setViewMode("chart")}  
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${  
            viewMode === "chart"  
              ? "bg-primary text-primary-foreground"  
              : "text-muted-foreground hover:text-foreground"  
          }`}  
        >  
          <PieChart size={18} />  
          Chart View  
        </button>  
      </div>  
  
      {/* Holdings List */}  
      <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">  
        <div className="overflow-x-auto">  
          <table className="w-full">  
            <thead>  
              <tr className="border-b border-border bg-slate-50">  
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Asset</th>  
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Shares</th>  
                <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Current Price</th>  
                <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Value</th>  
                <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Gain/Loss</th>  
                <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Return %</th>  
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Blockchain</th>  
              </tr>  
            </thead>  
            <tbody>  
              {holdings.map((holding) => {  
                const value = calculateValue(holding.shares, holding.currentPrice);  
                const gain = calculateGain(holding.shares, holding.costBasis, holding.currentPrice);  
                const gainPercent = ((gain / (holding.shares * holding.costBasis)) * 100).toFixed(2);  
                const isGain = gain >= 0;  
  
                return (  
                  <tr key={holding.id} className="border-b border-border hover:bg-slate-50 transition-colors">  
                    <td className="px-6 py-4">  
                      <div className="flex items-center gap-3">  
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-lg flex items-center justify-center text-lg">  
                          {holding.logo}  
                        </div>  
                        <div>  
                          <p className="font-medium text-foreground">{holding.name}</p>  
                          <p className="text-xs text-muted-foreground">{holding.ticker}</p>  
                        </div>  
                      </div>  
                    </td>  
                    <td className="px-6 py-4 text-sm text-foreground font-medium">{holding.shares}</td>  
                    <td className="px-6 py-4 text-sm text-right text-foreground font-medium">  
                      ${holding.currentPrice.toFixed(2)}  
                    </td>  
                    <td className="px-6 py-4 text-sm text-right text-foreground font-medium">  
                      ${value.toFixed(2)}  
                    </td>  
                    <td className={`px-6 py-4 text-sm text-right font-medium ${isGain ? "text-green-600" : "text-red-600"}`}>  
                      {isGain ? "+" : ""}{gain.toFixed(2)}  
                    </td>  
                    <td className={`px-6 py-4 text-sm text-right font-medium flex items-center justify-end gap-1 ${isGain ? "text-green-600" : "text-red-600"}`}>  
                      {isGain ? <TrendingUp size={16} /> : <TrendingDown size={16} />}  
                      {parseFloat(gainPercent) >= 0 ? "+" : ""}{gainPercent}%  
                    </td>  
                    <td className="px-6 py-4 text-sm text-muted-foreground">{holding.blockchain}</td>  
                  </tr>  
                );  
              })}  
            </tbody>  
          </table>  
        </div>  
      </div>  
  
      {/* Asset Allocation Chart */}    
      <div className="bg-white rounded-xl p-6 border border-border shadow-sm">    
        <h3 className="text-lg font-bold mb-6">Asset Allocation</h3>    
        <ChartContainer    
          config={{    
            value: {    
              label: "Portfolio Value",    
            },    
          }}    
          className="h-64"    
        >    
          <RechartsPieChart>    
            <Pie    
              data={holdings.map(h => ({    
                name: h.name,    
                value: calculateValue(h.shares, h.currentPrice),    
                fill: `hsl(${(h.id * 60) % 360}, 70%, 50%)`,    
              }))}    
              cx="50%"    
              cy="50%"    
              labelLine={false}    
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}    
              outerRadius={80}    
              fill="#8884d8"    
              dataKey="value"    
            >    
              {holdings.map((entry, index) => (    
                <Cell key={`cell-${index}`} fill={`hsl(${(index * 60) % 360}, 70%, 50%)`} />    
              ))}    
            </Pie>    
            <Tooltip content={<ChartTooltipContent />} />    
            <Legend content={<ChartLegendContent />} />    
          </RechartsPieChart>    
        </ChartContainer>    
      </div>  
    </div>  
  );  
}