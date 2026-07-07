<template>
  <!-- List: običan link -->
  <NuxtLink
    v-if="!item.children"
    :to="item.route!"
    active-class=""
    :class="[rowClass, padClass, { [activeClass]: isActive(item.route!) }]"
    @click="closeMenu()"
  >
    {{ $t(item.title) }}
  </NuxtLink>

  <!-- Grana: ceo red je toggle; ruta roditelja (ako postoji) ide kao prvi link unutra -->
  <div v-else>
    <button
      type="button"
      class="w-full flex items-center justify-between gap-2 text-left cursor-pointer"
      :class="[rowClass, padClass, { 'text-primary-500! font-bold!': isBranchActive }]"
      :aria-expanded="open"
      @click="open = !open"
    >
      {{ $t(item.title) }}
      <Icon
        name="ion:chevron-down"
        :size="depth === 0 ? '14' : '12'"
        class="transition-transform duration-200 shrink-0"
        :class="{ 'rotate-180': open }"
      />
    </button>

    <div
      class="grid transition-[grid-template-rows] duration-300 ease-out"
      :class="open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
    >
      <div class="overflow-hidden">
        <div :class="depth === 0 ? 'bg-neutral-50' : 'bg-neutral-100'">
          <NuxtLink
            v-if="showParentLink"
            :to="item.route!"
            active-class=""
            :class="[
              childRowClass,
              childPadClass,
              'font-medium',
              { [activeClass]: isActive(item.route!) },
            ]"
            @click="closeMenu()"
          >
            {{ $t(item.title) }}
          </NuxtLink>
          <MobileNavItem
            v-for="child in item.children"
            :key="child.title"
            :item="child"
            :depth="depth + 1"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NavItem } from '~/types/common'

const { item, depth = 0 } = defineProps<{
  item: NavItem
  depth?: number
}>()

const route = useRoute()
const open = ref(false)
const closeMenu = inject<() => void>('closeMobileMenu', () => {})

const isActive = (target: string) => isNavRouteActive(target, route)
// Grana = sopstvena ruta ili bilo koji potomak (deljeni helper sa desktop kaskadom)
const isBranchActive = computed(() => isNavItemActive(item, route))

const activeClass = 'text-primary-500! bg-primary-50! font-medium'

// Uvlačenje i stil reda po dubini (statične klase zbog Tailwind skeniranja)
const PAD = ['pl-6', 'pl-10', 'pl-14', 'pl-18'] as const
const padClass = computed(() => PAD[Math.min(depth, PAD.length - 1)])

const ROW = [
  'block pr-6 py-3.5 text-neutral-700 font-medium hover:bg-primary-50 hover:text-primary-500 transition-colors',
  'block pr-6 py-3 text-neutral-600 hover:text-primary-500 hover:bg-primary-50 transition-colors',
  'block pr-6 py-2.5 text-sm text-neutral-600 hover:text-primary-500 hover:bg-primary-50 transition-colors',
  'block pr-6 py-2.5 text-sm text-neutral-500 hover:text-primary-500 hover:bg-primary-50 transition-colors',
] as const
const rowClass = computed(() => ROW[Math.min(depth, ROW.length - 1)])

// Stil za link roditelja unutar otvorene grane (isti nivo kao deca)
const childPadClass = computed(() => PAD[Math.min(depth + 1, PAD.length - 1)])
const childRowClass = computed(() => ROW[Math.min(depth + 1, ROW.length - 1)])

// Roditeljski link se ne duplira ako neko dete već vodi na istu rutu
const showParentLink = computed(
  () =>
    !!item.route && !item.children?.some((child) => child.route === item.route),
)
</script>
