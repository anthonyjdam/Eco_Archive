import React from "react";
import CustomerSidebar from "./CustomerSidebar";

function CustomerDashboard() {
  return (
    <div>
      <CustomerSidebar />
      <div className="content md:ml-48 lg:ml-64 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-50 via-indigo-100 to-emerald-50 p-10">
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
        <div className="contributions w-full h-64 bg-white rounded-2xl p-8 mt-8">
          <div className="border-b-2 pb-4">
            <h3 className="text-lg font-bold">Overall Contributions</h3>
          </div>
          <div className="text-center py-8 font-bold text-3xl">${"1,234"}</div>
          <form className="flex items-center justify-evenly">
            <select className="w-48 border-2 border-gray-400 rounded">
              <option className="text-gray-400">Select NGO</option>
              {/* TODO: GET request from the server to get the current NGO's */}
            </select>
            <div>
              <input className="w-48 ml-2 border-2 border-gray-400 rounded" placeholder="Enter amount"></input>
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
