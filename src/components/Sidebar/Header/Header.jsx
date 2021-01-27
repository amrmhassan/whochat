import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, IconButton, Menu, MenuItem } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import useStyle from './styles';
import { logoutUser } from '../../../actions/userActions';
import AddFriends from './AddFriends/AddFriends.jsx';
import { Link } from 'react-router-dom';

const Header = ({ setOpenUpdateMe }) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const loginUser = useSelector((s) => s.loginUser);
  const { user } = loginUser;

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  //? for 3 dots menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const ITEM_HEIGHT = 48;

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  //? end for 3 dots menu

  return (
    <div className={classes.root}>
      <IconButton onClick={() => setOpenUpdateMe(true)}>
        <Avatar src={`${user.photo}`} />
      </IconButton>
      {/* <span>{user.firstName}</span> */}
      <div className={classes.sidebarIcons}>
        <AddFriends open={open} setOpen={setOpen} />

        <IconButton onClick={() => setOpen(true)} className={classes.addChat}>
          <Add />
        </IconButton>
        {/* <IconButton>
          <ChatIcon />
        </IconButton> */}
        <IconButton
          aria-label='more'
          aria-controls='long-menu'
          aria-haspopup='true'
          onClick={handleOpenMenu}
        >
          <MoreVertIcon />
        </IconButton>
        <div>
          <Menu
            id='long-menu'
            anchorEl={anchorEl}
            keepMounted
            open={openMenu}
            onClose={handleCloseMenu}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: '20ch',
              },
            }}
          >
            <MenuItem
              onClick={() => {
                handleLogout();
                handleCloseMenu();
              }}
              className={classes.menuItem}
            >
              Logout
            </MenuItem>
            <MenuItem className={classes.menuItem}>
              <Link to='/contactMe'> About Me</Link>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Header;
