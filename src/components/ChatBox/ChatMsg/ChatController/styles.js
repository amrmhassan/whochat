import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minHeight: '62px',
    backgroundColor: '#F0F0F0',
    position: 'relative',
    zIndex: '10',
    display: 'flex',
    alignItems: 'center',
  },
  msgBox: {
    flex: 1,
    height: '100%',
    padding: '10px 20px',
    paddingRight: '0',
  },
  msgInput: {
    width: '100%',
    height: '100%',
    outline: 'none',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '20px',
    fontSize: '15px',
    color: '#4A4A4A',
    fontFamily: "'Roboto', sans-serif",
    fontWeight: 'bold',
    maxHeight: '200px',
    resize: 'none',
    overflow: 'hidden',
    userSelect: 'none',
    backgroundColor: 'white',
  },
  send: {
    color: '#9B9B9B',
  },

  recordingContainer: {
    padding: '0 5px',
    display: 'flex',
    alignItems: 'center',
  },
  cancelRecording: {
    border: '2px solid #E75E5A',
    color: '#E75E5A',
    '&:hover': {
      backgroundColor: '#E75E5A',
      color: 'white',
    },
  },
  sendRecord: {
    border: '2px solid #37D87E',
    color: '#37D87E',
    '&:hover': {
      backgroundColor: '#37D87E',
      color: 'white',
    },
  },
  recordTimeContainer: {
    margin: '0 8px',
    display: 'flex',
    alignItems: 'center',
  },
  recordingRedDot: {
    width: '15px',
    height: '15px',
    backgroundColor: '#E75E5A',
    borderRadius: '50%',
    display: 'inline-block',
    marginRight: '5px',
    animation: '$animateRedDot 1s infinite ',
  },

  '@keyframes animateRedDot': {
    '0%, 100%': {
      backgroundColor: 'transparent',
    },
    '50%': {
      backgroundColor: '#E75E5A',
    },
  },
}));
export default useStyles;
