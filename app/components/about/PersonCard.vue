<template>
  <div
    class="flex flex-col items-center text-center gap-4 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm"
  >
    <NuxtImg
      v-if="member.photo"
      :src="member.photo"
      :alt="$t(member.name)"
      class="h-28 w-28 rounded-full object-cover"
      format="webp"
    />
    <div
      v-else
      class="flex h-28 w-28 items-center justify-center rounded-full bg-primary-50"
    >
      <Icon name="ion:person" size="40" class="text-primary-300" />
    </div>
    <div class="flex flex-col gap-1">
      <h3 class="font-bold text-lg text-primary-900">{{ $t(member.name) }}</h3>
      <p class="text-sm font-medium text-primary-500">{{ $t(member.role) }}</p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { OrganMember } from '~/types/about'

defineProps<{ member: OrganMember }>()
</script>
