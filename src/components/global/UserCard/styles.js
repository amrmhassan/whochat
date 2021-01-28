import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: '20px',
    display: 'inline-block',
    width: '300px',
    position: 'relative',
  },
  media: {
    height: 140,
  },
  userPhotoContainer: {
    width: '100%',
    padding: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: '1px solid #ccc',
  },
  userPhoto: {
    width: '200px',
    height: '200px',
  },
  userAbout: {
    textAlign: 'left',
  },
}));

export default useStyles;
