<template>
  <div class="pt-4 h-full">
    <div class="pl-4 border-l-4 border-primary-400 h-full">
      <p class="text-primary-900 font-bold text-3xl">{{ number }}+</p>
      <p class="text-neutral-500 font-medium text-sm">{{ label }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { number, label } = defineProps<{
  number: number | string
  label: string
}>()
</script>
