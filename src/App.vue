<template>
  <div id="app">
    <header class="app-header">
      <h1>📋 Task Manager</h1>
      <div class="stats">
        <span>Total: {{ taskStats.total }}</span>
        <span>Active: {{ taskStats.active }}</span>
        <span>Done: {{ taskStats.completed }}</span>
      </div>
    </header>

    <div class="container">
      <TaskForm @add-task="addTask" />
      
      <FilterBar 
        :current-filter="filter"
        @change-filter="setFilter"
      />
      
      <TaskList 
        :tasks="filteredTasks"
        @toggle-task="toggleTask"
        @remove-task="removeTask"
        @update-task="updateTask"
      />
      
      <div v-if="highPriorityTasks.length > 0" class="alert">
        ⚠️ You have {{ highPriorityTasks.length }} high priority task(s)!
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import TaskForm from './components/TaskForm.vue'
import TaskList from './components/TaskList.vue'
import FilterBar from './components/FilterBar.vue'

export default {
  name: 'App',
  
  components: {
    TaskForm,
    TaskList,
    FilterBar
  },
  
  computed: {
    ...mapState(['filter']),
    ...mapGetters(['filteredTasks', 'taskStats', 'highPriorityTasks'])
  },
  
  methods: {
    ...mapActions(['addTask', 'removeTask', 'toggleTask', 'updateTask', 'setFilter'])
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

#app {
  padding: 2rem;
}

.app-header {
  text-align: center;
  color: white;
  margin-bottom: 2rem;
}

.app-header h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.stats {
  display: flex;
  gap: 2rem;
  justify-content: center;
  font-size: 1.1rem;
}

.stats span {
  background: rgba(255,255,255,0.2);
  padding: 0.5rem 1rem;
  border-radius: 20px;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
}

.alert {
  margin-top: 2rem;
  padding: 1rem;
  background: #fff3cd;
  border-left: 4px solid #ffc107;
  border-radius: 4px;
  color: #856404;
}
</style>
