import React, { useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar'
import AdminProfileBar from "./AdminProfileBar"
import axios from 'axios';


function AdminEditMaterial() {

  //State variables
  const [glassRate, setGlassRate] = useState("");
  const [plasticRate, setPlasticRate] = useState("");
  const [metalRate, setMetalRate] = useState("");
  const [paperRate, setPaperRate] = useState("");
  const [fieldError, setFieldError] = useState(false);

  console.log(glassRate);
  console.log(plasticRate);
  console.log(metalRate);

  /**
   * On page load
   */
  useEffect(() => {
    handleGetMaterial();
  }, []);


  const handleNonNumberInput = (input) => {
    if (isNaN(input)) {
      setFieldError(true);
      return false;
    }
    setFieldError(false);
    return true;
  }

  /**
   * Get the material type on page load 
   */
  async function handleGetMaterial() {

    axios.get(`http://localhost:5000/api/materialRate`)
      .then((response) => {

        for (let i = 0; i < response.data.length; i++) {
          const material = response.data[i];
          console.log(material.MaterialRate);

          if (material.MaterialType === "Glass") {
            setGlassRate(material.MaterialRate)
          }
          else if (material.MaterialType === "Plastic"){
            setPlasticRate(material.MaterialRate)
          }
          else if (material.MaterialType === "Metal"){
            setMetalRate(material.MaterialRate)
          }
          else if (material.MaterialType === "Paper"){
            setPaperRate(material.MaterialRate)
          }

        }
      });


  }

  /**
   * Sends a post request to UPDATE the Material Rates
   */
  async function handleUpdateMaterial(e) {
    e.preventDefault();

    const plasticObject = {
      userType: "recyclable",
      plasticMat: "Plastic",
      pRate: plasticRate,
    };

    const glassObject = {
      userType: "recyclable",
      glassMat: "Glass",
      gRate: glassRate,
    };

    const metalObject = {
      userType: "recyclable",
      metalMat: "Metal",
      mRate: metalRate
    };

    const paperObject = {
      userType: "recyclable",
      paperMat: "Paper",
      ppRate: paperRate
    };

    const Plasticresponse = axios.post("http://localhost:5000/api/updatePlasticRate", plasticObject);// returns an array of matching employee names
    console.log("Plasticresponse" + Plasticresponse);

    const Glassresponse = axios.post("http://localhost:5000/api/updateGlassRate", glassObject);// returns an array of matching employee names
    console.log("Glassresponse" + Glassresponse);

    const Metalresponse = axios.post("http://localhost:5000/api/updateMetalRate", metalObject);// returns an array of matching employee names
    console.log("Metalresponse" + Metalresponse);

    const Paperresponse = axios.post("http://localhost:5000/api/updatePaperRate", paperObject);// returns an array of matching employee names
    console.log("Paperresponse" + Paperresponse);

    setPlasticRate(Plasticresponse);
    setGlassRate(Glassresponse);
    setMetalRate(Metalresponse);
    setPaperRate(Paperresponse);

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

            <div className="bg-white rounded-lg opacity-[85%] shawdow-lg m-3">

              <h2 className=" text-2xl text-blue-300 font-bold pl-5 pt-2 pb-2">Material Rates</h2>
              <hr className='pb-2'></hr>
              <div className="pl-5">
                <div className='pl-3 pt-3 text-gray-600 justify-around'>
                  <form>
                    <h3 className='font-semibold'>Glass</h3>
                    <lable>$</lable>
                    <input
                      placeholder={glassRate}
                      className='border-b-2 border-gray-200 focus:border-blue-200 rounded-sm pl-3'
                      type="text"
                      value={glassRate}
                      onChange={(e) => {
                        const isValid = handleNonNumberInput(e.target.value);
                        if (isValid) {
                          setGlassRate(e.target.value);
                        }
                      }}

                    ></input>
                    <br className='mb-3'></br>
                    <h3 className='font-semibold'>Plastic</h3>
                    <lable>$</lable>
                    <input
                      placeholder={plasticRate}
                      className='border-b-2 border-gray-200 focus:border-blue-200 rounded-sm pl-3'
                      type="text"
                      value={plasticRate}
                      onChange={(e) => {
                        const isValid = handleNonNumberInput(e.target.value);
                        if (isValid) {
                          setPlasticRate(e.target.value);
                        }
                      }}

                    ></input>
                    <br className='mb-3'></br>
                    <h3 className='font-semibold'>Metal</h3>
                    <lable>$</lable>
                    <input
                      placeholder={metalRate}
                      className='border-b-2 border-gray-200 focus:border-blue-200 rounded-sm pl-3'
                      type="text"
                      value={metalRate}
                      onChange={(e) => {
                        const isValid = handleNonNumberInput(e.target.value);
                        if (isValid) {
                          setMetalRate(e.target.value);
                        }
                      }
                      }
                    ></input>
                    <br className='mb-3'></br>
                    <h3 className='font-semibold'>Paper</h3>
                    <lable>$</lable>
                    <input
                      placeholder={paperRate}
                      className='border-b-2 border-gray-200 focus:border-blue-200 rounded-sm pl-3'
                      type="text"
                      value={paperRate}
                      onChange={(e) => {
                        const isValid = handleNonNumberInput(e.target.value);
                        if (isValid) {
                          setPaperRate(e.target.value);
                        }
                      }
                      }
                    ></input>
                    <div className='pt-6'>
                      <button
                        className='font-semibold flex gap-2 p-1 pr-3 pl-3 rounded-lg bg-gray-200 active:bg-blue-300 hover:bg-blue-200'
                        onClick={(e) => {
                          handleUpdateMaterial(e);
                          setGlassRate("");
                          setPlasticRate("");
                          setMetalRate("");
                          setPaperRate("");
                        }}>
                        Update
                      </button>
                    </div>
                    <br className='mb-3'></br>
                  </form>
                </div>
                <div className='pl-3 flex'>{fieldError &&
                  <div className="text-red-500 pb-5 ">
                    <p className='text-sm'>Please enter a number value</p>
                  </div>}
                </div>
              </div>
              <div>
              </div>
            </div>
          </div>
        </div>

      </main>

    </>

  )
}

export default AdminEditMaterial;
