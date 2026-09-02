<template>
  <div>
    <section
      class="relative flex flex-col justify-center py-16 md:py-24 lg:py-32 min-h-80 md:min-h-120 lg:h-192"
    >
      <div
        class="fade-up relative flex flex-col gap-6 z-10 text-white max-w-480 mx-auto w-full px-4 md:px-12 lg:px-28"
      >
        <!-- Natpis "Званична државна институција" + назив Завода уклоњени на захтев клијента.
             h1 задржан као sr-only ради SEO (назив мора остати индексабилан). -->
        <h1 class="sr-only">
          {{ $t('pages.home.heroTitle') }} {{ $t('pages.home.heroTitleMinistry') }}
        </h1>
        <p class="max-w-full md:max-w-2/3 lg:max-w-1/2 text-base md:text-xl">
          {{ $t('pages.home.heroDescription') }}
        </p>
        <div class="flex items-center gap-4">
          <div
            class="px-6 py-3 bg-white rounded-xl hover:bg-primary-100 transition duration-150 ease-out active:scale-[0.98] cursor-pointer"
            @click="openEFormModal"
          >
            <p class="text-sm sm:text-base font-bold text-primary-500">
              {{ $t('pages.home.heroButtonEForm') }}
            </p>
          </div>
          <NuxtLink
            to="/services"
            class="px-6 py-3 rounded-xl border border-primary-200/40 bg-white/20 hover:bg-white/30 backdrop-blur transition duration-150 ease-out active:scale-[0.98] cursor-pointer"
          >
            <p class="text-sm sm:text-base font-bold text-white">
              {{ $t('pages.home.heroButtonServices') }}
            </p>
          </NuxtLink>
        </div>
      </div>
      <!-- Kolaž klijenta (sep 2026) rekreiran gridom od pojedinačnih fotki:
           md+ = 3 gore / 2 dole (raspored identičan poslatom kolažu),
           mobilni = jedna fotka. Dekorativna pozadina ispod overlaya. -->
      <div class="absolute inset-0" aria-hidden="true">
        <div
          class="hidden md:grid h-full w-full grid-cols-6 grid-rows-2 gap-1 bg-white"
        >
          <NuxtImg
            src="/img/hero/cekaonica.webp"
            width="1000"
            height="668"
            class="col-span-2 h-full w-full object-cover"
            alt=""
            fetchpriority="high"
          />
          <NuxtImg
            src="/img/hero/ergospirometrija.webp"
            width="1086"
            height="1086"
            class="col-span-2 h-full w-full object-cover"
            alt=""
            fetchpriority="high"
          />
          <NuxtImg
            src="/img/hero/salter.webp"
            width="1000"
            height="668"
            class="col-span-2 h-full w-full object-cover"
            alt=""
            fetchpriority="high"
          />
          <NuxtImg
            src="/img/hero/rendgen.webp"
            width="1000"
            height="668"
            class="col-span-3 h-full w-full object-cover"
            alt=""
            fetchpriority="high"
          />
          <NuxtImg
            src="/img/hero/doktor.webp"
            width="1536"
            height="1024"
            class="col-span-3 h-full w-full object-cover"
            alt=""
            fetchpriority="high"
          />
        </div>
        <NuxtImg
          src="/img/hero/doktor.webp"
          width="1536"
          height="1024"
          class="md:hidden h-full w-full object-cover"
          :alt="$t('pages.home.heroImageAlt')"
          fetchpriority="high"
        />
      </div>
      <!-- Overlay: mobilni vertikalan (tekst preko cele širine); desktop
           horizontalan — taman levo ispod teksta, desno propušta kolaž -->
      <div
        class="absolute inset-0 bg-linear-to-b from-primary-950/75 to-primary-600/85 md:bg-linear-to-r md:from-primary-900/85 md:via-primary-800/60 md:to-primary-700/30"
      />
    </section>
    <section
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-4 md:px-12 lg:px-28 pt-12 md:pt-24 -mt-16 sm:-mt-24 lg:-mt-59.5 max-w-480 mx-auto"
    >
      <HighlightCard
        v-for="(item, index) in highlightItems"
        :key="index"
        :title="item.title"
        :description="item.description"
        :icon="item.icon"
        :button-text="item.buttonText"
        @click="item.action"
      />
    </section>
    <section
      class="flex flex-col gap-8 md:gap-16 py-8 md:py-24 px-4 md:px-12 lg:px-28 max-w-480 mx-auto w-full"
    >
      <div class="flex flex-col gap-1 items-center justify-center">
        <span class="text-sm font-bold text-primary-400 uppercase">
          {{ $t('pages.home.servicesLabel') }}
        </span>
        <h2 class="text-primary-900 font-bold text-2xl md:text-4xl">
          {{ $t('pages.home.servicesTitle') }}
        </h2>
        <p class="text-center max-w-150 text-lg text-neutral-500">
          {{ $t('pages.home.servicesDescription') }}
        </p>
      </div>
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      >
        <ServicesCard
          v-for="(item, index) in selectedServices"
          :key="index"
          :title="item.title"
          :description="item.description"
          :icon="item.icon"
          :primary="item.primary"
        />
      </div>
    </section>
    <section class="py-10 md:py-16 bg-primary-600">
      <div
        class="max-w-480 mx-auto w-full px-4 md:px-12 lg:px-28 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
      >
        <div
          v-for="n in 3"
          :key="'stat-' + n"
          class="flex flex-col gap-1.5 border-t border-primary-400/60 pt-5"
        >
          <span
            class="text-4xl md:text-5xl font-extrabold text-white tracking-tight tabular-nums"
          >
            {{ $t(`pages.home.stat${n}Value`) }}
          </span>
          <span class="text-base text-primary-100">
            {{ $t(`pages.home.stat${n}Label`) }}
          </span>
        </div>
      </div>
    </section>
    <section
      class="px-4 md:px-12 lg:px-28 py-8 md:py-24 flex flex-col gap-6 md:gap-12 max-w-480 mx-auto"
    >
      <div>
        <div>
          <h3 class="font-bold text-primary-900 text-3xl">
            {{ $t('pages.home.newsTitle') }}
          </h3>
        </div>
        <div
          class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
        >
          <p class="text-neutral-500">
            {{ $t('pages.home.newsDescription') }}
          </p>
          <Button
            :text="$t('pages.home.viewAllNews')"
            variant="text"
            append-icon="ion:arrow-forward"
            @click="$router.push('/news')"
          />
        </div>
      </div>
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      >
        <NewsCard
          v-for="(item, index) in newsArticles"
          :key="index"
          :news-article="item"
        />
      </div>
    </section>
  </div>
</template>
<script lang="ts" setup>
import type { NewsArticle } from '~/types/news'
import type { ServicesCardData } from '~/types/services'

const { t } = useI18n()
const router = useRouter()
const { open: openEFormModal } = useEFormModal()

useSeoMeta({
  title: () => t('seo.home.title'),
  description: () => t('seo.home.description'),
  keywords: () => t('seo.home.keywords'),
  ogTitle: () => t('seo.home.title'),
  ogDescription: () => t('seo.home.description'),
  ogSiteName: () => t('seo.siteName'),
})
// TODO: srediit link za sliku
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'MedicalOrganization',
        name: 'Zavod za zdravstvenu zaštitu radnika MUP-a',
        url: 'https://www.zzzzmup.rs',
        logo: 'https://www.zzzzmup.rs/img/logo.png',
        image: 'https://www.zzzzmup.rs/img/logo.png',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Durmitorska 9',
          addressLocality: 'Beograd',
          postalCode: '11000',
          addressCountry: 'RS',
        },
        telephone: '+381113615665',
        email: 'info@zzzzmup.rs',
        openingHours: ['Mo-Fr 07:00-19:00', 'Sa-Su 07:00-13:00'],
      }),
    },
  ],
})

// 4 kvadrata = prve 4 grupe usluga iz excela klijenta, vezano po slugu
// (reorder u SERVICE_GROUPS ne sme da pomeša ikonice/opise).
// Opisi su privremeni placeholderi — klijent šalje uvodne tekstove.
const HIGHLIGHT_META: Record<string, { icon: string; descKey: string }> = {
  'osnovne-zdravstvene-usluge': {
    icon: 'ion:medkit',
    descKey: 'pages.home.highlightBasicDesc',
  },
  'pregledi-za-skolovanje-i-obuku': {
    icon: 'ion:school',
    descKey: 'pages.home.highlightSchoolingDesc',
  },
  'pregledi-za-prijem-u-radni-odnos': {
    icon: 'ion:briefcase',
    descKey: 'pages.home.highlightEmploymentDesc',
  },
  'lekarska-uverenja': {
    icon: 'ion:document-text',
    descKey: 'pages.home.highlightCertificatesDesc',
  },
}

const highlightItems = computed(() =>
  SERVICE_GROUPS.filter((group) => HIGHLIGHT_META[group.slug]).map((group) => ({
    title: t(group.titleKey),
    description: t(HIGHLIGHT_META[group.slug]!.descKey),
    icon: HIGHLIGHT_META[group.slug]!.icon,
    buttonText: t('pages.home.learnMoreButton'),
    action: () => router.push(serviceNodeRoute(group, true)),
  })),
)

const selectedServices: ServicesCardData[] = [
  {
    title: 'Sistematski pregledi za pripadnike službi',
    description:
      'Specifični pregledi medicine rada prilagođeni potrebama pripadnika bezbednosnih službi. Obuhvataju kompletnu dijagnostiku i procenu radne sposobnosti.',
    icon: 'ion:medkit',
    primary: true,
  },
  {
    title: 'Kardiologija i interna medicina',
    description:
      'Savremena kardiološka dijagnostika koja obuhvata EKG, ultrazvuk srca i testove opterećenja, uz stručni nadzor vrhunskih specijalista.',
    icon: 'ion:pulse',
  },
  {
    title: 'Kardiologija i interna medicina',
    description:
      'Savremena kardiološka dijagnostika koja obuhvata EKG, ultrazvuk srca i testove opterećenja, uz stručni nadzor vrhunskih specijalista.',
    icon: 'ion:pulse',
  },
  {
    title: 'Kardiologija i interna medicina',
    description:
      'Savremena kardiološka dijagnostika koja obuhvata EKG, ultrazvuk srca i testove opterećenja, uz stručni nadzor vrhunskih specijalista.',
    icon: 'ion:pulse',
  },
  {
    title: 'Kardiologija i interna medicina',
    description:
      'Savremena kardiološka dijagnostika koja obuhvata EKG, ultrazvuk srca i testove opterećenja, uz stručni nadzor vrhunskih specijalista.',
    icon: 'ion:pulse',
  },
  {
    title: 'Kardiologija i interna medicina',
    description:
      'Savremena kardiološka dijagnostika koja obuhvata EKG, ultrazvuk srca i testove opterećenja, uz stručni nadzor vrhunskih specijalista.',
    icon: 'ion:pulse',
  },
]

// TODO: zameniti API pozivom (dummy-data.ts)
const newsArticles: NewsArticle[] = NEWS_ARTICLES.slice(0, 3)
</script>
