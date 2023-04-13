import React, { useState } from 'react'
import AdminSidebar from './AdminSidebar'
import AdminProfileBar from "./AdminProfileBar"
import AdminTable from './AdminTable'


export default function AdminEditCharities() {
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

            <div className="bg-white rounded-md opacity-[85%] shawdow-lg m-3">

              <h2 className=" text-2xl text-blue-300 font-bold pl-5 pt-2 pb-2">Material Rates</h2>
              <hr className='pb-2'></hr>
              <div className="pl-5">
                <div className='pl-3 pt-3 pb-3 text-gray-600 justify-around'>
                  
                
                
                
                
                </div>
              </div>
              <div>
              </div>
            </div>
          </div>
        </div>

      </main>

    </>
  )
}
