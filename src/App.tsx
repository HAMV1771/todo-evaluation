import React, { createContext, useState } from 'react';

import './App.css';
import TodoList from './components/TodoList';
import { ITodoListItem } from './components/TodoList/TodoListItem';
import NewTodo from './components/NewTodo';
import { Container, Paper } from '@mui/material';

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
  items: [
    {
      id: '1',
      status: false,
      title: "First demo dummy",
      description: "",
    },
    {
      id: '2',
      status: false,
      title: "Second demo dummy",
      description: "",
    },
  ],
};

export const TodoContext = createContext<ITodoContext | null>(null);

function App() {
  const [todoContext, setTodoContext] = useState<ITodoState>(initialState);

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
