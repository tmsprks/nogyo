// MetaMaskConnection.js
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import api from '../api'
import MetaMaskIcon from '../assets/Metamask'

const MetaMaskConnection = ({ formData, onMetaMaskUpdate }) => {
  const [isConnected, setIsConnected] = useState(false)

  const updateMetaMaskInfo = async (walletAddress, chainId, signingInfo) => {
    console.log(
      'metamask_address',
      walletAddress,
      'chain_id',
      chainId,
      'signing_info',
      signingInfo,
    )
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
      } else {
        alert('Failed to update user.')
      }
    } catch (err) {
      console.error('Error updating user:', err)
      alert(err)
    }
  }

  useEffect(() => {
    // Check if there's an existing MetaMask connection
    if (formData.walletAddress) {
      setIsConnected(true)
    }
  }, [formData.walletAddress])

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

  const disconnectFromMetaMask = async () => {
    try {
      const response = await api.patch('/api/user/', {
        profile: {
          metamask_address: null,
          chain_id: null,
          signing_info: null,
        },
      })
      if (response.status === 200) {
        onMetaMaskUpdate()
        alert('MetaMask disconnected!')
      } else {
        alert('Failed to disconnect MetaMask.')
      }
    } catch (err) {
      console.error('Error disconnecting MetaMask:', err)
      alert(err)
    }
  }

  const handleMetaMaskClick = () => {
    if (isConnected) {
      disconnectFromMetaMask()
    } else {
      connectToMetaMask()
    }
  }

  return (
    <button
      onClick={handleMetaMaskClick}
      className={
        'flex items-center justify-center p-2.5 h-full border border-green-500 rounded-lg shadow-md text-green-500 bg-white hover:bg-green-500  hover:text-white font-medium text-sm px-5 py-2.5 text-center inline-flex mb-2'
      }
    >
      <MetaMaskIcon />
      {isConnected ? 'Disconnect from MetaMask' : 'Connect MetaMask'}
    </button>
  )
}

export default MetaMaskConnection
