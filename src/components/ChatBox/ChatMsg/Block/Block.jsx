import React from 'react';
import useStyle from './styles';
import Message from '../../../global/Message/Message';
import { Button } from '@material-ui/core';

const Block = ({ severity, message, onUnBlock }) => {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <Message severity={severity} message={message} />
      {onUnBlock && (
        <Button
          style={{ marginRight: '10px' }}
          variant='outlined'
          margin='normal'
          onClick={onUnBlock}
        >
          UnBlock
        </Button>
      )}
    </div>
  );
};

export default Block;
