import { useState, useEffect } from 'react'
import api from '../api'
import Wallet from '../components/Wallet'
import ConnectButton from '../components/ConnectWallet'

function Home() {
  const [wallets, setWallets] = useState([])
  const [wallet_chain, setBlockchain] = useState('')
  const [wallet_address, setWalletAddress] = useState('')
  const [userInfo, setUserInfo] = useState('')

  useEffect(() => {
    getWallets()
    getUser()
  }, [])

  const getUser = () => {
    api
      .get('/api/user/')
      .then((res) => res.data)
      .then((data) => {
        setUserInfo(data)
        console.log(data)
      })
      .catch((err) => alert(err))
  }

  const getWallets = () => {
    api
      .get('/api/wallets/')
      .then((res) => res.data)
      .then((data) => {
        setWallets(data)
        console.log(data)
      })
      .catch((err) => alert(err))
  }

  const deleteWallet = (id) => {
    api
      .delete(`/api/wallets/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert('Wallet deleted!')
        else alert('Failed to delete wallet.')
        getWallets()
      })
      .catch((error) => alert(error))
  }

  const createWallet = (e) => {
    e.preventDefault()
    api
      .post('/api/wallets/', { wallet_chain, wallet_address })
      .then((res) => {
        if (res.status === 201) alert('Wallet created!')
        else alert('Failed to make wallet.')
        getWallets()
      })
      .catch((err) => alert(err))
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-xl text-green-500 text-center mb-6">
        Hello, {userInfo.username}
      </h2>
      <h2 className="text-m text-green-500 text-center mb-6">Your Wallet:</h2>
      <div>
        {wallets.map((wallet) => (
          <Wallet wallet={wallet} onDelete={deleteWallet} key={wallet.id} />
        ))}
      </div>
      <h2 className="text-xl text-green-500 text-center mb-6">
        Create a Wallet
      </h2>
      <form onSubmit={createWallet}>
        <label htmlFor="wallet_address" className="block text-gray-700">
          Wallet Address:
        </label>
        <input
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg"
          type="text"
          id="wallet_address"
          name="wallet_address"
          required
          onChange={(e) => setWalletAddress(e.target.value)}
          value={wallet_address}
          placeholder="Wallet Address"
        />
        <label htmlFor="wallet_chain" className="block text-gray-700">
          Blockchain:
        </label>
        <textarea
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg"
          id="wallet_chain"
          name="wallet_chain"
          required
          value={wallet_chain}
          onChange={(e) => setBlockchain(e.target.value)}
          placeholder="Blockchain"
        ></textarea>
        <input
          className="w-full px-4 py-2 text-green-500 border border-green-500 rounded-lg hover:bg-green-500 hover:text-white"
          type="submit"
          value="Submit"
        />
      </form>
      <ConnectButton />
    </div>
  )
}

export default Home
