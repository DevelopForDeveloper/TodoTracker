import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todoStore', {
  state: () => ({
    todos: [] as { id: number, item: string, priority: string, status: string }[]
  }),
  actions: {
    addTodo(todo: { id: number, item: string, priority: string, status: string }) {
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
    updateTodo(index: number, updatedTodo: { id: number, item: string, priority: string, status: string }) {
      if (this.todos[index].item !== updatedTodo.item && this.isDuplicate(updatedTodo.item)) {
        alert('This item already exists.');
        return;
      }
      this.todos[index] = updatedTodo
      this.saveTodos()
    },
    updateTodoStatus(id: number, status: string) {
      const todo = this.todos.find(todo => todo.id === id);
      if (todo) {
        todo.status = status;
        this.saveTodos();
      }
    },
    isDuplicate(item: string) {
      return this.todos.some(todo => todo.item === item);
    },
    saveTodos() {
      if (typeof window !== 'undefined') {
        localStorage.setItem('todos', JSON.stringify(this.todos))
        console.log('Todos saved to localStorage:', this.todos)
      }
    },
    loadTodos() {
      if (typeof window !== 'undefined') {
        const todos = localStorage.getItem('todos');
        console.log({ todos }, 'loaded from localStorage');

        if (todos) {
          this.todos = JSON.parse(todos);
        }
      }
    },
    isDuplicate(item: string) {
      return this.todos.some(todo => todo.item === item);
    },
  }
})