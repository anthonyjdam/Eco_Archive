import React, { useContext, useEffect, useState } from "react";
import CustomerSidebar from "./CustomerSidebar";
import logo from "../../newlogo.png";
import userContext from "../userContext";
import axios from "axios";

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
  const { currentUser, setCurrentUser } = useContext(userContext);
  const [customerBalance, setCustomerBalance] = useState(0);
  const [customerContributions, setCustomerContributions] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [ngos, setNgos] = useState([]);
  const [donationAmt, setDonationAmt] = useState("");
  const [selectedNGO, setSelectedNGO] = useState("");
  const [showSuccessRequest, setShowSuccessRequest] = useState(false);
  const [fieldError, setFieldError] = useState(false); // State for showing the error message
  const [fieldErrorMessage, setFieldErrorMessage] = useState(""); // Error message

  // On page load get info about the customer
  useEffect(() => {
    console.log(currentUser);
    axios
      .get(`http://localhost:5000/api/customer/${currentUser}`)
      .then((response) => {
        setCustomerBalance(response.data[0].AccountBal);
        setCustomerContributions(response.data[0].DonationAmt);
      });

    // Get info about the recent transactions
    axios
      .get(`http://localhost:5000/api/transaction/${currentUser}`)
      .then((response) => {
        setRecentTransactions(response.data);
      });

    // Get all the NGOs
    axios.get(`http://localhost:5000/api/ngo`).then((response) => {
      setNgos(response.data);
    });
  }, []);

  function handleDonationSubmit(e) {
    e.preventDefault();
    setFieldError(false);
    setShowSuccessRequest(false);

    if (donationAmt === "" || selectedNGO === "") {
      setFieldError(true);
      setFieldErrorMessage("Please select an NGO and enter a donation amount");
    } else if (+donationAmt > customerBalance) {
      setFieldError(true);
      setFieldErrorMessage("Insufficient funds");
    } else {
      axios
        .post(`http://localhost:5000/api/donate`, {
          username: currentUser,
          selectedNGO: selectedNGO,
          donationAmt: +donationAmt,
        })
        .then((response) => {
          setCustomerContributions(customerContributions + +donationAmt);
          setCustomerBalance(customerBalance - +donationAmt);
          setDonationAmt("");
          setSelectedNGO("");
          setShowSuccessRequest(true);
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 500) {
              setFieldError(true);
              setFieldErrorMessage("Donation error");
            }
          }
        });
    }
  }

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

      <div className="content flex flex-col gap-8 lg:ml-64 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-50 via-indigo-100 to-emerald-50 p-8 min-h-screen">
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
        <div className="w-full bg-white rounded-2xl p-10 flex items-center md:justify-between flex-col md:flex-row">
          <h2 className="font-medium text-3xl">{`Welcome, ${currentUser}`}</h2>
          <span className="text-xl">
            {customerBalance % Math.floor(customerBalance) === 0
              ? `Balance: $${customerBalance}.00`
              : `Balance: $${customerBalance}`}
          </span>
        </div>
        <div className="transactions w-full h-96 bg-white rounded-2xl p-8">
          <div className="border-b-2 pb-4">
            <h3 className="text-lg font-bold"> Recent Transactions</h3>
          </div>
          <div className="columnHeaders pt-2 flex justify-between text-gray-400">
            <h4 className="w-1/3">Depot</h4>
            <h4 className="w-1/4">Date</h4>
            <h4 className="w-1/4">Amount</h4>
          </div>
          <div className="flex flex-col gap-4">
            {recentTransactions.length > 0 ? (
              recentTransactions.map((transaction, index) => {
                return (
                  <div
                    key={index}
                    className="transactionRow flex justify-between"
                  >
                    <span className="w-1/3">{transaction.BranchName}</span>
                    <span className="w-1/4">
                      {transaction.DateTime.slice(5, 10)}
                    </span>
                    <span className="w-1/4">
                      {transaction.AmountEarned %
                        Math.floor(transaction.AmountEarned) ===
                      0
                        ? `$${transaction.AmountEarned}.00`
                        : `$${transaction.AmountEarned}`}
                    </span>
                  </div>
                );
              })
            ) : (
              <div>No Transactions</div>
            )}
          </div>
          {/* TODO: GET request to get the lets say 3-5 most recent transactions */}
        </div>
        <div className="contributions w-full bg-white rounded-2xl p-8">
          <div className="border-b-2 pb-4">
            <h3 className="text-lg font-bold">Overall Contributions</h3>
          </div>
          <div className="text-center py-8 font-medium text-2xl">
            {customerContributions % Math.floor(customerContributions) === 0
              ? `Total contrabutions: $${customerContributions}.00`
              : `Total contrabutions: $${customerContributions}`}
          </div>
          {fieldError && (
            <div className="bg-red-500 px-3 py-3 rounded text-gray-100 mb-5">
              <p className="text-center">{fieldErrorMessage}</p>
            </div>
          )}
          {showSuccessRequest && (
            <div className="bg-green-400 px-3 py-3 rounded text-gray-100 mb-5">
              <p className="text-center">Thank you for donating!</p>
            </div>
          )}
          <form
            className="flex flex-col lg:flex-row items-center gap-4 justify-center"
            onSubmit={(e) => {
              handleDonationSubmit(e);
            }}
          >
            <select
              className="w-48 border-2 border-gray-400 rounded p-2"
              value={selectedNGO}
              onChange={(e) => {
                setSelectedNGO(e.target.value);
              }}
            >
              <option className="text-gray-400" value={""}>
                Select NGO
              </option>
              {ngos.map((ngo) => {
                return (
                  <option key={ngo.NGOName} value={ngo.NGOName}>
                    {ngo.NGOName}
                  </option>
                );
              })}
              {/* TODO: GET request from the server to get the current NGO's */}
            </select>
            <div>
              <input
                className="w-48 border-2 border-gray-400 rounded p-2"
                placeholder="Enter amount"
                value={donationAmt}
                type="number"
                onChange={(e) => {
                  setDonationAmt(e.target.value);
                }}
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
