import React from 'react'
import { Link } from "react-router-dom";


export default function ServiceRequestTable() {
    return (


        <form class="w-full max-w-sm justify-items-start font-mono text-md">
            <div class="flex justify-items-start mb-1">
                <div class="w-2/4">
                    <label class="block text-gray-500 font-bold md:text-right md:mb-0 px-3" for="inline-transaction-id">
                        Transaction ID:
                    </label>
                </div>
                <div class="w-2/4">
                    <input class="bg-gray-100 bg-opacity-30 border-gray-300 w-full py-2 px-4 text-gray-700 leading-tight" id="inline-transaction-id" type="text" placeholder="####" disabled>
                    </input>
                </div>
            </div>

            <div class="flex justify-items-start mb-1">
                <div class="w-2/4">
                <label class="block text-gray-500 font-bold md:text-right md:mb-0 px-3" for="inline-Date">
                        Date:
                    </label>
                </div>
                <div class="w-2/4">
                    <input class="bg-gray-100 bg-opacity-30 border-gray-300 w-full py-2 px-4 text-gray-700 leading-tight" id="inline-Date" type="date" disabled>
                    </input>
                </div>
            </div>

            <div class="flex justify-items-start mb-1">
                <div class="w-2/4">
                <label class="block text-gray-500 font-bold md:text-right md:mb-0 px-3" for="inline-emp-id">
                        Employee ID:
                    </label>
                </div>
                <div class="w-2/4">
                    <input class="bg-gray-100 bg-opacity-30 border-gray-300 w-full py-2 px-4 text-gray-700 leading-tight" id="inline-emp-id" type="text" placeholder="####" disabled>
                    </input>
                </div>
            </div>

        </form>



    )
}
