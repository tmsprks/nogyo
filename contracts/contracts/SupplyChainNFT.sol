// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SupplyChainNFT is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;

    constructor(
        address initialOwner
    ) Ownable(initialOwner) ERC721("SupplyChainNFT", "SCNFT") {
        tokenCounter = 0;
        transferOwnership(initialOwner);
    }

    function mintNFT(
        address recipient,
        string memory metadataURI
    ) public onlyOwner returns (uint256) {
        uint256 newItemId = tokenCounter;
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, metadataURI);
        tokenCounter += 1;
        return newItemId;
    }
}
