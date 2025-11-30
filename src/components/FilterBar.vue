<template>
  <div class="filter-bar">
    <button
      v-for="filter in filters"
      :key="filter.value"
      @click="$emit('change-filter', filter.value)"
      :class="['filter-btn', { active: currentFilter === filter.value }]"
    >
      {{ filter.label }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'FilterBar',
  
  props: {
    currentFilter: {
      type: String,
      required: true
    }
  },
  
  data() {
    return {
      filters: [
        { value: 'all', label: 'All' },
        { value: 'active', label: 'Active' },
        { value: 'completed', label: 'Completed' }
      ]
    }
  }
}
</script>

<style scoped>
.filter-bar {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
}

.filter-btn {
  padding: 0.5rem 1rem;
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn:hover {
  border-color: #667eea;
}

.filter-btn.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}
</style>
