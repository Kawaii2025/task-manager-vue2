<template>
  <div class="task-item" :class="{ completed: task.completed }">
    <input
      type="checkbox"
      :checked="task.completed"
      @change="$emit('toggle')"
      class="checkbox"
    />
    
    <div class="task-content">
      <div v-if="!editing" class="task-view">
        <span class="task-title">{{ task.title | capitalize }}</span>
        <span class="task-meta">
          <span :class="['priority-badge', task.priority]">
            {{ task.priority }}
          </span>
          <span class="date">{{ formatDate(task.createdAt) }}</span>
        </span>
      </div>
      
      <input
        v-else
        v-model="editTitle"
        @blur="saveEdit"
        @keyup.enter="saveEdit"
        @keyup.esc="cancelEdit"
        class="task-edit-input"
        ref="editInput"
      />
    </div>
    
    <div class="task-actions">
      <button @click="startEdit" class="btn-edit" v-if="!editing">✏️</button>
      <button @click="$emit('remove')" class="btn-delete">🗑️</button>
    </div>
  </div>
</template>

<script>
import formatDateMixin from '../mixins/formatDate'

export default {
  name: 'TaskItem',
  
  mixins: [formatDateMixin],
  
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  
  data() {
    return {
      editing: false,
      editTitle: ''
    }
  },
  
  methods: {
    startEdit() {
      this.editing = true
      this.editTitle = this.task.title
      this.$nextTick(() => {
        this.$refs.editInput.focus()
      })
    },
    
    saveEdit() {
      if (this.editTitle.trim() && this.editTitle !== this.task.title) {
        this.$emit('update', {
          id: this.task.id,
          updates: { title: this.editTitle }
        })
      }
      this.editing = false
    },
    
    cancelEdit() {
      this.editing = false
      this.editTitle = ''
    }
  }
}
</script>

<style scoped>
.task-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border: 2px solid #f0f0f0;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  transition: all 0.2s;
}

.task-item:hover {
  border-color: #667eea;
  transform: translateX(4px);
}

.task-item.completed {
  opacity: 0.6;
  background: #f9f9f9;
}

.checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.task-content {
  flex: 1;
}

.task-view {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.task-title {
  font-size: 1.1rem;
  font-weight: 500;
}

.task-item.completed .task-title {
  text-decoration: line-through;
}

.task-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.85rem;
  color: #666;
}

.priority-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.priority-badge.high {
  background: #fee;
  color: #c00;
}

.priority-badge.medium {
  background: #fef3cd;
  color: #856404;
}

.priority-badge.low {
  background: #e7f3ff;
  color: #004085;
}

.task-edit-input {
  width: 100%;
  padding: 0.5rem;
  border: 2px solid #667eea;
  border-radius: 4px;
  font-size: 1rem;
}

.task-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-edit, .btn-delete {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.btn-edit:hover, .btn-delete:hover {
  opacity: 1;
}
</style>
