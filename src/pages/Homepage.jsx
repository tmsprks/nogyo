import React from 'react'
import { Link } from 'react-router-dom'

const Homepage = () => {
  return (
    <div className="border border-green-300 rounded-lg">
    <p className="text-green-500 font-semibold text-xl p-4">
      nogyo
    </p>
    <p className="text-green-500 text-m">
      A market place to connect farmers and consumers.
    </p>
    <div className="flex space-x-4 items-center justify-center p-4">
      <Link to="/about" className="text-green-500 hover:text-blue-500">
        About
      </Link>
      <Link to="/login" className="text-green-500 hover:text-blue-500">
        Login
      </Link>
  </div>
  </div>
  )
}

export default Homepage