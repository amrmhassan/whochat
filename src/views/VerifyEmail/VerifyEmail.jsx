import React, { useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { userVerifyEmailAction } from '../../actions/userActions';
import { useSelector, useDispatch } from 'react-redux';

const VerifyEmail = ({ history, match }) => {
  const token = match.params.token;

  //? defining some variables
  const dispatch = useDispatch();

  //? getting user data from redux
  const { user } = useSelector((s) => s.loginUser);
  const userVerifyEmail = useSelector((s) => s.userVerifyEmail);
  const {
    loading: loadingVerifyEmail = true,
    success: successVerifyEmail,
    err: errVerifyEmail,
  } = userVerifyEmail;

  //? some functions
  function Alert(props) {
    return <MuiAlert elevation={6} variant='filled' {...props} />;
  }

  //? for verifying email
  useEffect(() => {
    console.log({
      email: user.email,
      token,
    });
    if (user && user.email && token) {
      dispatch(userVerifyEmailAction(token, user.email));
    }
  }, [dispatch, token, user]);

  //? some useEffect functions
  useEffect(() => {
    if (user && user.token) {
      history.push('/');
    }
  }, [dispatch, history, user]);

  useEffect(() => {
    if (successVerifyEmail) {
      setTimeout(() => {
        history.push('/login');
      }, 2000);
    }
  }, [history, successVerifyEmail]);

  return (
    <>
      {successVerifyEmail ? (
        <Snackbar
          open={successVerifyEmail}
          autoHideDuration={1000}
          anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        >
          <Alert severity='success'>Email Verified Successfully</Alert>
        </Snackbar>
      ) : (
        ''
      )}
      {loadingVerifyEmail ? (
        <Snackbar
          open={loadingVerifyEmail}
          autoHideDuration={1000}
          anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        >
          <Alert severity='info'>Verifying your email</Alert>
        </Snackbar>
      ) : (
        ''
      )}
      {errVerifyEmail ? (
        <Snackbar
          open={errVerifyEmail && true}
          autoHideDuration={1000}
          anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        >
          <Alert severity='error'>{errVerifyEmail}</Alert>
        </Snackbar>
      ) : (
        ''
      )}
    </>
  );
};

export default VerifyEmail;
