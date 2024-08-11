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

    // Mint an NFT to the producer
    const metadataURI = "ipfs://.......";
    await supplyChainNFT.mintNFT(producer.address, metadataURI);

    // Deploy the Factory contract
    Factory = await ethers.getContractFactory("Factory");
    factory = await Factory.deploy(supplyChainNFT.getAddress());
    await factory.waitForDeployment();
  });

  it("Should create an Escrow contract for an NFT", async function () {
    const tokenId = 0;

    // Producer creates an Escrow contract
    await factory.connect(producer).createEscrow(tokenId, consumer.address, intermediary.address, producer.address);

    // Retrieve the Escrow contract address
    const escrowAddress = await factory.escrowContracts(tokenId);
    expect(escrowAddress).to.not.equal(ethers.AddressZero);

    // Verify the Escrow contract was deployed
    const Escrow = await ethers.getContractFactory("Escrow");
    const escrow = Escrow.attach(escrowAddress);
    expect(await escrow.consumer()).to.equal(consumer.address);
    expect(await escrow.intermediary()).to.equal(intermediary.address);
    expect(await escrow.producer()).to.equal(producer.address);
  });

  it("Should create a SupplyChainTracking contract for an NFT", async function () {
    const tokenId = 0;

    // Producer creates a SupplyChainTracking contract
    await factory.connect(producer).createTracking(tokenId);

    // Retrieve the SupplyChainTracking contract address
    const trackingAddress = await factory.trackingContracts(tokenId);
    expect(trackingAddress).to.not.equal(ethers.AddressZero);

    // Verify the SupplyChainTracking contract was deployed
    const SupplyChainTracking = await ethers.getContractFactory("SupplyChainTracking");
    const tracking = SupplyChainTracking.attach(trackingAddress);
    expect(await tracking.nftContract()).to.equal(await supplyChainNFT.getAddress());
  });
});