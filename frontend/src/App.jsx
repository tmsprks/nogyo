import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import About from './pages/About'
import Homepage from './pages/Homepage'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import PageNotFound from './pages/PageNotFound'
import ProtectedRoute from './components/ProtectedRoute'

function Logout() {
  localStorage.clear()
  return <Navigate to="/" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <BrowserRouter>
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
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="register" element={<RegisterAndLogout />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
