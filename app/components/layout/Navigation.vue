<template>
  <header class="shadow bg-white py-3 sm:py-4 sticky top-0 z-50">
    <div
      class="flex items-center justify-between gap-4 max-w-480 mx-auto w-full px-4 md:px-12 lg:px-28"
    >
    <NuxtLink
      to="/"
      class="flex items-center gap-3 min-w-0 transition-opacity hover:opacity-80"
    >
      <NuxtImg
        src="/img/logo.png"
        :alt="$t('layout.nav.logoAlt')"
        format="webp"
        height="75"
        width="75"
        class="h-12 w-12"
      />
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
    </NuxtLink>
    <nav class="hidden nav:flex items-center gap-1">
      <template v-for="item in NAV_ITEMS" :key="item.title">
        <NuxtLink
          v-if="!item.children"
          :to="item.route!"
          class="whitespace-nowrap text-neutral-500 px-3 navwide:px-4 py-2 text-base navwide:text-lg font-medium border-b-2 border-transparent hover:text-primary-400 hover:bg-primary-50 transition-colors"
          exact-active-class="!text-primary-500 font-bold !border-primary-500"
        >
          {{ $t(item.title) }}
        </NuxtLink>

        <div
          v-else
          class="relative"
          @mouseenter="openItem(item)"
          @mouseleave="closeDropdown"
        >
          <button
            v-if="!item.route"
            type="button"
            class="flex items-center gap-1 whitespace-nowrap text-neutral-500 px-3 navwide:px-4 py-2 text-base navwide:text-lg font-medium border-b-2 border-transparent hover:text-primary-400 hover:bg-primary-50 transition-colors cursor-pointer"
            :class="{
              'text-primary-500! font-bold border-primary-500!':
                isChildActive(item),
            }"
            @click="openDropdown === item.title ? closeDropdown() : openItem(item)"
          >
            {{ $t(item.title) }}
            <Icon
              name="ion:chevron-down"
              size="14"
              class="transition-transform duration-200"
              :class="{ 'rotate-180': openDropdown === item.title }"
            />
          </button>
          <NuxtLink
            v-else
            :to="item.route"
            class="flex items-center gap-1 whitespace-nowrap text-neutral-500 px-3 navwide:px-4 py-2 text-base navwide:text-lg font-medium border-b-2 border-transparent hover:text-primary-400 hover:bg-primary-50 transition-colors"
            :class="{
              'text-primary-500! font-bold border-primary-500!':
                isChildActive(item) || route.path === item.route,
            }"
            @click="openDropdown = null"
          >
            {{ $t(item.title) }}
            <Icon
              name="ion:chevron-down"
              size="14"
              class="transition-transform duration-200"
              :class="{ 'rotate-180': openDropdown === item.title }"
            />
          </NuxtLink>
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
              class="absolute top-full z-50 pt-1 w-72 left-0"
            >
              <div
                class="bg-white rounded-lg shadow-lg border border-neutral-200 py-1"
              >
                <!-- Rekurzivna kaskada: isti UX za О нама i Услуге (flyout po nivou) -->
                <NavDropdownItem
                  v-for="child in item.children"
                  :key="child.title"
                  :item="child"
                />
              </div>
            </div>
          </Transition>
        </div>
      </template>
    </nav>
    <div class="flex items-center gap-1 sm:gap-2 shrink-0">
      <button
        type="button"
        class="flex items-center justify-center h-10 w-10 rounded-lg text-neutral-600 hover:bg-primary-50 hover:text-primary-500 transition-colors cursor-pointer"
        :aria-label="$t('components.search.open')"
        @click="openSearchModal"
      >
        <Icon name="ion:search" size="22" />
      </button>
      <!-- 1440-1660: samo ikonica (nema mesta za pun tekst dugmeta) -->
      <button
        type="button"
        class="hidden nav:flex navwide:hidden items-center justify-center h-10 w-10 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition duration-150 ease-out active:scale-[0.98] cursor-pointer"
        :aria-label="$t('layout.nav.eFormButton')"
        @click="handleButtonClicked"
      >
        <Icon name="ion:document" size="20" />
      </button>
      <Button
        class="hidden navwide:inline-flex"
        :text="$t('layout.nav.eFormButton')"
        prepend-icon="ion:document"
        @click="handleButtonClicked"
      />
      <MobileMenu />
    </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { NavItem } from '~/types/common'

const route = useRoute()
const openDropdown = ref<string | null>(null)
const { open: openEFormModal } = useEFormModal()
const { open: openSearchModal } = useSearchModal()

const openItem = (item: NavItem) => {
  openDropdown.value = item.title
}

const isChildActive = (item: NavItem) => isNavBranchActive(item, route)

const closeDropdown = () => {
  openDropdown.value = null
}

// Linkovi u kaskadi (NavDropdownItem) zatvaraju dropdown na klik
provide('closeDesktopDropdown', closeDropdown)

const handleButtonClicked = () => {
  openEFormModal()
}
</script>
