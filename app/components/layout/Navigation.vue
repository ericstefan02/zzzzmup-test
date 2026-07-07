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
          class="text-neutral-500 px-4 py-2 text-lg font-medium border-b-2 border-transparent hover:text-primary-400 hover:bg-primary-50 transition-colors"
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
            class="flex items-center gap-1 text-neutral-500 px-4 py-2 text-lg font-medium border-b-2 border-transparent hover:text-primary-400 hover:bg-primary-50 transition-colors cursor-pointer"
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
            class="flex items-center gap-1 text-neutral-500 px-4 py-2 text-lg font-medium border-b-2 border-transparent hover:text-primary-400 hover:bg-primary-50 transition-colors"
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
              class="absolute top-full z-50 pt-1"
              :class="
                item.mega
                  ? 'w-[56rem] left-1/2 -translate-x-1/2'
                  : 'w-72 left-0'
              "
            >
              <div
                class="bg-white rounded-lg shadow-lg border border-neutral-200"
                :class="item.mega ? 'overflow-hidden' : 'py-1'"
              >
                <!-- Mega meni (Услуге): master-detail — levi rail = grupe, desno = stavke aktivne grupe -->
                <div v-if="item.mega" class="flex items-stretch">
                  <div
                    class="w-76 shrink-0 bg-neutral-50 border-r border-neutral-200 py-2"
                  >
                    <NuxtLink
                      v-for="group in SERVICE_GROUPS"
                      :key="group.slug"
                      :to="serviceNodeRoute(group, true)"
                      active-class=""
                      class="flex items-center justify-between gap-2 px-4 py-2.5 text-[15px] font-semibold text-neutral-700 hover:text-primary-500 transition-colors"
                      :class="{
                        'bg-white': activeMegaGroup === group.slug,
                        'text-primary-500!':
                          activeMegaGroup === group.slug ||
                          currentServiceGroupSlug === group.slug,
                      }"
                      @mouseenter="activeMegaGroup = group.slug"
                      @focusin="activeMegaGroup = group.slug"
                      @click="closeDropdown"
                    >
                      <span>{{ $t(group.titleKey) }}</span>
                      <Icon
                        name="ion:chevron-forward"
                        size="14"
                        class="shrink-0"
                        :class="
                          activeMegaGroup === group.slug
                            ? 'text-primary-400'
                            : 'text-neutral-300'
                        "
                      />
                    </NuxtLink>
                  </div>
                  <div v-if="activeMegaNode" class="flex-1 min-w-0 p-5">
                    <h3
                      class="px-3 pb-2 text-xs font-bold uppercase tracking-wider text-primary-400"
                    >
                      {{ $t(activeMegaNode.titleKey) }}
                    </h3>
                    <div
                      v-if="activeMegaNode.children"
                      class="columns-2 gap-x-4"
                    >
                      <div
                        v-for="child in activeMegaNode.children"
                        :key="child.slug"
                        class="break-inside-avoid"
                      >
                        <NuxtLink
                          :to="serviceNodeRoute(child)"
                          active-class=""
                          class="block px-3 py-2 text-sm text-neutral-600 hover:bg-primary-50 hover:text-primary-500 rounded-md transition-colors"
                          :class="{
                            'text-primary-500! bg-primary-50! font-medium':
                              isRouteActive(serviceNodeRoute(child)),
                          }"
                          @click="closeDropdown"
                        >
                          {{ $t(child.titleKey) }}
                        </NuxtLink>
                        <div
                          v-if="child.children"
                          class="ml-3 mb-1 pl-2 border-l border-primary-100"
                        >
                          <NuxtLink
                            v-for="sub in child.children"
                            :key="sub.slug"
                            :to="serviceNodeRoute(sub)"
                            active-class=""
                            class="block px-3 py-1.5 text-[13px] text-neutral-500 hover:bg-primary-50 hover:text-primary-500 rounded-md transition-colors"
                            :class="{
                              'text-primary-500! bg-primary-50! font-medium':
                                isRouteActive(serviceNodeRoute(sub)),
                            }"
                            @click="closeDropdown"
                          >
                            {{ $t(sub.titleKey) }}
                          </NuxtLink>
                        </div>
                      </div>
                    </div>
                    <div v-else class="px-3">
                      <p
                        v-if="activeMegaLead"
                        class="text-sm text-neutral-500 leading-relaxed"
                      >
                        {{ activeMegaLead }}
                      </p>
                      <NuxtLink
                        :to="serviceNodeRoute(activeMegaNode, true)"
                        class="inline-flex items-center gap-1.5 pt-3 text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors"
                        @click="closeDropdown"
                      >
                        {{ $t('layout.nav.megaOpenGroup') }}
                        <Icon name="ion:arrow-forward" size="14" />
                      </NuxtLink>
                    </div>
                  </div>
                </div>
                <template v-for="child in item.children" v-else :key="child.title">
                  <!-- Child with nested children: shows nested flyout on hover -->
                  <div
                    v-if="child.children"
                    class="relative"
                    @mouseenter="openNestedDropdown = child.title"
                    @mouseleave="openNestedDropdown = null"
                  >
                    <NuxtLink
                      :to="child.route!"
                      active-class=""
                      exact-active-class="!text-primary-500 !bg-primary-50 font-medium"
                      class="flex items-center justify-between px-4 py-2.5 text-neutral-600 hover:bg-primary-50 hover:text-primary-500 transition-colors"
                      @click="openDropdown = null"
                    >
                      {{ $t(child.title) }}
                      <Icon
                        name="ion:chevron-forward"
                        size="14"
                        class="text-neutral-400"
                      />
                    </NuxtLink>
                    <Transition
                      enter-active-class="transition duration-150 ease-out"
                      enter-from-class="opacity-0 translate-x-1"
                      enter-to-class="opacity-100 translate-x-0"
                      leave-active-class="transition duration-100 ease-in"
                      leave-from-class="opacity-100 translate-x-0"
                      leave-to-class="opacity-0 translate-x-1"
                    >
                      <div
                        v-if="openNestedDropdown === child.title"
                        class="absolute left-full top-0 pl-1 w-72 z-50"
                      >
                        <div
                          class="bg-white rounded-lg shadow-lg border border-neutral-200 py-1"
                        >
                          <NuxtLink
                            v-for="nested in child.children"
                            :key="nested.title"
                            :to="nested.route!"
                            active-class=""
                            class="block px-4 py-2.5 text-neutral-600 hover:bg-primary-50 hover:text-primary-500 transition-colors"
                            :class="{
                              'text-primary-500! bg-primary-50! font-medium':
                                isRouteActive(nested.route!),
                            }"
                            @click="openDropdown = null"
                          >
                            {{ $t(nested.title) }}
                          </NuxtLink>
                        </div>
                      </div>
                    </Transition>
                  </div>
                  <!-- Simple child link -->
                  <NuxtLink
                    v-else
                    :to="child.route!"
                    active-class=""
                    class="block px-4 py-2.5 text-neutral-600 hover:bg-primary-50 hover:text-primary-500 transition-colors"
                    :class="{
                      'text-primary-500! bg-primary-50! font-medium':
                        isRouteActive(child.route!),
                    }"
                    @click="openDropdown = null"
                  >
                    {{ $t(child.title) }}
                  </NuxtLink>
                </template>
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
      <Button
        class="hidden nav:inline-flex"
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
const openNestedDropdown = ref<string | null>(null)
const { open: openEFormModal } = useEFormModal()
const { open: openSearchModal } = useSearchModal()

// Mega meni (Услуге): aktivna grupa u levom rail-u
const { t, te } = useI18n()
const activeMegaGroup = ref<string>(SERVICE_GROUPS[0]!.slug)
const activeMegaNode = computed(() => findServiceGroup(activeMegaGroup.value))

// Lead za grupe bez pod-stavki — guard protiv sirovog ključa za novu grupu
const activeMegaLead = computed(() => {
  const slug = activeMegaNode.value?.slug
  if (!slug) return ''
  const key = `pages.services.groupLeads.${slug}`
  return te(key) ? t(key) : ''
})

// Grupa kojoj pripada trenutno otvorena usluga/grupa (za oznaku u rail-u)
const currentServiceGroupSlug = computed(() => {
  if (route.path !== '/services') return null
  const groupSlug = queryString(route.query.group)
  if (groupSlug && findServiceGroup(groupSlug)) return groupSlug
  const serviceSlug = queryString(route.query.service)
  if (serviceSlug) return findServiceNode(serviceSlug)?.group.slug ?? null
  return null
})

const openItem = (item: NavItem) => {
  openDropdown.value = item.title
  if (item.mega) {
    activeMegaGroup.value =
      currentServiceGroupSlug.value ?? SERVICE_GROUPS[0]!.slug
  }
}

const isChildActive = (item: NavItem) => isNavBranchActive(item, route)
const isRouteActive = (targetRoute: string) =>
  isNavRouteActive(targetRoute, route)

const closeDropdown = () => {
  openDropdown.value = null
  openNestedDropdown.value = null
}

const handleButtonClicked = () => {
  openEFormModal()
}
</script>
