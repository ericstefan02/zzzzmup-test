const isEFormModalOpen = ref(false)

export const useEFormModal = () => {
  const open = () => {
    isEFormModalOpen.value = true
  }

  const close = () => {
    isEFormModalOpen.value = false
  }

  return {
    isOpen: isEFormModalOpen,
    open,
    close,
  }
}
