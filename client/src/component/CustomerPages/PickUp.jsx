import React, { useContext, useEffect, useState } from "react";
import CustomerSidebar from "./CustomerSidebar";
import logo from "../../newlogo.png";
import axios from "axios";
import Datepicker from "tailwind-datepicker-react";
import userContext from "../userContext";

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

// https://github.com/OMikkel/tailwind-datepicker-react
const datePickerOptions = {
  title: "Pick Up Date",
  autoHide: true,
  todayBtn: false,
  clearBtn: true,
  maxDate: new Date("2030-01-01"),
  minDate: new Date("1950-01-01"),
  theme: {
    background: "",
    todayBtn: "",
    clearBtn: "",
    icons: "",
    text: "",
    disabledText: "",
    input: "",
    inputIcon: "",
    selected: "",
  },
  icons: {
    // () => ReactElement | JSX.Element
    prev: () => <span>Previous</span>,
    next: () => <span>Next</span>,
  },
  datepickerClassNames: "top-12",
  defaultDate: new Date(),
  language: "en",
};

function PickUp() {
  const [nav, setNav] = useState(false);
  const [recycling_depots, setRecycling_depots] = useState([]);
  const [selected_depot, setSelected_depot] = useState("");
  const [accepted_recyclables, setAccepted_recyclables] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [filtered_recyclables, setFiltered_recyclables] = useState([]);
  const [pickUpList, setPickUpList] = useState([]);
  const [pickUpCounts, setPickUpCounts] = useState({});
  const [fieldError, setFieldError] = useState(false); // State for showing the error message
  const [fieldErrorMessage, setFieldErrorMessage] = useState(""); // Error message
  const [showDatePicker, setShowDatePicker] = useState(false); // State for showing the date picker

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");

  const [responseMessage, setResponseMessage] = useState("");
  const [showSuccessRequest, setShowSuccessRequest] = useState(false);

  const { currentUser } = useContext(userContext);

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

  function handleDateChange(selectedDate) {
    setDate(selectedDate);
  }

  function handleClose(state) {
    setShowDatePicker(state);
  }

  function handleCountChange(e, recyclableName) {
    pickUpList.map((pickUpItem) => {
      if (pickUpList.length > 0) {
        if (pickUpItem.RecyclableName === recyclableName) {
          const newCount = { ...pickUpCounts };
          +e.target.value > 0
            ? (newCount[recyclableName] = +e.target.value)
            : (newCount[recyclableName] = 1);
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

    // Initialize the count to be zero for the recyclable added to the pick-up list
    const newCount = { ...pickUpCounts };
    newCount[recyclableToAdd.RecyclableName] = 1;
    setPickUpCounts(newCount);
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

    // Remove the count for the recyclable removed from the pick-up list
    const newCount = {
      ...pickUpCounts,
    };
    delete newCount[recyclableToRemove.RecyclableName];
    setPickUpCounts(newCount);
  }

  async function handlePickUpSubmit(e) {
    e.preventDefault();
    setFieldError(false);
    setShowSuccessRequest(false);

    if (!date || time === "") {
      setFieldError(true);
      setFieldErrorMessage("Please select a date and time");
      return;
    }

    const formattedDate = `${date.getUTCFullYear()}-${
      date.getUTCMonth() + 1
    }-${date.getUTCDate()} ${time}`;

    console.log(formattedDate);

    // Loop through all the recyclables in the pick-up list
    // make post request for each recyclable

    try {
      const responses = [];

      for (let i = 0; i < pickUpList.length; i++) {
        const pickUpSubmitObject = {
          username: currentUser,
          branchName: selected_depot,
          recyclableName: pickUpList[i].RecyclableName,
          amountOfMaterialsGiven: pickUpCounts[pickUpList[i].RecyclableName],
          dateTime: formattedDate,
        };

        console.log(pickUpSubmitObject);

        responses.push(
          await axios.post(
            "http://localhost:5000/api/pickup",
            pickUpSubmitObject
          )
        );
      }

      for (let i = 0; i < responses.length; i++) {
        if (responses[i].status === 500) {
          setResponseMessage("Request failed");
        }
      }
    } catch (error) {
      setResponseMessage("Request failed");
    }

    if (responseMessage !== "Request failed") {
      setShowSuccessRequest(true);
      setResponseMessage("Pick Up Request Sent");
    }
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


      <div className="content flex flex-col gap-8 lg:ml-64 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-50 via-indigo-100 to-emerald-50 p-8 min-h-[140vh]">
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
          {/* https://github.com/OMikkel/tailwind-datepicker-react */}
        </div>
        <div className="w-full bg-white rounded-2xl px-8 py-6 flex items-center flex-col gap-6">
          <h2 className="font-medium text-2xl border-b-2 pb-2 px-4">
            Select Date & Time
          </h2>
          <Datepicker
            options={datePickerOptions}
            onChange={handleDateChange}
            show={showDatePicker}
            setShow={handleClose}
          ></Datepicker>
          <select
            className="w-full border-2 border-gray-400 rounded p-2 max-h-40"
            onChange={(e) => {
              setTime(e.target.value);
            }}
          >
            <option value={""}>Select Time</option>
            <option value="10:00:00">10:00</option>
            <option value="11:00:00">11:00</option>
            <option value="12:00:00">12:00</option>
            <option value="13:00:00">13:00</option>
            <option value="14:00:00">14:00</option>
            <option value="15:00:00">15:00</option>
            <option value="16:00:00">16:00</option>
            <option value="17:00:00">17:00</option>
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
                            className="p-2 font-medium hover:bg-white hover:cursor-pointer"
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
          <form
            className="w-full bg-white rounded-2xl px-8 py-6 flex items-center flex-col gap-6"
            onSubmit={(e) => {
              handlePickUpSubmit(e);
            }}
          >
            <h2 className="font-medium text-2xl border-b-2 pb-4">
              Pick Up List
            </h2>
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
                      className="hover:cursor-pointer"
                    >
                      {minusCircle}
                    </div>
                    <span className="">{recyclable.RecyclableName}</span>
                  </div>
                  <input
                    className="w-16 border-2 rounded text-center border-gray-400"
                    placeholder="Count"
                    type="number"
                    value={
                      pickUpCounts[recyclable.RecyclableName]
                        ? pickUpCounts[recyclable.RecyclableName]
                        : 1
                    }
                    onClick={(e) => e.target.select()}
                    onChange={(e) => {
                      handleCountChange(e, recyclable.RecyclableName);
                    }}
                  />
                </div>
              );
            })}
            {fieldError && (
              <div className="bg-red-500 px-3 py-3 rounded text-gray-100 mb-5">
                <p>{fieldErrorMessage}</p>
              </div>
            )}
            {showSuccessRequest && (
              <div className="bg-green-400 px-3 py-3 rounded text-gray-100 mb-5">
                <p>{responseMessage}</p>
              </div>
            )}
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
