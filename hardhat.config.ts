import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config();
const { PROVIDER, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env;

if (!PROVIDER || !PRIVATE_KEY || !ETHERSCAN_API_KEY) {
  throw new Error("Missing environment variables");
}

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: PROVIDER,
      accounts: [PRIVATE_KEY],
    },
    // hardhat: {
    //   mining: {
    //     auto: false,
    //     interval: [1000, 10000],
    //   },
    // },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};

export default config;
