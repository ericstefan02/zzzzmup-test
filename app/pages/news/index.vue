<template>
  <div class="flex flex-col gap-12">
    <TextBanner
      :title="$t('pages.news.title')"
      :description="$t('pages.news.description')"
    />
    <div
      class="px-4 md:px-12 lg:px-28 flex flex-col gap-8 md:gap-12 mb-10 md:mb-16 max-w-480 mx-auto w-full"
    >
      <NewsMainBanner
        :news-article="mainArticle"
        class="-mt-16 md:-mt-18 relative"
      />
      <section class="flex flex-col gap-6 max-w-480 mx-auto">
        <div class="flex items-center gap-3">
          <Icon name="ion:newspaper-sharp" class="text-primary-400" size="20" />
          <h2 class="text-primary-900 font-bold text-xl">
            {{ $t('pages.news.latestNews') }}
          </h2>
        </div>
        <div class="h-px w-full bg-neutral-200" />
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NewsCard
            v-for="article in news"
            :key="article.id"
            :news-article="article"
          />
        </div>
      </section>
      <!-- FIXME: skloniti dummy vrednost -->
      <Pagination
        :total-items="27"
        :items-per-page="6"
        :current-page="page"
        @page-change="page = $event"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import NewsMainBanner from '~/components/news/NewsMainBanner.vue'
import type { NewsArticle } from '~/types/news'

const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.news.title'),
  description: () => t('seo.news.description'),
  keywords: () => t('seo.news.keywords'),
  ogTitle: () => t('seo.news.title'),
  ogDescription: () => t('seo.news.description'),
  ogSiteName: () => t('seo.siteName'),
})

const page = ref(1)

// TODO: zameniti API pozivom (dummy-data.ts)
const mainArticle: NewsArticle = NEWS_ARTICLES[0]!
const news: NewsArticle[] = NEWS_ARTICLES.slice(1)
</script>
