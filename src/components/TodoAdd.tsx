import React, { useContext, useState } from "react"
import { observer } from "mobx-react-lite"

import TodoStore from "../stores/TodoStore"

const AddTodo = () => {
  const [title, setTitle] = useState("")

  // useContext permite que você acesse as propriedades de contexto de qualquer lugar em seus componentes. 
  const todoStore = useContext(TodoStore)
  const { addTodo, info } = todoStore

  return (
    <>
      <div className="alert alert-primary">
        <div className="d-inline col-4">
          Total items: &nbsp;
          <span className="badge badge-info">{info.total}</span>
        </div>
        <div className="d-inline col-4">
          Finished items: &nbsp;
          <span className="badge badge-info">{info.completed}</span>
        </div>
        <div className="d-inline col-4">
          Unfinished items: &nbsp;
          <span className="badge badge-info">{info.notCompleted}</span>
        </div>
      </div>
      <div className="form-group">
        <input
          className="form-control"
          type="text"
          value={title}
          placeholder="Todo title..."
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div className="form-group">
        <button
          className="btn btn-primary"
          onClick={_ => {
            addTodo({
              title: title,
              completed: false,
            })
            setTitle("")
          }}
        >
          Add Todo
        </button>
      </div>
    </>
  )
}

// os componentes serão automaticamente renderizados novamente quando os observáveis ​​relevantes forem alterados. Mas também garante que os componentes não sejam renderizados novamente quando não houver relevantes mudanças
export default observer(AddTodo)
