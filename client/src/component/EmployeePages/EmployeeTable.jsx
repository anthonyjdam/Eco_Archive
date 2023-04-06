import React from 'react'
import { Link } from "react-router-dom";


const dummyData =  [
    {
        customer_id: '123',
        customer_name: 'Ahmed',
        service_date: '2022-05-17T03:24:00',
        service_time: '3:00pm',
        current_service_status: 'Pick-up'
    },
    {
        customer_id: '956',
        customer_name: 'Bindi',
        service_date: '2022-05-14T05:24:00',
        service_time: '4:00pm',
        current_service_status: 'Drop-off'
    },
    {
        customer_id: '789',
        customer_name: 'Momo',
        service_date: '2022-05-17T07:24:00',
        service_time: '2:00pm',
        current_service_status: 'Pick-up'
    },
    {
        customer_id: '109',
        customer_name: 'Timi',
        service_date: '2022-05-17T02:24:00',
        service_time: '8:00pm',
        current_service_status: 'Pick-up'
    },
    
]


export default function EmployeeTable() {
  return (
    <div className='bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-400 flex-1'>
        <strong className='text-gray-700 font-medium '>Transactions in Process</strong>
        <div className='border-x border-gray-200 rounded-sm mt-3'>
            <table className='w-full text-gray-700'>
                <thead class="bg-gray-50 border-b-2 border-gray-200">
                    <tr className='font-semibold'>
                        <td>Customer ID</td>
                        <td>Customer Name</td>
                        <td>Service Date</td>
                        <td>Service Time</td>
                        <td>Service Status</td>
                    </tr>
                </thead>
                <tbody>
                {dummyData.map((order)=> (
                    <tr key={order.customer_id} class="odd:bg-white even:bg-slate-50">
                        <td>#{order.customer_id}</td>
                        <td className='text-green-600'><Link to={`/customer/${order.customer_name}`} className='flex hover:underline'>{order.customer_name}</Link></td>
                        <td>{new Date(order.service_date).toLocaleDateString()}</td>
                        <td>{order.service_time}</td>
                        <td>{order.current_service_status}</td>

                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </div>
 )
}



    
 