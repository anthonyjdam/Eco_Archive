import React from 'react'
import CredFieldSignUpCustomer from './CredFieldSignUpCustomer'

function SignUpCustomer() {
  return (
    <>
    <div>
        <main className="flex items-center justify-center h-screen bg-gradient-to-t from-indigo-50 to-sky-200">
            <CredFieldSignUpCustomer />
        </main>
        <footer>
            <button className="bg-indigo-50 w-1/3 text-gray-400 py-2 hover:bg-blue-400 hover:text-white transition-colors" type="appInfo">App Info</button>
            <button className="bg-indigo-50 w-1/3 text-gray-400 py-2 hover:bg-blue-400 hover:text-white transition-colors" type="employeeLogi">Employee Login</button>
            <button className="bg-indigo-50 w-1/3 text-gray-400 py-2 hover:bg-blue-400 hover:text-white transition-colors" type="adminLogin">Admin Login</button>
        </footer>
    </div>

</>

  )
}

export default SignUpCustomer