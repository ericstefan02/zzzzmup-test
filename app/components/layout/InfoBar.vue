<template>
  <aside class="px-20 py-2 border-b border-neutral-200 bg-white text-sm">
    <div class="px-8 flex justify-between">
      <div class="flex gap-6 items-center">
        <div class="flex items-center gap-2">
          <Icon name="ion:android-time" class="text-primary-400" />
          <p class="font-medium text-neutral-500">
            {{ $t(workingHours?.title ?? '') }}: {{ workingHours?.open }} -
            {{ workingHours?.close }}
          </p>
        </div>
        <NuxtLink :to="MAPS_EMBED_URL" target="_blank">
          <div class="flex items-center gap-2">
            <Icon name="ion:location-sharp" class="text-primary-400" />
            <p class="font-medium text-neutral-500">
              {{ $t('layout.infoBar.address') }}
            </p>
          </div>
        </NuxtLink>
      </div>
      <div class="flex items-center gap-4">
        <NuxtLink :to="PHONE_NUMBER_URL">
          <div class="flex items-center gap-2">
            <Icon name="ion:call" class="text-accent" />
            <p class="font-bold text-accent">
              {{ $t('layout.infoBar.phone') }}
            </p>
          </div>
        </NuxtLink>
        <div class="flex items-center gap-1 border-l border-neutral-200 pl-4">
          <button
            type="button"
            class="px-2 py-0.5 rounded text-xs font-bold transition-colors cursor-pointer"
            :class="
              locale === 'sr-Cyrl'
                ? 'text-primary-500 bg-primary-50'
                : 'text-neutral-400 hover:text-primary-400'
            "
            @click="setLocale('sr-Cyrl')"
          >
            Ћир
          </button>
          <span class="text-neutral-300">|</span>
          <button
            type="button"
            class="px-2 py-0.5 rounded text-xs font-bold transition-colors cursor-pointer"
            :class="
              locale === 'sr-Latn'
                ? 'text-primary-500 bg-primary-50'
                : 'text-neutral-400 hover:text-primary-400'
            "
            @click="setLocale('sr-Latn')"
          >
            Lat
          </button>
        </div>
      </div>
    </div>
  </aside>
</template>
<script lang="ts" setup>
const { locale, setLocale } = useI18n()

const workingHours = computed(() => {
  const belgradeTime = new Date().toLocaleString('en-US', {
    timeZone: 'Europe/Belgrade',
  })
  const day = new Date(belgradeTime).getDay()
  return WORKING_HOURS_DATA[day]
})
</script>
