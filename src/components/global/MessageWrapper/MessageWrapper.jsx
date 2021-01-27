import React from 'react';
import Message from '../Message/Message';
import useStyle from './styles';

const MessageWrapper = ({ message, severity, children }) => {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <Message message={message} severity={severity} />
      {children}
    </div>
  );
};

export default MessageWrapper;
