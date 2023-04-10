import React, { useEffect, useState } from "react";
import CustomerSidebar from "./CustomerSidebar";
import logo from "../../newlogo.png";
import axios from "axios";

const hamburger = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    />
  </svg>
);

const search = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
    />
  </svg>
);

const minusCircle = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

function PickUp() {
  const [nav, setNav] = useState(false);
  const [recycling_depots, setRecycling_depots] = useState([]);
  const [selected_depot, setSelected_depot] = useState("");
  const [date, setDate] = useState("")
  const [accepted_recyclables, setAccepted_recyclables] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [filtered_recyclables, setFiltered_recyclables] = useState([]);
  const [pickUpList, setPickUpList] = useState([]);
  const [pickUpCounts, setPickUpCounts] = useState({});
  const [fieldError, setFieldError] = useState(false); // State for showing the error message
  const [fieldErrorMessage, setFieldErrorMessage] = useState(""); // Error message

  // On page load get a list of all the recycling depots
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/recycling_depot")
      .then((response) => {
        setRecycling_depots(response.data);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 404) {
            setRecycling_depots([]);
          }
        }
      });
  }, []);

  useEffect(() => {
    if (selected_depot !== "") {
      axios
        .get(`http://localhost:5000/api/accepted_recyclable/${selected_depot}`)
        .then((response) => {
          console.log(response.data);
          setAccepted_recyclables(response.data);
          setSearchString("");
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 404) {
              setAccepted_recyclables([]);
            }
          }
        });
    }
  }, [selected_depot]);


  function handleSeachChange(e) {
    const newList = accepted_recyclables.filter((recyclable) => {
      return recyclable.RecyclableName.toLowerCase().includes(
        e.target.value.toLowerCase()
      );
    });

    setFiltered_recyclables(newList);
    setSearchString(e.target.value);
  }

  function handleCountChange(e, recyclableName) {
    pickUpList.map((pickUpItem) => {
      if (pickUpList.length > 0) {
        if (pickUpItem.RecyclableName === recyclableName) {
          const newCount = { ...pickUpCounts };
          newCount[recyclableName] = e.target.value;
          setPickUpCounts(newCount);
        }
      }
    });
  }

  function handlePickUpListAdd(recyclableToAdd) {
    console.log(recyclableToAdd);
    setShowResults(false);
    setSearchString("");
    setPickUpList([...pickUpList, recyclableToAdd]);
    // Update the recyclables to the remaining list
    const remainingRecyclables = [...accepted_recyclables];
    remainingRecyclables.splice(
      remainingRecyclables.indexOf(recyclableToAdd),
      1
    );
    setAccepted_recyclables(remainingRecyclables);
  }

  function handlePickUpListRemove(recyclableToRemove) {
    setAccepted_recyclables([...accepted_recyclables, recyclableToRemove]);
    // Update the recyclables in the pick up list
    const remainingRecyclables = [...pickUpList];
    remainingRecyclables.splice(
      remainingRecyclables.indexOf(recyclableToRemove),
      1
    );
    setPickUpList(remainingRecyclables);
  }

  function handlePickUpSubmit() {

  }

  return (
    <div>
      <CustomerSidebar nav={nav} setNav={setNav} />

      {nav ? (
        <div
          className="bg-black/60 fixed w-full h-screen z-[5] top-0 left-0"
          onClick={() => setNav(false)}
        ></div>
      ) : (
        ""
      )}

      <div className="content flex flex-col gap-8 lg:ml-64 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-50 via-indigo-100 to-emerald-50 p-8 min-h-screen">
        <div className="header flex items-center h-12 py-8 gap-4 lg:hidden ">
          <button
            className="bg-white rounded-2xl p-4 hover:scale-110 transition-transform"
            onClick={() => {
              setNav(true);
            }}
          >
            {hamburger}
          </button>
          <img src={logo} className="h-auto w-6 xs:w-10" />
          <h1 className="font-bold text-base xs:text-3xl">Eco_Archive</h1>
        </div>
        <div className="w-full bg-white rounded-2xl px-8 py-6 flex items-center flex-col gap-6">
          <h2 className="font-medium text-2xl border-b-2 pb-2 px-4">
            Request Pick Up
          </h2>
          <select
            className="w-full border-2 border-gray-400 rounded p-2"
            onChange={(e) => {
              setSelected_depot(e.target.value);
              setPickUpList([]);
            }}
          >
            <option value={""}>Select Depot</option>
            {recycling_depots.map((depot) => {
              return (
                <option key={depot.BranchName} value={depot.BranchName}>
                  {depot.BranchName}
                </option>
              );
            })}
          </select>
        </div>
        {selected_depot !== "" && (
          <div className="w-full bg-white rounded-2xl px-8 py-6 flex items-center flex-col gap-6">
            <h2 className="font-medium text-2xl border-b-2 pb-4 px-4">
              Add to Pickup list
            </h2>

            <div className="relative">
              <div className="w-full border-2 border-gray-400 rounded p-2 flex">
                <input
                  className="grow"
                  placeholder="Search recyclables"
                  type="text"
                  value={searchString}
                  onFocus={() => setShowResults(true)}
                  onBlur={() => setTimeout(() => setShowResults(false), 100)}
                  onChange={(e) => handleSeachChange(e)}
                />
                <div className="grow-0">{search}</div>
              </div>
              {showResults && (
                <div className=" bg-zinc-300 absolute w-full max-h-32 overflow-hidden overflow-y-scroll">
                  {searchString.length == 0
                    ? accepted_recyclables.map((recyclable) => {
                        return (
                          <div
                            key={recyclable.RecyclableName}
                            className="p-2 font-medium hover:bg-white"
                            onClick={() => {
                              handlePickUpListAdd(recyclable);
                            }}
                          >
                            {recyclable.RecyclableName}
                          </div>
                        );
                      })
                    : filtered_recyclables.map((recyclable) => {
                        return (
                          <div
                            key={recyclable.RecyclableName}
                            className="p-2 font-medium hover:bg-white"
                            onClick={() => {
                              handlePickUpListAdd(recyclable);
                            }}
                          >
                            {recyclable.RecyclableName}
                          </div>
                        );
                      })}
                </div>
              )}
            </div>
          </div>
        )}

        {pickUpList.length > 0 && (
          <form className="w-full bg-white rounded-2xl px-8 py-6 flex items-center flex-col gap-6">
            <h2 className="font-medium text-2xl border-b-2 pb-4">
              Pick Up List
            </h2>
            {fieldError && (
              <div className="bg-red-500 px-3 py-3 rounded text-gray-100 mb-5">
                <p>{fieldErrorMessage}</p>
              </div>
            )}
            {pickUpList.map((recyclable) => {
              return (
                <div
                  key={recyclable.RecyclableName}
                  className="w-full sm:w-1/2 border-b-2 p-2 flex justify-between items-center"
                >
                  <div className="flex gap-2">
                    <div
                      onClick={() => {
                        handlePickUpListRemove(recyclable);
                      }}
                    >
                      {minusCircle}
                    </div>
                    <span className="">{recyclable.RecyclableName}</span>
                  </div>
                  <input
                    className="w-16 border-2 rounded text-center border-gray-400"
                    placeholder="Count"
                    type="number"
                    value={pickUpCounts[recyclable.RecyclableName] | 0}
                    onClick={(e) => e.target.select()}
                    onChange={(e) => {
                      handleCountChange(e, recyclable.RecyclableName);
                    }}
                  />
                </div>
              );
            })}
            <button
              className="bg-blue-400 w-full sm:w-1/2 text-gray-100 py-2 rounded hover:bg-blue-500 transition-colors"
              type="submit"
            >
              Submit Pick Up Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default PickUp;
