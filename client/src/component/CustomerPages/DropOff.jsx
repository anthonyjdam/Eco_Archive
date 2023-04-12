import React, { useState, useEffect, useContext } from "react";
import CustomerSidebar from "./CustomerSidebar";
import logo from "../../newlogo.png";
import Datepicker from "tailwind-datepicker-react";
import userContext from "../userContext";
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

function DropOff() {
  const [nav, setNav] = useState(false);
  const [recycling_depots, setRecycling_depots] = useState([]);
  const [selected_depot, setSelected_depot] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false); // State for showing the date picker
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");

  const [fieldError, setFieldError] = useState(false); // State for showing the error message
  const [fieldErrorMessage, setFieldErrorMessage] = useState(""); // Error message

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

  function handleDateChange(selectedDate) {
    setDate(selectedDate);
  }

  function handleClose(state) {
    setShowDatePicker(state);
  }

  function handleAppointmentSubmit(e) {
    e.preventDefault();
    setFieldError(false);
    setFieldErrorMessage("");
    setShowSuccessRequest(false);

    if (!date || time === "") {
      setFieldError(true);
      setFieldErrorMessage("Please select a date and time");
      return;
    }

    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    console.log(yesterday);

    if (date <= yesterday) {
      setFieldError(true);
      setFieldErrorMessage("Pick up date cannot be in the past");
      return;
    }

    const formattedDate = `${date.getUTCFullYear()}-${
      date.getUTCMonth() + 1
    }-${date.getUTCDate()} ${time}`;

    console.log(currentUser);

    const dropOffSubmitObject = {
      username: currentUser,
      branchName: selected_depot,
      recyclableName: "PLACEHOLDER",
      dateTime: formattedDate,
    };

    axios
      .post("http://localhost:5000/api/dropoff", dropOffSubmitObject)
      .then((response) => {
        setShowSuccessRequest(true);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 500) {

            setFieldErrorMessage("Appointment could not be submitted");
            setFieldError(true);
          }
        }
      });
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
            Make Drop Off Appointment
          </h2>
          <select
            className="w-full md:w-1/3 border-2 border-gray-400 rounded p-2"
            onChange={(e) => {
              setSelected_depot(e.target.value);
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
          <form
            className="w-full bg-white rounded-2xl px-8 py-6 flex items-center flex-col gap-6"
            onSubmit={(e) => {
              handleAppointmentSubmit(e);
            }}
          >
            <h2 className="font-medium text-2xl border-b-2 pb-2 px-4">
              Select Date & Time
            </h2>
            <div className="w-full sm:w-1/3">
              <Datepicker
                options={datePickerOptions}
                onChange={handleDateChange}
                show={showDatePicker}
                setShow={handleClose}
              ></Datepicker>
            </div>
            <select
              className="w-full sm:w-1/3 border-2 border-gray-400 rounded p-2 max-h-40"
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
            {fieldError && (
              <div className="bg-red-500 px-3 py-3 rounded text-gray-100 mb-5">
                <p>{fieldErrorMessage}</p>
              </div>
            )}
            {showSuccessRequest && (
              <div className="bg-green-400 px-3 py-3 rounded text-gray-100 mb-5 w-full sm:w-1/3">
                <p className="text-center">
                  Your appointment has been set for{" "}
                  {date.toISOString().slice(0, 10)} @ {time.slice(0, 5)}{" "}
                </p>
              </div>
            )}
            <button
              className="bg-blue-400 w-full sm:w-1/3 text-gray-100 py-2 rounded hover:bg-blue-500 transition-colors"
              type="submit"
            >
              Set Drop Off Appointment
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default DropOff;
