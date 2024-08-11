const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SupplyChainTracking", function () {
  let SupplyChainNFT, supplyChainNFT, SupplyChainTracking, supplyChainTracking, owner, addr1, supplyChainNFTAddress;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    SupplyChainNFT = await ethers.getContractFactory("SupplyChainNFT");
    supplyChainNFT = await SupplyChainNFT.deploy(owner.address);
    await supplyChainNFT.waitForDeployment();
    supplyChainNFTAddress = supplyChainNFT.getAddress()

    SupplyChainTracking = await ethers.getContractFactory("SupplyChainTracking");
    supplyChainTracking = await SupplyChainTracking.deploy(supplyChainNFTAddress);
    await supplyChainTracking.waitForDeployment();

    await supplyChainNFT.mintNFT(owner.address);
  });

  it("Should update product status and location", async function () {
    await supplyChainTracking.updateProductStatus(0, "In Transit", "Warehouse A");
    const history = await supplyChainTracking.getProductHistory(0);
    expect(history[0].status).to.equal("In Transit");
    expect(history[0].location).to.equal("Warehouse A");
  });
});