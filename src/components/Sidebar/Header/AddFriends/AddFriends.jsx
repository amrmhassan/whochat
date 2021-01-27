import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useStyle from './styles.js';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  createMuiTheme,
  DialogActions,
  ThemeProvider,
  Button,
  CircularProgress,
} from '@material-ui/core';
import Message from '../../../global/Message/Message';
import { green } from '@material-ui/core/colors';
import { createRoomAction } from '../../../../actions/roomActions';

import { CREATE_ROOM_RESET } from '../../../../constants/roomConstants';

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

const AddFriends = ({ open, setOpen }) => {
  const classes = useStyle();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');

  const createRoom = useSelector((s) => s.createRoom);
  const {
    loading: createRoomLoading,
    success: createRoomSuccess,
    err: createRoomErr,
  } = createRoom;

  const handleCloseDialog = () => {
    setOpen(false);
    setEmail('');
  };

  const handleAddNewChat = (e) => {
    e.preventDefault();
    dispatch(createRoomAction(`${email}`.trim()));
  };

  useEffect(() => {
    createRoomSuccess && setEmail('');
  }, [createRoomSuccess]);

  useEffect(() => {
    if (createRoomSuccess) {
      dispatch({
        type: CREATE_ROOM_RESET,
      });
      setOpen(false);
    }
  }, [createRoomSuccess, dispatch, setOpen]);

  return (
    <Dialog
      fullWidth={true}
      maxWidth='md'
      className={classes.test}
      open={open}
      onClose={handleCloseDialog}
      aria-labelledby='form-dialog-title'
    >
      {createRoomLoading ? (
        <Message message='Creating new chat ...' />
      ) : createRoomErr ? (
        <Message severity='error' message={createRoomErr} />
      ) : createRoomSuccess ? (
        <Message severity='success' message='Room created successfully' />
      ) : (
        <DialogTitle id='form-dialog-title'>
          Enter Other Person Email{' '}
        </DialogTitle>
      )}
      <form onSubmit={handleAddNewChat}>
        <DialogContent>
          <ThemeProvider theme={theme}>
            <TextField
              className={classes.text}
              autoFocus
              margin='dense'
              id='email'
              label='Email Address'
              type='email'
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              disabled={createRoomLoading}
            />
          </ThemeProvider>
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.addChatDialogBtn}
            onClick={handleCloseDialog}
            variant='contained'
          >
            Cancel
          </Button>
          <Button
            className={classes.addChatDialogBtn}
            disabled={email.length < 1 || createRoomLoading}
            variant='contained'
            type='submit'
            endIcon={
              createRoomLoading && (
                <CircularProgress
                  style={{ color: 'black', width: '20px', height: '20px' }}
                />
              )
            }
          >
            Add Chat
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddFriends;
