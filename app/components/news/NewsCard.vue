<template>
  <!-- FIXME: promeni img na NuxtImg kada se namesti r2 -->

  <article class="flex flex-col gap-4">
    <NuxtLink :to="`/news/${newsArticle.id}`" class="relative">
      <img
        :src="newsArticle.image"
        :alt="newsArticle.title"
        class="rounded-xl h-40 md:h-52 lg:h-64 w-full object-cover"
      />
      <div
        class="flex items-center justify-center bg-white text-primary-900 px-3 py-1 rounded-md absolute left-4 top-4 shadow"
      >
        <p class="uppercase text-sm font-bold">
          {{ formatedDate }}
        </p>
      </div>
    </NuxtLink>
    <NuxtLink :to="`/news/${newsArticle.id}`">
      <h4
        class="text-xl font-bold text-primary-900 line-clamp-2 min-h-14"
        :title="newsArticle.title"
      >
        {{ newsArticle.title }}
      </h4>
    </NuxtLink>
    <NuxtLink :to="`/news/${newsArticle.id}`">
      <p class="text-neutral-500 line-clamp-3">{{ parsedContent }}</p>
    </NuxtLink>
    <NuxtLink :to="`/news/${newsArticle.id}`">
      <Button :text="$t('components.readMore')" variant="text" />
    </NuxtLink>
  </article>
</template>

<script setup lang="ts">
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
