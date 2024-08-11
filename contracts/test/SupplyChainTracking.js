const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SupplyChainTracking", function () {
  let SupplyChainNFT, supplyChainNFT, SupplyChainTracking, supplyChainTracking, owner, addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();

    // Deploy the NFT contract
    SupplyChainNFT = await ethers.getContractFactory("SupplyChainNFT");
    supplyChainNFT = await SupplyChainNFT.deploy(owner.address);
    await supplyChainNFT.waitForDeployment();

    // Mint an NFT to the owner
    const metadataURI = "ipfs://.......";
    await supplyChainNFT.mintNFT(owner.address, metadataURI);

    // Deploy the SupplyChainTracking contract
    SupplyChainTracking = await ethers.getContractFactory("SupplyChainTracking");
    supplyChainTracking = await SupplyChainTracking.deploy();
    await supplyChainTracking.waitForDeployment();

    // Initialize the SupplyChainTracking contract
    await supplyChainTracking.initialize(supplyChainNFT.getAddress());
  });

  it("Should update product status and location", async function () {
    await supplyChainTracking.updateProductStatus(0, "In Transit", "Warehouse A");

    const history = await supplyChainTracking.getProductHistory(0);
    expect(history[0].status).to.equal("In Transit");
    expect(history[0].location).to.equal("Warehouse A");
  });
});