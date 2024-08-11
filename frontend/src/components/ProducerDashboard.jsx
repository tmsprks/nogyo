import React from 'react'

function ProducerDashboard({ userInfo }) {
  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Producer Dashboard</h3>
      <p>Welcome, {userInfo.username}!</p>
      <div className="mt-6">
        <p>You have X products listed.</p>
        <p>Recent orders: ...</p>
      </div>
    </div>
  )
}

export default ProducerDashboard
