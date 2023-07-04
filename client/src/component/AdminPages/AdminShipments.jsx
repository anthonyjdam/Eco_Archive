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


    /**
     * Get request to fetch the BranchName of the current admin
     */
    function handleGetAdminDetails() {
        axios
            .get(`http://localhost:5000/api/admin/${currentUser}`)
            .then((response) => {
                console.log("BranchName: ", response.data[0].BranchName);
                setBranchName(response.data[0].BranchName);
            });
    }

    /**
     * Get request to fetch the availble facilities to ship to
     */
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

    /**
     * Function that calculates todays date in yyyy-mm-dd format
     */
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

    /**
     * Get request to fetch the most recent order number. After, it will
     * calculate the successor of the order number for the next shipment request
     */
    function handleGetOrderNumber() {
        axios
            .get(`http://localhost:5000/api/maxOrderNumber`)
            .then((response) => {
                // console.log("OrderNumber: ", response.data[0].MaxOrderNumber);
                let ordNum = parseInt(response.data[0].MaxOrderNumber, 10);
                ordNum = ordNum + 1;
                ordNum = ordNum.toString().padStart(8, "0");
                // console.log("New OrderNumber: ", ordNum);
                setMaxOrderNum(ordNum); //set Max Order Number to the successor of the previous order number
            });
    }


    /**
     * The function first checks if the outgoingShipFacility is defined for a value, if not, it displays an
     * error to the user.
     * 
     * Otherwise, the function makes a post request to the server to establish the next order number in orders table.
     * The purpose of this is to establish the primary key that will be used as foreign key in ship table. 
     * Next, a post request is made to add a new entry to ship table. 
     * Lastly, a post request is made to update the values of the concurrent materials, updating them to zero
     * 
     * @param {Event} e - Event object 
     */
    function handleSubmitForm(e) {
        e.preventDefault();

        if (!outgoingShipFacility) {
            setSelectError(true);
        } else {

            // console.log("Success", outgoingShipFacility.FacilityName)
            const addObject = {
                OrderNum: parseInt(maxOrderNum, 10),
                FacilityName: outgoingShipFacility.FacilityName,
                BranchName: branchName,
                Username: currentUser,
                ShipmentDate: date,
            }
            const newOrderNum = {
                OrderNumber: parseInt(maxOrderNum, 10),
            }
            const resetConcurrentInventory = {
                ConcurrentPaper: 0,
                ConcurrentGlass: 0,
                ConcurrentMetal: 0,
                ConcurrentPlastic: 0,
                BranchName: branchName,
            }

            //Add newOrderNumber to orders table
            axios
                .post("http://localhost:5000/api/addOrderNum", newOrderNum)
                .then((response) => {
                    databaseError(response);
                })

            //Add addObject to ship table
            axios
                .post("http://localhost:5000/api/requestShipment", addObject)
                .then((response) => {

                    // console.log("Successful insertion", response);
                    databaseError(response);

                    axios
                        .post("http://localhost:5000/api/updateConcurrent", resetConcurrentInventory)
                        .then((res) => {
                            databaseError(res);
                        })
                })
        }
    }

    function databaseError(res) {
        for (let i = 0; i < res.length; i++) {
            if (res[i].status === 500) {
                console.log("Request failed");
            }
            else if (res === 200) {
                console.log("Success");
            }
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
                                    <div className='ml-[-5px]'>
                                        <form>
                                            <select className='p-2 rounded-lg font-mono bg-gray-200 text-gray-500 duration-300 cursor-pointer hover:bg-gray-300 hover:text-gray-600'
                                                defaultValue={""}
                                                onChange={(e) => {
                                                    // console.log("ShipFacility ", shipFacility)
                                                    const selectedFacility = shipFacility.find(item => item.FacilityName + " " + item.Location === e.target.value); //checking if the concatenated string matches the selected option value.
                                                    setOutgoingShipFacility(selectedFacility);
                                                    // console.log("SelectedFacility ", selectedFacility)
                                                    setSelectError(false);
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