import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FilterBar from '../src/components/FilterBar.vue'

describe('FilterBar Component', () => {
  test('renders all filter buttons', () => {
    const wrapper = mount(FilterBar, {
      propsData: {
        currentFilter: 'all'
      }
    })
    
    const buttons = wrapper.findAll('.filter-btn')
    expect(buttons).toHaveLength(3)
  })

  test('applies active class to current filter', () => {
    const wrapper = mount(FilterBar, {
      propsData: {
        currentFilter: 'active'
      }
    })
    
    const buttons = wrapper.findAll('.filter-btn')
    expect(buttons.at(1).classes()).toContain('active')
  })

  test('emits change-filter event', async () => {
    const wrapper = mount(FilterBar, {
      propsData: {
        currentFilter: 'all'
      }
    })
    
    const button = wrapper.findAll('.filter-btn').at(1)
    await button.trigger('click')
    
    expect(wrapper.emitted('change-filter')).toBeTruthy()
    expect(wrapper.emitted('change-filter')[0]).toEqual(['active'])
  })
})
