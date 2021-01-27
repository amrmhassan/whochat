import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '10px 0',
    width: '100%',
    height: '59px',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'space-between',
    backgroundColor: '#EDEDED',
    boxShadow: '0 1px 2px #ccc',
    zIndex: '10',
  },

  sidebarIcons: {},
  userInfoBtnBase: {},
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
  },
  avatarContainer: {
    marginRight: '10px',
  },
  info: {
    textAlign: 'lef',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  name: {
    width: '100px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '100%',
    fontWeight: 'bold',
    fontFamily: 'Noto Sans JP, sans-serif',
    textAlign: 'left',
  },
  status: {
    //? activate the next line if a problem
    //! width: '150px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontFamily: 'Noto Sans JP, sans-serif',
    color: '#626262',
    fontSize: '90%',
    textAlign: 'left',
  },
}));
export default useStyles;
