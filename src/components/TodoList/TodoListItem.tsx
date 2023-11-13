import React, { useContext, useState } from 'react';
import { Checkbox, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { TodoContext } from '../../App';

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
  const ctx = useContext(TodoContext);

  const handleToggle = () => {
    if(!!item.id) {
      ctx?.checkTodo(item.id);
    }
  }

  const handleDelete = () => {
    if(!!item.id) {
      ctx?.deleteTodo(item.id);
    }
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