<template>
  <div class="task-form">
    <form @submit.prevent="handleSubmit">
      <input
        v-model="taskTitle"
        type="text"
        placeholder="What needs to be done?"
        class="task-input"
        ref="taskInput"
      />
      
      <select v-model="taskPriority" class="priority-select">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      
      <button type="submit" class="btn-add">Add Task</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'TaskForm',
  
  data() {
    return {
      taskTitle: '',
      taskPriority: 'medium'
    }
  },
  
  methods: {
    handleSubmit() {
      if (this.taskTitle.trim()) {
        this.$emit('add-task', {
          title: this.taskTitle,
          priority: this.taskPriority
        })
        this.taskTitle = ''
        this.taskPriority = 'medium'
        this.$refs.taskInput.focus()
      }
    }
  },
  
  mounted() {
    this.$refs.taskInput.focus()
  }
}
</script>

<style scoped>
.task-form {
  margin-bottom: 2rem;
}

form {
  display: flex;
  gap: 0.5rem;
}

.task-input {
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
}

.task-input:focus {
  outline: none;
  border-color: #667eea;
}

.priority-select {
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
}

.btn-add {
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;
}

.btn-add:hover {
  background: #5568d3;
}
</style>
