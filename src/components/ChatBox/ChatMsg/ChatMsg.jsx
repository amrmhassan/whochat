import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useStyle from './styles';
import Header from './Header/Header';
import MessagesContainer from './MessagesContainer/MessagesContainer';
import ChatController from './ChatController/ChatController';
import { getRoomsMessagesAction } from '../../../actions/messageActions';
import {
  acceptRoomAction,
  blockRoomAction,
  unblockRoomAction,
} from '../../../actions/roomActions';
import MessageWrapper from '../../global/MessageWrapper/MessageWrapper';
import AcceptChat from './AcceptChat/AcceptChat';
import Block from './Block/Block';
import UserInfo from './UserInfo/UserInfo';

const ChatMsg = ({ currentOpenRoom, currentOpenRoomId }) => {
  const classes = useStyle();
  const dispatch = useDispatch();

  const [openUserInfo, setOpenUserInfo] = useState(false);

  const { user } = useSelector((s) => s.loginUser);

  useEffect(() => {
    dispatch(getRoomsMessagesAction(currentOpenRoomId));
  }, [currentOpenRoomId, dispatch]);

  const handleAcceptChat = () => {
    dispatch(acceptRoomAction(currentOpenRoomId));
  };
  const handleBlockChat = () => {
    dispatch(
      blockRoomAction(currentOpenRoomId, currentOpenRoom.userToShowOnRoom._id)
    );
  };
  const handleUnBlockChat = () => {
    dispatch(
      unblockRoomAction(currentOpenRoomId, currentOpenRoom.userToShowOnRoom._id)
    );
  };

  return (
    <div className={classes.root}>
      {currentOpenRoomId && (
        <Header
          setOpenUserInfo={setOpenUserInfo}
          currentOpenRoom={currentOpenRoom}
        />
      )}
      {/* //? for showing accepting or blocking messages */}
      {currentOpenRoom.myBlock ||
      currentOpenRoom.otherUserBlock ? null : currentOpenRoomId &&
        !currentOpenRoom.accepted ? (
        currentOpenRoom.otherUser === user._id ? (
          <AcceptChat
            onAccept={handleAcceptChat}
            onBlock={handleBlockChat}
            message={`${currentOpenRoom.userToShowOnRoom.firstName} wants to chat you`}
          ></AcceptChat>
        ) : (
          <MessageWrapper
            message={`Wait until ${currentOpenRoom.userToShowOnRoom.firstName} accept your request`}
          />
        )
      ) : null}
      {/* //? for showing you are blocked or you blocked */}
      {currentOpenRoom.myBlock ? (
        <Block
          message={`You blocked ${currentOpenRoom.userToShowOnRoom.fullName}`}
          onUnBlock={handleUnBlockChat}
        ></Block>
      ) : currentOpenRoom.otherUserBlock ? (
        <Block
          message={`You are blocked from ${currentOpenRoom.userToShowOnRoom.fullName}`}
          severity='error'
        ></Block>
      ) : null}

      {/* //? for showing messages if it is accepted even if it is blocked messages will appear */}

      {currentOpenRoom.accepted && <MessagesContainer user={user} />}
      {currentOpenRoomId &&
        currentOpenRoom.accepted &&
        !currentOpenRoom.myBlock &&
        !currentOpenRoom.otherUserBlock && (
          <ChatController currentOpenRoom={currentOpenRoom} user={user} />
        )}

      <UserInfo open={openUserInfo} setOpenUserInfo={setOpenUserInfo} />

      <div className={classes.bgObjects}></div>
    </div>
  );
};

export default ChatMsg;
