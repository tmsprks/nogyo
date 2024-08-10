import React from 'react'
import { Link } from 'react-router-dom'
import Form from '../components/Form'

const Register = () => {
  return (
    <div>
      <Form route="/api/user/register/" method="register" />
      <Link to="/" className="text-green-500 text-xs hover:text-blue-500">
        Back to Home
      </Link>
    </div>
  )
}

export default Register
