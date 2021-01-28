import { makeStyles, fade } from '@material-ui/core';

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
    color: 'Black',
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

  search: {
    marginRight: '30px',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'white',
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },

  inputRoot: {
    color: 'inherit',
    flex: 1,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  link: {
    textDecoration: 'none',
  },
  searchBtn: {},
  searchForm: {
    display: 'flex',
  },
}));
export default useStyles;
