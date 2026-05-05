<template>
  <section class="relative px-28 py-20 bg-primary-600">
    <div class="flex flex-col gap-6">
      <h2 class="text-6xl font-extrabold text-white">{{ title }}</h2>
      <p class="max-w-1/2 text-xl text-neutral-300">{{ description }}</p>

      <div class="left-0 right-0 top-1/4 bottom-0 absolute pointer-events-none">
        <svg
          class="w-full h-full text-white/10"
          preserveAspectRatio="none"
          viewBox="0 0 1440 225"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M0 225C288 -75 720 -75 1440 225H0Z" fill="currentColor" />
        </svg>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
const { title, description } = defineProps<{
  title: string
  description: string
}>()
</script>
