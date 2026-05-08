import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: {
        lang: 'sr',
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'robots', content: 'index, follow' },
        {
          name: 'author',
          content: 'Zavod za zdravstvenu zaštitu radnika MUP-a',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'sr_RS' },
        // TODO: Zameniti sa apsolutnim URL-om pre produkcije (og:image zahteva apsolutnu putanju)
        {
          property: 'og:image',
          content: 'https://www.zzzzmup.rs/img/logo.png',
        },
        { property: 'og:image:width', content: '512' },
        { property: 'og:image:height', content: '512' },
        { property: 'og:image:alt', content: 'ZZZZMUP Logo' },
      ],
      link: [{ rel: 'icon', type: 'image/png', href: '/img/logo.png' }],
    },
  },
  icon: {
    mode: 'css',
    cssLayer: 'base',
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap',
  ],
  // TODO: Zameniti sa pravim domenom pre produkcije
  site: {
    url: 'https://www.zzzzmup.rs',
  },
  i18n: {
    locales: [
      { code: 'sr-Cyrl', name: 'Ћирилица', file: 'sr-Cyrl.json' },
      { code: 'sr-Latn', name: 'Latinica', file: 'sr-Latn.json' },
    ],
    defaultLocale: 'sr-Cyrl',
    strategy: 'no_prefix',
    langDir: 'locales',
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
})
