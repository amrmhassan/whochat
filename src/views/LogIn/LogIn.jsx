import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import {
  TextField,
  Button,
  Container,
  createMuiTheme,
  ThemeProvider,
  Typography,
} from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';
import { loginUserAction } from '../../actions/userActions';
import { useSelector, useDispatch } from 'react-redux';

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

const LogIn = ({ history }) => {
  //? setting local state
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  //? defining some variables
  const classes = useStyles();
  const dispatch = useDispatch();

  //? getting user data from redux
  const loginUser = useSelector((s) => s.loginUser);
  const {
    loading: logInLoading,
    user: loggedInUser,
    err: logInError,
    success: successLogIn,
  } = loginUser;

  //? some functions
  function Alert(props) {
    return <MuiAlert elevation={6} variant='filled' {...props} />;
  }
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUserAction(userData));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  //? some useEffect functions
  useEffect(() => {
    if (loggedInUser && loggedInUser.token) {
      history.push('/home');
    }
    //! try applying this in the main App.jsx to login every time with userToken
    //! else if (loggedInUser && loggedInUser.token) {
    //! add here the code to log user in with his token
    //! to check if the token is expired or not
    //! add this to backend too , to login with token
    //! dispatch(loginUserAction(loggedInUser.token));
    //! }
  }, [dispatch, history, loggedInUser, successLogIn]);
  return (
    <>
      {successLogIn ? (
        <Snackbar
          open={successLogIn}
          autoHideDuration={1000}
          anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        >
          <Alert severity='success'>Logged in successfully</Alert>
        </Snackbar>
      ) : (
        ''
      )}
      {logInLoading ? (
        <Snackbar
          open={logInLoading}
          autoHideDuration={1000}
          anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        >
          <Alert severity='info'>Logging in</Alert>
        </Snackbar>
      ) : (
        ''
      )}
      {logInError ? (
        <Snackbar
          open={logInError && true}
          autoHideDuration={1000}
          anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        >
          <Alert severity='error'>{logInError}</Alert>
        </Snackbar>
      ) : (
        ''
      )}
      <div className={classes.root}>
        <Container maxWidth='xs'>
          <Typography
            className={classes.lonInTopHeader}
            style={{ textAlign: 'center' }}
            variant='h2'
          >
            Login
            <div className={classes.loginLogo}>
              <img src='images/login/loginLogo.png' alt='Login Logo' />
            </div>
          </Typography>
          <form className={classes.loginFrom} onSubmit={handleLoginSubmit}>
            <ThemeProvider theme={theme}>
              <TextField
                fullWidth
                margin='normal'
                variant='outlined'
                label='Email'
                required
                name='email'
                type='email'
                id='email'
                disabled={logInLoading}
                autoComplete='current-email'
                onChange={handleInputChange}
                value={userData.email}
                className={classes.emailInput}
                InputProps={{
                  className: classes.emailInput,
                  classes: {
                    notchedOutline: classes.InputBorder,
                  },
                }}
              />
              <TextField
                fullWidth
                margin='normal'
                variant='outlined'
                label='Password'
                required
                name='password'
                type='password'
                id='password'
                disabled={logInLoading}
                autoComplete='current-password'
                onChange={handleInputChange}
                value={userData.password}
                inputProps={{
                  minLength: 8,
                }}
                className={classes.passwordInput}
                InputProps={{
                  className: classes.passwordInput,
                  classes: {
                    notchedOutline: classes.InputBorder,
                  },
                }}
              />
            </ThemeProvider>

            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.loginBtn}
              style={{ backgroundColor: '#019688' }}
              fullWidth
              disabled={logInLoading}
              endIcon={
                logInLoading && (
                  <CircularProgress
                    style={{ color: 'black', width: '20px', height: '20px' }}
                  />
                )
              }
            >
              Login
            </Button>
          </form>
          <Typography className={classes.notSignedUp}>
            Don't have email ?{' '}
            <Link className={classes.signUpLink} to='/signup'>
              {' '}
              Signup
            </Link>
          </Typography>
          <Typography className={classes.notSignedUp}>
            <Link className={classes.signUpLink} to='/forgotPassword'>
              Forgot password
            </Link>{' '}
            ?
          </Typography>
        </Container>
      </div>
    </>
  );
};

export default LogIn;
