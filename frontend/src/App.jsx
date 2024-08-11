import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import About from './pages/About'
import Header  from './components/Header'
import Footer from './components/Footer'
import Homepage from './pages/Homepage'
import Home from './pages/Home'
import User from './pages/User'
import Login from './pages/Login'
import Register from './pages/Register'
import PageNotFound from './pages/PageNotFound'
import ProtectedRoute from './components/ProtectedRoute'
import api from './api'
import { useState, useEffect } from 'react'

function Logout() {
  localStorage.clear()
  return <Navigate to="/" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api
      .get('/api/user/')
      .then(response => response.json())
      .then(data => {
        setIsAuthenticated(true);
        setUsername(data.username);
      })
      .catch(error => {
        console.log(error);
        setIsAuthenticated(false);
      });
    }
  }, []);

  return (
    <BrowserRouter>
    <div className="flex flex-col min-h-screen">
    <Header isAuthenticated={isAuthenticated} username={username} />
    <main className="flex-grow">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="user"
          element={
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          }
        />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="register" element={<RegisterAndLogout />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      </main>
      <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
