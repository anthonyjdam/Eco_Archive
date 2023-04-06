import React, { useState } from 'react'
import AdminSidebar from './AdminSidebar'
import AdminProfileBar from "./AdminProfileBar"
import AdminTable from './AdminTable'

// glassRate = 3;

function AdminEditMaterial() {

  //State variables
  const [glassRate, setGlassRate] = useState("0.25");
  const [PlasticRate, setPlasticRate] = useState("0.10");
  const [AluminiumRate, setAluminiumRate] = useState("0.15");

  const [fieldError, setFieldError] = useState(false);

  console.log(glassRate);
  console.log(PlasticRate);
  console.log(AluminiumRate);


  const handleNonNumberInput = (input) => {
    if (isNaN(input)) {
      setFieldError(true)
      return false;
    }
    setFieldError(false)
    return true;
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
                  <div className='pl-3 pt-3 pb-3 text-gray-600 justify-around'>
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
                        placeholder={PlasticRate}
                        className='border-b-2 border-gray-200 focus:border-blue-200 rounded-sm pl-3'
                        type="text"
                        value={PlasticRate}
                        onChange={(e) => {
                          const isValid = handleNonNumberInput(e.target.value);
                          if (isValid) {
                            setPlasticRate(e.target.value);
                          }
                        }}

                      ></input>
                      <br className='mb-3'></br>
                      <h3 className='font-semibold'>Aluminium</h3>
                      <lable>$</lable>
                      <input
                        placeholder={AluminiumRate}
                        className='border-b-2 border-gray-200 focus:border-blue-200 rounded-sm pl-3'
                        type="text"
                        value={AluminiumRate}
                        onChange={(e) => {
                          const isValid = handleNonNumberInput(e.target.value);
                          if (isValid) {
                            setAluminiumRate(e.target.value);
                          }
                        }
                        }

                      ></input>
                      <br className='mb-3'></br>
                    </form>
                  </div>
                  <div className='pl-3 pb-5 flex'>{fieldError &&
                    <div className="text-red-500 ">
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
