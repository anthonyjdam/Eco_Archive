import React, { useState, useContext } from 'react'
import { AiOutlineClose, AiOutlineLogout, AiOutlineMenu, AiOutlineProfile } from "react-icons/ai"
import EmployeeTable from './EmployeeTable'
import userContext from "../userContext";
import { NavLink } from "react-router-dom";


function EmployeeDashboard() {

  const [nav, setNav] = useState(false)
  // const { setCurrentUser } = useContext(userContext);


  return (
    <main className="w-full lg:pl-1 min-h-screen bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-50 via-indigo-100 to-emerald-50 ">
      <div className='max-w-[1640px] mx-auto flex justify-between items-center p-4'>
        <div className='flex items-center'>
          <div onClick={()=> setNav(!nav)} className='cursor-pointer'>
            <AiOutlineMenu size={25} />
          </div>
          <h1 className='text-2xl sm:text-3xl lg:text-4xl px-2'>
            Eco<span className='font-bold'>Archive</span>
          </h1>
        </div>
      </div>

    
      <div>
        <div className="flex flex-row gap-4 relative m-3 px-1">
          <EmployeeTable />
        </div>
      </div>


    {/* Side menu */}
      {nav ? <div className="bg-black/60 fixed w-full h-screen z-10 top-0 left-0"></div> : ""}

      <div className={nav ? 'fixed top-0 left-0 w-[250px] h-screen bg-white z-10 duration-300' : "fixed top-0 left-[-100%] w-[250] h-screen bg-white z-10 duration-300"}>
        <AiOutlineClose onClick={()=> setNav(!nav)} size={30} className="absolute right-4 top-4 cursor-pointer"
        />
        <h2 className='text-2xl p-4'>
          Eco<span className='font-bold'>Archive</span>
        </h2>
        <nav>
          <ul className='flex flex-col p-4 text-gray-800'>
            <li className='text-xl py-4 flex'>
              <AiOutlineProfile size={25} className='mr-4' /> Profile
            </li>
            <NavLink
            to="/"
            className="flex gap-2 p-2 rounded-md active:bg-[#f3f4fd] hover:bg-[#f3f4fd] hover:text-black transition-all text-gray-800"
            onClick={() => setCurrentUser("")}
          >
            <li className='text-xl py-4 flex'>
              <AiOutlineLogout size={25} className='mr-4' /> Log Out
            </li>
          </NavLink>
          </ul>
        </nav>

      </div>
    </main>
  )
}

export default EmployeeDashboard
