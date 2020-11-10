import { action, makeObservable, observable } from 'mobx'

import { TodoListModel } from '../models/todo_list_model'
import { createContext } from 'react'

export class TodoListPageContext {
  todoList: TodoListModel

  constructor() {
    makeObservable(this, {
      todoList: observable,
      setTodoList: action
    })
    this.todoList = { title: '', description: '' }
  }

  setTodoList = (value) => {
    this.todoList = {
      title: value.target[0].value,
      description: value.target[1].value
    }
  }
}

export const StoreContext = createContext(new TodoListPageContext())
