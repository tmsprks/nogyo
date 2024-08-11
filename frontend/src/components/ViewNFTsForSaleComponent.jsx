import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import Marketplace from '../artifacts/contracts/Marketplace.sol/Marketplace.json'

const ViewNFTsForSaleComponent = ({ contractAddress }) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const fetchItems = async () => {
      if (!window.ethereum) return alert('MetaMask is required')
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(
        contractAddress,
        Marketplace.abi,
        provider,
      )

      try {
        const items = await contract.getAllItemsForSale()
        setItems(items)
      } catch (err) {
        console.error(err)
        alert('Failed to fetch items')
      }
    }

    fetchItems()
  }, [contractAddress])

  return (
    <div>
      <h2>NFTs For Sale</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            Token ID: {item.tokenId.toString()} | Price:{' '}
            {ethers.utils.formatEther(item.price)} ETH
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ViewNFTsForSaleComponent
