import React from 'react'
import MintNFTComponent from './MintNFTComponent'
import ListNFTForSaleComponent from './ListNFTForSaleComponent'

function ProducerDashboard({ userInfo }) {
  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Producer Dashboard</h3>
      <p>Welcome, {userInfo.username}!</p>
      <MintNFTComponent />
      <ListNFTForSaleComponent />
    </div>
  )
}

export default ProducerDashboard
