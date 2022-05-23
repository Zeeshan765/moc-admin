import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Image from './bg.jpg';
import { deepOrange } from '@material-ui/core/colors';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import apiService from '../../services/ApiService';
//import userService from '../../components/services/UserService';
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${Image})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),

    backgroundColor: deepOrange[500],
    width: 86,
    height: 86,
    marginTop: '30px',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textField: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: 0,
    marginTop: '50px',
    fontWeight: 500,
  },
  input: {
    color: 'white',
    backgroundColor: '#362245',
    height: 80,
    fontSize: '25px',
  },
  button: {
    width: '70%',
    height: 60,
    marginTop: '40px',
    fontSize: '20px',
    marginLeft: '120px',
  },
  checkBox: {
    color: 'white',
  },
  Link: {
    color: 'white',
    fontSize: '18px',
    marginTop: '40px',
  },
  SignText: {
    color: 'white',
    fontSize: '42px',
    marginTop: '5px',
  },

  floatingLabelFocusStyle: {
    color: 'white',
    fontSize: '20px',
  },

  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  //Handle Login
  const handlelogin = (e) => {
    e.preventDefault();
    apiService
      .post('/api/auth/login', { email, password })
      .then((res) => {
        swal({
          title: 'Congratulations!',
          text: 'Logged In Successfully',
          icon: 'success',
          button: 'Ok ',
        });
        localStorage.setItem('token', res.data);
        
        window.location.href = '/';
        //props.history.push('/');
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data, {
          position: toast.POSITION.TOP_LEFT,
        });
      });
    }

























  // const handlelogin = (e) => {
  //   e.preventDefault();
  //   userService
  //     .login(email, password)
  //     .then((res) => {
  //       swal({
  //         title: 'Congratulations!',
  //         text: 'Logged In Successfully',
  //         icon: 'success',
  //         button: 'Check It ',
  //       });
  //       console.log(res);

  //       props.history.push('/');
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       toast.error(error.response.data, {
  //         position: toast.POSITION.TOP_LEFT,
  //       });
  //     });
  // };

  return (
    <Grid container component='main' className={classes.root}>
      <Grid item md={7} className={classes.image} />
      <Grid item style={{ backgroundColor: '#180c2b' }} md={5}>
        <div style={{ color: '#474745' }} className={classes.paper}>
          <Avatar
            sm={{ width: 86, height: 86 }}
            className={classes.avatar}
            spacing={4}
          ></Avatar>
          <Typography className={classes.SignText} component='h1' variant='h5'>
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              className={classes.textField}
              InputLabelProps={{ className: classes.floatingLabelFocusStyle }}
              InputProps={{
                className: classes.input,
              }}
              variant='filled'
              margin='normal'
              color='secondary'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <br />
            <TextField
              className={classes.textField}
              variant='filled'
              margin='normal'
              InputLabelProps={{ className: classes.floatingLabelFocusStyle }}
              InputProps={{
                className: classes.input,
              }}
              required
              fullWidth
              //backgroundColor="#fcfaf7"
              color='secondary'
              name='password'
              label='Password'
              type='password'
              id='password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Grid
              container
              justify='flex-end'
              spacing={4}
              style={{ padding: 20 }}
            >
            
            </Grid>

            <Button
              justify='space-around'
              className={classes.button}
              fullWidth
              variant='contained'
              color='default'
               onClick={handlelogin}
            >
              Login
            </Button>

            <Grid
              container
              justify='space-around'
              spacing={4}
              style={{ padding: 20 }}
            >
              
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;
