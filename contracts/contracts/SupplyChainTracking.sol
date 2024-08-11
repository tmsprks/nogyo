// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract SupplyChainTracking {
    struct Product {
        uint256 tokenId;
        string status;
        string location;
        uint256 timestamp;
    }

    IERC721 public nftContract;
    mapping(uint256 => Product[]) public productHistory;

    event ProductStatusUpdated(
        uint256 indexed tokenId,
        string status,
        string location,
        uint256 timestamp
    );

    constructor(address _nftContract) {
        nftContract = IERC721(_nftContract);
    }

    function updateProductStatus(
        uint256 tokenId,
        string memory status,
        string memory location
    ) public {
        require(nftContract.ownerOf(tokenId) == msg.sender, "Not authorized");
        Product memory newStatus = Product({
            tokenId: tokenId,
            status: status,
            location: location,
            timestamp: block.timestamp
        });
        productHistory[tokenId].push(newStatus);
        emit ProductStatusUpdated(tokenId, status, location, block.timestamp);
    }

    function getProductHistory(
        uint256 tokenId
    ) public view returns (Product[] memory) {
        return productHistory[tokenId];
    }
}
