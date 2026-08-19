import type { FAQItem } from '~/types/common'

// Oblik strane službe — UGOVOR sa bekendom (vidi plans/PLAN-SAJT.md).
// Isti oblik vraća budući GET /sluzba/:slug; sada se puni iz app/utils/sluzbe/.
// Opciono polje / prazan niz = sekcija se ne renderuje.

export interface SluzbaContact {
  phone: string
  email: string
  workingHoursWeekday: string
  workingHoursWeekend: string
}

/** Opcija zakazivanja — čisto nabrajanje (bez akcija); url samo kad je
 *  eksplicitno deo sadržaja (npr. portal Мој доктор) */
export interface SluzbaSchedulingOption {
  text: string
  url?: string
}

export interface SluzbaServiceItem {
  name: string
  description?: string
  price?: number
}

export interface SluzbaServiceCategory {
  name: string
  items: SluzbaServiceItem[]
}

export interface SluzbaTeamMember {
  fullName: string
  /** Zvanje: "Спец. др мед." / "др" */
  title: string
  /** Funkcija, npr. "Шеф Службе опште медицине и гинекологије" */
  role?: string
  photo?: string
  /** Detaširana ambulanta, npr. "амбуланта СИВ 2" */
  ambulanta?: string
}

export interface SluzbaPage {
  slug: string
  /** Pun naziv službe, ćirilicom (npr. "Служба опште медицине") */
  name: string
  /** О служби — uvodni tekst */
  about: string
  /** Начин заказивања — opcije */
  scheduling?: SluzbaSchedulingOption[]
  /** Контакт и радно време (obojeni okvir) */
  contact?: SluzbaContact
  /** Rečenica pre linka "овде" ka /work-schedule (sadrži naziv u genitivu) */
  scheduleNote?: string
  serviceCategories?: SluzbaServiceCategory[]
  team?: SluzbaTeamMember[]
  /** Корисне информације — еЗдравље blok (isti za sve službe) */
  showUsefulInfo?: boolean
  faq?: FAQItem[]
}
