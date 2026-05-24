<template>
  <article
    class="bg-white border border-neutral-200 rounded-xl p-5 md:p-6 flex flex-col gap-4"
  >
    <div class="flex items-start justify-between gap-4">
      <h3 class="text-lg font-bold text-primary-900">{{ exam.title }}</h3>
      <span
        class="shrink-0 rounded-full bg-primary-50 px-3 py-1.5 text-sm font-bold text-primary-400 border border-primary-200"
      >
        {{ formattedPrice }}
      </span>
    </div>
    <p class="text-neutral-500 text-sm leading-relaxed">
      {{ exam.description }}
    </p>
    <div class="flex flex-col gap-1 bg-neutral-50 rounded-lg p-4">
      <p class="text-xs font-bold uppercase text-neutral-500">
        {{ $t('pages.services.documentationRequired') }}
      </p>
      <p class="text-sm text-neutral-700">
        {{ exam.documentationRequired }}
      </p>
    </div>
  </article>
</template>

<script lang="ts" setup>
import type { GroupExam } from '~/types/services'

const { exam } = defineProps<{
  exam: GroupExam
}>()

const priceFormatter = new Intl.NumberFormat('sr-RS', {
  style: 'currency',
  currency: 'RSD',
  maximumFractionDigits: 0,
})

const formattedPrice = computed(() => priceFormatter.format(exam.price))
</script>
