<template>
  <div>
    <TextBanner
      :title="$t('pages.documents.title')"
      :description="$t('pages.documents.description')"
      parent-label="nav.aboutUs"
      parent-to="/about-us"
    />

    <section
      class="px-4 md:px-16 lg:px-48 py-10 md:py-16 flex flex-col items-center justify-center gap-6 md:gap-8 max-w-480 mx-auto"
    >
      <div
        class="bg-white shadow-sm border border-neutral-200 rounded-xl overflow-hidden w-full"
      >
        <div
          ref="tablistRef"
          role="tablist"
          class="flex overflow-x-auto border-b border-neutral-200"
        >
          <button
            v-for="tab in DOCUMENT_TYPES_TABS"
            :key="tab.value"
            type="button"
            role="tab"
            :aria-selected="activeDocumentType === tab.value"
            class="flex flex-1 items-center justify-center gap-2 whitespace-nowrap px-5 py-3 text-sm font-semibold transition-colors"
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

type DocumentType =
  | 'statute'
  | 'financial'
  | 'work-plan'
  | 'normative'
  | 'procurement'

const DOCUMENT_TYPES_TABS: {
  label: string
  value: DocumentType
  icon: string
}[] = [
  {
    label: 'pages.documents.statute',
    value: 'statute',
    icon: 'ion:document-text',
  },
  {
    label: 'pages.documents.financialReports',
    value: 'financial',
    icon: 'ion:stats-chart',
  },
  {
    label: 'pages.documents.workPlan',
    value: 'work-plan',
    icon: 'ion:clipboard',
  },
  {
    label: 'pages.documents.normativeActs',
    value: 'normative',
    icon: 'ion:book',
  },
  {
    label: 'pages.documents.publicProcurement',
    value: 'procurement',
    icon: 'ion:cart',
  },
]

const validTypes: DocumentType[] = [
  'statute',
  'financial',
  'work-plan',
  'normative',
  'procurement',
]

const getInitialType = (): DocumentType => {
  const queryType = route.query.type as string
  return validTypes.includes(queryType as DocumentType)
    ? (queryType as DocumentType)
    : 'statute'
}

const activeDocumentType = ref<DocumentType>(getInitialType())
const tablistRef = ref<HTMLElement | null>(null)

const scrollActiveTabIntoView = () => {
  nextTick(() => {
    const active = tablistRef.value?.querySelector(
      '[aria-selected="true"]',
    ) as HTMLElement | null
    active?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    })
  })
}

const setActiveTab = (type: DocumentType) => {
  activeDocumentType.value = type
  router.replace({ query: { type } })
  scrollActiveTabIntoView()
}

onMounted(scrollActiveTabIntoView)

// TODO: zameniti dummy vrednostima i povezati sa backendom

type DocumentsData = DocumentItem[] | Record<number, DocumentItem[]>

const DOCUMENTS_BY_TYPE: Record<DocumentType, DocumentsData> = {
  statute: [
    {
      title: 'Statut Zavoda za zdravstvenu zaštitu radnika MUP-a',
      url: '#',
      created_at: '2023-01-20',
    },
  ],
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
  'work-plan': [
    {
      title: 'Plan rada za 2025. godinu',
      url: '#',
      created_at: '2024-12-15',
    },
    {
      title: 'Plan rada za 2024. godinu',
      url: '#',
      created_at: '2023-12-20',
    },
  ],
  normative: [
    {
      title: 'Pravilnik o organizaciji i sistematizaciji radnih mesta',
      url: '#',
      created_at: '2023-06-01',
    },
    {
      title: 'Poslovnik o radu Upravnog odbora',
      url: '#',
      created_at: '2023-02-10',
    },
  ],
  procurement: {},
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
        scrollActiveTabIntoView()
      }
    }
  },
)
</script>
