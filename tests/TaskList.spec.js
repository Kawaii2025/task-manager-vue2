import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TaskList from '../src/components/TaskList.vue'
import TaskItem from '../src/components/TaskItem.vue'
import Vue from 'vue'

Vue.filter('capitalize', function(value) {
  if (!value) return ''
  return value.charAt(0).toUpperCase() + value.slice(1)
})

describe('TaskList Component', () => {
  const mockTasks = [
    { id: 1, title: 'Task 1', completed: false, priority: 'high', createdAt: '2019-01-15' },
    { id: 2, title: 'Task 2', completed: true, priority: 'medium', createdAt: '2019-01-16' }
  ]

  test('renders correct number of tasks', () => {
    const wrapper = mount(TaskList, {
      propsData: {
        tasks: mockTasks
      }
    })
    
    const items = wrapper.findAllComponents(TaskItem)
    expect(items).toHaveLength(2)
  })

  test('shows empty state when no tasks', () => {
    const wrapper = mount(TaskList, {
      propsData: {
        tasks: []
      }
    })
    
    expect(wrapper.find('.empty-state').exists()).toBe(true)
  })

  test('emits toggle-task event from child', async () => {
    const wrapper = mount(TaskList, {
      propsData: {
        tasks: mockTasks
      }
    })
    
    const firstItem = wrapper.findAllComponents(TaskItem).at(0)
    firstItem.vm.$emit('toggle')
    await wrapper.vm.$nextTick()
    
    expect(wrapper.emitted('toggle-task')).toBeTruthy()
  })
})
