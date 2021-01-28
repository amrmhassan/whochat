import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90vw',
    height: '90vh',
  },

  dialogContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: '30px 0',
    backgroundColor: '#f1f1f1',
  },
  link: {
    color: '#333333',
    textDecoration: 'none',
  },
}));
export default useStyles;
