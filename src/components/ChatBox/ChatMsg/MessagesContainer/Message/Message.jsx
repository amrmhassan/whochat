import React, { useState, useEffect } from 'react';
import useStyle from './styles';
import moment from 'moment';
import MessageStatus from './MessageStatus/MessageStatus';

const Message = ({ message: msg, sender }) => {
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
          <div className={classes.otherMessageText}>{msg.messageTXT}</div>
          <div className={classes.otherMessageDate}>
            {moment(messageDate).format('hh:mm A')}
          </div>
        </div>
      )}
      {/* my message */}
      {sender === 'me' && (
        <div className={classes.myMessage + ' myMessage'}>
          <div className={classes.myMessageText}>{msg.messageTXT}</div>
          <div className={classes.myMessageDate}>
            {moment(messageDate).format('hh:mm A')}
            <span className={classes.msgStatus}>
              <MessageStatus status={msg.status} />
            </span>
          </div>
        </div>
      )}
      {/* admin messages */}
      {sender === 'admin' && (
        <div className={classes.adminMessage + ' adminMessage'}>
          <div className={classes.adminMessageText}>{msg.messageTXT}</div>
        </div>
      )}
    </div>
  );
};

export default Message;
