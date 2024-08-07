import React from 'react'
import { Link } from 'react-router-dom'
import Form from '../components/Form'

const Login = () => {
  return (
    <div>
    <Form route="/api/token/" method='login' />
    <Link to="/" className="text-green-500 text-xs hover:text-blue-500">
    Back to Home
    </Link>
    </div>
  )
}

export default Login