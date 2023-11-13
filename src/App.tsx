import React, { createContext, useState } from 'react';

import './App.css';
import TodoList from './components/TodoList';
import { ITodoListItem } from './components/TodoList/TodoListItem';

interface ITodoState {
  items: ITodoListItem[];
};

interface ITodoContext {
  state: ITodoState;
  set: Function;
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

  return (
    <TodoContext.Provider value={{state: todoContext, set: setTodoContext}}>
      <div className="App">
        <TodoList />
      </div>
    </TodoContext.Provider>
  );
}

export default App;
