import { BarChart3, PieChart, Download, TrendingUp, TrendingDown, RefreshCw } from "lucide-react";  
import { Button } from "@/components/ui/button";  
import { useState, useEffect } from "react";  
import { ChartContainer, ChartTooltipContent, ChartLegendContent } from "@/components/ui/chart";    
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";  
import { useWallet } from "@/hooks/useWallet";  
import { toast } from "sonner";  
  
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
  const { wallet } = useWallet();  
  const [viewMode, setViewMode] = useState<"list" | "chart">("list");  
  const [holdings, setHoldings] = useState<Holding[]>([]);  
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState<string | null>(null);  
  
  // Mock API function - replace with real API call  
const fetchPortfolioData = async (address: string) => {  
  try {  
    setLoading(true);  
    setError(null);  
      
    const response = await fetch(`/api/portfolio/${address}`);  
    if (!response.ok) throw new Error('Failed to fetch portfolio');  
      
    const data = await response.json();  
      
    // Fix: Access the holdings property from the response  
    const processedHoldings = data.holdings.map((h: Holding) => ({  
      ...h,  
      valueUSD: h.shares * h.currentPrice,  
      gain: (h.shares * h.currentPrice) - (h.shares * h.costBasis),  
      gainPercent: ((h.shares * h.currentPrice) - (h.shares * h.costBasis)) / (h.shares * h.costBasis) * 100  
    }));  
      
    setHoldings(processedHoldings);  
  } catch (err) {  
    setError(err instanceof Error ? err.message : 'Failed to load portfolio');  
    setHoldings(getMockHoldings());  
  } finally {  
    setLoading(false);  
  }  
}; 
  
  // Mock data for demo when wallet not connected  
  const getMockHoldings = (): Holding[] => [  
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
  
  // Load portfolio data when wallet connects  
  useEffect(() => {  
    if (wallet?.address) {  
      fetchPortfolioData(wallet.address);  
    } else {  
      setHoldings(getMockHoldings());  
    }  
  }, [wallet?.address]);  
  
  const calculateValue = (shares: number, price: number) => shares * price;  
  const calculateGain = (shares: number, costBasis: number, currentPrice: number) => {  
    return (shares * currentPrice) - (shares * costBasis);  
  };  
  
  // Process holdings with calculated values  
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
  
  // Export functionality  
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
  
  // Refresh data  
  const refreshData = () => {  
    if (wallet?.address) {  
      fetchPortfolioData(wallet.address);  
    } else {  
      setHoldings(getMockHoldings());  
      toast.success("Portfolio data refreshed!");  
    }  
  };  
  
  // Chart data for pie chart  
  const pieChartData = processedHoldings.map(h => ({  
    name: h.name,  
    value: h.valueUSD || 0,  
    fill: `hsl(${(parseInt(h.id) * 60) % 360}, 70%, 50%)`,  
  }));  
  
  // Chart data for bar chart  
  const barChartData = processedHoldings.map(h => ({  
    name: h.ticker,  
    value: h.valueUSD || 0,  
    gain: h.gain || 0,  
  }));  
  
  return (  
    <div className="space-y-6 animate-fade-in">  
      {/* Header */}  
      <div className="flex items-start justify-between gap-4 flex-col md:flex-row">  
        <div>  
          <h1 className="text-3xl font-bold mb-2">Portfolio</h1>  
          <p className="text-muted-foreground">  
            {wallet?.address ? "Manage your investment portfolio" : "Connect wallet to view your portfolio"}  
          </p>  
        </div>  
        <div className="flex gap-2">  
          <Button variant="outline" onClick={refreshData} disabled={loading} className="gap-2">  
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />  
            Refresh  
          </Button>  
          <Button onClick={exportReport} className="gap-2">  
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
    </div>  
  );  
 }