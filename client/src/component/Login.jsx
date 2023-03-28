import React from "react";
import CredField from "./CredField";
import Username from "./CredField"

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
                        <CredField />
                    </main>
                </body>
                <footer>
                    <button className="bg-indigo-50 w-1/3 text-gray-400 py-2 hover:bg-blue-400 hover:text-white transition-colors" type="appInfo">App Info</button>
                    <button className="bg-indigo-50 w-1/3 text-gray-400 py-2 hover:bg-blue-400 hover:text-white transition-colors" type="employeeLogi">Employee Login</button>
                    <button className="bg-indigo-50 w-1/3 text-gray-400 py-2 hover:bg-blue-400 hover:text-white transition-colors" type="adminLogin">Admin Login</button>
                </footer>
            </div>

        </>

    )


}