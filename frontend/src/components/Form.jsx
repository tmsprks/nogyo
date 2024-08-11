import { useState } from 'react'
import api from '../api'
import { Link, useNavigate } from 'react-router-dom'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'
import LoadingIndicator from './LoadingIndicator'

function Form({ route, method }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [userType, setUserType] = useState('consumer')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const name = method === 'login' ? 'Login' : 'Register'

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()

    try {
      const payload = { username, password }
      if (method !== 'login') {
        payload.profile = { user_type: userType }
      }
      const res = await api.post(route, payload)
      if (method === 'login') {
        localStorage.setItem(ACCESS_TOKEN, res.data.access)
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
        navigate('/home')
      } else {
        navigate('/login')
      }
    } catch (error) {
      alert(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-md"
    >
      <h1 className="text-xl text-green-500 text-center mb-6">{name}</h1>
      <input
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {method !== 'login' && (
        <select
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
        >
          <option value="consumer">Consumer</option>
          <option value="producer">Producer</option>
          <option value="intermediary">Intermediary</option>
        </select>
      )}
      {loading && <LoadingIndicator />}
      <button
        className="w-full px-4 py-2 text-green-500 border border-green-500 rounded-lg hover:bg-green-500 hover:text-white"
        type="submit"
      >
        {name}
      </button>
      <div className="text-center">
        {method === 'login' ? (
          <Link
            to="/register"
            className="text-green-500 text-xs hover:text-blue-500"
          >
            Don't have an account? Register
          </Link>
        ) : (
          <Link
            to="/login"
            className="text-green-500 text-xs hover:text-blue-500"
          >
            Already have an account? Login
          </Link>
        )}
      </div>
    </form>
  )
}

export default Form
