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

  it("Set Publisher 1", async function () {
    const { plumeria, publisher, user } = await loadFixture(deployTokenFixture);

    const tx = await plumeria.connect(publisher).setPublisher(user.address);
    const receipt = await tx.wait();
    console.log(
      "Set Publisher event : ",
      receipt?.logs[receipt?.logs.length - 1]
    );
    expect(await plumeria.publisher()).to.deep.equal(user.address);
  });

  it("Set Publisher 2", async function () {
    const { plumeria, user } = await loadFixture(deployTokenFixture);

    await expect(
      plumeria.connect(user).setPublisher(user.address)
    ).to.be.revertedWith("You are not the publisher");
  });

  it("Mint", async function () {
    const { plumeria, user } = await loadFixture(deployTokenFixture);
    for (let i = 0; i < 16; i++) {
      await plumeria.connect(user).mint(i + 1, 1);
      expect(await plumeria.totalSupply(i + 1)).to.deep.equal(1);
    }
  });

  it("MintBatch", async function () {
    const { plumeria, user } = await loadFixture(deployTokenFixture);
    const tokenIds = [];
    const amounts = [];

    for (let i = 0; i < 16; i++) {
      tokenIds.push(i + 1);
      amounts.push(1);
    }

    await plumeria.connect(user).mintBatch(tokenIds, amounts);

    for (let i = 0; i < 16; i++) {
      expect(await plumeria.totalSupply(i + 1)).to.deep.equal(1);
    }
  });

  it("Token upgrade", async function () {
    const { plumeria, user } = await loadFixture(deployTokenFixture);

    for (let i = 1; i < 17; i++) {
      await plumeria.connect(user).mint(i, 1);
    }
    console.log("before balances : ", await plumeria.getBalances(user.address));
    expect(await plumeria.totalSupply(1)).to.deep.equal(1);

    await plumeria.connect(user).setApprovalForAll(plumeria.target, true);
    const tx = await plumeria.connect(user).upgrade();
    const receipt = await tx.wait();
    console.log(
      "Token upgrade event : ",
      receipt?.logs[receipt?.logs.length - 1]
    );

    const after = await plumeria.getBalances(user.address);
    console.log("after balances : ", after);

    expect(after[0]).to.deep.equal(1);
    expect(await plumeria.totalSupply(0)).to.deep.equal(1);
    expect(await plumeria.totalSupply(1)).to.deep.equal(0);
  });

  it("Burn Error", async function () {
    const { plumeria, user } = await loadFixture(deployTokenFixture);
    await expect(plumeria.connect(user).burn(1, 1)).to.be.reverted;
  });

  it("BurnBatch Error 1", async function () {
    const { plumeria, user } = await loadFixture(deployTokenFixture);
    await expect(plumeria.connect(user).burnBatch([1, 2], [1, 2])).to.be
      .reverted;
  });

  it("BurnBatch Error 2", async function () {
    const { plumeria, user } = await loadFixture(deployTokenFixture);
    await plumeria.connect(user).mint(1, 1);
    await expect(plumeria.connect(user).burnBatch([0, 1], [1, 1])).to.be
      .reverted;
  });

  it("Burn Premium", async function () {
    const { plumeria, user } = await loadFixture(deployTokenFixture);
    for (let i = 1; i < 17; i++) {
      await plumeria.connect(user).mint(i, 1);
    }
    await plumeria.connect(user).setApprovalForAll(plumeria.target, true);
    const tx = await plumeria.connect(user).upgrade();
    const receipt = await tx.wait();
    console.log(
      "Burn Premium event : ",
      receipt?.logs[receipt?.logs.length - 1]
    );
    await plumeria.connect(user).burn(0, 1);
    expect(await plumeria.totalSupply(0)).to.deep.equal(0);
  });

  it("Burn and BurnBatch", async function () {
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

  it("SEt URI 1", async function () {
    const { plumeria, publisher } = await loadFixture(deployTokenFixture);
    const tx = await plumeria.connect(publisher).setMetadataUri("TEST1/");
    const receipt = await tx.wait();
    console.log("Set URI event : ", receipt?.logs[receipt?.logs.length - 1]);
    expect(await plumeria.uri(1)).to.equal("TEST1/1.json");
  });

  it("SEt URI 2", async function () {
    const { plumeria, user } = await loadFixture(deployTokenFixture);
    await expect(
      plumeria.connect(user).setMetadataUri("TEST2/")
    ).to.be.revertedWith("You are not the publisher");
  });

  it("Get URI", async function () {
    const { plumeria } = await loadFixture(deployTokenFixture);
    const uri = await plumeria.uri(1);
    console.log("uri : ", uri);
    expect(uri).to.equal(`${METADATA_URI!}1.json`);
  });

  it("Check Total Supply 1", async function () {
    const { plumeria, user } = await loadFixture(deployTokenFixture);

    expect(await plumeria.totalSupply(0)).to.equal(0);

    for (let i = 0; i < 500; i++) {
      await plumeria.connect(user).mint(1, 10);
    }

    await expect(plumeria.connect(user).mint(1, 1)).to.be.revertedWith(
      "The supply is full"
    );
  });

  it("Check Total Supply 2", async function () {
    const { plumeria, user } = await loadFixture(deployTokenFixture);

    expect(await plumeria.totalSupply(0)).to.equal(0);

    for (let i = 0; i < 500; i++) {
      await plumeria.connect(user).mint(16, 10);
    }

    const tokenIds = [];
    const amounts = [];

    for (let i = 0; i < 16; i++) {
      tokenIds.push(i + 1);
      amounts.push(1);
    }

    await expect(
      plumeria.connect(user).mintBatch(tokenIds, amounts)
    ).to.be.revertedWith("The supply is full");
  });

  it("Invalid mint", async function () {
    const { plumeria, user } = await loadFixture(deployTokenFixture);

    await expect(plumeria.connect(user).mint(0, 1)).to.be.revertedWith(
      "Invalid token ID"
    );

    await expect(plumeria.connect(user).mint(17, 1)).to.be.revertedWith(
      "Invalid token ID"
    );

    await expect(plumeria.connect(user).mint(16, 11)).to.be.revertedWith(
      "Invalid amount"
    );

    it("trasnfer", async function () {
      const { plumeria, publisher, user } = await loadFixture(
        deployTokenFixture
      );

      for (let i = 1; i <= 16; i++) {
        await plumeria.connect(publisher).mint(i, 1);
        await plumeria
          .connect(publisher)
          .setApprovalForAll(plumeria.target, true);
        await plumeria
          .connect(publisher)
          .safeTransferFrom(publisher.address, user.address, i, 1, "");
        expect(await plumeria.totalSupply(i)).to.deep.equal(1);
        expect(await plumeria.balanceOf(user.address, i)).to.deep.equal(1);
      }
    });

    it("trasnfer batch", async function () {
      const { plumeria, publisher, user } = await loadFixture(
        deployTokenFixture
      );

      const tokenIds = [1,2,3,4,5];
      const amounts = [10, 10, 10, 10, 10];
      await plumeria
        .connect(publisher)
        .mintBatch(tokenIds,amounts );
      await plumeria
        .connect(publisher)
        .setApprovalForAll(plumeria.target, true);
      await plumeria
        .connect(publisher)
        .safeBatchTransferFrom(publisher.address, user.address, tokenIds, amounts, "");

      tokenIds.forEach( async (id, index) => {
        expect(await plumeria.balanceOf(user.address, id)).to.deep.equals(amounts[index]);
        expect(await plumeria.totalSupply(id)).to.deep.equals(amounts[index]);
      })
    });
  });
});
