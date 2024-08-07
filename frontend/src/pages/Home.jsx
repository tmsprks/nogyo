import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <div>Home</div>
      <Link to="/logout" className="text-green-500 hover:text-blue-500">
        Logout
      </Link>
    </div>
  )
}

export default Home