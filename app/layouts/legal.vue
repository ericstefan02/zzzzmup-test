<template>
  <div class="bg-neutral-50 flex flex-col min-h-screen">
    <header
      class="flex px-4 md:px-8 lg:px-28 items-center justify-between bg-white py-3 sm:py-4 sticky top-0 z-50 border-b border-neutral-200"
    >
      <NuxtLink to="/" class="flex items-center gap-3">
        <NuxtImg
          src="/img/logo.png"
          :alt="$t('layout.nav.logoAlt')"
          format="webp"
          height="75"
          width="75"
          class="h-10 w-10"
        />
        <span class="font-bold text-primary-600 hidden sm:inline">
          {{ $t('layout.nav.instituteName') }}
        </span>
      </NuxtLink>
      <button
        type="button"
        class="flex items-center gap-2 px-4 py-2 text-neutral-600 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors cursor-pointer"
        @click="goBack"
      >
        <Icon name="ion:arrow-back" size="18" />
        <span class="text-sm font-medium">{{ $t('legal.backButton') }}</span>
      </button>
    </header>
    <main class="grow">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()

const goBack = () => {
  if (router.options.history.state.back) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>
