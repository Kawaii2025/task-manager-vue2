import { describe, test, expect, beforeEach } from 'vitest'
import store from '../src/store'

describe('Vuex Store', () => {
  beforeEach(() => {
    store.replaceState({
      tasks: [
        { id: 1, title: 'Test Task', completed: false, priority: 'medium', createdAt: '2019-01-15' }
      ],
      filter: 'all'
    })
  })

  test('initial state', () => {
    expect(store.state.tasks).toHaveLength(1)
    expect(store.state.filter).toBe('all')
  })

  test('ADD_TASK mutation', () => {
    const newTask = {
      id: 2,
      title: 'New Task',
      completed: false,
      priority: 'high',
      createdAt: new Date().toISOString()
    }
    
    store.commit('ADD_TASK', newTask)
    expect(store.state.tasks).toHaveLength(2)
    expect(store.state.tasks[1].title).toBe('New Task')
  })

  test('TOGGLE_TASK mutation', () => {
    expect(store.state.tasks[0].completed).toBe(false)
    store.commit('TOGGLE_TASK', 1)
    expect(store.state.tasks[0].completed).toBe(true)
  })

  test('REMOVE_TASK mutation', () => {
    store.commit('REMOVE_TASK', 1)
    expect(store.state.tasks).toHaveLength(0)
  })

  test('filteredTasks getter - all', () => {
    store.replaceState({
      tasks: [
        { id: 1, title: 'Task 1', completed: false, priority: 'medium', createdAt: '2019-01-15' },
        { id: 2, title: 'Task 2', completed: true, priority: 'high', createdAt: '2019-01-16' }
      ],
      filter: 'all'
    })
    
    expect(store.getters.filteredTasks).toHaveLength(2)
  })

  test('filteredTasks getter - active', () => {
    store.replaceState({
      tasks: [
        { id: 1, title: 'Task 1', completed: false, priority: 'medium', createdAt: '2019-01-15' },
        { id: 2, title: 'Task 2', completed: true, priority: 'high', createdAt: '2019-01-16' }
      ],
      filter: 'active'
    })
    
    expect(store.getters.filteredTasks).toHaveLength(1)
    expect(store.getters.filteredTasks[0].completed).toBe(false)
  })

  test('taskStats getter', () => {
    store.replaceState({
      tasks: [
        { id: 1, title: 'Task 1', completed: false, priority: 'medium', createdAt: '2019-01-15' },
        { id: 2, title: 'Task 2', completed: true, priority: 'high', createdAt: '2019-01-16' }
      ],
      filter: 'all'
    })
    
    const stats = store.getters.taskStats
    expect(stats.total).toBe(2)
    expect(stats.completed).toBe(1)
    expect(stats.active).toBe(1)
  })

  test('addTask action', () => {
    store.dispatch('addTask', {
      title: 'Action Task',
      priority: 'low'
    })
    
    expect(store.state.tasks).toHaveLength(2)
    expect(store.state.tasks[1].title).toBe('Action Task')
  })
})
