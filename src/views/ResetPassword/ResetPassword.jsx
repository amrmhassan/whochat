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
import { userResetPasswordAction } from '../../actions/userActions';
import { useSelector, useDispatch } from 'react-redux';

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

const ResetPassword = ({ history, match }) => {
  const token = match.params.token;
  //? setting local state
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
  });

  //? defining some variables
  const classes = useStyles();
  const dispatch = useDispatch();

  //? getting user data from redux
  const { user } = useSelector((s) => s.loginUser);
  const userResetPassword = useSelector((s) => s.userResetPassword);
  const {
    loading: loadingResetPassword,
    success: successResetPassword,
    err: errResetPassword,
  } = userResetPassword;

  //? some functions
  function Alert(props) {
    return <MuiAlert elevation={6} variant='filled' {...props} />;
  }
  const handleResetPasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(userResetPasswordAction(token, userData));
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
    if (user && user.token) {
      history.push('/');
    }
    //! try applying this in the main App.jsx to login every time with userToken
    //! else if (loggedInUser && loggedInUser.token) {
    //! add here the code to log user in with his token
    //! to check if the token is expired or not
    //! add this to backend too , to login with token
    //! dispatch(loginUserAction(loggedInUser.token));
    //! }
  }, [dispatch, history, user]);

  useEffect(() => {
    if (successResetPassword) {
      setTimeout(() => {
        history.push('/login');
      }, 2000);
    }
  }, [history, successResetPassword]);
  return (
    <>
      {successResetPassword ? (
        <Snackbar
          open={successResetPassword}
          autoHideDuration={1000}
          anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        >
          <Alert severity='success'>Password updated successfully</Alert>
        </Snackbar>
      ) : (
        ''
      )}
      {loadingResetPassword ? (
        <Snackbar
          open={loadingResetPassword}
          autoHideDuration={1000}
          anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        >
          <Alert severity='info'>Sending Your Request</Alert>
        </Snackbar>
      ) : (
        ''
      )}
      {errResetPassword ? (
        <Snackbar
          open={errResetPassword && true}
          autoHideDuration={1000}
          anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        >
          <Alert severity='error'>{errResetPassword}</Alert>
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
            Reset your password password
          </Typography>
          <form
            className={classes.loginFrom}
            onSubmit={handleResetPasswordSubmit}
          >
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
                disabled={loadingResetPassword}
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
                label='New Password'
                required
                name='password'
                type='password'
                id='password'
                disabled={loadingResetPassword}
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
              <TextField
                fullWidth
                margin='normal'
                variant='outlined'
                label='New Password Again'
                required
                name='passwordConfirm'
                type='password'
                id='passwordConfirm'
                disabled={loadingResetPassword}
                autoComplete='current-password'
                onChange={handleInputChange}
                value={userData.passwordConfirm}
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
              fullWidth
              disabled={loadingResetPassword}
              endIcon={
                loadingResetPassword && (
                  <CircularProgress
                    style={{ color: 'black', width: '20px', height: '20px' }}
                  />
                )
              }
            >
              Send
            </Button>
          </form>
        </Container>
      </div>
    </>
  );
};

export default ResetPassword;
