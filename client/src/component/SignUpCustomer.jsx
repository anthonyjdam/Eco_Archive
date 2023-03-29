import React from "react";
import CredFieldSignUpCustomer from "./CredFieldSignUpCustomer";
import logo from "../logo-Copy.png";

function SignUpCustomer() {
  return (
    <>
      <div>
        {/* <main className="flex items-center justify-center h-screen bg-gradient-to-t from-indigo-50 to-sky-200">
          
        </main> */}
        <main className="flex items-center justify-center h-screen bg-gradient-to-t from-indigo-50 to-sky-200">
          <div className="bg-white w-96 p-12 rounded-lg shadow-md">
            <div className="flex items-center justify-center mb-4">
              <img
                src={logo}
                className="h-20"
              ></img>
            </div>
            <CredFieldSignUpCustomer />
          </div>
        </main>
        <footer>
          <button
            className="bg-indigo-50 w-1/3 text-gray-400 py-2 hover:bg-blue-400 hover:text-white transition-colors"
            type="appInfo"
          >
            App Info
          </button>
          <button
            className="bg-indigo-50 w-1/3 text-gray-400 py-2 hover:bg-blue-400 hover:text-white transition-colors"
            type="employeeLogi"
          >
            Employee Login
          </button>
          <button
            className="bg-indigo-50 w-1/3 text-gray-400 py-2 hover:bg-blue-400 hover:text-white transition-colors"
            type="adminLogin"
          >
            Admin Login
          </button>
        </footer>
      </div>
    </>
  );
}

export default SignUpCustomer;
