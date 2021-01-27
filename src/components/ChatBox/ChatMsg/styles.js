import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    backgroundColor: '#E5DDD5',
    position: 'relative',
  },
  bgObjects: {
    backgroundImage: 'url("./images/other/chat_default_background.png")',
    backgroundSize: 'contain',
    backgroundColor: '#E5DDD5',
    backgroundPosition: 'fixed',

    position: 'absolute',
    zIndex: '0',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    opacity: '0.1',
  },
  acceptChat: {
    width: '100%',
    textAlign: 'center',
    padding: '10px 15px',
    '&>button': {
      fontWeight: 'bold',
    },
  },
}));
export default useStyles;
