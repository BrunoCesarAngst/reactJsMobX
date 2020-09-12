import React, { useContext } from "react";
import TodoStore from "../stores/TodoStore";
import { observer } from "mobx-react-lite";

const TodoList = () => {
  const todoStore = useContext(TodoStore);
  const { todos, toggleTodo, removeTodo } = todoStore;
  return (
    <>
      <div className="row">
        <table className="table table-hover">
          <thead className="thead-light">
            <tr>
              <th>Title</th>
              <th>Completed?</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map(todo => (
              <tr key={todo.id}>
                <td>{todo.title}</td>
                <td>{todo.completed ? "✅" : ""}</td>
                <td>
                  <button
                    className="btn btn-sm btn-info"
                    onClick={_ => toggleTodo(todo.id!)}
                  >
                    Toggle
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={_ => removeTodo(todo.id!)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default observer(TodoList);
// Ambos os componentes usam o observer que é um HOC para tornar os componentes observadores de nossa store. Portanto, qualquer alteração em qualquer um dos observáveis ​​fará com que os componentes React sejam renderizados novamente. 

