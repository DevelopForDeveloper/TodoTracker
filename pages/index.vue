<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useTodoStore } from '~/stores/todoStore'

// Reactive variables to control the visibility of the input field and store input values
const showInput = ref(false)
const todoItem = ref('')
const priority = ref('medium')
const editIndex = ref(-1)

// Method to toggle the visibility of the input field and initialize input values
const toggleInput = () => {
  showInput.value = !showInput.value
  editIndex.value = -1
  todoItem.value = ''
  priority.value = 'medium'
}

// Method to handle the submission of the todo item
const addOrUpdateTodo = () => {
  if (!todoItem.value) {
    alert('Please enter a todo item.')
    return
  }

  if (editIndex.value === -1) {
    addTodo({
      item: todoItem.value,
      priority: priority.value
    })
  } else {
    updateTodo(editIndex.value, {
      item: todoItem.value,
      priority: priority.value
    })
  }

  toggleInput()
}

// Pure function to add a todo
const addTodo = (todo: { item: string, priority: string }) => {
  const todoStore = useTodoStore()
  todoStore.addTodo(todo)
}

// Pure function to update a todo
const updateTodo = (index: number, updatedTodo: { item: string, priority: string }) => {
  const todoStore = useTodoStore()
  todoStore.updateTodo(index, updatedTodo)
}

// Method to delete a todo item
const deleteTodo = (index: number) => {
  const todoStore = useTodoStore()
  todoStore.deleteTodo(index)
}

// Handle keypress for Enter key to submit the form
const handleKeypress = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    addOrUpdateTodo()
  }
}

// Load todos from local storage when component is mounted
onMounted(() => {
  const todoStore = useTodoStore()
  todoStore.loadTodos()
})

// Method to prepare editing a todo item
const prepareEditTodo = (index: number) => {
  const todoStore = useTodoStore()
  const todo = todoStore.todos[index]
  todoItem.value = todo.item
  priority.value = todo.priority
  showInput.value = true
  editIndex.value = index
}

// Priority options
const priorityOptions = [
  { text: '높음', value: 'high' },
  { text: '중간', value: 'medium' },
  { text: '낮음', value: 'low' }
]
</script>

<template>
  <div id="app">
    <div>TODOLIST</div>
    <button @click="toggleInput">ADD</button>
    <!-- Conditionally render the input field based on the reactive variable -->
    <div v-if="showInput">
      <input
        type="text"
        v-model="todoItem"
        placeholder="Enter todo item"
        @keypress="handleKeypress"
      />
      <select v-model="priority" @keypress="handleKeypress">
        <option
          v-for="option in priorityOptions"
          :key="option.value"
          :value="option.value"
        >
          {{ option.text }}
        </option>
      </select>
      <button @click="addOrUpdateTodo">{{ editIndex.value === -1 ? 'Enter' : 'Update' }}</button>
    </div>
    <!-- Display the list of todo items -->
    <div v-if="useTodoStore().todos.length > 0">
      <ul>
        <li v-for="(todo, index) in useTodoStore().todos" :key="index">
          {{ todo.item }} - {{ todo.priority }}
          <button @click="prepareEditTodo(index)">Edit</button>
          <button @click="deleteTodo(index)">Delete</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
/* Add your styles here if needed */
</style>
