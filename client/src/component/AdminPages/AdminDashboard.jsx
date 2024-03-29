import React, { useState, useEffect, useContext } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminProfileBar from "./AdminProfileBar";
import AdminTable from "./AdminTable";
import axios from "axios";
import userContext from "../userContext";

// import LinePlot from "./LinePlot";
// import * as d3 from "d3";
import CurrentMatGraph from "./CurrentMatGraph";
import { NavLink } from "react-router-dom";
import DailyCapacity from "./DailyCapacity";
import MonthlyOverview from "./MonthlyOverview";
// import CurrentMatGraph from "./CurrentMatGraphOld";

export default function AdminDashboard() {
  const { currentUser } = useContext(userContext);
  const [concurrentGlassCount, setConcurrentGlassCount] = useState(0);
  const [concurrentPlasticCount, setConcurrentPlasticCount] = useState(0);
  const [concurrentMetalCount, setConcurrentMetalCount] = useState(0);
  const [concurrentPaperCount, setConcurrentPaperCount] = useState(0);
  const [lifetimeGlassCount, setLifetimeGlassCount] = useState(0);
  const [lifetimePlasticCount, setLifetimePlasticCount] = useState(0);
  const [lifetimeMetalCount, setLifetimeMetalCount] = useState(0);
  const [lifetimePaperCount, setLifetimePaperCount] = useState(0);
  const [currentMonth, setCurrentMonth] = useState("");
  const [series, setSeries] = useState();
  // const [data, setData] = useState(() => d3.ticks(-2, 2, 200).map(Math.sin));
  const [data, setData] = useState();
  const [branchName, setBranchName] = useState();
  const [totConMat, setTotConMat] = useState();

  const maxCap = 5000;



  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/admin/${currentUser}`)
      .then((response) => {
        databaseError(response);
        setBranchName(response.data[0].BranchName);
        axios
          .get(
            `http://localhost:5000/api/inventoryCounts/${response.data[0].BranchName}`
          )
          .then((res) => {
            setConcurrentGlassCount(res.data[0].ConcurrentGlass.toLocaleString());
            setConcurrentPlasticCount(res.data[0].ConcurrentPlastic.toLocaleString());
            setConcurrentMetalCount(res.data[0].ConcurrentMetal.toLocaleString());
            setConcurrentPaperCount(res.data[0].ConcurrentPaper.toLocaleString());
            setLifetimeGlassCount(res.data[0].LifetimeGlass.toLocaleString());
            setLifetimePlasticCount(res.data[0].LifetimePlastic.toLocaleString());
            setLifetimeMetalCount(res.data[0].LifetimeMetal.toLocaleString());
            setLifetimePaperCount(res.data[0].LifetimePaper.toLocaleString());
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  /**
   * 
   */
  useEffect(() => {
    const currentDate = new Date();
    const month = (currentDate.getMonth()).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });

    console.log("Making Database get request with ");
    console.log("AdminDash: Month " + month);

    axios
      .get(`http://localhost:5000/api/transactionDates/${month}/${branchName}`)
      .then((response) => {
        databaseError(response);

        // Sum the number of recyclables for that day of a particular month, and do this for each day in a month
        const summedMat = Object.values(
          response.data.reduce((acc, row) => {
            const date = row.DateTime.slice(0, 10); // Extract the date part of the DateTime string
            if (!acc[date]) {
              acc[date] = { ...row, AmountOfMaterialsGiven: 0 };
            }

            acc[date].AmountOfMaterialsGiven += row.AmountOfMaterialsGiven;
            return acc;
          }, {})
        );

        // Sum the customer earnings for that day of a particular month, and do this for each day in a month
        const summedEarnings = Object.values(
          response.data.reduce((acc, row) => {
            const date = row.DateTime.slice(0, 10); // Extract the date part of the DateTime string
            if (!acc[date]) {
              acc[date] = { ...row, AmountEarned: 0 };
            }

            acc[date].AmountEarned += row.AmountEarned;
            return acc;
          }, {})
        );

        console.log("burger");
        console.log(summedMat);
        console.log("burger");

        const formattedData = [
          summedMat.map((row) => ({ x: new Date(row.DateTime).getDate(), y: row.AmountOfMaterialsGiven })),
          summedEarnings.map((row) => ({ x: new Date(row.DateTime).getDate(), y: row.AmountEarned })),
        ];

        setSeries(formattedData)
        setData(formattedData);
        // console.log("Sandwich")
        // console.log(data);
        // console.log("Sandwich")

      });

  }, [branchName]);

  /**
   * 
   * @param {*} res 
   */
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
        {/* Top Bar */}
        <AdminProfileBar directory={"> Admin Dashboard"} />


        <div className="pl-52">
          {/* Iventory Summary */}
          <div className="flex-auto bottom-0 overflow-y-auto pr-4 pt-8">

            {/* Heading */}
            {/* <div className="bg-white rounded-lg opacity-[85%] shawdow-lg m-3"> */}
            {/* <h2 className=" text-2xl text-slate-700 font-bold pl-5 pt-2 pb-2">
                Inventory
              </h2> */}
            {/* </div> */}

            <div className="grid grid-cols-1 grid-flow-dense md:grid-cols-4 gap-5 m-3 pt-1 opacity-[85%]">

              <div className="col-span-4 md:col-span-2 lg:col-span-1 row-span-1 bg-white rounded-lg shadow-md min-w-[100px] opacity-[85%]">
                <div className="m-4">
                  <h3 className="font-bold text-sm text-slate-500">
                    Lifetime Total
                  </h3>
                  <div className="flex justify-between items-center mt-6">
                    <div className="text-lg font-semibold text-slate-500">
                      <p className="m-1">Glass</p>
                      <p className="m-1">Plastic</p>
                      <p className="m-1">Metal</p>
                      <p className="m-1">Paper</p>
                    </div>

                    <div className="flex-row justify-end text-2xl font-bold text-slate-700">
                      <p>{lifetimeGlassCount}</p>
                      <p>{lifetimePlasticCount}</p>
                      <p>{lifetimeMetalCount}</p>
                      <p>{lifetimePaperCount}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white col-span-4 md:col-span-4 lg:col-span-3 row-span-2 rounded-lg shadow-md opacity-[85%]">

                <div className="flex justify-end mt-3 mx-3">
                  <select
                    className="bg-gray-200 text-gray-400 font-bold text-sm py-1 px-3 rounded-full hover:bg-gray-300 hover:text-gray-500"
                    type="text"
                    // value={series}
                    onChange={(e) => {
                      if (e.target.value == "Total Earned") {
                        setSeries([data[1]])
                        console.log("Earned", [data[1]]);
                      }
                      else if (e.target.value == "Total Recyclables") {
                        setSeries([data[0]])
                        console.log("Earned", [data[0]]);
                      }
                      else {
                        setSeries([data[0]].concat([data[1]]))
                        console.log("Earned", [data]);
                      }
                    }}
                  >
                    {/* <option></option> */}
                    <option>Recyclables vs Cust Earnings</option>
                    <option>Total Recyclables</option>
                    <option>Total Earned</option>
                  </select>
                </div>

                <div className="mb-3 mx-3">
                  {data && data.length > 0 ? (
                    <CurrentMatGraph data={series} />
                  ) : (
                    <>
                      <div className="opacity-30 flex justify-center h-48" >
                        <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/bc0c6b69321565.5b7d0cbe723b5.gif"/>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="col-span-4 md:col-span-2 lg:col-span-1 row-span-1 bg-white rounded-lg shadow-md min-w-[100px] opacity-[85%]">
                <div className="m-4">
                  <h3 className="font-bold text-sm text-slate-500">
                    Concurrent Total
                  </h3>
                  <div className="flex justify-between items-center mt-6">
                    <div className="text-lg font-semibold text-slate-500">
                      <p className="m-1">Glass</p>
                      <p className="m-1">Plastic</p>
                      <p className="m-1">Metal</p>
                      <p className="m-1">Paper</p>
                    </div>

                    <div className="flex-row justify-end text-2xl font-bold text-slate-700">
                      <p>{concurrentGlassCount}</p>
                      <p>{concurrentPlasticCount}</p>
                      <p>{concurrentMetalCount}</p>
                      <p>{concurrentPaperCount}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-4 lg:col-span-3 xl:col-span-2 row-span-2 bg-white rounded-lg shadow-md min-w-[100px] opacity-[85%]">
                <div className="m-4 ">
                  <h3 className="font-bold text-sm text-slate-500">
                    Monthly Overview
                  </h3>
                  <MonthlyOverview />
                </div>
              </div>

              <div className="col-span-4 lg:col-span-1 xl:col-span-2 row-span-2 bg-white rounded-lg shadow-md min-w-[100px] opacity-[85%]">
                <div className="m-4">
                  <h3 className="font-bold text-sm text-slate-500">
                    Daily Capacity {" /" + maxCap}
                  </h3>
                  <DailyCapacity
                    currentGlass={concurrentGlassCount}
                    currentPlastic={concurrentPlasticCount}
                    currentMetal={concurrentMetalCount}
                    currentPaper={concurrentPaperCount}
                    maxCap={maxCap}
                  />

                  <NavLink
                    className="p-1 w-fit flex items-center rounded-lg px-2 bg-gray-50 border-2 text-gray-400 duration-300 cursor-pointer
                             hover:bg-blue-200 hover:text-gray-500 hover:border-blue-300 active:bg-blue-300"
                    to="/shipments"
                  >
                    <label className="font-semibold text-sm">
                      Request Shipment
                    </label>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.4" stroke="currentColor" className="w-5 h-5 ml-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg>
                  </NavLink>
                </div>
              </div>

              {/* <div className="bg-blue-500 min-h-[50px] col-span-3 rounded-lg">
              </div> */}

            </div>


          </div>
        </div>
      </main>



    </>

  )
}
