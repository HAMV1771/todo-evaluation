import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

interface IProps {
  isOpen: boolean;
  onClose: any;
  onSave: any;
  children: any;
}

const Modal = ({isOpen, onClose, onSave, children}:IProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm">
      <DialogTitle>Add Todo</DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          color="secondary"
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          onClick={onSave}
          variant="contained"
          endIcon={<SaveIcon />}
        >Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;