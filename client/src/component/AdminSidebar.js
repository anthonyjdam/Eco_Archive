import React from 'react'

/**<h1 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-600">
                                Logout
                            </h1>*/
export default function AdminSidebar() {
    return (

        <div>
            <body>
                <main style={{ backgroundColor: "rgb(231, 244, 253, 0.60)" }} className="flex items-center justify-center h-screen">
                </main>
            </body>
            <nav>
                <div className="fixed top-0 bottom-0 lg:left-0 p-0 w-1/5 overflow-y-auto text-center bg-gray-900 shadow-sm">
                    <button className="p-2.5 mt-3 w-full flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-400 text-white">
                        <label className="font-semibold">
                            Employees
                        </label>
                    </button>
                    <button className="p-2.5 mt-3 w-full flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-400 text-white">
                        <label className="font-semibold">
                            Customers
                        </label>
                    </button>
                    <button className="p-2.5 mt-3 w-full flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-400 text-white">
                        <label className="font-semibold">
                            Charities
                        </label>
                    </button>
                    <button className="p-2.5 mt-3 w-full flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-400 text-white">
                        <label className="font-semibold">
                            Material Settings
                        </label>
                    </button>
                </div>
                <div className="fixed bottom-0 lg:left-0 p-0 w-1/5 overflow-y-auto text-center bg-gray-900 shadow-sm">
                    <button className="p-2.5 mt-3 w-full flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-green-500 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 mr-1">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>

                        <label className="font-semibold">
                            Edit Profile
                        </label>
                    </button>
                    <button className="p-2.5 mt-3 w-full flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-500 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 mr-1">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg>
                        <label className="font-semibold">
                            Logout
                        </label>

                    </button>
                </div>
            </nav>


        </div>


    )
}
