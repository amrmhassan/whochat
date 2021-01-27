import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useStyle from './styles';
import Message from './Message/Message';
import { IconButton } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import MessageWrapper from '../../../global/MessageWrapper/MessageWrapper';
import MessageTyping from './MessageTyping/MessageTyping';

const MessagesContainer = ({ user }) => {
  const classes = useStyle();
  const roomMessages = useSelector((s) => s.roomMessages);
  const {
    loading: loadingMessages = true,
    messages: displayedMessages,
    err: errGettingMessages,
  } = roomMessages;

  const userData = useSelector((s) => s.currentChattingUserData);
  const { status } = userData;

  const scrollToEnd = () => {
    document
      .getElementById('messages-container')
      .scrollTo(0, document.getElementById('messages-container').scrollHeight);
  };

  //? for scrolling to end of chat with each render

  useEffect(() => {
    const container = document.getElementById('messages-container');
    //? scrollTop = 0  means it is opening for the first time
    //? and check if the container.scrollHeight -
    //? (container.scrollTop + container.clientHeight)
    //? is greater than 300 because if the other user send a message when this user scrolling to top
    //? we don't want to scroll him to bottom
    if (
      container.scrollTop === 0 ||
      container.scrollHeight - (container.scrollTop + container.clientHeight) <
        300
    ) {
      scrollToEnd();
    }
    //? for scrolling to end when typing
    if (
      (container.scrollTop === 0 ||
        container.scrollHeight -
          (container.scrollTop + container.clientHeight) <
          300) &&
      status === 'startTyping'
    ) {
      scrollToEnd();
    }
  }, [displayedMessages, status]);

  //? for adding scroll event

  useEffect(() => {
    const container = document.getElementById('messages-container');
    const downArrow = document.getElementById('down-arrow');
    container.onscroll = () => {
      if (
        container.scrollHeight -
          (container.scrollTop + container.clientHeight) <
        300
      ) {
        downArrow.style.display = 'none';
      } else {
        downArrow.style.display = 'inline-flex';
      }
    };
  }, []);

  return (
    <>
      <div id='messages-container' className={classes.root}>
        <Message
          message={{ messageTXT: 'Messages are stored in secure server 🔐' }}
          sender='admin'
        />

        {loadingMessages ? (
          <MessageWrapper message='Getting messages ...' />
        ) : errGettingMessages ? (
          <MessageWrapper severity='error' message={errGettingMessages} />
        ) : (
          <>
            {displayedMessages.map((msg) => (
              <Message
                key={msg.clientId}
                message={msg}
                sender={
                  msg.sender === user._id || !msg.sender
                    ? 'me'
                    : msg.sender === 'admin'
                    ? 'admin'
                    : 'other'
                }
              />
            ))}
            {status && status === 'startTyping' && <MessageTyping />}
          </>
        )}
      </div>
      <div className={classes.earlierMessagesBtn}>
        <IconButton
          onClick={scrollToEnd}
          style={{
            width: '40px',
            height: '40px',
            display: 'none',
          }}
          id='down-arrow'
        >
          <KeyboardArrowDownIcon style={{ fontSize: '25px' }} />
        </IconButton>
      </div>
    </>
  );
};

export default MessagesContainer;
