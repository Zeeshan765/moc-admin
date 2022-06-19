import React from 'react'
import "./Messages.css"

const Messages = ({own}) => {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <p className='sender'>zeeshan</p>
        
        <p className="messageText">heninnnn ijjjjjjjjjjjjjjjjjjjjjjjjjjjjj</p>
      </div>
      
    </div>
  )
}

export default Messages;