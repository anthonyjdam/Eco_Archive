import React from 'react'

function FeedbackMessage({ message, backgroundColor, textColor, borderStyle, fontStyle }) {
    return (
        <div className={`${textColor}`}>
            <p className={`p-0.5 opacity-70 ${fontStyle} rounded border ${borderStyle} ${backgroundColor} text-sm`}>{message}</p>
        </div>
    )
}

export default FeedbackMessage;