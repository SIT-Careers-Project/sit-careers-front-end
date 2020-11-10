import api from '../../../utils/api'

const TodoList = {
  getTodoList: async () => {
    const response = await api.get('/todo-list')
    return response
  }
}

export default TodoList
