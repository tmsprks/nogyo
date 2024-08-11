import React, { useState } from 'react'
import { ethers } from 'ethers'
import SupplyChainTracking from '../artifacts/contracts/SupplyChainTracking.sol/SupplyChainTracking.json'

const UpdateSupplyChainStatusComponent = ({ contractAddress }) => {
  const [tokenId, setTokenId] = useState('')
  const [status, setStatus] = useState('')
  const [location, setLocation] = useState('')

  const updateStatus = async () => {
    if (!window.ethereum) return alert('MetaMask is required')
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(
      contractAddress,
      SupplyChainTracking.abi,
      signer,
    )

    try {
      const tx = await contract.updateProductStatus(tokenId, status, location)
      await tx.wait()
      alert('Product status updated successfully!')
    } catch (err) {
      console.error(err)
      alert('Failed to update product status')
    }
  }

  return (
    <div>
      <h2>Update Supply Chain Status</h2>
      <input class="border rounded p-2"
        type="text"
        placeholder="Token ID"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
      />
      <input class="border rounded p-2"
        type="text"
        placeholder="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />
      <input class="border rounded p-2"
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button class="bg-blue-500 text-white rounded p-2 hover:bg-blue-600" onClick={updateStatus}>Update Status</button>
    </div>
  )
}

export default UpdateSupplyChainStatusComponent
