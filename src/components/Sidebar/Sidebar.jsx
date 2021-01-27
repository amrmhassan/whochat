import React, { useState } from 'react';
import useStyle from './styles';
import Header from './Header/Header';
import SearchBox from './SearchBox/SearchBox';
import ChatsContainer from './ChatsContainer/ChatsContainer';
import UpdateMe from './UpdateMe/UpdateMe';

const Sidebar = () => {
  const classes = useStyle();
  const [openUpdateMe, setOpenUpdateMe] = useState(false);

  return (
    <div className={classes.root}>
      <Header setOpenUpdateMe={setOpenUpdateMe} />
      <SearchBox />
      <ChatsContainer />
      {/* Update me component */}
      <UpdateMe setOpenUpdateMe={setOpenUpdateMe} open={openUpdateMe} />
    </div>
  );
};

export default Sidebar;
