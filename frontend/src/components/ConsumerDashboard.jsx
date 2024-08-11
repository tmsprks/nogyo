import React from 'react'
import ViewNFTsForSaleComponent from './ViewNFTsForSaleComponent'
import ViewSupplyChainHistoryComponent from './ViewSupplyChainHistoryComponent'

function ConsumerDashboard({ userInfo }) {
  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Consumer Dashboard</h3>
      <p>Welcome, {userInfo.username}!</p>
      <ViewNFTsForSaleComponent />
      <ViewSupplyChainHistoryComponent />
    </div>
  )
}

export default ConsumerDashboard
