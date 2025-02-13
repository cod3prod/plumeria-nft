import { ethers } from "ethers";
import { provider } from "@/configs/provider";

const ERC1155_INTERFACE_ID = "0xd9b67a26"; // ERC-1155 interface ID

// 주소 형식 검증 함수
const isValidAddress = (address: string): boolean => {
  return address.startsWith("0x") && ethers.isAddress(address);
};

const isContractAddress = async (address: string) => { 
  const code = await provider.getCode(address);
  return code !== "0x";
};

const supportERC1155 = async (address: string) => {
  const contract = new ethers.Contract(
    address,
    ["function supportsInterface(bytes4 interfaceId) view returns (bool)"],
    provider
  );
  try {
    return await contract.supportsInterface(ERC1155_INTERFACE_ID);
  } catch (error) {
    console.error("Error checking ERC-1155 support:", error);
    return false;
  }
};

export { isValidAddress, isContractAddress, supportERC1155 };
