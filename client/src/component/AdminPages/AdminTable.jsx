import React, { useState, useEffect } from 'react';
import AdminTableRow from './AdminTableRow';

function AdminTable({ data }) {
  const [renderedData, setRenderedData] = useState([]);
  const [usernames, setUsernames] = useState(new Set());

  useEffect(() => {
    const arr = [...data];
    setRenderedData(arr.filter(row => !usernames.has(row.username)));
  }, [data, usernames]);

  const handleDelete = (index) => {
    const newData = [...renderedData];
    const username = newData[index].username;
    newData.splice(index, 1);
    setRenderedData(newData);
    setUsernames(prev => new Set([...prev].filter(name => name !== username)));
  };

  const handleClear = () => {
    setRenderedData([]);
    setUsernames(new Set());
  }

  const handleAddRow = (row) => {
    setRenderedData(prev => [...prev, row]);
    setUsernames(prev => new Set([...prev, row.username]));
  }

  return (
    <div className="relative overflow-x-auto shadow-md opacity-[85%] sm:rounded-b-lg">
      <div className="flex justify-end p-4">
        <button
          onClick={handleClear}
          className="px-4 py-2 font-medium text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Clear All
        </button>
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center"></div>
            </th>
            <th scope="col" className="px-6 py-3">
              Last Name
            </th>
            <th scope="col" className="px-6 py-3">
              First Name
            </th>
            <th scope="col" className="px-6 py-3">
              Username
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {renderedData.map((row, index) => (
            <AdminTableRow
              key={index}
              row={row}
              data={data}
              onDelete={() => handleDelete(index)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminTable;
