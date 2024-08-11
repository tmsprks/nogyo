// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract Escrow {
    address public consumer; // Buyer
    address public intermediary;
    address public producer; // Seller
    IERC721 public nftContract;
    uint256 public nftTokenId;
    bool public consumerAgreed;
    bool public intermediaryAgreed;
    bool public producerAgreed;
    bool public initialized;

    // Event to emit when the buyer is updated
    event BuyerUpdated(address newBuyer);

    // Modifier to ensure only the current consumer or the contract owner can update the buyer
    modifier onlyAuthorized(address _caller) {
        require(_caller == consumer || _caller == producer, "Not authorized");
        _;
    }

    function initialize(
        address _consumer,
        address _intermediary,
        address _producer,
        IERC721 _nftContract,
        uint256 _nftTokenId
    ) external {
        require(!initialized, "Already initialized");
        consumer = _consumer;
        intermediary = _intermediary;
        producer = _producer;
        nftContract = _nftContract;
        nftTokenId = _nftTokenId;
        initialized = true;
    }

    // Function to update the buyer's address
    function updateBuyer(
        address _newBuyer
    ) external onlyAuthorized(msg.sender) {
        require(_newBuyer != address(0), "Invalid address");
        consumer = _newBuyer;
        emit BuyerUpdated(_newBuyer);
    }

    // Function to confirm agreement by a party
    function confirmAgreement() external {
        require(
            msg.sender == consumer ||
                msg.sender == intermediary ||
                msg.sender == producer,
            "Not a participant"
        );

        if (msg.sender == consumer) {
            consumerAgreed = true;
        } else if (msg.sender == intermediary) {
            intermediaryAgreed = true;
        } else if (msg.sender == producer) {
            producerAgreed = true;
        }
    }

    // Function to finalize the transaction if all parties agree
    function finalizeTransaction() external {
        require(
            consumerAgreed && intermediaryAgreed && producerAgreed,
            "All parties must agree"
        );

        // Transfer the NFT to the consumer
        nftContract.safeTransferFrom(producer, consumer, nftTokenId);
    }
}
