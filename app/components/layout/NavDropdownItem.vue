<template>
  <!-- List bez dece: običan link -->
  <NuxtLink
    v-if="!item.children"
    :to="item.route!"
    active-class=""
    class="block px-4 py-2.5 text-neutral-600 hover:bg-primary-50 hover:text-primary-500 transition-colors"
    :class="{
      'text-primary-500! bg-primary-50! font-medium': isActive,
    }"
    @click="closeDropdown?.()"
  >
    {{ $t(item.title) }}
  </NuxtLink>

  <!-- Grana: red sa strelicom + flyout podmeni na hover (rekurzivno, 3+ nivoa) -->
  <div
    v-else
    ref="wrapperRef"
    class="relative"
    @mouseenter="openFlyout"
    @mouseleave="open = false"
    @focusin="openFlyout"
    @focusout="onFocusout"
  >
    <NuxtLink
      :to="item.route!"
      active-class=""
      class="flex items-center justify-between gap-2 px-4 py-2.5 text-neutral-600 hover:bg-primary-50 hover:text-primary-500 transition-colors"
      :class="{
        'text-primary-500! bg-primary-50! font-medium': isActive,
      }"
      @click="closeDropdown?.()"
    >
      {{ $t(item.title) }}
      <Icon
        name="ion:chevron-forward"
        size="14"
        class="shrink-0 text-neutral-400"
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
        v-if="open"
        class="absolute top-0 w-72 z-50"
        :class="flip ? 'right-full pr-1' : 'left-full pl-1'"
      >
        <div
          class="bg-white rounded-lg shadow-lg border border-neutral-200 py-1"
        >
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

<script setup lang="ts">
import type { NavItem } from '~/types/common'

const { item } = defineProps<{ item: NavItem }>()

const route = useRoute()
const open = ref(false)
const flip = ref(false)
const wrapperRef = ref<HTMLElement | null>(null)

// Navigation.vue zatvara ceo dropdown na klik bilo kog linka u kaskadi
const closeDropdown = inject<(() => void) | null>('closeDesktopDropdown', null)

// Aktivna i preko potomka (trag kroz granu); guard za stavku bez rute
const isActive = computed(() => isNavItemActive(item, route))

// Flyout se otvara desno; ako ne staje u viewport, preklapa se na levu stranu.
// clientWidth (ne innerWidth) — innerWidth uključuje scrollbar pa flip kasni.
const FLYOUT_WIDTH = 292 // w-72 (288px) + pl-1 (4px) — uskladiti sa template klasama
const openFlyout = () => {
  const rect = wrapperRef.value?.getBoundingClientRect()
  flip.value =
    !!rect && rect.right + FLYOUT_WIDTH > document.documentElement.clientWidth
  open.value = true
}

// Tastatura: kad fokus napusti granu (Tab dalje), flyout se zatvara —
// inače više flyout-ova ostane otvoreno jedan preko drugog
const onFocusout = (event: FocusEvent) => {
  if (!wrapperRef.value?.contains(event.relatedTarget as Node | null)) {
    open.value = false
  }
}
</script>
