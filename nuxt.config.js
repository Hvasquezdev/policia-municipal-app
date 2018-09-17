module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Policia Municipal',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Policia Municipal Patrulleros de Angostura' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css'},
      { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css?family=Montserrat:400,700' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css?family=Kaushan+Script' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css?family=Hind:300'  },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.3.1/css/all.css' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: 'hsl(141, 71%, 48%)' },
  /**
   * Plugins
   */
  plugins: [
    '~/plugins/vue-scrollto',
    '~/plugins/vee-validate'
  ],
  /*
  ** Build configuration
  */
  build: {
    /**
     * Importing axios
     */
    vendor: ['axios'],
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

