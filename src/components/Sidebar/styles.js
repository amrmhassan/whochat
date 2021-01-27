import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    borderRight: '2px solid #E5E5E6',
    flex: '0.35',
    position: 'relative',
    //? you can control width to 0 by setting flex=0 && width=0
    //? for full screen remove width=0 && set flex=1
    //? on large screens remove width=0 && set flex=0.35
  },
}));
export default useStyles;
