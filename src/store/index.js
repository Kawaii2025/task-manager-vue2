import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: [
      { id: 1, title: 'Learn Vue 2', completed: true, priority: 'high', createdAt: '2019-01-15' },
      { id: 2, title: 'Build a project', completed: false, priority: 'medium', createdAt: '2019-02-20' },
      { id: 3, title: 'Deploy to production', completed: false, priority: 'low', createdAt: '2019-03-10' }
    ],
    filter: 'all'
  },
  
  getters: {
    filteredTasks: (state) => {
      switch(state.filter) {
        case 'active':
          return state.tasks.filter(t => !t.completed)
        case 'completed':
          return state.tasks.filter(t => t.completed)
        default:
          return state.tasks
      }
    },
    
    taskStats: (state) => ({
      total: state.tasks.length,
      completed: state.tasks.filter(t => t.completed).length,
      active: state.tasks.filter(t => !t.completed).length
    }),
    
    highPriorityTasks: (state) => {
      return state.tasks.filter(t => t.priority === 'high' && !t.completed)
    }
  },
  
  mutations: {
    ADD_TASK(state, task) {
      state.tasks.push(task)
    },
    
    REMOVE_TASK(state, id) {
      const index = state.tasks.findIndex(t => t.id === id)
      if (index > -1) state.tasks.splice(index, 1)
    },
    
    TOGGLE_TASK(state, id) {
      const task = state.tasks.find(t => t.id === id)
      if (task) task.completed = !task.completed
    },
    
    UPDATE_TASK(state, { id, updates }) {
      const task = state.tasks.find(t => t.id === id)
      if (task) Object.assign(task, updates)
    },
    
    SET_FILTER(state, filter) {
      state.filter = filter
    }
  },
  
  actions: {
    addTask({ commit }, taskData) {
      const task = {
        id: Date.now(),
        title: taskData.title,
        completed: false,
        priority: taskData.priority || 'medium',
        createdAt: new Date().toISOString()
      }
      commit('ADD_TASK', task)
    },
    
    removeTask({ commit }, id) {
      commit('REMOVE_TASK', id)
    },
    
    toggleTask({ commit }, id) {
      commit('TOGGLE_TASK', id)
    },
    
    updateTask({ commit }, payload) {
      commit('UPDATE_TASK', payload)
    },
    
    setFilter({ commit }, filter) {
      commit('SET_FILTER', filter)
    }
  }
})
