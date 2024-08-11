import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({ isAuthenticated, username }) => {
  return (
    <header className="border-solid border-0 border-b p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src="/images/nogyo.png" alt="nogyo Logo" className="h-12 mr-2" />
        <Link to="/" className="text-green-600 text-xl font-semibold">
          nogyo
        </Link>
      </div>
      <nav className="flex space-x-4">
        <Link to="/" className="text-green-600 hover:text-green-800 transition">
          Home
        </Link>
        <Link
          to="/about"
          className="text-green-600 hover:text-green-800 transition"
        >
          About
        </Link>
        {isAuthenticated ? (
          <Link to="/home" className="text-green-600">
            {username}
          </Link>
        ) : (
          <Link
            to="/login"
            className="text-green-600 hover:text-green-800 transition"
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  )
}

export default Header
