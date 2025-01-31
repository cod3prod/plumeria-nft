import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import dotenv from "dotenv";
dotenv.config();

const METADATA_URI = process.env.METADATA_URI;
if (!METADATA_URI) {
  throw new Error("Missing environment variables");
}

describe("Plumeria", function () {
  async function deployTokenFixture() {
    const [publisher, user] = await ethers.getSigners();
    const Plumeria = await ethers.getContractFactory("Plumeria");
    const plumeria = await Plumeria.connect(publisher).deploy(
      "plumeria",
      "PLM",
      METADATA_URI!
    );

    return { plumeria, publisher, user };
  }

  it("Token upgrade", async function () {
    const { plumeria, user } = await loadFixture(deployTokenFixture);

    for (let i = 1; i < 17; i++) {
      await plumeria.connect(user).mint(i, 1);
    }
    console.log("before balances : ", await plumeria.getBalances(user.address));

    await plumeria.connect(user).setApprovalForAll(plumeria.target, true);
    await plumeria.connect(user).upgrade();

    const after = await plumeria.getBalances(user.address);
    console.log("after balances : ", after);

    expect(after[0]).to.deep.equal(1);
  });

  it("Token burn", async function () {
    const { plumeria, user } = await loadFixture(deployTokenFixture);
    for (let i = 1; i < 17; i++) {
      await plumeria.connect(user).mint(i, 1);
    }
    console.log("before balances : ", await plumeria.getBalances(user.address));

    await plumeria.connect(user).setApprovalForAll(plumeria.target, true);
    await plumeria.connect(user).burn(1, 1);
    await plumeria.connect(user).burnBatch([2, 3], [1, 1]);

    const after = await plumeria.getBalances(user.address);
    console.log("after balances : ", after);

    expect(after).to.deep.equal([
      0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    ]);
  });

  it("Get URI", async function () {
    const { plumeria } = await loadFixture(deployTokenFixture);
    const uri = await plumeria.uri(1);
    console.log("uri : ", uri);
    expect(uri).to.equal(METADATA_URI!);
  });
});
