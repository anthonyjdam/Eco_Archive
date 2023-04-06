import React, { useState } from 'react'
import AdminSidebar from './AdminSidebar'
import AdminProfileBar from "./AdminProfileBar"
import AdminTable from './AdminTable'

// glassRate = 3;

function AdminEditEmployee() {

  //State variables
  // const [empFName, setEmpFName] = useState("")
  // const [empLName, setEmpLName] = useState("")


  return (

    <>
      {/* Sidebar */}
      <div className="sticky flex-auto w-48 shadow-md z-50 ">
        <aside className="sticky flex w-48 shadow-md">
          <AdminSidebar />
        </aside>
      </div>

      <main className=" min-h-screen bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-50 via-indigo-100 to-emerald-50 ">

        {/* Top Bar */}
        <AdminProfileBar />

        <div className="lg:pl-52">
          {/* Iventory Summary */}
          <div className="flex-auto bottom-0 overflow-y-auto lg:pr-4 lg:pt-8">

            <div className="bg-white rounded-lg opacity-[85%] shadow-md m-3 mb-5">

              <h2 className=" text-2xl text-blue-300 font-bold pl-5 pt-2 pb-2">Add New Employee</h2>
              <hr className='pb-2'></hr>
              <div className="pl-5">

                <div className='flex items-center justify-start pl-3 pt-3 pb-3 text-gray-600'>
                  <form>

                    <div className='flex-col'>
                      {/*FirstName Lastname Fields */}
                      <div className='flex gap-4'>
                        <h3 className='font-semibold'>First Name</h3>
                        <input
                          className='border-b-2 border-gray-200 focus:border-blue-200 rounded-sm'
                          type="text"
                        // value={empFName}
                        ></input>
                        <h3 className='font-semibold'>Last Name</h3>
                        <input
                          className='border-b-2 border-gray-200 focus:border-blue-200 rounded-sm'
                          type="text"
                        // value={empLName}
                        ></input>
                      </div>

                      {/*Usrname Password Fields */}
                      <div className='flex flex-col items-start justify-start gap-5 pt-5'>
                        <div className='flex gap-4 items-center'>
                          <h3 className='font-semibold'>Username</h3>
                          <input
                            className='border-b-2 border-gray-200 focus:border-blue-200 rounded-sm pr-1'
                            type="text"
                          // value={empFName}
                          ></input>
                        </div>
                        <div className='flex gap-4 items-center'>
                          <h3 className='font-semibold'>Password</h3>
                          <input
                            className='border-b-2 border-gray-200 focus:border-blue-200 rounded-sm pr-2'
                            type="text"
                          // value={empLName}
                          ></input>
                        </div>
                      </div>
                    </div>
                  </form>

                </div>


              </div>
            </div>

            {/* Table Container */}
            <div>
              <div className="text-left relative flex-auto m-3">

                <div className="bg-white rounded-t-lg opacity-[85%] shawdow-lg p-3">

                  <div className='flex items-center justify-between'>
                    {/* Search User Button */}
                    <div className='relative'>
                      <div className='flex relative items-start justify-start'>
                        <input className='flex p-1 pl-20 rounded-lg w-44 bg-gray-200 hover:bg-gray-300 transition-all text-gray-800'>
                        </input>
                        <div className='flex absolute items-start place-self-center'>
                          <button className='flex p-1.5 rounded-lg active:bg-blue-300 hover:bg-blue-200 hover:text-black transition-all text-gray-800'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                            <label className="font-semibold text-sm">
                              Search
                            </label>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className='flex items-end justify-end gap-1'>
                      {/* Delete User Button */}
                      <button className='flex gap-2 p-1 pr-3 pl-3 rounded-lg bg-gray-200 active:bg-green-300 hover:bg-green-200 hover:text-black transition-all text-gray-800'>
                        <label className="font-semibold text-sm">
                          Update
                        </label>
                      </button>

                      {/* Update User Button */}
                      <button className='flex gap-2 p-1 pr-3 pl-3 rounded-lg bg-gray-200 active:bg-red-300 hover:bg-red-200 hover:text-black transition-all text-gray-800'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    </div>

                  </div>

                </div>

                {/* Admin Table */}
                <AdminTable />

              </div>
            </div>

          </div>



        </div>

      </main>

    </>

  )
}

export default AdminEditEmployee;
