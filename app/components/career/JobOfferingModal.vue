<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 bg-black/50 z-80 flex items-start justify-center overflow-y-auto py-8 px-4"
        @click.self="close"
      >
        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <article
            v-if="isOpen && job"
            class="flex flex-col rounded-2xl shadow-md border border-neutral-200 bg-white w-full max-w-2xl relative"
          >
            <button
              type="button"
              class="absolute top-4 right-4 z-10 flex items-center justify-center h-8 w-8 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors cursor-pointer"
              @click="close"
            >
              <Icon name="ion:close" size="20" class="text-neutral-600" />
            </button>

            <header
              class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 md:p-8"
            >
              <h2 class="font-bold text-2xl text-primary-900 pr-8">
                {{ job.title }}
              </h2>
            </header>

            <div class="flex items-center gap-2 px-6 md:px-8 pb-4">
              <Icon
                name="ion:calendar-clear"
                size="14"
                class="text-primary-500 shrink-0"
              />
              <p class="text-sm text-neutral-500">
                {{ $t('pages.career.expiringDateLabel') }}:
                <span class="font-semibold text-primary-900">{{
                  formatDateSerbian(job.expirationDate)
                }}</span>
              </p>
            </div>

            <div class="mx-6 md:mx-8 h-px bg-neutral-200" />

            <section class="p-6 md:p-8 flex flex-col gap-3">
              <h3 class="font-bold text-lg text-primary-900">
                {{ $t('pages.career.jobDescriptionLabel') }}
              </h3>
              <p class="text-neutral-600 leading-relaxed whitespace-pre-line">
                {{ job.description }}
              </p>
            </section>

            <footer class="p-6 md:p-8 pt-0">
              <NuxtLink to="/contact#form" @click="close">
                <Button
                  :text="$t('pages.career.applyButton')"
                  prepend-icon="ion:ios-send"
                  size="large"
                  :disabled="!isActive"
                />
              </NuxtLink>
            </footer>
          </article>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import type { JobOffering } from '~/types/jobs'

const job = defineModel<JobOffering | null>('job')
const isOpen = defineModel<boolean>('open', { default: false })

const close = () => {
  isOpen.value = false
}

const isActive = computed(() => {
  if (!job.value) return false
  return new Date() <= new Date(job.value.expirationDate)
})

watch(isOpen, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>
