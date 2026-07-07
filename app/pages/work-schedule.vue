<template>
  <div>
    <TextBanner
      :title="$t('pages.workSchedule.title')"
      :description="$t('pages.workSchedule.description')"
    >
      <div
        class="px-4 md:px-5 py-2.5 md:py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg md:max-w-max"
      >
        <div class="flex items-center gap-3">
          <Icon name="ion:calendar-clear" size="20" class="text-white" />
          <div>
            <p class="font-medium uppercase text-xs text-[#C2D5FA]">
              {{ $t('pages.workSchedule.scheduleValidityLabel') }}
            </p>
            <p class="font-bold text-white md:text-lg">
              {{ currentWeekRange }}
            </p>
          </div>
        </div>
      </div>
    </TextBanner>
    <div
      class="px-4 md:px-12 lg:px-28 flex flex-col gap-6 md:gap-10 max-w-480 mx-auto w-full"
    >
      <div
        class="px-4 md:px-8 py-8 md:py-12 gap-6 grid grid-cols-1 md:grid-cols-2 bg-white rounded-xl shadow-lg -mt-6 sm:-mt-10 relative"
      >
        <Select
          v-model="currentDepartment"
          :label="$t('pages.workSchedule.departmentLabel')"
          :placeholder="$t('pages.workSchedule.departmentPlaceholder')"
          :options="departments"
        />

        <Input
          v-model="doctorSearch"
          :label="$t('pages.workSchedule.doctorLabel')"
          type="text"
          :placeholder="$t('pages.workSchedule.doctorPlaceholder')"
        />
      </div>

      <!-- Mobile: card layout -->
      <div class="flex flex-col gap-4 md:hidden">
        <div
          v-for="day in daysOfWeek"
          :key="day.key"
          class="bg-white rounded-xl shadow overflow-hidden"
        >
          <div class="bg-primary-50 px-4 py-3 flex items-center gap-2">
            <Icon class="text-primary-400 shrink-0" name="ion:calendar-clear" />
            <span class="text-primary-900 font-bold">{{ $t(day.label) }}</span>
          </div>
          <div class="divide-y divide-neutral-100">
            <div
              v-for="shiftNum in [1, 2] as const"
              :key="shiftNum"
              class="px-4 py-3"
            >
              <p
                class="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2"
              >
                {{
                  shiftNum === 1
                    ? $t('pages.workSchedule.firstShift')
                    : $t('pages.workSchedule.secondShift')
                }}
              </p>
              <div
                v-for="item in currentSchedule.filter(
                  (s) => s.day === day.key && s.shift === shiftNum,
                )"
                :key="item.doctor"
                class="flex items-center justify-between gap-2 py-1.5"
              >
                <div class="flex items-center gap-2 min-w-0">
                  <span
                    class="font-semibold text-primary-900 text-sm truncate"
                    >{{ item.doctor }}</span
                  >
                  <span class="text-neutral-400">·</span>
                  <span class="text-sm text-neutral-500 truncate">{{
                    item.room || 'N/A'
                  }}</span>
                </div>
                <span
                  class="text-xs text-primary-500 bg-primary-50 rounded-full px-2 py-0.5 font-medium whitespace-nowrap shrink-0"
                >
                  {{ returnSceheduleTime(item.shift) }}
                </span>
              </div>
              <span
                v-if="
                  !currentSchedule.filter(
                    (s) => s.day === day.key && s.shift === shiftNum,
                  ).length
                "
                class="text-sm text-neutral-300 italic"
                >-</span
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Desktop: table layout -->
      <div class="overflow-x-auto hidden md:block">
        <table class="w-full rounded-xl overflow-hidden shadow">
          <thead>
            <tr
              class="bg-primary-500 text-white uppercase font-bold text-sm tracking-wide"
            >
              <th class="px-6 py-4 text-left">
                {{ $t('pages.workSchedule.dayColumn') }}
              </th>
              <th class="px-6 py-4 text-left">
                {{ $t('pages.workSchedule.firstShift') }}
              </th>
              <th class="px-6 py-4 text-left">
                {{ $t('pages.workSchedule.secondShift') }}
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-neutral-100">
            <tr
              v-for="day in daysOfWeek"
              :key="day.key"
              class="bg-white hover:bg-primary-50/50 transition-colors duration-150"
            >
              <td class="px-6 py-5 bg-primary-50">
                <div class="flex items-center gap-2">
                  <Icon
                    class="text-primary-400 shrink-0"
                    name="ion:calendar-clear"
                  />
                  <span class="text-primary-900 font-bold">{{
                    $t(day.label)
                  }}</span>
                </div>
              </td>
              <td class="px-6 py-5">
                <div
                  v-for="item in currentSchedule.filter(
                    (s) => s.day === day.key && s.shift === 1,
                  )"
                  :key="item.doctor"
                  class="flex items-center gap-2 py-1"
                >
                  <span class="font-semibold text-primary-900">{{
                    item.doctor
                  }}</span>
                  <span class="text-neutral-400">·</span>
                  <span class="text-sm text-neutral-500">{{
                    item.room || 'N/A'
                  }}</span>
                  <span
                    class="ml-auto text-xs text-primary-500 bg-primary-50 rounded-full px-2.5 py-0.5 font-medium"
                  >
                    {{ returnSceheduleTime(item.shift) }}
                  </span>
                </div>
                <span
                  v-if="
                    !currentSchedule.filter(
                      (s) => s.day === day.key && s.shift === 1,
                    ).length
                  "
                  class="text-sm text-neutral-300 italic w-full text-center block"
                  >-</span
                >
              </td>
              <td class="px-6 py-5">
                <div
                  v-for="item in currentSchedule.filter(
                    (s) => s.day === day.key && s.shift === 2,
                  )"
                  :key="item.doctor"
                  class="flex items-center gap-2 py-1"
                >
                  <span class="font-semibold text-primary-900">{{
                    item.doctor
                  }}</span>
                  <span class="text-neutral-400">·</span>
                  <span class="text-sm text-neutral-500">{{
                    item.room || 'N/A'
                  }}</span>
                  <span
                    class="ml-auto text-xs text-primary-500 bg-primary-50 rounded-full px-2.5 py-0.5 font-medium"
                  >
                    {{ returnSceheduleTime(item.shift) }}
                  </span>
                </div>
                <span
                  v-if="
                    !currentSchedule.filter(
                      (s) => s.day === day.key && s.shift === 2,
                    ).length
                  "
                  class="text-sm text-neutral-300 italic text-center w-full block"
                  >-</span
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        class="rounded-xl md:bg-white flex flex-col gap-4 md:gap-6 md:p-8 md:shadow md:border border-neutral-200 mb-6 md:mb-10"
      >
        <div class="flex items-center gap-3">
          <Icon name="ion:business" size="30" class="text-primary-400" />
          <p class="text-xl sm:text-2xl font-bold text-primary-900">
            {{ $t('pages.workSchedule.detachedClinicsTitle') }}
          </p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <DetachmentClinicScheduleCard
            v-for="(item, index) in detachedClinicsSchedule"
            :key="index"
            :schedule="item"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { DetachmentClinicScheduleItem } from '~/types/schedule'

const { t } = useI18n()
const route = useRoute()

const MONTH_KEYS = [
  'months.january',
  'months.february',
  'months.march',
  'months.april',
  'months.may',
  'months.june',
  'months.july',
  'months.august',
  'months.september',
  'months.october',
  'months.november',
  'months.december',
] as const

const currentWeekRange = computed(() => {
  const now = new Date()
  const dayOfWeek = now.getDay()
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek

  const monday = new Date(now)
  monday.setDate(now.getDate() + diffToMonday)

  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)

  const formatDate = (date: Date) => {
    const month = t(MONTH_KEYS[date.getMonth()]!)
    return `${date.getDate()}. ${month}`
  }

  if (monday.getFullYear() !== sunday.getFullYear()) {
    return `${formatDate(monday)} ${monday.getFullYear()}. - ${formatDate(sunday)} ${sunday.getFullYear()}.`
  }

  return `${formatDate(monday)} - ${formatDate(sunday)}, ${monday.getFullYear()}.`
})

useSeoMeta({
  title: () => t('seo.workSchedule.title'),
  description: () => t('seo.workSchedule.description'),
  keywords: () => t('seo.workSchedule.keywords'),
  ogTitle: () => t('seo.workSchedule.title'),
  ogDescription: () => t('seo.workSchedule.description'),
  ogSiteName: () => t('seo.siteName'),
})

// TODO: zameniti dummy vrednostima i povezati sa backendom (dummy-data.ts)
// Odeljenje se može zadati preko ?department= (npr. rezultat pretrage sajta)
const departmentFromQuery = () =>
  queryString(route.query.department) === 'cardiology' ? 'cardiology' : 'general'

const currentDepartment = ref(departmentFromQuery())
const doctorSearch = ref('') // Za buduću funkcionalnost pretrage doktora

watch(
  () => route.query.department,
  () => {
    if (route.path === '/work-schedule') {
      currentDepartment.value = departmentFromQuery()
    }
  },
)

const daysOfWeek = [
  { key: 'Ponedeljak', label: 'days.monday' },
  { key: 'Utorak', label: 'days.tuesday' },
  { key: 'Sreda', label: 'days.wednesday' },
  { key: 'Četvrtak', label: 'days.thursday' },
  { key: 'Petak', label: 'days.friday' },
  { key: 'Subota', label: 'days.saturday' },
  { key: 'Nedelja', label: 'days.sunday' },
]

const departments = [
  { label: 'Opšte', value: 'general' },
  { label: 'Kardiologija', value: 'cardiology' },
] // Lista odeljenja, može se proširiti

const currentSchedule = computed(() => {
  if (currentDepartment.value === 'cardiology') {
    return WORK_SCHEDULE_CARDIOLOGY
  }
  return WORK_SCHEDULE_GENERAL
})

const returnSceheduleTime = (shift?: 1 | 2) => {
  if (shift === 1) return '08:00 - 14:00'
  if (shift === 2) return '14:00 - 20:00'
  return 'N/A'
}

const detachedClinicsSchedule: DetachmentClinicScheduleItem[] =
  DETACHED_CLINICS_SCHEDULE
</script>
