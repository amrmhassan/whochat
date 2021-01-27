import React from 'react';
import useStyle from './styles';

const MessageTyping = () => {
  const classes = useStyle();

  return (
    <div className={classes.root} style={{ textAlign: 'left' }}>
      {/* other person message */}
      <div className={classes.otherMessage + ' otherMessage'}>
        <div className={classes.otherMessageText}>
          <span className={classes.typingDot}></span>
          <span className={classes.typingDot}></span>
          <span className={classes.typingDot}></span>
        </div>
      </div>
    </div>
  );
};

export default MessageTyping;
