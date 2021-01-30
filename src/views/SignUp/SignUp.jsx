import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import {
  TextField,
  Button,
  Container,
  createMuiTheme,
  ThemeProvider,
  Typography,
  Grid,
  Avatar,
  CircularProgress,
} from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { green } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';
import { signupUserAction } from '../../actions/userActions';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import * as urls from '../../constants/urls';
import { CameraAlt, Close } from '@material-ui/icons';

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

const SignUp = ({ history }) => {
  //? setting local state
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    photo: '',
  });

  //? defining some variables
  const classes = useStyles();
  const dispatch = useDispatch();

  const [uploading, setUploading] = useState(false);

  //? getting user data from redux
  const loginUser = useSelector((s) => s.loginUser);
  const {
    loading: signupLoading,
    user: loggedInUser,
    err: signupError,
    success: signupSuccess,
  } = loginUser;

  //? some functions
  function Alert(props) {
    return <MuiAlert elevation={6} variant='filled' {...props} />;
  }
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    dispatch(signupUserAction(userData));
  };

  const uploadFileHandler = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.target.value) return;
    setUserData({ ...userData, photo: '' });
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('photo', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post(
        `${urls.host}/api/v1/uploadProfilePhotoRoute`,
        formData,
        config
      );
      setUserData({ ...userData, photo: data.path });
      setUploading(false);
    } catch (err) {
      alert('ERROR UPLOADING YOUR IMAGE');
      console.log(err);
      setUploading(false);
    }
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
      history.push('/');
    }
    //! try applying this in the main App.jsx to login every time with userToken
    //! else if (loggedInUser && loggedInUser.token) {
    //! add here the code to log user in with his token
    //! to check if the token is expired or not
    //! add this to backend too , to login with token
    //! dispatch(loginUserAction(loggedInUser.token));
    //! }
  }, [dispatch, history, loggedInUser]);

  return (
    <>
      {signupSuccess ? (
        <Snackbar
          open={signupSuccess}
          autoHideDuration={1000}
          anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        >
          <Alert severity='success'>
            Signed up successfully, Please check your inbox for verification
            email
          </Alert>
        </Snackbar>
      ) : (
        ''
      )}
      {signupLoading ? (
        <Snackbar
          open={signupLoading}
          autoHideDuration={1000}
          anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        >
          <Alert severity='info'>Signing up</Alert>
        </Snackbar>
      ) : (
        ''
      )}
      {signupError ? (
        <Snackbar
          open={signupError && true}
          autoHideDuration={1000}
          anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        >
          <Alert severity='error'>{signupError}</Alert>
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
            Signup
            <div className={classes.loginLogo}>
              <img src='images/login/loginLogo.png' alt='Login Logo' />
            </div>
          </Typography>
          <form className={classes.loginFrom} onSubmit={handleSignupSubmit}>
            <ThemeProvider theme={theme}>
              <Grid container spacing={2}>
                <Grid item sm={9} xs={9}>
                  <TextField
                    fullWidth
                    margin='normal'
                    variant='outlined'
                    label='Name'
                    required
                    name='firstName'
                    type='text'
                    id='firstName'
                    disabled={signupLoading}
                    autoComplete='first-name'
                    onChange={handleInputChange}
                    value={userData.firstName}
                    className={classes.emailInput}
                    InputProps={{
                      className: classes.emailInput,
                      classes: {
                        notchedOutline: classes.InputBorder,
                      },
                    }}
                  />
                </Grid>
                <Grid item sm={3} xs={3} className={classes.photoContainer}>
                  <input
                    type='file'
                    id='profile-photo'
                    label='Choose your image'
                    onChange={uploadFileHandler}
                    accept='image/*'
                    className={classes.photoInput}
                  />
                  <label htmlFor='profile-photo' className={classes.inputLabel}>
                    <div
                      style={userData.photo ? { display: 'none' } : {}}
                      className={classes.cameraIconContainer}
                    >
                      <CameraAlt style={uploading ? { display: 'none' } : {}} />
                      <CircularProgress
                        style={!uploading ? { display: 'none' } : {}}
                        className={classes.photoUploading}
                        color='secondary'
                      />
                    </div>
                    <div
                      style={userData.photo ? {} : { display: 'none' }}
                      className={classes.avatarContainer}
                    >
                      <span
                        onClick={(e) => {
                          setUserData({ ...userData, photo: '' });
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        className={classes.resetPhotoBtn}
                      >
                        <Close />
                      </span>
                      <Avatar
                        src={userData.photo}
                        alt='user profile'
                        className={classes.profileImage}
                      />
                    </div>
                  </label>
                </Grid>
              </Grid>

              <TextField
                fullWidth
                margin='normal'
                variant='outlined'
                label='Email'
                required
                disabled={signupLoading}
                name='email'
                type='email'
                id='email'
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
                disabled={signupLoading}
                type='password'
                id='password'
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
                label='Password Confirmation'
                required
                name='passwordConfirm'
                disabled={signupLoading}
                type='password'
                id='passwordConfirm'
                autoComplete='current-passwordConfirm'
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
              disabled={signupLoading}
              endIcon={
                signupLoading && (
                  <CircularProgress
                    style={{ color: 'black', width: '20px', height: '20px' }}
                  />
                )
              }
            >
              Signup
            </Button>
          </form>
          <Typography className={classes.notSignedUp}>
            Have an account ?{' '}
            <Link className={classes.signUpLink} to='/login'>
              {' '}
              Login
            </Link>
          </Typography>
        </Container>
      </div>
    </>
  );
};

export default SignUp;
