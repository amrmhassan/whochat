import { makeStyles } from '@material-ui/core';

const whatsAppStyle = {
  root: {
    width: '100%',
    padding: '10px 8%',
    position: 'relative',
    '&>div': {
      maxWidth: '90%',
    },
  },
  //? other person message
  otherMessage: {
    background: 'white',
    padding: '6px 7px 8px 9px',
    display: 'inline-block',
    borderRadius: '0 10px 10px 10px ',
    position: 'relative',
    boxShadow: '0 1px .5px rgba(0, 0, 0,.13)',
    width: '300px',
  },
  otherMessageText: {
    padding: '15px 0',
    overflowWrap: ' break-word',
  },
  otherMessageDate: {
    textAlign: 'right',
    fontSize: '11px',
    color: '#8C8C8C',
  },
  //? my message
  myMessage: {
    background: '#DCF8C6',
    padding: '6px 7px 8px 9px',
    display: 'inline-block',
    borderRadius: '10px 0 10px 10px ',
    position: 'relative',
    boxShadow: '0 1px .5px rgba(0, 0, 0,.13)',
    width: '300px',
  },
  myMessageText: {
    padding: '15px 0',
    overflowWrap: ' break-word',
  },
  myMessageDate: {
    textAlign: 'right',
    fontSize: '11px',
    color: '#8C8C8C',
  },
  msgStatus: {
    paddingLeft: '5px',
    '& > img': {
      width: '15px',
      height: 'auto',
    },
  },
  //? Admin Message
  adminMessage: {
    display: 'inline-block',
    backgroundColor: '#E3F6FE',
    boxShadow: '0 1px .5px rgba(0, 0,0,.13)',
    padding: '10px 12px',
    borderRadius: '10px',
    textTransform: 'uppercase',
    color: '#1D1E1F',
    fontSize: '12.5px',
    fontFamily: "'Roboto Condensed', sans-serif ",
    fontWeight: 'bold',
    userSelect: 'none',
  },
};

//? messengerStyle
const messengerStyle = {
  root: {
    width: '100%',
    padding: '10px 8%',
    position: 'relative',
    '&>div': {
      maxWidth: '90%',
    },
  },
  //? other person message
  otherMessage: {
    background: '#d9d9d9',
    padding: '6px 7px 8px 9px',
    display: 'inline-block',
    borderRadius: '0 10px 10px 10px ',
    position: 'relative',
    boxShadow: '0 1px .5px rgba(0, 0, 0,.13)',
  },
  otherMessageText: {
    padding: '15px 0',
    overflowWrap: ' break-word',
  },
  otherMessageDate: {
    textAlign: 'right',
    fontSize: '11px',
    color: '#8C8C8C',
  },
  //? my message
  myMessage: {
    background: '#DCF8C6',
    padding: '6px 7px 8px 9px',
    display: 'inline-block',
    borderRadius: '10px 0 10px 10px ',
    position: 'relative',
    boxShadow: '0 1px .5px rgba(0, 0, 0,.13)',
  },
  myMessageText: {
    padding: '15px 0',
    overflowWrap: ' break-word',
  },
  myMessageDate: {
    textAlign: 'right',
    fontSize: '11px',
    color: '#8C8C8C',
  },
  msgStatus: {
    paddingLeft: '5px',
    '& > img': {
      width: '15px',
      height: 'auto',
    },
  },
  //? Admin Message
  adminMessage: {
    display: 'inline-block',
    backgroundColor: '#E3F6FE',
    boxShadow: '0 1px .5px rgba(0, 0,0,.13)',
    padding: '10px 12px',
    borderRadius: '10px',
    textTransform: 'uppercase',
    color: '#1D1E1F',
    fontSize: '12.5px',
    fontFamily: "'Roboto Condensed', sans-serif ",
    fontWeight: 'bold',
    userSelect: 'none',
  },
};
const useStyles = makeStyles((theme) => whatsAppStyle);
export default useStyles;
