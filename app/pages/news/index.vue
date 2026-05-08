<template>
  <div class="flex flex-col gap-12">
    <TextBanner
      :title="$t('pages.news.title')"
      :description="$t('pages.news.description')"
    />
    <div
      class="px-4 md:px-12 lg:px-28 flex flex-col gap-8 md:gap-12 mb-10 md:mb-16"
    >
      <NewsMainBanner
        :news-article="mainArticle"
        class="-mt-16 md:-mt-18 relative"
      />
      <section class="flex flex-col gap-6">
        <div class="flex items-center gap-3">
          <Icon name="ion:newspaper-sharp" class="text-primary-400" size="20" />
          <h2 class="text-primary-900 font-bold text-xl">
            {{ $t('pages.news.latestNews') }}
          </h2>
        </div>
        <div class="h-px w-full bg-neutral-200" />
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NewsCard
            v-for="article in news"
            :key="article.id"
            :news-article="article"
          />
        </div>
      </section>
      <!-- FIXME: skloniti dummy vrednost -->
      <Pagination
        :total-items="27"
        :items-per-page="6"
        :current-page="page"
        @page-change="page = $event"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import NewsMainBanner from '~/components/news/NewsMainBanner.vue'
import type { NewsArticle } from '~/types/news'

const page = ref(1)

const mainArticle: NewsArticle = {
  id: 1,
  title: 'Zavod za javno zdravlje objavio nove preporuke za sezonu gripa',
  content:
    '<p>Zavod za javno zdravlje je danas objavio nove preporuke za sezonu gripa, uključujući savete o vakcinaciji i prevenciji. Stručnjaci ističu važnost redovnog pranja ruku, nošenja maski u zatvorenim prostorima i izbegavanja bliskog kontakta sa obolelima. Takođe, preporučuje se vakcinacija protiv gripa, posebno za rizične grupe poput starijih osoba, trudnica i hroničnih bolesnika.</p>',
  image:
    'https://fastly.picsum.photos/id/77/1631/1102.jpg?hmac=sg0ArFCRjP1wlUg8vszg5RFfGiXZJkWEtqLLCRraeBw',
  created_at: '2024-09-15T08:00:00Z',
}

const news: NewsArticle[] = [
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
]
</script>
