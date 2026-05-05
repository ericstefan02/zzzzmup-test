<template>
  <div class="flex flex-col gap-2">
    <div class="flex gap-1 items-center">
      <label :for="id" class="text-sm font-medium text-primary-900">
        {{ label }}
      </label>
      <span v-if="required" class="text-accent text-sm">*</span>
    </div>
    <slot :id="id" />
    <div v-if="error" class="flex items-center gap-1.5">
      <Icon name="ion:warning" size="14" class="text-accent" />
      <p class="text-sm text-accent">{{ error }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  label: string
  required?: boolean
  error?: string
}

const { label, required = false, error = '' } = defineProps<Props>()

const id = useId()
</script>
