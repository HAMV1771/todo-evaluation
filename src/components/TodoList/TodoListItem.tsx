import React, { useState } from 'react';
import { Checkbox, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export interface ITodoListItem {
  id?: string;
  status: boolean;
  title: string;
  description: string;
};

interface IProps {
  item: ITodoListItem;
}

const TodoListItem = ({item}:IProps) => {
  const handleToggle = () => {
    console.log('toggling', item);
  }

  const handleDelete = () => {
    console.log('deleting', item);
  }

  return (
    <ListItem
      key={item.id}
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="comments"
          onClick={handleDelete}
        >
          <DeleteIcon />
        </IconButton>
      }
      disablePadding
    >
      <ListItemButton role={undefined} onClick={handleToggle} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={item.status}
            tabIndex={-1}
          />
        </ListItemIcon>
        <ListItemText primary={item.title} />
      </ListItemButton>
    </ListItem>
  );
};

export default TodoListItem;