import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import MetaMaskIcon from '../assets/Metamask'

const ConnectButton = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [address, setAddress] = useState('')
  const [chainId, setChainId] = useState('')

  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        // Request account access if needed
        await window.ethereum.request({ method: 'eth_requestAccounts' })

        // We use ethers.js to interact with Ethereum
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const address = await signer.getAddress()
        const network = await provider.getNetwork()

        // Set state with the retrieved information
        setProvider(provider)
        setSigner(signer)
        setAddress(address)
        setChainId(network.chainId)

        // Print information to the console
        console.log('Connected Address:', address)
        console.log('Chain ID:', network.chainId)
        console.log('Signer:', signer)

        setIsConnected(true)
      } catch (error) {
        console.error('Error connecting to MetaMask:', error)
      }
    } else {
      console.error('MetaMask is not installed')
    }
  }

  const disconnectMetaMask = () => {
    setProvider(null)
    setSigner(null)
    setAddress('')
    setChainId('')
    setIsConnected(false)
    console.log('Disconnected from MetaMask')
  }

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', () => {
        if (isConnected) {
          disconnectMetaMask()
        }
      })
      window.ethereum.on('chainChanged', () => {
        if (isConnected) {
          disconnectMetaMask()
        }
      })
    }
  }, [isConnected])

  return (
    <div>
      <button
        type="button"
        className={
          'flex items-center justify-center p-2.5 h-full w-full border border-green-500 rounded-lg shadow-md text-green-500 bg-white hover:bg-green-500  hover:text-white font-medium text-sm px-5 py-2.5 text-center inline-flex mb-2'
        }
        onClick={isConnected ? disconnectMetaMask : connectMetaMask}
      >
        {isConnected ? (
          <span className="ml-2 sm:ml-0">Disconnect Wallet</span>
        ) : (
          <>
            <MetaMaskIcon />
            <span className="ml-2 sm:ml-0">Connect Wallet</span>
          </>
        )}
      </button>
    </div>
  )
}

export default ConnectButton
