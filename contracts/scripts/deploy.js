async function main() {
    const [deployer, consumer, intermediary, producer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    // Deploy SupplyChainNFT contract
    const SupplyChainNFT = await ethers.getContractFactory("SupplyChainNFT");
    const supplyChainNFT = await SupplyChainNFT.deploy(deployer.address);
    await supplyChainNFT.deployed();
    console.log("SupplyChainNFT deployed to:", supplyChainNFT.address);
  
    // Deploy SupplyChainTracking contract
    const SupplyChainTracking = await ethers.getContractFactory("SupplyChainTracking");
    const supplyChainTracking = await SupplyChainTracking.deploy(supplyChainNFT.address);
    await supplyChainTracking.deployed();
    console.log("SupplyChainTracking deployed to:", supplyChainTracking.address);
  
    // Deploy Escrow contract
    const Escrow = await ethers.getContractFactory("Escrow");
    const escrow = await Escrow.deploy(
      consumer.address,
      intermediary.address,
      producer.address,
      supplyChainNFT.address,
      0 // tokenId of the minted NFT
    );
    await escrow.deployed();
    console.log("Escrow deployed to:", escrow.address);
  
    // Transfer NFT from producer to the escrow contract
    const transferTx = await supplyChainNFT.connect(producer).transferFrom(producer.address, escrow.address, 0);
    await transferTx.wait();
    console.log("NFT transferred to Escrow contract");
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });