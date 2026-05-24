<template>
  <div class="flex flex-col gap-6">
    <div
      class="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-4"
    >
      <h2 class="text-2xl font-bold text-primary-900">
        {{ exam.title }}
      </h2>
      <span
        class="shrink-0 self-start rounded-full bg-primary-50 px-4 py-2 text-sm font-bold text-primary-400 border border-primary-200"
      >
        {{ formattedPrice }}
      </span>
    </div>
    <div class="w-full h-px bg-neutral-200" />
    <p class="text-neutral-600 text-base leading-relaxed">
      {{ exam.description }}
    </p>
    <div
      class="flex flex-col gap-2 bg-neutral-50 rounded-xl p-5 border border-neutral-200"
    >
      <p class="text-xs font-bold uppercase text-neutral-500">
        {{ $t('pages.services.documentationRequired') }}
      </p>
      <p class="text-sm text-neutral-700 leading-relaxed">
        {{ exam.documentationRequired }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { GroupExam } from '~/types/services'

const props = defineProps<{
  exam: GroupExam
}>()

const priceFormatter = new Intl.NumberFormat('sr-RS', {
  style: 'currency',
  currency: 'RSD',
  maximumFractionDigits: 0,
})

const formattedPrice = computed(() => priceFormatter.format(props.exam.price))
</script>
