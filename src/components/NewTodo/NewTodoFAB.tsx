import React from 'react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface IProps {
  onClick: any;
}

const NewTodoFAB = ({onClick}:IProps) => {
  return (
    <Fab color="primary" aria-label="add" onClick={onClick} sx={{
      position: 'absolute',
      bottom: 16,
      right: 16,
    }}>
      <AddIcon />
    </Fab>
  );
};

export default NewTodoFAB;