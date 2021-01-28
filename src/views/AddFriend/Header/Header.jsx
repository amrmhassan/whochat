import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, ButtonBase, InputBase, Button } from '@material-ui/core';
import useStyle from './styles';
import { Search as SearchIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { searchUsersAction } from '../../../actions/userActions';

const Header = () => {
  const classes = useStyle();
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState('');

  const loginUser = useSelector((s) => s.loginUser);
  const { user } = loginUser;

  const handleSubmitSearchFriends = (e) => {
    e.preventDefault();
    if (searchQuery) {
      dispatch(searchUsersAction(searchQuery));
    }
  };

  return (
    <div className={classes.root}>
      <ButtonBase className={classes.userInfoBtnBase}>
        <Link className={classes.link} to='/'>
          <div className={classes.userInfo}>
            <div className={classes.avatarContainer}>
              <Avatar src={user.photo} />
            </div>
            <div className={classes.info}>
              <div className={classes.name}>{user.fullName}</div>
              <div className={classes.status}>Me</div>
            </div>
          </div>
        </Link>
      </ButtonBase>
      <div className={classes.search}>
        <form
          className={classes.searchForm}
          onSubmit={handleSubmitSearchFriends}
        >
          <InputBase
            placeholder='Search…'
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
          <Button
            className={classes.searchBtn}
            disabled={searchQuery.length === 0}
            type='submit'
          >
            <SearchIcon />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Header;
