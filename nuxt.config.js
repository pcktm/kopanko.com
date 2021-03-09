export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Jakub Kopańko',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: "og:site_name",
        name: "og:site_name",
        property: "og:site_name",
        content: "Jakub Kopańko"
      },
      {
        hid: "og:title",
        name: "og:title",
        property: "og:title",
        content: "Jakub Kopańko"
      },
      {
        hid: "og:description",
        name: "og:description",
        property: "og:description",
        content: "Full-stack developer, film director and editor."
      },
      {
        hid: "description",
        name: "description",
        content: "Full-stack developer, film director and editor."
      }
    ],
    link: [
      { rel: "icon", type: "image/png", href: "/logo.png" }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    './scss/style.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/tryharder.client.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    ['nuxt-matomo', {
      matomoUrl: '//stats33.mydevil.net/',
      siteId: 115
    }],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
