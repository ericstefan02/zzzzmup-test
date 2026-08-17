<template>
  <div
    class="relative overflow-hidden rounded-xl bg-primary-600 text-white p-6 md:p-8 flex flex-col gap-5"
  >
    <h2 class="text-xl md:text-2xl font-bold">
      {{ $t('pages.sluzba.contactTitle') }}
    </h2>

    <div class="flex flex-col gap-4">
      <a
        :href="`tel:${contact.phone.replace(/[^+\d]/g, '')}`"
        class="flex items-center gap-3 group max-w-max"
      >
        <span
          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10"
        >
          <Icon name="ion:call" size="18" />
        </span>
        <span class="flex flex-col">
          <span class="text-sm text-primary-100">
            {{ $t('pages.sluzba.phoneLabel') }}
          </span>
          <span class="text-lg font-bold tabular-nums group-hover:underline">
            {{ contact.phone }}
          </span>
        </span>
      </a>

      <a
        :href="`mailto:${contact.email}`"
        class="flex items-center gap-3 group max-w-max"
      >
        <span
          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10"
        >
          <Icon name="ion:mail" size="18" />
        </span>
        <span class="flex flex-col">
          <span class="text-sm text-primary-100">
            {{ $t('pages.sluzba.emailLabel') }}
          </span>
          <span class="font-semibold group-hover:underline">
            {{ contact.email }}
          </span>
        </span>
      </a>

      <div class="flex items-start gap-3">
        <span
          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10"
        >
          <Icon name="ion:time" size="18" />
        </span>
        <div class="flex flex-col gap-1 w-full max-w-85">
          <span class="text-sm text-primary-100">
            {{ $t('pages.sluzba.workingHoursTitle') }}
          </span>
          <div class="flex items-baseline justify-between gap-4">
            <span class="whitespace-nowrap">
              {{ $t('pages.sluzba.weekdaysLabel') }}
            </span>
            <span class="font-semibold tabular-nums whitespace-nowrap">
              {{ contact.workingHoursWeekday }}
            </span>
          </div>
          <div class="flex items-baseline justify-between gap-4">
            <span class="whitespace-nowrap">
              {{ $t('pages.sluzba.weekendLabel') }}
            </span>
            <span class="font-semibold tabular-nums whitespace-nowrap">
              {{ contact.workingHoursWeekend }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <slot />

    <!-- Dekorativni luk, isti motiv kao TextBanner -->
    <div class="absolute -right-10 -bottom-16 pointer-events-none opacity-10">
      <Icon name="ion:medical" size="180" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { SluzbaContact } from '~/types/sluzba'

defineProps<{ contact: SluzbaContact }>()
</script>
