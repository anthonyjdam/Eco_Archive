import React, { useContext } from 'react'
import userContext from '../userContext'

export default function AdminProfileBar({ directory }) {
    const { currentUser } = useContext(userContext);

    return (

        <div className='flex-auto'>
            <header className="opacity-[85%] w-full h-12 pl-52 top-0 mx-auto shadow-lg bg-white flex items-center justify-between">
                <h3 className='pl-8 font-semibold font-mono text-gray-300'>{directory}</h3>
                
                <div className='flex justify-start items-center'>
                    <h3 className="text-gray-500 font-bold text-left pr-5">{currentUser}</h3>
                    <div className='items-center justify-items-center'>
                        <img
                            src="https://images.unsplash.com/photo-1635442021499-34a3a724084a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                            className="shadow-md rounded-full w-10 h-10 m-2 border-2 border-gray-300" />
                    </div>
                </div>
            </header>
        </div>
    )
}
