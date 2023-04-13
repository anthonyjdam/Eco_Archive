import React, { useState, useEffect } from 'react';
import AdminTableRow from './AdminTableRow';

function AdminTable({ data, deleteRow, onSelect }) {
  const [renderedData, setRenderedData] = useState([]);

  useEffect(() => {
    setRenderedData(data);
  }, [data]);

  const handleDelete = (index) => {
    // const newData = [...renderedData];
    // newData.splice(index, 1);
    // setRenderedData(newData);
    // deleteRow(newData);
  };

  return (
    <div className="relative overflow-x-auto shadow-md opacity-[85%] sm:rounded-b-lg">
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
          {renderedData.map((row) => (
            <AdminTableRow
              key={row.Username}
              row={row}
              onDelete={() => handleDelete(row.Username)}
              onSelect={onSelect}
            />
          ))}


        </tbody>
      </table>
    </div>
  );
}

export default AdminTable;
