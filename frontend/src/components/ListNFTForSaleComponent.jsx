import React, { useState } from 'react'
import { ethers } from 'ethers'
import Marketplace from '../artifacts/contracts/Marketplace.sol/Marketplace.json'

const ListNFTForSaleComponent = ({ contractAddress, nftContractAddress }) => {
  const [tokenId, setTokenId] = useState('')
  const [price, setPrice] = useState('')

  const listNFTForSale = async () => {
    if (!window.ethereum) return alert('MetaMask is required')
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(
      contractAddress,
      Marketplace.abi,
      signer,
    )

    try {
      const tx = await contract.listItem(
        nftContractAddress,
        tokenId,
        ethers.utils.parseEther(price),
      )
      await tx.wait()
      alert('NFT listed for sale successfully!')
    } catch (err) {
      console.error(err)
      alert('Failed to list NFT')
    }
  }

  return (
    <div>
      <h2>List NFT For Sale</h2>
      <input
        class="border rounded p-2"
        type="text"
        placeholder="Token ID"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
      />
      <input
        class="border rounded p-2"
        type="text"
        placeholder="Price in ETH"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button
        class="bg-green-500 text-white rounded p-2 hover:bg-green-600"
        onClick={listNFTForSale}
      >
        List NFT
      </button>
    </div>
  )
}

export default ListNFTForSaleComponent
