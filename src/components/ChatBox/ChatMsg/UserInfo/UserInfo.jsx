import React from 'react';
import { useSelector } from 'react-redux';
import useStyle from './styles';
import { IconButton, Avatar } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

const UserInfo = ({ open, setOpenUserInfo }) => {
  const classes = useStyle();

  const currentChattingUserData = useSelector((s) => s.currentChattingUserData);
  const { photo, firstName, about, email } = currentChattingUserData;

  return (
    <div className={classes.root + ' ' + (open ? '' : classes.closed)}>
      <div className={classes.header}>
        <div>
          <IconButton
            style={{ color: 'white' }}
            onClick={() => setOpenUserInfo(false)}
          >
            <ArrowBack />
          </IconButton>
          {firstName}
        </div>
        <div className={classes.saveChangesContainer}></div>
      </div>
      <div className={classes.content}>
        <section className={classes.profilePhotoContainer}>
          <div className={classes.avatarContainer}>
            <Avatar
              src={photo}
              alt='user profile'
              className={classes.profileImage}
            />
          </div>
        </section>
        <section className={classes.infoContainer}>
          <header className={classes.infoHeader}>Name</header>
          <p className={classes.infoContent}>{firstName}</p>
        </section>
        <section className={classes.infoContainer}>
          <header className={classes.infoHeader}>Email</header>
          <p className={classes.infoContent}>
            <a className={classes.userEmail} href={`mailto:${email}`}>
              {email}
            </a>
          </p>
        </section>
        <section className={classes.infoContainer}>
          <header className={classes.infoHeader}>About</header>
          <p className={classes.infoContent}>{about}</p>
        </section>
      </div>
    </div>
  );
};

export default UserInfo;
