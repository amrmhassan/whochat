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
    fontSize: '30px',
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
}));
export default useStyles;
