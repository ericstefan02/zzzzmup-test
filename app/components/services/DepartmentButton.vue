<template>
  <button
    type="button"
    class="w-full py-3 cursor-pointer transition-colors flex items-start justify-between gap-2 text-left"
    :class="[
      depth === 0 ? 'px-4' : 'pl-8 pr-4',
      selected
        ? 'bg-primary-50 text-primary-600 font-semibold'
        : 'text-neutral-700 bg-white hover:bg-neutral-50 hover:text-primary-600',
    ]"
    :aria-current="selected ? 'true' : undefined"
    @click="emit('select')"
  >
    <span class="flex flex-col gap-0.5 min-w-0">
      <span
        class="leading-snug"
        :class="depth === 0 ? 'text-sm' : 'text-[13px] text-neutral-600'"
      >
        {{ title }}
      </span>
      <span v-if="subtitle" class="text-xs text-neutral-400 leading-snug">
        {{ subtitle }}
      </span>
    </span>
    <Icon
      name="ion:chevron-forward"
      size="16"
      class="mt-0.5 shrink-0"
      :class="selected ? 'text-primary-500' : 'text-neutral-300'"
    />
  </button>
</template>

<script lang="ts" setup>
const emit = defineEmits(['select'])

const {
  title,
  selected,
  subtitle = undefined,
  depth = 0,
} = defineProps<{
  title: string
  selected: boolean
  subtitle?: string
  depth?: number
}>()
</script>
