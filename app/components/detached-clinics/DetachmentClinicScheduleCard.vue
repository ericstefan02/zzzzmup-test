<template>
  <div class="border border-neutral-200 flex flex-col gap-3 rounded-lg p-5">
    <div class="flex items-center gap-3">
      <div
        class="flex items-center justify-center bg-primary-50 text-primary-400 rounded-full w-10 h-10"
      >
        <Icon name="ion:medkit" />
      </div>
      <div class="flex flex-col gap-0.5">
        <p class="font-bold text-primary-900">{{ schedule.clinic.name }}</p>
        <p class="text-sm text-neutral-500">{{ schedule.clinic.address }}</p>
      </div>
    </div>
    <div class="w-full h-px bg-neutral-200" />
    <div class="flex gap-3">
      <Icon name="ion:person" size="20" class="text-primary-400" />
      <p class="font-semibold text-sm text-primary-900">
        {{ schedule.doctor }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { DetachmentClinicScheduleItem } from '~/types/schedule'

const { schedule } = defineProps<{
  schedule: DetachmentClinicScheduleItem
}>()
</script>
