// User.js
import { useState, useEffect } from 'react'
import api from '../api'
import MetaMaskConnection from '../components/MetaMaskConnection'
import UserForm from '../components/UserForm'

const User = () => {
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
    zip_code: '',
  })

  useEffect(() => {
    getUser()
  }, [])

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
          zip_code: data.profile?.zip_code || '',
        })
      })
      .catch((err) => alert(err))
  }

  return (
    <div>
      <UserForm
        formData={formData}
        setFormData={setFormData}
        onUserUpdate={getUser}
      />
      <MetaMaskConnection formData={formData} onMetaMaskUpdate={getUser} />
    </div>
  )
}

export default User
