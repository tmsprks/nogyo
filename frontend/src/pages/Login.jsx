import React from 'react'
import { Link } from 'react-router-dom'
import Form from '../components/Form'

const Login = () => {
  return (
    <div>
    <Form route="/api/token/" method='login' />
    </div>
  )
}

export default Login