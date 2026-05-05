<template>
  <article
    class="flex flex-col gap-6 bg-white p-8 rounded-xl shadow"
    :class="{ 'shadow-primary-300/60': primary }"
  >
    <div class="flex items-start justify-between">
      <div
        class="h-12 w-12 flex items-center justify-center rounded-lg"
        :class="primary ? 'bg-primary-50' : 'bg-neutral-100'"
      >
        <Icon
          :name="icon"
          :class="primary ? 'text-primary-500' : 'text-neutral-700'"
          size="20"
        />
      </div>
      <div v-if="primary" class="px-2 py-1 rounded bg-primary-50">
        <p class="text-sm font-bold uppercase text-primary-500">
          {{ $t('components.priority') }}
        </p>
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <h3 class="text-xl font-bold text-primary-900">{{ title }}</h3>
      <p class="text-neutral-500 text-sm">{{ description }}</p>
      <NuxtLink to="/services">
        <Button
          :text="$t('components.learnMore')"
          variant="text"
          append-icon="ion:chevron-forward"
        />
      </NuxtLink>
    </div>
  </article>
</template>
<script setup lang="ts">
const {
  title,
  description,
  icon,
  primary = false,
} = defineProps<{
  title: string
  description: string
  icon: string
  primary?: boolean
}>()
</script>
