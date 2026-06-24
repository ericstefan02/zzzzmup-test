<template>
  <section
    :id="section.anchor"
    class="scroll-mt-28 flex flex-col gap-6 md:gap-8"
  >
    <div class="flex flex-col gap-2">
      <h2 class="text-2xl md:text-3xl font-bold text-primary-900">
        {{ $t(section.titleKey) }}
      </h2>
      <p v-if="section.descriptionKey" class="text-neutral-500 max-w-3xl">
        {{ $t(section.descriptionKey) }}
      </p>
    </div>
    <div class="flex flex-wrap justify-center gap-6">
      <PersonCard
        v-for="(member, index) in section.members"
        :key="index"
        :member="member"
        class="w-full sm:w-72"
      />
    </div>
  </section>
</template>
<script lang="ts" setup>
import type { OrganSection } from '~/types/about'

defineProps<{ section: OrganSection }>()
</script>
