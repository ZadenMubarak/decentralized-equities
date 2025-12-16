import MetaMaskSDK from "@metamask/sdk";
import { BrowserProvider } from "ethers";

/* ---------- Types ---------- */
export type WalletConnection = {
  address: string
  chainId: number
  provider: BrowserProvider
}

/* ---------- MetaMask SDK Singleton ---------- */
const MMSDK = new MetaMaskSDK({
  dappMetadata: {
    name: "BlockTrade",
    url: window.location.href,
  },
  logging: {
    developerMode: true,
  },
})

/* ---------- Connect Wallet ---------- */
export const connectWallet = async (): Promise<WalletConnection> => {
  const ethereum = MMSDK.getProvider()

  if (!ethereum) {
    throw new Error("MetaMask provider not available")
  }

  // Request accounts
  const accounts = (await ethereum.request({
    method: "eth_requestAccounts",
  })) as string[]

  if (!accounts || accounts.length === 0) {
    throw new Error("No accounts returned")
  }

  const provider = new BrowserProvider(ethereum)
  const signer = await provider.getSigner()
  const network = await provider.getNetwork()

  return {
    address: await signer.getAddress(),
    chainId: Number(network.chainId),
    provider,
  }
}
