import React from 'react';
import useStyle from './styles';
import { Link } from 'react-router-dom';

const NoChat = () => {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <img
        className={classes.mainLogo}
        src='/images/other/noChatImg.jpg'
        alt='main logo'
      />
      <h1 className={classes.mainText}>Welcome to WhatsApp Clone</h1>
      <div className={classes.subTitle}>
        This is a testing WhatsApp version, not for profiting purposes. <br />
      </div>
      <h1 className={classes.contactMe}>
        Fully programmed by Amr Mohammed Hassan{' '}
        <Link to='/contactMe'>Contact Me</Link>
      </h1>
    </div>
  );
};

export default NoChat;
