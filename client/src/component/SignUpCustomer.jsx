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
          <div className="bg-white w-[32rem] px-12 pt-12 pb-4 rounded-lg shadow-md">
            <div className="flex items-center justify-center mb-4">
              <img
                src={logo}
                className="h-20"
              ></img>
            </div>
            <CredFieldSignUpCustomer />
            <div className="flex items-center justify-center mt-10">
              <button className="text-xs w-1/3 text-gray-400 py-2  hover:text-blue-400 transition-colors" type="appInfo">App Info</button>
              <button className="text-xs w-1/3 text-gray-400 py-2  hover:text-blue-400 transition-colors" type="employeeLogi">Employee Login</button>
              <button className="text-xs w-1/3 text-gray-400 py-2  hover:text-blue-400 transition-colors" type="adminLogin">Admin Login</button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default SignUpCustomer;
