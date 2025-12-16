import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react"
import { BrowserProvider } from "ethers"
import MetaMaskSDK from "@metamask/sdk"

/* ---------- Types ---------- */
export type WalletState = {
  address: string
  chainId: number
  provider: BrowserProvider
}

type WalletContextType = {
  wallet: WalletState | null
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
}

/* ---------- MetaMask SDK (singleton) ---------- */
const MMSDK = new MetaMaskSDK({
  dappMetadata: {
    name: "BlockTrade",
    url: window.location.href,
  },
})

/* ---------- Context ---------- */
const WalletContext = createContext<WalletContextType | null>(null)

/* ---------- Provider ---------- */
export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [wallet, setWallet] = useState<WalletState | null>(null)

  /* ---------- Connect ---------- */
  const connectWallet = async () => {
    const ethereum = MMSDK.getProvider()

    if (!ethereum) {
      throw new Error("MetaMask provider not available")
    }

    const accounts = (await ethereum.request({
      method: "eth_requestAccounts",
    })) as string[]

    if (!accounts || accounts.length === 0) {
      throw new Error("No accounts returned")
    }

    const provider = new BrowserProvider(ethereum)
    const signer = await provider.getSigner()
    const network = await provider.getNetwork()

    setWallet({
      address: await signer.getAddress(),
      chainId: Number(network.chainId),
      provider,
    })
  }

  /* ---------- Disconnect ---------- */
  const disconnectWallet = () => {
    setWallet(null)
  }

  /* ---------- SDK Event Listeners ---------- */
  useEffect(() => {
    const ethereum = MMSDK.getProvider()
    if (!ethereum) return

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        setWallet(null)
      } else {
        setWallet((prev) =>
          prev
            ? { ...prev, address: accounts[0] }
            : null
        )
      }
    }

    const handleChainChanged = (chainId: string) => {
      setWallet((prev) =>
        prev
          ? { ...prev, chainId: Number(chainId) }
          : null
      )
    }

    ethereum.on("accountsChanged", handleAccountsChanged)
    ethereum.on("chainChanged", handleChainChanged)

    return () => {
      ethereum.removeListener(
        "accountsChanged",
        handleAccountsChanged
      )
      ethereum.removeListener(
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
    throw new Error(
      "useWalletContext must be used within WalletProvider"
    )
  }
  return context
}
