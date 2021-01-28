import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@material-ui/core';
import { Send, Mic, Close, Done } from '@material-ui/icons';
import useStyle from './styles';
import {
  createMessageAction,
  updateRoomMessagesAction,
} from '../../../../actions/messageActions';
import { v4 as uuidV4 } from 'uuid';

const ChatController = ({ currentOpenRoom, user }) => {
  const classes = useStyle();
  const dispatch = useDispatch();

  const [message, setMessage] = useState('');
  const [typing, setTyping] = useState(false);
  const [recording, setRecording] = useState(false);

  const socket = useSelector((s) => s.socket);

  const userData = useSelector((s) => s.currentChattingUserData);
  const { status } = userData;

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    if (message) {
      const messageObj = {
        room: currentOpenRoom._id,
        receiver: currentOpenRoom.userToShowOnRoom._id,
        messageTXT: message,
        clientId: uuidV4(),
        status: 'written',
      };

      dispatch(updateRoomMessagesAction(messageObj));
      dispatch(createMessageAction(messageObj));
      setTyping(false);
      setMessage('');
    }
  };

  const handleTypingMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleStartRecording = () => {
    setRecording(true);
  };

  const handleCancelRecording = () => {
    setRecording(false);
  };
  const handleSendRecording = () => {
    setRecording(false);
  };

  //? for setting typing variable when typing
  useEffect(() => {
    if (message.trim()) {
      setTyping(true);
    } else {
      setTyping(false);
    }
  }, [message]);
  //! search how to get your socket id then
  //! send it to the user with emitting
  //? for emitting typing event
  useEffect(() => {
    if (
      (status === 'online' ||
        status === 'startTyping' ||
        status === 'stopTyping') &&
      socket.id
    ) {
      if (typing) {
        socket.emit('user-currently-typing', {
          typingUserId: user._id,
          onlineUserId: userData.onlineId,
          typingUserOnlineId: socket.id,
        });
      } else {
        socket.emit('user-stopped-typing', {
          typingUserId: user._id,
          onlineUserId: userData.onlineId,
          typingUserOnlineId: socket.id,
        });
      }
    }
    // eslint-disable-next-line
  }, [currentOpenRoom, socket, status, typing, user, userData.onlineId]);
  //? for clearing message when changing currentOpenUserRoom
  useEffect(() => {
    setMessage('');
    if (socket.id) {
      socket.emit('user-stopped-typing', {
        typingUserId: user._id,
        onlineUserId: userData.onlineId,
        typingUserOnlineId: socket.id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData._id]);

  return (
    <form
      autoComplete='off'
      className={classes.root}
      onSubmit={handleSubmitMessage}
    >
      {/* <input hidden={true} autoComplete={false} /> */}
      <div className={classes.msgBox}>
        <input
          disabled={recording}
          id='new-message-input'
          autoFocus={true}
          placeholder='Type a message'
          type='text'
          className={classes.msgInput}
          rows='1'
          value={message}
          onChange={handleTypingMessage}
          autoComplete={false}
        />
      </div>
      <div className={classes.send}>
        {recording ? (
          <div className={classes.recordingContainer}>
            <IconButton
              onClick={handleCancelRecording}
              size='small'
              className={classes.cancelRecording}
            >
              <Close />
            </IconButton>
            <div className={classes.recordTimeContainer}>
              <span className={classes.recordingRedDot}></span>
              <span className={classes.recordingTim}>1:00</span>
            </div>
            <IconButton
              onClick={handleSendRecording}
              size='small'
              className={classes.sendRecord}
            >
              <Done />
            </IconButton>
          </div>
        ) : message ? (
          <IconButton type='submit'>
            <Send style={{ color: '#9B9B9B' }} />
          </IconButton>
        ) : (
          <IconButton onClick={handleStartRecording}>
            <Mic />
          </IconButton>
        )}
      </div>
    </form>
  );
};

export default ChatController;
