import React from 'react';
import useStyle from './styles.js';
import {
  Dialog,
  DialogContent,
  ButtonBase,
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { Link } from 'react-router-dom';

const AddFriends = ({ open, setOpen }) => {
  const classes = useStyle();

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth='xs'
      open={open}
      onClose={handleCloseDialog}
      aria-labelledby='form-dialog-title'
    >
      <DialogContent className={classes.dialogContent}>
        <ButtonBase>
          <Link className={classes.link} to='/addFriend'>
            <Card>
              <CardContent>
                <PersonAddIcon className={classes.addFriendIcon} />
                <Typography>Add Friend</Typography>
              </CardContent>
            </Card>
          </Link>
        </ButtonBase>
        <ButtonBase>
          <Card>
            <CardContent>
              <GroupAddIcon className={classes.addFriendIcon} />
              <Typography>Join Group</Typography>
            </CardContent>
          </Card>
        </ButtonBase>
        <ButtonBase>
          <Card>
            <CardContent>
              <GroupAddIcon className={classes.addFriendIcon} />
              <Typography>Create Group</Typography>
            </CardContent>
          </Card>
        </ButtonBase>
      </DialogContent>
    </Dialog>
  );
};

export default AddFriends;
