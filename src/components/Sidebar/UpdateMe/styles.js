import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    zIndex: '200',
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
    left: '-100%',
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
  saveChangesContainer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveChanges: {
    position: 'relative',
    color: 'black',
    '& *': {
      fontSize: '30px',
    },
  },
  savingUpdatingChanges: {
    position: 'absolute',
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

  photoInput: {
    display: 'none',
  },
  inputLabel: {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    backgroundColor: '#eee',
    border: '2px solid #ddd',
    cursor: 'pointer',
    '&>div:hover': {
      opacity: '1',
    },
  },
  cameraIconContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: '0.5',
    '&>*': {
      width: '70%',
      height: '70%',
      position: 'absolute',
    },
  },
  avatarContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
    '&:hover>.controllersContainer': {
      opacity: '1',
    },
    '& .MuiAvatar-root': {
      width: '100%',
      height: '100%',
    },
  },
  controllersContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    zIndex: '10',
    overflow: 'hidden',
    borderRadius: '50%',
    opacity: '0',
  },
  resetPhotoBtn: {
    opacity: '0.3',
    width: '100%',
    height: '50%',
    backgroundColor: 'rgba(255,0,0,0.5)',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
    '&:hover': {
      opacity: '1',
    },
    '&>*': {
      width: '90%',
      height: '90%',
    },
  },
  uploadNewPhoto: {
    opacity: '0.3',
    width: '100%',
    height: '50%',
    backgroundColor: 'rgba(0,0,255,0.5)',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    cursor: 'pointer',
    alignItems: 'center',
    fontSize: '10px',
    '&:hover': {
      opacity: '1',
    },
    '&>*': {
      width: '90%',
      height: '90%',
    },
  },

  profileImage: {
    position: 'absolute',
    zIndex: '1',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
  },

  nameContainer: {
    width: '100%',
    // height: '100px',
    backgroundColor: '#ffffff',
    padding: '10px 15px',
    paddingBottom: '20px',
    boxShadow: '0 1px 3px #ccc, 0 -1px 3px #ccc ',
  },
  yourNameTXT: {
    color: '#009688',
  },
  firstName: {
    padding: '0 5px',
  },
  InputBorder: {
    colorSecondary: '#019688',
  },
  firstNameInput: {
    fontWeight: 'bold',
    '& >.MuiInputLabel-outlined': {
      fontWeight: 'bold',
    },
  },
  aboutContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    padding: '10px 15px',
    marginTop: '10px',
    paddingBottom: '20px',
    boxShadow: '0 1px 3px #ccc, 0 -1px 3px #ccc ',
  },
}));
export default useStyles;
