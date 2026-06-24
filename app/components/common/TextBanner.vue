<template>
  <section
    class="relative overflow-hidden px-4 md:px-12 lg:px-28 py-10 md:py-16 lg:py-20 bg-primary-600"
  >
    <div class="relative z-10 flex flex-col gap-4 md:gap-6">
      <!-- Desktop: pun trag -->
      <nav
        aria-label="breadcrumb"
        class="hidden sm:flex items-center gap-1.5 text-sm text-primary-100"
      >
        <NuxtLink to="/" class="hover:text-white transition-colors">
          {{ $t('nav.home') }}
        </NuxtLink>
        <Icon name="ion:chevron-forward" size="12" class="text-primary-200/70" />
        <template v-if="parentLabel && parentTo">
          <NuxtLink :to="parentTo" class="hover:text-white transition-colors">
            {{ $t(parentLabel) }}
          </NuxtLink>
          <Icon
            name="ion:chevron-forward"
            size="12"
            class="text-primary-200/70"
          />
        </template>
        <span class="text-white font-medium">{{ title }}</span>
      </nav>

      <!-- Mobilni: back-link na roditelja (bez prelamanja) -->
      <NuxtLink
        :to="parentTo || '/'"
        class="sm:hidden flex items-center gap-1 text-sm text-primary-100 hover:text-white transition-colors max-w-max"
      >
        <Icon name="ion:chevron-back" size="14" />
        {{ parentLabel ? $t(parentLabel) : $t('nav.home') }}
      </NuxtLink>

      <h1 class="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white">
        {{ title }}
      </h1>
      <p
        v-if="description"
        class="max-w-full md:max-w-2/3 lg:max-w-1/2 text-base md:text-xl text-neutral-300"
      >
        {{ description }}
      </p>

      <slot />
    </div>

    <div class="left-0 right-0 top-1/4 bottom-0 absolute pointer-events-none">
      <svg
        class="w-full h-full text-white/10"
        preserveAspectRatio="none"
        viewBox="0 0 1440 225"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M0 225C288 -75 720 -75 1440 225H0Z" fill="currentColor" />
      </svg>
    </div>
  </section>
</template>
<script setup lang="ts">
const { title, description, parentLabel, parentTo } = defineProps<{
  title: string
  description?: string
  parentLabel?: string
  parentTo?: string
}>()

const { t } = useI18n()
const route = useRoute()
const SITE = 'https://www.zzzzmup.rs'

// BreadcrumbList strukturirani podaci (SEO rich snippet)
const breadcrumbJsonLd = computed(() => {
  const items: { name: string; url?: string }[] = [
    { name: t('nav.home'), url: `${SITE}/` },
  ]
  if (parentLabel && parentTo) {
    items.push({ name: t(parentLabel), url: `${SITE}${parentTo}` })
  }
  items.push({ name: title, url: `${SITE}${route.path}` })
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  })
})

useHead({
  script: [
    { type: 'application/ld+json', innerHTML: breadcrumbJsonLd },
  ],
})
</script>
