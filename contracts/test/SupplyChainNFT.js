const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SupplyChainNFT", function () {
  let SupplyChainNFT, supplyChainNFT, owner, addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    SupplyChainNFT = await ethers.getContractFactory("SupplyChainNFT");
    supplyChainNFT = await SupplyChainNFT.deploy(owner.address);
    await supplyChainNFT.waitForDeployment();
  });

  it("Should mint an NFT and assign it to the recipient", async function () {
    await supplyChainNFT.mintNFT(addr1.address);
    expect(await supplyChainNFT.ownerOf(0)).to.equal(addr1.address);
  });

  it("Should set the correct initial owner", async function () {
    expect(await supplyChainNFT.owner()).to.equal(owner.address);
  });
});