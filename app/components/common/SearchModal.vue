<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 bg-black/50 z-80 flex items-start justify-center overflow-y-auto overscroll-contain py-8 md:py-20 px-4"
        @click.self="close"
      >
        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-if="isOpen"
            class="flex flex-col rounded-2xl shadow-md border border-neutral-200 bg-white w-full max-w-2xl overflow-hidden"
            role="dialog"
            aria-modal="true"
            :aria-label="$t('components.search.title')"
          >
            <!-- Input -->
            <div
              class="flex items-center gap-3 px-5 py-4 border-b border-neutral-200"
            >
              <Icon
                name="ion:search"
                size="20"
                class="text-neutral-400 shrink-0"
              />
              <input
                ref="inputRef"
                v-model="query"
                type="search"
                :placeholder="$t('components.search.placeholder')"
                class="w-full text-base text-neutral-800 placeholder:text-neutral-400 outline-none bg-transparent"
                @keydown.down.prevent="moveActive(1)"
                @keydown.up.prevent="moveActive(-1)"
                @keydown.enter.prevent="openActive"
              >
              <button
                type="button"
                class="flex items-center justify-center h-8 w-8 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer shrink-0"
                :aria-label="$t('components.search.close')"
                @click="close"
              >
                <Icon name="ion:close" size="18" class="text-neutral-500" />
              </button>
            </div>

            <!-- Rezultati -->
            <!-- dvh umesto vh: iOS address bar; overscroll/touch-pan-y: skrol prstom ostaje u listi -->
            <div
              ref="listRef"
              class="max-h-[60dvh] overflow-y-auto overscroll-contain touch-pan-y"
            >
              <template v-if="results.length">
                <div
                  v-for="group in groupedResults"
                  :key="group.type"
                  class="py-2"
                >
                  <p
                    class="px-5 pb-1 pt-2 text-xs font-bold uppercase tracking-wider text-primary-400"
                  >
                    {{ $t(`components.search.group.${group.type}`) }}
                  </p>
                  <button
                    v-for="{ result, idx } in group.items"
                    :key="result.route + result.title"
                    type="button"
                    class="w-full flex items-center justify-between gap-3 px-5 py-2.5 text-left cursor-pointer transition-colors"
                    :class="
                      idx === activeIndex
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-neutral-700 hover:bg-neutral-50 hover:text-primary-600'
                    "
                    :aria-selected="idx === activeIndex"
                    @mouseenter="activeIndex = idx"
                    @click="openResult(result)"
                  >
                    <span class="flex flex-col min-w-0">
                      <span class="text-sm leading-snug truncate">
                        {{ result.title }}
                      </span>
                      <span
                        v-if="result.context"
                        class="text-xs text-neutral-400 truncate"
                      >
                        {{ result.context }}
                      </span>
                    </span>
                    <Icon
                      name="ion:arrow-forward"
                      size="14"
                      class="shrink-0"
                      :class="
                        idx === activeIndex
                          ? 'text-primary-400'
                          : 'text-neutral-300'
                      "
                    />
                  </button>
                </div>
              </template>
              <p
                v-else-if="query.trim().length >= 2"
                class="px-5 py-8 text-sm text-neutral-400 text-center"
              >
                {{ $t('components.search.noResults') }}
              </p>
              <p v-else class="px-5 py-8 text-sm text-neutral-400 text-center">
                {{ $t('components.search.hint') }}
              </p>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import {
  SEARCH_GROUP_ORDER,
  type SearchResult,
  type SearchResultType,
} from '~/composables/useSiteSearch'

const router = useRouter()
const route = useRoute()
const { isOpen, close } = useSearchModal()

// Promena rute (i browser back/forward) zatvara modal — otvoren modal preko
// nove strane + zaključan body prave pogrešan scroll na povratku
watch(
  () => route.fullPath,
  () => {
    if (isOpen.value) close()
  },
)

const query = ref('')
const activeIndex = ref(0)
const inputRef = ref<HTMLInputElement | null>(null)
const listRef = ref<HTMLElement | null>(null)

const { results } = useSiteSearch(query)

// results je već u redosledu grupa — grupisanje nosi i flat indeks za keyboard
const groupedResults = computed<
  { type: SearchResultType; items: { result: SearchResult; idx: number }[] }[]
>(() => {
  const groups: {
    type: SearchResultType
    items: { result: SearchResult; idx: number }[]
  }[] = []
  results.value.forEach((result, idx) => {
    const last = groups[groups.length - 1]
    if (!last || last.type !== result.type) {
      groups.push({ type: result.type, items: [] })
    }
    groups[groups.length - 1]!.items.push({ result, idx })
  })
  return groups
})

const moveActive = (delta: number) => {
  if (!results.value.length) return
  activeIndex.value =
    (activeIndex.value + delta + results.value.length) % results.value.length
  // Aktivni red mora ostati vidljiv u skrolabilnoj listi
  nextTick(() => {
    listRef.value
      ?.querySelector('[aria-selected="true"]')
      ?.scrollIntoView({ block: 'nearest' })
  })
}

const openResult = (result: SearchResult) => {
  close()
  router.push(result.route)
}

const openActive = () => {
  const active = results.value[activeIndex.value]
  if (active) openResult(active)
}

watch(query, () => {
  activeIndex.value = 0
})

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isOpen.value) close()
}

useBodyScrollLock(isOpen)

watch(isOpen, (val) => {
  if (val) {
    query.value = ''
    activeIndex.value = 0
    nextTick(() => inputRef.value?.focus())
    document.addEventListener('keydown', onKeydown)
  } else {
    document.removeEventListener('keydown', onKeydown)
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
})
</script>
