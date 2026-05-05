import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
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
  ],
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
