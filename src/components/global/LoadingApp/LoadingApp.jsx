import React from 'react';
import useStyles from './styles';

const LoadingApp = ({ err }) => {
  const classes = useStyles();

  return (
    <>{err ? err : <div className={classes.root}>Loading Main App</div>}</>
  );
};

export default LoadingApp;
