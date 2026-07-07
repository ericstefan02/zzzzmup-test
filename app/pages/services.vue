<template>
  <div class="flex flex-col">
    <TextBanner
      :title="$t('pages.services.title')"
      :description="$t('pages.services.description')"
    />
    <div
      class="px-4 md:px-12 lg:px-28 flex flex-col lg:grid lg:grid-cols-[340px_1fr] items-start gap-6 lg:gap-12 my-6 md:my-10 max-w-480 mx-auto w-full"
    >
      <nav
        ref="mobileNavRef"
        class="w-full flex flex-col gap-3 lg:gap-4"
        aria-label="Službe"
      >
        <!-- Search -->
        <div class="relative w-full">
          <Icon
            name="ion:search"
            size="16"
            class="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
          />
          <input
            v-model="search"
            type="search"
            :placeholder="$t('pages.services.searchPlaceholder')"
            class="w-full rounded-lg border border-neutral-200 bg-white pl-9 pr-3 py-3 text-sm text-neutral-800 placeholder:text-neutral-500 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
          >
        </div>

        <!-- Mobile: horizontal pills -->
        <template v-if="!isSearching">
          <div data-pill-row class="flex lg:hidden gap-2 overflow-x-auto">
            <button
              v-for="group in SERVICE_GROUPS"
              :key="'mg-' + group.slug"
              type="button"
              class="whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer border"
              :class="
                activeGroupSlug === group.slug
                  ? 'bg-primary-500 text-white border-primary-500'
                  : 'bg-white text-neutral-700 border-neutral-200 hover:bg-primary-50 hover:text-primary-500'
              "
              :aria-current="activeGroupSlug === group.slug ? 'true' : undefined"
              @click="selectGroup(group)"
            >
              {{ $t(group.titleKey) }}
            </button>
          </div>
          <div
            v-if="activeGroupItems.length"
            data-pill-row
            class="flex lg:hidden gap-2 overflow-x-auto"
          >
            <template v-for="flat in activeGroupItems" :key="'mi-' + flat.node.slug">
              <NuxtLink
                v-if="flat.node.route"
                :to="flat.node.route"
                class="whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors border bg-white text-neutral-700 border-neutral-200 hover:bg-primary-50 hover:text-primary-500"
              >
                {{ $t(flat.node.titleKey) }}
              </NuxtLink>
              <button
                v-else
                type="button"
                class="whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer border"
                :class="
                  selectedItem?.node.slug === flat.node.slug
                    ? 'bg-primary-500 text-white border-primary-500'
                    : 'bg-white text-neutral-700 border-neutral-200 hover:bg-primary-50 hover:text-primary-500'
                "
                :aria-current="
                  selectedItem?.node.slug === flat.node.slug ? 'true' : undefined
                "
                @click="selectItem(flat)"
              >
                {{ mobileItemLabel(flat) }}
              </button>
            </template>
          </div>
        </template>
        <div v-else class="flex lg:hidden gap-2 overflow-x-auto">
          <template v-for="result in searchResults" :key="'ms-' + result.node.slug">
            <NuxtLink
              v-if="result.node.route"
              :to="result.node.route"
              class="whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors border bg-white text-neutral-700 border-neutral-200 hover:bg-primary-50 hover:text-primary-500"
            >
              {{ $t(result.node.titleKey) }}
            </NuxtLink>
            <button
              v-else
              type="button"
              class="whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer border bg-white text-neutral-700 border-neutral-200 hover:bg-primary-50 hover:text-primary-500"
              @click="selectSearchResult(result)"
            >
              {{ $t(result.node.titleKey) }}
            </button>
          </template>
          <p
            v-if="!searchResults.length"
            class="px-2 py-2 text-sm text-neutral-400 whitespace-nowrap"
          >
            {{ $t('pages.services.noResults') }}
          </p>
        </div>

        <!-- Desktop sidebar -->
        <div
          class="hidden lg:block lg:rounded-xl lg:border lg:border-neutral-200 lg:shadow-xs overflow-hidden"
        >
          <!-- Rezultati pretrage: flat lista -->
          <template v-if="isSearching">
            <template v-for="result in searchResults" :key="'s-' + result.node.slug">
              <NuxtLink
                v-if="result.node.route"
                :to="result.node.route"
                class="w-full px-4 py-3 transition-colors flex items-start justify-between gap-2 text-left text-neutral-700 bg-white hover:bg-neutral-50 hover:text-primary-600"
              >
                <span class="text-sm leading-snug">
                  {{ $t(result.node.titleKey) }}
                </span>
                <Icon
                  name="ion:arrow-forward"
                  size="16"
                  class="mt-0.5 shrink-0 text-neutral-300"
                />
              </NuxtLink>
              <DepartmentButton
                v-else
                :title="$t(result.node.titleKey)"
                :subtitle="searchResultContext(result)"
                :selected="isNodeSelected(result)"
                @select="selectSearchResult(result)"
              />
            </template>
            <p
              v-if="!searchResults.length"
              class="px-5 py-6 text-sm text-neutral-400"
            >
              {{ $t('pages.services.noResults') }}
            </p>
          </template>

          <!-- Accordion grupa -->
          <template v-else>
            <div
              v-for="group in SERVICE_GROUPS"
              :key="group.slug"
              class="border-b border-neutral-200 last:border-b-0"
            >
              <div class="flex items-stretch bg-neutral-50">
                <button
                  type="button"
                  class="flex-1 flex items-center gap-2 px-4 py-3 text-left cursor-pointer transition-colors hover:text-primary-600"
                  :class="
                    activeGroupSlug === group.slug
                      ? 'text-primary-600'
                      : 'text-neutral-700'
                  "
                  @click="selectGroup(group)"
                >
                  <span class="text-sm font-bold leading-snug">
                    {{ $t(group.titleKey) }}
                  </span>
                </button>
                <button
                  v-if="group.children"
                  type="button"
                  class="px-4 flex items-center cursor-pointer text-neutral-400 hover:text-primary-500 transition-colors"
                  :aria-expanded="expandedGroup === group.slug"
                  @click="toggleGroup(group.slug)"
                >
                  <Icon
                    name="ion:chevron-down"
                    size="14"
                    class="transition-transform duration-200"
                    :class="{ 'rotate-180': expandedGroup === group.slug }"
                  />
                </button>
              </div>
              <div
                v-if="group.children"
                class="grid transition-[grid-template-rows] duration-300 ease-out"
                :class="
                  expandedGroup === group.slug
                    ? 'grid-rows-[1fr]'
                    : 'grid-rows-[0fr]'
                "
              >
                <div class="overflow-hidden">
                  <div class="border-t border-neutral-200">
                    <template
                      v-for="child in group.children"
                      :key="child.slug"
                    >
                      <NuxtLink
                        v-if="child.route"
                        :to="child.route"
                        class="w-full px-4 py-3 transition-colors flex items-start justify-between gap-2 text-left text-neutral-700 bg-white hover:bg-neutral-50 hover:text-primary-600"
                      >
                        <span class="text-sm leading-snug">
                          {{ $t(child.titleKey) }}
                        </span>
                        <Icon
                          name="ion:arrow-forward"
                          size="16"
                          class="mt-0.5 shrink-0 text-neutral-300"
                        />
                      </NuxtLink>
                      <template v-else>
                        <DepartmentButton
                          :title="$t(child.titleKey)"
                          :selected="selectedItem?.node.slug === child.slug"
                          @select="selectItem({ node: child, group, parent: null })"
                        />
                        <DepartmentButton
                          v-for="sub in child.children"
                          :key="sub.slug"
                          :title="$t(sub.titleKey)"
                          :depth="1"
                          :selected="selectedItem?.node.slug === sub.slug"
                          @select="selectItem({ node: sub, group, parent: child })"
                        />
                      </template>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </nav>

      <!-- Right side content -->
      <section class="flex flex-col gap-8 w-full min-w-0">
        <!-- Izabrana konkretna stavka -->
        <template v-if="selectedItem">
          <div class="flex flex-col gap-1">
            <p class="text-sm font-medium text-primary-400">
              {{ $t(selectedItem.group.titleKey) }}
              <template v-if="selectedItem.parent">
                / {{ $t(selectedItem.parent.titleKey) }}
              </template>
            </p>
            <h2 class="text-2xl font-bold text-primary-900">
              {{ $t(selectedItem.node.titleKey) }}
            </h2>
          </div>
          <div class="w-full h-px bg-neutral-200" />
          <ServicesList :service-slug="selectedItem.node.slug" />
        </template>

        <!-- Izabrana grupa: overview -->
        <template v-else-if="selectedGroup">
          <div class="flex flex-col gap-2">
            <h2 class="text-2xl font-bold text-primary-900">
              {{ $t(selectedGroup.titleKey) }}
            </h2>
            <p
              v-if="groupLead(selectedGroup.slug)"
              class="text-lg text-neutral-500"
            >
              {{ groupLead(selectedGroup.slug) }}
            </p>
          </div>
          <div class="w-full h-px bg-neutral-200" />
          <div
            v-if="selectedGroup.children"
            class="grid md:grid-cols-2 gap-3"
          >
            <template
              v-for="child in selectedGroup.children"
              :key="'ov-' + child.slug"
            >
              <NuxtLink
                v-if="child.route"
                :to="child.route"
                class="group flex items-center justify-between gap-3 rounded-xl border border-neutral-200 bg-white p-4 transition-colors hover:border-primary-300 hover:bg-primary-50"
              >
                <span class="font-medium text-neutral-700 group-hover:text-primary-600">
                  {{ $t(child.titleKey) }}
                </span>
                <Icon
                  name="ion:arrow-forward"
                  size="16"
                  class="shrink-0 text-neutral-300 group-hover:text-primary-500"
                />
              </NuxtLink>
              <button
                v-else
                type="button"
                class="group flex items-center justify-between gap-3 rounded-xl border border-neutral-200 bg-white p-4 text-left cursor-pointer transition-colors hover:border-primary-300 hover:bg-primary-50"
                @click="
                  selectItem({ node: child, group: selectedGroup!, parent: null })
                "
              >
                <span class="flex flex-col gap-0.5">
                  <span
                    class="font-medium text-neutral-700 group-hover:text-primary-600"
                  >
                    {{ $t(child.titleKey) }}
                  </span>
                  <span
                    v-if="child.children"
                    class="text-xs text-neutral-400"
                  >
                    {{
                      child.children
                        .map((sub) => $t(sub.titleKey))
                        .join(' · ')
                    }}
                  </span>
                </span>
                <Icon
                  name="ion:chevron-forward"
                  size="16"
                  class="shrink-0 text-neutral-300 group-hover:text-primary-500"
                />
              </button>
            </template>
          </div>
          <!-- Grupa bez pod-stavki (правна/техничка служба): direktno usluge -->
          <ServicesList v-else :service-slug="selectedGroup.slug" />
        </template>
      </section>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {
  SERVICE_GROUPS,
  findServiceGroup,
  findServiceNode,
  flattenServiceNodes,
  type FlatServiceNode,
  type ServiceNode,
} from '~/utils/services-structure'

const { t, te } = useI18n()
const route = useRoute()
const router = useRouter()

// Lead tekst grupe — guard da nova grupa bez prevoda ne renderuje sirovi ključ
const groupLead = (slug: string) => {
  const key = `pages.services.groupLeads.${slug}`
  return te(key) ? t(key) : ''
}

useSeoMeta({
  title: () => t('seo.services.title'),
  description: () => t('seo.services.description'),
  keywords: () => t('seo.services.keywords'),
  ogTitle: () => t('seo.services.title'),
  ogDescription: () => t('seo.services.description'),
  ogSiteName: () => t('seo.siteName'),
})

// Selekcija: ili L1 grupa (overview) ili konkretna L2/L3 stavka
const selectedGroup = ref<ServiceNode | null>(null)
const selectedItem = ref<FlatServiceNode | null>(null)
const expandedGroup = ref<string | null>(null)
const mobileNavRef = ref<HTMLElement | null>(null)

const activeGroupSlug = computed(
  () => selectedItem.value?.group.slug ?? selectedGroup.value?.slug ?? null,
)

const activeGroupItems = computed<FlatServiceNode[]>(() => {
  const slug = activeGroupSlug.value
  if (!slug) return []
  return flattenServiceNodes().filter((f) => f.group.slug === slug)
})

// Pretraga (radi za ćirilicu i latinicu preko normalizeSearch)
const search = ref('')
const isSearching = computed(() => search.value.trim().length > 0)
const searchResults = computed<FlatServiceNode[]>(() => {
  const q = normalizeSearch(search.value.trim())
  if (!q) return []
  const groups: FlatServiceNode[] = SERVICE_GROUPS.map((g) => ({
    node: g,
    group: g,
    parent: null,
  }))
  return [...groups, ...flattenServiceNodes()].filter((f) =>
    normalizeSearch(t(f.node.titleKey)).includes(q),
  )
})

const searchResultContext = (flat: FlatServiceNode) =>
  flat.node.slug === flat.group.slug
    ? undefined
    : [t(flat.group.titleKey), flat.parent && t(flat.parent.titleKey)]
        .filter(Boolean)
        .join(' / ')

const isNodeSelected = (flat: FlatServiceNode) =>
  flat.node.slug === flat.group.slug
    ? selectedGroup.value?.slug === flat.node.slug && !selectedItem.value
    : selectedItem.value?.node.slug === flat.node.slug

const mobileItemLabel = (flat: FlatServiceNode) =>
  flat.parent
    ? `${t(flat.parent.titleKey)}: ${t(flat.node.titleKey)}`
    : t(flat.node.titleKey)

// Horizontalno centriranje aktivnih pilula (oba mobilna reda: grupe i stavke).
// Red bez aktivne pilule (promena grupe → stavke još nisu birane) ide na početak,
// inače ostane skrolovan tamo gde je bio za prethodnu grupu.
// Ručni scrollTo umesto scrollIntoView da ne pomera stranicu vertikalno.
const scrollActiveIntoView = () => {
  nextTick(() => {
    const rows =
      mobileNavRef.value?.querySelectorAll<HTMLElement>('[data-pill-row]')
    rows?.forEach((row) => {
      const active = row.querySelector<HTMLElement>('[aria-current="true"]')
      row.scrollTo({
        left: active
          ? active.offsetLeft - (row.clientWidth - active.clientWidth) / 2
          : 0,
        behavior: 'smooth',
      })
    })
  })
}

const toggleGroup = (slug: string) => {
  expandedGroup.value = expandedGroup.value === slug ? null : slug
}

const selectGroup = (group: ServiceNode, updateUrl = true) => {
  selectedGroup.value = group
  selectedItem.value = null
  expandedGroup.value = group.children ? group.slug : null
  if (updateUrl) {
    router.replace({ query: { group: group.slug } })
  }
  scrollActiveIntoView()
}

const selectItem = (flat: FlatServiceNode, updateUrl = true) => {
  selectedItem.value = flat
  selectedGroup.value = null
  expandedGroup.value = flat.group.slug
  if (updateUrl) {
    router.replace({ query: { service: flat.node.slug } })
  }
  scrollActiveIntoView()
}

const selectSearchResult = (flat: FlatServiceNode) => {
  search.value = ''
  if (flat.node.slug === flat.group.slug) {
    selectGroup(flat.group)
  } else {
    selectItem(flat)
  }
}

const applyQueryParams = () => {
  const groupSlug = queryString(route.query.group)
  const serviceSlug = queryString(route.query.service)

  if (serviceSlug) {
    const found = findServiceNode(serviceSlug)
    if (found && !found.node.route) {
      selectItem(found, false)
      return
    }
  }

  if (groupSlug) {
    const found = findServiceGroup(groupSlug)
    if (found) {
      selectGroup(found, false)
      return
    }
  }

  // Default: prva grupa
  selectGroup(SERVICE_GROUPS[0]!, false)
}

applyQueryParams()

// Na direktan ulazak preko URL-a setup se izvršava pre mount-a (ref je null),
// pa se centriranje aktivnih pilula ponavlja kad DOM postoji
onMounted(scrollActiveIntoView)

watch(
  () => route.query,
  () => {
    if (route.path === '/services') {
      applyQueryParams()
    }
  },
)
</script>
