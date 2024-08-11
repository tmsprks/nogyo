// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./Factory.sol";
import "./SupplyChainNFT.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Marketplace is IERC721Receiver, Ownable {
    Factory public factory;
    SupplyChainNFT public nftContract;
    struct Listing {
        address seller;
        uint256 price;
    }
    mapping(uint256 => Listing) public listings;

    event NFTListed(
        uint256 indexed tokenId,
        address indexed seller,
        uint256 price
    );
    event NFTSold(
        uint256 indexed tokenId,
        address indexed buyer,
        uint256 price
    );

    constructor(
        address _factory,
        address _nftContract,
        address initialOwner
    ) Ownable(initialOwner) {
        factory = Factory(_factory);
        nftContract = SupplyChainNFT(_nftContract);
    }

    function mintAndListNFT(
        string memory tokenURI,
        uint256 price
    ) external returns (uint256) {
        uint256 tokenId = nftContract.mintNFT(msg.sender, tokenURI);

        // Require approval from the owner for the marketplace to transfer the NFT
        require(
            nftContract.getApproved(tokenId) == address(this),
            "Marketplace is not approved to transfer this NFT"
        );

        // Create Escrow and Tracking Contracts
        factory.createEscrow(
            tokenId,
            msg.sender,
            address(0),
            address(nftContract)
        );
        factory.createTracking(tokenId);

        // List NFT for sale
        listNFT(tokenId, price);

        return tokenId;
    }

    function listNFT(uint256 tokenId, uint256 price) public {
        require(
            nftContract.ownerOf(tokenId) == msg.sender,
            "Not the owner of the NFT"
        );
        require(price > 0, "Price must be greater than zero");

        listings[tokenId] = Listing({seller: msg.sender, price: price});

        nftContract.transferFrom(msg.sender, address(this), tokenId); // Transfer NFT to the marketplace contract

        emit NFTListed(tokenId, msg.sender, price);
    }

    function buyNFT(uint256 tokenId) external payable {
        Listing memory listing = listings[tokenId];
        require(msg.value >= listing.price, "Not enough Ether to buy the NFT");

        // Transfer the NFT to the Escrow contract
        address escrowAddress = factory.escrowContracts(tokenId);
        IERC721(nftContract).safeTransferFrom(
            address(this),
            escrowAddress,
            tokenId
        );
        payable(escrowAddress).transfer(msg.value);

        // Update the buyer's address in the Escrow contract
        Escrow(escrowAddress).updateBuyer(msg.sender);

        emit NFTSold(tokenId, msg.sender, listing.price);
    }

    function onERC721Received(
        address /*operator*/,
        address /*from*/,
        uint256 /*tokenId*/,
        bytes calldata /*data*/
    ) external pure override returns (bytes4) {
        return this.onERC721Received.selector;
    }
}
