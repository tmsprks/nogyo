import React from 'react'

function IntermediaryDashboard({ userInfo }) {
  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Intermediary Dashboard</h3>
      <p>Welcome, {userInfo.username}!</p>
      <div className="mt-6">
        <p>Current contracts: ...</p>
        <p>Pending approvals: ...</p>
      </div>
    </div>
  )
}

export default IntermediaryDashboard
