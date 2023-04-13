import React, { useState, useEffect } from 'react'

function AdminTableRow({ row, onDelete, onSelect }) {

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    // console.log('Row changed:', row);
  }, [row]);

  const handleCheckboxChange = (event) => {
    const { checked } = event.target;
    setIsChecked(checked);
    
    if (checked) {
      onSelect(row.Username);
      console.log("Selected: " + row.Username);
    }
    else {
      onSelect("");
      console.log("Deselected: " + row.Username);
    }
  };



  useEffect(() => {
    // console.log('Row changed:', row);
  }, [row]);


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
            />
          </td>
          <td className="px-6 py-4">
            <input
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-transparent hover:border-b-2 focus:border-b-2 focus:border-blue-300 focus:outline-none"
              placeholder={row.FName}
            />
          </td>
          <td className="px-6 py-4">
            <input
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-transparent hover:border-b-2 focus:border-b-2 focus:border-blue-300 focus:outline-none"
              placeholder={row.Username}
            />
          </td>
          <td className="px-6 py-4">
            <button
              onClick={onDelete}
              className="font-medium text-blue-400 hover:underline bg-transparent">
              Edit
            </button>
          </td>
        </tr>
      )}

    </>
  );
}

export default AdminTableRow;
