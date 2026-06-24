<template>
  <div>
    <TextBanner
      :title="$t('pages.uprava.title')"
      :description="$t('pages.uprava.description')"
      parent-label="nav.aboutUs"
      parent-to="/about-us"
    />

    <div
      class="px-4 md:px-12 lg:px-28 py-10 md:py-16 flex flex-col gap-12 md:gap-20 max-w-480 mx-auto"
    >
      <OrganSection
        v-for="section in SECTIONS"
        :key="section.anchor"
        :section="section"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { OrganSection } from '~/types/about'

const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.uprava.title'),
  description: () => t('seo.uprava.description'),
  keywords: () => t('seo.uprava.keywords'),
  ogTitle: () => t('seo.uprava.title'),
  ogDescription: () => t('seo.uprava.description'),
  ogSiteName: () => t('seo.siteName'),
})

// Opisi nadležnosti = pravni tekst iz Informatora o radu (preko i18n).
// TODO: imena/funkcije članova su placeholder dok klijent ne dostavi prave podatke / API.
const PH = 'organ.placeholderName'
const PRESIDENT = 'organ.president'
const MEMBER = 'organ.member'

const SECTIONS: OrganSection[] = [
  {
    anchor: 'upravni-odbor',
    titleKey: 'nav.managementBoard',
    descriptionKey: 'pages.uprava.upravniOdborDesc',
    members: [
      { name: PH, role: PRESIDENT },
      { name: PH, role: MEMBER },
      { name: PH, role: MEMBER },
      { name: PH, role: MEMBER },
      { name: PH, role: MEMBER },
    ],
  },
  {
    anchor: 'nadzorni-odbor',
    titleKey: 'nav.supervisoryBoard',
    descriptionKey: 'pages.uprava.nadzorniOdborDesc',
    members: [
      { name: PH, role: PRESIDENT },
      { name: PH, role: MEMBER },
      { name: PH, role: MEMBER },
    ],
  },
  {
    anchor: 'direktor',
    titleKey: 'nav.director',
    descriptionKey: 'pages.uprava.direktorDesc',
    members: [{ name: PH, role: 'nav.director' }],
  },
  {
    anchor: 'pomocnik',
    titleKey: 'nav.assistantDirector',
    descriptionKey: 'pages.uprava.pomocnikDesc',
    members: [{ name: PH, role: 'nav.assistantDirector' }],
  },
  {
    anchor: 'sef-sluzbe',
    titleKey: 'nav.headOfService',
    descriptionKey: 'pages.uprava.sefSluzbeDesc',
    members: [{ name: PH, role: 'nav.headOfService' }],
  },
  {
    anchor: 'glavna-sestra',
    titleKey: 'nav.headNurse',
    descriptionKey: 'pages.uprava.glavnaSestraDesc',
    members: [{ name: PH, role: 'nav.headNurse' }],
  },
]
</script>
