<template>
  <div class="flex flex-col items-center text-center gap-2.5">
    <NuxtImg
      v-if="member.photo"
      :src="member.photo"
      :alt="member.fullName"
      class="h-20 w-20 md:h-24 md:w-24 rounded-full object-cover"
      format="webp"
    />
    <!-- Placeholder dok klijent ne pošalje fotografije: inicijali -->
    <div
      v-else
      class="flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-full bg-primary-50 text-primary-400 text-xl font-bold"
      aria-hidden="true"
    >
      {{ initials }}
    </div>

    <div class="flex flex-col gap-0.5">
      <p class="text-xs font-medium uppercase tracking-wide text-neutral-400">
        {{ member.title }}
      </p>
      <h3 class="font-bold text-primary-900 leading-snug">
        {{ member.fullName }}
      </h3>
    </div>

    <p
      v-if="member.role"
      class="text-sm text-neutral-500 leading-snug max-w-52"
    >
      {{ member.role }}
    </p>

    <span
      v-if="member.ambulanta"
      class="inline-flex items-center gap-1 rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-600"
    >
      <Icon name="ion:location" size="11" class="shrink-0" />
      {{ member.ambulanta }}
    </span>
  </div>
</template>
<script lang="ts" setup>
import type { SluzbaTeamMember } from '~/types/sluzba'

const { member } = defineProps<{ member: SluzbaTeamMember }>()

const initials = computed(() =>
  member.fullName
    .split(/\s+/)
    .map((part) => part[0] ?? '')
    .slice(0, 2)
    .join(''),
)
</script>
