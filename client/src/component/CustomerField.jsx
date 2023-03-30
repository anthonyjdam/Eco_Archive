import React, { useState } from "react";
import { Link } from "react-router-dom";
//Create function component inside of react; in our TodoList we render the text "#e7f4fd"
export default function CustomerField() {
  const [customerUsername, setCustomerUsername] = useState("");

  function handleUsernameChange(e) {
    setCustomerUsername(e.target.value);
  }

  return (
    <div>
      <div className="flex items-center justify-center mb-4">
        <p className=" text-gray-400 text-lg tracking-wide font-bold mb-6">
          CUSTOMER LOGIN
        </p>
      </div>
      <form>
        {/*<div className="bg-red-500 px-3 py-3 rounded text-gray-100 mb-5">
                                <p>Wrong Credentials</p>
                            </div>*/}
        <label className="text-gray-700">Username</label>
        <input
          className="w-full py-2 bg-gray-100 text-gray-500 px-1 mb-4"
          type="text"
          value={customerUsername}
          onChange={(e) => {
            handleUsernameChange(e);
          }}
        ></input>
        <label className="text-gray-700">Password</label>
        <input
          className="w-full py-2 bg-gray-100 text-gray-500 px-1 mb-4"
          type="password"
        ></input>
        <div className="mb-4 flex justify-center gap-1">
          <span className="text-xs w-1/3 text-gray-400 flex-grow text-right">Don't have an account yet?</span>
          <Link to="/signup" className="text-xs hover:text-blue-400 transition-colors flex-grow">Sign up</Link>
        </div>
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
