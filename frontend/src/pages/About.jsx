import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div>
    <div className="text-green-500 text-xl p-4">About</div>
    <Link to="/" className="text-green-500 text-xs hover:text-blue-500">
    Back to Home
    </Link>
    </div>
  )
}

export default About