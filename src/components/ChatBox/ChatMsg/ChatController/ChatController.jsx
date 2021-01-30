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
import Record from '../../../../utils/record.js';
import axios from 'axios';
import * as urls from '../../../../constants/urls';

const ChatController = ({ currentOpenRoom, user }) => {
  const classes = useStyle();
  const dispatch = useDispatch();

  const [message, setMessage] = useState('');
  const [typing, setTyping] = useState(false);
  const [recording, setRecording] = useState(false);
  const [record] = useState(new Record());
  const [timeText, setTimeText] = useState('00:00');
  const [currentInterval, setCurrentInterval] = useState();

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

  const handleStartRecording = async () => {
    setRecording(true);
    const stream = await record.getAudioStream();
    await record.mediaRecorder(stream);
    record.startRec();
  };

  const uploadRecording = async () => {
    const formData = record.formData;

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post(
        `${urls.host}/api/v1/uploadRecordRoute`,
        formData,
        config
      );
      //? submitting th message
      const messageObj = {
        room: currentOpenRoom._id,
        receiver: currentOpenRoom.userToShowOnRoom._id,
        messageTXT: 'Record',
        clientId: uuidV4(),
        status: 'written',
        messageType: 'record',
        mediaLink: data.path,
      };

      dispatch(updateRoomMessagesAction(messageObj));
      dispatch(createMessageAction(messageObj));

      //?end submitting th message
    } catch (err) {
      alert('ERROR UPLOADING YOUR IMAGE');
      console.log(err);
    }
  };

  const handleCancelRecording = async () => {
    setRecording(false);
    await record.stopRec();
  };
  const handleSendRecording = async () => {
    setRecording(false);
    await record.stopRec();
    uploadRecording();
  };

  //? for starting recordTime changing
  useEffect(() => {
    let minutes = 0;
    let seconds = 0;
    let minutesTXT = '';
    let secondsTXT = '';
    if (recording) {
      setCurrentInterval(
        setInterval(() => {
          seconds++;
          if (seconds >= 60) {
            minutes++;
            seconds = 0;
          }
          if (minutes < 10) {
            minutesTXT = `0${minutes}`;
          } else {
            minutesTXT = `${minutes}`;
          }
          if (seconds < 10) {
            secondsTXT = `0${seconds}`;
          } else {
            secondsTXT = `${seconds}`;
          }
          setTimeText(`${minutesTXT}:${secondsTXT}`);
        }, 1000)
      );
    } else if (timeText !== '00:00') {
      minutes = 0;
      seconds = 0;
      minutesTXT = '';
      secondsTXT = '';
      setTimeText('00:00');
      if (currentInterval) clearInterval(currentInterval);
    }
    //! the next step is to upload the recording
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recording]);
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
          autoComplete='off'
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
              <span className={classes.recordingTim}>{timeText}</span>
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
