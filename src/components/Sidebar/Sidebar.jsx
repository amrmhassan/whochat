import React, { useState } from 'react';
import useStyle from './styles';
import Header from './Header/Header';
import SearchBox from './SearchBox/SearchBox';
import ChatsContainer from './ChatsContainer/ChatsContainer';
import UpdateMe from './UpdateMe/UpdateMe';

const Sidebar = ({ open, smallScreen, setOpenChatBox, setOpenSideBar }) => {
  const classes = useStyle();
  const [openUpdateMe, setOpenUpdateMe] = useState(false);

  return (
    <div
      className={
        classes.root +
        ' ' +
        (smallScreen ? (open ? classes.open : classes.closed) : '')
      }
    >
      <Header setOpenUpdateMe={setOpenUpdateMe} />
      <SearchBox />
      <ChatsContainer
        setOpenChatBox={setOpenChatBox}
        setOpenSideBar={setOpenSideBar}
      />
      {/* Update me component */}
      <UpdateMe setOpenUpdateMe={setOpenUpdateMe} open={openUpdateMe} />
    </div>
  );
};

export default Sidebar;
