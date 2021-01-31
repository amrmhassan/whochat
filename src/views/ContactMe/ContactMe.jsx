import React, { useState } from 'react';
import useStyles from './styles';
import { Avatar, IconButton, Button } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const ContactMe = () => {
  //? defining some variables
  const classes = useStyles();
  const [userFeedBack, setUserFeedBack] = useState('');

  const handleSubmitUserFeedBack = (e) => {
    e.preventDefault();
    setUserFeedBack('');
  };
  return (
    <>
      <div className={classes.root}>
        <header className={classes.header}>
          <div className={classes.avatarAndBackContainer}>
            <Link
              to='/'
              style={{ width: '20px', height: '20px', marginRight: '20px' }}
            >
              <ArrowBack />
            </Link>

            <Avatar src='/images/other/mine.jpg' className={classes.myPic} />
          </div>

          <div className={classes.info}>
            <div className={classes.myName}>Amr Mohammed Hassan</div>
            <div className={classes.myEmail}>
              <a
                title='Send Gmail Email'
                href='mailto:amrmhassanmarsafa@gmail.com'
              >
                Send Email
              </a>
            </div>
          </div>
        </header>
        <div className={classes.contentContainer}>
          <section>
            <a href='https://www.facebook.com/amrm.hassan.10'>
              <IconButton title='FaceBook Profile'>
                <FacebookIcon className={classes.facebook} />
              </IconButton>
            </a>
            <a href='https://twitter.com/Amr07680989'>
              <IconButton title='Twitter Profile'>
                <TwitterIcon className={classes.twitter} />
              </IconButton>
            </a>
            <a href='https://www.linkedin.com/in/amr-hassan-354985193/'>
              <IconButton title='LinkedIn Profile'>
                <LinkedInIcon className={classes.linkedIn} />
              </IconButton>
            </a>
          </section>
          <section title='WhatsApp Number' className={classes.phoneContainer}>
            <WhatsAppIcon
              title='WhatsApp Number'
              className={classes.whatsApp}
            />
            <div title='WhatsApp Number' className={classes.phoneNo}>
              +20 1147497502
            </div>
          </section>
          <section>
            <form
              onSubmit={handleSubmitUserFeedBack}
              className={classes.feedbackForm}
            >
              <textarea
                className={classes.userFeedBack}
                placeholder='You can leave a me a message here ...'
                onChange={(e) => setUserFeedBack(e.target.value)}
                value={userFeedBack}
              ></textarea>
              <Button
                fullWidth
                variant='contained'
                className={classes.sendUserFeedBackBtn}
                disabled={userFeedBack.trim().length < 5 && true}
                type='submit'
              >
                Send
              </Button>
            </form>
          </section>
        </div>
      </div>
    </>
  );
};

export default ContactMe;
