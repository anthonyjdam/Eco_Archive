import React from "react";
import AdminField from "./AdminField";
import EmployeeField from "./EmployeeField";
import CustomerField from "./CustomerField";

//style={{ backgroundColor: "rgb(231, 244, 253, 0.60)" }}
//Create function component inside of react; in our TodoList we render the text "#e7f4fd"
export default function Login() {
    return (
        <>
            <div>
                <head>
                    <title>Login</title>
                </head>
                <body>
                    <main className="flex items-center justify-center h-screen bg-gradient-to-t from-indigo-50 to-sky-200">
                        <div className="bg-white w-96 p-12 rounded-lg shadow-md">
                            <div className="flex items-center justify-center mb-4">
                                <img src="https://i.postimg.cc/mD6BzYfd/logo-Copy.png" className="h-20"></img>
                            </div>
                            {/* <EmployeeField/> */}
                            {/* <AdminField/> */}
                            <CustomerField/>
                        </div>
                    </main>
                </body>
                <footer>
                    <button className="bg-indigo-50 w-1/3 text-gray-400 py-2  hover:text-blue-400 transition-colors" type="appInfo">App Info</button>
                    <button className="bg-indigo-50 w-1/3 text-gray-400 py-2  hover:text-blue-400 transition-colors" type="employeeLogi">Employee Login</button>
                    <button className="bg-indigo-50 w-1/3 text-gray-400 py-2  hover:text-blue-400 transition-colors" type="adminLogin">Admin Login</button>
                </footer>
            </div>

        </>

    )


}