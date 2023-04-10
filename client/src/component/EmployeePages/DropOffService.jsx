// import ServiceRequestTable from './ServiceRequestTable'
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";



const depot = [{
    name: 'Sage Hill', workbench: [
        {
            name: "S one"
        },
        {
            name: "S two"
        },
        {
            name: "S three"
        }
    ]
}
    , {
    name: "University", workbench: [
        {
            name: "U first"
        },
        {
            name: "U fourth"
        }
    ]
}
];



export default function DropOffService() {

    // On page load get a list of all the recycling depots
    // useEffect(() => {
    //     axios
    //         .get("http://localhost:5173/api/recycling_depot")
    //         .then((response) => {
    //             setRecycling_depots(response.data);
    //         })
    //         .catch((error) => {
    //             if (error.response) {
    //                 if (error.response.status === 404) {
    //                     setRecycling_depots([]);
    //                 }
    //             }
    //         });
    // }, []);

    //retrieves the selected recycling depot from the list of choices 
    // useEffect(() => {
    //     if (selected_depot !== "") {
    //       axios
    //         .get(`http://localhost:5173/api/accepted_recyclable/${selected_depot}`)
    //         .then((response) => {
    //           console.log(response.data);
    //           setAccepted_recyclables(response.data);
    //           setSearchString("");
    //         })
    //         .catch((error) => {
    //           if (error.response) {
    //             if (error.response.status === 404) {
    //               setAccepted_recyclables([]);
    //             }
    //           }
    //         });
    //     }
    //   }, [selected_depot]);

      //sets up the list of the acceptable recyclables at specific depot location 
    //   function handleSeachChange(e) {
    //     const newList = accepted_recyclables.filter((recyclable) => {
    //       return recyclable.RecyclableName.toLowerCase().includes(
    //         e.target.value.toLowerCase()
    //       );
    //     });
    
    //     setFiltered_recyclables(newList);
    //     setSearchString(e.target.value);
    //   }


      //the total that will be updated for amount of recyclables
    //   function handleCountChange(e, recyclableName) {
    //     pickUpList.map((pickUpItem) => {
    //       if (pickUpList.length > 0) {
    //         if (pickUpItem.RecyclableName === recyclableName) {
    //           const newCount = { ...pickUpCounts };
    //           newCount[recyclableName] = e.target.value;
    //           setPickUpCounts(newCount);
    //         }
    //       }
    //     });
    //   }

    const [trans_id, setTransactionID] = useState("")
    const [trans_date, setTransDate] = useState("")
    const [employee_user, setEmployeeUser] = useState([])
    const [depotPlace, setDepot] = useState([])
    const [location_workbench, setWorkbench] = useState([])
    const [chosenWorkbench, setForInput] = useState()
    const [dropOffList, setDropOffList] = useState([]);
    const [dropOffCounts, setDropOffCounts] = useState({});



    function handleWorkbench(event) {
        setForInput(event.target.value)
    }


    function handleDepot(event) {
        setDepot(event.target.value)
        setWorkbench(depot.find(ctr => ctr.name === event.target.value).workbench);
    }


    return (
        <main className="content flex flex-col gap-8 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-50 via-indigo-100 to-emerald-50 p-8 min-h-screen">
            <div>
                <h1 className='text-2xl'>
                    Eco<span className='font-bold'>Archive</span>
                </h1>
            </div>

            <div>
                <h1 className='sm:text-4xl lg:text-5xl px-2 font-semibold text-4xl text-center .text-gray-700 py-2'>DropOff <span className='font-extrabold'>Service</span></h1>
            </div>

            <div className="flex flex-col gap-2 relative m-1 lg:min-w-screen">
                <div className='px-6 pt-3 pb-4 rounded-sm border-8 border-gray-500 flex-1 text-center'>
                    <div className='py-4'>
                        <form class="w-full max-w-sm justify-items-start font-mono text-md">
                            <div class="flex justify-items-start mb-1">
                                <div class="w-2/4">
                                    <label class="block text-gray-500 font-bold md:text-right md:mb-0 px-3" for="inline-transaction-id">
                                        Customer ID:
                                    </label>
                                </div>
                                <div class="w-2/4">
                                    <input class="bg-gray-100 bg-opacity-30 border-gray-300 w-full py-2 px-4 text-gray-700 leading-tight" id="inline-transaction-id" type="text" placeholder="####" disabled>
                                    </input>
                                </div>
                            </div>

                            <div class="flex justify-items-start mb-1">
                                <div class="w-2/4">
                                    <label class="block text-gray-500 font-bold md:text-right md:mb-0 px-3" for="inline-Date">
                                        Date:
                                    </label>
                                </div>
                                <div class="w-2/4">
                                    <input class="bg-gray-100 bg-opacity-30 border-gray-300 w-full py-2 px-4 text-gray-700 leading-tight" id="inline-Date" type="date" disabled>
                                    </input>
                                </div>
                            </div>

                            <div class="flex justify-items-start mb-1">
                                <div class="w-2/4">
                                    <label class="block text-gray-500 font-bold md:text-right md:mb-0 px-3" for="inline-emp-id">
                                        Employee:
                                    </label>
                                </div>
                                <div class="w-2/4">
                                    <input class="bg-gray-100 bg-opacity-30 border-gray-300 w-full py-2 px-4 text-gray-700 leading-tight" id="inline-emp-id" type="text" placeholder="####" disabled>
                                    </input>
                                </div>
                            </div>

                        </form>
                    </div>
                    <h2 class="h-px mb-2 bg-gray-400 border-0"></h2>
                    {/* workstation dropdown menu */}
                    {/* text align-middle flex flex-col justify-items-center px-16 lg:px-72 */}
                    <div className='rounded-2xl px-8 py-4 flex items-center flex-col w-full lg:px-96'>
                        <h3 class="font-semibold text-sky-800 text-center">Select Branch and Workstation</h3>
                        <select className="form-control text-center w-full border-2 border-gray-400 rounded p-1" onChange={handleDepot}>
                            <option>--Choose Branch--</option>
                            {depot.map((ctr) => (
                                <option value={ctr.name}>{ctr.name}</option>
                            ))}
                        </select>
                        <br />
                        <select className="form-control text-center w-full border-2 border-gray-400 rounded p-1" onChange={handleWorkbench}>
                            <option>--Workbench--</option>
                            {location_workbench.map(c => (
                                <option value={c.name}>{c.name}</option>
                            ))}
                        </select>
                    </div>


                    <div class="container mx-auto px-6">
                        <h1 class="text-lg font-semibold mb-3 text-sky-900">Add Items For Drop Off</h1>
                        <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            <li class="bg-gray-100 shadow rounded-lg overflow-hidden">
                                <div class="p-3">
                                    <h2 class="text-lg font-semibold mb-2">Plastic</h2>
                                    <div class="flex items-center justify-between mt-4">
                                        <label class="text-base font-bold">Quantity:</label>
                                        <input type="number" class="w-16 py-2 px-4 border rounded-lg text-gray-700" />
                                    </div>
                                </div>
                            </li>
                            <li class="bg-gray-100 shadow rounded-lg overflow-hidden">
                                <div class="p-4">
                                    <h2 class="text-lg font-semibold mb-2">Glass</h2>
                                    <div class="flex items-center justify-between mt-4">
                                        <label class="text-base font-bold">Quantity:</label>
                                        <input type="number" class="w-16 py-2 px-4 border rounded-lg text-gray-700" />
                                    </div>
                                </div>
                            </li>
                            <li class="bg-gray-100 shadow rounded-lg overflow-hidden">
                                <div class="p-3">
                                    <h2 class="text-lg font-semibold mb-2">Tin</h2>
                                    <div class="flex items-center justify-between mt-4">
                                        <label class="text-base font-bold">Quantity:</label>
                                        <input type="number" class="w-16 py-2 px-4 border rounded-lg text-gray-700" />
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div class="mt-4 text-lg font-bold">Cart Total: $0.00</div>
                        <button className='border border-sky-900 mt-6 bg-orange-300 rounded-md py-2 px-4'>Update Inventory</button>

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

