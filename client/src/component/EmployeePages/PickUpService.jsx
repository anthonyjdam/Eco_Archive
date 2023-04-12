import React from 'react'
import ServiceRequestTable from './ServiceRequestTable'
import { Link, useLocation } from "react-router-dom";
import axios from "axios";



export default function PickUpService() {

    let { state } = useLocation();

    // const [completeStatus, setCompleteStatus] = useState("COMPLETE");

    const completeStatus = {status : 'COMPLETE', username : state.customer.Username, branchname : state.customer.BranchName, datetime : state.customer.DateTime}


    //update the total transaction 
    function handleCompleteOrder(e) {
        console.log(completeStatus);
        axios
        .post(`http://localhost:5000/api/complete`, completeStatus)
          .catch((error) => {
          if (error.response) {
            if (error.response.status === 500) {
              console.log('error');
            }
          }
        });
    }


    // let { state } = useLocation();
    console.log(state);


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
                        <form class="w-full max-w-sm justify-items-start font-mono text-md">
                            <div class="flex justify-items-start mb-1">
                                <div class="w-2/4">
                                    <label class="block text-gray-500 font-bold md:text-right md:mb-0 px-3" for="inline-transaction-id">
                                        Customer ID:
                                    </label>
                                </div>
                                <div class="w-2/4">
                                    <span class="bg-gray-100 bg-opacity-30 border-gray-300 w-full py-2 px-4 text-gray-700 leading-tight" id="inline-transaction-id" type="text" disabled>
                                        {state.customer.Username}  </span>
                                </div>
                            </div>

                            <div class="flex justify-items-start mb-1">
                                <div class="w-2/4">
                                    <label class="block text-gray-500 font-bold md:text-right md:mb-0 px-3" for="inline-Date">
                                        Date:
                                    </label>
                                </div>
                                <div class="w-2/4">
                                    <span class="bg-gray-100 bg-opacity-30 border-gray-300 w-full py-2 px-4 text-gray-700 leading-tight" id="inline-Date" type="date" placeholder='' disabled>
                                    {new Date(state.customer.DateTime).toDateString()} </span>
                                </div>
                            </div>

                            <div class="flex justify-items-start mb-1">
                                <div class="w-2/4">
                                    <label class="block text-gray-500 font-bold md:text-right md:mb-0 px-3" for="inline-emp-id">
                                        Transaction Total $:
                                    </label>
                                </div>
                                <div class="w-2/4">
                                    <input class="bg-gray-100 bg-opacity-30 border-gray-300 w-full py-2 px-4 text-gray-700 leading-tight" id="inline-emp-id" type="number" placeholder="####" disabled>
                                    </input>
                                </div>
                            </div>

                        </form>
                    </div>
                    <hr class="h-px mb-2 bg-gray-400 border-0"></hr>

                    {/* workstation dropdown menu */}
                    <div className='text align-middle flex flex-col justify-items-center px-16 lg:px-72'>
                        <label for="workstation" class="font-semibold text-sky-800 text-center">Submission Summary</label>
                    </div>

                    <div className='text align-middle flex flex-col justify-items-center font-semibold font-mono py-4 px-12 lg:px-80 '>
                        <label>Recyclable:</label>
                        <span type="number" name="Glass" className='border-2 bg-white rounded-lg text-center font-normal'>{state.customer.RecyclableName} </span>
                        
                        <label>Quantity:</label>
                        <span type="number" name="Tin" className='rounded-lg text-center border-2 bg-white'> {state.customer.AmountOfMaterialsGiven}  </span>

                        <button className='border border-sky-900 mt-7 bg-orange-300 rounded-sm'  onClick={(e) => { handleCompleteOrder(e)}}>Update Inventory</button>
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
