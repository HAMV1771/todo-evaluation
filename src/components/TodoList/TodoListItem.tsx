import React, { useContext, useState } from 'react';
import { Checkbox, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemSecondaryAction, ListItemText } from '@mui/material';
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
  onEdit: Function;
}

const TodoListItem = ({item, onEdit}:IProps) => {
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

  const handleEdit = () => {
    onEdit(item.id);
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
      <ListItemButton onClick={handleToggle} sx={{m:0, p: 1, flex: 0}}>
        <ListItemIcon sx={{p:0, m:0, minWidth: 42}}>
          <Checkbox
            checked={item.status}
          />
        </ListItemIcon>
      </ListItemButton>
      <ListItemButton onClick={handleEdit}>
        <ListItemText primary={item.title} secondary={item.description} />
      </ListItemButton>
    </ListItem>
  );
};

export default TodoListItem;