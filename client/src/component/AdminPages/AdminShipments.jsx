import React, { useEffect, useState, useContext } from 'react'
import AdminSidebar from './AdminSidebar'
import AdminProfileBar from './AdminProfileBar'
import axios from 'axios';
import userContext from "../userContext";
import FeedbackMessage from './FeedbackMessage';


function AdminShipments() {

    const { currentUser } = useContext(userContext);
    const [date, setDate] = useState();
    const [shipFacility, setShipFacility] = useState();
    const [outgoingShipFacility, setOutgoingShipFacility] = useState();
    const [branchName, setBranchName] = useState();
    const [selectError, setSelectError] = useState(false);
    const [maxOrderNum, setMaxOrderNum] = useState();
    const [orderNum, setOrderNum] = useState();



    useEffect(() => {
        handleGetFacilityDetails();
        handleGetAdminDetails();
        handleGetDate();
        handleGetOrderNumber();
    }, []);


    function handleGetAdminDetails() {
        axios
            .get(`http://localhost:5000/api/admin/${currentUser}`)
            .then((response) => {
                console.log("BranchName: ", response.data[0].BranchName);
                setBranchName(response.data[0].BranchName);
            });
    }

    function handleGetFacilityDetails() {
        axios
            .get(`http://localhost:5000/api/shipmentFacility`)
            .then((response) => {
                // const facilityName = response.data.map((item) => (item.FacilityName));
                // const facilityLocation = response.data.map((item) => (item.Location))
                // console.log(facilityName);
                // console.log(facilityLocation);

                console.log("Facility Details", response.data)
                setShipFacility(response.data)

            });
    }

    function handleGetDate() {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('en-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        })

        console.log("Current Date: ", formattedDate);
        setDate(formattedDate);
    }


    function handleGetOrderNumber() {
        axios
            .get(`http://localhost:5000/api/maxOrderNumber`)
            .then((response) => {
                // console.log("OrderNumber: ", response.data[0].MaxOrderNumber);
                let ordNum = parseInt(response.data[0].MaxOrderNumber, 10);
                ordNum = ordNum + 1;
                ordNum = ordNum.toString().padStart(8, "0");
                // console.log("New OrderNumber: ", ordNum);
                setMaxOrderNum(ordNum);
            });
    }


    function handleSubmitForm(e) {
        e.preventDefault();

        if (outgoingShipFacility == undefined) {
            setSelectError(true);
        } else {

            console.log("Success", outgoingShipFacility)
            const addObject = {
                OrderNum: maxOrderNum,
                FacilityName: outgoingShipFacility,
                BranchName: branchName,
                Username: currentUser,
                ShipmentDate: date,
            }

            axios
                .post("http://localhost:5000/api/requestShipment", addObject)
                .then((response) => {

                    console.log("Successful insertion", response);
                    for (let i = 0; i < response.length; i++) {
                        if (response[i].status === 500) {
                            console.log("Request failed");
                        }
                        else if (response === 200) {
                            console.log("Success");
                        }
                    }

                    // axios
                    //     .get
                })
        }



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

                {/*Request Shipment */}
                <div className="flex-auto bottom-0 overflow-y-auto pl-52 pr-4 pt-8">
                    <div className="m-3 mb-5 min-w-fit bg-white rounded-lg opacity-[85%] shadow-md">

                        <h2 className=" text-md text-blue-300 font-bold pl-5 pt-2 pb-2">Shipment Requisition</h2>
                        <hr className='pb-2'></hr>

                        <div className='flex-row justify-start mx-6 pt-2 pb-5 text-gray-600'>
                            <div className="flex justify-between pt-2 pb-3 mb-3 text-gray-600">
                                <div className="flex-col w-full min-w-fit pr-3">
                                    <h3 className="py-1.5 font-semibold">Branch Name</h3>
                                    <h3 className="py-1.5 font-semibold">Admin Username</h3>
                                    <h3 className="py-1.5 font-semibold">Date</h3>
                                    <h3 className="py-1.5 font-semibold">Order Number</h3>
                                    <h3 className="py-1.5 font-semibold underline">Shipment Facility</h3>
                                </div>
                                <div className="flex-col w-full min-w-fit justify-center sm:justify-start">
                                    <p className="py-1.5 text-gray-500 font-mono">{branchName}</p>
                                    <p className="py-1.5 text-gray-500 font-mono">{currentUser}</p>
                                    <p className="py-1.5 text-gray-500 font-mono">{date}</p>
                                    <p className="py-1.5 text-gray-500 font-mono">#{maxOrderNum}</p>
                                    <div className='w-fit ml-[-5px]'>
                                        <form>
                                            <select className='p-2 rounded-lg font-mono bg-gray-200 text-gray-500 duration-300 cursor-pointer hover:bg-gray-300 hover:text-gray-600'
                                                onChange={(e) => {
                                                    setOutgoingShipFacility(e.target.value.FacilityName);
                                                    console.log("OutgoingShipFacility", e.target.value);
                                                    // Error checking for empty string                                                    
                                                    setSelectError(false)
                                                }}

                                            >
                                                <option className='' disabled></option>
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
                            <button
                                className='font-semibold flex px-2 py-1 rounded-lg bg-gray-200 active:bg-blue-300 hover:bg-blue-200 hover:text-gray-800'
                                onClick={(e) => {
                                    handleSubmitForm(e);
                                }}
                            >
                                Submit
                            </button>
                            {selectError &&
                                <div className='w-fit mt-5'>
                                    <FeedbackMessage message={"Please select a valid shipment facility"} backgroundColor={"bg-red-200"} textColor={"text-rose-600"} fontStyle={"font-semibold"} />
                                </div>
                            }
                        </div>
                    </div>

                </div>
            </main >


        </>
    )
}


export default AdminShipments