import React from "react";
import apiService from "../../services/ApiService";
import { useState } from "react";
import { toast } from "react-toastify";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import Avatar from "@material-ui/core/Avatar";
//import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { deepOrange } from "@material-ui/core/colors";
import swal from "sweetalert";
export default function ChangePassword(props) {
  function updatePass(e) {
    e.preventDefault();
    apiService
      .put("/api/user/update/password", { oldpassword, newPassword })
      .then((res) => {
        console.log(res);
        toast.success("Password Updated Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          theme: "colored",
        });
        props.history.push("/profile");
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(error.response.data, {
          position: toast.POSITION.TOP_RIGHT,
          theme: "colored",
        });
      });
  }
  const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: "-30px",
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
      flexWrap: "wrap",
      width: "50%",

      margin: "auto",

      padding: "10px",
      backgroundColor: "#fff",
      borderRadius: "10px",
      boxShadow: "0px 0px 10px #000",
    },
    image: {
      backgroundImage: `url(${Image})`,
      backgroundRepeat: "no-repeat",
      backgroundColor:
        theme.palette.type === "dark"
          ? theme.palette.grey[50]
          : theme.palette.grey[900],
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    paper: {
      margin: theme.spacing(8, 6),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),

      backgroundColor: deepOrange[500],
      width: 86,
      height: 86,
      marginTop: "30px",
    },
    form: {
      width: "100%",
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    textField: {
      width: "100%",
      marginLeft: "auto",
      marginRight: "auto",
      paddingBottom: 0,
      marginTop: "50px",
      fontWeight: 500,
    },
    input: {
      color: "white",
      backgroundColor: "#362245",
      height: 80,
      fontSize: "25px",
    },
    button: {
      backgroundColor: "#362245",
      fontSize: "20px",
      fontWeight: 500,
      color: "white",
      padding: "30px",
      marginLeft: "10px",
    },
    checkBox: {
      color: "white",
    },
    Link: {
      color: "white",
      fontSize: "18px",
      marginTop: "40px",
    },
    SignText: {
      color: "white",
      fontSize: "42px",
      marginTop: "5px",
    },

    floatingLabelFocusStyle: {
      color: "white",
      fontSize: "20px",
    },

    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
  }));
  const [oldpassword, setOldpassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const classes = useStyles();

  const passwordValidation = (newPassword) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&()*^%~{}=+-_]{8,}$/i;
    if (passwordRegex.test(newPassword)) {
      return true;
    } else {
      return false;
    }
  };

  const updateValidation = () => {
    if (
      
      passwordValidation(newPassword) 
    ) {
      return true;
    } else {
      console.log("false");
      return false;
    }
  };

  return (
    <div className="container">
      {/* <div>
          <input onChange={(e)=>{setOldpassword(e.target.value)}} className='pass' type="password" placeholder='Old Password' />
          </div>
          <div>
          <input     onChange={(e)=>{setNewPassword(e.target.value)}}  className='pass' type="password" placeholder='New Password' />
          </div>
    <button onClick={updatePass} >Update</button> */}
      <Grid container component="main" className={classes.root}>
        {/* <Grid item md={7} className={classes.image} /> */}
        <Grid item style={{ backgroundColor: "#180c2b" }} md={12}>
          <div style={{ color: "#474745" }} className={classes.paper}>
            <Avatar
              sm={{ width: 86, height: 86 }}
              className={classes.avatar}
              spacing={4}
            ></Avatar>
            <Typography
              className={classes.SignText}
              component="h1"
              variant="h5"
            >
              My Profile
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                className={classes.textField}
                InputLabelProps={{ className: classes.floatingLabelFocusStyle }}
                InputProps={{
                  className: classes.input,
                }}
                variant="filled"
                margin="normal"
                type="password"
                value={oldpassword}
                color="secondary"
                fullWidth
                id="oldpass"
                placeholder="Old Password"
                name="oldpass"
                autoComplete="oldpass"
                autoFocus
                onChange={(e) => {
                  setOldpassword(e.target.value);
                }}
              />
              <br />
              <TextField
                className={classes.textField}
                InputLabelProps={{ className: classes.floatingLabelFocusStyle }}
                InputProps={{
                  className: classes.input,
                }}
                variant="filled"
                margin="normal"
                color="secondary"
                fullWidth
                type="password"
                value={newPassword}
                id="newPassword"
                placeholder="New Password"
                name="newPassword"
                autoComplete="newPassword"
                autoFocus
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                error={!passwordValidation(newPassword)}
                helperText={
                  passwordValidation(newPassword)
                    ? " "
                    : "Password must be at least 8 characters, one letter and one number"
                }
              />
              <br />

              <Grid
                container
                justify="flex-end"
                spacing={4}
                style={{ padding: 20 }}
              ></Grid>

              <Grid
                container
                justify="space-around"
                spacing={4}
                style={{ padding: 20 }}
              ></Grid>
              <Button className={classes.button} onClick={(e) => {
                if (updateValidation()) {
                  updatePass(e);
                }
              }}>
                {" "}
                Update Password{" "}
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}