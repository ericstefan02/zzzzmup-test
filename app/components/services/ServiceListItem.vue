<template>
  <li
    class="bg-white transition-colors duration-200 text-primary-900"
    :class="{ 'hover:bg-primary-50 hover:text-primary-500': !isOpen }"
  >
    <button
      type="button"
      class="w-full px-6 py-4 flex items-center justify-between cursor-pointer"
      :aria-expanded="isOpen"
      @click="isOpen = !isOpen"
    >
      <span class="text-left">{{ service.title }}</span>
      <div class="flex items-center gap-3">
        <span
          v-if="service.price"
          class="rounded-full bg-primary-50 px-3 py-1.5 text-sm font-bold text-primary-400 border border-primary-200"
        >
          {{ formattedPrice }}
        </span>
        <span
          v-else
          class="rounded-full flex items-center gap-1 px-3 py-1.5 text-sm font-bold bg-green-50 text-green-700 border border-green-200"
        >
          <Icon name="ion:checkmark" size="14" class="text-green-700" />
          {{ $t('components.free') }}
        </span>
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
      </div>
    </button>
    <div
      class="grid transition-[grid-template-rows] duration-300 ease-out"
      :class="isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
    >
      <div class="overflow-hidden">
        <p class="px-6 pb-4 text-neutral-500 text-sm">
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

const priceFormatter = new Intl.NumberFormat('sr-RS', {
  style: 'currency',
  currency: 'RSD',
  maximumFractionDigits: 2,
})

const formattedPrice = computed(() =>
  service.price ? priceFormatter.format(service.price) : null,
)
</script>
