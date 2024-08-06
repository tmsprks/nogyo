import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from './pages/About'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import PageNotFound from './pages/PageNotFound'


function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />}/>
      <Route path="about" element={<About />}/>
      <Route path="login" element={<Login />}/>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
   </BrowserRouter> 
  )
}

export default App
