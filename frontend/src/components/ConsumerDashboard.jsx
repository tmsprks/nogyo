import React from 'react'

function ConsumerDashboard({ userInfo }) {
  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Consumer Dashboard</h3>
      <p>Welcome, {userInfo.username}!</p>
      <div className="mt-6">
        <p>Your order history:</p>
      </div>
    </div>
  )
}

export default ConsumerDashboard
