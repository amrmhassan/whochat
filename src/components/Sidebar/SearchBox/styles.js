import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '49px',
    width: '100%',
    backgroundColor: '#F6F6F6',
    padding: '10px',
    boxShadow: '0 1px 2px #ccc',
    borderBottom: '1px solid #bbb',
  },
  main: {
    background: 'white',
    width: '100%',
    height: '100%',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    padding: '2px 10px',
  },
  searchBox: {
    width: '100%',
    height: '100%',
    outline: '0',
    border: 'none',
  },
  searchIcon: {
    color: '#919191',
    marginRight: '8px',
    fontSize: '20px',
  },
}));
export default useStyles;
