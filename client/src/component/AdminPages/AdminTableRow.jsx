import React, { useState, useEffect } from 'react'

function AdminTableRow({ row, onDelete, onSelect, onUpdate }) {
  const [isChecked, setIsChecked] = useState(false);

  const [empFirst, setEmpFirst] = useState("");
  const [empLast, setEmpLast] = useState("");
  const [empUsername, setEmpUsername] = useState("");
  const [empCred, setEmpCred] = useState([]);

  // useEffect(() => {
  //   if (isChecked) {
  //     onSelect(row, "revert")
  //   }
  //   else {
  //     onSelect(row, "");
  //   }
  //   // console.log('Row changed:', row);
  // }, [isChecked]);

  const handleCheckboxChange = (event) => {
    const { checked } = event.target;
    setIsChecked(checked);

    if (checked) {
      console.log("Selected: " + row.Username);
      onSelect(row.Username);
    }
    else {
      onSelect("revert");
      console.log("Deselected: " + row.Username);
    }
  };


  function handleAddEmpInfo(e) {

    const emp = {
      firstname: empFirst,
      lastname: empLast,
      username: empUsername,
      original: row.Username
    };

    // setEmpCred(emp);
    console.log("Oreos");
    console.log(emp);
    console.log("Oreos");

    onUpdate(emp);

  }



  // useEffect(() => {
  //   // console.log('Row changed:', row);
  // }, [row]);


  return (
    <>

      {row && (
        <tr
          key={row.Username}
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td className="w-4 p-4">
            <div className="flex items-center">
              <input
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                id={`checkbox-table-search-${row.Username}`}
                type="checkbox"
                onChange={handleCheckboxChange}
                checked={isChecked}
              />
              <label htmlFor="checkbox-table-search-1" className="sr-only">
                checkbox
              </label>
            </div>
          </td>
          <td>
            <input
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-transparent hover:border-b-2 focus:border-b-2 focus:border-blue-300 focus:outline-none"
              placeholder={row.LName}
              type="text"
              value={empLast}
              onChange={(e) => {
                setEmpLast(e.target.value);
              }}
            />
          </td>
          <td className="px-6 py-4">
            <input
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-transparent hover:border-b-2 focus:border-b-2 focus:border-blue-300 focus:outline-none"
              placeholder={row.FName}
              type="text"
              value={empFirst}
              onChange={(e) => {
                setEmpFirst(e.target.value);
              }}
            />
          </td>
          <td className="px-6 py-4">
            <input
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-transparent hover:border-b-2 focus:border-b-2 focus:border-blue-300 focus:outline-none"
              placeholder={row.Username}
              type="text"
              value={empUsername}
              onChange={(e) => {
                setEmpUsername(e.target.value);
              }}
            />
          </td>
          <td className="px-6 py-4">
            <button
              className="font-medium text-blue-400 hover:underline bg-transparent active:text-blue-700"
              onClick={(e) => {
                handleAddEmpInfo(e)
              }}
            >
              Edit
            </button>
          </td>

        </tr>
      )}

    </>
  );
}

export default AdminTableRow;
