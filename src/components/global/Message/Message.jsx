import React from 'react';
import Alert from '@material-ui/lab/Alert';
import useStyle from './styles';

const Message = ({ severity, message, children }) => {
  const classes = useStyle();

  return (
    <>
      <Alert className={classes.root} severity={severity || 'info'}>
        {message}
      </Alert>
    </>
  );
};

export default Message;
