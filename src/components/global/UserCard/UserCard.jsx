import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles';
import { Avatar } from '@material-ui/core';
import { createRoomAction } from '../../../actions/roomActions';
import { CREATE_ROOM_RESET } from '../../../constants/roomConstants';
import Message from '../../../components/global/Message/Message';
import axios from 'axios';
import * as urls from '../../../constants/urls';

const UserCard = ({ user }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentCard, setCurrentCard] = useState(false);
  const [createRoom, setCreateRoom] = useState({
    loading: false,
    success: false,
    err: false,
  });

  const {
    loading: createRoomLoading,
    success: createRoomSuccess,
    err: createRoomErr,
  } = createRoom;

  //! you may need this action outside This module
  //! so you need to make it in the redux state and then pass the locale setCreateRoom state
  //! to it and then let the action change createRoom state
  const createRoomAction = (otherUserEmail) => async (dispatch, getState) => {
    try {
      setCreateRoom({
        ...createRoom,
        loading: true,
      });
      const token = `Bearer ${getState().loginUser.user.token}`;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
      };

      await axios.post(
        `${urls.roomsUrl}/createNewRoom`,
        { otherUserEmail },
        config
      );

      setCreateRoom({
        ...createRoom,
        loading: false,
        success: true,
      });
    } catch (err) {
      const error =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;

      setCreateRoom({
        ...createRoom,
        loading: false,
        err: error,
      });
    }
  };
  //! end of create room action
  const handleCreateChat = () => {
    setCurrentCard(true);
    dispatch(createRoomAction(user.email));
  };

  // //? for hiding success message
  //! convert creating new room from redux state to react local state
  useEffect(() => {
    if (createRoomSuccess || createRoomErr) {
      setTimeout(() => {
        setCurrentCard(false);
        dispatch({
          type: CREATE_ROOM_RESET,
        });
      }, 2000);
    }
  }, [createRoomErr, createRoomSuccess, dispatch]);

  return (
    <Card className={classes.root}>
      {currentCard ? (
        createRoomLoading ? (
          <Message message='Adding chat ...' position='absolute' />
        ) : createRoomErr ? (
          <Message
            severity='error'
            message={createRoomErr}
            position='absolute'
          />
        ) : createRoomSuccess ? (
          <Message
            severity='success'
            message={`Request Sent to ${user.firstName.split(' ')[0]}`}
            position='absolute'
          />
        ) : null
      ) : null}

      <CardActionArea>
        <div className={classes.userPhotoContainer}>
          <Avatar
            className={classes.userPhoto}
            src={user.photo}
            title={user.firstName}
          />
        </div>

        <CardContent>
          <Typography
            className={classes.userName}
            gutterBottom
            variant='h5'
            component='h2'
          >
            {user.firstName}
          </Typography>
          <Typography
            className={classes.userAbout}
            variant='body2'
            color='textSecondary'
            component='p'
          >
            {user.about}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={handleCreateChat} size='small' color='primary'>
          Create Chat
        </Button>
        {/* <Button size='small' color='primary'>
          Learn More
        </Button> */}
      </CardActions>
    </Card>
  );
};

export default UserCard;
