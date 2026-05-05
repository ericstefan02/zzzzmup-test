<template>
  <FormField
    :label="label"
    :required="'required' in $attrs"
    :error="error"
    @click="handleInputClicked"
  >
    <template #default="{ id }">
      <div :class="customClasses">
        <Icon name="ion:document-attach" size="16" class="text-neutral-500" />
        <p v-if="!fileText" class="text-neutral-500">
          {{ placeholder || 'Izaberite datoteku' }}
        </p>
        <p v-else class="text-neutral-900">
          {{ fileText }}
        </p>
        <Icon
          v-if="fileText"
          name="ion:close-circle"
          size="24"
          class="clear-btn text-neutral-500 hover:text-accent transition-colors absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
          @click.stop="model = null"
        />
      </div>
      <input
        :id="id"
        ref="fileInput"
        type="file"
        class="hidden"
        v-bind="$attrs"
        @change="model = ($event.target as HTMLInputElement).files?.[0] || null"
      />
    </template>
  </FormField>
</template>

<script lang="ts" setup>
interface Props {
  label: string
  error?: string
  placeholder?: string
}

defineOptions({
  inheritAttrs: false,
})

const fileInput = useTemplateRef<HTMLInputElement>('fileInput')

const fileText = computed(() => {
  const name = model.value?.name || ''
  return name.length > 32 ? `${name.slice(0, 32)}...` : name
})

const model = defineModel<File | null>()
const { error = '', placeholder = '' } = defineProps<Props>()

const customClasses = computed(() => [
  'rounded-lg border px-3 py-3 outline-none w-full cursor-pointer flex items-center gap-2 relative',
  'transition-colors',
  'disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-500',
  'text-neutral-900 placeholder:text-neutral-500',
  error
    ? 'border-accent hover:border-accent-dark has-[.clear-btn:hover]:border-accent'
    : 'border-neutral-200 hover:border-primary-300 has-[.clear-btn:hover]:border-neutral-200',
])

const handleInputClicked = () => {
  fileInput.value?.click()
}
</script>
