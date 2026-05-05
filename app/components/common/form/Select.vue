<template>
  <FormField :label="label" :required="'required' in $attrs" :error="error">
    <template #default="{ id }">
      <select
        :id="id"
        :class="customClasses"
        v-bind="$attrs"
        :value="model"
        @change="model = ($event.target as HTMLSelectElement).value"
      >
        <option value="" disabled>{{ placeholder }}</option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </template>
  </FormField>
</template>

<script lang="ts" setup>
export interface SelectOption {
  label: string
  value: string | number
}

interface Props {
  label: string
  options: SelectOption[]
  placeholder?: string
  error?: string
}

defineOptions({
  inheritAttrs: false,
})

const model = defineModel<string | number>()
const { error = '', placeholder = 'Izaberite opciju' } = defineProps<Props>()

const customClasses = computed(() => [
  'rounded-lg border px-3 py-3 outline-none w-full bg-white appearance-none cursor-pointer',
  'focus:ring-1 focus:ring-offset-0 transition-colors',
  'disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-500',
  'text-neutral-900',
  error
    ? 'border-accent focus:ring-accent hover:border-accent'
    : 'border-neutral-200 focus:ring-primary-500 hover:border-primary-300',
])
</script>
