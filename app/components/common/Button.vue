<template>
  <button
    :type="type"
    :class="customClasses"
    :disabled="loading"
    @click="handleButtonClicked"
  >
    <Icon v-if="prependIcon" :name="prependIcon" class="shrink-0" />
    {{ text }}
    <Icon v-if="appendIcon" :name="appendIcon" class="shrink-0" />
  </button>
</template>
<script lang="ts" setup>
type ButtonVariant = 'filled' | 'outlined' | 'text'
type ButtonSize = 'small' | 'medium' | 'large'
type ButtonType = 'button' | 'submit' | 'reset'

const {
  variant = 'filled',
  text,
  type = 'button',
  prependIcon = '',
  appendIcon = '',
  loading = false,
  shrinked = false,
  textColor = '',
  size = 'medium',
} = defineProps<{
  variant?: ButtonVariant
  text: string
  type?: ButtonType
  prependIcon?: string
  appendIcon?: string
  loading?: boolean
  shrinked?: boolean
  textColor?: string
  size?: ButtonSize
}>()

const emit = defineEmits(['click'])

const variantClasses: Record<ButtonVariant, string> = {
  filled: `bg-primary-500 hover:bg-primary-600 disabled:bg-primary-300`,
  outlined: `bg-transparent border border-primary-500 hover:bg-primary-50 disabled:border-primary-300 disabled:text-primary-300`,
  text: `bg-transparent !pl-0`,
}

const sizeClasses: Record<ButtonSize, string> = {
  small: 'text-xs px-3 py-1.5',
  medium: 'text-sm px-5 py-2.5',
  large: 'text-lg px-6 py-3',
}

const customClasses = computed(() => [
  'font-semibold flex items-center gap-2 rounded-lg cursor-pointer transition-colors',
  'disabled:cursor-not-allowed',
  variantClasses[variant],
  sizeClasses[size],
  textColor ||
    (variant === 'text'
      ? 'text-primary-500 hover:text-primary-600'
      : variant === 'outlined'
        ? 'text-primary-500'
        : 'text-white'),
  shrinked && 'max-w-max',
])

const handleButtonClicked = () => {
  if (loading) return
  emit('click')
}
</script>
