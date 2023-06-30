import React, { useState, useEffect, useContext } from "react";
import useMeasure from 'react-use-measure';
import AdminSidebar from "./AdminSidebar";
import AdminProfileBar from "./AdminProfileBar";
import AdminTable from "./AdminTable";
import axios from "axios";
import userContext from "../userContext";

// import LinePlot from "./LinePlot";
// import * as d3 from "d3";
import CurrentMatGraph from "./CurrentMatGraph";
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

  let [ref, bounds] = useMeasure();


  useEffect(() => {
    console.log("width: " + bounds.width + " height: " + bounds.height)
    axios
      .get(`http://localhost:5000/api/admin/${currentUser}`)
      .then((response) => {
        axios
          .get(
            `http://localhost:5000/api/inventoryCounts/${response.data[0].BranchName}`
          )
          .then((res) => {
            setConcurrentGlassCount(res.data[0].ConcurrentGlass);
            setConcurrentPlasticCount(res.data[0].ConcurrentPlastic);
            setConcurrentMetalCount(res.data[0].ConcurrentMetal);
            setConcurrentPaperCount(res.data[0].ConcurrentPaper);
            setLifetimeGlassCount(res.data[0].LifetimeGlass);
            setLifetimePlasticCount(res.data[0].LifetimePlastic);
            setLifetimeMetalCount(res.data[0].LifetimeMetal);
            setLifetimePaperCount(res.data[0].LifetimePaper);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {

    const currentDate = new Date();
    const month = (currentDate.getMonth() + 1).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });

    console.log("Making Database get request with ");
    console.log("AdminDash: Month " + month);

    axios
      .get(`http://localhost:5000/api/transactionDates/${month}`)
      .then((response) => {

        // apply the lambda function, which makes an array tuple from the date and amount earned,
        // and apply the lambda function to each [temporary] elmnt in the response.data object array
        // const dataPoint = response.data.map((elmnt) => ([
        //   new Date(elmnt.DateTime).getDate(),
        //   elmnt.AmountOfMaterialsGiven
        // ]));

        // console.log("Sandwich")
        // console.log(dataPoint);
        // console.log("Sandwich")

        // const formattedData = [
        //   {
        //     id: 'series1',
        //     data: response.data.map((row) => ({
        //       x: new Date(row.DateTime).getDate(),
        //       y: row.AmountOfMaterialsGiven,
        //     })),
        //   },
        //   {
        //     id: 'series2',
        //     data: response.data.map((row) => ({
        //       x: row.AmountEarned,
        //       y: row.AmountOfMaterialsGiven,
        //     })),
        //   },
        // ];

        const formattedData = [
          response.data.map((row) => ({ x: new Date(row.DateTime).getDate(), y: row.AmountOfMaterialsGiven })),
          response.data.map((row) => ({ x: new Date(row.DateTime).getDate(), y: row.AmountEarned})),
        ];


        setData(formattedData);
        // console.log("Sandwich")
        // console.log(data);
        // console.log("Sandwich")

      });

  }, []);

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
        <AdminProfileBar />


        <div className="lg:pl-52">
          {/* Iventory Summary */}
          <div className="flex-auto bottom-0 overflow-y-auto lg:pr-4 lg:pt-8">
            <div className="bg-white rounded-lg opacity-[85%] shawdow-lg m-3">
              <h2 className=" text-2xl text-blue-300 font-bold pl-5 pt-2 pb-2">
                Inventory
              </h2>
              <hr className="pb-2"></hr>
              <div className="flex-row">
                <h3 className="pl-5 font-semibold text-md text-gray-700">
                  Concurrent Total
                </h3>
                <div className="pl-5 flex">
                  <div className="flex justify-start">
                    <div className="pl-3 pt-3 pb-3 text-gray-600">
                      <p>Glass</p>
                      <p>Plastic</p>
                      <p>Metal</p>
                      <p>Paper</p>
                    </div>
                    <div className="pl-10 pt-3 pb-3 text-gray-600">
                      <p>{concurrentGlassCount}</p>
                      <p>{concurrentPlasticCount}</p>
                      <p>{concurrentMetalCount}</p>
                      <p>{concurrentPaperCount}</p>
                    </div>
                  </div>

                  <div className="w-full">
                    {data && data.length > 0 ? (
                      <CurrentMatGraph data={data}/>
                    ) : (
                      <p>Loading...</p>
                    )}
                  </div>
                  
                  {/* <div className="w-full flex justify-center">
                    <div className="h-full w-fit pr-5" ref={ref}>
                      {bounds.width > 0 && data && data.length > 0 ? (
                        <CurrentMatGraph data={data} width={bounds.width} height={bounds.height} />
                      ) : (
                        <p>Loading...</p>
                      )}
                    </div>
                  </div> */}
                </div>


                <hr className="pt-2 pb-2"></hr>
                <h3 className="font-semibold text-md text-gray-700 pl-5">
                  Lifetime Total
                </h3>
                <div className="pl-5 flex">
                  <div className="pl-3 pt-3 pb-3 text-gray-600">
                    <p>Glass</p>
                    <p>Plastic</p>
                    <p>Metal</p>
                    <p>Paper</p>
                  </div>
                  <div className="pl-10 pt-3 pb-3 text-gray-600">
                    <p>{lifetimeGlassCount}</p>
                    <p>{lifetimePlasticCount}</p>
                    <p>{lifetimeMetalCount}</p>
                    <p>{lifetimePaperCount}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Admin Table */}
            <div>
              <div className="text-center relative m-3">
                {/* <AdminTable /> */}
              </div>
            </div>

            {/* <div className="flex-auto bottom-0 overflow-y-auto lg:pl-52 lg:pr-4 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-50 via-indigo-100 to-emerald-50"> */}
            <div className="opacity-[85%] text-center relative m-3">
              <form>
                {/* <input className='w-full h-10 rounded-md shadow-md pl-3' placeholder='Enter Query'></input> */}


              </form>
            </div>
          </div>
        </div>
      </main>



    </>

  )
}
