import { useState, useEffect } from 'react'
import api from '../api'
import { Link } from 'react-router-dom'
import { ethers } from 'ethers'

function User() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    walletChain: '',
    walletAddress: '',
    street: '',
    city: '',
    state: '',
    country: '',
  })

  useEffect(() => {
    getUser()
  }, [])

  const connectToMetaMask = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const account = await signer.getAddress()
        const network = await provider.getNetwork()
        const chainId = network.chainId.toString()
        const message = 'Sign this message to connect your wallet.'
        const signature = await signer.signMessage(message)

        await updateMetaMaskInfo(account, chainId, { message, signature })
      } catch (error) {
        console.error('User denied account access', error)
      }
    } else {
      console.error('MetaMask is not installed')
    }
  }

  const updateMetaMaskInfo = async (walletAddress, chainId, signingInfo) => {
    try {
      const response = await api.patch('/api/user/', {
        profile: {
          metamask_address: walletAddress,
          chain_id: chainId,
          signing_info: signingInfo,
        },
      })

      if (response.status === 200) {
        alert('User updated!')
        getUser()
      } else {
        alert('Failed to update user.')
      }
    } catch (err) {
      console.error('Error updating user:', err)
      alert(err)
    }
  }

  const handleConnectMetaMask = () => {
    connectToMetaMask()
  }

  const getUser = () => {
    api
      .get('/api/user/')
      .then((res) => res.data)
      .then((data) => {
        setFormData({
          username: data.username,
          email: data.profile?.email,
          first_name: data.profile?.first_name,
          last_name: data.profile?.last_name,
          walletChain: data.profile?.chain_id || '',
          walletAddress: data.profile?.metamask_address || '',
          street: data.profile?.street || '',
          city: data.profile?.city || '',
          state: data.profile?.state || '',
          country: data.profile?.country || '',
        })
      })
      .catch((err) => alert(err))
  }

  const updateUser = (e) => {
    e.preventDefault()
    api
      .patch('/api/user/', {
        profile: {
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          street: formData.street,
          city: formData.city,
          state: formData.state,
          country: formData.country,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          alert('User updated!')
          getUser()
        } else {
          alert('Failed to update user.')
        }
      })
      .catch((err) => {
        console.error(
          'Error updating user:',
          err.response ? err.response.data : err,
        )
        alert(err.response ? err.response.data : 'An error occurred')
      })
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-md">
      <form onSubmit={updateUser}>
        <h2 className="text-xl text-green-500 text-center mb-6">
          Update User Information
        </h2>
        <label htmlFor="username" className="block text-gray-400 text-left">
          Username:
        </label>
        <input
          className="w-full px-4 py-1 mb-2 border border-gray-300 rounded-lg"
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="email" className="block text-gray-400 text-left">
          Email:
        </label>
        <input
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg"
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="first_name" className="block text-gray-400 text-left">
          First Name:
        </label>
        <input
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg"
          type="text"
          name="first_name"
          id="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
        />

        <label htmlFor="last_name" className="block text-gray-400 text-left">
          Last Name:
        </label>
        <input
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg"
          type="text"
          name="last_name"
          id="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
        />

        <h2 className="text-xl text-green-500 text-center mb-6">
          Wallet Information
        </h2>

        <label htmlFor="walletChain" className="block text-gray-400 text-left">
          Wallet Chain:
        </label>
        <input
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg"
          type="text"
          name="walletChain"
          id="walletChain"
          placeholder="Wallet Chain"
          value={formData.walletChain}
          onChange={handleChange}
          readOnly
        />

        <label
          htmlFor="walletAddress"
          className="block text-gray-400 text-left"
        >
          Wallet Address:
        </label>
        <input
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg"
          type="text"
          name="walletAddress"
          id="walletAddress"
          placeholder="Wallet Address"
          value={formData.walletAddress}
          onChange={handleChange}
          readOnly
        />
        <button onClick={handleConnectMetaMask}>Connect MetaMask</button>
        <h2 className="text-xl text-green-500 text-center mb-6">
          Address Information
        </h2>

        <label htmlFor="city" className="block text-gray-300 text-left">
          City:
        </label>
        <input
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg"
          type="text"
          name="city"
          id="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
        />

        <label htmlFor="state" className="block text-gray-300 text-left">
          State:
        </label>
        <input
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg"
          type="text"
          name="state"
          id="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
        />

        <label htmlFor="country" className="block text-gray-300 text-left">
          Country:
        </label>
        <input
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg"
          type="text"
          name="country"
          id="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
        />

        <button
          className="w-full px-4 py-2 text-green-500 border border-green-500 rounded-lg hover:bg-green-500 hover:text-white"
          type="submit"
        >
          Submit
        </button>
      </form>
      <Link to="/" className="text-green-500 text-xs hover:text-blue-500">
        Back to Home
      </Link>
    </div>
  )
}

export default User
