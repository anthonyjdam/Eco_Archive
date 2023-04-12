import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import userContext from "../userContext";
//Create function component inside of react; in our TodoList we render the text "#e7f4fd"
export default function LoginField({ userType }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [fieldError, setFieldError] = useState(false); // State for showing the error message
  const [fieldErrorMessage, setFieldErrorMessage] = useState(""); // Error message

  const { currentUser, setCurrentUser } = useContext(userContext);
  const redirect = useNavigate();

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  useEffect(() => {
    setFieldError(false);
  }, [userType]);

  async function handleLoginSubmit(e) {
    e.preventDefault(); // Need this to prevent the default action that html form does
    // By default the page will reload on submit, we don't want this
    setFieldError(false); // Remove the error message if previous attempt was invalid

    let doNotSend = false; // Boolean flag to check if all the fields are filled

    if (username === "" || password === "") {
      doNotSend = true;
      setFieldErrorMessage("Please fill out all fields");
      setFieldError(true);
    }

    if (!doNotSend) {
      const submitObject = {
        userType: userType.isCustomer
          ? "customer"
          : userType.isEmployee
          ? "employee"
          : "administrator", // This property would be set to customer/employee/admin so server knows whos logging in
        username: username,
        password: password,
      };

      axios
        .post("http://localhost:5000/api/processLogin", submitObject)
        .then((response) => {
          setCurrentUser(username);

          if (userType.isCustomer) {
            redirect("/customerDashboard");
          } else if (userType.isEmployee) {
            redirect("/employeeDashboard");
          } else if (userType.isAdmin) {
            redirect("/admin");
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 401) {
              setFieldErrorMessage("Invalid Credentials");
              setFieldError(true);
            }
          }
        });
    }
  }

  return (
    <div>
      <div className="flex items-center justify-center mb-4">
        <p className=" text-gray-400 text-lg tracking-wide font-bold mb-6">
          {userType.isCustomer
            ? "CUSTOMER"
            : userType.isEmployee
            ? "EMPLOYEE"
            : "ADMIN"}{" "}
          LOGIN
        </p>
      </div>
      <form
        onSubmit={(e) => {
          handleLoginSubmit(e);
        }}
      >
        {fieldError && (
          <div className="bg-red-500 px-3 py-3 rounded text-gray-100 mb-5">
            <p>{fieldErrorMessage}</p>
          </div>
        )}
        <label className="text-gray-700">Username</label>
        <input
          className="w-full py-2 bg-gray-100 text-gray-500 px-1 mb-4"
          type="text"
          value={username}
          onChange={(e) => {
            handleUsernameChange(e);
          }}
        ></input>
        <label className="text-gray-700">Password</label>
        <input
          className="w-full py-2 bg-gray-100 text-gray-500 px-1 mb-4"
          type="password"
          value={password}
          onChange={(e) => {
            handlePasswordChange(e);
          }}
        ></input>
        {userType.isCustomer === true && (
          <div className="mb-4 flex justify-center gap-1">
            <span className="text-xs w-1/3 text-gray-400 flex-grow text-right">
              Don't have an account yet?
            </span>
            <Link
              to="/signup"
              className="text-xs hover:text-blue-400 transition-colors flex-grow"
            >
              Sign up
            </Link>
          </div>
        )}
        <button
          className="bg-blue-400 w-full text-gray-100 py-2 rounded hover:bg-blue-500 transition-colors"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}
