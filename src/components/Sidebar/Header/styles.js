import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '10px 0',
    width: '100%',
    height: '59px',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'space-between',
    backgroundColor: '#EDEDED',
    zIndex: '10',
  },
  text: {
    fontWeight: 'bold',
    color: '#009688',
  },
  addChat: {
    border: '1px solid #009688',
    color: '#009688',
  },
  sidebarIcons: {
    '& *': {
      color: '#696969',
    },
  },

  menuItem: {
    fontWeight: 'bold',

    '& a': {
      textDecoration: 'none',
      color: 'black',
    },
  },
  link: {
    width: '100%',
    height: '100%',
  },
}));
export default useStyles;
