<template>
  <div class="flex flex-col">
    <TextBanner
      :title="$t('pages.services.title')"
      :description="$t('pages.services.description')"
    />
    <div
      class="px-4 md:px-12 lg:px-28 flex flex-col lg:grid lg:grid-cols-4 items-start gap-6 lg:gap-12 my-6 md:my-10"
    >
      <nav
        ref="mobileNavRef"
        class="w-full lg:w-auto flex lg:flex-col lg:rounded-xl lg:border lg:border-neutral-200 lg:shadow-xs overflow-x-auto lg:overflow-hidden gap-2 lg:gap-0"
        aria-label="Odeljenja"
      >
        <!-- Departments section header (desktop only) -->
        <div
          class="hidden lg:flex p-4 items-center gap-2 border-b border-neutral-200"
        >
          <Icon name="ion:layers" size="18" class="text-primary-400" />
          <h2 class="text-primary-900 text-lg font-bold">
            {{ $t('pages.services.departmentsLabel') }}
          </h2>
        </div>
        <!-- Department buttons (mobile: horizontal pills) -->
        <button
          v-for="department in departments"
          :key="department.id"
          type="button"
          class="lg:hidden whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer border"
          :class="
            selectedDepartment?.id === department.id && !selectedGroupExam
              ? 'bg-primary-500 text-white border-primary-500'
              : 'bg-white text-neutral-700 border-neutral-200 hover:bg-primary-50 hover:text-primary-500'
          "
          @click="selectDepartment(department)"
        >
          {{ department.title }}
        </button>
        <!-- Group exam buttons (mobile: horizontal pills) -->
        <button
          v-for="exam in groupExams"
          :key="'group-' + exam.id"
          type="button"
          class="lg:hidden whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer border"
          :class="
            selectedGroupExam?.id === exam.id
              ? 'bg-primary-500 text-white border-primary-500'
              : 'bg-white text-neutral-700 border-neutral-200 hover:bg-primary-50 hover:text-primary-500'
          "
          @click="selectGroupExam(exam)"
        >
          {{ exam.title }}
        </button>
        <!-- Department buttons (desktop: sidebar list) -->
        <div class="hidden lg:block">
          <DepartmentButton
            v-for="department in departments"
            :key="department.id"
            :department="department"
            :selected="
              selectedDepartment?.id === department.id && !selectedGroupExam
            "
            @select="selectDepartment($event)"
          />
        </div>
        <!-- Group exams section header (desktop only) -->
        <div
          class="hidden lg:flex p-4 items-center gap-2 border-t border-b border-neutral-200"
        >
          <Icon name="ion:people" size="18" class="text-primary-400" />
          <h2 class="text-primary-900 text-lg font-bold">
            {{ $t('pages.services.groupExamsTitle') }}
          </h2>
        </div>
        <!-- Group exam buttons (desktop: sidebar list) -->
        <div class="hidden lg:block">
          <button
            v-for="exam in groupExams"
            :key="'group-' + exam.id"
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
        </div>
      </nav>

      <!-- Right side content -->
      <section class="lg:col-span-3 flex flex-col gap-8 w-full lg:w-auto">
        <!-- Department services view -->
        <template v-if="!selectedGroupExam && selectedDepartment">
          <div class="flex flex-col gap-1">
            <h2 class="text-2xl font-bold text-primary-900">
              {{ selectedDepartment.title }}
            </h2>
            <p class="text-lg text-neutral-500">
              {{ selectedDepartment.description }}
            </p>
          </div>
          <div class="w-full h-px bg-neutral-200" />
          <ServicesList :department-id="selectedDepartment.id" />
        </template>

        <!-- Group exam detail view -->
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

const departments: Department[] = [
  {
    id: 1,
    title: 'Opšta medicina',
    description: 'Pregledi i konsultacije sa opštim lekarima.',
  },
  {
    id: 2,
    title: 'Specijalistički pregledi',
    description:
      'Specijalistički pregledi i konsultacije sa različitim specijalistima.',
  },
  {
    id: 3,
    title: 'Dijagnostika',
    description: 'Dijagnostičke procedure i laboratorijske analize.',
  },
  {
    id: 4,
    title: 'Fizioterapija',
    description: 'Fizioterapijske usluge i rehabilitacija.',
  },
  {
    id: 5,
    title: 'Stomatologija',
    description: 'Stomatološke usluge i pregledi.',
  },
  {
    id: 6,
    title: 'Psihološka podrška',
    description: 'Psihološka podrška i savetovanje.',
  },
]

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
    // Default to first group exam if section=group without specific id
    if (groupExams.length) {
      selectGroupExam(groupExams[0]!, false)
    }
    return
  }

  if (deptId) {
    const found = departments.find((d) => d.id === deptId)
    if (found) {
      selectDepartment(found, false)
      return
    }
  }

  // Default: first department
  if (departments.length) {
    selectDepartment(departments[0]!, false)
  }
}

// Apply on initial load
applyQueryParams()

// Watch for query param changes (e.g. when navigating from within the nav)
watch(
  () => route.query,
  () => {
    if (route.path === '/services') {
      applyQueryParams()
    }
  },
)
</script>
