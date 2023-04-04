import React from 'react'

export default function AdminProfileBar() {
    return (

        <div className='flex-auto'>
            <header className="flex-none opacity-[85%] w-full h-12 pl-52 top-0 mx-auto shadow-lg bg-white flex items-center justify-end">                
            <h3 className="text-gray-400 font-bold text-left pr-5">Phan. Tom</h3>
            <div className='items-center justify-items-center'>
                <img
                    src="https://images.unsplash.com/photo-1635442021499-34a3a724084a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                    className="shadow-md rounded-full w-10 h-10 m-2 border-2 border-gray-300" />
            </div>
            </header>
        </div>
    )
}
