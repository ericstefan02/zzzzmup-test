import type { NavItem } from '~/types/common'

interface RouteLike {
  path: string
  query: Record<string, unknown>
  hash: string
}

/** Normalizacija query vrednosti (vue-router može vratiti niz) */
export const queryString = (val: unknown): string | undefined =>
  Array.isArray(val) ? (val[0] ?? undefined) : ((val as string) ?? undefined)

// Aktivnost linka: poklapanje path-a + hash-a + svih query parametara iz targeta.
// Hash mora biti jednak u oba smera: na /about-us#misija aktivan je samo
// «Мисија», ne i «Историјат» (/about-us bez hash-a), i obrnuto.
// Query iz targeta mora da se poklopi; target BEZ query-ja ignoriše route query
// (spoljni parametri tipa utm_* ne smeju da ugase highlight).
export const isNavRouteActive = (targetRoute: string, route: RouteLike) => {
  const [beforeHash, hash] = targetRoute.split('#')
  const [path, query] = beforeHash!.split('?')
  if (path !== route.path) return false
  if ((hash ? `#${hash}` : '') !== route.hash) return false
  if (!query) return true
  const params = new URLSearchParams(query)
  for (const [key, value] of params) {
    const routeVal = route.query[key]
    const normalized = Array.isArray(routeVal) ? routeVal[0] : routeVal
    if (normalized !== value) return false
  }
  return true
}

// Rekurzivno: da li je bilo koji potomak stavke aktivan (stablo je sada do 4 nivoa)
export const isNavBranchActive = (item: NavItem, route: RouteLike): boolean =>
  !!item.children?.some(
    (child) =>
      (child.route ? isNavRouteActive(child.route, route) : false) ||
      isNavBranchActive(child, route),
  )

// Stavka je aktivna ako je njena ruta aktivna ILI bilo koji potomak (trag kroz
// granu). Deli se između desktop kaskade (NavDropdownItem) i mobilnog menija.
export const isNavItemActive = (item: NavItem, route: RouteLike): boolean =>
  (item.route ? isNavRouteActive(item.route, route) : false) ||
  isNavBranchActive(item, route)

export const formatDateSerbian = (
  dateString: string,
  locale: string = 'sr-Latn',
) => {
  const date = new Date(dateString)
  const bcp47 = locale === 'sr-Cyrl' ? 'sr-Cyrl-RS' : 'sr-Latn-RS'
  return date.toLocaleDateString(bcp47, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
