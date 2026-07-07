<template>
  <div class="nav:hidden">
    <button
      type="button"
      class="flex items-center justify-center h-10 w-10 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
      :aria-expanded="isOpen"
      aria-label="Menu"
      @click="isOpen = !isOpen"
    >
      <Icon v-if="!isOpen" name="ion:menu" size="24" class="text-primary-900" />
      <Icon v-else name="ion:close" size="24" class="text-primary-900" />
    </button>

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
          class="fixed inset-0 bg-black/50 z-60 nav:hidden"
          @click="isOpen = false"
        />
      </Transition>

      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="translate-x-0"
        leave-to-class="translate-x-full"
      >
        <nav
          v-if="isOpen"
          class="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white z-70 flex flex-col shadow-2xl nav:hidden overflow-y-auto"
        >
          <div
            class="flex items-center justify-between px-6 py-4 border-b border-neutral-200"
          >
            <span class="font-bold text-lg text-primary-600">
              {{ $t('layout.nav.instituteName') }}
            </span>
            <button
              type="button"
              class="flex items-center justify-center h-10 w-10 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
              aria-label="Close menu"
              @click="isOpen = false"
            >
              <Icon name="ion:close" size="24" class="text-primary-900" />
            </button>
          </div>

          <div class="flex flex-col py-2">
            <MobileNavItem
              v-for="item in NAV_ITEMS"
              :key="item.title"
              :item="item"
            />
          </div>

          <div class="mt-auto px-6 py-6 border-t border-neutral-200">
            <Button
              :text="$t('layout.nav.eFormButton')"
              prepend-icon="ion:document"
              class="w-full"
              @click="handleButtonClicked"
            />
          </div>
        </nav>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const isOpen = ref(false)
const { open: openEFormModal } = useEFormModal()

// Rekurzivne stavke (MobileNavItem) zatvaraju ceo meni preko inject-a
provide('closeMobileMenu', () => {
  isOpen.value = false
})

const handleButtonClicked = () => {
  isOpen.value = false
  nextTick(() => {
    openEFormModal()
  })
}

watch(
  () => route.fullPath,
  () => {
    isOpen.value = false
  },
)

watch(isOpen, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>
