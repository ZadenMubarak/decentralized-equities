import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react"
import { BrowserProvider } from "ethers"

/* ---------- Types ---------- */
declare global {
  interface Window {
    ethereum?: {
      request: (args: {
        method: string
        params?: unknown[]
      }) => Promise<unknown>
      on: (event: string, callback: (...args: any[]) => void) => void
      removeListener: (event: string, callback: (...args: any[]) => void) => void
    }
  }
}

export type WalletState = {
  address: string
  chainId: number
}

type WalletContextType = {
  wallet: WalletState | null
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
}

/* ---------- Context ---------- */
const WalletContext = createContext<WalletContextType | null>(null)

/* ---------- Provider ---------- */
export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [wallet, setWallet] = useState<WalletState | null>(null)

  const connectWallet = async () => {
    if (!window.ethereum) {
      throw new Error("Wallet not detected")
    }

    const provider = new BrowserProvider(window.ethereum)
    await provider.send("eth_requestAccounts", [])

    const signer = await provider.getSigner()
    const network = await provider.getNetwork()

    setWallet({
      address: await signer.getAddress(),
      chainId: Number(network.chainId),
    })
  }

  const disconnectWallet = () => {
    setWallet(null)
  }

  /* ---------- Wallet Listeners ---------- */
  useEffect(() => {
    if (!window.ethereum) return

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        setWallet(null)
      } else {
        setWallet((prev) =>
          prev ? { ...prev, address: accounts[0] } : null
        )
      }
    }

    const handleChainChanged = () => {
      window.location.reload()
    }

    window.ethereum.on("accountsChanged", handleAccountsChanged)
    window.ethereum.on("chainChanged", handleChainChanged)

    return () => {
      window.ethereum?.removeListener(
        "accountsChanged",
        handleAccountsChanged
      )
      window.ethereum?.removeListener(
        "chainChanged",
        handleChainChanged
      )
    }
  }, [])

  return (
    <WalletContext.Provider
      value={{ wallet, connectWallet, disconnectWallet }}
    >
      {children}
    </WalletContext.Provider>
  )
}

/* ---------- Hook ---------- */
export const useWalletContext = () => {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error("useWalletContext must be used within WalletProvider")
  }
  return context
}
