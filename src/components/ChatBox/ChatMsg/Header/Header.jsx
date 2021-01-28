import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Avatar,
  IconButton,
  ButtonBase,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
} from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import { ArrowBack } from '@material-ui/icons';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import useStyle from './styles';
import moment from 'moment';
import {
  deleteRoomAction,
  blockRoomAction,
  unblockRoomAction,
} from '../../../../actions/roomActions';
import { setCurrentChattingUserData } from '../../../../actions/userActions';

const Header = ({
  currentOpenRoom,
  setOpenUserInfo,
  setOpenSideBar,
  setOpenChatBox,
}) => {
  const classes = useStyle();
  const dispatch = useDispatch();

  const [openDialog, setOpenDialog] = useState(false);

  const userData = useSelector((s) => s.currentChattingUserData);
  const { status } = userData;

  // const viewLastSeen = () => {
  //   const date = moment(userData.lastSeenAt).format('hh:mm A');
  //   const today = new Date().getDay
  //   const content = `Last seen at ${date}`;

  //   return content;
  // };
  const viewLastSeen = () => {
    //? for getting the day before the day given
    const getYesterday = (today) => {
      //? i will give it today and it will return the after that
      //? today may be [0, 1, 2, 3, 4, 5, 6]
      if (today === 0) {
        return 6;
      }
      return today - 1;
    };

    //? the custom date
    const customDate = new Date(userData.lastSeenAt);
    const hour = moment(userData.lastSeenAt).format('hh:mm A');
    const customDateObj = {
      day: customDate.getDate(),
      month: customDate.getMonth(),
      year: customDate.getFullYear(),
    };
    //? now date
    const now = new Date(Date.now());
    const nowObj = {
      day: now.getDate(),
      month: now.getMonth(),
      year: now.getFullYear(),
    };
    //? the difference in days
    const differenceDays =
      (new Date(now - customDate) - new Date('1970-01-01')) /
      1000 /
      60 /
      60 /
      24;

    const dayString = (now, customObj, customDate) => {
      if (
        now.day === customObj.day &&
        now.month === customObj.month &&
        now.year === customObj.year
      ) {
        return 'Today';
      } else if (
        getYesterday(now.day) === customObj.day &&
        now.month === customObj.month &&
        now.year === customObj.year
      ) {
        return 'Yesterday';
      } else if (differenceDays <= 7 && differenceDays > 0) {
        //! adding the days for the last week
        console.log('in the last week');
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return days[customDate.getDay()];
      } else if (differenceDays < 0) {
        return 'The custom date is in the future';
      } else {
        return moment(customDate).format('YYYY-MM-DD');
      }
    };

    return `Seen ${dayString(nowObj, customDateObj, customDate)} At ${hour}`;
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDeleteChat = () => {
    dispatch(deleteRoomAction(currentOpenRoom._id));
  };

  const handleBlock = () => {
    dispatch(
      blockRoomAction(currentOpenRoom._id, currentOpenRoom.userToShowOnRoom._id)
    );
    handleCloseMenu();
  };
  const handleUnblock = () => {
    dispatch(
      unblockRoomAction(
        currentOpenRoom._id,
        currentOpenRoom.userToShowOnRoom._id
      )
    );
    handleCloseMenu();
  };

  const handleOpenSideBar = () => {
    setOpenSideBar(true);
    setOpenChatBox(false);
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

  useEffect(() => {
    dispatch(
      setCurrentChattingUserData(
        { userId: userData._id },
        { type: 'new', force: true }
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  return (
    <>
      <div className={classes.root}>
        <div>
          <IconButton
            className={classes.openSideBar}
            size='small'
            onClick={handleOpenSideBar}
          >
            <ArrowBack />
          </IconButton>
          <ButtonBase
            onClick={() => setOpenUserInfo(true)}
            className={classes.userInfoBtnBase}
          >
            <div className={classes.userInfo}>
              <div className={classes.avatarContainer}>
                <Avatar src={userData.photo} />
              </div>
              <div className={classes.info}>
                <div className={classes.name}>{userData.fullName}</div>
                <div className={classes.status}>
                  {status && status === 'startTyping'
                    ? 'Typing ...'
                    : status === 'online'
                    ? 'Online'
                    : status === 'offline'
                    ? viewLastSeen()
                    : status === 'stopTyping'
                    ? 'Online'
                    : ''}
                </div>
              </div>
            </div>
          </ButtonBase>
        </div>

        <div className={classes.sidebarIcons}>
          <IconButton>
            <Search />
          </IconButton>

          <IconButton onClick={handleOpenMenu}>
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
                  setOpenDialog(true);
                  handleCloseMenu();
                }}
                className={classes.menuItem}
              >
                Delete Chat
              </MenuItem>
              <MenuItem
                onClick={currentOpenRoom.myBlock ? handleUnblock : handleBlock}
                className={classes.menuItem}
              >
                {currentOpenRoom.myBlock ? 'Unblock' : 'Block'}
              </MenuItem>
            </Menu>
          </div>

          <Dialog
            open={openDialog}
            keepMounted
            onClose={handleCloseDialog}
            aria-labelledby='alert-dialog-slide-title'
            aria-describedby='alert-dialog-slide-description'
          >
            <DialogTitle id='alert-dialog-slide-title'>
              Delete Chat with {currentOpenRoom.userToShowOnRoom.fullName}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-slide-description'>
                Are you sure you want to deleted this chat.
                <span
                  style={currentOpenRoom.myBlock ? { display: 'none' } : {}}
                >
                  <Button
                    onClick={() => {
                      handleBlock();
                      handleCloseDialog();
                    }}
                    variant='text'
                    color='secondary'
                  >
                    Block
                  </Button>
                  Instead?
                </span>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color='primary'>
                No
              </Button>
              <Button
                onClick={() => {
                  handleDeleteChat();
                  handleCloseDialog();
                }}
                color='secondary'
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default Header;
