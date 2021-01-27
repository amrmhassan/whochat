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
import { userForgotPasswordAction } from '../../actions/userActions';
import { useSelector, useDispatch } from 'react-redux';

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

const ForgotPassword = ({ history }) => {
  //? setting local state
  const [email, setEmail] = useState('');

  //? defining some variables
  const classes = useStyles();
  const dispatch = useDispatch();

  //? getting user data from redux
  const { user } = useSelector((s) => s.loginUser);
  const userForgotPassword = useSelector((s) => s.userForgotPassword);
  const {
    loading: loadingForgotPassword,
    success: successForgotPassword,
    err: errForgotPassword,
  } = userForgotPassword;

  //? some functions
  function Alert(props) {
    return <MuiAlert elevation={6} variant='filled' {...props} />;
  }

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(userForgotPasswordAction(email));
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
  return (
    <>
      {/* //? edit from here */}
      {successForgotPassword ? (
        <Snackbar
          open={successForgotPassword}
          autoHideDuration={1000}
          anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        >
          <Alert severity='success'>
            Please check you email for resetting password link <br />
            You can close this window now
          </Alert>
        </Snackbar>
      ) : (
        ''
      )}
      {loadingForgotPassword ? (
        <Snackbar
          open={loadingForgotPassword}
          autoHideDuration={1000}
          anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        >
          <Alert severity='info'>Sending your request</Alert>
        </Snackbar>
      ) : (
        ''
      )}
      {errForgotPassword ? (
        <Snackbar
          open={errForgotPassword && true}
          autoHideDuration={1000}
          anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        >
          <Alert severity='error'>{errForgotPassword}</Alert>
        </Snackbar>
      ) : (
        ''
      )}
      {/* //? to here */}
      <div className={classes.root}>
        <Container maxWidth='xs'>
          <Typography
            className={classes.lonInTopHeader}
            style={{ textAlign: 'center' }}
            variant='h2'
          >
            Enter your email
          </Typography>
          <form
            className={classes.loginFrom}
            onSubmit={handleForgotPasswordSubmit}
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
                disabled={loadingForgotPassword}
                autoComplete='current-email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className={classes.emailInput}
                InputProps={{
                  className: classes.emailInput,
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
              disabled={loadingForgotPassword}
              endIcon={
                loadingForgotPassword && (
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

export default ForgotPassword;
