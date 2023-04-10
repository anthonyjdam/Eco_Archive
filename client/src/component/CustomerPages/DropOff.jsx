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

function DropOff() {

  const [nav, setNav] = useState(false);

  
  
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
        DropOff
      </div>
    </div>
  );
}

export default DropOff;
