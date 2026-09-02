import type { SluzbaPage } from '~/types/sluzba'
import { OPSTA_MEDICINA } from './opsta-medicina'
import { GINEKOLOGIJA } from './ginekologija'

// Registar statičkog sadržaja strana službi (šablon 8 sekcija).
// Služba čiji slug NIJE ovde zadržava stari prikaz na /services?service=<slug>
// dok klijent ne pošalje tekst. Kad stigne API, registar menja GET /sluzba/:slug.

const SLUZBA_CONTENT: Record<string, SluzbaPage> = {
  [OPSTA_MEDICINA.slug]: OPSTA_MEDICINA,
  [GINEKOLOGIJA.slug]: GINEKOLOGIJA,
}

export const hasSluzbaContent = (slug: string): boolean =>
  slug in SLUZBA_CONTENT

export const getSluzbaContent = (slug: string): SluzbaPage | undefined =>
  SLUZBA_CONTENT[slug]

export const allSluzbaSlugs = (): string[] => Object.keys(SLUZBA_CONTENT)
