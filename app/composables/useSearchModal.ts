const isSearchModalOpen = ref(false)

export const useSearchModal = () => {
  const open = () => {
    isSearchModalOpen.value = true
  }

  const close = () => {
    isSearchModalOpen.value = false
  }

  return {
    isOpen: isSearchModalOpen,
    open,
    close,
  }
}
