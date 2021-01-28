import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90vw',
    height: '90vh',
    // minWidth: '650px',
    background: 'white',
    position: 'relative',
    zIndex: '2',
    boxShadow: ' -2px -2px 10px grey',
    display: 'flex',
  },

  '@media (max-width: 1200px)': {
    root: {
      width: '100vw',
      height: '100vh',
    },
  },
}));
export default useStyles;
