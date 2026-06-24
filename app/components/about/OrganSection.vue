<template>
  <section :id="section.anchor" class="scroll-mt-28 flex flex-col gap-6">
    <h2 class="text-2xl md:text-3xl font-bold text-primary-900">
      {{ $t(section.titleKey) }}
    </h2>

    <!-- Pojedinac: horizontalna profil kartica -->
    <div
      v-if="section.members.length === 1"
      class="flex flex-col sm:flex-row sm:items-center gap-5 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm max-w-2xl"
    >
      <NuxtImg
        v-if="section.members[0]!.photo"
        :src="section.members[0]!.photo"
        :alt="$t(section.members[0]!.name)"
        class="h-24 w-24 rounded-full object-cover shrink-0"
        format="webp"
      />
      <div
        v-else
        class="flex h-24 w-24 items-center justify-center rounded-full bg-primary-50 shrink-0"
      >
        <Icon name="ion:person" size="36" class="text-primary-300" />
      </div>
      <div class="flex flex-col gap-1.5">
        <h3 class="font-bold text-lg text-primary-900">
          {{ $t(section.members[0]!.name) }}
        </h3>
        <p class="text-sm font-medium text-primary-500">
          {{ $t(section.members[0]!.role) }}
        </p>
        <p
          v-if="section.descriptionKey"
          class="text-sm text-neutral-600 leading-relaxed"
        >
          {{ $t(section.descriptionKey) }}
        </p>
      </div>
    </div>

    <!-- Odbor / telo: opis + grid članova -->
    <template v-else>
      <p
        v-if="section.descriptionKey"
        class="text-neutral-600 leading-relaxed max-w-3xl -mt-2"
      >
        {{ $t(section.descriptionKey) }}
      </p>
      <div class="flex flex-wrap gap-6">
        <PersonCard
          v-for="(member, index) in section.members"
          :key="index"
          :member="member"
          class="w-full sm:w-60"
        />
      </div>
    </template>
  </section>
</template>
<script lang="ts" setup>
import type { OrganSection } from '~/types/about'

defineProps<{ section: OrganSection }>()
</script>
