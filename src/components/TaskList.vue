<template>
  <div class="task-list">
    <transition-group name="list" tag="div">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @toggle="$emit('toggle-task', task.id)"
        @remove="$emit('remove-task', task.id)"
        @update="$emit('update-task', $event)"
      />
    </transition-group>
    
    <div v-if="tasks.length === 0" class="empty-state">
      <p>No tasks yet. Add one above! 🎉</p>
    </div>
  </div>
</template>

<script>
import TaskItem from './TaskItem.vue'

export default {
  name: 'TaskList',
  
  components: {
    TaskItem
  },
  
  props: {
    tasks: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.task-list {
  min-height: 200px;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #999;
  font-size: 1.2rem;
}

.list-enter-active, .list-leave-active {
  transition: all 0.3s ease;
}

.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-move {
  transition: transform 0.3s ease;
}
</style>
