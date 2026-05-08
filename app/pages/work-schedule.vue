<template>
  <div>
    <TextBanner
      :title="$t('pages.workSchedule.title')"
      :description="$t('pages.workSchedule.description')"
    />
    <div class="px-4 md:px-12 lg:px-28 flex flex-col gap-6 md:gap-10">
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
                >—</span
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
                  >—</span
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
                  >—</span
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

useSeoMeta({
  title: () => t('seo.workSchedule.title'),
  description: () => t('seo.workSchedule.description'),
  keywords: () => t('seo.workSchedule.keywords'),
  ogTitle: () => t('seo.workSchedule.title'),
  ogDescription: () => t('seo.workSchedule.description'),
  ogSiteName: () => t('seo.siteName'),
})

// TODO: zameniti dummy vrednostima i povezati sa backendom
interface WorkScheduleItem {
  day: string
  doctor: string
  shift?: 1 | 2
  room?: string
}

const currentDepartment = ref('general') // ili 'Kardiologija', može se menjati dinamički
const doctorSearch = ref('') // Za buduću funkcionalnost pretrage doktora

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

const workSchedule: WorkScheduleItem[] = [
  // Ponedeljak - Više doktora u prvoj smeni
  {
    day: 'Ponedeljak',
    shift: 1,
    doctor: 'Dr. Marković',
    room: 'Soba 101',
  },
  {
    day: 'Ponedeljak',
    shift: 1,
    doctor: 'Dr. Lukić',
    room: 'Soba 106',
  },
  {
    day: 'Ponedeljak',
    shift: 1,
    doctor: 'Dr. Marić',
    room: 'Soba 110',
  },
  {
    day: 'Ponedeljak',
    shift: 2,
    doctor: 'Dr. Marković',
    room: 'Soba 101',
  },

  // Utorak - Jednom fali soba
  { day: 'Utorak', shift: 1, doctor: 'Dr. Petrović' },
  {
    day: 'Utorak',
    shift: 1,
    doctor: 'Dr. Simić',
    room: 'Soba 102',
  },
  {
    day: 'Utorak',
    shift: 2,
    doctor: 'Dr. Stanić',
    room: 'Soba 205',
  },

  // Sreda - Više doktora u drugoj smeni, jednom fali smena
  { day: 'Sreda', doctor: 'Dr. Jovanović', room: 'Soba 103' },
  {
    day: 'Sreda',
    shift: 2,
    doctor: 'Dr. Pavlović',
    room: 'Soba 108',
  },
  {
    day: 'Sreda',
    shift: 2,
    doctor: 'Dr. Ilić',
    room: 'Soba 109',
  },

  // Četvrtak
  {
    day: 'Četvrtak',
    shift: 2,
    doctor: 'Dr. Nikolić',
    room: 'Soba 104',
  },
  {
    day: 'Četvrtak',
    shift: 1,
    doctor: 'Dr. Arsić',
    room: 'Soba 112',
  },

  // Petak - Kombinovano
  {
    day: 'Petak',
    shift: 1,
    doctor: 'Dr. Ilić',
    room: 'Soba 105',
  },
  { day: 'Petak', doctor: 'Dr. Kostić' },
  // Subota - Vikend dežurstva i skraćene smene
  {
    day: 'Subota',
    shift: 1,
    doctor: 'Dr. Lukić',
    room: 'Soba 106',
  },
  {
    day: 'Subota',
    shift: 1,
    doctor: 'Dr. Marić',
    room: 'Soba 110',
  },
  {
    day: 'Subota',
    shift: 2,
    doctor: 'Dr. Petrović',
    room: 'Soba 102',
  },
  { day: 'Subota', shift: 2, doctor: 'Dr. Arsić' }, // Fali soba

  // Nedelja - Minimalna postava / Dežurni lekari
  {
    day: 'Nedelja',
    doctor: 'Dr. Simić',
    room: 'Dežurna Služba',
  }, // Fali smena (ceo dan dežuran)
  {
    day: 'Nedelja',
    shift: 1,
    doctor: 'Dr. Nikolić',
    room: 'Soba 104',
  },
]

const cardiologySchedule: WorkScheduleItem[] = [
  // Ponedeljak - Jutarnja gužva na kardiologiji
  {
    day: 'Ponedeljak',
    shift: 1,
    doctor: 'Dr. Popović (Kardiolog)',
    room: 'Kardio 1',
  },
  {
    day: 'Ponedeljak',
    shift: 1,
    doctor: 'Dr. Pejić (Hirurg)',
    room: 'Operaciona Sala A',
  },
  {
    day: 'Ponedeljak',
    shift: 2,
    doctor: 'Dr. Popović (Kardiolog)',
    room: 'Kardio 1',
  },

  // Utorak
  {
    day: 'Utorak',
    shift: 1,
    doctor: 'Dr. Tanasković',
    room: 'Ultrazvuk Kabinet',
  },
  { day: 'Utorak', shift: 1, doctor: 'Dr. Mikić' }, // Nema sobe

  // Sreda
  {
    day: 'Sreda',
    shift: 2,
    doctor: 'Dr. Vasović',
    room: 'Kardio 2',
  },
  {
    day: 'Sreda',
    shift: 2,
    doctor: 'Dr. Đurić',
    room: 'Kardio 3',
  },
  { day: 'Sreda', doctor: 'Dr. Terzić', room: 'Dežurna Služba' }, // Nema smene

  // Četvrtak
  {
    day: 'Četvrtak',
    shift: 1,
    doctor: 'Dr. Filipović',
    room: 'Kardio 1',
  },
  { day: 'Četvrtak', shift: 2, doctor: 'Dr. Filipović' },

  // Petak
  {
    day: 'Petak',
    shift: 1,
    doctor: 'Dr. Živković',
    room: 'Kardio 4',
  },
  {
    day: 'Petak',
    shift: 1,
    doctor: 'Dr. Jović',
    room: 'Kardio 5',
  },
  {
    day: 'Petak',
    shift: 2,
    doctor: 'Dr. Jović',
    room: 'Kardio 5',
  },
  // Subota - Hitne intervencije i pregledi
  {
    day: 'Subota',
    shift: 1,
    doctor: 'Dr. Popović (Kardiolog)',
    room: 'Kardio 1',
  },
  {
    day: 'Subota',
    shift: 1,
    doctor: 'Dr. Tanasković',
    room: 'Kardio 2',
  },
  {
    day: 'Subota',
    doctor: 'Dr. Pejić (Hirurg)',
    room: 'Operaciona Sala A',
  }, // Fali smena (pripravnost)

  // Nedelja - Dežurstva
  {
    day: 'Nedelja',
    shift: 2,
    doctor: 'Dr. Đurić',
    room: 'Kardio 3',
  },
  {
    day: 'Nedelja',
    shift: 1,
    doctor: 'Dr. Filipović',
    room: 'Kardio 1',
  },
  {
    day: 'Nedelja',
    doctor: 'Dr. Vasović',
  }, // Samo doktor (nema sobe ni smene - on-call)
]

const currentSchedule = computed(() => {
  if (currentDepartment.value === 'cardiology') {
    return cardiologySchedule
  }
  return workSchedule
})

const returnSceheduleTime = (shift?: 1 | 2) => {
  if (shift === 1) return '08:00 - 14:00'
  if (shift === 2) return '14:00 - 20:00'
  return 'N/A'
}

const detachedClinicsSchedule: DetachmentClinicScheduleItem[] = [
  {
    doctor: 'Dr. Jovanović',
    clinic: {
      name: 'Dom Zdravlja Novi Sad',
      address: 'Bulevar Oslobođenja 123, Novi Sad',
      phoneNumber: '+381 21 1234567',
    },
  },
  {
    doctor: 'Dr. Stanić',
    clinic: {
      name: 'Poliklinika Zdravlje',
      address: 'Kralja Petra 45, Novi Sad',
      phoneNumber: '+381 21 7654321',
    },
  },
  {
    doctor: 'Dr. Vasović',
    clinic: {
      name: 'Dom Zdravlja Petrovaradin',
      address: 'Petrovaradinska 10, Novi Sad',
      phoneNumber: '+381 21 2468101',
    },
  },

  {
    doctor: 'Dr. Đurić',
    clinic: {
      name: 'Poliklinika Zdravlje',
      address: 'Kralja Petra 45, Novi Sad',
      phoneNumber: '+381 21 7654321',
    },
  },
]
</script>
