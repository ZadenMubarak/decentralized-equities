import {
  ArrowDownLeft,
  ArrowUpRight,
  Search,
  Download,
  Filter,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Transactions() {
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const transactions = [
    {
      id: 1,
      type: "buy",
      asset: "Tesla Stock Token",
      symbol: "TSLA-T",
      amount: 5,
      price: 1228.35,
      date: "Nov 15, 2024",
      time: "2:45 PM",
      status: "completed",
      txHash: "0x1234...abcd",
      logo: "🚗",
    },
    {
      id: 2,
      type: "sell",
      asset: "Bitcoin",
      symbol: "BTC-T",
      amount: 0.5,
      price: 21180.50,
      date: "Nov 14, 2024",
      time: "11:20 AM",
      status: "completed",
      txHash: "0x5678...efgh",
      logo: "₿",
    },
    {
      id: 3,
      type: "buy",
      asset: "Ethereum Token",
      symbol: "ETH-T",
      amount: 2.5,
      price: 5102.75,
      date: "Nov 10, 2024",
      time: "3:15 PM",
      status: "completed",
      txHash: "0x9abc...ijkl",
      logo: "Ξ",
    },
    {
      id: 4,
      type: "buy",
      asset: "Gold Token",
      symbol: "AU-T",
      amount: 10,
      price: 20450.23,
      date: "Nov 8, 2024",
      time: "1:30 PM",
      status: "completed",
      txHash: "0xdef0...mnop",
      logo: "✨",
    },
    {
      id: 5,
      type: "sell",
      asset: "Apple Stock Token",
      symbol: "AAPL-T",
      amount: 20,
      price: 3784.90,
      date: "Nov 5, 2024",
      time: "10:00 AM",
      status: "completed",
      txHash: "0xghij...qrst",
      logo: "🍎",
    },
    {
      id: 6,
      type: "buy",
      asset: "Silver Token",
      symbol: "AG-T",
      amount: 50,
      price: 4012.50,
      date: "Oct 28, 2024",
      time: "4:20 PM",
      status: "completed",
      txHash: "0xklmn...uvwx",
      logo: "🥈",
    },
  ];

  const filteredTransactions = transactions.filter((tx) => {
    const matchesType = filterType === "all" || tx.type === filterType;
    const matchesSearch =
      tx.asset.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const totalBuys = transactions
    .filter((tx) => tx.type === "buy")
    .reduce((sum, tx) => sum + tx.price, 0);
  const totalSells = transactions
    .filter((tx) => tx.type === "sell")
    .reduce((sum, tx) => sum + tx.price, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-col md:flex-row">
        <div>
          <h1 className="text-3xl font-bold mb-2">Transactions</h1>
          <p className="text-muted-foreground">
            Complete history of all your trades and transfers
          </p>
        </div>
        <Button className="gap-2">
          <Download size={18} />
          Export CSV
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
          <p className="text-xs text-muted-foreground mb-2">Total Transactions</p>
          <p className="text-3xl font-bold">{transactions.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
          <p className="text-xs text-muted-foreground mb-2">Total Bought</p>
          <p className="text-3xl font-bold text-green-600">
            ${totalBuys.toFixed(2)}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
          <p className="text-xs text-muted-foreground mb-2">Total Sold</p>
          <p className="text-3xl font-bold text-red-600">
            ${totalSells.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl p-6 border border-border shadow-sm space-y-4">
        <div className="flex gap-4 flex-col sm:flex-row">
          <div className="flex-1 relative">
            <Search
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Search by asset name or symbol..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Calendar size={18} />
            Date Range
          </Button>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilterType("all")}
            className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
              filterType === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-slate-100 text-foreground hover:bg-slate-200"
            }`}
          >
            All Transactions
          </button>
          <button
            onClick={() => setFilterType("buy")}
            className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
              filterType === "buy"
                ? "bg-green-600 text-white"
                : "bg-slate-100 text-foreground hover:bg-slate-200"
            }`}
          >
            Buys Only
          </button>
          <button
            onClick={() => setFilterType("sell")}
            className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
              filterType === "sell"
                ? "bg-red-600 text-white"
                : "bg-slate-100 text-foreground hover:bg-slate-200"
            }`}
          >
            Sells Only
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-slate-50">
                <th className="px-6 py-4 text-left text-sm font-semibold">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Asset</th>
                <th className="px-6 py-4 text-right text-sm font-semibold">Amount</th>
                <th className="px-6 py-4 text-right text-sm font-semibold">Value</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Hash</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="border-b border-border hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        tx.type === "buy"
                          ? "bg-green-100"
                          : "bg-red-100"
                      }`}
                    >
                      {tx.type === "buy" ? (
                        <ArrowDownLeft
                          size={20}
                          className="text-green-600"
                        />
                      ) : (
                        <ArrowUpRight
                          size={20}
                          className="text-red-600"
                        />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-lg flex items-center justify-center text-lg">
                        {tx.logo}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{tx.asset}</p>
                        <p className="text-xs text-muted-foreground">{tx.symbol}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-medium">{tx.amount}</td>
                  <td className="px-6 py-4 text-right font-bold text-foreground">
                    ${tx.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-foreground text-sm">{tx.date}</p>
                      <p className="text-xs text-muted-foreground">{tx.time}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      ✓ {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href={`https://etherscan.io/tx/${tx.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-mono text-xs"
                    >
                      {tx.txHash}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredTransactions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No transactions found matching your criteria
          </p>
        </div>
      )}
    </div>
  );
}
