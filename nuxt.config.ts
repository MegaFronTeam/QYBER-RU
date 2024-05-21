// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    'nuxt-primevue',
    '@nuxt/image',
    '@nuxtjs/svg-sprite',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  // mode: universal,
  ssr: true,
});
