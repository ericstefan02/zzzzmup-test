<template>
  <button
    type="button"
    class="w-full px-5 py-3.5 cursor-pointer transition-colors duration-200 flex items-center justify-between border-l-4"
    :class="
      selected
        ? 'bg-primary-100 text-primary-500 border-l-primary-500'
        : 'text-neutral-700 bg-white hover:bg-primary-100 hover:text-primary-500 border-l-transparent'
    "
    :aria-current="selected ? 'true' : undefined"
    @click="handleDepartmentSelect"
  >
    <span class="text-sm font-medium">{{ department.title }}</span>
    <Icon
      name="ion:chevron-forward"
      size="16"
      class="text-neutral-400"
      :class="selected ? 'text-primary-500' : ''"
    />
  </button>
</template>

<script lang="ts" setup>
import type { Department } from '~/types/services'

const emit = defineEmits(['select'])

const { department, selected } = defineProps<{
  department: Department
  selected: boolean
}>()

const handleDepartmentSelect = () => {
  emit('select', department)
}
</script>
