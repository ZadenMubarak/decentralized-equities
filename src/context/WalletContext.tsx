import { createContext, useContext, useEffect, useState, ReactNode } from "react"  
import { BrowserProvider } from "ethers"  
import MetaMaskSDK from "@metamask/sdk"  
  
export type WalletState = {  
  address: string  
  chainId: number  
  provider: BrowserProvider  
}  
  
type WalletContextType = {  
  wallet: WalletState | null  
  connectWallet: () => Promise<void>  
  disconnectWallet: () => void  
  isInitializing: boolean  
}  
  
const WalletContext = createContext<WalletContextType | null>(null)  
  
// Lazy SDK initialization  
let MMSDK: MetaMaskSDK | null = null  
  
const getSDK = () => {  
  if (!MMSDK) {  
    MMSDK = new MetaMaskSDK({  
      dappMetadata: {  
        name: "BlockTrade",  
        url: window.location.href,  
      },  
      logging: {  
        developerMode: process.env.NODE_ENV === 'development',  
      },  
      checkInstallationImmediately: false,  
      shouldShimWeb3: false,  
    })  
  }  
  return MMSDK  
}  
  
export const WalletProvider = ({ children }: { children: ReactNode }) => {  
  const [wallet, setWallet] = useState<WalletState | null>(null)  
  const [isInitializing, setIsInitializing] = useState(false)  
  
  const connectWallet = async () => {  
    try {  
      setIsInitializing(true)  
      const sdk = getSDK()  
      const ethereum = sdk.getProvider()  
  
      if (!ethereum) {  
        throw new Error("MetaMask not installed. Please install MetaMask to continue.")  
      }  
  
      const accounts = (await ethereum.request({  
        method: "eth_requestAccounts",  
      })) as string[]  
  
      if (!accounts || accounts.length === 0) {  
        throw new Error("No accounts found. Please connect an account in MetaMask.")  
      }  
  
      const provider = new BrowserProvider(ethereum)  
      const signer = await provider.getSigner()  
      const network = await provider.getNetwork()  
  
      setWallet({  
        address: await signer.getAddress(),  
        chainId: Number(network.chainId),  
        provider,  
      })  
    } catch (error) {  
      console.error("Wallet connection failed:", error)  
      throw error  
    } finally {  
      setIsInitializing(false)  
    }  
  }  
  
  const disconnectWallet = () => {  
    setWallet(null)  
  }  
  
  useEffect(() => {  
    const sdk = getSDK()  
    const ethereum = sdk.getProvider()  
    if (!ethereum) return  
  
    const handleAccountsChanged = (accounts: string[]) => {  
      if (accounts.length === 0) {  
        setWallet(null)  
      } else {  
        setWallet((prev) =>  
          prev ? { ...prev, address: accounts[0] } : null  
        )  
      }  
    }  
  
    const handleChainChanged = (chainId: string) => {  
      setWallet((prev) =>  
        prev ? { ...prev, chainId: Number(chainId) } : null  
      )  
    }  
  
    ethereum.on("accountsChanged", handleAccountsChanged)  
    ethereum.on("chainChanged", handleChainChanged)  
  
    return () => {  
      ethereum.removeListener("accountsChanged", handleAccountsChanged)  
      ethereum.removeListener("chainChanged", handleChainChanged)  
    }  
  }, [])  
  
  return (  
    <WalletContext.Provider  
      value={{ wallet, connectWallet, disconnectWallet, isInitializing }}  
    >  
      {children}  
    </WalletContext.Provider>  
  )  
}  
  
export const useWalletContext = () => {  
  const context = useContext(WalletContext)  
  if (!context) {  
    throw new Error("useWalletContext must be used within a WalletProvider")  
  }  
  return context  
}