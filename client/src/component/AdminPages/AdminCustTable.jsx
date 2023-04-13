import React, { useState, useEffect } from 'react';
import AdminCustTableRow from './AdminCustTableRow';

function AdminCustTable({ data, deleteRow, onSelect, onUpdate }) {
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
              Province
            </th>
            <th scope="col" className="px-6 py-3">
              Province
            </th>
            <th scope="col" className="px-6 py-3">
              Donation Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {renderedData.map((row) => (
            <AdminCustTableRow
              key={row.Username}
              row={row}
              onDelete={() => handleDelete(row.Username)}
              onSelect={onSelect}
              onUpdate={onUpdate}
            />
          ))}


        </tbody>
      </table>
    </div>
  );
}

export default AdminCustTable;
