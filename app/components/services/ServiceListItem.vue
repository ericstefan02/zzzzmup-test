<template>
  <li
    class="bg-white transition-colors duration-200 text-primary-900"
    :class="{ 'hover:bg-primary-50 hover:text-primary-500': !isOpen }"
  >
    <button
      type="button"
      class="w-full px-3 md:px-6 py-4 flex items-center justify-between cursor-pointer gap-3 sm:gap-0"
      :aria-expanded="isOpen"
      @click="isOpen = !isOpen"
    >
      <span
        class="text-left text-sm sm:text-base font-semibold text-primary-900"
        >{{ service.title }}</span
      >
      <span
        class="flex items-center justify-center h-8 w-8 shrink-0 rounded-full hover:bg-neutral-100 transition-colors"
      >
        <Icon
          name="ion:chevron-down"
          size="16"
          class="text-neutral-400 transition-transform duration-300"
          :class="{ 'rotate-180': isOpen }"
        />
      </span>
    </button>
    <div
      class="grid transition-[grid-template-rows] duration-300 ease-out"
      :class="isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
    >
      <div class="overflow-hidden">
        <p class="px-3 md:px-6 pb-4 text-neutral-500 text-sm">
          {{ service.description }}
        </p>
      </div>
    </div>
  </li>
</template>

<script lang="ts" setup>
import type { Service } from '~/types/services'

const { service } = defineProps<{
  service: Service
}>()

const isOpen = ref(false)
</script>
