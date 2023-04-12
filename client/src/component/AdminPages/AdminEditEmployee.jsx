import React, { useState, useEffect } from 'react'
import AdminSidebar from './AdminSidebar'
import AdminProfileBar from "./AdminProfileBar"
import AdminTable from './AdminTable'
import axios from 'axios';
import AdminTableRow from './AdminTableRow';

//TODO: useEffect to acheive the clearAll button
//TODO: reimploment unique rows


function AdminEditEmployee() {

  //Constants
  const pageRoute = "http://localhost:5000/api/processSearchEmployee";

  //Employee state variables
  const [empFName, setEmpFName] = useState("");
  const [empLName, setEmpLName] = useState("");
  const [empUsername, setEmpUsername] = useState("");
  const [empPassword, setEmpPassword] = useState("");

  //Functional State variables
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [rowSelection, setRowSelection] = useState([]);

  //TODO: Error Checking
  //TODO: Romove Table row on new search

  const handleDelete = (index) => {
    console.log(index);
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };


  async function handleEmpSearch(e) {
    e.preventDefault();

    console.log("Search " + search);
    console.log("First name " + empFName);
    console.log("Last name " + empLName);

    const searchObject = {
      userType: "employee",
      firstName: empFName,
      lastName: empLName
    }

    const response = await axios.post("http://localhost:5000/api/selectEmpWithName", searchObject);// returns an array of matching employee names
    console.log("Sandwich");
    console.log(response);
    const responseData = response.data;

    if (responseData.length > 0) {
      const newData = [];
      setData(newData);
      setData(data.concat(responseData));
    }
    else {
      console.log("No results found")
    }
  }

  async function handleRowSelection(empSelected) {

    const selectedEmployee = data.filter(emp => (emp.Username === empSelected)); //creates a new array that contains only the elements that are present in both empUsername and rowSelection  
    setRowSelection(rowSelection.concat(selectedEmployee))
    
    console.log("sandwich");
    console.log("Username " + selectedEmployee);
    console.log(rowSelection);
    console.log(selectedEmployee);

    for (let i = 0; i < selectedEmployee.length; i++) {
      console.log("Username: " + selectedEmployee[i]);
    }

    const searchObject = {
      userType: "employee",
      firstName: empFName,
      lastName: empLName
    }




  }

  async function handleRowDelete() {

    // handleDelete();
    const response = await axios.post("http://localhost:5000/api/deleteEmpWithUsername", searchObject);// returns an array of matching employee names
    console.log(response);

  }


  return (

    <>
      {/* Sidebar */}
      <div className="sticky flex-auto w-48 shadow-md z-50 ">
        <aside className="sticky flex w-48 shadow-md">
          <AdminSidebar />
        </aside>
      </div>

      <main className=" min-h-screen bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-50 via-indigo-100 to-emerald-50 ">

        {/* Top Bar */}
        <AdminProfileBar />

        <div className="lg:pl-52">
          {/* Iventory Summary */}
          <div className="flex-auto bottom-0 overflow-y-auto lg:pr-4 lg:pt-8">

            <div className="bg-white rounded-lg opacity-[85%] shadow-md m-3 mb-5">

              <h2 className=" text-2xl text-blue-300 font-bold pl-5 pt-2 pb-2">Add New Employee</h2>
              <hr className='pb-2'></hr>
              <div className="pl-5">

                <div className='flex items-center justify-start pl-3 pt-3 pb-3 text-gray-600'>
                  <form>

                    <div className='flex-col'>
                      {/*FirstName Lastname Fields */}
                      <div className='flex gap-4'>
                        <h3 className='font-semibold'>First Name</h3>
                        <input
                          className='border-b-2 border-gray-200 focus:border-blue-200 rounded-sm'
                          type="text"
                        // value={empFName}
                        ></input>
                        <h3 className='font-semibold'>Last Name</h3>
                        <input
                          className='border-b-2 border-gray-200 focus:border-blue-200 rounded-sm'
                          type="text"
                        // value={empLName}
                        ></input>
                      </div>

                      {/*Usrname Password Fields */}
                      <div className='flex flex-col items-start justify-start gap-5 pt-5'>
                        <div className='flex gap-4 items-center'>
                          <h3 className='font-semibold'>Username</h3>
                          <input
                            className='border-b-2 border-gray-200 focus:border-blue-200 rounded-sm pr-1'
                            type="text"
                          // value={empFName}
                          ></input>
                        </div>
                        <div className='flex gap-4 items-center'>
                          <h3 className='font-semibold'>Password</h3>
                          <input
                            className='border-b-2 border-gray-200 focus:border-blue-200 rounded-sm pr-2'
                            type="text"
                          // value={empLName}
                          ></input>
                        </div>
                      </div>
                    </div>
                  </form>

                </div>


              </div>
            </div>

            {/* Employee Table Container */}
            <div>
              <div className="text-left relative flex-auto m-3">

                <div className="bg-gray-50 rounded-t-lg opacity-[85%] shawdow-lg p-3">

                  <div className='flex items-center justify-between'>
                    {/* Search User Button */}
                    <div className='relative'>
                      <form onSubmit={(e) => {
                        handleEmpSearch(e);
                      }}>
                        <div className='flex relative items-start justify-start'>
                          <input className='flex p-1 pl-20 rounded-lg w-44 bg-gray-200 hover:bg-gray-300 transition-all text-gray-800'
                            type="text"
                            value={search}
                            onChange={(e) => {
                              const [first, last] = e.target.value.split(" ");
                              setEmpFName(first);
                              setEmpLName(last);
                              setSearch(e.target.value);
                            }}
                          ></input>
                          <div className='flex absolute items-start place-self-center'>
                            <button
                              onClick={() => {
                                let arr = [];
                                setData(arr)
                                console.log("Clear " + data.length);
                              }}
                              className='flex p-1.5 rounded-lg active:bg-blue-300 hover:bg-blue-200 hover:text-black transition-all text-gray-800'
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                              </svg>
                              <label className="font-semibold text-sm">
                                Search
                              </label>
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>

                    <div className='flex items-end justify-end gap-1'>
                      {/* Update User Button */}
                      <button className='flex gap-2 p-1 pr-3 pl-3 rounded-lg bg-gray-200 active:bg-green-300 hover:bg-green-200 hover:text-black transition-all text-gray-800'>
                        <label className="font-semibold text-sm">
                          Update
                        </label>
                      </button>

                      {/* Delete User Button */}
                      <button
                        className='flex gap-2 p-1 pr-3 pl-3 rounded-lg bg-gray-200 active:bg-red-300 hover:bg-red-200 hover:text-black transition-all text-gray-800'
                        onClick={() => {
                          let arr = [];
                          setData(arr)
                          console.log("Clear " + data.length);
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    </div>

                  </div>

                </div>

                {/* Admin Table */}
                <AdminTable
                  data={data}
                  deleteEmployee={handleRowDelete}
                  onSelect={handleRowSelection}
                />


              </div>
            </div>

          </div>



        </div>

      </main>

    </>

  )
}

export default AdminEditEmployee;
