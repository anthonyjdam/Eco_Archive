import React from 'react'

function FeedbackMessage({ message, backgroundColor, textColor }) {
    return (
        <div className={`${textColor}`}>
            <p className={`p-4 rounded-md border border-red-400 text-white ${backgroundColor} text-sm`}>{message}</p>
        </div>
    )
}

export default FeedbackMessage;