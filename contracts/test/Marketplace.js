const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Marketplace Contract", function () {
  let Marketplace, marketplace, SupplyChainNFT, supplyChainNFT, owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy the NFT contract
    SupplyChainNFT = await ethers.getContractFactory("SupplyChainNFT");
    supplyChainNFT = await SupplyChainNFT.deploy(owner.address);
    await supplyChainNFT.waitForDeployment();

    // Deploy the Factory contract
    Factory = await ethers.getContractFactory("Factory");
    factory = await Factory.deploy();
    await factory.waitForDeployment();


    // Deploy the Marketplace contract with the correct constructor arguments
    Marketplace = await ethers.getContractFactory("Marketplace");
    marketplace = await Marketplace.deploy(factory.getAddress(), supplyChainNFT.getAddress(), owner.address);
    await marketplace.waitForDeployment();
  });

  it("should mint and list NFT for sale", async function () {
    const metadataURI = "ipfs://.......";
    const price = ethers.parseEther("1");

    // Mint NFT
    const tx = await supplyChainNFT.connect(owner).mintNFT(owner.address, metadataURI);
    const receipt = await tx.wait();
    const tokenId = 

    // Approve marketplace to transfer the NFT
    await supplyChainNFT.connect(owner).approve(marketplace.address, tokenId);

    // Mint and list NFT as the owner
    await marketplace.connect(owner).mintAndListNFT(metadataURI, price);

    // Assertions to check ownership and listing
    expect(await supplyChainNFT.ownerOf(tokenId)).to.equal(marketplace.address);
    expect(await marketplace.isListed(tokenId)).to.be.true;
});



it("should allow a buyer to purchase an NFT", async function () {
    const metadataURI = "ipfs://.......";
    const price = 1;

    // Mint NFT
    const tokenId = await supplyChainNFT.connect(owner).mintNFT(owner.address, metadataURI);

    // Approve marketplace to transfer the NFT
    await supplyChainNFT.connect(owner).approve(marketplace.getAddress(), tokenId);

    // Mint and list NFT as the owner
    await marketplace.connect(owner).mintAndListNFT(metadataURI, price);

    // Purchase the NFT as addr2
    await marketplace.connect(addr2).buyNFT(tokenId, { value: price });

    expect(await supplyChainNFT.ownerOf(tokenId)).to.equal(addr2.address);
    expect(await marketplace.isListed(tokenId)).to.be.false;
});

  it("should create and initialize escrow and tracking contracts", async function () {
    const metadataURI = "ipfs://.......";

    // Mint and list NFT as the owner
    const tokenId = await marketplace.connect(owner).mintAndListNFT(metadataURI, ethers.parseEther("1"));
    await supplyChainNFT.connect(owner).approve(marketplace.getAddress(), tokenId);



    // Initialize the escrow and tracking contracts as the owner
    await marketplace.connect(owner).initializeContracts(0, addr1.address, addr2.address, supplyChainNFT.getAddress());

    // Ensure that escrow and tracking contracts are properly initialized
    expect(await marketplace.escrowContract(0)).to.not.be.null;
    expect(await marketplace.trackingContract(0)).to.not.be.null;
  });
});
