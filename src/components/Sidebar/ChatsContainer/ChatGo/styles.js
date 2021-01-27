import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  btnBase: {
    padding: 0,
    margin: 0,
    width: '100%',
    height: '72px',
  },
  root: {
    width: '100%',
    height: '72px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    borderBottom: '1px solid #F5F5F5',
    '&:hover': {
      background: '#F5F5F5',
    },
    overflow: 'hidden',
  },

  avatarContainer: {
    padding: '0 10px',
  },
  info: {
    flex: 1,
    padding: '15px 10px',
    display: 'flex',
    flexDirection: 'column',
  },
  infoTop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '7px',
    width: '100%',
  },
  name: {
    flex: '0.60',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '100%',
    fontWeight: 'bold',
    fontFamily: 'Noto Sans JP, sans-serif',
    textAlign: 'left',
    height: '100%',
  },

  date: {
    flex: '0.40',
    fontSize: '12px',
    color: '#878787',
    fontWeight: 'bold',
    height: '100%',
  },
  lastMsg: {
    width: '150px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontFamily: 'Noto Sans JP, sans-serif',
    color: '#626262',
    fontSize: '90%',
    textAlign: 'left',
  },
  newChat: {
    color: '#009688',
    // fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
  },
  newChatIcon: {
    fontSize: '18px',
    color: '#FF5232',
  },
}));
export default useStyles;
