<template>
  <div
    class="rounded-xl border border-primary-100 bg-primary-50 p-6 md:p-8 flex flex-col gap-6"
  >
    <div class="flex flex-col gap-2 max-w-3xl">
      <p class="text-neutral-700">{{ $t('pages.sluzba.eHealthIntro') }}</p>
      <p class="text-sm text-neutral-500">
        {{ $t('pages.sluzba.eHealthAccess') }}
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      <a
        v-for="link in links"
        :key="link.labelKey"
        :href="E_HEALTH_URL"
        target="_blank"
        rel="noopener"
        class="group flex items-center gap-3 rounded-xl bg-white border border-primary-100 p-4 transition duration-200 ease-out hover:border-primary-300 hover:shadow-md active:scale-[0.99]"
      >
        <span
          class="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-500 text-white transition-colors group-hover:bg-primary-600"
        >
          <Icon :name="link.icon" size="20" />
        </span>
        <span class="font-semibold text-primary-900 leading-snug">
          {{ $t(link.labelKey) }}
        </span>
        <Icon
          name="ion:open-outline"
          size="14"
          class="ml-auto shrink-0 text-neutral-300 group-hover:text-primary-400 transition-colors"
        />
      </a>
    </div>
  </div>
</template>
<script lang="ts" setup>
// TODO: precizniji deep-linkovi po usluzi kad ih klijent potvrdi
const E_HEALTH_URL = 'https://www.e-zdravlje.gov.rs/'

const links = [
  { labelKey: 'pages.sluzba.eHealthScheduling', icon: 'ion:calendar' },
  { labelKey: 'pages.sluzba.eHealthPrescription', icon: 'ion:medkit' },
  { labelKey: 'pages.sluzba.eHealthSickLeave', icon: 'ion:document-text' },
  { labelKey: 'pages.sluzba.eHealthRecords', icon: 'ion:folder-open' },
]
</script>
