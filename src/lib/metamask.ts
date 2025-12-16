import MetaMaskSDK from "@metamask/sdk"

const MMSDK = new MetaMaskSDK({
  dappMetadata: {
    name: "BlockTrade",
    url: window.location.href,
  },
})

export const ethereum = MMSDK.getProvider()
