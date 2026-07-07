<template>
  <div v-if="article" class="flex flex-col">
    <TextBanner
      :title="article.title"
      parent-label="nav.news"
      parent-to="/news"
    />
    <article
      class="px-4 md:px-12 lg:px-28 py-8 md:py-14 max-w-480 mx-auto w-full flex flex-col gap-6 md:gap-8"
    >
      <div class="max-w-4xl mx-auto w-full flex flex-col gap-6 md:gap-8">
        <div class="flex items-center gap-2 text-sm text-neutral-500">
          <Icon name="ion:calendar-clear" size="16" class="text-primary-400" />
          <time :datetime="article.created_at">{{ formattedDate }}</time>
        </div>
        <!-- FIXME: promeni img na NuxtImg kada se namesti r2 -->
        <img
          :src="article.image"
          :alt="article.title"
          class="w-full max-h-120 object-cover rounded-xl"
        />
        <!-- Sadržaj stiže kao HTML (kasnije sa API-ja) -->
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div
          class="article-content flex flex-col gap-4 text-lg text-neutral-600 leading-relaxed"
          v-html="article.content"
        />
      </div>
    </article>
  </div>
</template>

<script lang="ts" setup>
import { NEWS_ARTICLES } from '~/utils/dummy-data'

const { t, locale } = useI18n()
const route = useRoute()

// TODO: zameniti API pozivom po id-u (dummy-data.ts)
const article = NEWS_ARTICLES.find(
  (item) => item.id === Number(route.params.id),
)

if (!article) {
  throw createError({
    statusCode: 404,
    statusMessage: t('pages.newsArticle.notFound'),
  })
}

const formattedDate = computed(() =>
  formatDateSerbian(article.created_at, locale.value),
)

useSeoMeta({
  title: () => `${article.title} | ${t('seo.newsArticle.titleSuffix')}`,
  description: () => article.content.replace(/<[^>]*>/g, '').slice(0, 160),
  keywords: () => t('seo.newsArticle.keywords'),
  ogTitle: () => article.title,
  ogDescription: () => article.content.replace(/<[^>]*>/g, '').slice(0, 160),
  ogSiteName: () => t('seo.siteName'),
})

// NewsArticle strukturirani podaci (SEO)
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() =>
        JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'NewsArticle',
          headline: article.title,
          datePublished: article.created_at,
          image: [article.image],
          publisher: {
            '@type': 'MedicalOrganization',
            name: t('pages.home.heroTitle'),
          },
        }),
      ),
    },
  ],
})
</script>

<style scoped>
.article-content :deep(ul),
.article-content :deep(ol) {
  padding-left: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.article-content :deep(ul) {
  list-style: disc;
}

.article-content :deep(ol) {
  list-style: decimal;
}

.article-content :deep(strong) {
  color: var(--color-neutral-800);
}
</style>
