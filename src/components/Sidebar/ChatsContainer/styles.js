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
  },
}));
export default useStyles;
