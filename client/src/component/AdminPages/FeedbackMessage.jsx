import React from 'react'

function FeedbackMessage({ message, backgroundColor, textColor, fontStyle }) {
    return (
        <div className={`${textColor}`}>
            <p className={`p-0.5 opacity-70 ${fontStyle} rounded border border-red-200 ${backgroundColor} text-sm`}>{message}</p>
        </div>
    )
}

export default FeedbackMessage;