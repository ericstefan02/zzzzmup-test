// Deljeni body scroll lock za modale/meni (SearchModal, EFormModal, MobileMenu).
// Touch uređaji (iOS WebKit — svi iOS browseri): `overflow: hidden` na body NE
// sprečava skrol, pa se koristi position: fixed + čuvanje scroll pozicije.
// Desktop (fine pointer): ostaje overflow: hidden — fixed tehnika bi odlepila
// sticky header (vizuelno nestane iza overlay-a) i mešala se sa router scroll
// restauracijom, a overflow tamo pouzdano radi.
// Brojač dozvoljava preklapajuće lock-ove (meni → modal) bez ranog otključavanja.

let lockCount = 0
let savedScrollY = 0
let usedFixedLock = false

const applyLock = () => {
  const { style } = document.body
  usedFixedLock = window.matchMedia('(pointer: coarse)').matches
  if (usedFixedLock) {
    savedScrollY = window.scrollY
    style.position = 'fixed'
    style.top = `-${savedScrollY}px`
    style.left = '0'
    style.right = '0'
    style.width = '100%'
  }
  style.overflow = 'hidden'
}

const releaseLock = () => {
  const { style } = document.body
  style.overflow = ''
  if (usedFixedLock) {
    style.position = ''
    style.top = ''
    style.left = ''
    style.right = ''
    style.width = ''
    window.scrollTo(0, savedScrollY)
  }
}

export const useBodyScrollLock = (isOpen: Ref<boolean>) => {
  // Lokalni flag — komponenta ne sme da dekrementuje tuđi lock
  let locked = false

  const lock = () => {
    if (locked || import.meta.server) return
    locked = true
    if (++lockCount === 1) applyLock()
  }

  const unlock = () => {
    if (!locked) return
    locked = false
    if (--lockCount === 0) releaseLock()
  }

  // immediate: modal može biti otvoren (globalni state) dok se komponenta
  // remount-uje (promena layout-a) — lock mora da se uspostavi i tada
  watch(isOpen, (val) => (val ? lock() : unlock()), { immediate: true })
  onUnmounted(unlock)
}
