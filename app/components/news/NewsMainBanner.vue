<template>
  <!-- FIXME: promeniti na NuxtImg -->
  <div
    class="grid grid-cols-1 md:grid-cols-2 border border-neutral-200 rounded-xl shadow-lg overflow-hidden max-h-auto md:max-h-150 bg-white"
  >
    <img
      :src="newsArticle.image"
      :alt="newsArticle.title"
      class="object-cover w-full h-48 md:h-full"
    />
    <div class="flex flex-col gap-4 md:gap-6 px-4 py-6 md:px-10 justify-center">
      <div class="flex items-center gap-2 text-neutral-500 text-sm">
        <Icon name="ion:calendar-clear-outline" size="14" />
        <p>{{ formatedDate }}</p>
      </div>
      <h2 class="text-primary-900 font-bold text-xl md:text-3xl line-clamp-3">
        {{ newsArticle.title }}
      </h2>
      <p class="text-neutral-700 line-clamp-5">{{ parsedContent }}</p>
      <NuxtLink :to="`/news/${newsArticle.id}`">
        <Button
          variant="text"
          :text="$t('components.readMore')"
          append-icon="ion:arrow-forward"
        />
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { NewsArticle } from '~/types/news'

const { newsArticle } = defineProps<{
  newsArticle: NewsArticle
}>()

const { locale } = useI18n()

const parsedContent = computed(() => {
  if (!newsArticle.content) return ''
  // Jednostavan regex koji skida sve HTML tagove (<...>) iz stringa
  return newsArticle.content.replace(/<\/?[^>]+(>|$)/g, '')
})

const formatedDate = computed(() => {
  return formatDateSerbian(newsArticle.created_at, locale.value)
})
</script>
