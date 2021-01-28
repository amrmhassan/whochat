import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useStyles from './styles';
import Sidebar from '../../components/Sidebar/Sidebar';
import ChatBox from '../../components/ChatBox/ChatBox';
import { createSocketAction } from '../../actions/socketActions';
import {
  updateRoomMessagesAction,
  markMessageAsSeen,
} from '../../actions/messageActions';
import {
  updateRoomAction,
  updateRoomWithIdAction,
  updateCurrentOpenRoomAction,
  updateRoomAfterOneDeletedAction,
} from '../../actions/roomActions';
import { setCurrentChattingUserData } from '../../actions/userActions';
import { CREATE_ROOM_RESET } from '../../constants/roomConstants';

const App = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [openSideBar, setOpenSideBar] = useState(true);
  const [openChatBox, setOpenChatBox] = useState(true);
  const [smallScreen, setSmallScreen] = useState(false);

  const loginUser = useSelector((s) => s.loginUser);
  const { user } = loginUser;

  const socket = useSelector((s) => s.socket);

  //? check if user isn't logged in
  useEffect(() => {
    if (!user || !user.token) {
      history.replace('/login');
    } else {
      dispatch(createSocketAction());
    }
  }, [dispatch, history, user]);

  useEffect(() => {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 600) {
      setOpenSideBar(true);
      setOpenChatBox(false);
      setSmallScreen(true);
    }
  }, []);

  //? for displaying room messages if there is a currentOpenRoom
  useEffect(() => {
    if (socket.on) {
      socket.on('server--user-send-message', (data) => {
        //! add get room with id =>DONE
        //! then add action to get room with id and its constant will be update room and put up => DONE
        //! then the payload will be the fetched room by action =>DONE
        //! and then update it => DONE
        //! IMPORTANT this trick is so important to use setMessages(messages=>[])
        //! dispatching updateMessages
        //? this for updating the rooms on the room container
        dispatch(updateRoomWithIdAction(data.room));

        //! add updateDisplayedMessagesAction
        //! the action will check if there is currentOpenRoom and message room is the currentOpenRoom
        //! then the constant will be UPDATE_DISPLAYED_MESSAGES
        //! the reducer will push the new message to the displayed messages
        dispatch(updateRoomMessagesAction(data));
        dispatch(markMessageAsSeen(data));
      });

      socket.on('server--user-added-new-room', (room) => {
        dispatch(updateRoomAction(room));
        dispatch({
          type: CREATE_ROOM_RESET,
        });
      });

      socket.on('server--user-accept-new-room', (room) => {
        dispatch(updateRoomAction(room));
        dispatch(updateCurrentOpenRoomAction(room._id));
      });

      socket.on('server--user-delete-chat', (roomId) => {
        dispatch(updateRoomAfterOneDeletedAction(roomId));
      });

      socket.on('server--user-block-room', (block) => {
        dispatch(updateCurrentOpenRoomAction(block.room));
      });

      socket.on('server--user-unblock-room', (block) => {
        dispatch(updateCurrentOpenRoomAction(block.room));
      });
      socket.on('server--user-online', ({ userId, onlineId }) => {
        dispatch(
          setCurrentChattingUserData({ status: 'online', userId, onlineId })
        );
      });
      socket.on('server--user-offline', ({ userId, lastSeenAt }) => {
        dispatch(
          setCurrentChattingUserData({
            status: 'offline',
            userId,
            lastSeenAt,
          })
        );
      });
      socket.on(
        'server--user-currently-typing',
        ({ userId, typingUserOnlineId }) => {
          dispatch(
            setCurrentChattingUserData({
              status: 'startTyping',
              userId,
              typing: true,
              typingUserOnlineId,
            })
          );
        }
      );

      socket.on(
        'server--user-stopped-typing',
        ({ userId, typingUserOnlineId }) => {
          dispatch(
            setCurrentChattingUserData({
              status: 'stopTyping',
              userId,
              typing: false,
              typingUserOnlineId,
            })
          );
        }
      );

      // socket.on('server--message-delivered', (message) => {
      //   //? dispatch(updateUserStatus({ status: 'online', userId, onlineId }));
      //   dispatch(updateRoomMessagesAction(message));

      // });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, socket]);

  return user && user.token ? (
    <div className={classes.root}>
      <Sidebar
        smallScreen={smallScreen}
        open={openSideBar}
        setOpenChatBox={setOpenChatBox}
        setOpenSideBar={setOpenSideBar}
      />
      <ChatBox
        smallScreen={smallScreen}
        open={openChatBox}
        setOpenSideBar={setOpenSideBar}
        setOpenChatBox={setOpenChatBox}
      />
    </div>
  ) : null;
};

export default App;
