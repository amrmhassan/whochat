import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: '10px 8%',
    position: 'relative',
    '&>div': {
      maxWidth: '90%',
    },
  },
  //? other person message
  otherMessage: {
    background: 'white',
    padding: '12px 15px',
    display: 'inline-block',
    borderRadius: '0 10px 10px 10px ',
    position: 'relative',
    boxShadow: '0 1px .5px rgba(0, 0, 0,.13)',
  },
  otherMessageText: {
    overflowWrap: ' break-word',
  },

  typingDot: {
    display: 'inline-block',
    width: '10px',
    height: '10px',
    backgroundColor: '#ccc',
    marginRight: '5px',
    borderRadius: '50%',
    animation: 'animateTypingDots 0.75s linear infinite',
    '&:nth-child(1)': {
      animationDelay: '0',
    },
    '&:nth-child(2)': {
      animationDelay: '0.1s',
    },
    '&:nth-child(3)': {
      animationDelay: '0.2s',
      paddingRight: '0',
    },
  },
}));
export default useStyles;
