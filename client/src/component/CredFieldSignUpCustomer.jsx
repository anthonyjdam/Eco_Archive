import React from "react";

function CredFieldSignUpCustomer() {
  return (
    <div>
      <form>
        <div className="bg-white w-96 p-6 rounded shadow-sm">
          <div className="flex items-center justify-center mb-4">
            <img
              src="https://www.recycling.com/wp-content/uploads/2016/06/recycling-symbol-icon-twotone-light-green.png"
              className="h-32"
            ></img>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-lg tracking-wide font-bold mb-6">SIGN UP</p>
          </div>
          {/* <div className="bg-red-500 px-3 py-3 rounded text-gray-100 mb-5">
                                <p>Please fill out all fields</p>
                            </div> */}
          <div className="flex gap-4">
            <div>
              <label className="text-gray-700">First Name</label>
              <input
                className="w-full py-2 bg-gray-100 text-gray-500 px-1 mb-4"
                type="text"
              ></input>
            </div>
            <div>
              <label className="text-gray-700">Last Name</label>
              <input
                className="w-full py-2 bg-gray-100 text-gray-500 px-1 mb-4"
                type="text"
              ></input>
            </div>
          </div>
          <label className="text-gray-700">Username</label>
          <input
            className="w-full py-2 bg-gray-100 text-gray-500 px-1 mb-4"
            type="text"
            onChange={(e) => {
              handleUsernameChange(e);
            }}
          ></input>
          <label className="text-gray-700">Password</label>
          <input
            className="w-full py-2 bg-gray-100 text-gray-500 px-1 mb-4"
            type="password"
          ></input>
          <label className="text-gray-700">Address line</label>
          <input
            className="w-full py-2 bg-gray-100 text-gray-500 px-1 mb-4"
            type="text"
          ></input>
          <div className="flex gap-4">
            <div>
              <label className="text-gray-700">City</label>
              <input
                className="w-full py-2 bg-gray-100 text-gray-500 px-1 mb-4"
                type="text"
              ></input>
            </div>
            <div>
              <label className="text-gray-700">Province</label>
              <select
                className="w-full py-2 bg-gray-100 text-gray-500 px-1 mb-4"
                type="text"
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
              ></input>
            </div>
          </div>
          <button
            className="bg-blue-400 w-full text-gray-100 py-2 rounded hover:bg-blue-500 transition-colors"
            type="submit"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}

export default CredFieldSignUpCustomer;
