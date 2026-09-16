<template>
  <div>
    <!-- Hero = mozaik: plavi panel sa porukom + kolaž klijenta (raspored
         „zavod kolaž nova", mejl 2026-09-16): gore čekaonica | ergo | doktor,
         dole šalter | rendgen. Panel i kolaž su tile-ovi istog mozaika (isti
         4px razmak). Tekst NIJE preko fotki → fotke bez overlaya (prigovor
         „rendgen zamračen") i bez cropa: min visina na xl = 32.4vw = tačno
         visina pri kojoj svi tile-ovi (redovi 2:3, kolone 1/3 i 1/2 od 7/12
         širine) imaju AR 1.5 = AR fotki; plafon 48rem drži hero iznad folda
         na svakom laptopu (ranije 53vw = ceo ekran). min-h (ne h) da panel sa
         tekstom nikad ne prelije. md–lg (768–1279) = panel iznad kolaža
         (55.5vw = ista AR računica na punoj širini; split ispod 1280 daje
         preuzak panel → 45% crop). Mobilni = jedna fotka
         pod overlayem (kao pre). Na xl je kolaž apsolutan (inset-y-0,
         desnih 7/12; pl-1 = 4px razmak od panela) — u flow-u bi intrinsic
         visina slika (width/height atributi) naduvala fr redove i ceo hero.
         v3.1 (Stefanov izbor iz artifakta ideja): prva rečenica kao lead
         (semibold 24px) + opis 18px/80% — hijerarhija bez naslova koji viče;
         krug (motiv HighlightCard-a) u gornjem desnom uglu panela, md+;
         ikonice na dugmadima; ulaz: tekst stagger 0/80/160ms, tile-ovi
         kolaža „veo" (.veil u main.css, LCP-bezbedno). Bez reda informacija.
         Od navwide (1660+) panel 36%, kolaž 64% (Stefan: veće fotke; 1/3 bi
         bilo lepše modularno, ali tekst pada na 393px i dugmad sa ikonicama
         prelamaju). Visina 35.6vw = ista AR računica za 64% (0.64/1.8),
         plafon 52rem. Ispod 1660 ostaje 5/12 (na 1536 uzak tekst → panel
         diktira visinu i vraća crop). Iznad 1920 panel = 36% sadržajne
         kolone (43.2rem) + leva margina, da tekst ne pada ispod 480px;
         kolaž = ostatak (50vw + 16.8rem). PAZI: nav/navwide breakpointi
         moraju biti u rem kao Tailwind default (xl = 80rem) — u px ih
         Tailwind ne može sortirati pa `navwide:` pravila završe PRE `xl:`
         i `xl:w-5/12` ih pregazi (main.css).
         Panel na xl: grow (flex-col dete inače ne raste do min-h sekcije),
         pb-24 > pt-12 jer kartice pokrivaju donjih 48px pa je tekst centriran
         na vidljivom delu. Levi padding panela prati levu ivicu
         sadržaja i iznad 1920 (max-w-480). object-position ergo (kvadratna
         fotka u 1.5 tile-u): glava 20% / stopala 76% ostaju u kadru. -->
    <section
      class="relative bg-white md:flex md:flex-col md:gap-1 xl:min-h-[clamp(26rem,32.4vw,48rem)] navwide:min-h-[clamp(26rem,35.6vw,52rem)]"
    >
      <div
        class="relative flex flex-col justify-center min-h-80 xl:min-h-0 xl:grow py-16 md:py-20 xl:pt-12 xl:pb-24 px-4 md:px-12 lg:px-28 xl:pl-[max(7rem,calc((100vw_-_120rem)_/_2_+_7rem))] xl:pr-12 xl:w-5/12 navwide:w-[max(36%,calc((100vw_-_120rem)_/_2_+_43.2rem))] md:overflow-hidden md:bg-linear-to-br md:from-primary-700 md:to-primary-500 md:before:content-[''] md:before:absolute md:before:-top-44 md:before:-right-40 md:before:size-[28rem] md:before:rounded-full md:before:bg-primary-400/30"
      >
        <NuxtImg
          src="/img/hero/doktor.webp"
          width="1536"
          height="1024"
          class="md:hidden absolute inset-0 h-full w-full object-cover"
          :alt="$t('pages.home.heroImageAlt')"
          fetchpriority="high"
        />
        <div
          class="md:hidden absolute inset-0 bg-linear-to-b from-primary-950/75 to-primary-600/85"
          aria-hidden="true"
        />
        <div class="relative z-10 flex flex-col gap-6 text-white">
          <!-- Natpis "Званична државна институција" + назив Завода уклоњени на захтев клијента.
               h1 задржан као sr-only ради SEO (назив мора остати индексабилан). -->
          <h1 class="sr-only">
            {{ $t('pages.home.heroTitle') }} {{ $t('pages.home.heroTitleMinistry') }}
          </h1>
          <!-- Tekst klijenta doslovno, podeljen na dve rečenice: prva kao
               lead (semibold), druga kao opis — hijerarhija bez naslova.
               Stagger: 0 / 80 / 160ms (fade-up iz main.css). Na xl (1280–1535)
               je panel uzak (tekst ~370px): manji tekst i px-5 da dugmad ostanu
               u jednom redu i hero ne poraste (inače 635px → 35% crop).
               Ikonice dugmadi samo gde dugmad staju u jedan red: od sm, ali ne na
               xl 1280–1535 (tekst ~370px; sa ikonicama 2 reda i hero 534px). -->
          <div class="flex flex-col gap-3 md:max-w-2xl xl:max-w-xl">
            <p class="fade-up text-xl md:text-2xl xl:text-xl 2xl:text-2xl font-semibold leading-snug tracking-[-0.01em] text-pretty">
              {{ $t('pages.home.heroLead') }}
            </p>
            <p class="fade-up [animation-delay:80ms] text-base md:text-lg xl:text-base 2xl:text-lg leading-relaxed text-white/80">
              {{ $t('pages.home.heroDescription') }}
            </p>
          </div>
          <div class="fade-up [animation-delay:160ms] flex flex-wrap items-center gap-4">
            <div
              class="flex items-center gap-2 px-6 xl:px-5 2xl:px-6 py-3 bg-white rounded-xl hover:bg-primary-100 transition duration-150 ease-out active:scale-[0.98] cursor-pointer"
              @click="openEFormModal"
            >
              <Icon name="ion:person-outline" size="18" class="hidden sm:block xl:hidden 2xl:block shrink-0 text-primary-500" />
              <p class="text-sm sm:text-base font-bold text-primary-500">
                {{ $t('pages.home.heroButtonEForm') }}
              </p>
            </div>
            <NuxtLink
              to="/services"
              class="flex items-center gap-2 px-6 xl:px-5 2xl:px-6 py-3 rounded-xl border border-primary-200/40 bg-white/20 hover:bg-white/30 backdrop-blur transition duration-150 ease-out active:scale-[0.98] cursor-pointer"
            >
              <Icon name="ion:grid-outline" size="18" class="hidden sm:block xl:hidden 2xl:block shrink-0 text-white" />
              <p class="text-sm sm:text-base font-bold text-white">
                {{ $t('pages.home.heroButtonServices') }}
              </p>
            </NuxtLink>
          </div>
        </div>
      </div>
      <div
        class="hidden md:grid md:h-[55.5vw] xl:absolute xl:inset-y-0 xl:right-0 xl:w-7/12 navwide:w-[min(64%,calc(50vw_+_16.8rem))] xl:h-auto xl:pl-1 grid-cols-6 grid-rows-[minmax(0,2fr)_minmax(0,3fr)] gap-1 bg-white"
        aria-hidden="true"
      >
        <div class="veil relative col-span-2 overflow-hidden [--veil-i:0]">
          <NuxtImg
            src="/img/hero/cekaonica.webp"
            width="1000"
            height="668"
            class="h-full w-full object-cover"
            alt=""
            fetchpriority="high"
          />
        </div>
        <div class="veil relative col-span-2 overflow-hidden [--veil-i:1]">
          <NuxtImg
            src="/img/hero/ergospirometrija.webp"
            width="1086"
            height="1086"
            class="h-full w-full object-cover object-[50%_45%]"
            alt=""
            fetchpriority="high"
          />
        </div>
        <div class="veil relative col-span-2 overflow-hidden [--veil-i:2]">
          <NuxtImg
            src="/img/hero/doktor.webp"
            width="1536"
            height="1024"
            class="h-full w-full object-cover object-bottom"
            alt=""
            fetchpriority="high"
          />
        </div>
        <div class="veil relative col-span-3 overflow-hidden [--veil-i:3]">
          <NuxtImg
            src="/img/hero/salter.webp"
            width="1000"
            height="668"
            class="h-full w-full object-cover"
            alt=""
            fetchpriority="high"
          />
        </div>
        <div class="veil relative col-span-3 overflow-hidden [--veil-i:4]">
          <NuxtImg
            src="/img/hero/rendgen.webp"
            width="1000"
            height="668"
            class="h-full w-full object-cover"
            alt=""
            fetchpriority="high"
          />
        </div>
      </div>
    </section>
    <section
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-4 md:px-12 lg:px-28 pt-12 md:pt-24 -mt-16 sm:-mt-24 xl:-mt-36 max-w-480 mx-auto"
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
