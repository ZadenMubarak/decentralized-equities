import { Copy, ExternalLink, Send, Plus, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Wallet() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [copied, setCopied] = useState(false);

  const walletAddress = "0x742d35Cc6634C0532925a3b844Bc98e5e3a6c2Ac43B2";
  const shortAddress = "0x742d...43B2";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const balances = [
    { symbol: "ETH", name: "Ethereum", amount: 2.5, usdValue: 5102.50, color: "from-purple-400 to-blue-500" },
    { symbol: "USDC", name: "USD Coin", amount: 12450.00, usdValue: 12450.00, color: "from-blue-400 to-cyan-500" },
    { symbol: "MATIC", name: "Polygon", amount: 1000, usdValue: 890.50, color: "from-violet-400 to-purple-500" },
  ];

  const networks = [
    { name: "Ethereum", status: "connected", icon: "Ξ" },
    { name: "Polygon", status: "connected", icon: "◈" },
    { name: "Arbitrum", status: "available", icon: "⚡" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Wallet</h1>
        <p className="text-muted-foreground">Connect wallet and manage your funds</p>
      </div>

      {!walletConnected ? (
        // Not Connected State
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-12 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Zap size={40} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
          <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
            Connect your Web3 wallet to start trading tokenized assets and manage your blockchain portfolio
          </p>
          <div className="space-y-3 max-w-sm mx-auto">
            <Button
              onClick={() => setWalletConnected(true)}
              className="w-full h-12 text-base font-semibold"
            >
              MetaMask
            </Button>
            <Button variant="outline" className="w-full h-12 text-base font-semibold">
              WalletConnect
            </Button>
            <Button variant="outline" className="w-full h-12 text-base font-semibold">
              Coinbase Wallet
            </Button>
            <Button variant="outline" className="w-full h-12 text-base font-semibold">
              Ledger Live
            </Button>
          </div>
        </div>
      ) : (
        // Connected State
        <>
          {/* Wallet Info Card */}
          <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-8 text-white shadow-lg">
            <p className="text-sm opacity-90 mb-2">Connected Wallet</p>
            <div className="flex items-center justify-between gap-4 flex-col sm:flex-row">
              <div>
                <p className="text-3xl font-bold mb-2">{shortAddress}</p>
                <p className="text-sm opacity-75">Ethereum Mainnet</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="bg-white/20 hover:bg-white/30 rounded-lg p-3 transition-colors"
                >
                  <Copy size={20} />
                </button>
                <a
                  href={`https://etherscan.io/address/${walletAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 hover:bg-white/30 rounded-lg p-3 transition-colors"
                >
                  <ExternalLink size={20} />
                </a>
              </div>
            </div>
            {copied && (
              <p className="text-sm mt-3 opacity-90">✓ Address copied to clipboard</p>
            )}
          </div>

          {/* Total Balance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
              <p className="text-sm text-muted-foreground mb-2">Total Balance</p>
              <p className="text-4xl font-bold mb-2">$18,443.00</p>
              <p className="text-sm text-green-600 font-medium">↑ 2.3% from last week</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
              <p className="text-sm text-muted-foreground mb-2">Available to Trade</p>
              <p className="text-4xl font-bold mb-4">$18,443.00</p>
              <Button className="w-full gap-2">
                <Plus size={18} />
                Add Funds
              </Button>
            </div>
          </div>

          {/* Token Balances */}
          <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-bold">Token Balances</h3>
            </div>
            <div className="divide-y divide-border">
              {balances.map((balance) => (
                <div key={balance.symbol} className="p-6 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${balance.color} rounded-lg flex items-center justify-center text-white font-bold text-lg`}>
                        {balance.icon || balance.symbol[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{balance.name}</p>
                        <p className="text-sm text-muted-foreground">{balance.symbol}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">{balance.amount.toFixed(2)} {balance.symbol}</p>
                      <p className="text-sm text-muted-foreground">${balance.usdValue.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Network Status */}
          <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
            <h3 className="text-lg font-bold mb-4">Connected Networks</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {networks.map((network) => (
                <div key={network.name} className="p-4 border border-border rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold">{network.icon} {network.name}</p>
                    {network.status === "connected" ? (
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    ) : (
                      <button className="text-xs px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 transition-colors">
                        Connect
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {network.status === "connected" ? "Connected" : "Available"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Transaction History */}
          <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Recent Transactions</h3>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
            <div className="space-y-3">
              {[
                {
                  type: "send",
                  asset: "USDC",
                  amount: -500,
                  to: "0x8ba1f1...2Ac",
                  time: "2 hours ago",
                  hash: "0x1234...abcd",
                },
                {
                  type: "receive",
                  asset: "ETH",
                  amount: 0.5,
                  from: "0x5678e9...3Bd",
                  time: "1 day ago",
                  hash: "0x5678...efgh",
                },
              ].map((tx, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === "send" ? "bg-red-100" : "bg-green-100"}`}>
                      <Send size={20} className={tx.type === "send" ? "text-red-600" : "text-green-600"} />
                    </div>
                    <div>
                      <p className="font-medium">
                        {tx.type === "send" ? "Sent" : "Received"} {tx.asset}
                      </p>
                      <p className="text-xs text-muted-foreground">{tx.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${tx.type === "send" ? "text-red-600" : "text-green-600"}`}>
                      {tx.type === "send" ? "-" : "+"}{Math.abs(tx.amount)} {tx.asset}
                    </p>
                    <a
                      href={`https://etherscan.io/tx/${tx.hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline flex items-center gap-1 justify-end"
                    >
                      View <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
            <div className="flex items-start gap-4">
              <Shield size={24} className="text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-1">Your wallet is secure</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Your private keys are never shared with BlockTrade. All transactions are signed locally on your device.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setWalletConnected(false)}
                >
                  Disconnect Wallet
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
