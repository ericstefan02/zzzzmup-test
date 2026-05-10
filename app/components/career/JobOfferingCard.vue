<template>
  <article
    class="bg-white shadow rounded-xl p-6 flex flex-col gap-4 border border-neutral-200 relative"
  >
    <div
      v-if="!isActive"
      class="absolute inset-0 bg-white/50 z-10 rounded-xl"
    ></div>
    <div class="flex items-center justify-between">
      <h4 class="font-bold text-xl text-primary-500">{{ job.title }}</h4>
      <div
        class="px-2.5 py-1 gap-1 rounded-full flex items-center"
        :class="
          isActive
            ? 'bg-green-50 text-green-500 border border-green-300'
            : 'bg-gray-50 text-gray-500 border border-gray-300'
        "
      >
        <Icon
          :name="isActive ? 'ion:ios-circle-filled' : 'ion:lock-closed'"
          size="12"
        />
        <p class="font-semibold text-xs">
          {{
            isActive
              ? $t('pages.career.jobActive')
              : $t('pages.career.jobExpired')
          }}
        </p>
      </div>
    </div>
    <p class="text-sm text-neutral-500 line-clamp-2 min-h-10">
      {{ job.description }}
    </p>
    <div class="w-full h-px bg-neutral-200" />
    <div class="flex items-center justify-between">
      <div class="flex flex-col gap-1.5">
        <p class="text-xs text-neutral-500">
          {{ $t('pages.career.expiringDateLabel') }}:
        </p>
        <div class="flex items-center gap-1.5">
          <Icon name="ion:calendar-clear" size="14" class="text-primary-500" />
          <p class="text-xs text-primary-900 font-semibold">
            {{ formatDateSerbian(job.expirationDate) }}
          </p>
        </div>
      </div>
      <Button
        :text="$t('pages.career.checkJobButton')"
        variant="outlined"
        :disabled="!isActive"
        @click="emit('view', job)"
      />
    </div>
  </article>
</template>

<script setup lang="ts">
import type { JobOffering } from '~/types/jobs'

const { job } = defineProps<{
  job: JobOffering
}>()

const emit = defineEmits<{
  view: [job: JobOffering]
}>()

const isActive = computed(() => {
  const today = new Date()
  const expiration = new Date(job.expirationDate)
  return today <= expiration
})
</script>
