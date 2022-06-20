import React from 'react'
import "./Messages.css"

const Messages = ({ message, own }) => {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        {/* <p className='sender'>zeeshan</p> */}
        
        <p className="messageText">{message.content}</p>
      </div>
      
    </div>
  )
}

export default Messages;