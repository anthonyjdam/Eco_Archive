import React from 'react'
import { useState, useEffect, useRef } from 'react'
import AdmineTableRow from './AdminTableRow'


/**
 * uses the filter() method to remove 
 * duplicates from the data prop before rendering the rows. 
*/
function AdminTable({ data }) {
    const [renderedData, setRenderedData] = useState([]);
    // console.log(renderedData);
    // renderedData.concat(data)
    // console.log(renderedData);


    //When the data changes, call handleRefresh
    useEffect(() => {
        const curData = data
        handleRefresh(curData);
    }, [data]);


    const handleRefresh = (curData) => {
        // setRenderedData([...renderedData, ...data])
        // setRenderedData(renderedData.concat(curData));
        // console.log("kasaas" + renderedData[0].Username);
        // console.log("fds" + curData[0]);
        // // setRenderedData([]);
        // console.log("SKDSDGHDS" + renderedData[0].Username);
        setRenderedData(renderedData.concat(curData));
        console.log("BUTT " + renderedData[0]);
    };


    const uniqueData = renderedData.filter((item, index) => {
        const currentIndex = renderedData.findIndex((i) => i.Username === item.Username)
        return currentIndex === index
    })


    const handleDelete = () => {
        setRenderedData([]);
        console.log("sdnfjfndskj " + renderedData.Username);
    }


    return (
        <div className="relative overflow-x-auto shadow-md opacity-[85%] sm:rounded-b-lg">
            <div className="flex justify-end p-4">
                <button
                    onClick={handleDelete}
                    className="px-4 py-2 font-medium text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    Clear All
                </button>
            </div>
            <div className="flex justify-end p-4">
                <button
                    onClick={handleRefresh}
                    className="px-4 py-2 font-medium text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    Refresh All
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
                    <AdmineTableRow uniqueData={uniqueData} />
                </tbody>
            </table>
        </div>
    )
}

export default AdminTable;
// export default React.memo(AdminTable);
