import React ,{useEffect} from 'react'
import Messages from '../../components/messages/Messages';
import apiService from '../../services/ApiService';
import "./Messanger.css";

const Messanger = () => {

const [messages, setMessages] = React.useState([]);
const [conversation,setConversation]= React.useState([]);
const [chat,setChat] = React.useState('');
const [own,setOwn] = React.useState(false);
const [newMessage,setNewMessage] = React.useState('');
const[user,setUser] = React.useState('');
//console.log(conversation)
console.log(chat)
console.log(user)





//Get Conversation
  useEffect(() => {
    const getChat = async () => {
      try {
        const res = await apiService.get("/api/chat/all").then((res) => {
          setConversation(res.data);

         // console.log(res.data[2].user);
        });
      } catch (err) {
        console.log(err);
      }
    };
    getChat();
  }, []);

//Get Messages
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await apiService.get("/api/chat/messages/user").then((res) => {
          console.log("messages");
          console.log(res.data);
          setMessages(res.data);
        });
      } catch (err) {
        console.log(err);
      }
    }
    getMessages();
  }, []);

//send message to user 
  // const sendMessage = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await apiService.post("/api/chat/send/user", {
  //       message: message,
  //       user: chat[0].user,
  //     });
  //     setMessage("");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
     apiService.post("/api/chat/send/user", {
        sender: user,
        chat: chat,
        content: newMessage,
  }).then((data) => {
    console.log(data);
    setNewMessage("");
  }).catch((error) => {
    console.log(error.message);
  }
  );
  }
















  return (
    
    <>
    
    <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <h2 className='list'>Chat Box</h2>
            <hr />
            <br />
            
            {conversation.map((c,index) => {
              return (
                <div className="chat" key={index} onClick={() => setChat(c._id)}>
                  <div className="chatTop"onClick={() => setUser(c.user)}>
                    <p className='sender'>{c.user}</p>
                    
                    {/* <p className="messageText">{chat.message}</p> */}
                  </div>
                  </div>
              );
            })} 

            

            

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
            <h2 className='msg-title'>Messages</h2>
          <hr />
         




                <div className="chatBoxTop">
                  {messages.map((m) => (
                    
                      <Messages message={m} own={m.sender === user} />
                    
                  ))} 
                 </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)} 
                     value={newMessage}
                  >  </textarea>
                  <button className="chatSubmitButton"onClick={handleSubmit} >
                    Send
                  </button>
                </div>                 
                 </div> 
              
   </div>  
   </div>
    </>
  )
}

export default Messanger