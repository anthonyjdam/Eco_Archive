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
          <div className="bg-white w-[32rem] px-12 pt-12 pb-4 rounded-xl shadow-md">
            <div className="flex items-center justify-center mb-4">
              <img
                src={logo}
                className="h-20"
              ></img>
            </div>
            <CredFieldSignUpCustomer />
          </div>
        </main>
      </div>
    </>
  );
}

export default SignUpCustomer;
