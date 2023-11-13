import React, { useContext } from "react";
import { List } from "@mui/material";
import TodoListItem, { ITodoListItem } from './TodoListItem';
import { TodoContext } from "../../App";

const TodoList = () => {
  const ctx = useContext(TodoContext);
  const items = ctx?.state?.items ?? [];

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {
        items.map((item, itemIndex) => {
          return (
            <TodoListItem key={`todo-list-item-${itemIndex}`} item={item} />
          );
        })
      }
    </List>
  );
};

export default TodoList;