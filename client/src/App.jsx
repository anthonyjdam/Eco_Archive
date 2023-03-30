import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from './component/Login'
import AdminSidebar from './component/AdminSidebar'
import SignUpCustomer from './component/SignUpCustomer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Login />
      {/* <AdminSidebar /> */}
      {/* <SignUpCustomer /> */}
    </>
  )
}

export default App
