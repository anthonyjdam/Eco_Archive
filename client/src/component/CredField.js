import React from "react";

//Create function component inside of react; in our TodoList we render the text "#e7f4fd"
export default function CredField() {
    return (
        <div>
            <form>
                <div className="bg-white w-96 p-6 rounded shadow-sm">
                    <div className="flex items-center justify-center mb-4">
                        <img src="https://www.recycling.com/wp-content/uploads/2016/06/recycling-symbol-icon-twotone-light-green.png" className="h-32"></img>
                    </div>
                    {/*<div className="bg-red-500 px-3 py-3 rounded text-gray-100 mb-5">
                                <p>Wrong Credentials</p>
                            </div>*/}
                    <label className="text-gray-700">Username</label>
                    <input className="w-full py-2 bg-gray-100 text-gray-500 px-1 mb-4" type="email"></input>
                    <label className="text-gray-700">Password</label>
                    <input className="w-full py-2 bg-gray-100 text-gray-500 px-1 mb-4" type="password"></input>
                    <button className="bg-blue-400 w-full text-gray-100 py-2 rounded hover:bg-blue-500 transition-colors" type="submit">Login</button>
                </div>
            </form>
        </div>
    )


}