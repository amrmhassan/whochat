import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90vw',
    height: '90vh',
    background: 'white',
    position: 'relative',
    zIndex: '2',
    boxShadow: ' -2px -2px 10px grey',
    display: 'flex',
    textAlign: 'center',
    paddingTop: '30px',
  },
  emailInput: {
    fontWeight: 'bold',
    '& >.MuiInputLabel-outlined': {
      fontWeight: 'bold',
    },
  },
  passwordInput: {
    '& >.MuiInputLabel-outlined': {
      fontWeight: 'bold',
    },
  },
  InputBorder: {
    borderColor: '#019688',
  },
  loginBtn: {
    backgroundColor: '#019688',
    fontWeight: 'bold',
    marginTop: '25px',
    '&:hover': {
      backgroundColor: '#008276',
    },
  },
  notSignedUp: {
    paddingTop: '20px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  signUpLink: {
    textDecoration: 'none',
    color: '#019688',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  lonInTopHeader: {
    display: 'inline-flex',
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginLogo: {
    textAlign: 'center',
    display: 'inline-block',
    width: '75px',
    height: '75px',
    margin: 'auto',
    '&>img': {
      width: '100%',
      height: '100%',
    },
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
    width: '60px',
    height: '60px',
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
    '&:hover>span': {
      opacity: '1',
    },
    '& .MuiAvatar-root': {
      width: '100%',
      height: '100%',
    },
  },
  resetPhotoBtn: {
    opacity: '0',
    zIndex: '10',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,0,0,0.5)',
    borderRadius: '50%',
    position: 'absolute',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
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
}));
export default useStyles;
