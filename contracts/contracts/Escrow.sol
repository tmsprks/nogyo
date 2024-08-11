// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract Escrow {
    address public consumer;
    address public intermediary;
    address public producer;
    IERC721 public nftContract;
    uint256 public nftTokenId;
    bool public consumerAgreed;
    bool public intermediaryAgreed;
    bool public producerAgreed;

    constructor(
        address _consumer,
        address _intermediary,
        address _producer,
        address _nftContract,
        uint256 _nftTokenId
    ) {
        consumer = _consumer;
        intermediary = _intermediary;
        producer = _producer;
        nftContract = IERC721(_nftContract);
        nftTokenId = _nftTokenId;
        consumerAgreed = false;
        intermediaryAgreed = false;
        producerAgreed = false;
    }

    function agree() public {
        require(
            msg.sender == consumer ||
                msg.sender == intermediary ||
                msg.sender == producer,
            "Not authorized"
        );
        if (msg.sender == consumer) {
            consumerAgreed = true;
        } else if (msg.sender == intermediary) {
            intermediaryAgreed = true;
        } else if (msg.sender == producer) {
            producerAgreed = true;
        }
    }

    function finalize() public {
        require(
            consumerAgreed && intermediaryAgreed && producerAgreed,
            "All parties must agree"
        );
        // Transfer NFT to consumer
        nftContract.transferFrom(address(this), consumer, nftTokenId);
        // Transfer funds to producer and intermediary
        // Assuming the contract holds the funds
        uint256 balance = address(this).balance;
        payable(producer).transfer((balance * 80) / 100);
        payable(intermediary).transfer((balance * 20) / 100);
    }

    // Function to deposit funds to the contract
    function deposit() public payable {}
}
