import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#F8F9FA',
    height: '100%',
    overflow: 'hidden',
    flex: '0.65',
    //? you can control width to 0 by setting flex=0 && width=0
    //? for full screen remove width=0 && set flex=1
    //? on large screens remove width=0 && set flex=0.65
  },
  closed: {
    flex: 0,
    width: 0,
  },
  open: {
    width: '100%',
    flex: '1',
  },
}));
export default useStyles;
