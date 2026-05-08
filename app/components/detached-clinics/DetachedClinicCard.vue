<template>
  <article
    class="rounded-xl flex flex-col gap-4 px-4 py-6 md:px-6 md:py-8 bg-white shadow-sm border border-neutral-200"
  >
    <div class="flex items-center gap-3">
      <div
        class="flex items-center justify-center rounded-lg h-12 w-12 bg-primary-100"
      >
        <Icon name="ion:medkit" size="20" class="text-primary-400" />
      </div>
      <h4 class="text-primary-900 font-bold text-lg">{{ clinic.name }}</h4>
    </div>
    <address class="text-neutral-500 not-italic flex flex-col gap-3">
      <div class="flex items-start gap-2">
        <Icon name="ion:location-sharp" class="shrink-0 mt-1" />
        <p>{{ clinic.address }}</p>
      </div>
      <NuxtLink
        class="flex items-center gap-2"
        :to="`tel:${clinic.phoneNumber}`"
      >
        <Icon name="ion:call" class="shrink-0" />
        <p>{{ clinic.phoneNumber }}</p>
      </NuxtLink>
      <div class="flex items-center gap-2">
        <Icon name="ion:android-time" class="shrink-0" />
        <p>
          {{ $t('components.detachedClinicCard.weekdayHours') }}
          {{ clinic.workingHoursStart }} -
          {{ clinic.workingHoursEnd }}
        </p>
      </div>
    </address>
  </article>
</template>

<script lang="ts" setup>
import type { DetachedClinic } from '~/types/detached-clinic'

const { clinic } = defineProps<{
  clinic: DetachedClinic
}>()
</script>
