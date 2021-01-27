import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90vw',
    height: '90vh',
  },

  addChatDialogBtn: {
    color: 'white',
    backgroundColor: '#009688',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: 'rgba(0, 148, 133, 0.66)',
    },
  },
}));
export default useStyles;
