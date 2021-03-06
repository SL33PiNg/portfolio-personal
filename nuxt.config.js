/* eslint-disable prettier/prettier */
import colors from 'vuetify/es5/util/colors'

export default {
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Kanit&display=swap',
      },
    ],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~/assets/main.css', '~/assets/vueWysiwyg.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/vue-wysiwyg.js', '@/plugins/froala.js'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Doc: https://auth.nuxtjs.org/
    '@nuxtjs/auth',
    // https://github.com/nuxt-community/modules/tree/master/packages/toast
    '@nuxtjs/toast',
  ],
  toast: {
    position: 'top-right',
    duration: '2000',
    keepOnHover: true,
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: 'http://localhost:3000/api',
  },
  /*
   ** Auth module configuration
   ** See https://auth.nuxtjs.org/
   */
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/login',
          },
          logout: {
            url: '/logout',
          },
          user: {
            url: '/users',
            propertyName: '',
          },
        },
      },
    },
    scopeKey: 'roles',
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    defaultAssets: {
      font: {
        family: 'Kanit',
      },
    },
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
  // https://nuxtjs.org/api/configuration-watch
  watch: ['~/server/*.js', '~/server/**/*.js', '~/mixins/**/*.js'],
  serverMiddleware: ['@/server/index'],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    transpile: ['vue-vue-wysiwyg'],
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    },
  },
}
