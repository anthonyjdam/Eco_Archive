import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import userContext from "../userContext";

export default function EmployeeTable() {
  const [transactionData, setTransactionData] = useState([]);

  const { currentUser, setCurrentUser } = useContext(userContext);
  const [employeeBranch, setEmployeeBranch] = useState("");

  // const navigate = useNavigate();

  // function handleTransaction(pathway){
  //     navigate(pathway, {state: {transactionData : transactionData}})
  // }

  const submitLogin = {
    branchname: "",
    username: "",
  };

  // On page load get info about the employee
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/employee/${currentUser}`)
      .then((response) => {
        setEmployeeBranch(response.data[0].BranchName);

        submitLogin.branchname = response.data[0].BranchName;
        submitLogin.username = currentUser;
        console.log(submitLogin);

        axios.post(
          `http://localhost:5000/api/employee/${currentUser}`,
          submitLogin
        );
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/get_transaction/${currentUser}`)
      .then((response) => {
        setTransactionData(response.data);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 404) {
            setTransactionData([]);
          }
        }
      });
  }, []);

  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-lg border border-gray-400 flex-1">
      <strong className="text-gray-700 font-medium ">
        Transactions in Process
      </strong>
      <div className="border-x border-gray-200 rounded-sm mt-3">
        <table className="w-full text-gray-700">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr className="font-semibold">
              <th>Customer ID</th>
              <th>Branch Name</th>
              <th>Service Date</th>
              <th>Service Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {transactionData.map((item) => {
              const isType1 = item.ServiceType === "dropoff";
              const linkPathname = isType1
                ? "/dropOffService"
                : "/pickUpService";
              return (
                <tr
                  key={[
                    item.Username,
                    item.BranchName,
                    item.RecyclableName,
                    item.DateTime,
                  ]}
                  class="odd:bg-white even:bg-slate-50"
                >
                  <th
                    name="test"
                    className="font-mono font-normal text-align-center text-sky-700"
                    scope="row"
                  >
                    <Link
                      to={linkPathname}
                      state={{ customer: item }}
                      className="hover:underline"
                    >
                      {item.Username}
                    </Link>
                  </th>
                  <td className="text-align-center">{item.BranchName}</td>
                  <td className="text-align-center">
                    {new Date(item.DateTime).toDateString()}
                  </td>
                  <td className="text-align-center">{item.ServiceType}</td>
                  <td
                    className={`text-align-center font-bold text-sm ${
                      item.Status === "PENDING"
                        ? "text-red-700"
                        : "text-green-600"
                    }`}
                  >
                    {item.Status}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
