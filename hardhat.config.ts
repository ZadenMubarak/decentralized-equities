import { HardhatUserConfig } from "hardhat/config";  
import "@nomicfoundation/hardhat-toolbox";  
import "dotenv/config";  
  
const config: HardhatUserConfig = {  
  solidity: {  
    version: "0.8.19",  
    settings: {  
      optimizer: {  
        enabled: true,  
        runs: 200  
      }  
    }  
  },  
  paths: {  
    sources: "./contracts",  
    tests: "./test",  
    cache: "./cache",  
    artifacts: "./artifacts"  
  },  
  networks: {  
    hardhat: {  
      chainId: 1337  
    },  
    localhost: {  
      url: "http://127.0.0.1:8545",  
      chainId: 1337  
    },  
    sepolia: {  
      url: process.env.SEPOLIA_URL || "",  
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],  
      chainId: 11155111  
    }  
  },  
  etherscan: {  
    apiKey: process.env.ETHERSCAN_API_KEY  
  },  
  gasReporter: {  
    enabled: process.env.REPORT_GAS !== undefined,  
    currency: "USD"  
  }  
};  
  
export default config;