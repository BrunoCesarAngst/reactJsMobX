import React from "react";
import TodoList from './components/TodoList';
import TodoAdd from './components/TodoAdd';

function App() {
  return (
    <div className="container">
    <TodoAdd />
    <TodoList />
    </div>
    
  );
}

export default App;
