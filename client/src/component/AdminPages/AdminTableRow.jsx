import React, { useEffect } from 'react';

function AdminTableRow({ row, onDelete }) {
  useEffect(() => {
    console.log('Row changed:', row);


  }, [row]);

  // const arr = [row]


  return (
    <>
    
      {row && (
        <tr
          key={row.Username}
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <td className="w-4 p-4">
            <div className="flex items-center">
              <input
                id="checkbox-table-search-1"
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor="checkbox-table-search-1" className="sr-only">
                checkbox
              </label>
            </div>
          </td>
          <td
            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {row.LName}
          </td>
          <td className="px-6 py-4">{row.FName}</td>
          <td className="px-6 py-4">{row.Username}</td>
          <td className="px-6 py-4">
            <button
              onClick={onDelete}
              className="font-medium text-red-600 dark:text-red-500 hover:underline"
            >
              Delete
            </button>
          </td>
        </tr>
      )}
    </>
  );
}

export default AdminTableRow;
