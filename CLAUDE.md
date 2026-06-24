# CLAUDE.md — ZZZZMUP

Zvanični sajt **Zavoda za zdravstvenu zaštitu radnika MUP-a** (državna zdravstvena ustanova). Zamenjuje postojeći [zzzzmup.rs](https://www.zzzzmup.rs/), uz reorganizaciju i bolju strukturu postojećeg sadržaja.

**Prioriteti:** SEO → moderan dizajn → jasan sadržaj → laka navigacija. Sve odluke vagati kroz te prioritete, tim redom.

---

## Stack

- **Nuxt 4** (Vue 3, Composition API, `<script setup lang="ts">`) — SSR, file-based routing
- **Tailwind CSS v4** preko Vite plugina (`@tailwindcss/vite`). Tema u [app/assets/css/main.css](app/assets/css/main.css), NE u `tailwind.config`.
- **@nuxtjs/i18n** — `sr-Cyrl` (default, ćirilica) + `sr-Latn` (latinica), strategija `no_prefix`
- **@nuxt/image** (`<NuxtImg>`, webp), **@nuxt/icon** (Iconify, `ion:` set), **@nuxt/fonts** (Inter)
- **@nuxtjs/sitemap**, **vee-validate** (forme)

## Deploy

- **Cloudflare Pages, SSR.** Nitro preset: `cloudflare-pages` / `cloudflare_module` (Workers runtime — NE Node). Izbegavati Node-only API u serverskom kodu.
- Build: `npm run build`. Lokalni razvoj: `npm run dev` (port 3000).

## Backend / podaci

- Postoji **REST API u NestJS + PostgreSQL** (zaseban projekat). Frontend ga gađa.
- Bazni URL preko `runtimeConfig.public` (`NUXT_PUBLIC_API_BASE` u `.env`), NIKAD hardkodovati.
- Dohvatanje: verovatno **TanStack Vue Query** za keš/mutacije; Nuxt `useFetch`/`useAsyncData` za SSR-hydratisane GET-ove. Bilo koji izbor mora raditi sa SSR-om (hydration bez mismatch-a).
- **Trenutno je SAV sadržaj hardkodovan** (vesti, usluge u [index.vue](app/pages/index.vue)). Treba ga zameniti pozivima ka API-ju. Ne dodavati novi hardkodovan sadržaj.

## E-forma (zakazivanje)

- [EFormModal.vue](app/components/common/EFormModal.vue) — svrha: korisnik popuni formular, generiše se popunjen dokument (PDF) koji **preuzima**. (`onSubmit` trenutno samo `console.log`.)
- Gde se PDF generiše JOŠ NIJE odlučeno — možda klijentski, možda na NestJS backendu. Ostaviti fleksibilno dok se ne potvrdi.

---

## Konvencije

### Tekst i i18n — obavezno
- **DOSLOVNOST KLIJENTA (kritično):** nazivi linkova, službi, organa i dokumenata moraju biti **TAČNO** kako ih klijent pošalje (ćirilica) — bez skraćivanja, parafraziranja ili „lepšeg" oblika. Latinica = transliteracija istog teksta. Kanonska lista je dole (sekcija „Kanonski nazivi"). Pre izmene bilo kog `nav.*` / naslova proveriti protiv te liste.
- **Nijedan vidljiv string ne sme biti hardkodovan u template.** Sve ide kroz `$t('...')` / `t('...')`.
- Svaki novi ključ dodati u **OBA** fajla: [i18n/locales/sr-Cyrl.json](i18n/locales/sr-Cyrl.json) i [sr-Latn.json](i18n/locales/sr-Latn.json). Ćirilica je primarna.
- Struktura ključeva: `nav.*`, `pages.<stranica>.*`, `components.<komponenta>.*`, `seo.<stranica>.*`, `validation.*`, `months.*`, `days.*`.
- Izuzeci u [index.vue](app/pages/index.vue) (`selectedServices`, `newsArticles` sa srpskim stringovima) su privremeni placeholderi — zamena dolazi sa API-ja.

### Komponente
- Grupisane po feature-u: `app/components/<feature>/` (services, news, career, documents, preventive-center, detached-clinics, about, layout, common). `common/form/` za form input-e.
- `pathPrefix: false` → komponente se koriste BEZ prefiksa imena foldera (`<ServicesCard>`, ne `<ServicesServicesCard>`).
- Props: `defineProps<{...}>()` sa destrukturiranjem i default vrednostima (vidi [Button.vue](app/components/common/Button.vue)).
- Deljeni UI ide u `common/`; ne duplirati. Dugme uvek [Button.vue](app/components/common/Button.vue) (varijante `filled|outlined|text`, veličine `small|medium|large`).

### Stil
- Samo Tailwind utility klase. Boje SAMO iz teme: `primary-50..950`, `accent` (crvena), `success`, `neutral-*`. Ne uvoditi proizvoljne hex vrednosti u template (osim već postojećih retkih izuzetaka tipa `#BFDBFE`).
- Responsive: mobile-first, breakpoint-ovi `md` `lg` + custom `nav` (1440px) za navigaciju.
- Padding sekcija konzistentan: `px-4 md:px-12 lg:px-28`, širine centriraju `max-w-480 mx-auto`.

### SEO — održavati na svakoj stranici
- Svaka stranica: `useSeoMeta({ title, description, keywords, ogTitle, ogDescription, ogSiteName })` sa `() => t(...)` (reaktivno na jezik).
- JSON-LD strukturirani podaci gde ima smisla (home ima `MedicalOrganization` — vidi [index.vue](app/pages/index.vue#L190)). Vesti treba `NewsArticle`/`Article` schema kad se povežu sa API-jem.
- `robots.txt` ([public/robots.txt](public/robots.txt)) blokira AI crawlere, dozvoljava Google. Ne menjati bez razloga.
- Pri produkciji: `og:image` mora apsolutni URL; `site.url` i og:image u [nuxt.config.ts](nuxt.config.ts) postaviti na pravi domen (postojeći TODO-ovi).

### Tipovi
- TS tipovi u [app/types/](app/types/) po domenu (news, services, jobs, schedule, detached-clinic, common). Koristiti ih, ne `any`.
- Konstante/data (radno vreme, nav, URL-ovi) u [app/utils/constants.ts](app/utils/constants.ts).

---

## Poznati gaps (otvoreni posao)
- [news/[id].vue](app/pages/news/[id].vue) — STUB, prikazuje samo `vest {id}`. Treba puna stranica vesti sa API-ja + SEO.
- Service kartice na home-u dupliran placeholder ("Kardiologija" 5x).
- News slike sa picsum.photos (placeholder).
- E-forma PDF generacija nije implementirana.
- API integracija (NestJS) još nije povezana nigde.

## Komande
```bash
npm run dev        # razvoj, localhost:3000
npm run build      # produkcijski build (Cloudflare/Nitro)
npm run generate   # statički export (ako zatreba)
npm run preview    # preview build-a
```

## Radni tok / workflow
- **Dizajn na kraju:** kad sadržaj i struktura legnu, OBAVEZNO proći kroz design skill-ove (design-taste-frontend, impeccable, redesign-existing-projects i sl.) za finalni polish. Eksplicitan dogovor sa korisnikom — ne preskakati.
- Backend (NestJS) se možda dodaje kao sibling folder u workspace radi referenciranja DTO/entity → TS interface-i. Tretirati read-only, ne menjati bez dozvole.

## Kanonski nazivi (klijent — DOSLOVNO, ćirilica)
Ovo je izvor istine za sve `nav.*` ključeve i naslove strana. Ne menjati bez klijenta.

**О НАМА:**
1. Историјат
2. Мисија Завода ЗЗЗР МУП-а
3. Визија Завода ЗЗЗР МУП-а
4. Управа и други органи управљања
   - 4.1 Управни одбор · 4.2 Надзорни одбор · 4.3 Директор Завода · 4.4 Помоћник директора Завода за медицинске послове · 4.5 Шеф Службе спец.-консулт. делатности · 4.6 Главна сестра Завода
5. Стручни органи Завода
   - 5.1 Стручни савет · 5.2 Стручни колегијум · 5.3 Етички одбор · 5.4 Комисија за унапређење квалитета здравствене заштите · 5.5 Комисија за заштиту од болничких инфекција
6. Документа
   - 6.1 Статут Завода · 6.2 Финансијски извештаји · 6.3 План рада · 6.4 Нормативна акта · 6.5 Јавне набавке

**УСЛУГЕ → Медицинске службе:**
Општа медицина · Центар за превенцију · Гинекологија · Интерна медицина · Офталмологија · Оториноларингологија · Физикална медицина и рехабилитација · Психијатрија · Психолошка заштита · Медицина рада · Радиолошка дијагностика · Рентген дијагностика · Ултразвучна дијагностика · Мамографија · Спортска медицина · Лабораторијска дијагностика · Апотекарска здравствена делатмост · Служба за правне и економско-финансијске послове · Служба за техничке и друге сличне послове

> NAPOMENA: u klijentovom izvoru piše „Апотекарска здравствена **делатмост**" (verovatno typo за „делатност") — postavljeno DOSLOVNO; ispraviti tek po potvrdi klijenta.

## Restrukturiranje (klijent) — STATUS

**Potvrđene odluke klijenta:**
- 19 službi (+ Групни прегледи) = **nove grupe usluga** (zamenjuju starih 6 odeljenja). Isti princip: klik grupu → konkretne usluge. UI selektor mora da podnese ~20 grupa (sidebar/dropdown, ne red dugmića).
- Ne-medicinske 3 službe (правна, техничка, апотека) → idu **под УСЛУГЕ** (po želji klijenta).
- Дијагностика = **4 zasebne službe** (Радиолошка, Рентген, Ултразвучна, Мамографија).
- Usluge ostaju **jedna strana** sa query param (`?department=N`) — bez zasebnih ruta po službi (SEO tradeoff prihvaćen za sad).
- Управа/Стручни органи → zasebne rute + **anchor po članu/organu** (ne sub-rute po osobi).
- Документа → novi tipovi: Статут · Фин. извештаји · План рада · Нормативна акта · Јавне набавке.
- Слике članova organa: **verovatno da** (kartica ima opciono `photo`).
- Центар за превенцију → **ostaje zasebna strana** `/preventive-center`, samo link u meniju.

**Urađeno:**
- ✅ Hero: uklonjen badge + naziv Zavoda (ostavljen `sr-only` h1 zbog SEO), tekst vertikalno centriran.
- ✅ about-us vraćen (`/about-us`, intro + историјат; bez documents sekcije).
- ✅ Nav restruktura ([constants.ts](app/utils/constants.ts) `NAV_ITEMS` + i18n) — О НАМА (3 nivoa) + УСЛУГЕ (20 grupa).
- ✅ Документа remap tipova ([documents.vue](app/pages/documents.vue) + i18n).
- ✅ `/about-us/uprava` + `/about-us/strucni-organi` (tipovi [about.ts](app/types/about.ts), komponente [PersonCard](app/components/about/PersonCard.vue)/[OrganSection](app/components/about/OrganSection.vue), anchori + placeholder). about-us.vue premešten u `about-us/index.vue`.
- ✅ about-us: Мисија (`#misija`) / Визија (`#vizija`) bogatije full-width sekcije.
- ✅ Организи: opisi = pravni tekst iz **Информатора о раду** ([o_nama.htm](https://www.zzzzmup.rs/o_nama/o_nama.htm)) preko i18n (`pages.uprava.*Desc`, `pages.strucniOrgani.*Desc`, `organ.*`). Ne brisati — pravni sadržaj. Imena članova placeholder (`organ.placeholderName`).
- ✅ Документа mobilni tabovi → horizontalni scroll; kartice organa centrirane.

- ✅ УСЛУГЕ: nav reorg 3-way (Мед. службе → 18 / Правна / Техничка), `NavItem.mega` flag + širok mega-meni u kolone ([Navigation.vue](app/components/layout/Navigation.vue) `megaMedical`/`megaOthers`). `/services` ([services.vue](app/pages/services.vue)) proširen na 18 grupa (Медицинске/Остале) + pretraga; dept rute `?department=1..18`, `?section=group`. Sadržaj usluga po grupi = dummy (ServicesList) → API. Desktop nav samo ≥1440px (`nav:` breakpoint).

- ✅ Dizajn polish (design-taste + impeccable + emil audit): em/en dash uklonjeni svuda; Мисија/Визија = kratak naslov + lead paragraf; TextBanner zadržava plavu + responsive breadcrumb (desktop pun trag / mobilni parent back-link) + `BreadcrumbList` JSON-LD, naslov h2→h1; services sidebar širi (340px) + jasni group headeri + side-stripe uklonjen (bg-tint); uprava pojedinci = horizontalna profil kartica; kontakt naslov forme; suptilan motion (active press, hero fade-up, card hover-lift, news zoom, focus-visible, `prefers-reduced-motion`).

**Preostalo:**
- ⬜ Review klijenta → push (commit „design polish" na `client-verdict-v1`).
- ⬜ (čeka materijale) news/[id] dinamička strana + `NewsArticle` schema; pravi sadržaj iz API-ja.

**Napomene:**
- **reka-ui** (Reka UI, Vue headless komponente) je dozvoljen ako zatreba komponenta (mega-meni, accordion, tabs). Proveriti API preko ctx7 pre upotrebe.
- Osnovni podaci iz Informatora: Матични **07078978** · ПИБ **100182356** · Шифра делатности **85142** (proveriti footer).
- „Informator o radu" je zakonska obaveza (Zakon o slоб. приступу инф. од јавног значаја) — delovi (овлашћења, организ. структура) treba da budu na sajtu; pun Informator kao strana — potvrditi sa klijentom.

**Čeka materijale klijenta:** hero kolaž slika; pravi tekst Мисија/Визија; PDF fajlovi dokumenata; foto članova organa.

**Playwright:** browseri nisu instalirani; koristi sistemski Chrome — `npx playwright screenshot --channel chrome ...`. Za hover/interakciju (dropdown) skript importuje modul iz npx keša (`~/.npm/_npx/.../node_modules/playwright`, CommonJS → `import pw from ...; const {chromium}=pw`).

## Jezik komunikacije
Korisnik piše na srpskom. Odgovaraj na srpskom. Kod, komentari u kodu i commit poruke mogu engleski/srpski po postojećem obrascu (mešano, komentari često srpski).
