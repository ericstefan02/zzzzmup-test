<template>
  <div class="flex flex-col">
    <TextBanner
      :title="$t('pages.services.title')"
      :description="$t('pages.services.description')"
    />
    <div
      class="px-4 md:px-12 lg:px-28 flex flex-col lg:grid lg:grid-cols-4 items-start gap-6 lg:gap-12 my-6 md:my-10 max-w-480 mx-auto w-full"
    >
      <nav
        ref="mobileNavRef"
        class="w-full lg:w-auto flex flex-col gap-3 lg:gap-0"
        aria-label="Službe"
      >
        <!-- Search -->
        <div class="relative w-full">
          <Icon
            name="ion:search"
            size="16"
            class="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
          />
          <input
            v-model="search"
            type="search"
            :placeholder="$t('pages.services.searchPlaceholder')"
            class="w-full rounded-lg border border-neutral-200 bg-white pl-9 pr-3 py-2.5 text-sm outline-none focus:border-primary-400"
          >
        </div>

        <!-- Mobile: horizontal pills -->
        <div class="flex lg:hidden gap-2 overflow-x-auto">
          <button
            v-for="department in visibleDepartments"
            :key="'m-' + department.id"
            type="button"
            class="whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer border"
            :class="
              selectedDepartment?.id === department.id && !selectedGroupExam
                ? 'bg-primary-500 text-white border-primary-500'
                : 'bg-white text-neutral-700 border-neutral-200 hover:bg-primary-50 hover:text-primary-500'
            "
            @click="selectDepartment(department)"
          >
            {{ department.title }}
          </button>
          <button
            v-for="exam in visibleGroupExams"
            :key="'mg-' + exam.id"
            type="button"
            class="whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer border"
            :class="
              selectedGroupExam?.id === exam.id
                ? 'bg-primary-500 text-white border-primary-500'
                : 'bg-white text-neutral-700 border-neutral-200 hover:bg-primary-50 hover:text-primary-500'
            "
            @click="selectGroupExam(exam)"
          >
            {{ exam.title }}
          </button>
        </div>

        <!-- Desktop: grouped sidebar -->
        <div
          class="hidden lg:block lg:rounded-xl lg:border lg:border-neutral-200 lg:shadow-xs overflow-hidden"
        >
          <template v-if="medicalDepartments.length">
            <div
              class="flex p-4 items-center gap-2 border-b border-neutral-200"
            >
              <Icon name="ion:medkit" size="18" class="text-primary-400" />
              <h2 class="text-primary-900 text-base font-bold">
                {{ $t('nav.medicalServices') }}
              </h2>
            </div>
            <DepartmentButton
              v-for="department in medicalDepartments"
              :key="department.id"
              :department="department"
              :selected="
                selectedDepartment?.id === department.id && !selectedGroupExam
              "
              @select="selectDepartment($event)"
            />
          </template>

          <template v-if="otherDepartments.length">
            <div
              class="flex p-4 items-center gap-2 border-t border-b border-neutral-200"
            >
              <Icon name="ion:briefcase" size="18" class="text-primary-400" />
              <h2 class="text-primary-900 text-base font-bold">
                {{ $t('nav.otherServices') }}
              </h2>
            </div>
            <DepartmentButton
              v-for="department in otherDepartments"
              :key="department.id"
              :department="department"
              :selected="
                selectedDepartment?.id === department.id && !selectedGroupExam
              "
              @select="selectDepartment($event)"
            />
          </template>

          <template v-if="visibleGroupExams.length">
            <div
              class="flex p-4 items-center gap-2 border-t border-b border-neutral-200"
            >
              <Icon name="ion:people" size="18" class="text-primary-400" />
              <h2 class="text-primary-900 text-base font-bold">
                {{ $t('pages.services.groupExamsTitle') }}
              </h2>
            </div>
            <button
              v-for="exam in visibleGroupExams"
              :key="'g-' + exam.id"
              type="button"
              class="w-full px-5 py-3.5 cursor-pointer transition-colors duration-200 flex items-center justify-between border-l-4"
              :class="
                selectedGroupExam?.id === exam.id
                  ? 'bg-primary-100 text-primary-500 border-l-primary-500'
                  : 'text-neutral-700 bg-white hover:bg-primary-100 hover:text-primary-500 border-l-transparent'
              "
              @click="selectGroupExam(exam)"
            >
              <span class="text-sm font-medium text-left">{{ exam.title }}</span>
              <Icon
                name="ion:chevron-forward"
                size="16"
                class="text-neutral-400"
                :class="
                  selectedGroupExam?.id === exam.id ? 'text-primary-500' : ''
                "
              />
            </button>
          </template>

          <p
            v-if="
              !medicalDepartments.length &&
              !otherDepartments.length &&
              !visibleGroupExams.length
            "
            class="px-5 py-6 text-sm text-neutral-400"
          >
            {{ $t('pages.services.noResults') }}
          </p>
        </div>
      </nav>

      <!-- Right side content -->
      <section class="lg:col-span-3 flex flex-col gap-8 w-full lg:w-auto">
        <template v-if="!selectedGroupExam && selectedDepartment">
          <div class="flex flex-col gap-1">
            <h2 class="text-2xl font-bold text-primary-900">
              {{ selectedDepartment.title }}
            </h2>
            <p v-if="selectedDepartment.description" class="text-lg text-neutral-500">
              {{ selectedDepartment.description }}
            </p>
          </div>
          <div class="w-full h-px bg-neutral-200" />
          <ServicesList :department-id="selectedDepartment.id" />
        </template>

        <GroupExamDetail v-if="selectedGroupExam" :exam="selectedGroupExam" />
      </section>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { Department, GroupExam } from '~/types/services'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const queryString = (val: unknown): string | undefined => {
  if (Array.isArray(val)) return val[0] ?? undefined
  return (val as string) ?? undefined
}

useSeoMeta({
  title: () => t('seo.services.title'),
  description: () => t('seo.services.description'),
  keywords: () => t('seo.services.keywords'),
  ogTitle: () => t('seo.services.title'),
  ogDescription: () => t('seo.services.description'),
  ogSiteName: () => t('seo.siteName'),
})

// Grupe usluga (nova klijentova podela). Konkretne usluge po grupi dolaze sa API-ja.
const DEPARTMENT_CONFIG: {
  id: number
  titleKey: string
  group: 'medical' | 'other'
}[] = [
  { id: 1, titleKey: 'nav.generalMedicine', group: 'medical' },
  { id: 2, titleKey: 'nav.gynecology', group: 'medical' },
  { id: 3, titleKey: 'nav.internalMedicine', group: 'medical' },
  { id: 4, titleKey: 'nav.ophthalmology', group: 'medical' },
  { id: 5, titleKey: 'nav.otorhinolaryngology', group: 'medical' },
  { id: 6, titleKey: 'nav.physicalMedicine', group: 'medical' },
  { id: 7, titleKey: 'nav.psychiatry', group: 'medical' },
  { id: 8, titleKey: 'nav.psychologicalSupport', group: 'medical' },
  { id: 9, titleKey: 'nav.occupationalMedicine', group: 'medical' },
  { id: 10, titleKey: 'nav.radiology', group: 'medical' },
  { id: 11, titleKey: 'nav.xray', group: 'medical' },
  { id: 12, titleKey: 'nav.ultrasound', group: 'medical' },
  { id: 13, titleKey: 'nav.mammography', group: 'medical' },
  { id: 14, titleKey: 'nav.sportsMedicine', group: 'medical' },
  { id: 15, titleKey: 'nav.labDiagnostics', group: 'medical' },
  { id: 16, titleKey: 'nav.pharmacy', group: 'medical' },
  { id: 17, titleKey: 'nav.legalService', group: 'other' },
  { id: 18, titleKey: 'nav.technicalService', group: 'other' },
]

const allDepartments = computed(() =>
  DEPARTMENT_CONFIG.map((d) => ({
    id: d.id,
    title: t(d.titleKey),
    description: '',
    group: d.group,
  })),
)

// TODO: zameniti dummy vrednostima i povezati sa backendom
const groupExams: GroupExam[] = [
  {
    id: 1,
    title: 'Sistematski pregled za specijalne jedinice',
    description:
      'Kompletan sistematski pregled koji obuhvata internistički pregled, EKG, laboratorijske analize krvi i urina, spirometriju, oftalmološki pregled, ORL pregled, neurološki pregled i psihološku procenu.',
    documentationRequired:
      'Lična karta, službena legitimacija, uput od nadležne organizacione jedinice, zdravstveni karton',
    price: 15000,
  },
  {
    id: 2,
    title: 'Sistematski pregled za policijske službenike',
    description:
      'Standardni sistematski pregled za redovne policijske službenike. Uključuje internistički pregled, EKG, osnovne laboratorijske analize, pregled vida i sluha.',
    documentationRequired:
      'Lična karta, službena legitimacija, uput od kadrovske službe',
    price: 12000,
  },
  {
    id: 3,
    title: 'Sistematski pregled za vatrogasno-spasilačke jedinice',
    description:
      'Prošireni sistematski pregled prilagođen zahtevima vatrogasno-spasilačke službe. Obuhvata kompletnu internističku obradu, ergometriju, spirometriju i procenu fizičke sposobnosti.',
    documentationRequired:
      'Lična karta, službena legitimacija, uput od nadležne jedinice, prethodni nalazi (ako postoje)',
    price: 18000,
  },
]

const search = ref('')
const matches = (title: string) =>
  title.toLowerCase().includes(search.value.trim().toLowerCase())

const medicalDepartments = computed(() =>
  allDepartments.value.filter((d) => d.group === 'medical' && matches(d.title)),
)
const otherDepartments = computed(() =>
  allDepartments.value.filter((d) => d.group === 'other' && matches(d.title)),
)
const visibleDepartments = computed(() => [
  ...medicalDepartments.value,
  ...otherDepartments.value,
])
const visibleGroupExams = computed(() =>
  groupExams.filter((e) => matches(e.title)),
)

const selectedDepartment = ref<Department | null>(null)
const selectedGroupExam = ref<GroupExam | null>(null)
const mobileNavRef = ref<HTMLElement | null>(null)

const scrollActiveIntoView = () => {
  nextTick(() => {
    const active = mobileNavRef.value?.querySelector(
      '.bg-primary-500',
    ) as HTMLElement | null
    active?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    })
  })
}

const selectDepartment = (department: Department, updateUrl = true) => {
  selectedDepartment.value = department
  selectedGroupExam.value = null
  if (updateUrl) {
    router.replace({ query: { department: String(department.id) } })
  }
  scrollActiveIntoView()
}

const selectGroupExam = (exam: GroupExam, updateUrl = true) => {
  selectedGroupExam.value = exam
  selectedDepartment.value = null
  if (updateUrl) {
    router.replace({ query: { group: String(exam.id) } })
  }
  scrollActiveIntoView()
}

const applyQueryParams = () => {
  const deptId = Number(queryString(route.query.department))
  const section = queryString(route.query.section)
  const groupId = Number(queryString(route.query.group))

  if (section === 'group' || groupId) {
    if (groupId) {
      const found = groupExams.find((e) => e.id === groupId)
      if (found) {
        selectGroupExam(found, false)
        return
      }
    }
    if (groupExams.length) {
      selectGroupExam(groupExams[0]!, false)
    }
    return
  }

  if (deptId) {
    const found = allDepartments.value.find((d) => d.id === deptId)
    if (found) {
      selectDepartment(found, false)
      return
    }
  }

  // Default: prva grupa
  if (allDepartments.value.length) {
    selectDepartment(allDepartments.value[0]!, false)
  }
}

applyQueryParams()

watch(
  () => route.query,
  () => {
    if (route.path === '/services') {
      applyQueryParams()
    }
  },
)
</script>
