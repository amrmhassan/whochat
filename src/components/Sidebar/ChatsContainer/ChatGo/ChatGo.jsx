import React from 'react';
import { useDispatch } from 'react-redux';
import useStyle from './styles';
import { Avatar, ButtonBase } from '@material-ui/core';
import { setCurrentOpenRoomAction } from '../../../../actions/roomActions';
import moment from 'moment';
import { setCurrentChattingUserData } from '../../../../actions/userActions';
import NewReleasesIcon from '@material-ui/icons/NewReleases';

const ChatGo = ({ room }) => {
  const classes = useStyle();
  const dispatch = useDispatch();

  const handleSetCurrentRoom = () => {
    const userObj = {
      userId: room.userToShowOnRoom._id,
    };
    dispatch(setCurrentChattingUserData(userObj, { type: 'new' }));
    dispatch(setCurrentOpenRoomAction(room._id));
    const messageInput = document.getElementById('new-message-input');
    messageInput && messageInput.focus();
  };
  return (
    <ButtonBase
      disabled={!room.userToShowOnRoom && true}
      onClick={handleSetCurrentRoom}
      className={classes.btnBase}
    >
      <div className={classes.root}>
        <div className={classes.avatarContainer}>
          <Avatar
            src={room.userToShowOnRoom ? room.userToShowOnRoom.photo : 'red'}
          />
        </div>
        <div className={classes.info}>
          <div className={classes.infoTop}>
            <div className={classes.name}>{`${
              room.userToShowOnRoom
                ? room.userToShowOnRoom.fullName
                : 'Deleted User'
            }`}</div>
            <div className={classes.date}>
              {moment(room.lastMessage.createdAt).format('hh:mm A')}
            </div>
          </div>

          <div className={classes.lastMsg}>
            {room.new ? (
              <span className={classes.newChat}>
                <NewReleasesIcon className={classes.newChatIcon} /> New
              </span>
            ) : (
              <span>{room.lastMessage.messageTXT}</span>
            )}
          </div>
        </div>
      </div>
    </ButtonBase>
  );
};

export default ChatGo;
