import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useStyle from './styles';
import NoChat from './NoChat/NoChat';
import ChatMsg from './ChatMsg/ChatMsg';
import { setCurrentOpenRoomAction } from '../../actions/roomActions';

const ChatBox = ({ open, setOpenSideBar, setOpenChatBox, smallScreen }) => {
  const dispatch = useDispatch();
  const currentOpenRoom = useSelector((s) => s.currentOpenRoom);
  const {
    currentOpenRoomId,
    currentOpenRoom: currentOpenRoomData = {},
  } = currentOpenRoom;
  //! here add

  useEffect(() => {
    if (currentOpenRoomId && !currentOpenRoomData._id) {
      dispatch(setCurrentOpenRoomAction(currentOpenRoomId));
    }
  }, [currentOpenRoomData, currentOpenRoomId, dispatch]);

  const classes = useStyle();
  return (
    <div
      className={
        classes.root +
        ' ' +
        (smallScreen ? (open ? classes.open : classes.closed) : '')
      }
    >
      {currentOpenRoomId && currentOpenRoomData._id ? (
        <ChatMsg
          currentOpenRoomId={currentOpenRoomId}
          currentOpenRoom={currentOpenRoomData}
          setOpenSideBar={setOpenSideBar}
          setOpenChatBox={setOpenChatBox}
        />
      ) : (
        <NoChat />
      )}
    </div>
  );
};

export default ChatBox;
