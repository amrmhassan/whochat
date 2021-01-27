import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F8F9FA',
    borderBottom: '10px solid #4ADF83',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  mainLogo: {
    width: '250px',
    height: '250px',
  },
  mainText: {
    marginTop: '28px',
    fontSize: '32px',
    color: '#525252',
    fontWeight: '300',
    fontFamily: 'Noto Sans JP, sans-serif',
    textAlign: 'center',
    padding: '0 20px',
  },
  subTitle: {
    fontSize: '14px',
    color: '#888989',
    fontFamily: 'Noto Sans JP, sans-serif',
    textAlign: 'center',
    lineHeight: '20px',
    marginTop: '25px',
    padding: '0 50px',
  },
  contactMe: {
    marginTop: '20px',
    fontSize: '20px',
    color: '#525252',
    fontWeight: '300',
    fontFamily: 'Noto Sans JP, sans-serif',
    textAlign: 'center',
    padding: '0 20px',
    '&>a': {
      color: '#009688',
      fontWeight: 'bold',
    },
  },
}));
export default useStyles;
