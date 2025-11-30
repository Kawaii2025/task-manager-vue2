import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TaskItem from '../src/components/TaskItem.vue'
import Vue from 'vue'

// Register global filter for tests
Vue.filter('capitalize', function(value) {
  if (!value) return ''
  return value.charAt(0).toUpperCase() + value.slice(1)
})

describe('TaskItem Component', () => {
  const mockTask = {
    id: 1,
    title: 'Test Task',
    completed: false,
    priority: 'medium',
    createdAt: '2019-01-15'
  }

  test('renders task correctly', () => {
    const wrapper = mount(TaskItem, {
      propsData: {
        task: mockTask
      }
    })
    
    expect(wrapper.find('.task-title').exists()).toBe(true)
    expect(wrapper.find('.checkbox').exists()).toBe(true)
  })

  test('displays task title', () => {
    const wrapper = mount(TaskItem, {
      propsData: {
        task: mockTask
      }
    })
    
    const title = wrapper.find('.task-title')
    expect(title.text()).toContain('Test Task')
  })

  test('emits toggle event when checkbox clicked', async () => {
    const wrapper = mount(TaskItem, {
      propsData: {
        task: mockTask
      }
    })
    
    const checkbox = wrapper.find('.checkbox')
    await checkbox.trigger('change')
    
    expect(wrapper.emitted('toggle')).toBeTruthy()
  })

  test('emits remove event when delete clicked', async () => {
    const wrapper = mount(TaskItem, {
      propsData: {
        task: mockTask
      }
    })
    
    const deleteBtn = wrapper.find('.btn-delete')
    await deleteBtn.trigger('click')
    
    expect(wrapper.emitted('remove')).toBeTruthy()
  })
})
