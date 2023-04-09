import React from 'react'

function ErrorMessage({ message, hasbackground = true }) {
    return (
        <div className="text-red-500 ">
            <p className={`${hasbackground ? 'p-4 rounded-md border border-red-400 text-white' : ''} `} text-sm>{message}</p>
        </div>
    )
}

export default ErrorMessage;