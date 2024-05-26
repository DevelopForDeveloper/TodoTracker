import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todoStore', {
  state: () => ({
    todos: [] as { item: string, priority: string }[]
  }),
  actions: {
    // 저장 기능 추가 
    addTodo(todo: { item: string, priority: string }) {
      this.todos.push(todo);
    },
    deleteTodo(index: number) {
      this.todos.splice(index, 1)
    },
    updateTodo(index: number, updatedTodo: { item: string, priority: string }) {
      this.todos[index] = updatedTodo
    }
  }
});
