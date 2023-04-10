import React from 'react'
import ServiceRequestTable from './ServiceRequestTable'
import { Link } from "react-router-dom";



export default function PickUpService() {
    return (
        <main className="flex flex-col gap-3 relative m-1 px-3 lg:pl-1 min-h-screen bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-50 via-indigo-100 to-emerald-50 ">
            <div>
                <h1 className='text-2xl'>
                    Eco<span className='font-bold'>Archive</span>
                </h1>
            </div>

            <div>
                <h1 className='sm:text-4xl lg:text-5xl px-2 font-semibold text-4xl text-center .text-gray-700 py-10'>PickUp <span className='font-extrabold'>Service</span></h1>
            </div>

            <div className="flex flex-col gap-2 relative m-1 lg:min-w-screen">
                <div className='px-7 pt-3 pb-4 rounded-sm border-8 border-gray-500 flex-1 text-center'>
                    <div className='py-4'>
                        <ServiceRequestTable />
                    </div>
                    <hr class="h-px mb-2 bg-gray-400 border-0"></hr>

                    {/* workstation dropdown menu */}
                    <div className='text align-middle flex flex-col justify-items-center px-16 lg:px-72'>
                        <label for="workstation" class="font-semibold text-sky-800 text-center">Select an Option</label>
                        <select id="workstation" class="bg-gray-100 text-sm rounded-md focus:ring-green-500 focus-border-green-500 block py-1.5  dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 text-center">
                            <option selected>Choose a Workstation</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                            <option value="4">Four</option>
                        </select>

                    </div>

                    <div className='text align-middle flex flex-col justify-items-center font-semibold font-mono py-4 px-12 lg:px-80 '>
                        <label>Glass:</label>
                        <input type="number" name="Glass" className='rounded-md text-center'/>
                        <label>Plastic:</label>
                        <input type="number" name="Plastic" className='rounded-md text-center' />
                        <label>Tin:</label>
                        <input type="number" name="Tin" className='rounded-md text-center'/>

                        <button className='border border-sky-900 mt-7 bg-orange-300 rounded-sm'>Update Inventory</button>
                    </div>

                </div>
            </div>

            <div className='font-semibold mt-6 text-right text-2xl'>
                
                <Link to="/employeeDashboard" className="underline ">
                    Return
                </Link>
            </div>

        </main>
    )
}
