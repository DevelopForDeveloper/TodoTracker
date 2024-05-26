<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { useTodoStore } from '~/stores/todoStore';

const router = useRouter();
const todoStore = useTodoStore();

// Reactive variables to control the visibility of the input field and store input values
const showInput = ref(false);
const todoItem = ref('');
const priority = ref('medium');

// Method to toggle the visibility of the input field
const toggleInput = () => {
  showInput.value = !showInput.value;
}

// Method to handle the submission of the todo item
const addTodo = () => {
  if (todoItem.value) {
    todoStore.addTodo({
      item: todoItem.value,
      priority: priority.value
    });

    // Clear the input fields
    todoItem.value = '';
    priority.value = 'medium';
    showInput.value = false;
  } else {
    alert('Please enter a todo item.');
  }
}

// Handle keypress for Enter key to submit the form
const handleKeypress = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    addTodo();
  }
}

// Method to navigate to the ABV page
const navigateToABV = () => {
  router.push('/abv');
}

// Priority options
const priorityOptions = [
  { text: '높음', value: 'high' },
  { text: '중간', value: 'medium' },
  { text: '낮음', value: 'low' }
];
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
      <button @click="addTodo">Enter</button>
    </div>
    <!-- Display the list of todo items -->
    <div v-if="todoStore.todos.length > 0">
      <ul>
        <li v-for="(todo, index) in todoStore.todos" :key="index">
          {{ todo.item }} - {{ todo.priority }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
/* Add your styles here if needed */
</style>
