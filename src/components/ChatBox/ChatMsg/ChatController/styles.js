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
}));
export default useStyles;
