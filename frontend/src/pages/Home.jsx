import { useState, useEffect } from 'react'
import api from '../api'

function Home() {
  const [userInfo, setUserInfo] = useState('')
  const [userType, setUserType] = useState('')

  useEffect(() => {
    getUser()
  }, [])

  const getUser = () => {
    api
      .get('/api/user/')
      .then((res) => res.data)
      .then((data) => {
        setUserInfo(data)
        setUserType(data.profile.user_type)
        console.log(data)
      })
      .catch((err) => alert(err))
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-xl text-green-500 text-center mb-6">
        Hello, {userInfo.username}
      </h2>
      <h3>{userType}</h3>
    </div>
  )
}

export default Home
