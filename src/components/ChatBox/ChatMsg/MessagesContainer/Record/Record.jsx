import React, { useState, useEffect } from 'react';
import useStyle from './styles';
import moment from 'moment';
import MessageStatus from '../Message/MessageStatus/MessageStatus';
import AudioControllers from './AudioControllers/AudioControllers';

const Record = ({ message: msg, sender, mediaLink }) => {
  const classes = useStyle();
  const [messageDate, setMessageDate] = useState('');
  useEffect(() => {
    setMessageDate(msg.createdAt);
  }, [msg.createdAt]);

  return (
    <div
      className={classes.root}
      style={
        sender === 'other'
          ? { textAlign: 'left' }
          : sender === 'admin'
          ? { textAlign: 'center' }
          : { textAlign: 'right' }
      }
    >
      {/* other person message */}
      {sender === 'other' && (
        <div className={classes.otherMessage + ' otherMessage'}>
          <AudioControllers mediaLink={mediaLink} />
          <div className={classes.bottom}>
            <div className={classes.otherMessageDate}>
              {moment(messageDate).format('hh:mm A')}
            </div>
          </div>
        </div>
      )}
      {/* my message */}
      {sender === 'me' && (
        <div className={classes.myMessage + ' myMessage'}>
          <AudioControllers mediaLink={mediaLink} />
          <div className={classes.bottom}>
            <div className={classes.myMessageDate}>
              {moment(messageDate).format('hh:mm A')}
              <span className={classes.msgStatus}>
                <MessageStatus status={msg.status} />
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Record;
