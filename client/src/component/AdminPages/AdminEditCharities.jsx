import React, { useEffect, useState, useContext } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminProfileBar from "./AdminProfileBar";
import AdminTable from "./AdminTable";
import axios from "axios";
import userContext from "../userContext";

export default function AdminEditCharities() {
  const [charities, setCharities] = useState([]);
  const [NGOToAddName, setNGOToAddName] = useState("");
  const { currentUser } = useContext(userContext);

  // On page load, get all the charities from the database
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/ngo")
      .then((response) => {
        setCharities(response.data);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 404) {
            setAccepted_recyclables([]);
          }
        }
      });
  }, []);

  function handleNGOAdd() {
    axios
      .post("http://localhost:5000/api/ngo/add", {
        ngoName: NGOToAddName,
        adminUsername: currentUser,
      })
      .catch((err) => {
        console.log(err);
        return;
      });
    const newCharities = [...charities];
    const newCharity = {
      NGOName: NGOToAddName,
      AmountRaised: 0.0,
      Username: currentUser,
    };
    newCharities.push(newCharity);
    setCharities(newCharities);
  }

  function handleNGODelete(NGOToDelete) {
    axios
      .post("http://localhost:5000/api/ngo/delete", {
        ngoName: NGOToDelete,
      })
      .catch((err) => {
        console.log(err);
      });

    // Update the charities array
    const remainingCharities = [...charities];
    remainingCharities.splice(remainingCharities.indexOf(NGOToDelete), 1);
    setCharities(remainingCharities);
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
            <div className="bg-white rounded-md opacity-[85%] shawdow-lg m-3">
              <h2 className=" text-2xl text-blue-300 font-bold pl-5 pt-2 pb-2">
                Charities and Non Governmental Organizations
              </h2>
              <hr className="pb-2"></hr>
              <div className="pl-5 w-full">
                <div className="pl-3 pt-3 pb-3 text-gray-600 flex flex-col items-center">
                  <div className="w-full columnHeaders pt-2 flex justify-between text-gray-400 p-4">
                    <h4 className="w-1/2">Name</h4>
                    <h4 className="w-1/2">Amount Raised</h4>
                  </div>
                  <ul className="pb-12 flex flex-col items-center justify-between p-4 gap-6 w-full">
                    {charities.map((charity) => {
                      return (
                        <li
                          key={charity.NGOName}
                          className="w-full flex items-center justify-around border-b-2"
                        >
                          <h3 className="w-1/2">{charity.NGOName}</h3>
                          <span className="text-gray-600 w-1/4">
                            ${charity.AmountRaised}
                          </span>
                          <button
                            onClick={() => {
                              handleNGODelete(charity);
                            }}
                            className="hover:cursor-pointer text-blue-400 w-1/4"
                          >
                            Delete
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                  <input
                    type="text"
                    value={NGOToAddName}
                    placeholder="Add NGO name"
                    className="mb-6 text-center border-2 border-gray-400 rounded"
                    onChange={(e) => {
                      setNGOToAddName(e.target.value);
                    }}
                  />
                  <button
                    onClick={() => {
                      handleNGOAdd();
                    }}
                    className="hover:cursor-pointer bg-blue-400 w-1/6 rounded text-white p-2"
                  >
                    Add NGO
                  </button>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
