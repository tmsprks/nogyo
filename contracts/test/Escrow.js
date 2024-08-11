const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Escrow", function () {
    let SupplyChainNFT, supplyChainNFT, Escrow, escrow, owner, consumer, intermediary, producer, supplyChainNFTAddress, escrowContractAddress;

    beforeEach(async function () {
        [owner, consumer, intermediary, producer] = await ethers.getSigners();

        // Deploy the NFT contract
        SupplyChainNFT = await ethers.getContractFactory("SupplyChainNFT");
        supplyChainNFT = await SupplyChainNFT.deploy(owner.address);
        await supplyChainNFT.waitForDeployment();
        supplyChainNFTAddress = supplyChainNFT.getAddress();

        // Mint an NFT to the producer
        await supplyChainNFT.mintNFT(producer.address);

        // Deploy the Escrow contract
        Escrow = await ethers.getContractFactory("Escrow");
        escrow = await Escrow.deploy(consumer.address, intermediary.address, producer.address, supplyChainNFTAddress, 0);
        await escrow.waitForDeployment();
        escrowContractAddress = escrow.getAddress();

        // Transfer NFT from producer to the escrow contract
        await supplyChainNFT.connect(producer).transferFrom(producer.address, escrowContractAddress, 0);
    });

    it("Should allow all parties to agree and finalize the transaction", async function () {
        // All parties agree
        await escrow.connect(consumer).agree();
        await escrow.connect(intermediary).agree();
        await escrow.connect(producer).agree();

        // Consumer deposits funds
        await escrow.connect(consumer).deposit({ value: ethers.parseEther("1.0") });

        const producerInitialBalance = await ethers.provider.getBalance(producer.address);
        const intermediaryInitialBalance = await ethers.provider.getBalance(intermediary.address);

        // Finalize the transaction
        await escrow.finalize();

        // Check NFT ownership
        expect(await supplyChainNFT.ownerOf(0)).to.equal(consumer.address);

        // Expected balances
        const expectedProducerBalance = producerInitialBalance + (ethers.parseEther("0.99")); // 80% of 1.0 ether
        const expectedIntermediaryBalance = intermediaryInitialBalance + (ethers.parseEther("0.01")); // 20% of 1.0 ether

        // Check balances with a margin for gas costs
        expect(await ethers.provider.getBalance(producer.address)).to.be.closeTo(expectedProducerBalance, ethers.parseEther("0.01"));
        expect(await ethers.provider.getBalance(intermediary.address)).to.be.closeTo(expectedIntermediaryBalance, ethers.parseEther("0.01"));
    });
});