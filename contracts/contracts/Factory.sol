// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./Escrow.sol";
import "./SupplyChainTracking.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract Factory {
    IERC721 public nftContract;
    mapping(uint256 => address) public escrowContracts;
    mapping(uint256 => address) public trackingContracts;

    event EscrowCreated(uint256 indexed tokenId, address escrowAddress);
    event TrackingCreated(uint256 indexed tokenId, address trackingAddress);

    constructor(address _nftContract) {
        nftContract = IERC721(_nftContract);
    }

    function createEscrow(
        uint256 tokenId,
        address consumer,
        address intermediary,
        address producer
    ) public {
        require(
            nftContract.ownerOf(tokenId) == msg.sender,
            "Only NFT owner can create escrow"
        );
        Escrow newEscrow = new Escrow();
        newEscrow.initialize(
            consumer,
            intermediary,
            producer,
            address(nftContract),
            tokenId
        );
        escrowContracts[tokenId] = address(newEscrow);
        emit EscrowCreated(tokenId, address(newEscrow));
    }

    function createTracking(uint256 tokenId) public {
        require(
            nftContract.ownerOf(tokenId) == msg.sender,
            "Only NFT owner can create tracking"
        );
        SupplyChainTracking newTracking = new SupplyChainTracking();
        newTracking.initialize(address(nftContract));
        trackingContracts[tokenId] = address(newTracking);
        emit TrackingCreated(tokenId, address(newTracking));
    }
}
