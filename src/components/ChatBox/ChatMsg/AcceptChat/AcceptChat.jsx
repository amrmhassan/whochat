import React from 'react';
import useStyle from './styles';
import Message from '../../../global/Message/Message';
import { Button } from '@material-ui/core';

const AcceptChat = ({ message, onAccept, onBlock }) => {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <Message message={message} />
      <Button
        style={{ marginRight: '10px' }}
        variant='outlined'
        margin='normal'
        onClick={onAccept}
      >
        Accept
      </Button>
      <Button variant='outlined' margin='normal' onClick={onBlock}>
        Block
      </Button>
    </div>
  );
};

export default AcceptChat;
