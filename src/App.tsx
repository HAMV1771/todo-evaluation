import React, { createContext, useEffect, useState } from 'react';

import './App.css';
import TodoList from './components/TodoList';
import { ITodoListItem } from './components/TodoList/TodoListItem';
import NewTodo from './components/NewTodo';
import { AppBar, Box, Container, Paper, Toolbar, Typography } from '@mui/material';

interface ITodoState {
  items: ITodoListItem[];
};

interface ITodoContext {
  state: ITodoState;
  newTodo: (todo:ITodoListItem) => void;
  updateTodo: (todo:ITodoListItem) => void;
  checkTodo: (id:string) => void;
  deleteTodo: (id:string) => void;
  moveTodo: (moveTodo:IMoveTodo) => void;
};

interface IMoveTodo {
  removedIndex:number;
  addedIndex:number;
}

const initialState:ITodoState = {
  items: [],
};

const getInitialState = () => {
  const storedState = window.localStorage.getItem("todo-list");
  return !!storedState?.length ? JSON.parse(storedState) : initialState;
}

export const TodoContext = createContext<ITodoContext | null>(null);

function App() {
  const [todoContext, setTodoContext] = useState<ITodoState>(getInitialState());

  const persistState = () => {
    window.localStorage.setItem("todo-list", JSON.stringify(todoContext));
  }

  useEffect(() => {
    persistState();
  }, [todoContext]);

  const newTodo = (todo:ITodoListItem) => {
    setTodoContext((prevState:ITodoState) => ({
      ...prevState,
      items: [
        ...prevState.items,
        todo
      ]
    }));
  }

  const updateTodo = (todo:ITodoListItem) => {
    setTodoContext((prevState:ITodoState) => ({
      ...prevState,
      items: prevState.items.map((item:ITodoListItem) => {
        return item.id === todo.id ? todo : item;
      })
    }));
  }

  const checkTodo = (id:string) => {
    setTodoContext((prevState:ITodoState) => ({
      ...prevState,
      items: prevState.items.map((item:ITodoListItem) => {
        if(item.id === id) {
          return {
            ...item,
            status: !item.status
          };
        }

        return item;
      })
    }));
  }

  const deleteTodo = (id:string) => {
    setTodoContext((prevState:ITodoState) => ({
      ...prevState,
      items: prevState.items.filter((item:ITodoListItem) => item.id !== id)
    }));
  }

  const moveTodo = ({removedIndex, addedIndex}:IMoveTodo) => {
    setTodoContext((prevState:ITodoState) => {
      let items = [...prevState.items];
      items.splice(addedIndex, 0, items.splice(removedIndex, 1)[0]);

      return {
        ...prevState,
        items,
      }
    });
  }

  return (
    <TodoContext.Provider value={{state: todoContext, newTodo, checkTodo, deleteTodo, updateTodo, moveTodo}}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              To-do Evaluation App
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, position: "relative"}}>
          <TodoList />
          <NewTodo />
        </Paper>
      </Container>
    </TodoContext.Provider>
  );
}

export default App;
