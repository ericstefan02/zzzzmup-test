<template>
  <div>
    <TextBanner
      :title="$t('pages.aboutUs.title')"
      :description="$t('pages.aboutUs.description')"
    />

    <section class="px-28 py-16 grid grid-cols-2 gap-16 bg-white">
      <div class="flex flex-col gap-6">
        <span
          class="font-bold text-xs text-primary-400 rounded-full bg-primary-50 px-3 py-1 max-w-max uppercase"
        >
          {{ $t('pages.aboutUs.historyLabel') }}
        </span>
        <h2 class="text-4xl font-bold text-primary-900">
          {{ $t('pages.aboutUs.trustTitle') }}
          <span class="text-primary-500">{{
            $t('pages.aboutUs.trustTitleHighlight')
          }}</span>
        </h2>
        <div class="flex flex-col gap-4 text-neutral-500 text-lg">
          <p>{{ $t('pages.aboutUs.paragraph1') }}</p>
          <p>{{ $t('pages.aboutUs.paragraph2') }}</p>
          <p>{{ $t('pages.aboutUs.paragraph3') }}</p>
        </div>
        <!-- TODO: dopuniti -->
        <div class="grid grid-cols-2 gap-6">
          <NumbersBanner
            number="100k"
            :label="$t('pages.aboutUs.satisfiedPatients')"
          />
          <NumbersBanner number="30" :label="$t('pages.aboutUs.yearsOfWork')" />
        </div>
      </div>
      <!-- TODO: prebaciti na NuxtImg -->
      <img
        src="https://images.pexels.com/photos/11782003/pexels-photo-11782003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        :alt="$t('pages.aboutUs.imageAlt')"
        class="rounded-xl max-h-120 object-cover w-full self-center"
      />
    </section>

    <section
      class="px-48 py-16 flex flex-col items-center justify-center gap-8"
    >
      <h2 class="font-bold text-primary-900 text-3xl text-center">
        {{ $t('pages.aboutUs.documentsTitle') }}
      </h2>
      <p class="text-neutral-500 text-center">
        {{ $t('pages.aboutUs.documentsDescription') }}
      </p>
      <div
        class="bg-white shadow-sm border border-neutral-200 rounded-xl overflow-hidden w-full"
      >
        <div
          role="tablist"
          class="grid grid-cols-4 border-b border-neutral-200"
        >
          <button
            v-for="tab in DOCUMENT_TYPES_TABS"
            :key="tab.value"
            type="button"
            role="tab"
            :aria-selected="activeDocumentType === tab.value"
            class="flex items-center justify-center gap-2 px-6 py-3 font-semibold transition-colors"
            :class="{
              'bg-primary-500 text-white': activeDocumentType === tab.value,
              'text-neutral-500 hover:text-primary-400 hover:bg-primary-50 cursor-pointer':
                activeDocumentType !== tab.value,
            }"
            @click="activeDocumentType = tab.value"
          >
            <Icon :name="tab.icon" size="16" />
            <span>{{ $t(tab.label) }}</span>
          </button>
        </div>
        <div role="tabpanel">
          <template v-if="flatDocuments">
            <DocumentTable :documents="flatDocuments" />
          </template>
          <template v-else>
            <DocumentYearAccordion
              v-for="[year, docs] in sortedYearEntries"
              :key="year"
              :year="year"
              :documents="docs"
            />
            <p
              v-if="!sortedYearEntries.length"
              class="px-6 py-10 text-center text-neutral-400 text-sm"
            >
              {{ $t('pages.aboutUs.noDocuments') }}
            </p>
          </template>
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts" setup>
import type { DocumentItem } from '~/types/common'

type DocumentType = 'financial' | 'procurement' | 'reports' | 'other'

const DOCUMENT_TYPES_TABS: {
  label: string
  value: DocumentType
  icon: string
}[] = [
  {
    label: 'pages.aboutUs.financialReports',
    value: 'financial',
    icon: 'ion:document-text',
  },
  {
    label: 'pages.aboutUs.publicProcurement',
    value: 'procurement',
    icon: 'ion:document-text',
  },
  {
    label: 'pages.aboutUs.workReports',
    value: 'reports',
    icon: 'ion:document-text',
  },
  { label: 'pages.aboutUs.other', value: 'other', icon: 'ion:document-text' },
]

const activeDocumentType = ref<DocumentType>('financial')

// TODO: zameniti dummy vrednostima i povezati sa backendom

type DocumentsData = DocumentItem[] | Record<number, DocumentItem[]>

const DOCUMENTS_BY_TYPE: Record<DocumentType, DocumentsData> = {
  financial: {
    2024: [
      {
        title: 'Finansijski izveštaj za 2023. godinu',
        url: '#',
        created_at: '2024-03-15',
      },
      {
        title: 'Finansijski izveštaj za 2022. godinu',
        url: '#',
        created_at: '2024-03-15',
      },
    ],
    2023: [
      {
        title: 'Finansijski izveštaj za 2022. godinu',
        url: '#',
        created_at: '2023-04-10',
      },
      {
        title: 'Finansijski izveštaj za 2021. godinu',
        url: '#',
        created_at: '2023-04-10',
      },
    ],
  },
  procurement: {},
  reports: [
    {
      title: 'Izveštaj o radu za 2024. godinu',
      url: '#',
      created_at: '2025-02-10',
    },
    {
      title: 'Izveštaj o radu za 2023. godinu',
      url: '#',
      created_at: '2024-02-15',
    },
    {
      title: 'Izveštaj o radu za 2022. godinu',
      url: '#',
      created_at: '2023-03-01',
    },
  ],
  other: {},
}

const currentData = computed<DocumentsData>(
  () => DOCUMENTS_BY_TYPE[activeDocumentType.value],
)

const flatDocuments = computed<DocumentItem[] | null>(() =>
  Array.isArray(currentData.value) ? currentData.value : null,
)

const sortedYearEntries = computed<[number, DocumentItem[]][]>(() => {
  if (Array.isArray(currentData.value)) return []
  return (Object.entries(currentData.value) as [string, DocumentItem[]][])
    .map(([year, docs]) => [Number(year), docs] as [number, DocumentItem[]])
    .sort(([a], [b]) => b - a)
})
</script>
