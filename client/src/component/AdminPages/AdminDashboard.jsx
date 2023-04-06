import React from 'react'
import AdminSidebar from './AdminSidebar'
import AdminProfileBar from './AdminProfileBar'
import AdminTable from './AdminTable'


export default function AdminDashboard() {
    return (
        <>

            {/* Sidebar */}
            <div className="sticky flex-auto w-48 shadow-md z-50 ">
                <aside >
                    <AdminSidebar />
                </aside>
            </div>

            <main className=" min-h-screen bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-50 via-indigo-100 to-emerald-50 ">

                {/* Top Bar */}
                <AdminProfileBar />

                <div className="lg:pl-52">
                    {/* Iventory Summary */}
                    <div className="flex-auto bottom-0 overflow-y-auto lg:pr-4 lg:pt-8">
                        <div>
                            <div className="bg-white rounded-md opacity-[85%] shawdow-lg m-3">
                                <h2 className=" text-2xl text-blue-300 font-bold pl-5 pt-2 pb-2">Inventory</h2>
                                <hr className='pb-2'></hr>
                                <div className="pl-5">
                                    <h3 className="font-semibold text-md text-gray-700">Concurrent Total</h3>
                                    <div className='pl-3 pt-3 pb-3 text-gray-600'>
                                        <p>Glass</p>
                                        <p>Plastic</p>
                                        <p>Aluminium</p>
                                    </div>
                                </div>
                                <hr className='pt-2 pb-2'></hr>
                                <div className="pl-5">
                                    <h3 className="font-semibold text-md text-gray-700">Lifetime Total</h3>
                                    <div className='pl-3 pt-3 pb-3 text-gray-600'>
                                        <p>Glass</p>
                                        <p>Plastic</p>
                                        <p>Aluminium</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Admin Table */}
                        <div>
                            <div className="text-center relative m-3">
                                <AdminTable />
                            </div>
                        </div>

                        {/* <div className="flex-auto bottom-0 overflow-y-auto lg:pl-52 lg:pr-4 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-50 via-indigo-100 to-emerald-50"> */}
                        <div className="opacity-[85%] text-center relative m-3">
                            <form>
                                <input className='w-full h-10 rounded-md shadow-md pl-3' placeholder='Enter Query'></input>


                            </form>
                        </div>
                    </div>
                </div>
            </main>



        </>

    )
}
