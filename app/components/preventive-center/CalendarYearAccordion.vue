<template>
  <div class="border-b border-neutral-200 last:border-b-0">
    <button
      type="button"
      class="w-full flex items-center justify-between px-6 py-4 hover:bg-neutral-50 transition-colors cursor-pointer"
      :aria-expanded="isOpen"
      @click="isOpen = !isOpen"
    >
      <div class="flex items-center gap-4">
        <div class="px-4 py-2.5 rounded-xl border border-neutral-200">
          <p class="font-bold text-primary-400 text-lg">{{ year }}</p>
        </div>
        <span class="font-semibold text-primary-900">
          {{ $t('components.calendarYearAccordion.activitiesFor', { year }) }}
        </span>
      </div>
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
        <div class="divide-y divide-neutral-100">
          <div
            v-for="(item, index) in items"
            :key="index"
            class="px-6 py-4 flex flex-col gap-1"
          >
            <p class="text text-primary-500 font-semibold">
              {{ item.title }}
            </p>
            <p class="text-xs text-neutral-400">
              {{ formatDateSerbian(item.created_at, locale) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface CalendarItem {
  title: string
  created_at: string
}

defineProps<{
  year: number
  items: CalendarItem[]
}>()

const { locale } = useI18n()
const isOpen = ref(false)
</script>
