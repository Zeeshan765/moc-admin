import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import Box from "@material-ui/core/Box";
import InputAdornment from "@material-ui/core/InputAdornment";
// import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import Typography from "@material-ui/core/Typography";
import Popup from "reactjs-popup";
import NavigationIcon from "@material-ui/icons/Navigation";
import { hover } from "@testing-library/user-event/dist/hover";
import { Send } from "@material-ui/icons";
import Chat from "./Chat";
import apiService from "../../services/ApiService";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    float: "right",
    marginBottom: "10px",
    top: "auto",
    right: "auto",
    position: "fixed",
    bottom: "15px",
    marginLeft: "1550px",
    backgroundColor: "#6d1ba8",
    "&:hover": {
      background: "#5f1694",
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
    float: "right",
    // position: "fixed",
  },
  chatInput: {
    width: "100%",
    marginTop: "",
    marginRight: "100px",
    border: "none",
    textAlign: "left",
  },
  sendIcon: {
    color: "#050505",
    float: "right",
    marginLeft: "80px",
    marginTop: "20px",
    fontSize: "30px",
    "&:hover": {
      color: "#5f1694",
      cursor: "pointer",
    },
  },
  button: {
    marginLeft: "40px",
  },
  leftCard: {
    marginTop: "170px",
    backgroundColor: "black",
    height: "30px",
    width: "30px",
    flexDirection: "flex-end",
  },
  upperBox: {
    position: "fixed",
    justifyContent: "center",
    width: "320px",
    height: "50px",
    flexDirection: "flex-start",
    marginBottom: "50px",
  },
  innerBox: {
    flexDirection: "column",
    width: "306",
    marginTop: "100px",
  },
  messageArea: {
    backgroundColor: "purple",
    height: "200px",
  },
}));

const ChatPop = (props) => {
  const classes = useStyles();
  const [chat, setChat] = React.useState();
  const [anchor, setAnchor] = React.useState();
  const admin = "628afd313fdfbb446dbf3bbd";

  const handleSend = (event) => {
    console.log(chat);
  };
  const handleConnection = (event) => {
    apiService.post("/api/chat/create",
      {
        admin: admin,
      }
    ).then((res) => {
      // console.log(res)
    }
    );

  }
  React.useEffect(() => {
    apiService.get("/api/chat/all").then((res) => {
      console.log(res)
  
    }
    );
  }
  , []);

  return (
    <div>
      <div>
        <PopupState variant="popover" popupId="demo-popup-popover">
          {(popupState) => (
            <div onClick={()=>{handleConnection()}}>
              <Fab
                variant="extended"
                color="primary"
                aria-label="add"
                className={classes.margin}
                {...bindTrigger(popupState)}
                
              >
                <NavigationIcon className={classes.extendedIcon} />
                Chat with experts
              </Fab>

              <Popover
                {...bindPopover(popupState)}
                anchorReference="anchorPosition"
                anchorPosition={{ top: 500, left: 1600 }}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "center",
                  horizontal: "center",
                }}
              >
                <div className="popoverContainer">
                 <Chat/>
                </div>
              </Popover>
            </div>
          )}
        </PopupState>
      </div>
    </div>
  );
};
export default ChatPop;
