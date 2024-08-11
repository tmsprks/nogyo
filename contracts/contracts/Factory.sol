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

    function createEscrow(
        uint256 tokenId,
        address producer,
        address intermediary,
        address nftContractAddress
    ) external returns (address) {
        Escrow escrow = new Escrow();
        escrow.initialize(
            address(0), // Consumer (buyer) is initially unknown
            intermediary, // Intermediary address
            producer, // Producer (seller) address
            IERC721(nftContractAddress), // NFT contract address
            tokenId // NFT token ID
        );
        escrowContracts[tokenId] = address(escrow);
        emit EscrowCreated(tokenId, address(escrow));
        return address(escrow);
    }

    function createTracking(uint256 tokenId) external returns (address) {
        SupplyChainTracking tracking = new SupplyChainTracking();
        tracking.initialize(address(nftContract));
        trackingContracts[tokenId] = address(tracking);
        emit TrackingCreated(tokenId, address(tracking));
        return address(tracking);
    }
}
