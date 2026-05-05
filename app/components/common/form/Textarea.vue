<template>
  <FormField :label="label" :required="'required' in $attrs" :error="error">
    <template #default="{ id }">
      <textarea
        :id="id"
        :class="customClasses"
        :rows="rows"
        v-bind="$attrs"
        :value="model"
        @input="model = ($event.target as HTMLTextAreaElement).value"
      />
    </template>
  </FormField>
</template>

<script lang="ts" setup>
interface Props {
  label: string
  error?: string
  rows?: number
}

defineOptions({
  inheritAttrs: false,
})

const model = defineModel<string>()
const { error = '', rows = 4 } = defineProps<Props>()

const customClasses = computed(() => [
  'rounded-lg border px-3 py-3 outline-none w-full resize-none',
  'focus:ring-1 focus:ring-offset-0 transition-colors',
  'disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-500',
  'text-neutral-900 placeholder:text-neutral-500',
  error
    ? 'border-accent focus:ring-accent hover:border-accent'
    : 'border-neutral-200 focus:ring-primary-500 hover:border-primary-300',
])
</script>
