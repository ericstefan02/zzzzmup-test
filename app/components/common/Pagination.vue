<template>
  <nav
    :aria-label="$t('components.pagination.ariaLabel')"
    class="flex items-center justify-center gap-1.5"
  >
    <button
      type="button"
      :class="[
        buttonBase,
        currentPage === 1 ? classesByState.disabled : classesByState.default,
        'p-2',
      ]"
      :disabled="currentPage === 1"
      :aria-label="$t('components.pagination.previousPage')"
      @click="handlePageChange(currentPage - 1)"
    >
      <Icon name="ion:chevron-back" size="14" />
    </button>

    <template
      v-for="(page, index) in visiblePages"
      :key="page ?? `ellipsis-${index}`"
    >
      <span
        v-if="page === null"
        class="px-1.5 text-neutral-400 select-none"
        aria-hidden="true"
      >
        ...
      </span>
      <button
        v-else
        type="button"
        :class="[
          buttonBase,
          page === currentPage ? classesByState.active : classesByState.default,
          'px-3.5 py-1.5',
        ]"
        :aria-label="$t('components.pagination.page', { page })"
        :aria-current="page === currentPage ? 'page' : undefined"
        @click="handlePageChange(page)"
      >
        {{ page }}
      </button>
    </template>

    <button
      type="button"
      :class="[
        buttonBase,
        currentPage === totalPages
          ? classesByState.disabled
          : classesByState.default,
        'p-2',
      ]"
      :disabled="currentPage === totalPages"
      :aria-label="$t('components.pagination.nextPage')"
      @click="handlePageChange(currentPage + 1)"
    >
      <Icon name="ion:chevron-forward" size="14" />
    </button>
  </nav>
</template>

<script lang="ts" setup>
const MAX_NUMBER_OF_PAGES = 4

const emit = defineEmits<{
  'page-change': [newPage: number]
}>()

const { totalItems, itemsPerPage, currentPage } = defineProps<{
  totalItems: number
  itemsPerPage: number
  currentPage: number
}>()

const totalPages = computed(() => Math.ceil(totalItems / itemsPerPage))

const buttonBase =
  'rounded-lg border flex items-center justify-center bg-white transition-colors'

const classesByState = {
  default:
    'border-neutral-200 text-neutral-700 hover:bg-primary-50 hover:text-primary-400 cursor-pointer',
  active:
    'border-primary-500 text-white! bg-primary-500! cursor-default pointer-events-none',
  disabled: 'border-neutral-200 text-neutral-300 cursor-not-allowed',
}

const visiblePages = computed((): (number | null)[] => {
  const total = totalPages.value

  if (total <= MAX_NUMBER_OF_PAGES) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const inner = MAX_NUMBER_OF_PAGES - 2

  let start: number
  if (currentPage <= Math.ceil(inner / 2) + 1) {
    start = 2
  } else if (currentPage >= total - Math.floor(inner / 2)) {
    start = total - inner
  } else {
    start = currentPage - Math.floor(inner / 2)
  }

  const end = Math.min(start + inner - 1, total - 1)
  start = Math.max(2, start)

  const pages: (number | null)[] = [1]
  if (start > 2) pages.push(null)
  for (let i = start; i <= end; i++) pages.push(i)
  if (end < total - 1) pages.push(null)
  pages.push(total)

  return pages
})

const handlePageChange = (newPage: number) => {
  if (newPage >= 1 && newPage <= totalPages.value) {
    emit('page-change', newPage)
  }
}
</script>
