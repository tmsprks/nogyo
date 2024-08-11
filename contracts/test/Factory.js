const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Factory", function () {
  let SupplyChainNFT, supplyChainNFT, Factory, factory, owner, consumer, intermediary, producer;

  beforeEach(async function () {
    [owner, consumer, intermediary, producer] = await ethers.getSigners();

    // Deploy the NFT contract
    SupplyChainNFT = await ethers.getContractFactory("SupplyChainNFT");
    supplyChainNFT = await SupplyChainNFT.deploy(owner.address);
    await supplyChainNFT.waitForDeployment();

    // Deploy the Factory contract
    Factory = await ethers.getContractFactory("Factory");
    factory = await Factory.deploy();
    await factory.waitForDeployment();
  });

  it("Should create an Escrow contract for an NFT", async function () {
    // Create an escrow contract
    const tx = await factory.createEscrow(0, producer.address, intermediary.address, supplyChainNFT.getAddress());
    const receipt = await tx.wait();

    // Get the created Escrow contract address
    const escrowAddress = await factory.escrowContracts(0);
    expect(escrowAddress).to.not.equal(ethers.AddressZero);
  });

  it("Should create a SupplyChainTracking contract for an NFT", async function () {
    // Create a tracking contract
    const tx = await factory.createTracking(0);
    const receipt = await tx.wait();

    // Get the created Tracking contract address
    const trackingAddress = await factory.trackingContracts(0);
    expect(trackingAddress).to.not.equal(ethers.AddressZero);
  });
});
