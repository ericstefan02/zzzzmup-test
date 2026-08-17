// Jedini izvor istine za strukturu УСЛУГЕ (excel klijenta, 2026-07).
// Iz ovog stabla se izvode: NAV_ITEMS, sidebar na /services, kvadrati na
// početnoj i indeks pretrage. Kad stigne API, mapiranje se menja samo ovde.

import { hasSluzbaContent } from '~/utils/sluzbe'

/**
 * Tip sadržaja čvora — svojstvo čvora, ne dubine stabla:
 * - group: čist grupator, prikazuje decu (/services?group=)
 * - sluzba: bogata strana po šablonu 8 sekcija (/services/<slug> kad ima sadržaj)
 * - usluga: prosta lista stavki, sadašnji format (/services?service=)
 */
export type ServiceNodeKind = 'group' | 'sluzba' | 'usluga'

export interface ServiceNode {
  /** Stabilan kebab-case identifikator (budući API id / query param) */
  slug: string
  /** i18n ključ naziva (nav.*) */
  titleKey: string
  kind: ServiceNodeKind
  /** Override rute — stavka koja vodi na zasebnu stranu umesto na /services */
  route?: string
  children?: ServiceNode[]
}

export interface FlatServiceNode {
  node: ServiceNode
  /** L1 grupa kojoj stavka pripada */
  group: ServiceNode
  /** Neposredni roditelj ako je stavka L3 (inače null) */
  parent: ServiceNode | null
}

export const SERVICE_GROUPS: ServiceNode[] = [
  {
    slug: 'osnovne-zdravstvene-usluge',
    titleKey: 'nav.basicHealthServices',
    kind: 'group',
    children: [
      { slug: 'opsta-medicina', titleKey: 'nav.generalMedicine', kind: 'sluzba' },
      { slug: 'ginekologija', titleKey: 'nav.gynecology', kind: 'sluzba' },
      { slug: 'interna-medicina', titleKey: 'nav.internalMedicine', kind: 'sluzba' },
      { slug: 'oftalmologija', titleKey: 'nav.ophthalmology', kind: 'sluzba' },
      { slug: 'otorinolaringologija', titleKey: 'nav.otorhinolaryngology', kind: 'sluzba' },
      { slug: 'fizikalna-medicina', titleKey: 'nav.physicalMedicine', kind: 'sluzba' },
      { slug: 'psihijatrija', titleKey: 'nav.psychiatry', kind: 'sluzba' },
      { slug: 'psiholoska-zastita', titleKey: 'nav.psychologicalSupport', kind: 'sluzba' },
      { slug: 'laboratorijska-dijagnostika', titleKey: 'nav.labDiagnostics', kind: 'sluzba' },
      {
        // Za sad grupator; ako klijent pošalje šablon-tekst → kind: 'sluzba'
        slug: 'radioloska-dijagnostika',
        titleKey: 'nav.radiology',
        kind: 'group',
        children: [
          { slug: 'rendgen', titleKey: 'nav.xray', kind: 'usluga' },
          { slug: 'ultrazvuk', titleKey: 'nav.ultrasound', kind: 'usluga' },
          { slug: 'mamografija', titleKey: 'nav.mammography', kind: 'usluga' },
        ],
      },
      {
        slug: 'centar-za-prevenciju',
        titleKey: 'nav.preventiveCenter',
        kind: 'usluga',
        route: '/preventive-center',
      },
    ],
  },
  {
    slug: 'pregledi-za-skolovanje-i-obuku',
    titleKey: 'nav.schoolingExams',
    kind: 'group',
    children: [
      { slug: 'ssup', titleKey: 'nav.ssup', kind: 'usluga' },
      { slug: 'copo', titleKey: 'nav.copo', kind: 'usluga' },
      { slug: 'kpu', titleKey: 'nav.kpu', kind: 'usluga' },
      { slug: 'anb', titleKey: 'nav.anb', kind: 'usluga' },
      { slug: 'vsj', titleKey: 'nav.vsj', kind: 'usluga' },
    ],
  },
  {
    slug: 'pregledi-za-prijem-u-radni-odnos',
    titleKey: 'nav.employmentExams',
    kind: 'group',
    children: [
      { slug: 'mup', titleKey: 'nav.mup', kind: 'usluga' },
      { slug: 'bia', titleKey: 'nav.bia', kind: 'usluga' },
      { slug: 'komunalna-milicija', titleKey: 'nav.communalMilitia', kind: 'usluga' },
      { slug: 'komandir-pripravnik', titleKey: 'nav.wardenTrainee', kind: 'usluga' },
      { slug: 'dril-zandarmerija', titleKey: 'nav.drillGendarmerie', kind: 'usluga' },
      { slug: 'dril-saj', titleKey: 'nav.drillSaj', kind: 'usluga' },
    ],
  },
  {
    slug: 'lekarska-uverenja',
    titleKey: 'nav.medicalCertificates',
    kind: 'group',
    children: [
      { slug: 'za-zaposlenje', titleKey: 'nav.certEmployment', kind: 'usluga' },
      {
        slug: 'za-vozace',
        titleKey: 'nav.certDrivers',
        kind: 'group',
        children: [
          { slug: 'vozacki-ispit', titleKey: 'nav.certDriversExam', kind: 'usluga' },
          { slug: 'produzenje-dozvole', titleKey: 'nav.certDriversRenewal', kind: 'usluga' },
          { slug: 'profesionalni-vozac', titleKey: 'nav.certProDriver', kind: 'usluga' },
        ],
      },
      { slug: 'za-oruzje', titleKey: 'nav.certWeapons', kind: 'usluga' },
      {
        slug: 'fto',
        titleKey: 'nav.certFto',
        kind: 'group',
        children: [
          { slug: 'fto-bez-oruzja', titleKey: 'nav.certFtoNoWeapon', kind: 'usluga' },
          { slug: 'fto-sa-oruzjem', titleKey: 'nav.certFtoWeapon', kind: 'usluga' },
        ],
      },
      { slug: 'rad-na-visini', titleKey: 'nav.certHeights', kind: 'usluga' },
      { slug: 'motorni-camac', titleKey: 'nav.certBoat', kind: 'usluga' },
      { slug: 'starateljstvo', titleKey: 'nav.certGuardianship', kind: 'usluga' },
      { slug: 'lekarska-licenca', titleKey: 'nav.certLicense', kind: 'usluga' },
    ],
  },
  {
    slug: 'ostali-pregledi-medicine-rada',
    titleKey: 'nav.otherOccupationalExams',
    kind: 'group',
    children: [
      { slug: 'periodicni-pregledi', titleKey: 'nav.periodicExams', kind: 'usluga' },
      { slug: 'ciljani-pregledi', titleKey: 'nav.targetedExams', kind: 'usluga' },
      { slug: 'kontrolni-pregledi', titleKey: 'nav.controlExams', kind: 'usluga' },
      { slug: 'sistematski-pregledi', titleKey: 'nav.systematicExams', kind: 'usluga' },
    ],
  },
  { slug: 'pravna-sluzba', titleKey: 'nav.legalService', kind: 'sluzba' },
  { slug: 'tehnicka-sluzba', titleKey: 'nav.technicalService', kind: 'sluzba' },
]

/**
 * Ruta za čvor: override ako postoji; služba sa unetim sadržajem vodi na
 * zasebnu stranu /services/<slug>; sve ostalo (uklj. službe koje još čekaju
 * tekst klijenta) zadržava query prikaz na /services.
 */
export const serviceNodeRoute = (node: ServiceNode, isGroup = false): string => {
  if (node.route) return node.route
  if (node.kind === 'sluzba' && hasSluzbaContent(node.slug)) {
    return `/services/${node.slug}`
  }
  return isGroup ? `/services?group=${node.slug}` : `/services?service=${node.slug}`
}

// Stablo je statičko, pa se flat lista i lookup mape grade jednom (module scope);
// pozivi u computed-ima (pretraga po tasteru) tako ne prave nove nizove/objekte.
const FLAT_SERVICE_NODES: FlatServiceNode[] = SERVICE_GROUPS.flatMap((group) =>
  (group.children ?? []).flatMap((child) => [
    { node: child, group, parent: null },
    ...(child.children ?? []).map((grandchild) => ({
      node: grandchild,
      group,
      parent: child,
    })),
  ]),
)

const GROUP_BY_SLUG = new Map(SERVICE_GROUPS.map((g) => [g.slug, g]))
const NODE_BY_SLUG = new Map(FLAT_SERVICE_NODES.map((f) => [f.node.slug, f]))

/** Sve L2/L3 stavke (bez L1 grupa), sa referencom na grupu i L2 roditelja */
export const flattenServiceNodes = (): FlatServiceNode[] => FLAT_SERVICE_NODES

export const findServiceGroup = (slug: string): ServiceNode | undefined =>
  GROUP_BY_SLUG.get(slug)

export const findServiceNode = (slug: string): FlatServiceNode | undefined =>
  NODE_BY_SLUG.get(slug)
