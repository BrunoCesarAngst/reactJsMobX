import { observable, action, computed, reaction } from 'mobx'
import { createContext } from "react"
import { v4 as uuidv4 } from "uuid"

export interface Todo {
  id?: string;
  title: string;
  completed: boolean;
}

class TodoStore {
  constructor() {

    // As reações rastreiam os observáveis ​​de dentro da própria store. No exemplo abaixo, se a ação a ser definida todos for chamada, ele executará o segundo argumento. 
    reaction(
      () => this.todos,
      _ => console.log(this.todos.length)
    );
  }

  // A ideia é que, quando os dados mudam, o objeto observável notifica os observadores. Para definir uma propriedade como observável, tudo o que precisamos fazer é usar o @observable decorador
@observable todos: Todo[] =[
  { id: uuidv4(), title: 'Item #1', completed: false },
  { id: uuidv4(), title: 'Item #2', completed: false },
  { id: uuidv4(), title: 'Item #3', completed: false },
  { id: uuidv4(), title: 'Item #4', completed: false },
  { id: uuidv4(), title: 'Item #5', completed: true },
  { id: uuidv4(), title: 'Item #6', completed: false },
];

// Ações são qualquer coisa que modifique o estado tornar explícito em seu código onde estão suas ações, marcando-as
@action addTodo = (todo: Todo) => {
  this.todos.push({ ...todo, id: uuidv4() })
}

@action toggleTodo = (id: string) => {
  this.todos = this.todos.map(todo => {
    if (todo.id === id) {
      return {
        ...todo,
      completed: !todo.completed,
      }      
    }
    return todo
  })
}

// Ação é uma forma de alterar um observável (atualizar o estado). Para definir uma ação, decoramos métodos dentro da loja com @action: 
@action removeTodo = (id: string) => {
  this.todos = this.todos.filter(todo => todo.id !== id)
}

// são valores que podem ser derivados do estado existente ou de outros valores calculados, use @computed se quiser produzir reativamente um valor que pode ser usado por outros observadores
@computed get info() {
  return {
    total: this.todos.length,
    completed: this.todos.filter(todo => todo.completed).length,
    notCompleted: this.todos.filter(todo => !todo.completed).length,
  }
}
}

// O contexto fornece uma maneira de passar dados pela árvore de componentes sem ter que passar propriedades manualmente em todos os níveis
export default createContext(new TodoStore())