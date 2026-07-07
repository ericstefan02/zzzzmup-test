// Jedini izvor istine za strukturu УСЛУГЕ (excel klijenta, 2026-07).
// Iz ovog stabla se izvode: NAV_ITEMS, sidebar na /services, kvadrati na
// početnoj i indeks pretrage. Kad stigne API, mapiranje se menja samo ovde.

export interface ServiceNode {
  /** Stabilan kebab-case identifikator (budući API id / query param) */
  slug: string
  /** i18n ključ naziva (nav.*) */
  titleKey: string
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
    children: [
      { slug: 'opsta-medicina', titleKey: 'nav.generalMedicine' },
      { slug: 'ginekologija', titleKey: 'nav.gynecology' },
      { slug: 'interna-medicina', titleKey: 'nav.internalMedicine' },
      { slug: 'oftalmologija', titleKey: 'nav.ophthalmology' },
      { slug: 'otorinolaringologija', titleKey: 'nav.otorhinolaryngology' },
      { slug: 'fizikalna-medicina', titleKey: 'nav.physicalMedicine' },
      { slug: 'psihijatrija', titleKey: 'nav.psychiatry' },
      { slug: 'psiholoska-zastita', titleKey: 'nav.psychologicalSupport' },
      { slug: 'laboratorijska-dijagnostika', titleKey: 'nav.labDiagnostics' },
      {
        slug: 'radioloska-dijagnostika',
        titleKey: 'nav.radiology',
        children: [
          { slug: 'rendgen', titleKey: 'nav.xray' },
          { slug: 'ultrazvuk', titleKey: 'nav.ultrasound' },
          { slug: 'mamografija', titleKey: 'nav.mammography' },
        ],
      },
      {
        slug: 'centar-za-prevenciju',
        titleKey: 'nav.preventiveCenter',
        route: '/preventive-center',
      },
    ],
  },
  {
    slug: 'pregledi-za-skolovanje-i-obuku',
    titleKey: 'nav.schoolingExams',
    children: [
      { slug: 'ssup', titleKey: 'nav.ssup' },
      { slug: 'copo', titleKey: 'nav.copo' },
      { slug: 'kpu', titleKey: 'nav.kpu' },
      { slug: 'anb', titleKey: 'nav.anb' },
      { slug: 'vsj', titleKey: 'nav.vsj' },
    ],
  },
  {
    slug: 'pregledi-za-prijem-u-radni-odnos',
    titleKey: 'nav.employmentExams',
    children: [
      { slug: 'mup', titleKey: 'nav.mup' },
      { slug: 'bia', titleKey: 'nav.bia' },
      { slug: 'komunalna-milicija', titleKey: 'nav.communalMilitia' },
      { slug: 'komandir-pripravnik', titleKey: 'nav.wardenTrainee' },
      { slug: 'dril-zandarmerija', titleKey: 'nav.drillGendarmerie' },
      { slug: 'dril-saj', titleKey: 'nav.drillSaj' },
    ],
  },
  {
    slug: 'lekarska-uverenja',
    titleKey: 'nav.medicalCertificates',
    children: [
      { slug: 'za-zaposlenje', titleKey: 'nav.certEmployment' },
      {
        slug: 'za-vozace',
        titleKey: 'nav.certDrivers',
        children: [
          { slug: 'vozacki-ispit', titleKey: 'nav.certDriversExam' },
          { slug: 'produzenje-dozvole', titleKey: 'nav.certDriversRenewal' },
          { slug: 'profesionalni-vozac', titleKey: 'nav.certProDriver' },
        ],
      },
      { slug: 'za-oruzje', titleKey: 'nav.certWeapons' },
      {
        slug: 'fto',
        titleKey: 'nav.certFto',
        children: [
          { slug: 'fto-bez-oruzja', titleKey: 'nav.certFtoNoWeapon' },
          { slug: 'fto-sa-oruzjem', titleKey: 'nav.certFtoWeapon' },
        ],
      },
      { slug: 'rad-na-visini', titleKey: 'nav.certHeights' },
      { slug: 'motorni-camac', titleKey: 'nav.certBoat' },
      { slug: 'starateljstvo', titleKey: 'nav.certGuardianship' },
      { slug: 'lekarska-licenca', titleKey: 'nav.certLicense' },
    ],
  },
  {
    slug: 'ostali-pregledi-medicine-rada',
    titleKey: 'nav.otherOccupationalExams',
    children: [
      { slug: 'periodicni-pregledi', titleKey: 'nav.periodicExams' },
      { slug: 'ciljani-pregledi', titleKey: 'nav.targetedExams' },
      { slug: 'kontrolni-pregledi', titleKey: 'nav.controlExams' },
      { slug: 'sistematski-pregledi', titleKey: 'nav.systematicExams' },
    ],
  },
  { slug: 'pravna-sluzba', titleKey: 'nav.legalService' },
  { slug: 'tehnicka-sluzba', titleKey: 'nav.technicalService' },
]

/** Ruta za čvor: override ako postoji, inače query na /services */
export const serviceNodeRoute = (node: ServiceNode, isGroup = false): string =>
  node.route ??
  (isGroup ? `/services?group=${node.slug}` : `/services?service=${node.slug}`)

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
