import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    overflow: 'auto',
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
    position: 'relative',
    zIndex: 10,

    scrollBehavior: 'smooth',
  },

  earlierMessagesBtn: {
    position: 'absolute',
    right: '10px',
    bottom: '70px',
    zIndex: '10',
    backgroundColor: 'white',
    borderRadius: '50%',
    boxShadow: '0 1px 1px 0 rgba(0,0,0,.06),0 2px 5px 0 rgba(0,0,0,.2);',
  },
}));
export default useStyles;
