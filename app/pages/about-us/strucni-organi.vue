<template>
  <div>
    <TextBanner
      :title="$t('pages.strucniOrgani.title')"
      :description="$t('pages.strucniOrgani.description')"
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
  title: () => t('seo.strucniOrgani.title'),
  description: () => t('seo.strucniOrgani.description'),
  keywords: () => t('seo.strucniOrgani.keywords'),
  ogTitle: () => t('seo.strucniOrgani.title'),
  ogDescription: () => t('seo.strucniOrgani.description'),
  ogSiteName: () => t('seo.siteName'),
})

// Opisi nadležnosti = pravni tekst iz Informatora o radu (preko i18n).
// TODO: imena/funkcije članova su placeholder dok klijent ne dostavi prave podatke / API.
const PH = 'organ.placeholderName'
const PRESIDENT = 'organ.president'
const MEMBER = 'organ.member'

const SECTIONS: OrganSection[] = [
  {
    anchor: 'savet',
    titleKey: 'nav.professionalCouncil',
    descriptionKey: 'pages.strucniOrgani.savetDesc',
    members: [
      { name: PH, role: PRESIDENT },
      { name: PH, role: MEMBER },
      { name: PH, role: MEMBER },
      { name: PH, role: MEMBER },
      { name: PH, role: MEMBER },
    ],
  },
  {
    anchor: 'kolegijum',
    titleKey: 'nav.professionalCollegium',
    descriptionKey: 'pages.strucniOrgani.kolegijumDesc',
    members: [
      { name: PH, role: PRESIDENT },
      { name: PH, role: MEMBER },
    ],
  },
  {
    anchor: 'eticki-odbor',
    titleKey: 'nav.ethicsCommittee',
    descriptionKey: 'pages.strucniOrgani.etickiDesc',
    members: [
      { name: PH, role: PRESIDENT },
      { name: PH, role: MEMBER },
      { name: PH, role: MEMBER },
      { name: PH, role: MEMBER },
      { name: PH, role: MEMBER },
    ],
  },
  {
    anchor: 'komisija-kvalitet',
    titleKey: 'nav.qualityCommittee',
    descriptionKey: 'pages.strucniOrgani.kvalitetDesc',
    members: [
      { name: PH, role: PRESIDENT },
      { name: PH, role: MEMBER },
    ],
  },
  {
    anchor: 'komisija-infekcije',
    titleKey: 'nav.infectionCommittee',
    descriptionKey: 'pages.strucniOrgani.infekcijeDesc',
    members: [
      { name: PH, role: PRESIDENT },
      { name: PH, role: MEMBER },
    ],
  },
]
</script>
