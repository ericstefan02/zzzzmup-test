<template>
  <div
    class="w-full px-8 py-5 bg-white border-y border-neutral-100 hover:bg-neutral-50 transition-colors"
  >
    <button
      type="button"
      class="w-full flex items-center justify-between gap-4 cursor-pointer"
      :aria-expanded="isOpen"
      @click="isOpen = !isOpen"
    >
      <h3 class="font-semibold text-primary-900 text-lg text-left">
        {{ faqItem.question }}
      </h3>
      <span
        class="flex items-center justify-center h-8 w-8 shrink-0 rounded-full hover:bg-neutral-100 transition-colors"
      >
        <Icon
          name="ion:chevron-down"
          size="16"
          class="text-neutral-500 transition-transform duration-300"
          :class="{ 'rotate-180': isOpen }"
        />
      </span>
    </button>
    <div
      class="grid transition-[grid-template-rows] duration-300 ease-out"
      :class="isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
    >
      <div class="overflow-hidden">
        <p class="text-neutral-500 mt-4">{{ faqItem.answer }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { FAQItem } from '~/types/common'

const { faqItem } = defineProps<{
  faqItem: FAQItem
}>()

const isOpen = ref(false)
</script>
