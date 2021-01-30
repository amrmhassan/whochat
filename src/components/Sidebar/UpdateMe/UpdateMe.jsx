import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useStyle from './styles';
import {
  IconButton,
  CircularProgress,
  Avatar,
  TextField,
  ThemeProvider,
  createMuiTheme,
} from '@material-ui/core';
import { ArrowBack, CameraAlt, Close, Publish, Save } from '@material-ui/icons';
import axios from 'axios';
import * as urls from '../../../constants/urls';
import { green } from '@material-ui/core/colors';
import { updateMeAction } from '../../../actions/userActions';
import { UPDATE_USER_RESET } from '../../../constants/userConstants';
import Message from '../../global/Message/Message';

const UpdateMe = ({ open, setOpenUpdateMe }) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const theme = createMuiTheme({
    palette: {
      primary: green,
    },
  });

  const loginUser = useSelector((s) => s.loginUser);
  const { user } = loginUser;

  const updateMe = useSelector((s) => s.updateMe);
  const {
    loading: loadingUpdateMe,
    success: successUpdateMe,
    err: errUpdateMe,
  } = updateMe;

  const [userData, setUserData] = useState({
    firstName: '',
    about: '',
    photo: '',
  });
  const [uploading, setUploading] = useState(false);
  const [dataChanged, setDataChanged] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSaveChanges = () => {
    dispatch(updateMeAction(userData));
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

  //? for setting local state to user data from server
  useEffect(() => {
    setUserData(user);
  }, [user]);
  //? for checking if user changed his data or not
  useEffect(() => {
    if (
      userData.firstName.trim() !== user.firstName.trim() ||
      userData.about.trim() !== user.about.trim() ||
      userData.photo !== user.photo
    ) {
      setDataChanged(true);
    } else {
      setDataChanged(false);
    }
  }, [userData]);

  //? for resetting updateUser
  useEffect(() => {
    if (successUpdateMe) {
      dispatch({
        type: UPDATE_USER_RESET,
      });
      setOpenUpdateMe(false);
    }
  }, [dispatch, successUpdateMe]);

  return (
    <div className={classes.root + ' ' + (open ? '' : classes.closed)}>
      {errUpdateMe && <Message severity='error' message={errUpdateMe} />}
      <div className={classes.header}>
        <div>
          <IconButton
            style={{ color: 'white' }}
            onClick={() => setOpenUpdateMe(false)}
          >
            <ArrowBack />
          </IconButton>{' '}
          Profile
        </div>
        {/* //? here just make the color different when the button is ready to be clicked on */}
        <div className={classes.saveChangesContainer}>
          {loadingUpdateMe && (
            <CircularProgress
              className={classes.savingUpdatingChanges}
              color='secondary'
            />
          )}
          <IconButton
            disabled={!dataChanged || loadingUpdateMe}
            title='Save changes'
            className={classes.saveChanges}
            onClick={handleSaveChanges}
          >
            <Save />
          </IconButton>
        </div>
      </div>
      <div className={classes.content}>
        <section className={classes.profilePhotoContainer}>
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
              <div
                className={
                  classes.controllersContainer + ' controllersContainer'
                }
              >
                <label
                  htmlFor='profile-photo'
                  title='Upload new photo'
                  // onClick={(e) => {
                  //   setUserData({ ...userData, photo: '' });
                  //   e.preventDefault();
                  //   e.stopPropagation();
                  // }}
                  className={classes.uploadNewPhoto}
                >
                  <Publish />
                </label>
                <span
                  title='Remove this photo'
                  onClick={(e) => {
                    setUserData({ ...userData, photo: '' });
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  className={classes.resetPhotoBtn}
                >
                  <Close />
                </span>
              </div>

              <Avatar
                src={userData.photo}
                alt='user profile'
                className={classes.profileImage}
              />
            </div>
          </label>
        </section>
        <section className={classes.nameContainer}>
          <header className={classes.yourNameTXT}>Your Name</header>
          <ThemeProvider theme={theme}>
            <TextField
              fullWidth
              margin='normal'
              variant='standard'
              label='Name'
              required
              name='firstName'
              type='text'
              id='firstName'
              autoComplete='first-name'
              onChange={handleInputChange}
              value={userData.firstName}
              className={classes.firstName}
              InputProps={{
                className: classes.firstNameInput,
                classes: {
                  // notchedOutline: classes.InputBorder,
                },
              }}
            />
          </ThemeProvider>
        </section>
        <section className={classes.aboutContainer}>
          <header className={classes.yourNameTXT}>About</header>
          <ThemeProvider theme={theme}>
            <TextField
              fullWidth
              margin='normal'
              variant='standard'
              label='About'
              required
              name='about'
              type='text'
              id='about'
              autoComplete='about'
              onChange={handleInputChange}
              value={userData.about}
              className={classes.firstName}
              InputProps={{
                className: classes.firstNameInput,
                classes: {
                  // notchedOutline: classes.InputBorder,
                },
              }}
            />
          </ThemeProvider>
        </section>
      </div>
    </div>
  );
};

export default UpdateMe;
