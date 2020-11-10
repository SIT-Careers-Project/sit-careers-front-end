import React, { useContext } from 'react'

import Navbar from '../../../core/components/Navbar'
import { NextPage } from 'next'
import { StoreContext } from '../store/ToDoListStore'
import { useObserver } from 'mobx-react-lite'

const TodoListPage: NextPage = () => {
  const context = useContext(StoreContext)
  return useObserver(() => (
    <>
      <Navbar />
      <div className="container flex flex-col items-center justify-center mx-auto max-w-1280">
        <div className="grid grid-flow-col grid-cols-12 gap-8">
          <form
            onSubmit={(value) => {
              value.preventDefault()
              context.setTodoList(value)
            }}>
            Title:
            <input className="border-b-2 border-primary" type="text" name="title" />
            <br />
            Description:
            <input className="border-b-2 border-primary" type="text" name="description" />
            <button type="submit">Submit</button>
          </form>
          <hr />
          <h3>Title: {context.todoList.title}</h3>
          <h3>Description: {context.todoList.description}</h3>
        </div>
      </div>
    </>
  ))
}

export default TodoListPage
