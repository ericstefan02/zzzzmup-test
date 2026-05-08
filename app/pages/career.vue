<template>
  <div>
    <TextBanner
      :title="$t('pages.career.title')"
      :description="$t('pages.career.description')"
    />
    <section
      class="py-6 md:py-12 px-4 md:px-12 lg:px-28 flex flex-col gap-6 md:gap-8"
    >
      <div class="flex flex-col gap-4">
        <h3 class="text-primary-900 font-bold text-center text-3xl">
          {{ $t('pages.career.selectionTitle') }}
        </h3>
        <p class="text-center text-sm text-neutral-500">
          {{ $t('pages.career.selectionDescription') }}
        </p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="phase in selectionPhases"
          :key="phase.number"
          class="flex flex-col gap-4 items-center"
        >
          <div
            class="flex items-center justify-center rounded-full h-12 w-12 bg-primary-50 text-primary-400 border border-primary-400"
          >
            <p class="font-bold text-xl">{{ phase.number }}</p>
          </div>
          <p class="text font-bold text-primary-900">{{ $t(phase.name) }}</p>
          <p class="text-sm text-neutral-500 text-center">
            {{ $t(phase.description) }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.career.title'),
  description: () => t('seo.career.description'),
  keywords: () => t('seo.career.keywords'),
  ogTitle: () => t('seo.career.title'),
  ogDescription: () => t('seo.career.description'),
  ogSiteName: () => t('seo.siteName'),
})

interface SelectionPhase {
  number: number
  name: string
  description: string
}

const selectionPhases: SelectionPhase[] = [
  {
    number: 1,
    name: 'pages.career.phase1Name',
    description: 'pages.career.phase1Desc',
  },
  {
    number: 2,
    name: 'pages.career.phase2Name',
    description: 'pages.career.phase2Desc',
  },
  {
    number: 3,
    name: 'pages.career.phase3Name',
    description: 'pages.career.phase3Desc',
  },
  {
    number: 4,
    name: 'pages.career.phase4Name',
    description: 'pages.career.phase4Desc',
  },
]
</script>
