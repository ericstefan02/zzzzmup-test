<template>
  <button
    type="button"
    class="w-full px-4 py-3 cursor-pointer transition-colors flex items-start justify-between gap-2 text-left"
    :class="
      selected
        ? 'bg-primary-50 text-primary-600 font-semibold'
        : 'text-neutral-700 bg-white hover:bg-neutral-50 hover:text-primary-600'
    "
    :aria-current="selected ? 'true' : undefined"
    @click="handleDepartmentSelect"
  >
    <span class="text-sm leading-snug">{{ department.title }}</span>
    <Icon
      name="ion:chevron-forward"
      size="16"
      class="mt-0.5 shrink-0"
      :class="selected ? 'text-primary-500' : 'text-neutral-300'"
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
