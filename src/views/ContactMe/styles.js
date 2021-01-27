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
    flexDirection: 'column',
    overflow: 'auto',
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
  header: {
    width: '100%',
    height: '200px',
    backgroundColor: '#EDEDED',
    boxShadow: '0 1px 3px #ccc, 0 -1px 3px #ccc ',

    display: 'flex',
    alignItems: 'center',
    padding: '10px',
  },
  myPic: {
    width: '180px',
    height: '180px',
  },
  myName: {
    fontSize: '30px',
    marginLeft: '20px',
  },
  myEmail: {
    marginTop: '15px',
    textAlign: 'left',
    marginLeft: '20px',
    fontSize: '20px',
    '& a': {
      textDecoration: 'none',
      color: '#009688',
    },
  },

  contentContainer: {
    width: '100%',
    paddingTop: '20px',
    '& a': {
      marginRight: '10px',
      cursor: 'pointer',
    },
    '& section': {
      marginBottom: '20px',
      padding: '10px 0',
    },
    '& section:nth-child(even)': {
      backgroundColor: '#EDEDED',

      boxShadow: '0 1px 3px #ccc, 0 -1px 3px #ccc ',
    },
  },

  facebook: {
    fontSize: '50px',
    color: '#314E8D',
  },
  twitter: {
    fontSize: '50px',
    color: '#1CA0F1',
  },
  gmail: {
    fontSize: '50px',
    color: '#F24436',
  },
  phoneContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  whatsApp: {
    fontSize: '50px',
    color: '#0CC042',
    marginRight: '10px',
  },
  phoneNo: {
    display: 'inline-block',
    backgroundColor: 'white',
    padding: '10px 8px',
    borderRadius: '10px',
    boxShadow: '0px 0px 3px  #ccc inset,1px 1px 3px  #ccc inset',
    cursor: 'pointer',
    fontSize: '18px',
  },

  feedbackForm: {
    width: '350px',
    margin: 'auto',
  },

  userFeedBack: {
    padding: '10px 15px',
    border: 'none',
    resize: 'none',
    minHeight: '100px',
    maxHeight: '120px',
    width: '350px',
    boxShadow: '0px 0px 3px  #ccc inset,1px 1px 3px  #ccc inset',
    borderRadius: '10px',
    transition: '0 all',
    outline: 'none',
    lineHeight: '1.5',
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

    '&:focus': {
      backgroundColor: '#eee',
    },
  },
  sendUserFeedBackBtn: {
    backgroundColor: '#049588',
    color: 'white',
    '&:hover': {
      backgroundColor: '#049560',
    },
  },
}));
export default useStyles;
