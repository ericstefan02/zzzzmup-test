<template>
  <div>
    <TextBanner
      :title="$t('pages.career.title')"
      :description="$t('pages.career.description')"
    />
    <section
      class="py-6 md:py-12 px-4 md:px-12 lg:px-28 flex flex-col gap-6 md:gap-8 bg-white"
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
    <section
      class="py-6 md:py-12 px-4 md:px-12 lg:px-28 flex flex-col gap-6 md:gap-8"
    >
      <h3 class="text-primary-900 font-bold text-2xl">
        {{ $t('pages.career.openPositionsTitle') }}
      </h3>
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
      >
        <JobOfferingCard
          v-for="job in jobOfferings"
          :key="job.id"
          :job="job"
          @view="openJobModal"
        />
      </div>
    </section>
    <JobOfferingModal v-model:job="selectedJob" v-model:open="isJobModalOpen" />
  </div>
</template>

<script setup lang="ts">
import type { JobOffering } from '~/types/jobs'

const { t } = useI18n()

const selectedJob = ref<JobOffering | null>(null)
const isJobModalOpen = ref(false)

const openJobModal = (job: JobOffering) => {
  selectedJob.value = job
  isJobModalOpen.value = true
}

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

// TODO: zameni dummy podatke i poveži sa backendom
const jobOfferings: JobOffering[] = [
  {
    id: 1,
    title: 'Medicinski tehničar',
    description:
      'Ova pozicija je namenjena medicinskim tehničarima sa iskustvom u radu sa pacijentima. Opis posla uključuje pružanje podrške lekarima, obavljanje medicinskih procedura i brigu o pacijentima.',
    expirationDate: '2024-12-31',
  },
  {
    id: 2,
    title: 'Farmaceut',
    description: 'Opis posla za farmaceuta.',
    expirationDate: '2027-11-30',
  },
  {
    id: 3,
    title: 'Administrativni radnik',
    description: 'Opis posla za administrativnog radnika.',
    expirationDate: '2024-10-31',
  },
]
</script>
