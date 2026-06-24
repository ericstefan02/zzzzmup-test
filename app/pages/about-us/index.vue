<template>
  <div>
    <TextBanner
      :title="$t('pages.aboutUs.title')"
      :description="$t('pages.aboutUs.description')"
    />

    <section
      class="px-4 md:px-12 lg:px-28 py-10 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 bg-white"
    >
      <div class="flex flex-col gap-6">
        <h2 class="text-2xl md:text-4xl font-bold text-primary-900">
          {{ $t('pages.aboutUs.trustTitle') }}
          <span class="text-primary-500">{{
            $t('pages.aboutUs.trustTitleHighlight')
          }}</span>
        </h2>
        <div class="flex flex-col gap-4 text-neutral-500 text-lg">
          <p>{{ $t('pages.aboutUs.paragraph1') }}</p>
          <p>{{ $t('pages.aboutUs.paragraph2') }}</p>
          <p>{{ $t('pages.aboutUs.paragraph3') }}</p>
        </div>
        <!-- TODO: dopuniti pravim brojevima sa klijentom -->
        <div class="grid grid-cols-2 gap-6">
          <NumbersBanner
            number="100k"
            :label="$t('pages.aboutUs.satisfiedPatients')"
          />
          <NumbersBanner number="30" :label="$t('pages.aboutUs.yearsOfWork')" />
        </div>
      </div>
      <NuxtImg
        src="/img/index3.jpeg"
        :alt="$t('pages.aboutUs.imageAlt')"
        class="rounded-xl max-h-120 object-cover w-full self-center"
        format="webp"
      />
    </section>

    <section
      id="misija"
      class="scroll-mt-28 px-4 md:px-12 lg:px-28 py-12 md:py-20 bg-primary-600 text-white"
    >
      <div class="max-w-480 mx-auto flex flex-col gap-8 md:gap-12">
        <div class="flex flex-col gap-4 max-w-3xl">
          <div class="flex items-center gap-3">
            <div
              class="flex h-12 w-12 items-center justify-center rounded-full bg-white/10"
            >
              <Icon name="ion:flag" size="24" class="text-white" />
            </div>
            <h2 class="text-2xl md:text-3xl font-bold">
              {{ $t('pages.aboutUs.missionTitle') }}
            </h2>
          </div>
          <p class="text-lg md:text-xl leading-relaxed text-primary-50">
            {{ $t('pages.aboutUs.missionText') }}
          </p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div
            v-for="value in missionValues"
            :key="value.title"
            class="flex flex-col gap-2 rounded-xl bg-white/10 p-6"
          >
            <Icon :name="value.icon" size="28" class="text-white" />
            <h3 class="font-bold text-lg">{{ value.title }}</h3>
            <p class="text-sm text-primary-100">{{ value.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <section
      id="vizija"
      class="scroll-mt-28 px-4 md:px-12 lg:px-28 py-12 md:py-20 max-w-480 mx-auto flex flex-col gap-8 md:gap-12"
    >
      <div class="flex flex-col gap-4 max-w-3xl">
        <div class="flex items-center gap-3">
          <div
            class="flex h-12 w-12 items-center justify-center rounded-full bg-primary-50"
          >
            <Icon name="ion:eye" size="24" class="text-primary-500" />
          </div>
          <h2 class="text-2xl md:text-3xl font-bold text-primary-900">
            {{ $t('pages.aboutUs.visionTitle') }}
          </h2>
        </div>
        <p class="text-lg md:text-xl text-neutral-600 leading-relaxed">
          {{ $t('pages.aboutUs.visionText') }}
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <div
          v-for="(goal, index) in visionGoals"
          :key="goal"
          class="flex gap-4 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm"
        >
          <span class="text-3xl font-bold text-primary-200">
            {{ String(index + 1).padStart(2, '0') }}
          </span>
          <p class="text-neutral-600 self-center">{{ goal }}</p>
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts" setup>
const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.aboutUs.title'),
  description: () => t('seo.aboutUs.description'),
  keywords: () => t('seo.aboutUs.keywords'),
  ogTitle: () => t('seo.aboutUs.title'),
  ogDescription: () => t('seo.aboutUs.description'),
  ogSiteName: () => t('seo.siteName'),
})

const missionValues = computed(() => [
  {
    icon: 'ion:heart',
    title: t('pages.aboutUs.value1Title'),
    text: t('pages.aboutUs.value1Text'),
  },
  {
    icon: 'ion:ribbon',
    title: t('pages.aboutUs.value2Title'),
    text: t('pages.aboutUs.value2Text'),
  },
  {
    icon: 'ion:time',
    title: t('pages.aboutUs.value3Title'),
    text: t('pages.aboutUs.value3Text'),
  },
])

const visionGoals = computed(() => [
  t('pages.aboutUs.goal1'),
  t('pages.aboutUs.goal2'),
  t('pages.aboutUs.goal3'),
])
</script>
