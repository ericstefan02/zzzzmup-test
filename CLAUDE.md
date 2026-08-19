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
- Responsive: mobile-first, breakpoint-ovi `md` `lg` + custom `nav` (1440px, prag desktop menija) i `navwide` (1660px, pun oblik nav linkova + E-Форма dugmeta; između je kompaktan nav).
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
- [news/[id].vue](app/pages/news/[id].vue) — implementirana strana vesti (TextBanner + sadržaj + `NewsArticle` JSON-LD + SEO), ali čita dummy podatke iz [dummy-data.ts](app/utils/dummy-data.ts). Treba prevezati na API.
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

**УСЛУГЕ (excel klijenta, jul 2026 — 3 nivoa: grupa → stavka → pod-stavka):**
1. Основне здравствене услуге
   - Општа медицина · Гинекологија · Интерна медицина · Офталмологија · Оториноларингологија · Физикална медицина и рехабилитација · Психијатрија · Психолошка заштита · Лабораторијска дијагностика · Радиолошка дијагностика [→ Рентген дијагностика · Ултразвучна дијагностика · Мамографија] · Центар за превенцију (link na `/preventive-center`)
2. Прегледи за школовање и обуку
   - Средња школа унутрашњих послова - СШУП · Центар за основну полицијску обуку - ЦОПО · Криминалистичко-полицијски Универзитет - КПУ · Академија за националну безбедност - АНБ · Курс за ватрогасно-спасилачке јединице - ВСЈ
3. Прегледи за пријем у радни однос
   - Министарство унутрашњих послова - МУП · Безбедносно-информативна агенција - БИА · Комунална милиција · Командир приправник (затворски чувар) · Дрил за Жандармерију · Дрил за САЈ
4. Лекарска уверења
   - За запослење · За возаче [→ За полагање возачких испита · За продужење возачке дозволе · За професионалног возача] · За држање оружја · За физичко-техничко обезбеђење [→ За ФТО без оружја · За ФТО са оружјем] · За рад на висини · За управљање моторним чамцем · За старатељство · За продужење лекарске лиценце
5. Остали прегледи медицине рада
   - Периодични прегледи · Циљани прегледи · Контролни прегледи · Систематски прегледи
6. Служба за правне и економско-финансијске послове
7. Служба за техничке и друге сличне послове

Napomene: typo iz excela ispravljeni uz odobrenje (Криминалистичко, ватрогасно). Спортска медицина, Апотекарска здравствена делатност, Медицина рада (kao naziv) i Групни прегледи NE postoje u novoj strukturi (klijent). Izvor istine u kodu: [app/utils/services-structure.ts](app/utils/services-structure.ts) (`SERVICE_GROUPS`), query šema `/services?group=<slug>` i `/services?service=<slug>`.

## Restrukturiranje (klijent) — STATUS

**Potvrđene odluke klijenta:**
- 19 službi (+ Групни прегледи) = **nove grupe usluga** (zamenjuju starih 6 odeljenja). Isti princip: klik grupu → konkretne usluge. UI selektor mora da podnese ~20 grupa (sidebar/dropdown, ne red dugmića).
- Ne-medicinske 3 službe (правна, техничка, апотека) → idu **под УСЛУГЕ** (po želji klijenta).
- Дијагностика = **4 zasebne službe** (Радиолошка, Рентген, Ултразвучна, Мамографија).
- Usluge ostaju **jedna strana** sa query param (`?group=<slug>` / `?service=<slug>`; staro `?department=N` ukinuto) — bez zasebnih ruta po službi (SEO tradeoff prihvaćen za sad).
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

**Urađeno (runda jul 2026, excel klijenta):**
- ✅ УСЛУГЕ restruktura po excelu: [services-structure.ts](app/utils/services-structure.ts) = izvor istine (`SERVICE_GROUPS`, slugovi); NAV_ITEMS/sidebar/kvadrati/pretraga se izvode iz njega. Query šema `/services?group=<slug>` i `?service=<slug>` (staro `?department=N` ukinuto). Групни прегледи uklonjeni (GroupExam* komponente ostale na disku neupotrebljene).
- ✅ Desktop mega meni = master-detail panel (ZAMENJEN kaskadom u rundi #2, vidi dole); mobilni meni = rekurzivni [MobileNavItem.vue](app/components/layout/MobileNavItem.vue) (4 nivoa).
- ✅ Margine poravnate sitewide: standard `px-4 md:px-12 lg:px-28` + `max-w-480 mx-auto` wrapper na SVIM trakama (Navigation, InfoBar, Footer, TextBanner, legal header, sve strane). Leve ivice mereno = 112px na 1600w.
- ✅ Pretraga sajta (demo, client-side): [SearchModal](app/components/common/SearchModal.vue) + [useSiteSearch](app/composables/useSiteSearch.ts) + [transliterate.ts](app/utils/transliterate.ts) (ćir/lat normalizacija). Indeksira: usluge, stranice, vesti, oglase, dokumenta, doktore. Dugme lupe u nav (svi breakpointi). Dummy nizovi izmešteni u [dummy-data.ts](app/utils/dummy-data.ts) — stranice i pretraga dele iste podatke.
- ✅ Homepage: nova hero poruka (tačan tekst klijenta), 4 kvadrata = 4 grupe usluga (svi «Сазнај више», opisi placeholder do tekstova klijenta), plava sekcija = 3-stat band (15+ служби / 100.000+ прегледа / 30+ година — placeholder brojke), logo+naziv Zavoda = jedan link na početnu.

**Urađeno (runda jul 2026 #2 — 5 fixova, klijent + Stefan):**
- ✅ УСЛУГЕ desktop meni = kaskadni dropdown identičan О нама (zahtev klijenta): rekurzivni [NavDropdownItem.vue](app/components/layout/NavDropdownItem.vue) sa edge-flip (flyout se otvara levo kad ne staje u viewport); mega master-detail panel obrisan, `NavItem.mega` flag uklonjen, О нама i УСЛУГЕ dele istu komponentu.
- ✅ Nav overlap 1440–1660: novi breakpoint `navwide` (1660px) u main.css; između `nav` i `navwide` linkovi su text-base/px-3 + `whitespace-nowrap`, E-Форма dugme samo ikonica; od `navwide` pun oblik (text-lg + tekst dugmeta).
- ✅ Mobile scroll (iOS/WebKit): [useBodyScrollLock.ts](app/composables/useBodyScrollLock.ts) — position:fixed samo na touch uređajima (desktop overflow:hidden, sticky header ne skače) + lock brojač, deli se između SearchModal/EFormModal/MobileMenu. Search lista — POTVRĐENO na pravom iPhone-u, tri stvari bile potrebne: (1) lista = JEDINI skroler (backdrop nije skrolabilan, dialog `max-h-full`, lista `min-h-0`; ugneždeni skroler u skrolabilnom backdropu ne radi na iOS-u), (2) blur inputa na touchstart liste (otvorena tastatura + zaključan body → iOS pojede drag gest), (3) dialog tranzicija BEZ scale transforma (WebKit: touch skrol unutar transformisanog elementa ostane mrtav). Emulator NE reprodukuje nijedan od ova tri — testirati na pravom uređaju.
- ✅ Services mobilni pillovi: red bez aktivne pilule se resetuje na početak pri promeni grupe (`[data-pill-row]` u [services.vue](app/pages/services.vue)).
- ✅ Font flicker na deploy-u: `fonts.defaults` u nuxt.config — weights `['400 800']` (varijabilni opseg, koristi se do extrabold), samo `normal` stil (italic se ne koristi), subsets cyrillic/latin/latin-ext, `preload: true`. Bez toga NIŠTA nije bilo preload-ovano (Google subsetovani fajlovi imaju unicode-range → default preload logika ih preskače). Modul preload-uje cyrillic woff2; latin (cifre) ide on-demand.

**Urađeno (runda avg 2026 — šablon strane službe, grana `feat/service-pages`):**
- ✅ Šablon 8 sekcija po mejlu klijenta, prva služba: Општа медицина. Planovi u `plans/` (git-ignorisano; PLAN-SAJT.md = naš, PLAN-BEKEND.md = za Dušana; identična „UGOVOR" sekcija u oba).
- ✅ `ServiceNode.kind` (`group|sluzba|usluga`) u [services-structure.ts](app/utils/services-structure.ts) — tip sadržaja je svojstvo čvora, ne dubine. `serviceNodeRoute`: sluzba SA sadržajem → `/services/<slug>`, ostalo query kao pre.
- ✅ Sadržaj: [types/sluzba.ts](app/types/sluzba.ts) (`SluzbaPage` = API ugovor), [utils/sluzbe/](app/utils/sluzbe/) registar (`hasSluzbaContent`), opsta-medicina.ts DOSLOVNO iz mejla. PLACEHOLDERI: opcije zakazivanja, FAQ odgovori (pitanja klijenta doslovna), fotke lekara (inicijali).
- ✅ Strana [services/[slug].vue](app/pages/services/[slug].vue) (services.vue → services/index.vue): TextBanner + zakazivanje/kontakt (plavi okvir [ServiceContactCard](app/components/services/ServiceContactCard.vue)) + link raspored → /work-schedule + usluge po kategorijama + tim ([ServiceTeamCard](app/components/services/ServiceTeamCard.vue), badge detaširane ambulante) + еЗдравље ([EHealthLinks](app/components/services/EHealthLinks.vue)) + ЧПП (reuse FAQItem). Stari `?service=opsta-medicina` → 301 redirect.
- ✅ SEO: useSeoMeta iz sadržaja + JSON-LD `MedicalClinic` + `FAQPage` (+ postojeći BreadcrumbList); sitemap.urls u nuxt.config (dopunjavati po službi).
- ✅ Latinica: `toLatin()` display transliteracija u [transliterate.ts](app/utils/transliterate.ts) (digrafi Lj/Nj/Dž), dubinska zamena u computed-u strane (preskače slug/photo). U fazi 2 latinicu vraća API (`Accept-Language`).
- ✅ Provereno: typecheck, Playwright (1440/768/390, nav dropdown → nova ruta, FAQ accordion, redirect, JSON-LD, lat toggle).
- ✅ Dizajn pass (impeccable polish): Услуге = tipografske kolone (`columns-*`, break-inside-avoid) umesto identičnih icon-kartica sa checkmarcima (Stefanov prigovor „zguzvano"); tim = roster bez okvira, 2/3/4/5 kolona; kontakt telefon krupniji, radno vreme format usklađen sa footerom (`07:00 - 19:00`). Napravljen [PRODUCT.md](PRODUCT.md) (impeccable kontekst: register brand, personality „pouzdan/državni/smiren", anti-ref: marketing poliklinike + stari .gov.rs, WCAG 2.1 AA). Impeccable v4.1.1 dostupan (instaliran v3.5.0) — update po želji.

**Urađeno (verdikt klijenta na stranu službe, avg 2026 — na masteru: `30d9d4e`):**
- ✅ Закажите преглед = čisto nabrajanje 4 opcije (kol centar 011/362-0000 · centrala 011/3615-665 + govorni automat · aplikacija Мој доктор sa linkom · lično); Е-Форма opcija i dugme uklonjeni sa strane. `SluzbaPage.scheduling` sada `{text, url?}[]` (ugovor ažuriran u plans/).
- ✅ Kontakt broj službe → 011/3615-665; FAQ placeholder odgovori usklađeni (bez starog broja).
- ✅ Услуге = V4 varijanta (izbor klijenta): jednake kartice auto-fit, tint zaglavlje, hairline stavke.
- ✅ Тим: 5 lekara detaširanih ambulanti grupisano na kraju (poslednji red na xl).
- ⬜ Klijent ostaje dužan: destinacije 4 eZdravlje dugmeta (sad placeholder link) + FAQ odgovore.

**Preostalo:**
- ⬜ Review klijenta → push. (Runda jul 2026 pušena na master: `fbdbdc2`.)
- ⬜ Tech-debt iz code review-a (nije blokirajuće, raditi usput): services.vue selekciju derivovati čisto iz rute (computed) umesto ref+watch sync; zajednički modal shell za EFormModal/SearchModal; obrisati mrtve GroupExam* komponente + neiskorišćene ključeve (pages.services.departmentsLabel, documentationRequired) ako se potvrdi da se ne vraćaju. (Mega panel ekstrakcija i body-scroll-lock composable rešeni u rundi #2.)
- ⬜ Hero dugmad («Изаберите лекара»/«Наше услуге»): klijent menja akcije, još ne zna koje — NE dirati do odluke.
- ⬜ Uvodni tekstovi kvadrata + tekstovi usluga/uverenja (šalje klijent), prave brojke stat banda.
- ⬜ Mobilni bug — čeka screenshot od Dušana.
- ⬜ (čeka materijale) news/[id] dinamička strana + `NewsArticle` schema; pravi sadržaj iz API-ja.
- ⬜ Backend pitanje (odluka backend tima, ne blokira sajt): doctor i faq kao `jsonb` kolone na sluzba_profile umesto zasebnih tabela? FAQ ok kao jsonb (čist prikaz); doctor bolje tabela — deli se sa rasporedom rada i budućim «Изаберите лекара» (treba FK/id).

**Napomene:**
- **reka-ui** (Reka UI, Vue headless komponente) je dozvoljen ako zatreba komponenta (mega-meni, accordion, tabs). Proveriti API preko ctx7 pre upotrebe.
- Osnovni podaci iz Informatora: Матични **07078978** · ПИБ **100182356** · Шифра делатности **85142** (proveriti footer).
- „Informator o radu" je zakonska obaveza (Zakon o slоб. приступу инф. од јавног значаја) — delovi (овлашћења, организ. структура) treba da budu na sajtu; pun Informator kao strana — potvrditi sa klijentom.

**Čeka materijale klijenta:** hero kolaž slika; pravi tekst Мисија/Визија; PDF fajlovi dokumenata; foto članova organa.

**Playwright:** browseri nisu instalirani; koristi sistemski Chrome — `npx playwright screenshot --channel chrome ...`. Za hover/interakciju (dropdown) skript importuje modul iz npx keša (`~/.npm/_npx/.../node_modules/playwright`, CommonJS → `import pw from ...; const {chromium}=pw`).

## Jezik komunikacije
Korisnik piše na srpskom. Odgovaraj na srpskom. Kod, komentari u kodu i commit poruke mogu engleski/srpski po postojećem obrascu (mešano, komentari često srpski).
