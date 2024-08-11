// // SPDX-License-Identifier: UNLICENSED
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
    bool public initialized;

    function initialize(
        address _consumer,
        address _intermediary,
        address _producer,
        address _nftContract,
        uint256 _nftTokenId
    ) external {
        require(!initialized, "Already initialized");
        consumer = _consumer;
        intermediary = _intermediary;
        producer = _producer;
        nftContract = IERC721(_nftContract);
        nftTokenId = _nftTokenId;
        consumerAgreed = false;
        intermediaryAgreed = false;
        producerAgreed = false;
        initialized = true;
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
        nftContract.transferFrom(address(this), consumer, nftTokenId);
        uint256 balance = address(this).balance;
        payable(producer).transfer((balance * 99) / 100);
        payable(intermediary).transfer((balance * 1) / 100);
    }

    function deposit() public payable {}
}
