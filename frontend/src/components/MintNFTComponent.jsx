import React, { useState } from 'react'
import { ethers } from 'ethers'
import SupplyChainNFT from '../artifacts/contracts/SupplyChainNFT.sol/SupplyChainNFT.json'

const MintNFTComponent = ({ contractAddress }) => {
  const [recipient, setRecipient] = useState('')
  const [tokenURI, setTokenURI] = useState('')

  const mintNFT = async () => {
    if (!window.ethereum) return alert('MetaMask is required')
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(
      contractAddress,
      SupplyChainNFT.abi,
      signer,
    )

    try {
      const tx = await contract.mintNFT(recipient, tokenURI)
      await tx.wait()
      alert('NFT minted successfully!')
    } catch (err) {
      console.error(err)
      alert('Failed to mint NFT')
    }
  }

  return (
    <div>
      <h2>Mint New NFT</h2>
      <input
        class="border rounded p-2"
        type="text"
        placeholder="Recipient Address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <input
        class="border rounded p-2"
        type="text"
        placeholder="Token URI"
        value={tokenURI}
        onChange={(e) => setTokenURI(e.target.value)}
      />
      <button
        class="bg-green-500 text-white rounded p-2 hover:bg-green-600"
        onClick={mintNFT}
      >
        Mint NFT
      </button>
    </div>
  )
}

export default MintNFTComponent
