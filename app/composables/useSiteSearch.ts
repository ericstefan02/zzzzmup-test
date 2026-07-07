import type { Ref } from 'vue'
import {
  SERVICE_GROUPS,
  flattenServiceNodes,
  serviceNodeRoute,
} from '~/utils/services-structure'
import {
  NEWS_ARTICLES,
  JOB_OFFERINGS,
  DOCUMENTS_BY_TYPE,
  WORK_SCHEDULE_GENERAL,
  WORK_SCHEDULE_CARDIOLOGY,
  DETACHED_CLINICS_SCHEDULE,
  type DocumentType,
} from '~/utils/dummy-data'
import { normalizeSearch } from '~/utils/transliterate'

export type SearchResultType =
  | 'service'
  | 'page'
  | 'news'
  | 'job'
  | 'document'
  | 'doctor'

export interface SearchResult {
  type: SearchResultType
  title: string
  route: string
  /** Dodatni kontekst (npr. roditeljska grupa usluge) */
  context?: string
}

interface IndexedResult extends SearchResult {
  /** Unapred normalizovan naslov — poređenje po tasteru bez transliteracije */
  normalized: string
}

// Statične stranice sajta koje pretraga treba da pogodi
const STATIC_PAGES: { titleKey: string; route: string }[] = [
  { titleKey: 'nav.home', route: '/' },
  { titleKey: 'nav.aboutUs', route: '/about-us' },
  { titleKey: 'nav.history', route: '/about-us' },
  { titleKey: 'nav.management', route: '/about-us/uprava' },
  { titleKey: 'nav.professionalBodies', route: '/about-us/strucni-organi' },
  { titleKey: 'nav.documents', route: '/documents' },
  { titleKey: 'nav.services', route: '/services' },
  { titleKey: 'nav.preventiveCenter', route: '/preventive-center' },
  { titleKey: 'nav.workSchedule', route: '/work-schedule' },
  { titleKey: 'nav.news', route: '/news' },
  { titleKey: 'nav.career', route: '/career' },
  { titleKey: 'nav.contact', route: '/contact' },
]

const MIN_QUERY_LENGTH = 2
const MAX_PER_GROUP = 8

// Redosled grupa u prikazu rezultata
export const SEARCH_GROUP_ORDER: SearchResultType[] = [
  'service',
  'page',
  'news',
  'job',
  'document',
  'doctor',
]

export const useSiteSearch = (query: Ref<string>) => {
  const { t, locale } = useI18n()

  // Indeks se gradi iz i18n naslova + dummy podataka.
  // TODO: kad sadržaj pređe na API, ovde dodati serverski /search poziv.
  const index = computed<IndexedResult[]>(() => {
    // locale u zavisnosti — naslovi iz i18n se menjaju sa pismom
    void locale.value

    const entries: SearchResult[] = []

    // Usluge: L1 grupe + sve L2/L3 stavke
    for (const group of SERVICE_GROUPS) {
      entries.push({
        type: 'service',
        title: t(group.titleKey),
        route: serviceNodeRoute(group, true),
      })
    }
    for (const flat of flattenServiceNodes()) {
      entries.push({
        type: 'service',
        title: t(flat.node.titleKey),
        route: serviceNodeRoute(flat.node),
        context: [t(flat.group.titleKey), flat.parent && t(flat.parent.titleKey)]
          .filter(Boolean)
          .join(' / '),
      })
    }

    // Statične stranice
    for (const page of STATIC_PAGES) {
      entries.push({ type: 'page', title: t(page.titleKey), route: page.route })
    }

    // Vesti (naslovi)
    for (const article of NEWS_ARTICLES) {
      entries.push({
        type: 'news',
        title: article.title,
        route: `/news/${article.id}`,
      })
    }

    // Oglasi za posao
    for (const job of JOB_OFFERINGS) {
      entries.push({ type: 'job', title: job.title, route: '/career' })
    }

    // Dokumenta (flat liste + grupisane po godini)
    for (const [docType, data] of Object.entries(DOCUMENTS_BY_TYPE)) {
      const docs = Array.isArray(data) ? data : Object.values(data).flat()
      for (const doc of docs) {
        entries.push({
          type: 'document',
          title: doc.title,
          route: `/documents?type=${docType as DocumentType}`,
        })
      }
    }

    // Doktori (jedinstvena imena; rezultat vodi na raspored odeljenja u kom rade)
    const generalDoctors = new Set(WORK_SCHEDULE_GENERAL.map((i) => i.doctor))
    const doctors = new Map<string, string>()
    for (const item of [
      ...WORK_SCHEDULE_GENERAL,
      ...WORK_SCHEDULE_CARDIOLOGY,
      ...DETACHED_CLINICS_SCHEDULE,
    ]) {
      if (doctors.has(item.doctor)) continue
      // Doktor samo iz kardiologije → otvoriti taj raspored, inače default (opšte)
      doctors.set(
        item.doctor,
        generalDoctors.has(item.doctor)
          ? '/work-schedule'
          : '/work-schedule?department=cardiology',
      )
    }
    for (const [doctor, docRoute] of doctors) {
      entries.push({ type: 'doctor', title: doctor, route: docRoute })
    }

    // Indeks je već u SEARCH_GROUP_ORDER redosledu; normalizacija se radi jednom
    return entries.map((entry) => ({
      ...entry,
      normalized: normalizeSearch(entry.title),
    }))
  })

  const results = computed<SearchResult[]>(() => {
    const q = normalizeSearch(query.value.trim())
    if (q.length < MIN_QUERY_LENGTH) return []

    // Jedan prolaz: indeks je grupisan po tipu u SEARCH_GROUP_ORDER redosledu
    const perGroup = new Map<SearchResultType, number>()
    const matched: SearchResult[] = []
    for (const entry of index.value) {
      if (!entry.normalized.includes(q)) continue
      const count = perGroup.get(entry.type) ?? 0
      if (count >= MAX_PER_GROUP) continue
      perGroup.set(entry.type, count + 1)
      matched.push(entry)
    }
    return matched
  })

  return { results }
}
