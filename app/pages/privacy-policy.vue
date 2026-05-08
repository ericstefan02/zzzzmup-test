<template>
  <div class="px-4 md:px-12 lg:px-28 py-10 md:py-16 max-w-4xl mx-auto">
    <div class="flex flex-col gap-2 mb-10">
      <h1 class="text-3xl md:text-4xl font-extrabold text-primary-900">
        {{ $t('legal.privacyPolicy.title') }}
      </h1>
      <p class="text-neutral-500">
        {{ $t('legal.privacyPolicy.subtitle') }}
      </p>
      <p class="text-sm text-neutral-400">
        {{ $t('legal.lastUpdated') }}:
        {{ $t('legal.privacyPolicy.lastUpdated') }}
      </p>
    </div>

    <div class="flex flex-col gap-8 text-neutral-700 leading-relaxed">
      <p>{{ $t('legal.privacyPolicy.intro') }}</p>

      <section class="flex flex-col gap-3">
        <h2 class="text-xl font-bold text-primary-900">
          {{ $t('legal.privacyPolicy.section1Title') }}
        </h2>
        <p>{{ $t('legal.privacyPolicy.section1Text') }}</p>
      </section>

      <section class="flex flex-col gap-3">
        <h2 class="text-xl font-bold text-primary-900">
          {{ $t('legal.privacyPolicy.section2Title') }}
        </h2>
        <p>{{ $t('legal.privacyPolicy.section2Text') }}</p>
        <ul class="list-disc list-inside flex flex-col gap-2 pl-2">
          <li
            v-for="(item, index) in $t(
              'legal.privacyPolicy.section2Items',
            ).split('|')"
            :key="index"
          >
            {{ item.trim() }}
          </li>
        </ul>
      </section>

      <section class="flex flex-col gap-3">
        <h2 class="text-xl font-bold text-primary-900">
          {{ $t('legal.privacyPolicy.section3Title') }}
        </h2>
        <p>{{ $t('legal.privacyPolicy.section3Text') }}</p>
        <ul class="list-disc list-inside flex flex-col gap-2 pl-2">
          <li
            v-for="(item, index) in $t(
              'legal.privacyPolicy.section3Items',
            ).split('|')"
            :key="index"
          >
            {{ item.trim() }}
          </li>
        </ul>
      </section>

      <section class="flex flex-col gap-3">
        <h2 class="text-xl font-bold text-primary-900">
          {{ $t('legal.privacyPolicy.section4Title') }}
        </h2>
        <p>{{ $t('legal.privacyPolicy.section4Text') }}</p>
      </section>

      <section class="flex flex-col gap-3">
        <h2 class="text-xl font-bold text-primary-900">
          {{ $t('legal.privacyPolicy.section5Title') }}
        </h2>
        <p>{{ $t('legal.privacyPolicy.section5Text') }}</p>
      </section>

      <section class="flex flex-col gap-3">
        <h2 class="text-xl font-bold text-primary-900">
          {{ $t('legal.privacyPolicy.section6Title') }}
        </h2>
        <p>{{ $t('legal.privacyPolicy.section6Text') }}</p>
        <ul class="list-disc list-inside flex flex-col gap-2 pl-2">
          <li
            v-for="(item, index) in $t(
              'legal.privacyPolicy.section6Items',
            ).split('|')"
            :key="index"
          >
            {{ item.trim() }}
          </li>
        </ul>
        <p>{{ $t('legal.privacyPolicy.section6Outro') }}</p>
      </section>

      <section class="flex flex-col gap-3">
        <h2 class="text-xl font-bold text-primary-900">
          {{ $t('legal.privacyPolicy.section7Title') }}
        </h2>
        <p>{{ $t('legal.privacyPolicy.section7Text') }}</p>
      </section>

      <section class="flex flex-col gap-3">
        <h2 class="text-xl font-bold text-primary-900">
          {{ $t('legal.privacyPolicy.section8Title') }}
        </h2>
        <p>{{ $t('legal.privacyPolicy.section8Text') }}</p>
      </section>

      <section class="flex flex-col gap-3">
        <h2 class="text-xl font-bold text-primary-900">
          {{ $t('legal.privacyPolicy.section9Title') }}
        </h2>
        <p>{{ $t('legal.privacyPolicy.section9Text') }}</p>
      </section>

      <section class="flex flex-col gap-3">
        <h2 class="text-xl font-bold text-primary-900">
          {{ $t('legal.privacyPolicy.section10Title') }}
        </h2>
        <p>{{ $t('legal.privacyPolicy.section10Text') }}</p>
        <address
          class="not-italic bg-primary-50 rounded-xl p-6 flex flex-col gap-1 text-primary-900"
        >
          <p class="font-bold">
            {{ $t('legal.privacyPolicy.section10Address') }}
          </p>
          <p>{{ $t('legal.privacyPolicy.section10AddressLine') }}</p>
          <NuxtLink
            to="mailto:info@zzzzmup.rs"
            class="hover:text-primary-500 transition-colors"
          >
            {{ $t('legal.privacyPolicy.section10Email') }}
          </NuxtLink>
          <NuxtLink
            to="tel:+381113615665"
            class="hover:text-primary-500 transition-colors"
          >
            {{ $t('legal.privacyPolicy.section10Phone') }}
          </NuxtLink>
        </address>
        <p class="text-sm text-neutral-500 italic">
          {{ $t('legal.privacyPolicy.section10Outro') }}
        </p>
      </section>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'legal',
})

const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.privacyPolicy.title'),
  description: () => t('seo.privacyPolicy.description'),
  keywords: () => t('seo.privacyPolicy.keywords'),
  ogTitle: () => t('seo.privacyPolicy.title'),
  ogDescription: () => t('seo.privacyPolicy.description'),
  ogSiteName: () => t('seo.siteName'),
})
</script>
