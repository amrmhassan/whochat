import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'relative',
    zIndex: '10',
    textAlign: 'center',
    '&>button': {
      marginTop: '10px',
      fontWeight: 'bold',
    },
  },
}));
export default useStyles;
