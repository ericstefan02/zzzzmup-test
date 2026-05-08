<template>
  <p>vest {{ newsId }}</p>
</template>
<script lang="ts" setup>
const { t } = useI18n()
const route = useRoute()
const newsId = route.params.id

useSeoMeta({
  title: () => `${t('seo.newsArticle.titleSuffix')}`,
  ogTitle: () => `${t('seo.newsArticle.titleSuffix')}`,
  ogSiteName: () => t('seo.siteName'),
})

// TODO: Kada se poveže sa backendom, zameniti title sa:
// title: () => `${article.title} | ${t('seo.newsArticle.titleSuffix')}`,
</script>
