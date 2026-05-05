<template>
  <div class="border-b border-neutral-200 last:border-b-0">
    <button
      type="button"
      class="w-full flex items-center justify-between px-6 py-4 hover:bg-neutral-50 transition-colors cursor-pointer"
      :aria-expanded="isOpen"
      @click="isOpen = !isOpen"
    >
      <span class="font-semibold text-primary-900 text-sm">{{
        $t('components.documentYearAccordion.year', { year })
      }}</span>
      <Icon
        name="ion:chevron-down"
        size="16"
        :class="[
          'transition-transform duration-300 text-neutral-400',
          isOpen && 'rotate-180',
        ]"
      />
    </button>

    <div
      :class="[
        'grid transition-[grid-template-rows] duration-300',
        isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
      ]"
    >
      <div class="overflow-hidden">
        <DocumentTable :documents="documents" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { DocumentItem } from '~/types/common'

const { year, documents } = defineProps<{
  year: number
  documents: DocumentItem[]
}>()

const isOpen = ref(false)
</script>
