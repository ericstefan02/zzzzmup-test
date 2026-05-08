<template>
  <div>
    <TextBanner
      :title="$t('pages.preventiveCenter.title')"
      :description="$t('pages.preventiveCenter.description')"
    />
    <address
      class="grid gap-6 bg-white grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-4 md:px-12 lg:px-28 py-8 md:py-12 not-italic drop-shadow"
    >
      <NuxtLink
        class="flex items-center gap-4"
        :to="MAPS_EMBED_URL"
        target="_blank"
      >
        <div
          class="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center"
        >
          <Icon name="ion:location" size="20" class="text-primary-400" />
        </div>
        <div class="flex flex-col gap-0.5">
          <p class="font-semibold text-xs text-neutral-500">
            {{ $t('pages.preventiveCenter.addressLabel') }}
          </p>
          <p class="font-semibold text-primary-900">
            {{ $t('pages.preventiveCenter.addressValue') }}
          </p>
        </div>
      </NuxtLink>
      <NuxtLink class="flex items-center gap-4" :to="PHONE_NUMBER_URL">
        <div
          class="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center"
        >
          <Icon name="ion:call" size="20" class="text-primary-400" />
        </div>
        <div class="flex flex-col gap-0.5">
          <p class="font-semibold text-xs text-neutral-500">
            {{ $t('pages.preventiveCenter.phoneLabel') }}
          </p>
          <p class="font-semibold text-primary-900">011/3615-665</p>
        </div>
      </NuxtLink>
      <NuxtLink class="flex items-center gap-4" :to="EMAIL_ADDRESS_URL">
        <div
          class="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center"
        >
          <Icon name="ion:mail" size="20" class="text-primary-400" />
        </div>
        <div class="flex flex-col gap-0.5">
          <p class="font-semibold text-xs text-neutral-500">
            {{ $t('pages.preventiveCenter.emailLabel') }}
          </p>
          <p class="font-semibold text-primary-900">
            preventivni.centar@zzzzmup.rs
          </p>
        </div>
      </NuxtLink>
      <div class="flex items-center gap-4">
        <div
          class="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center"
        >
          <Icon name="ion:android-time" size="20" class="text-primary-400" />
        </div>
        <div class="flex flex-col gap-0.5">
          <p class="font-semibold text-xs text-neutral-500">
            {{ $t('pages.preventiveCenter.workingHoursLabel') }}
          </p>
          <p class="font-semibold text-primary-900">
            {{ $t('pages.preventiveCenter.workingHoursValue') }}
          </p>
        </div>
      </div>
    </address>
    <div
      class="px-4 md:px-12 lg:px-28 py-6 md:py-12 flex flex-col gap-8 md:gap-16"
    >
      <section class="flex flex-col gap-12">
        <div class="flex flex-col gap-4 items-center">
          <h3 class="text-center font-bold text-2xl sm:text-3xl">
            {{ $t('pages.preventiveCenter.counselingTitle') }}
          </h3>
          <p class="text-center text-neutral-500 text-lg">
            {{ $t('pages.preventiveCenter.counselingDescription') }}
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            class="bg-white p-6 md:p-10 flex flex-col gap-4 rounded-2xl shadow"
          >
            <div
              class="w-14 h-14 sm:w-16 sm:h-16 bg-primary-50 text-primary-400 flex items-center justify-center rounded-2xl"
            >
              <Icon name="ion:heart" size="30" />
            </div>
            <h4 class="text-xl md:text-2xl font-bold text-primary-900">
              {{ $t('pages.preventiveCenter.preventiveCounseling') }}
            </h4>
            <p class="text-base md:text-lg text-neutral-500">
              {{ $t('pages.preventiveCenter.preventiveCounselingDesc') }}
            </p>
          </div>
          <div
            class="bg-white p-6 md:p-10 flex flex-col gap-4 rounded-2xl shadow"
          >
            <div
              class="w-14 h-14 sm:w-16 sm:h-16 bg-primary-50 text-primary-400 flex items-center justify-center rounded-2xl"
            >
              <Icon name="ion:md-pulse" size="30" />
            </div>
            <h4 class="text-xl md:text-2xl font-bold text-primary-900">
              {{ $t('pages.preventiveCenter.diabetesCounseling') }}
            </h4>
            <p class="text-base md:text-lg text-neutral-500">
              {{ $t('pages.preventiveCenter.diabetesCounselingDesc') }}
            </p>
          </div>
        </div>
      </section>
      <section class="flex flex-col gap-8 sm:gap-12">
        <div class="flex flex-col gap-4 items-center">
          <h3 class="text-center font-bold text-2xl sm:text-3xl">
            {{ $t('pages.preventiveCenter.calendarTitle') }}
          </h3>
          <p class="text-center text-neutral-500 text-lg">
            {{ $t('pages.preventiveCenter.calendarDescription') }}
          </p>
        </div>
        <div
          class="bg-white shadow-sm border border-neutral-200 rounded-xl overflow-hidden w-full"
        >
          <CalendarYearAccordion
            v-for="[year, items] in sortedCalendarEntries"
            :key="year"
            :year="year"
            :items="items"
          />
          <p
            v-if="!sortedCalendarEntries.length"
            class="px-6 py-10 text-center text-neutral-400 text-sm"
          >
            {{ $t('pages.preventiveCenter.noActivities') }}
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.preventiveCenter.title'),
  description: () => t('seo.preventiveCenter.description'),
  keywords: () => t('seo.preventiveCenter.keywords'),
  ogTitle: () => t('seo.preventiveCenter.title'),
  ogDescription: () => t('seo.preventiveCenter.description'),
  ogSiteName: () => t('seo.siteName'),
})

interface CalendarItem {
  title: string
  created_at: string
}

// TODO: заменити dummy вредностима и повезати са бекендом
const calendarData: Record<number, CalendarItem[]> = {
  2026: [
    { title: 'Светски дан здравља', created_at: '2026-04-07' },
    {
      title: 'Национална кампања за превенцију дијабетеса',
      created_at: '2026-03-15',
    },
    { title: 'Светски дан борбе против туберкулозе', created_at: '2026-03-24' },
    { title: 'Светски дан срца', created_at: '2026-09-29' },
  ],
  2025: [
    { title: 'Светски дан здравља', created_at: '2025-04-07' },
    { title: 'Светски дан борбе против рака', created_at: '2025-02-04' },
    {
      title: 'Национални дан борбе против хипертензије',
      created_at: '2025-05-17',
    },
    { title: 'Светски дан менталног здравља', created_at: '2025-10-10' },
    { title: 'Европска недеља имунизације', created_at: '2025-04-21' },
  ],
  2024: [
    { title: 'Светски дан здравља', created_at: '2024-04-07' },
    { title: 'Светски дан борбе против дијабетеса', created_at: '2024-11-14' },
    {
      title: 'Национална кампања скрининга карцинома дојке',
      created_at: '2024-10-01',
    },
    { title: 'Светски дан без дувана', created_at: '2024-05-31' },
  ],
}

const sortedCalendarEntries = computed<[number, CalendarItem[]][]>(() =>
  (Object.entries(calendarData) as [string, CalendarItem[]][])
    .map(([year, items]) => [Number(year), items] as [number, CalendarItem[]])
    .sort(([a], [b]) => b - a),
)
</script>
