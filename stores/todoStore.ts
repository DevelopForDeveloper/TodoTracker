import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todoStore', {
  state: () => ({
    todos: JSON.parse(localStorage.getItem('todos') || '[]') as { item: string, priority: string }[]
  }),
  actions: {
    addTodo(todo: { item: string, priority: string }) {
      if (this.isDuplicate(todo.item)) {
        alert('This item already exists.');
        return;
      }
      this.todos.push(todo)
      this.saveTodos()
    },
    deleteTodo(index: number) {
      this.todos.splice(index, 1)
      this.saveTodos()
    },
    updateTodo(index: number, updatedTodo: { item: string, priority: string }) {
      if (this.todos[index].item !== updatedTodo.item && this.isDuplicate(updatedTodo.item)) {
        alert('This item already exists.');
        return;
      }
      this.todos[index] = updatedTodo
      this.saveTodos()
    },
    saveTodos() {
      localStorage.setItem('todos', JSON.stringify(this.todos))
    },
    loadTodos() {
      const todos = localStorage.getItem('todos')
      if (todos) {
        this.todos = JSON.parse(todos)
      }
    },
    isDuplicate(item: string) {
      return this.todos.some(todo => todo.item === item);
    },
  }
})
