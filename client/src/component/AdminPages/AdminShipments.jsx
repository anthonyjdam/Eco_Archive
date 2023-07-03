import React, { useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar'
import AdminProfileBar from './AdminProfileBar'
import axios from 'axios';


function AdminShipments() {

    const [date, setDate] = useState();
    const [shipFacility, setShipFacility] = useState();
    const [branchID, setBranchID] = useState();
    const [adminID, setAdminID] = useState();


    useEffect(() => {
        handleGetDetails();
    }, []);


    function handleGetDetails() {
        axios
            .get(`http://localhost:5000/api/shipmentFacility`)
            .then((response) => {
                // const facilityName = response.data.map((item) => (item.FacilityName));
                // const facilityLocation = response.data.map((item) => (item.Location))

                console.log("YOOOOOOOOOOOOOO", response.data)
                // console.log(facilityName);
                // console.log(facilityLocation);

                setShipFacility(response.data)

            });
    }


    return (
        <>
            {/* Sidebar */}
            <div className="sticky flex-auto w-48 shadow-md z-50 ">
                <aside>
                    <AdminSidebar />
                </aside>
            </div>

            <main className=" min-h-screen bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-50 via-indigo-100 to-emerald-50 ">
                {/* Profile Bar */}
                <AdminProfileBar directory={"> Shipments"} />

                <div className="pl-52">
                    {/*Request Shipment */}
                    <div className="flex-auto bottom-0 overflow-y-auto pr-4 pt-8">
                        <div className="bg-white rounded-lg opacity-[85%] shadow-md m-3 mb-5">

                            <h2 className=" text-md text-blue-300 font-bold pl-5 pt-2 pb-2">Shipment Requisition</h2>
                            <hr className='pb-2'></hr>

                            <div className="mx-3">

                                <div className='flex items-center justify-start pl-3 pt-3 pb-3 text-gray-600'>
                                    <form>
                                        <select>
                                            <option className='text-gray-200'></option>
                                            {shipFacility && shipFacility.length > 0 ? (
                                                shipFacility.map((item, index) => (
                                                    <option key={index} value={item.FacilityName + " " + item.Location}>
                                                        {item.FacilityName + " " + item.Location}
                                                    </option>
                                                ))
                                            ) : (
                                                <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/bc0c6b69321565.5b7d0cbe723b5.gif" className="opacity-30 flex justify-center" />
                                            )}
                                        </select>
                                    </form>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </main>


        </>
    )
}

export default AdminShipments