import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TaskForm from '../src/components/TaskForm.vue'

describe('TaskForm Component', () => {
  test('renders correctly', () => {
    const wrapper = mount(TaskForm)
    expect(wrapper.find('.task-form').exists()).toBe(true)
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    expect(wrapper.find('select').exists()).toBe(true)
  })

  test('emits add-task event on submit', async () => {
    const wrapper = mount(TaskForm)
    const input = wrapper.find('input[type="text"]')
    
    await input.setValue('New Task')
    await wrapper.find('form').trigger('submit.prevent')
    
    expect(wrapper.emitted('add-task')).toBeTruthy()
    expect(wrapper.emitted('add-task')[0]).toEqual([{
      title: 'New Task',
      priority: 'medium'
    }])
  })

  test('clears input after submit', async () => {
    const wrapper = mount(TaskForm)
    const input = wrapper.find('input[type="text"]')
    
    await input.setValue('Test Task')
    await wrapper.find('form').trigger('submit.prevent')
    
    expect(input.element.value).toBe('')
  })
})
