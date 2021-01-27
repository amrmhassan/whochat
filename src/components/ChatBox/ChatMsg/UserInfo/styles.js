import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    zIndex: '20',
    overflow: 'auto',
    backgroundColor: '#EDEDED',
    '&::-webkit-scrollbar': {
      width: '5px',
    },

    '&::-webkit-scrollbar-thumb': {
      background: '#CCCCCC',
      borderRadius: '10px',
    },

    '&::-webkit-scrollbar-thumb:hover': {
      background: '#aaa',
    },
  },
  closed: {
    width: '0',
    height: '0',
  },
  header: {
    padding: '10px',
    paddingBottom: '20px',
    width: '100%',
    height: '108px',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    position: 'relative',
    backgroundColor: '#00BFA5',
    zIndex: '10',
    color: 'white',
    fontSize: '19px',
  },

  profilePhotoContainer: {
    width: '100%',
    backgroundColor: '#EDEDED',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },

  photoContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  avatarContainer: {
    width: '250px',
    height: '250px',
    position: 'relative',
    '&:hover>.controllersContainer': {
      opacity: '1',
    },
    '& .MuiAvatar-root': {
      width: '100%',
      height: '100%',
    },
  },

  profileImage: {
    position: 'absolute',
    zIndex: '100',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
  },
  infoHeader: {
    color: '#009688',
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  userEmail: {
    textDecoration: 'none',
    color: '#555',
  },

  infoContent: {
    color: '#333',
  },

  infoContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    padding: '10px 15px',
    marginTop: '10px',
    paddingBottom: '20px',
    boxShadow: '0 1px 3px #ccc, 0 -1px 3px #ccc ',
  },
}));
export default useStyles;
