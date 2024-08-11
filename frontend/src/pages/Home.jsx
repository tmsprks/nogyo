import { useState, useEffect } from 'react'
import api from '../api'
import ProducerDashboard from '../components/ProducerDashboard'
import ConsumerDashboard from '../components/ConsumerDashboard'
import IntermediaryDashboard from '../components/IntermediaryDashboard'

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

  const renderDashboard = () => {
    switch (userType) {
      case 'producer':
        return <ProducerDashboard userInfo={userInfo} />
      case 'consumer':
        return <ConsumerDashboard userInfo={userInfo} />
      case 'intermediary':
        return <IntermediaryDashboard userInfo={userInfo} />
      default:
        return <p>Loading...</p>
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-md">
      {renderDashboard()}
    </div>
  )
}

export default Home
