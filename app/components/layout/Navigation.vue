<template>
  <header
    class="flex px-4 md:px-8 lg:px-16 nav:px-28 items-center justify-between shadow bg-white py-3 sm:py-4 sticky top-0 z-50 gap-4"
  >
    <div class="flex items-center gap-3">
      <NuxtLink to="/" class="shrink-0">
        <NuxtImg
          src="/img/logo.png"
          :alt="$t('layout.nav.logoAlt')"
          format="webp"
          height="75"
          width="75"
          class="h-12 w-12"
        />
      </NuxtLink>
      <h1 class="flex flex-col gap-0.5 sm:gap-0">
        <span
          class="font-bold sm:text-lg text-primary-600 leading-tight sm:leading-normal"
        >
          {{ $t('layout.nav.instituteName') }}
        </span>
        <span
          class="text-[11px] sm:text-xs uppercase tracking-wider text-neutral-700"
        >
          {{ $t('layout.nav.ministryName') }}
        </span>
      </h1>
    </div>
    <nav class="hidden nav:flex items-center gap-1">
      <template v-for="item in NAV_ITEMS" :key="item.title">
        <NuxtLink
          v-if="!item.children"
          :to="item.route!"
          class="text-neutral-500 px-4 py-2 text-lg font-medium border-b-2 border-transparent hover:text-primary-400 hover:bg-primary-50 transition-colors"
          exact-active-class="!text-primary-500 font-bold !border-primary-500"
        >
          {{ $t(item.title) }}
        </NuxtLink>

        <div
          v-else
          class="relative"
          @mouseenter="openDropdown = item.title"
          @mouseleave="openDropdown = null"
        >
          <button
            type="button"
            class="flex items-center gap-1 text-neutral-500 px-4 py-2 text-lg font-medium border-b-2 border-transparent hover:text-primary-400 hover:bg-primary-50 transition-colors cursor-pointer"
            :class="{
              'text-primary-500! font-bold border-primary-500!':
                isChildActive(item),
            }"
            @click="
              openDropdown = openDropdown === item.title ? null : item.title
            "
          >
            {{ $t(item.title) }}
            <Icon
              name="ion:chevron-down"
              size="14"
              class="transition-transform duration-200"
              :class="{ 'rotate-180': openDropdown === item.title }"
            />
          </button>
          <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 -translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-1"
          >
            <div
              v-if="openDropdown === item.title"
              class="absolute top-full left-0 pt-1 min-w-48 z-50"
            >
              <div
                class="bg-white rounded-lg shadow-lg border border-neutral-200 py-1"
              >
                <NuxtLink
                  v-for="child in item.children"
                  :key="child.title"
                  :to="child.route!"
                  class="block px-4 py-2.5 text-neutral-600 hover:bg-primary-50 hover:text-primary-500 transition-colors"
                  exact-active-class="!text-primary-500 !bg-primary-50 font-medium"
                  @click="openDropdown = null"
                >
                  {{ $t(child.title) }}
                </NuxtLink>
              </div>
            </div>
          </Transition>
        </div>
      </template>
    </nav>
    <Button
      class="hidden nav:inline-flex"
      :text="$t('layout.nav.eFormButton')"
      prepend-icon="ion:document"
      @click="handleButtonClicked"
    />
    <MobileMenu />
  </header>
</template>

<script setup lang="ts">
const route = useRoute()
const openDropdown = ref<string | null>(null)
const { open: openEFormModal } = useEFormModal()

const isChildActive = (item: (typeof NAV_ITEMS)[number]) => {
  return item.children?.some((child) => child.route === route.path)
}

const handleButtonClicked = () => {
  openEFormModal()
}
</script>
