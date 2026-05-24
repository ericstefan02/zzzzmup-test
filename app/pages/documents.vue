<template>
  <div>
    <TextBanner
      :title="$t('pages.documents.title')"
      :description="$t('pages.documents.description')"
    />

    <section
      class="px-4 md:px-16 lg:px-48 py-10 md:py-16 flex flex-col items-center justify-center gap-6 md:gap-8 max-w-480 mx-auto"
    >
      <div
        class="bg-white shadow-sm border border-neutral-200 rounded-xl overflow-hidden w-full"
      >
        <div
          role="tablist"
          class="grid grid-cols-2 md:grid-cols-4 border-b border-neutral-200"
        >
          <button
            v-for="tab in DOCUMENT_TYPES_TABS"
            :key="tab.value"
            type="button"
            role="tab"
            :aria-selected="activeDocumentType === tab.value"
            class="flex items-center justify-center gap-2 px-3 md:px-6 py-3 text-xs md:text-sm font-semibold transition-colors"
            :class="{
              'bg-primary-500 text-white': activeDocumentType === tab.value,
              'text-neutral-500 hover:text-primary-400 hover:bg-primary-50 cursor-pointer':
                activeDocumentType !== tab.value,
            }"
            @click="setActiveTab(tab.value)"
          >
            <Icon :name="tab.icon" size="16" class="shrink-0" />
            <span>{{ $t(tab.label) }}</span>
          </button>
        </div>
        <div role="tabpanel">
          <template v-if="flatDocuments && flatDocuments.length">
            <DocumentTable :documents="flatDocuments" />
          </template>
          <template v-else-if="flatDocuments && !flatDocuments.length">
            <p class="px-6 py-10 text-center text-neutral-400 text-sm">
              {{ $t('pages.documents.noDocuments') }}
            </p>
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
              {{ $t('pages.documents.noDocuments') }}
            </p>
          </template>
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts" setup>
import type { DocumentItem } from '~/types/common'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

useSeoMeta({
  title: () => t('seo.documents.title'),
  description: () => t('seo.documents.description'),
  keywords: () => t('seo.documents.keywords'),
  ogTitle: () => t('seo.documents.title'),
  ogDescription: () => t('seo.documents.description'),
  ogSiteName: () => t('seo.siteName'),
})

type DocumentType = 'financial' | 'procurement' | 'reports' | 'other'

const DOCUMENT_TYPES_TABS: {
  label: string
  value: DocumentType
  icon: string
}[] = [
  {
    label: 'pages.documents.financialReports',
    value: 'financial',
    icon: 'ion:document-text',
  },
  {
    label: 'pages.documents.publicProcurement',
    value: 'procurement',
    icon: 'ion:document-text',
  },
  {
    label: 'pages.documents.workReports',
    value: 'reports',
    icon: 'ion:document-text',
  },
  {
    label: 'pages.documents.other',
    value: 'other',
    icon: 'ion:document-text',
  },
]

const validTypes: DocumentType[] = [
  'financial',
  'procurement',
  'reports',
  'other',
]

const getInitialType = (): DocumentType => {
  const queryType = route.query.type as string
  return validTypes.includes(queryType as DocumentType)
    ? (queryType as DocumentType)
    : 'financial'
}

const activeDocumentType = ref<DocumentType>(getInitialType())

const setActiveTab = (type: DocumentType) => {
  activeDocumentType.value = type
  router.replace({ query: { type } })
}

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

// Watch for query param changes (e.g. when navigating from within the nav)
watch(
  () => route.query,
  () => {
    if (route.path === '/documents') {
      const queryType = route.query.type as string
      if (validTypes.includes(queryType as DocumentType)) {
        activeDocumentType.value = queryType as DocumentType
      }
    }
  },
)
</script>
