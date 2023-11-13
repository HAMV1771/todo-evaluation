import React, { createContext, useState } from 'react';

import './App.css';
import TodoList from './components/TodoList';
import { ITodoListItem } from './components/TodoList/TodoListItem';
import NewTodo from './components/NewTodo';

interface ITodoState {
  items: ITodoListItem[];
};

interface ITodoContext {
  state: ITodoState;
  newTodo: (todo: ITodoListItem) => void;
  checkTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
};

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

  return (
    <TodoContext.Provider value={{state: todoContext, newTodo, checkTodo, deleteTodo}}>
      <div className="App">
        <TodoList />
        <NewTodo />
      </div>
    </TodoContext.Provider>
  );
}

export default App;
