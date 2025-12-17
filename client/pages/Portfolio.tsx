import { BarChart3, PieChart, Download, TrendingUp, TrendingDown, RefreshCw } from "lucide-react";  
import { Button } from "@/components/ui/button";  
import { useState, useEffect } from "react";  
import { ChartContainer, ChartTooltipContent, ChartLegendContent } from "@/components/ui/chart";    
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";  
import { useWallet } from "@/hooks/useWallet";  
import { toast } from "sonner";  
import { Link } from "react-router-dom";  
  
interface Holding {  
  id: string;  
  name: string;  
  ticker: string;  
  shares: number;  
  costBasis: number;  
  currentPrice: number;  
  logo: string;  
  blockchain: string;  
  valueUSD?: number;  
  gain?: number;  
  gainPercent?: number;  
}  
  
export default function Portfolio() {  
  const { wallet, connectWallet } = useWallet();  
  const [viewMode, setViewMode] = useState<"list" | "chart">("list");  
  const [holdings, setHoldings] = useState<Holding[]>([]);  
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState<string | null>(null);  
  
  const fetchPortfolioData = async (address: string) => {  
    try {  
      setLoading(true);  
      setError(null);  
        
      const response = await fetch(`/api/portfolio/${address}`);  
      if (!response.ok) throw new Error('Failed to fetch portfolio');  
        
      const data = await response.json();  
        
      const processedHoldings = data.holdings.map((h: Holding) => ({  
        ...h,  
        valueUSD: h.shares * h.currentPrice,  
        gain: (h.shares * h.currentPrice) - (h.shares * h.costBasis),  
        gainPercent: ((h.shares * h.currentPrice) - (h.shares * h.costBasis)) / (h.shares * h.costBasis) * 100  
      }));  
        
      setHoldings(processedHoldings);  
    } catch (err) {  
      setError(err instanceof Error ? err.message : 'Failed to load portfolio');  
      setHoldings([]);  
    } finally {  
      setLoading(false);  
    }  
  };  
  
  useEffect(() => {  
    if (wallet?.address) {  
      fetchPortfolioData(wallet.address);  
    } else {  
      setHoldings([]);  
    }  
  }, [wallet?.address]);  
  
  const calculateValue = (shares: number, price: number) => shares * price;  
  const calculateGain = (shares: number, costBasis: number, currentPrice: number) => {  
    return (shares * currentPrice) - (shares * costBasis);  
  };  
  
  const processedHoldings = holdings.map(h => ({  
    ...h,  
    valueUSD: calculateValue(h.shares, h.currentPrice),  
    gain: calculateGain(h.shares, h.costBasis, h.currentPrice),  
    gainPercent: ((calculateGain(h.shares, h.costBasis, h.currentPrice) / (h.shares * h.costBasis)) * 100)  
  }));  
  
  const totalValue = processedHoldings.reduce((sum, h) => sum + (h.valueUSD || 0), 0);  
  const totalCost = processedHoldings.reduce((sum, h) => sum + calculateValue(h.shares, h.costBasis), 0);  
  const totalGain = totalValue - totalCost;  
  const gainPercentage = totalCost > 0 ? ((totalGain / totalCost) * 100).toFixed(2) : "0.00";  
  
  const exportReport = () => {  
    const csvContent = [  
      ["Asset", "Ticker", "Shares", "Cost Basis", "Current Price", "Value", "Gain/Loss", "Return %", "Blockchain"],  
      ...processedHoldings.map(h => [  
        h.name,  
        h.ticker,  
        h.shares.toString(),  
        `$${h.costBasis.toFixed(2)}`,  
        `$${h.currentPrice.toFixed(2)}`,  
        `$${(h.valueUSD || 0).toFixed(2)}`,  
        `$${(h.gain || 0).toFixed(2)}`,  
        `${(h.gainPercent || 0).toFixed(2)}%`,  
        h.blockchain  
      ])  
    ].map(row => row.join(",")).join("\n");  
  
    const blob = new Blob([csvContent], { type: "text/csv" });  
    const url = window.URL.createObjectURL(blob);  
    const a = document.createElement("a");  
    a.href = url;  
    a.download = `portfolio-${new Date().toISOString().split("T")[0]}.csv`;  
    a.click();  
    window.URL.revokeObjectURL(url);  
      
    toast.success("Portfolio report exported successfully!");  
  };  
  
  const refreshData = () => {  
    if (wallet?.address) {  
      fetchPortfolioData(wallet.address);  
    }  
  };  
  
  const pieChartData = processedHoldings.map(h => ({  
    name: h.name,  
    value: h.valueUSD || 0,  
    fill: `hsl(${(parseInt(h.id) * 60) % 360}, 70%, 50%)`,  
  }));  
  
  const barChartData = processedHoldings.map(h => ({  
    name: h.ticker,  
    value: h.valueUSD || 0,  
  }));  
  
  // Show connect wallet prompt when no wallet is connected  
  if (!wallet) {  
    return (  
      <div className="space-y-6 animate-fade-in">  
        <div>  
          <h1 className="text-3xl font-bold mb-2">Portfolio</h1>  
          <p className="text-muted-foreground">Connect your wallet to view your portfolio</p>  
        </div>  
          
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-12 text-center">  
          <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">  
            <BarChart3 size={40} className="text-white" />  
          </div>  
            
          <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>  
          <p className="text-muted-foreground mb-8 max-w-sm mx-auto">  
            Connect your Web3 wallet to view and manage your investment portfolio  
          </p>  
            
          <div className="max-w-sm mx-auto">  
            <Button  
              onClick={connectWallet}  
              className="w-full h-12 text-base font-semibold"  
            >  
              Connect Wallet  
            </Button>  
          </div>  
        </div>  
      </div>  
    );  
  }  
  
  return (  
    <div className="space-y-6 animate-fade-in">  
      {/* Header */}  
      <div className="flex items-start justify-between gap-4 flex-col md:flex-row">  
        <div>  
          <h1 className="text-3xl font-bold mb-2">Portfolio</h1>  
          <p className="text-muted-foreground">Manage your investment portfolio</p>  
        </div>  
        <div className="flex gap-2">  
          <Button variant="outline" onClick={refreshData} disabled={loading} className="gap-2">  
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />  
            Refresh  
          </Button>  
          <Button className="gap-2" onClick={exportReport} disabled={holdings.length === 0}>  
            <Download size={18} />  
            Export Report  
          </Button>  
        </div>  
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
          <p className="text-muted-foreground">Loading portfolio data...</p>  
        </div>  
      )}  
  
      {/* Empty State */}  
      {!loading && !error && holdings.length === 0 && (  
        <div className="bg-white rounded-xl p-8 border border-border shadow-sm text-center">  
          <BarChart3 size={48} className="text-muted-foreground mx-auto mb-4 opacity-50" />  
          <h3 className="text-lg font-semibold mb-2">No Portfolio Data</h3>  
          <p className="text-muted-foreground mb-4">You don't have any holdings yet</p>  
          <Link to="/market">  
            <Button>Start Trading</Button>  
          </Link>  
        </div>  
      )}  
  
      {/* Portfolio Data - Only show when we have holdings */}  
      {!loading && !error && holdings.length > 0 && (  
        <>  
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
  
          {viewMode === "list" ? (  
            /* Holdings List */  
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
                    {processedHoldings.map((holding) => {  
                      const isGain = (holding.gain || 0) >= 0;  
  
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
                            ${(holding.valueUSD || 0).toFixed(2)}  
                          </td>  
                          <td className={`px-6 py-4 text-sm text-right font-medium ${isGain ? "text-green-600" : "text-red-600"}`}>  
                            {isGain ? "+" : ""}{(holding.gain || 0).toFixed(2)}  
                          </td>  
                          <td className={`px-6 py-4 text-sm text-right font-medium flex items-center justify-end gap-1 ${isGain ? "text-green-600" : "text-red-600"}`}>  
                            {isGain ? <TrendingUp size={16} /> : <TrendingDown size={16} />}  
                            {parseFloat((holding.gainPercent || 0).toFixed(2)) >= 0 ? "+" : ""}{(holding.gainPercent || 0).toFixed(2)}%  
                          </td>  
                          <td className="px-6 py-4 text-sm text-muted-foreground">{holding.blockchain}</td>  
                        </tr>  
                      );  
                    })}  
                  </tbody>  
                </table>  
              </div>  
            </div>  
          ) : (  
            /* Chart View */  
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">  
              {/* Pie Chart */}  
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
                      data={pieChartData}  
                      cx="50%"  
                      cy="50%"  
                      labelLine={false}  
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}  
                      outerRadius={80}  
                      fill="#8884d8"  
                      dataKey="value"  
                    >  
                      {pieChartData.map((entry, index) => (  
                        <Cell key={`cell-${index}`} fill={entry.fill} />  
                      ))}  
                    </Pie>  
                    <Tooltip content={<ChartTooltipContent />} />  
                    <Legend content={<ChartLegendContent />} />  
                  </RechartsPieChart>  
                </ChartContainer>  
              </div>  
  
              {/* Bar Chart */}  
              <div className="bg-white rounded-xl p-6 border border-border shadow-sm">  
                <h3 className="text-lg font-bold mb-6">Portfolio Value by Asset</h3>  
                <ResponsiveContainer width="100%" height={256}>  
                  <BarChart data={barChartData}>  
                    <CartesianGrid strokeDasharray="3 3" />  
                    <XAxis dataKey="name" />  
                    <YAxis />  
                    <Tooltip content={<ChartTooltipContent />} />  
                    <Bar dataKey="value" fill="#3b82f6" />  
                  </BarChart>  
                </ResponsiveContainer>  
              </div>  
            </div>  
          )}  
        </>  
      )}  
    </div>  
  );  
}