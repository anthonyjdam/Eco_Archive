import React, { useState } from "react";
import CustomerSidebar from "./CustomerSidebar";
import logo from "../../newlogo.png";

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



function CustomerDashboard() {
  const [nav, setNav] = useState(false);

  return (
    <div>
      <CustomerSidebar nav={nav} setNav={setNav}/>

      {nav ? (
        <div
          className="bg-black/60 fixed w-full h-screen z-[5] top-0 left-0"
          onClick={() => setNav(false)}
        ></div>
      ) : (
        ""
      )}

      <div className="content flex flex-col gap-8 lg:ml-64 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-50 via-indigo-100 to-emerald-50 p-10 min-h-screen">
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
        <div className="transactions w-full h-96 bg-white rounded-2xl p-8">
          <div className="border-b-2 pb-4">
            <h3 className="text-lg font-bold">Transactions</h3>
          </div>
          <div className="columnHeaders pt-2 flex justify-between text-gray-400">
            <h4 className="w-1/2">Transaction Number</h4>
            <h4 className="w-1/4">Date</h4>
            <h4 className="w-1/4">Amount</h4>
          </div>
          {/* TODO: GET request to get the lets say 3-5 most recent transactions */}
          {/* TODO: Figure out how to use Usecontext to set the current user */}
        </div>
        <div className="contributions w-full bg-white rounded-2xl p-8">
          <div className="border-b-2 pb-4">
            <h3 className="text-lg font-bold">Overall Contributions</h3>
          </div>
          <div className="text-center py-8 font-bold text-3xl">${"1,234"}</div>
          <form className="flex flex-col lg:flex-row items-center gap-4 justify-center">
            <select className="w-48 border-2 border-gray-400 rounded p-2">
              <option className="text-gray-400">Select NGO</option>
              {/* TODO: GET request from the server to get the current NGO's */}
            </select>
            <div>
              <input
                className="w-48 border-2 border-gray-400 rounded p-2"
                placeholder="Enter amount"
              ></input>
            </div>
            <button
              type="submit"
              className="bg-blue-400 w-48 text-gray-100 py-2 rounded hover:bg-blue-500 transition-colors"
            >
              Donate
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;
