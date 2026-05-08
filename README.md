# ZZZZMUP — Zavod za zdravstvenu zaštitu radnika MUP-a

Zvanični web sajt zdravstvene ustanove, izgrađen kao moderan, višejezičan i brz JAMstack sajt. Sajt pokriva sve ključne aspekte institucije — od usluga i rasporeda rada do vesti, preventivnog centra i karijere.

## O projektu

Sajt je razvijen kao **server-side rendered (SSR)** aplikacija koristeći **Nuxt 4** framework. Dizajniran je s naglaskom na pristupačnost, SEO i korisničko iskustvo, a podržava srpski jezik u oba pisma — ćirilici i latinici.

### Stranice

| Ruta | Opis |
|---|---|
| `/` | Početna stranica sa hero banerom i ključnim informacijama |
| `/about-us` | O nama — istorijat i brojčani pokazatelji ustanove |
| `/services` | Pregled svih usluga po odeljenjima |
| `/preventive-center` | Preventivni centar sa kalendarom aktivnosti |
| `/work-schedule` | Raspored rada i odvojena ambulanta |
| `/news` | Lista vesti sa paginacijom |
| `/news/[id]` | Detalj pojedinačne vesti |
| `/career` | Karijera — oglasi za posao |
| `/contact` | Kontakt forma i informacije |
| `/privacy-policy` | Politika privatnosti |
| `/terms-of-use` | Uslovi korišćenja |

## Tehnologije

- **[Nuxt 4](https://nuxt.com/)** — Vue meta-framework, SSR i file-based routing
- **[Vue 3](https://vuejs.org/)** — Composition API, reactivity
- **[Tailwind CSS v4](https://tailwindcss.com/)** — Utility-first CSS framework (Vite plugin)
- **[@nuxtjs/i18n](https://i18n.nuxtjs.org/)** — Internacionalizacija; srpski ćirilica (`sr-Cyrl`) i latinica (`sr-Latn`)
- **[@nuxt/image](https://image.nuxt.com/)** — Optimizacija i lazy-loading slika
- **[@nuxt/icon](https://github.com/nuxt/icon)** — SVG ikone putem Iconify (Ion set)
- **[@nuxt/fonts](https://fonts.nuxt.com/)** — Automatsko učitavanje fontova

## Struktura projekta

```
app/
├── assets/css/        # Globalni stilovi (Tailwind entry point)
├── components/        # Reusable Vue komponente grupisane po feature-u
│   ├── common/        # Generičke UI komponente (Button, FAQItem, forme...)
│   ├── layout/        # Navigation, Footer, InfoBar
│   ├── news/          # NewsCard, NewsMainBanner
│   ├── services/      # ServicesCard, ServicesList...
│   └── ...
├── layouts/           # Nuxt layout (default.vue)
├── pages/             # File-based rute
├── composables/       # Vue composables
├── types/             # TypeScript tipovi
└── utils/             # Konstante i helper funkcije
i18n/locales/          # Prevodi (sr-Cyrl.json, sr-Latn.json)
public/                # Statički fajlovi (slike, robots.txt)
```

---

## Podešavanje

Instalacija zavisnosti:

```bash
npm install
```

## Pokretanje razvojnog servera

Pokreće lokalni server na `http://localhost:3000`:

```bash
npm run dev
```

## Build za produkciju

```bash
npm run build
```

## Statički export (SSG)

```bash
npm run generate
```

## Preview produkcijskog build-a

```bash
npm run preview
```
