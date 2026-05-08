<template>
  <div class="px-4 md:px-12 lg:px-28 py-10 md:py-16 max-w-4xl mx-auto">
    <div class="flex flex-col gap-2 mb-10">
      <h1 class="text-3xl md:text-4xl font-extrabold text-primary-900">
        {{ $t('legal.termsOfUse.title') }}
      </h1>
      <p class="text-neutral-500">
        {{ $t('legal.termsOfUse.subtitle') }}
      </p>
      <p class="text-sm text-neutral-400">
        {{ $t('legal.lastUpdated') }}: {{ $t('legal.termsOfUse.lastUpdated') }}
      </p>
    </div>

    <div class="flex flex-col gap-8 text-neutral-700 leading-relaxed">
      <p>{{ $t('legal.termsOfUse.intro') }}</p>

      <section class="flex flex-col gap-3">
        <h2 class="text-xl font-bold text-primary-900">
          {{ $t('legal.termsOfUse.section1Title') }}
        </h2>
        <p>{{ $t('legal.termsOfUse.section1Text') }}</p>
      </section>

      <section class="flex flex-col gap-3">
        <h2 class="text-xl font-bold text-primary-900">
          {{ $t('legal.termsOfUse.section2Title') }}
        </h2>
        <p>{{ $t('legal.termsOfUse.section2Text') }}</p>
      </section>

      <section class="flex flex-col gap-3">
        <h2 class="text-xl font-bold text-primary-900">
          {{ $t('legal.termsOfUse.section3Title') }}
        </h2>
        <p>{{ $t('legal.termsOfUse.section3Text') }}</p>
      </section>

      <section class="flex flex-col gap-3">
        <h2 class="text-xl font-bold text-primary-900">
          {{ $t('legal.termsOfUse.section4Title') }}
        </h2>
        <p>{{ $t('legal.termsOfUse.section4Text') }}</p>
      </section>

      <section class="flex flex-col gap-3">
        <h2 class="text-xl font-bold text-primary-900">
          {{ $t('legal.termsOfUse.section5Title') }}
        </h2>
        <p>{{ $t('legal.termsOfUse.section5Text') }}</p>
      </section>

      <section class="flex flex-col gap-3">
        <h2 class="text-xl font-bold text-primary-900">
          {{ $t('legal.termsOfUse.section6Title') }}
        </h2>
        <p>{{ $t('legal.termsOfUse.section6Text') }}</p>
      </section>

      <section class="flex flex-col gap-3">
        <h2 class="text-xl font-bold text-primary-900">
          {{ $t('legal.termsOfUse.section7Title') }}
        </h2>
        <p>{{ $t('legal.termsOfUse.section7Text') }}</p>
      </section>

      <section class="flex flex-col gap-3">
        <h2 class="text-xl font-bold text-primary-900">
          {{ $t('legal.termsOfUse.section8Title') }}
        </h2>
        <p>{{ $t('legal.termsOfUse.section8Text') }}</p>
      </section>

      <section class="flex flex-col gap-3">
        <h2 class="text-xl font-bold text-primary-900">
          {{ $t('legal.termsOfUse.section9Title') }}
        </h2>
        <p>{{ $t('legal.termsOfUse.section9Text') }}</p>
      </section>

      <section class="flex flex-col gap-3">
        <h2 class="text-xl font-bold text-primary-900">
          {{ $t('legal.termsOfUse.section10Title') }}
        </h2>
        <p>{{ $t('legal.termsOfUse.section10Text') }}</p>
        <address
          class="not-italic bg-primary-50 rounded-xl p-6 flex flex-col gap-1 text-primary-900"
        >
          <p class="font-bold">{{ $t('legal.termsOfUse.section10Address') }}</p>
          <p>{{ $t('legal.termsOfUse.section10AddressLine') }}</p>
          <NuxtLink
            to="mailto:info@zzzzmup.rs"
            class="hover:text-primary-500 transition-colors"
          >
            {{ $t('legal.termsOfUse.section10Email') }}
          </NuxtLink>
          <NuxtLink
            to="tel:+381113615665"
            class="hover:text-primary-500 transition-colors"
          >
            {{ $t('legal.termsOfUse.section10Phone') }}
          </NuxtLink>
        </address>
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
  title: () => t('seo.termsOfUse.title'),
  description: () => t('seo.termsOfUse.description'),
  keywords: () => t('seo.termsOfUse.keywords'),
  ogTitle: () => t('seo.termsOfUse.title'),
  ogDescription: () => t('seo.termsOfUse.description'),
  ogSiteName: () => t('seo.siteName'),
})
</script>
