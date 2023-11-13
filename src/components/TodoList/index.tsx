import React, { useContext, useState } from "react";
import { List, Stack, TextField } from "@mui/material";
import TodoListItem, { ITodoListItem } from './TodoListItem';
import { TodoContext } from "../../App";
import Modal from "../Modal/Modal";

const TodoList = () => {
  const ctx = useContext(TodoContext);
  const items = ctx?.state?.items ?? [];
  const [editingTodo, setEditingTodo] = useState<ITodoListItem | null>(null);

  const handleCloseModal = () => {
    setEditingTodo(null);
  }

  const handleSave = () => {
    if(!!editingTodo) {
      ctx?.updateTodo(editingTodo);
    }

    handleCloseModal();
  }

  const handleSubmit = () => {
    handleSave();
  }

  const updateTodoData = (prop:string, val: string) => {
    if(!!editingTodo) {
      setEditingTodo((prevState:any) => {
        return {
          ...prevState,
          [prop]: val
        }
      });
    }
  }

  const handleEditStart = (id:string) => {
    const editingItem = ctx?.state.items.find((item:ITodoListItem) => item.id === id);
    if(!!editingItem) {
      setEditingTodo(editingItem);
    }
  }

  return (
    <>
      <Modal isOpen={!!editingTodo} onClose={handleCloseModal} onSave={handleSave}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              required
              label="Title"
              value={editingTodo?.title ?? ""}
              onChange={(e:any) => updateTodoData("title", e.target.value)}
              />
            <TextField
              label="Description"
              multiline
              minRows={4}
              value={editingTodo?.description ?? ""}
              onChange={(e:any) => updateTodoData("description", e.target.value)}
            />
          </Stack>
        </form>
      </Modal>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {
          items.map((item, itemIndex) => {
            return (
              <TodoListItem key={`todo-list-item-${itemIndex}`} item={item} onEdit={handleEditStart} />
            );
          })
        }
      </List>
    </>
  );
};

export default TodoList;