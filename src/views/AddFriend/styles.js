import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90vw',
    height: '90vh',
    minWidth: '650px',
    background: 'white',
    position: 'relative',
    zIndex: '2',
    boxShadow: ' -2px -2px 10px grey',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
  },
  usersContainer: {
    width: '100%',
    padding: '20px 30px',
    paddingBottom: '0',
    height: '100%',
    overflow: 'auto',
    textAlign: 'center',

    '&::-webkit-scrollbar': {
      width: '5px',
    },

    '&::-webkit-scrollbar-thumb': {
      background: '#CCCCCC',
      borderRadius: '10px',
    },

    '&::-webkit-scrollbar-thumb:hover': {
      background: '#aaa',
    },
  },

  '@media (max-width: 1200px)': {
    root: {
      width: '100vw',
      height: '100vh',
    },
  },
}));
export default useStyles;
