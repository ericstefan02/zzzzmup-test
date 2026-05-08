<template>
  <article
    class="p-4 md:p-6 lg:p-8 rounded-xl relative flex flex-col gap-4 md:gap-6 shadow overflow-hidden"
    :class="main ? 'bg-primary-500 text-white' : 'bg-white text-primary-900'"
  >
    <div
      class="flex items-center justify-center rounded-lg h-14 w-14 shrink-0"
      :class="main ? 'bg-primary-400' : 'bg-primary-50'"
    >
      <Icon
        :name="icon"
        size="24"
        :class="main ? 'text-white' : 'text-primary-500'"
      />
    </div>
    <div class="flex flex-col gap-4 z-10">
      <h3 class="text-xl font-bold">
        {{ title }}
      </h3>
      <p
        class="text-sm"
        :class="main ? 'text-primary-100' : 'text-neutral-500'"
      >
        {{ description }}
      </p>
      <Button
        v-if="buttonText"
        :text="buttonText"
        :shrinked="true"
        append-icon="ion:arrow-forward"
        variant="text"
        :text-color="main ? 'text-white' : undefined"
        @click="handleActionClicked"
      />
    </div>
    <div
      v-if="main"
      class="h-24 w-24 rounded-full bg-primary-400 absolute -top-3 -right-3"
    />
  </article>
</template>

<script setup lang="ts">
const {
  icon,
  title,
  description,
  buttonText = '',
  main = false,
} = defineProps<{
  icon: string
  title: string
  description: string
  buttonText?: string
  main?: boolean
}>()

const emit = defineEmits(['click'])

const handleActionClicked = () => {
  emit('click')
}
</script>
