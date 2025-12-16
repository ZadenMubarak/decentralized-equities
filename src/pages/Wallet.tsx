import {
  Copy,
  ExternalLink,
  Send,
  Plus,
  Zap,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useWallet } from "@/hooks/useWallet"

export default function Wallet() {
  const { wallet, connectWallet, disconnectWallet } = useWallet()
  const [copied, setCopied] = useState(false)

  const walletAddress = wallet?.address ?? ""
  const shortAddress = walletAddress
    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
    : ""

  const copyToClipboard = () => {
    if (!walletAddress) return
    navigator.clipboard.writeText(walletAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const balances = [
    { symbol: "ETH", name: "Ethereum", amount: 2.5, usdValue: 5102.5, color: "from-purple-400 to-blue-500" },
    { symbol: "USDC", name: "USD Coin", amount: 12450.0, usdValue: 12450.0, color: "from-blue-400 to-cyan-500" },
    { symbol: "MATIC", name: "Polygon", amount: 1000, usdValue: 890.5, color: "from-violet-400 to-purple-500" },
  ]

  const networks = [
    { name: "Ethereum", status: "connected", icon: "Ξ" },
    { name: "Polygon", status: "connected", icon: "◈" },
    { name: "Arbitrum", status: "available", icon: "⚡" },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Wallet</h1>
        <p className="text-muted-foreground">
          Connect wallet and manage your funds
        </p>
      </div>

      {!wallet ? (
        /* -------- NOT CONNECTED -------- */
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-12 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Zap size={40} className="text-white" />
          </div>

          <h2 className="text-2xl font-bold mb-2">
            Connect Your Wallet
          </h2>

          <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
            Connect your Web3 wallet to start trading tokenized assets
          </p>

          <div className="space-y-3 max-w-sm mx-auto">
            <Button
              onClick={connectWallet}
              className="w-full h-12 text-base font-semibold"
            >
              MetaMask
            </Button>

            <Button variant="outline" disabled className="w-full h-12">
              WalletConnect (coming soon)
            </Button>

            <Button variant="outline" disabled className="w-full h-12">
              Coinbase Wallet (coming soon)
            </Button>
          </div>
        </div>
      ) : (
        /* -------- CONNECTED -------- */
        <>
          {/* Wallet Info */}
          <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-8 text-white shadow-lg">
            <p className="text-sm opacity-90 mb-2">
              Connected Wallet
            </p>

            <div className="flex items-center justify-between gap-4 flex-col sm:flex-row">
              <div>
                <p className="text-3xl font-bold mb-2">
                  {shortAddress}
                </p>
                <p className="text-sm opacity-75">
                  Chain ID: {wallet.chainId}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="bg-white/20 hover:bg-white/30 rounded-lg p-3"
                >
                  <Copy size={20} />
                </button>

                <a
                  href={`https://etherscan.io/address/${walletAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 hover:bg-white/30 rounded-lg p-3"
                >
                  <ExternalLink size={20} />
                </a>
              </div>
            </div>

            {copied && (
              <p className="text-sm mt-3 opacity-90">
                ✓ Address copied
              </p>
            )}
          </div>

          {/* Disconnect */}
          <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
            <div className="flex items-start gap-4">
              <Shield size={24} className="text-green-600 mt-1" />
              <div>
                <h3 className="font-bold mb-1">
                  Your wallet is secure
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Transactions are signed locally on your device.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={disconnectWallet}
                >
                  Disconnect Wallet
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
