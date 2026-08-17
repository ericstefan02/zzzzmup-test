<template>
  <div v-if="content" class="flex flex-col">
    <TextBanner
      :title="content.name"
      :description="content.about"
      parent-label="nav.services"
      parent-to="/services"
    />

    <div
      class="px-4 md:px-12 lg:px-28 max-w-480 mx-auto w-full flex flex-col gap-12 md:gap-16 my-8 md:my-14"
    >
      <!-- 2+3+4: Начин заказивања · Контакт и радно време · Распоред рада -->
      <section
        v-if="content.scheduling?.length || content.contact"
        class="grid lg:grid-cols-2 gap-6 items-stretch"
      >
        <div
          v-if="content.scheduling?.length"
          class="flex flex-col gap-5 rounded-xl border border-neutral-200 bg-white p-6 md:p-8 shadow-xs"
        >
          <h2 class="text-xl md:text-2xl font-bold text-primary-900">
            {{ $t('pages.sluzba.schedulingTitle') }}
          </h2>
          <ul class="flex flex-col gap-3">
            <li
              v-for="(option, i) in content.scheduling"
              :key="i"
              class="flex items-center gap-3"
            >
              <span
                class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-500"
              >
                <Icon :name="SCHEDULING_ICONS[i] ?? 'ion:checkmark'" size="16" />
              </span>
              <span class="text-neutral-700">{{ option }}</span>
            </li>
          </ul>
          <Button
            :text="$t('layout.nav.eFormButton')"
            prepend-icon="ion:document-text"
            shrinked
            @click="openEFormModal"
          />
          <p v-if="content.scheduleNote" class="text-neutral-500 mt-auto">
            {{ content.scheduleNote }}
            <NuxtLink
              to="/work-schedule"
              class="font-semibold text-primary-500 underline underline-offset-2 hover:text-primary-600"
            >
              {{ $t('pages.sluzba.scheduleHere') }}
            </NuxtLink>
          </p>
        </div>

        <ServiceContactCard v-if="content.contact" :contact="content.contact" />
      </section>

      <!-- 5: Услуге -->
      <section
        v-if="content.serviceCategories?.length"
        class="flex flex-col gap-8"
      >
        <div class="flex items-center gap-3">
          <Icon
            name="ion:medkit"
            size="30"
            class="text-primary-400 shrink-0"
          />
          <h2 class="text-xl md:text-3xl font-bold text-primary-900">
            {{ $t('pages.sluzba.servicesTitle') }}
          </h2>
        </div>
        <!-- Poravnati redovi: kategorija u fiksnoj levoj koloni, stavke kao
             pločice desno — sve kategorije dele istu ravan -->
        <div>
          <div
            v-for="category in content.serviceCategories"
            :key="category.name"
            class="grid lg:grid-cols-[260px_1fr] gap-y-3 gap-x-10 py-6 md:py-7 border-b border-neutral-200 first:pt-0 last:border-b-0 last:pb-0"
          >
            <h3 class="text-lg font-bold text-primary-900 leading-snug lg:pt-1.5">
              {{ category.name }}
            </h3>
            <ul class="flex flex-wrap gap-2">
              <li
                v-for="item in category.items"
                :key="item.name"
                class="rounded-lg bg-primary-50 px-3.5 py-2 text-primary-900 leading-snug max-w-prose"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 6: Наш тим -->
      <section v-if="content.team?.length" class="flex flex-col gap-8">
        <div class="flex items-center gap-3">
          <Icon name="ion:people" size="30" class="text-primary-400 shrink-0" />
          <h2 class="text-xl md:text-3xl font-bold text-primary-900">
            {{ $t('pages.sluzba.teamTitle') }}
          </h2>
        </div>
        <div
          class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8 md:gap-y-10"
        >
          <ServiceTeamCard
            v-for="member in content.team"
            :key="member.fullName"
            :member="member"
          />
        </div>
      </section>

      <!-- 7: Корисне информације -->
      <section v-if="content.showUsefulInfo" class="flex flex-col gap-8">
        <div class="flex items-center gap-3">
          <Icon
            name="ion:information-circle"
            size="30"
            class="text-primary-400 shrink-0"
          />
          <h2 class="text-xl md:text-3xl font-bold text-primary-900">
            {{ $t('pages.sluzba.usefulInfoTitle') }}
          </h2>
        </div>
        <EHealthLinks />
      </section>

      <!-- 8: Често постављана питања -->
      <section
        v-if="content.faq?.length"
        class="rounded-2xl border border-neutral-200 shadow-xs overflow-hidden"
      >
        <div class="p-4 md:p-8 flex flex-col gap-1">
          <div class="flex items-center gap-3">
            <Icon
              name="ion:help-circle"
              size="30"
              class="text-primary-400 shrink-0"
            />
            <h2 class="text-xl md:text-3xl font-bold text-primary-900">
              {{ $t('pages.sluzba.faqTitle') }}
            </h2>
          </div>
        </div>
        <FAQItem
          v-for="(item, index) in content.faq"
          :key="index"
          :faq-item="item"
        />
      </section>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getSluzbaContent } from '~/utils/sluzbe'
import {
  findServiceGroup,
  findServiceNode,
} from '~/utils/services-structure'
import { toLatin } from '~/utils/transliterate'
import type { SluzbaPage } from '~/types/sluzba'

const route = useRoute()
const { t, locale } = useI18n()
const { open: openEFormModal } = useEFormModal()

const slug = route.params.slug as string
const raw = getSluzbaContent(slug)

// Poznat čvor bez unetog sadržaja → stari prikaz na /services; nepoznat → 404
if (!raw) {
  const isGroup = !!findServiceGroup(slug)
  if (isGroup || findServiceNode(slug)) {
    await navigateTo(
      isGroup ? `/services?group=${slug}` : `/services?service=${slug}`,
      { redirectCode: 302 },
    )
  } else {
    throw createError({ statusCode: 404 })
  }
}

// Ikonice po redosledu opcija zakazivanja (sadržaj je dinamičan, ikone su UI)
const SCHEDULING_ICONS = ['ion:call', 'ion:walk', 'ion:document-text']

// Sadržaj je ćirilicom; za sr-Latn dubinska transliteracija svih stringova
// sem identifikatora. U fazi 2 (API) latinicu vraća server (Accept-Language).
const content = computed<SluzbaPage | undefined>(() => {
  if (!raw) return undefined
  if (locale.value !== 'sr-Latn') return raw
  return JSON.parse(JSON.stringify(raw), (key, value) =>
    typeof value === 'string' && key !== 'slug' && key !== 'photo'
      ? toLatin(value)
      : value,
  ) as SluzbaPage
})

useSeoMeta({
  title: () => content.value?.name ?? '',
  description: () => content.value?.about ?? '',
  ogTitle: () => content.value?.name ?? '',
  ogDescription: () => content.value?.about ?? '',
  ogSiteName: () => t('seo.siteName'),
})

// MedicalClinic + FAQPage strukturirani podaci (BreadcrumbList daje TextBanner)
const clinicJsonLd = computed(() => {
  const c = content.value
  if (!c) return ''
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: c.name,
    ...(c.contact && {
      telephone: c.contact.phone,
      email: c.contact.email,
      openingHours: ['Mo-Fr 07:00-19:00', 'Sa-Su 07:00-13:00'],
    }),
    parentOrganization: {
      '@type': 'MedicalOrganization',
      name: t('seo.siteName'),
      url: 'https://www.zzzzmup.rs',
    },
  })
})

const faqJsonLd = computed(() => {
  const faq = content.value?.faq
  if (!faq?.length) return ''
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  })
})

useHead({
  script: computed(() =>
    [clinicJsonLd.value, faqJsonLd.value]
      .filter(Boolean)
      .map((innerHTML) => ({ type: 'application/ld+json', innerHTML })),
  ),
})
</script>
