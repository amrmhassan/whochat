import React from 'react';
import useStyles from './styles';
import Header from './Header/Header';
import { useSelector } from 'react-redux';
import Message from '../../components/global/Message/Message';
import UserCard from '../../components/global/UserCard/UserCard';

const AddFriend = () => {
  const classes = useStyles();

  const searchUsers = useSelector((s) => s.searchUsers);
  const {
    users,
    loading: loadingSearchUsers,
    err: errSearchUsers,
    success: successSearchUsers,
  } = searchUsers;
  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.usersContainer}>
        {loadingSearchUsers ? (
          <Message message='Searching users' />
        ) : errSearchUsers ? (
          <Message severity='error' message={errSearchUsers} />
        ) : users && users.length < 1 ? (
          <Message message='No users' />
        ) : successSearchUsers ? (
          users.map((user) => <UserCard key={user._id} user={user} />)
        ) : (
          <Message message='Search users by name or email' />
        )}
      </div>
    </div>
  );
};

export default AddFriend;
