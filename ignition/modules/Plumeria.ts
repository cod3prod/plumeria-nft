import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import dotenv from "dotenv";
dotenv.config();

const METADATA_URI = process.env.METADATA_URI;

if (!METADATA_URI) {
  throw new Error("Missing environment variables");
}

const PlumeriaModule = buildModule("PlumeriaModule", (m) => {
  const plumeria = m.contract("Plumeria", ["plumeria", "PLM", METADATA_URI]);

  return { plumeria };
});

export default PlumeriaModule;
