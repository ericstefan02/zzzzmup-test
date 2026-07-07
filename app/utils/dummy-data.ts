// Privremeni hardkodovani sadržaj (vesti, oglasi, dokumenta, rasporedi).
// Izdvojen na jedno mesto da bi ga i stranice i pretraga sajta delile.
// TODO: sve zameniti pozivima ka NestJS API-ju — brisanjem ovog fajla
// treba da otpadne sav dummy sadržaj.

import type { NewsArticle } from '~/types/news'
import type { JobOffering } from '~/types/jobs'
import type { DocumentItem } from '~/types/common'
import type { DetachmentClinicScheduleItem } from '~/types/schedule'

// ── Vesti ────────────────────────────────────────────────────────────────
// Prva vest = glavna na /news; početna strana prikazuje prve 3.
export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 1,
    title: 'Zavod za javno zdravlje objavio nove preporuke za sezonu gripa',
    content:
      '<p>Zavod za javno zdravlje je danas objavio nove preporuke za sezonu gripa, uključujući savete o vakcinaciji i prevenciji. Stručnjaci ističu važnost redovnog pranja ruku, nošenja maski u zatvorenim prostorima i izbegavanja bliskog kontakta sa obolelima. Takođe, preporučuje se vakcinacija protiv gripa, posebno za rizične grupe poput starijih osoba, trudnica i hroničnih bolesnika.</p>',
    image:
      'https://fastly.picsum.photos/id/77/1631/1102.jpg?hmac=sg0ArFCRjP1wlUg8vszg5RFfGiXZJkWEtqLLCRraeBw',
    created_at: '2024-09-15T08:00:00Z',
  },
  {
    id: 2,
    title:
      'Zavod organizuje besplatne zdravstvene radionice za zaposlene u javnom sektoru',
    content:
      '<p>Zavod za javno zdravlje organizuje novu seriju besplatnih i visoko-interaktivnih zdravstvenih radionica. Teme koje će biti obrađene pažljivo su odabrane u saradnji sa komandirima jedinica i zasnivaju se na potrebama direktno sa terena.</p><p>Prve tri radionice biće fokusirane na:</p><ul><li>Prevencija <strong>Burnout sindroma</strong> (sindroma sagorevanja na poslu).</li><li>Pravilna ishrana i balans tokom noćnih dežurstava.</li><li>Održavanje fizičke kondicije uz minimalno dostupnih rekvizita.</li></ul><p>Svi učesnici će na kraju ciklusa dobiti zvanični sertifikat o učestvovanju, dok su predavači naši eminentni stručnjaci iz psihijatrije i sportske medicine.</p>',
    image:
      'https://fastly.picsum.photos/id/42/3456/2304.jpg?hmac=dhQvd1Qp19zg26MEwYMnfz34eLnGv8meGk_lFNAJR3g',
    created_at: '2024-09-10T10:00:00Z',
  },
  {
    id: 3,
    title: 'Zavod za javno zdravlje upozorava na porast alergija tokom proleća',
    content:
      '<p>Zavod za javno zdravlje je izdao upozorenje o porastu alergija tokom proleća, posebno kod osoba koje su ranije imale problema sa alergijama. Stručnjaci savetuju da se prati lokalna polenska prognoza, izbegavaju boravak na otvorenom tokom vrhunca polenacije i koriste odgovarajuće lekove ako se pojave simptomi alergije.</p>',
    image:
      'https://fastly.picsum.photos/id/42/3456/2304.jpg?hmac=dhQvd1Qp19zg26MEwYMnfz34eLnGv8meGk_lFNAJR3g',
    created_at: '2024-09-12T10:00:00Z',
  },
  {
    id: 4,
    title:
      'Zavod za javno zdravlje pokreće kampanju za podizanje svesti o mentalnom zdravlju',
    content:
      '<p>Zavod za javno zdravlje pokreće novu kampanju usmerenu na podizanje svesti o mentalnom zdravlju, sa posebnim fokusom na stres i anksioznost. Kampanja će uključivati edukativne radionice, online resurse i podršku za one koji se suočavaju sa mentalnim izazovima, posebno u kontekstu savremenog načina života.</p>',
    image:
      'https://fastly.picsum.photos/id/42/3456/2304.jpg?hmac=dhQvd1Qp19zg26MEwYMnfz34eLnGv8meGk_lFNAJR3g',
    created_at: '2024-09-14T10:00:00Z',
  },
  {
    id: 5,
    title: 'Zavod uspešno završio projekat digitalizacije',
    content:
      '<p>Zavod za zdravstvenu zaštitu radnika Ministarstva unutrašnjih poslova uspešno je završio revolucionarni projekat digitalizacije svih medicinskih kartona i procesa. Ovaj projekat omogućava našim lekarima i pacijentima značajno brži pristup informacijama.</p><p>Glavne prednosti implementiranog sistema obuhvataju:</p><ul><li><strong>Brzina:</strong> Trenutni pristup celokupnoj istoriji bolesti pacijenta.</li><li><strong>Bezbednost podataka:</strong> Implementirani su najviši standardi enkripcije, u skladu sa procedurama MUP-a.</li><li><strong>Uvezanost:</strong> Bolja komunikacija između specijalističkih službi.</li></ul><p>Ovaj korak nas svrstava među najmodernije zdravstvene ustanove specifične namene u čitavom regionu.</p>',
    image:
      'https://fastly.picsum.photos/id/11/2500/1667.jpg?hmac=xxjFJtAPgshYkysU_aqx2sZir-kIOjNR9vx0te7GycQ',
    created_at: '2024-05-15T10:00:00Z',
  },
  {
    id: 6,
    title:
      'Implementacija novog i sveobuhvatnog programa primarne prevencije bolesti srca i krvnih sudova kroz detaljnu analizu zdravstvenog profila pripadnika službi',
    content:
      '<p>Na osnovu statističkih podataka i analiza zdravstvenog stanja iz prethodnih godina, Zavod je pokrenuo potpuno novi <em>program prevencije oboljenja srca i krvnih sudova</em> namenjen svim aktivnim pripadnicima MUP-a.</p><p>Program obuhvata nekoliko ključnih faza:</p><ol><li>Detaljna kardiološka dijagnostika (EKG, ultrazvuk srca, Holter pritiska).</li><li>Ergometrija (test opterećenja) za procenu radne sposobnosti.</li><li>Konsultacije sa kliničkim nutricionistom radi izrade posebog plana ishrane.</li></ol><p>Prijave za prvi ciklus pregleda su otvorene i možete ih zakazati elektronskim putem preko portala.</p>',
    image:
      'https://fastly.picsum.photos/id/19/2500/1667.jpg?hmac=7epGozH4QjToGaBf_xb2HbFTXoV5o8n_cYzB7I4lt6g',
    created_at: '2024-09-01T12:00:00Z',
  },
]

// ── Oglasi za posao ──────────────────────────────────────────────────────
export const JOB_OFFERINGS: JobOffering[] = [
  {
    id: 1,
    title: 'Medicinski tehničar',
    description:
      'Ova pozicija je namenjena medicinskim tehničarima sa iskustvom u radu sa pacijentima. Opis posla uključuje pružanje podrške lekarima, obavljanje medicinskih procedura i brigu o pacijentima.',
    expirationDate: '2024-12-31',
  },
  {
    id: 2,
    title: 'Farmaceut',
    description: 'Opis posla za farmaceuta.',
    expirationDate: '2027-11-30',
  },
  {
    id: 3,
    title: 'Administrativni radnik',
    description: 'Opis posla za administrativnog radnika.',
    expirationDate: '2024-10-31',
  },
]

// ── Dokumenta ────────────────────────────────────────────────────────────
export type DocumentType =
  | 'statute'
  | 'financial'
  | 'work-plan'
  | 'normative'
  | 'procurement'

export type DocumentsData = DocumentItem[] | Record<number, DocumentItem[]>

export const DOCUMENTS_BY_TYPE: Record<DocumentType, DocumentsData> = {
  statute: [
    {
      title: 'Statut Zavoda za zdravstvenu zaštitu radnika MUP-a',
      url: '#',
      created_at: '2023-01-20',
    },
  ],
  financial: {
    2024: [
      {
        title: 'Finansijski izveštaj za 2023. godinu',
        url: '#',
        created_at: '2024-03-15',
      },
      {
        title: 'Finansijski izveštaj za 2022. godinu',
        url: '#',
        created_at: '2024-03-15',
      },
    ],
    2023: [
      {
        title: 'Finansijski izveštaj za 2022. godinu',
        url: '#',
        created_at: '2023-04-10',
      },
      {
        title: 'Finansijski izveštaj za 2021. godinu',
        url: '#',
        created_at: '2023-04-10',
      },
    ],
  },
  'work-plan': [
    {
      title: 'Plan rada za 2025. godinu',
      url: '#',
      created_at: '2024-12-15',
    },
    {
      title: 'Plan rada za 2024. godinu',
      url: '#',
      created_at: '2023-12-20',
    },
  ],
  normative: [
    {
      title: 'Pravilnik o organizaciji i sistematizaciji radnih mesta',
      url: '#',
      created_at: '2023-06-01',
    },
    {
      title: 'Poslovnik o radu Upravnog odbora',
      url: '#',
      created_at: '2023-02-10',
    },
  ],
  procurement: {},
}

// ── Raspored rada (doktori) ──────────────────────────────────────────────
export interface WorkScheduleItem {
  day: string
  doctor: string
  shift?: 1 | 2
  room?: string
}

export const WORK_SCHEDULE_GENERAL: WorkScheduleItem[] = [
  // Ponedeljak - Više doktora u prvoj smeni
  { day: 'Ponedeljak', shift: 1, doctor: 'Dr. Marković', room: 'Soba 101' },
  { day: 'Ponedeljak', shift: 1, doctor: 'Dr. Lukić', room: 'Soba 106' },
  { day: 'Ponedeljak', shift: 1, doctor: 'Dr. Marić', room: 'Soba 110' },
  { day: 'Ponedeljak', shift: 2, doctor: 'Dr. Marković', room: 'Soba 101' },

  // Utorak - Jednom fali soba
  { day: 'Utorak', shift: 1, doctor: 'Dr. Petrović' },
  { day: 'Utorak', shift: 1, doctor: 'Dr. Simić', room: 'Soba 102' },
  { day: 'Utorak', shift: 2, doctor: 'Dr. Stanić', room: 'Soba 205' },

  // Sreda - Više doktora u drugoj smeni, jednom fali smena
  { day: 'Sreda', doctor: 'Dr. Jovanović', room: 'Soba 103' },
  { day: 'Sreda', shift: 2, doctor: 'Dr. Pavlović', room: 'Soba 108' },
  { day: 'Sreda', shift: 2, doctor: 'Dr. Ilić', room: 'Soba 109' },

  // Četvrtak
  { day: 'Četvrtak', shift: 2, doctor: 'Dr. Nikolić', room: 'Soba 104' },
  { day: 'Četvrtak', shift: 1, doctor: 'Dr. Arsić', room: 'Soba 112' },

  // Petak - Kombinovano
  { day: 'Petak', shift: 1, doctor: 'Dr. Ilić', room: 'Soba 105' },
  { day: 'Petak', doctor: 'Dr. Kostić' },

  // Subota - Vikend dežurstva i skraćene smene
  { day: 'Subota', shift: 1, doctor: 'Dr. Lukić', room: 'Soba 106' },
  { day: 'Subota', shift: 1, doctor: 'Dr. Marić', room: 'Soba 110' },
  { day: 'Subota', shift: 2, doctor: 'Dr. Petrović', room: 'Soba 102' },
  { day: 'Subota', shift: 2, doctor: 'Dr. Arsić' }, // Fali soba

  // Nedelja - Minimalna postava / Dežurni lekari
  { day: 'Nedelja', doctor: 'Dr. Simić', room: 'Dežurna Služba' }, // Fali smena (ceo dan dežuran)
  { day: 'Nedelja', shift: 1, doctor: 'Dr. Nikolić', room: 'Soba 104' },
]

export const WORK_SCHEDULE_CARDIOLOGY: WorkScheduleItem[] = [
  // Ponedeljak - Jutarnja gužva na kardiologiji
  {
    day: 'Ponedeljak',
    shift: 1,
    doctor: 'Dr. Popović (Kardiolog)',
    room: 'Kardio 1',
  },
  {
    day: 'Ponedeljak',
    shift: 1,
    doctor: 'Dr. Pejić (Hirurg)',
    room: 'Operaciona Sala A',
  },
  {
    day: 'Ponedeljak',
    shift: 2,
    doctor: 'Dr. Popović (Kardiolog)',
    room: 'Kardio 1',
  },

  // Utorak
  { day: 'Utorak', shift: 1, doctor: 'Dr. Tanasković', room: 'Ultrazvuk Kabinet' },
  { day: 'Utorak', shift: 1, doctor: 'Dr. Mikić' }, // Nema sobe

  // Sreda
  { day: 'Sreda', shift: 2, doctor: 'Dr. Vasović', room: 'Kardio 2' },
  { day: 'Sreda', shift: 2, doctor: 'Dr. Đurić', room: 'Kardio 3' },
  { day: 'Sreda', doctor: 'Dr. Terzić', room: 'Dežurna Služba' }, // Nema smene

  // Četvrtak
  { day: 'Četvrtak', shift: 1, doctor: 'Dr. Filipović', room: 'Kardio 1' },
  { day: 'Četvrtak', shift: 2, doctor: 'Dr. Filipović' },

  // Petak
  { day: 'Petak', shift: 1, doctor: 'Dr. Živković', room: 'Kardio 4' },
  { day: 'Petak', shift: 1, doctor: 'Dr. Jović', room: 'Kardio 5' },
  { day: 'Petak', shift: 2, doctor: 'Dr. Jović', room: 'Kardio 5' },

  // Subota - Hitne intervencije i pregledi
  {
    day: 'Subota',
    shift: 1,
    doctor: 'Dr. Popović (Kardiolog)',
    room: 'Kardio 1',
  },
  { day: 'Subota', shift: 1, doctor: 'Dr. Tanasković', room: 'Kardio 2' },
  { day: 'Subota', doctor: 'Dr. Pejić (Hirurg)', room: 'Operaciona Sala A' }, // Fali smena (pripravnost)

  // Nedelja - Dežurstva
  { day: 'Nedelja', shift: 2, doctor: 'Dr. Đurić', room: 'Kardio 3' },
  { day: 'Nedelja', shift: 1, doctor: 'Dr. Filipović', room: 'Kardio 1' },
  { day: 'Nedelja', doctor: 'Dr. Vasović' }, // Samo doktor (nema sobe ni smene - on-call)
]

export const DETACHED_CLINICS_SCHEDULE: DetachmentClinicScheduleItem[] = [
  {
    doctor: 'Dr. Jovanović',
    clinic: {
      name: 'Dom Zdravlja Novi Sad',
      address: 'Bulevar Oslobođenja 123, Novi Sad',
      phoneNumber: '+381 21 1234567',
    },
  },
  {
    doctor: 'Dr. Stanić',
    clinic: {
      name: 'Poliklinika Zdravlje',
      address: 'Kralja Petra 45, Novi Sad',
      phoneNumber: '+381 21 7654321',
    },
  },
  {
    doctor: 'Dr. Vasović',
    clinic: {
      name: 'Dom Zdravlja Petrovaradin',
      address: 'Petrovaradinska 10, Novi Sad',
      phoneNumber: '+381 21 2468101',
    },
  },
  {
    doctor: 'Dr. Đurić',
    clinic: {
      name: 'Poliklinika Zdravlje',
      address: 'Kralja Petra 45, Novi Sad',
      phoneNumber: '+381 21 7654321',
    },
  },
]
