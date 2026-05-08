<template>
  <footer class="px-4 md:px-12 lg:px-28 py-8 md:py-16 bg-primary-900">
    <div class="flex flex-col gap-8 md:gap-12">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div class="flex flex-col gap-6">
          <div class="flex items-center gap-3 text-lg font-bold text-white">
            <NuxtLink to="/">
              <NuxtImg
                src="/img/logo.png"
                alt="Logo"
                format="webp"
                height="75"
                width="75"
                class="h-7 w-auto"
              />
            </NuxtLink>
            <p>{{ $t('layout.footer.instituteName') }}</p>
          </div>
          <p class="text-sm text-neutral-300">
            {{ $t('layout.footer.description') }}
          </p>
        </div>
        <div class="flex flex-col gap-6">
          <h2 class="text-lg font-bold text-white">
            {{ $t('layout.footer.mainLinks') }}
          </h2>
          <nav class="flex flex-col gap-3">
            <template v-for="item in NAV_ITEMS" :key="item.title">
              <NuxtLink
                v-if="item.route"
                :to="item.route"
                class="text-neutral-300 hover:text-white transition-colors"
              >
                {{ $t(item.title) }}
              </NuxtLink>
              <template v-else-if="item.children">
                <NuxtLink
                  v-for="child in item.children"
                  :key="child.title"
                  :to="child.route!"
                  class="text-neutral-300 hover:text-white transition-colors"
                >
                  {{ $t(child.title) }}
                </NuxtLink>
              </template>
            </template>
          </nav>
        </div>
        <div class="flex flex-col gap-6">
          <h2 class="text-lg font-bold text-white">
            {{ $t('layout.footer.contactUs') }}
          </h2>
          <address class="flex flex-col gap-3 not-italic">
            <NuxtLink
              class="flex gap-2 items-center"
              :to="MAPS_EMBED_URL"
              target="_blank"
            >
              <Icon name="ion:location-sharp" class="text-primary-300" />
              <p class="text-neutral-300 hover:text-white transition-colors">
                {{ $t('layout.infoBar.address') }}
              </p>
            </NuxtLink>
            <NuxtLink class="flex gap-2 items-center" :to="PHONE_NUMBER_URL">
              <Icon name="ion:call" class="text-primary-300" />
              <p class="text-neutral-300 hover:text-white transition-colors">
                +381 11 361 5665
              </p>
            </NuxtLink>
            <NuxtLink class="flex gap-2 items-center" :to="EMAIL_ADDRESS_URL">
              <Icon name="ion:mail" class="text-primary-300" />
              <p class="text-neutral-300 hover:text-white transition-colors">
                info@zzzzmup.rs
              </p>
            </NuxtLink>
          </address>
        </div>
        <div class="flex flex-col gap-6">
          <div class="flex gap-3 items-center">
            <Icon name="ion:android-time" class="text-primary-300" size="18" />
            <h2 class="text-lg font-bold text-white">
              {{ $t('layout.footer.workingHoursTitle') }}
            </h2>
          </div>
          <div class="flex flex-col gap-3">
            <template
              v-for="(item, index) in GROUPED_WORKING_HOURS"
              :key="index"
            >
              <div class="flex items-center justify-between">
                <p class="text-neutral-300">{{ $t(item.title) }}</p>
                <p class="text-white font-bold">{{ item.time }}</p>
              </div>
              <div
                v-if="index !== GROUPED_WORKING_HOURS.length - 1"
                class="h-px w-full bg-primary-800"
              />
              <p
                v-if="item.tag === 'weekend'"
                class="text-sm text-neutral-400 italic -mt-2"
              >
                {{ $t('workingHours.weekendNote') }}
              </p>
            </template>
          </div>
        </div>
      </div>
      <div class="h-px bg-primary-800 w-full" />
      <div class="flex flex-wrap items-center gap-4 md:gap-8">
        <div class="flex flex-col gap-1">
          <p class="text-neutral-400 text-sm">
            {{ $t('layout.footer.companyId') }}
          </p>
          <p class="text-neutral-300">07078978</p>
        </div>
        <div class="flex flex-col gap-1">
          <p class="text-neutral-400 text-sm">
            {{ $t('layout.footer.taxId') }}
          </p>
          <p class="text-neutral-300">100182356</p>
        </div>
        <div class="flex flex-col gap-1">
          <p class="text-neutral-400 text-sm">
            {{ $t('layout.footer.activityCode') }}
          </p>
          <p class="text-neutral-300">85142</p>
        </div>
        <div class="flex flex-col gap-1">
          <p class="text-neutral-400 text-sm">
            {{ $t('layout.footer.bankAccount') }}
          </p>
          <p class="text-neutral-300">840-348667-78</p>
        </div>
      </div>
      <div class="h-px bg-primary-800 w-full" />
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-sm text-neutral-300 text-center sm:text-left">
          &copy; {{ currentYear }} {{ $t('layout.footer.copyright') }}
        </p>
        <div class="flex items-center gap-7">
          <NuxtLink :to="'/privacy-policy'"
            ><p
              class="text-sm text-neutral-300 hover:text-white transition-colors"
            >
              {{ $t('layout.footer.privacyPolicy') }}
            </p></NuxtLink
          >
          <NuxtLink :to="'/terms-of-use'"
            ><p
              class="text-sm text-neutral-300 hover:text-white transition-colors"
            >
              {{ $t('layout.footer.termsOfUse') }}
            </p></NuxtLink
          >
        </div>
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>
