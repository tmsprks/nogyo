import React, { useState } from 'react'
import { ethers } from 'ethers'
import SupplyChainTracking from '../artifacts/contracts/SupplyChainTracking.sol/SupplyChainTracking.json'

const ViewSupplyChainHistoryComponent = ({ contractAddress }) => {
  const [tokenId, setTokenId] = useState('')
  const [history, setHistory] = useState([])

  const viewHistory = async () => {
    if (!window.ethereum) return alert('MetaMask is required')
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(
      contractAddress,
      SupplyChainTracking.abi,
      provider,
    )

    try {
      const productHistory = await contract.getProductHistory(tokenId)
      setHistory(productHistory)
    } catch (err) {
      console.error(err)
      alert('Failed to fetch product history')
    }
  }

  return (
    <div>
      <h2>View Supply Chain History</h2>
      <input
        class="border rounded p-2"
        type="text"
        placeholder="Token ID"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
      />
      <button
        class="bg-green-500 text-white rounded p-2 hover:bg-green-600"
        onClick={viewHistory}
      >
        View History
      </button>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>
            Status: {entry.status} | Location: {entry.location} | Timestamp:{' '}
            {new Date(entry.timestamp * 1000).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ViewSupplyChainHistoryComponent
