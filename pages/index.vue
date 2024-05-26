<script setup lang="ts">
import { ref, onMounted, computed, watchEffect, toRaw } from 'vue'
import { useTodoStore } from '~/stores/todoStore'
import draggable from 'vuedraggable'
import { dev } from 'process'

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
  const todoStore = useTodoStore()
  
  if (!todoItem.value) {
    alert('Please enter a todo item.')
    return
  }

  if (editIndex.value === -1) {
    addTodo({
      id: Date.now(), // unique ID
      item: todoItem.value,
      priority: priority.value,
      status: 'todo'
    })
  } else {
    updateTodo(editIndex.value, {
      id: editIndex.value,
      item: todoItem.value,
      priority: priority.value,
      status: todoStore.todos.find(todo => todo.id === editIndex.value)?.status || 'todo'
    })
  }

  toggleInput()
}

// Pure function to add a todo
const addTodo = (todo: { id: number, item: string, priority: string, status: string }) => {
  const todoStore = useTodoStore()
  if (todoStore.isDuplicate(todo.item)) {
    alert('This item already exists.');
    return;
  }
  todoStore.addTodo(todo)
}

// Pure function to update a todo
const updateTodo = (id: number, updatedTodo: { id: number, item: string, priority: string, status: string }) => {
  const todoStore = useTodoStore()
  const index = todoStore.todos.findIndex(todo => todo.id === id)
  if (index !== -1) {
    todoStore.updateTodo(index, updatedTodo)
  }
}

// Method to delete a todo item
const deleteTodo = (index: number) => {
  const todoStore = useTodoStore()
  todoStore.deleteTodo(index)
}

// Method to delete a todo item by id
const deleteTodoById = (id: number) => {
  const todoStore = useTodoStore()
  const index = todoStore.todos.findIndex(todo => todo.id === id)
  if (index !== -1) {
    todoStore.deleteTodo(index)
  }
}

// Handle keypress for Enter key to submit the form
const handleKeypress = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    addOrUpdateTodo()
  }
}

// Method to prepare editing a todo item
const prepareEditTodo = (id: number) => {
  const todoStore = useTodoStore()
  const todo = todoStore.todos.find(todo => todo.id === id)
  if (todo) {
    todoItem.value = todo.item
    priority.value = todo.priority
    showInput.value = true
    editIndex.value = id
  }
}

// Priority options
const priorityOptions = [
  { text: '높음', value: 'high' },
  { text: '중간', value: 'medium' },
  { text: '낮음', value: 'low' }
]

// Computed properties to separate todos by status
const todos = computed(() => {
  const todoStore = useTodoStore();
  return {
    todo: toRaw(todoStore.todos.filter(todo => todo.status === 'todo')),
    inProgress: toRaw(todoStore.todos.filter(todo => todo.status === 'inProgress')),
    done: toRaw(todoStore.todos.filter(todo => todo.status === 'done'))
  }
})

// Watcher to log data
watchEffect(() => {
  console.log('Todos:', todos.value)
})

// Handle drag and drop change event
const onDragChange = (evt) => {
  const todoStore = useTodoStore()
  debugger
  const { moved, added, removed } = evt
  if (moved || added || removed) {
    const fromStatus = removed ? removed.element.status : moved.oldIndex < added.newIndex ? added.element.status : null
    const toStatus = added ? added.element.status : moved.oldIndex > added.newIndex ? added.element.status : null
    console.log({fromStatus})
    if (fromStatus && toStatus && fromStatus !== toStatus) {
      const id = added ? added.element.id : moved.element.id
      todoStore.updateTodoStatus(id, toStatus)
    }
  }
}

// Use Nuxt lifecycle hook to ensure client-side execution
onMounted(() => {
  if (process.client) {
    const todoStore = useTodoStore()
    todoStore.loadTodos()
    console.log('Loaded Todos:', todoStore.todos)  // 데이터 로드 상태 확인
  }
})
</script>

<template>
  <div id="app">
    <div>TODOLIST</div>
    <button @click="toggleInput">ADD</button>
    <div v-if="showInput">
      <input
        type="text"
        v-model="todoItem"
        placeholder="Enter todo item"
        @keypress="handleKeypress"
      />
      <select v-model="priority" @keypress="handleKeypress">
        <option v-for="option in priorityOptions" :key="option.value" :value="option.value">
          {{ option.text }}
        </option>
      </select>
      <button @click="addOrUpdateTodo">{{ editIndex.value === -1 ? 'Enter' : 'Update' }}</button>
    </div>
    <div class="kanban-board">
      <div class="kanban-column" data-status="todo">
        <h2>Todo</h2>
        <client-only>
          <draggable :list="todos.todo" :group="{ name: 'todos', pull: 'clone', put: false }" @change="onDragChange">
            <template #item="{ element }">
              <div class="kanban-item">
                {{ element.item }} - {{ element.priority }}
                <button @click="prepareEditTodo(element.id)">Edit</button>
                <button @click="deleteTodoById(element.id)">Delete</button>
              </div>
            </template>
          </draggable>
        </client-only>
      </div>
      <div class="kanban-column" data-status="inProgress">
        <h2>In Progress</h2>
        <client-only>
          <draggable :list="todos.inProgress" group="todos" @change="onDragChange">
            <template #item="{ element }">
              <div class="kanban-item">
                {{ element.item }} - {{ element.priority }}
                <button @click="prepareEditTodo(element.id)">Edit</button>
                <button @click="deleteTodoById(element.id)">Delete</button>
              </div>
            </template>
          </draggable>
        </client-only>
      </div>
      <div class="kanban-column" data-status="done">
        <h2>Done</h2>
        <client-only>
          <draggable :list="todos.done" group="todos" @change="onDragChange">
            <template #item="{ element }">
              <div class="kanban-item">
                {{ element.item }} - {{ element.priority }}
                <button @click="prepareEditTodo(element.id)">Edit</button>
                <button @click="deleteTodoById(element.id)">Delete</button>
              </div>
            </template>
          </draggable>
        </client-only>
      </div>
    </div>
  </div>
</template>

<style scoped>
.kanban-board {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.kanban-column {
  width: 30%;
  padding: 10px;
  background-color: #f4f4f4;
  border-radius: 5px;
}

.kanban-item {
  padding: 10px;
  margin: 10px 0;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
