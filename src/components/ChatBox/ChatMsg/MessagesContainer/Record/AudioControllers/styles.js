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
  controls: {},
  playStopContainer: {},
  slider: {
    width: '100%',
  },
};

const useStyles = makeStyles((theme) => whatsAppStyle);
export default useStyles;
