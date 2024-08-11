// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SupplyChainNFT is ERC721, Ownable {
    uint256 public tokenCounter;

    constructor(
        address initialOwner
    ) Ownable(initialOwner) ERC721("SupplyChainNFT", "SCNFT") {
        tokenCounter = 0;
        transferOwnership(initialOwner);
    }

    function mintNFT(address recipient) public onlyOwner returns (uint256) {
        uint256 newItemId = tokenCounter;
        _mint(recipient, newItemId);
        tokenCounter += 1;
        return newItemId;
    }
}
