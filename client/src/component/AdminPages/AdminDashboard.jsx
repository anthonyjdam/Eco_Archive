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
  const [branchName, setBranchName] = useState();



  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/admin/${currentUser}`)
      .then((response) => {
        setBranchName(response.data[0].BranchName);
        console.log("BranchHHHHHHHHHHHHHH: " + branchName);
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


  // function helper (data) {
  //   let acc = 0;
  //   for(let i = 0; i < data.length; i++){
  //     if(data[i].DateTime == data[i + 1].DatTime){
  //       acc = sum(data.filter((numMaterial) => numMaterial.DateTime == data[i].DateTime)).concat(acc)
  //     }

  //   }


  // }

  useEffect(() => {

    const currentDate = new Date();
    const month = (currentDate.getMonth() + 2).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });

    console.log("Making Database get request with ");
    console.log("AdminDash: Month " + month);

    axios
      .get(`http://localhost:5000/api/transactionDates/${month}/${branchName}`)
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

        // const filteredData = helper(response.data);

        const summedData = Object.values(
          response.data.reduce((acc, row) => {
            const date = row.DateTime.slice(0, 10); // Extract the date part of the DateTime string
            if (!acc[date]) {
              acc[date] = { ...row, AmountOfMaterialsGiven: 0 };
            }
            acc[date].AmountOfMaterialsGiven += row.AmountOfMaterialsGiven;
            return acc;
          }, {})
        );

        console.log("burger");
        console.log(summedData);
        console.log("burger");

        const formattedData = [
          summedData.map((row) => ({ x: new Date(row.DateTime).getDate(), y: row.AmountOfMaterialsGiven })),
          // response.data.map((row) => ({ x: new Date(row.DateTime).getDate(), y: row.AmountEarned})),
        ];


        setData(formattedData);
        // console.log("Sandwich")
        // console.log(data);
        // console.log("Sandwich")

      });

  }, [branchName]);

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

            <div className="grid grid-cols-1 sm:grid-cols-4 grid-flow-row-dense gap-5 m-3 pt-1">
              <div className="bg-white rounded-lg min-w-[100px] opacity-[85%]">
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

              <div className="bg-white min-h-[50px] col-span-3 row-span-2 rounded-lg opacity-[85%]">
                <div className="m-3">
                  {data && data.length > 0 ? (
                    <CurrentMatGraph data={data} />
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-lg min-w-[100px] opacity-[85%]">
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



              {/* <div className="bg-blue-500 min-h-[50px] col-span-3 rounded-lg">
              </div> */}

            </div>


          </div>
        </div>
      </main>



    </>

  )
}
