import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todoStore', {
  state: () => ({
    todos: [] as { item: string, priority: string }[]
  }),
  actions: {
    addTodo(todo: { item: string, priority: string }) {
      this.todos.push(todo);
    }
  }
});
