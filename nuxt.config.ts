// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt", "@nuxtjs/google-fonts", "nuxt-lucide-icons"],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  googleFonts: {
    families: {
      'Proxima Nova': true,
    },
  },
  app: {
    head: {
      link: [{rel: 'icon', type: 'image/png', href: './assets/img/logo.png'}]
    }
  },
  routeRules: {
    '/': {redirect: '/login'},
  }
})