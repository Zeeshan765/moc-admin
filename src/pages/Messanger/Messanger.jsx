import React from 'react'
import Messages from '../../components/messages/Messages';
import "./Messanger.css";

const Messanger = () => {
  return (
    
    <>
    
    <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <h1>list</h1>
            <hr />
            <br />
            <br />
            <h3 className='names'>zeeshan</h3>
            <h3 className='names'>Ali</h3>

            {/* <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))} */}
           </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <h2>messages</h2>
          
            <Messages/>
            <Messages own={true} />

            {/* <Messages/>  */}
            {/* {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === user._id} />
                    </div>
                  ))} */}
                 </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                   // onChange={(e) => setNewMessage(e.target.value)} */}
                     //value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" >
                    Send
                  </button>
                </div>                 
                 </div> 
              
   </div>  
    
    </>
  )
}

export default Messanger