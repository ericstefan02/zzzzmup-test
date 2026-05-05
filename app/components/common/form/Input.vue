<template>
  <FormField :label="label" :required="'required' in $attrs" :error="error">
    <template #default="{ id }">
      <div class="relative">
        <Icon
          v-if="prependIcon"
          :name="prependIcon"
          class="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
        />
        <input
          :id="id"
          :class="customClasses"
          v-bind="$attrs"
          :value="model"
          @input="model = ($event.target as HTMLInputElement).value"
        />
        <Icon
          v-if="appendIcon"
          :name="appendIcon"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500"
        />
      </div>
    </template>
  </FormField>
</template>

<script lang="ts" setup>
interface Props {
  label: string
  prependIcon?: string
  appendIcon?: string
  error?: string
}

defineOptions({
  inheritAttrs: false,
})

const model = defineModel<string>()
const { prependIcon = '', appendIcon = '', error = '' } = defineProps<Props>()

const customClasses = computed(() => [
  'rounded-lg border py-3 outline-none w-full',
  'focus:ring-1 focus:ring-offset-0 transition-colors',
  'disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-500',
  'text-neutral-900 placeholder:text-neutral-500',
  error
    ? 'border-accent focus:ring-accent hover:border-accent'
    : 'border-neutral-200 focus:ring-primary-500 hover:border-primary-300',
  prependIcon ? 'pl-10' : 'pl-3',
  appendIcon ? 'pr-10' : 'pr-3',
])
</script>
