<template>
  <div>
    <section class="relative px-28 py-32 h-172">
      <div class="relative flex flex-col gap-6 z-10 text-white">
        <div
          class="flex items-center gap-2 px-3 py-1 border border-white/20 max-w-max rounded-full bg-white/10 backdrop-blur"
        >
          <Icon
            name="ion:ios-information-circle-outline"
            size="12"
            class="text-success"
          />
          <p class="text-white font-medium text-sm">
            {{ $t('pages.home.officialInstitution') }}
          </p>
        </div>
        <h2 class="font-bold text-6xl text-white leading-16 tracking-tight">
          {{ $t('pages.home.heroTitle') }}
          <br />
          <span class="text-[#BFDBFE] leading-normal tracking-normal">{{
            $t('pages.home.heroTitleMinistry')
          }}</span>
        </h2>
        <p class="max-w-1/2 text-xl">
          {{ $t('pages.home.heroDescription') }}
        </p>
        <div class="flex items-center gap-4">
          <div
            class="px-6 py-3 bg-white rounded-xl hover:bg-primary-100 transition-colors cursor-pointer"
          >
            <p class="font-bold text-primary-500">Brza akcija</p>
          </div>
          <div
            class="px-6 py-3 rounded-xl border border-primary-200/40 bg-white/10 hover:bg-white/20 backdrop-blur transition-colors cursor-pointer"
          >
            <p class="font-bold text-white">Brza akcija isto</p>
          </div>
        </div>
      </div>
      <NuxtImg
        src="/img/temporary-index.jpg"
        class="absolute inset-0 w-full h-full object-cover"
        :alt="$t('pages.home.heroImageAlt')"
        format="webp"
        preload
        fetchpriority="high"
      />
      <div
        class="absolute inset-0 bg-linear-to-b from-primary-950/75 to-primary-600/85"
      />
    </section>
    <section class="grid grid-cols-4 gap-6 px-24 pt-24 -mt-59.5">
      <HighlightCard
        v-for="(item, index) in hightlightItems"
        :key="index"
        :title="item.title"
        :description="item.description"
        :icon="item.icon"
        :button-text="item.buttonText"
        :main="item.main"
        @click="handleCardActionClicked"
      />
    </section>
    <section class="flex flex-col gap-16 py-24 px-28">
      <div class="flex flex-col gap-1 items-center justify-center">
        <span class="text-sm font-bold text-primary-400 uppercase">
          {{ $t('pages.home.servicesLabel') }}
        </span>
        <h2 class="text-primary-900 font-bold text-4xl">
          {{ $t('pages.home.servicesTitle') }}
        </h2>
        <p class="text-center max-w-150 text-lg text-neutral-500">
          {{ $t('pages.home.servicesDescription') }}
        </p>
      </div>
      <div class="grid grid-cols-3 gap-8">
        <ServicesCard
          v-for="(item, index) in selectedServices"
          :key="index"
          :title="item.title"
          :description="item.description"
          :icon="item.icon"
          :primary="item.primary"
        />
      </div>
    </section>
    <section
      class="px-28 py-12 bg-primary-600 flex justify-between items-center gap-16"
    >
      <div class="flex items-start gap-4 max-w-2/5">
        <div
          class="flex items-center justify-center rounded-full bg-white/10 p-3"
        >
          <Icon name="ion:shield-half-outline" size="24" class="text-white" />
        </div>
        <div>
          <h3 class="font-bold text-xl text-white">
            {{ $t('pages.home.securityHealth') }}
          </h3>
          <p class="text-sm text-primary-100">
            {{ $t('pages.home.securityHealthDesc') }}
          </p>
        </div>
      </div>
      <div class="w-px bg-primary-500 self-stretch" />
      <div class="flex items-start gap-4 max-w-2/5">
        <div
          class="flex items-center justify-center rounded-full bg-white/10 p-3"
        >
          <Icon name="ion:people" size="24" class="text-white" />
        </div>
        <div>
          <h3 class="font-bold text-xl text-white">
            {{ $t('pages.home.availability') }}
          </h3>
          <p class="text-sm text-primary-100">
            {{ $t('pages.home.availabilityDesc') }}
          </p>
        </div>
      </div>
    </section>
    <section class="px-28 py-24 flex flex-col gap-12">
      <div>
        <div>
          <h3 class="font-bold text-primary-900 text-3xl">
            {{ $t('pages.home.newsTitle') }}
          </h3>
        </div>
        <div class="flex items-center justify-between">
          <p class="text-neutral-500">
            {{ $t('pages.home.newsDescription') }}
          </p>
          <Button
            :text="$t('pages.home.viewAllNews')"
            variant="text"
            append-icon="ion:arrow-forward"
          />
        </div>
      </div>
      <div class="grid grid-cols-3 gap-8">
        <NewsCard
          v-for="(item, index) in newsArticles"
          :key="index"
          :news-article="item"
        />
      </div>
    </section>
  </div>
</template>
<script lang="ts" setup>
import type { HighlightCardData } from '~/types/common'
import type { NewsArticle } from '~/types/news'
import type { ServicesCardData } from '~/types/services'

const hightlightItems: HighlightCardData[] = [
  {
    title: 'Cenovnik',
    description: 'Pogledajte naš cenovnik usluga i saznajte više o pregledima.',
    icon: 'ion:pricetags',
    buttonText: 'Pogledajte cenovnik',
  },
  {
    title: 'Cenovnik',
    description: 'Pogledajte naš cenovnik usluga i saznajte više o pregledima.',
    icon: 'ion:pricetags',
    buttonText: 'Pogledajte cenovnik',
  },
  {
    title: 'Izaberite lekara',
    description:
      'Izaberite svog lekara popunjavanjem onlajn forme i preuzmite potrebna dokumenta.',
    icon: 'ion:document',
    buttonText: 'Popunite formu',
    main: true,
  },
  {
    title: 'Cenovnik',
    description: 'Pogledajte naš cenovnik usluga i saznajte više o pregledima.',
    icon: 'ion:pricetags',
    buttonText: 'Pogledajte cenovnik',
  },
]

const selectedServices: ServicesCardData[] = [
  {
    title: 'Sistematski pregledi za pripadnike službi',
    description:
      'Specifični pregledi medicine rada prilagođeni potrebama pripadnika bezbednosnih službi. Obuhvataju kompletnu dijagnostiku i procenu radne sposobnosti.',
    icon: 'ion:medkit',
    primary: true,
  },
  {
    title: 'Kardiologija i interna medicina',
    description:
      'Savremena kardiološka dijagnostika koja obuhvata EKG, ultrazvuk srca i testove opterećenja, uz stručni nadzor vrhunskih specijalista.',
    icon: 'ion:pulse',
  },
  {
    title: 'Kardiologija i interna medicina',
    description:
      'Savremena kardiološka dijagnostika koja obuhvata EKG, ultrazvuk srca i testove opterećenja, uz stručni nadzor vrhunskih specijalista.',
    icon: 'ion:pulse',
  },
  {
    title: 'Kardiologija i interna medicina',
    description:
      'Savremena kardiološka dijagnostika koja obuhvata EKG, ultrazvuk srca i testove opterećenja, uz stručni nadzor vrhunskih specijalista.',
    icon: 'ion:pulse',
  },
  {
    title: 'Kardiologija i interna medicina',
    description:
      'Savremena kardiološka dijagnostika koja obuhvata EKG, ultrazvuk srca i testove opterećenja, uz stručni nadzor vrhunskih specijalista.',
    icon: 'ion:pulse',
  },
  {
    title: 'Kardiologija i interna medicina',
    description:
      'Savremena kardiološka dijagnostika koja obuhvata EKG, ultrazvuk srca i testove opterećenja, uz stručni nadzor vrhunskih specijalista.',
    icon: 'ion:pulse',
  },
]

const newsArticles: NewsArticle[] = [
  {
    id: 1,
    title: 'Zavod uspešno završio projekat digitalizacije',
    content:
      '<p>Zavod za zdravstvenu zaštitu radnika Ministarstva unutrašnjih poslova uspešno je završio revolucionarni projekat digitalizacije svih medicinskih kartona i procesa. Ovaj projekat omogućava našim lekarima i pacijentima značajno brži pristup informacijama.</p><p>Glavne prednosti implementiranog sistema obuhvataju:</p><ul><li><strong>Brzina:</strong> Trenutni pristup celokupnoj istoriji bolesti pacijenta.</li><li><strong>Bezbednost podataka:</strong> Implementirani su najviši standardi enkripcije, u skladu sa procedurama MUP-a.</li><li><strong>Uvezanost:</strong> Bolja komunikacija između specijalističkih službi.</li></ul><p>Ovaj korak nas svrstava među najmodernije zdravstvene ustanove specifične namene u čitavom regionu.</p>',
    image:
      'https://fastly.picsum.photos/id/11/2500/1667.jpg?hmac=xxjFJtAPgshYkysU_aqx2sZir-kIOjNR9vx0te7GycQ',
    created_at: '2024-05-15T10:00:00Z',
  },
  {
    id: 2,
    title:
      'Zavod organizuje ciklus besplatnih zdravstvenih radionica za edukaciju i unapređenje životnih navika zaposlenih',
    content:
      '<p>Na osnovu statističkih podataka i analiza zdravstvenog stanja iz prethodnih godina, Zavod je pokrenuo potpuno novi <em>program prevencije oboljenja srca i krvnih sudova</em> namenjen svim aktivnim pripadnicima MUP-a.</p><p>Program obuhvata nekoliko ključnih faza:</p><ol><li>Detaljna kardiološka dijagnostika (EKG, ultrazvuk srca, Holter pritiska).</li><li>Ergometrija (test opterećenja) za procenu radne sposobnosti.</li><li>Konsultacije sa kliničkim nutricionistom radi izrade posebog plana ishrane.</li></ol><p>Prijave za prvi ciklus pregleda su otvorene i možete ih zakazati elektronskim putem preko portala.</p>',
    image:
      'https://fastly.picsum.photos/id/19/2500/1667.jpg?hmac=7epGozH4QjToGaBf_xb2HbFTXoV5o8n_cYzB7I4lt6g',

    created_at: '2024-09-01T12:00:00Z',
  },
  {
    id: 3,
    title:
      'Implementacija novog i sveobuhvatnog programa primarne prevencije bolesti srca i krvnih sudova kroz detaljnu analizu zdravstvenog profila pripadnika službi',
    content:
      '<p>Zavod organizuje novu seriju besplatnih i visoko-interaktivnih zdravstvenih radionica. Teme koje će biti obrađene pažljivo su odabrane u saradnji sa komandirima jedinica i zasnivaju se na potrebama direktno sa terena.</p><p>Prve tri radionice biće fokusirane na:</p><ul><li>Prevencija <strong>Burnout sindroma</strong> (sindroma sagorevanja na poslu).</li><li>Pravilna ishrana i balans tokom noćnih dežurstava.</li><li>Održavanje fizičke kondicije uz minimalno dostupnih rekvizita.</li></ul><p>Svi učesnici će na kraju ciklusa dobiti zvanični sertifikat o učestvovanju, dok su predavači naši eminentni stručnjaci iz psihijatrije i sportske medicine.</p>',
    image:
      'https://fastly.picsum.photos/id/42/3456/2304.jpg?hmac=dhQvd1Qp19zg26MEwYMnfz34eLnGv8meGk_lFNAJR3g',

    created_at: '2024-06-10T14:00:00Z',
  },
]

const handleCardActionClicked = () => {
  console.log('Card action clicked')
}
</script>
