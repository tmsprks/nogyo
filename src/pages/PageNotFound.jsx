import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div>
    <div className="text-green-500 text-xl p-4">404 Page Not Found</div>
    <Link to="/" className="text-green-500 hover:text-blue-500">
    Back to Home
    </Link>
    </div>
    
  )
}

export default PageNotFound