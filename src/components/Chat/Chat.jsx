import React from "react";
// import ChatFeed from "react-chat-ui";/
import { ChatFeed, ChatBubble, BubbleGroup, Message } from "react-chat-ui";
import apiService from "../../services/ApiService";

const styles = {
  button: {
    backgroundColor: "#fff",
    borderColor: "#1D2129",
    borderStyle: "solid",
    borderRadius: 20,
    borderWidth: 2,
    color: "#1D2129",
    fontSize: 18,
    fontWeight: "300",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    outline: "none"
  },
  selected: {
    color: "#fff",
    backgroundColor: "#0084FF",
    borderColor: "#0084FF"
  }
};

const users = {
  0: "You",
  Mark: "Mark",
  2: "Evan"
};

const customBubble = props => (
  <div>
    <p>{`${props.message.senderName} ${props.message.id ? "says" : "said"}: ${
      props.message.message
    }`}</p>
  </div>
);

class Chat extends React.Component {
  constructor() {
    
    super();
    this.state = {
      messages: [
    
        new Message({
          id: 2,
          message: (
            <p>
              <span>"Weclome to Multiverse of Computers" </span>
              <span>"How may i help you?" </span>
            </p>
          ),
          senderName: "Admin"
        })
      ],
      content : "",
      useCustomBubble: false,
      curr_user: 0
    };
  }

  onPress(user) {
    this.setState({ curr_user: user });
  }

  onMessageSubmit(e) {
    const input = this.message;
    e.preventDefault();
    if (!input.value) {
      return false;
    }
    this.pushMessage(this.state.curr_user, input.value);
    apiService.post("/api/chat/send", {
      content: input.value,
    }).then((res) => {
      console.log(res);
      return true;
    }
      
     
  
    ).catch((err) => {
      console.log(err)
      return false;
    }
    )
    input.value = "";
  
  }


  pushMessage(recipient, message) {
    const prevState = this.state;
    const newMessage = new Message({
      id: recipient,
      message,
      senderName: users[recipient]
    });
    prevState.messages.push(newMessage);
    this.setState(this.state);
  }


  render() {
    return (
      <div className="container">
        <div className="chatfeed-wrapper">
          <ChatFeed
            chatBubble={this.state.useCustomBubble && customBubble}
            maxHeight={250}
            messages={this.state.messages} // Boolean: list of message objects
            showSenderName
          />

          <form onSubmit={e => this.onMessageSubmit(e)}>
            <input
            style={{height: "50px", width: "100%", border: "none", borderRadius: "20px", padding: "10px"}}
              ref={m => {
                this.message = m;
              }}
              placeholder="Type a message..."
              className="message-input"
            />
          </form>

    
        
        </div>
      </div>
    );
  }
}

export default Chat;
