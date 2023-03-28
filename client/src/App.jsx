import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './component/Login'
import AdminSidebar from './component/AdminSidebar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Login/>
    <AdminSidebar/>
    
    </>
  )
}

export default App
