import React, { useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default function SimpleSnackbar({ message }) {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if(message === 'Enter Username') {
        // all good
    } else {
        setOpen(true);
    }
  }, [message]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        bodyStyle={{ backgroundColor: 'teal', color: 'coral' }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={message === 'Incorrect Username' ? 60000 : 2000}
        onClose={handleClose}
        message= {message}
        action={
          <React.Fragment>
            {
              message !== 'Incorrect Username' ?
              <IconButton size="small" aria-label="close" color="Inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
              : ""
            }
            
          </React.Fragment>
        }
      />
    </div>
  );
}
