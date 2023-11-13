import React, { useContext, useState } from "react";
import { List, ListItem, ListItemText, Stack, TextField, Typography } from "@mui/material";
import { Container, Draggable } from '@smooth-dnd/react'
import AddReactionIcon from '@mui/icons-material/AddReaction';

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

  const handleDrop = (dropResult:any) => {
    const {removedIndex, addedIndex} = dropResult;
    if(removedIndex >= 0 && addedIndex >= 0) {
      ctx?.moveTodo({removedIndex, addedIndex})
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
      <List sx={{ width: '100%', maxHeight: "60vh", overflow:"auto" }}>
        <Container onDrop={handleDrop}>
          {
            items.map((item, itemIndex) => {
              return (
                <Draggable key={item.id}>
                  <TodoListItem item={item} onEdit={handleEditStart} />
                </Draggable>
              );
            })
          }
        </Container>
        {
          !items.length && (
            <ListItem>
              <ListItemText primary={<><AddReactionIcon sx={{fontSize: '3rem', color:"#00a819"}} /><Typography color="#00a819" variant="h2">Well Done!</Typography></>} secondary="Your to-do list is empty, to get started, click the add button!" />
            </ListItem>
          )
        }
      </List>
    </>
  );
};

export default TodoList;