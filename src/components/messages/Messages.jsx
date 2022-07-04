import React from 'react'
import "./Messages.css"
// import { format } from "timeago.js";

const Messages = ({ message, own,name }) => {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <p className='sender'>{name}</p>
        
        <p className="messageText">{message.content}</p>
      </div>
      {/* <div className="messageBottom">{format(message.createdAt)}</div> */}

    </div>
  )
}

export default Messages;