const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Escrow", function () {
  let Escrow, escrow, SupplyChainNFT, supplyChainNFT, owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy the NFT contract
    SupplyChainNFT = await ethers.getContractFactory("SupplyChainNFT");
    supplyChainNFT = await SupplyChainNFT.deploy(owner.address);
    await supplyChainNFT.waitForDeployment();

    // Mint an NFT to the owner
    const metadataURI = "ipfs://.......";
    await supplyChainNFT.mintNFT(owner.address, metadataURI);

    // Deploy the Escrow contract
    Escrow = await ethers.getContractFactory("Escrow");
    escrow = await Escrow.deploy();
    await escrow.waitForDeployment();

    // Initialize the Escrow contract
    await escrow.initialize(addr1.address, addr2.address, owner.address, supplyChainNFT.getAddress(), 0);

    // Approve the Escrow contract to manage the NFT
    await supplyChainNFT.connect(owner).approve(escrow.getAddress(), 0);
  });

  it("Should allow all parties to agree and finalize the transaction", async function () {
    await escrow.connect(addr1).confirmAgreement();
    await escrow.connect(addr2).confirmAgreement();
    await escrow.connect(owner).confirmAgreement();

    // Check if all parties have agreed
    expect(await escrow.consumerAgreed()).to.be.true;
    expect(await escrow.intermediaryAgreed()).to.be.true;
    expect(await escrow.producerAgreed()).to.be.true;
  });
});
