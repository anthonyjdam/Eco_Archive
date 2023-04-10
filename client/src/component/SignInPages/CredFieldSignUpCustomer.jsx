import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import userContext from "../userContext";

function CredFieldSignUpCustomer() {
  const [customerFirstName, setCustomerFirstName] = useState("");
  const [customerLastName, setCustomerLastName] = useState("");
  const [customerUsername, setCustomerUsername] = useState("");
  const [customerPassword, setCustomerPassword] = useState("");
  const [customerAddressline, setCustomerAddressline] = useState("");
  const [customerCity, setCustomerCity] = useState("");
  const [customerProvince, setCustomerProvince] = useState("");
  const [customerPostalCode, setCustomerPostalCode] = useState("");

  const [fieldError, setFieldError] = useState(false); // State for showing the error message
  const [fieldErrorMessage, setFieldErrorMessage] = useState(""); // Error message

  const { setCurrentUser } = useContext(userContext);
  const redirect = useNavigate();

  async function handleSignupSubmit(e) {
    e.preventDefault();
    setFieldError(false);

    const submitObject = {
      firstName: customerFirstName,
      lastName: customerLastName,
      username: customerUsername,
      password: customerPassword,
      addressLine: customerAddressline,
      city: customerCity,
      province: customerProvince,
      postalCode: customerPostalCode,
    };

    let doNotSend = false; // Boolean flag to check if all the fields are filled

    for (const field in submitObject) {
      if (submitObject[field] === "") {
        // Check for any empty fields
        setFieldErrorMessage("Please fill out all fields");
        setFieldError(true);
        doNotSend = true;
        break;
      }
    }

    if (!doNotSend) {
      // If all fields are filled then you can proceed to send the POST req
      const response = await axios.post(
        "http://localhost:5000/api/processSignup",
        submitObject
      );
      if (response.data === "Sign up successful") {
        setCurrentUser(customerUsername);
        redirect("/customerDashboard");
      } else if (response.data === "ER_DUP_ENTRY") {
        setFieldErrorMessage("Username already exists. Please try again.")
        setFieldError(true);
      }
    }
  }

  return (
    <div>
      <form onSubmit={(e) => handleSignupSubmit(e)}>
        <div className="flex items-center justify-center mb-4">
          <p className=" text-gray-400 text-lg tracking-wide font-bold mb-6">
            SIGN UP
          </p>
        </div>
        {fieldError && (
          <div className="bg-red-500 px-3 py-3 rounded text-gray-100 mb-5">
            <p>{fieldErrorMessage}</p>
          </div>
        )}
        <div className="flex gap-4">
          <div>
            <label className="text-gray-700">First Name</label>
            <input
              className="w-full py-2 bg-gray-100 text-gray-500 px-1 mb-4"
              type="text"
              value={customerFirstName}
              onChange={(e) => {
                setCustomerFirstName(e.target.value);
              }}
            ></input>
          </div>
          <div>
            <label className="text-gray-700">Last Name</label>
            <input
              className="w-full py-2 bg-gray-100 text-gray-500 px-1 mb-4"
              type="text"
              value={customerLastName}
              onChange={(e) => {
                setCustomerLastName(e.target.value);
              }}
            ></input>
          </div>
        </div>
        <label className="text-gray-700">Username</label>
        <input
          className="w-full py-2 bg-gray-100 text-gray-500 px-1 mb-4"
          type="text"
          value={customerUsername}
          onChange={(e) => {
            setCustomerUsername(e.target.value);
          }}
        ></input>
        <label className="text-gray-700">Password</label>
        <input
          className="w-full py-2 bg-gray-100 text-gray-500 px-1 mb-4"
          type="password"
          value={customerPassword}
          onChange={(e) => {
            setCustomerPassword(e.target.value);
          }}
        ></input>
        <label className="text-gray-700">Address line</label>
        <input
          className="w-full py-2 bg-gray-100 text-gray-500 px-1 mb-4"
          type="text"
          value={customerAddressline}
          onChange={(e) => {
            setCustomerAddressline(e.target.value);
          }}
        ></input>
        <div className="flex gap-4">
          <div>
            <label className="text-gray-700">City</label>
            <input
              className="w-full py-2 bg-gray-100 text-gray-500 px-1 mb-4"
              type="text"
              value={customerCity}
              onChange={(e) => {
                setCustomerCity(e.target.value);
              }}
            ></input>
          </div>
          <div>
            <label className="text-gray-700">Province</label>
            <select
              className="w-full py-2 bg-gray-100 text-gray-500 px-1 mb-4 max-h-80 overflow-y-auto"
              type="text"
              value={customerProvince}
              onChange={(e) => {
                setCustomerProvince(e.target.value);
              }}
            >
              <option></option>
              <option>AB</option>
              <option>BC</option>
              <option>MB</option>
              <option>NB</option>
              <option>NL</option>
              <option>NT</option>
              <option>NS</option>
              <option>NU</option>
              <option>ON</option>
              <option>PE</option>
              <option>QC</option>
              <option>SK</option>
              <option>YT</option>
            </select>
          </div>
          <div>
            <label className="text-gray-700">Postal code</label>
            <input
              className="w-full py-2 bg-gray-100 text-gray-500 px-1 mb-4"
              type="text"
              value={customerPostalCode}
              onChange={(e) => {
                setCustomerPostalCode(e.target.value);
              }}
            ></input>
          </div>
        </div>
        <button
          className="bg-blue-400 w-full text-gray-100 py-2 rounded hover:bg-blue-500 transition-colors"
          type="submit"
        >
          Sign up
        </button>
        <div className="my-4 flex justify-center gap-1">
          <span className="text-xs w-1/3 text-gray-400">
            Already have an account?
          </span>
          <Link
            to="/"
            className="text-xs hover:text-blue-400 transition-colors"
          >
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
}

export default CredFieldSignUpCustomer;
