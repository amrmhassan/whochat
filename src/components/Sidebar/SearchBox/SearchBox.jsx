import React from 'react';
import useStyle from './styles';
import SearchIcon from '@material-ui/icons/Search';

const SearchBox = () => {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <div className={classes.main}>
        <SearchIcon className={classes.searchIcon} />
        <input
          placeholder='Search chats...'
          className={classes.searchBox}
          type='text'
        />
      </div>
    </div>
  );
};

export default SearchBox;
