<template>
  <div class="flex flex-col gap-1">
    <p
      class="text-primary-600 font-bold text-3xl md:text-4xl tracking-tight tabular-nums"
    >
      {{ number }}+
    </p>
    <p class="text-neutral-500 text-sm">{{ label }}</p>
  </div>
</template>

<script lang="ts" setup>
const { number, label } = defineProps<{
  number: number | string
  label: string
}>()
</script>
