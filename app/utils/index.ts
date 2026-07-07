import type { NavItem } from '~/types/common'

interface RouteLike {
  path: string
  query: Record<string, unknown>
}

/** Normalizacija query vrednosti (vue-router može vratiti niz) */
export const queryString = (val: unknown): string | undefined =>
  Array.isArray(val) ? (val[0] ?? undefined) : ((val as string) ?? undefined)

// Aktivnost linka: poklapanje path-a + svih query parametara iz targeta
export const isNavRouteActive = (targetRoute: string, route: RouteLike) => {
  const [path, query] = targetRoute.split('?')
  if (path !== route.path) return false
  if (!query) return !Object.keys(route.query).length
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
