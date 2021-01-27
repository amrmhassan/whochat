import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useStyle from './styles';
import ChatGo from './ChatGo/ChatGo';
import { getMyRoomsAction } from '../../../actions/roomActions';
import Message from '../../global/Message/Message';

const ChatsContainer = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const myRooms = useSelector((s) => s.myRooms);
  const {
    loading: loadingMyRooms = true,
    rooms,
    err: errGettingMyRooms,
  } = myRooms;

  useEffect(() => {
    dispatch(getMyRoomsAction());
  }, [dispatch]);
  return (
    <>
      <div className={classes.root}>
        {loadingMyRooms ? (
          <Message message='Loading Chats ...' />
        ) : errGettingMyRooms ? (
          <Message severity='error' message={errGettingMyRooms} />
        ) : rooms.length < 1 ? (
          <Message message="You don't have chats yet 😊" />
        ) : (
          rooms.map((room) => <ChatGo key={room._id} room={room} />)
        )}
      </div>
    </>
  );
};

export default ChatsContainer;
