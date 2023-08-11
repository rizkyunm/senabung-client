// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL,
    },
  },
  // session: {
  //   session: {
  //     // Sessions expire after 600 seconds = 10 minutes
  //     expiryInSeconds: 60 * 10,
  //     // Session ids are 64 characters long
  //     idLength: 64,
  //     // All session data is stored in a "sub-storage" that uses the `sessions` prefix
  //     storePrefix: 'sessions',
  //     // The session cookie same site policy is `lax`
  //     cookieSameSite: 'lax',
  //     // `Secure` attribute of session cookie is set to `true`
  //     cookieSecure: true,
  //     // `HttpOnly` attribute of session cookie is set to `true`
  //     cookieHttpOnly: true,
  //     // In-memory storage is used (these are `unjs/unstorage` options)
  //     storageOptions: {
  //       driver: 'memory',
  //       options: {},
  //     },
  //     // The request-domain is strictly used for the cookie, no sub-domains allowed
  //     domain: false,
  //     // Sessions aren't pinned to the user's IP address
  //     ipPinning: false,
  //     // Expiration of the sessions are not reset to the original expiryInSeconds on every request
  //     rolling: false,
  //   },
  //   api: {
  //     // The API is enabled
  //     isEnabled: true,
  //     // `PATCH, GET, POST, DELETE /api/session` HTTP requests are possible
  //     methods: ['patch', 'get', 'post', 'delete'],
  //     // The sessions endpoints are mounted at `/api/session`
  //     basePath: '/api/auth/session',
  //   },
  // },
  auth: {
    provider: {
      type: 'local',
      pages: {
        login: '/masuk',
      },
      token: {
        signInResponseTokenPointer: '/token',
      },
      sessionDataType: {
        id: 'string',
        name: 'string',
        phone_number: 'string',
        email: 'string',
        image_url: 'string',
      },
    },
    globalAppMiddleware: {
      isEnabled: true,
      allow404WithoutAuth: false,
    },
  },
  app: {
    head: {
      title: 'Senabung',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/icon.png',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap',
        },
      ],
    },
  },
  css: [
    '@/assets/css/tailwind.css',
    '@fortawesome/fontawesome-svg-core/styles.css',
  ],
  modules: [
    '@nuxtjs/tailwindcss',
    '@sidebase/nuxt-auth',
    '@pinia/nuxt',
    // '@sidebase/nuxt-session',
    [
      '@vee-validate/nuxt',
      {
        // disable or enable auto imports
        autoImports: true,
        // Use different names for components
        componentNames: {
          Form: 'VeeForm',
          Field: 'VeeField',
          FieldArray: 'VeeFieldArray',
          ErrorMessage: 'VeeErrorMessage',
        },
      },
    ],
  ],
  typescript: {
    strict: true,
    typeCheck: true,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  pinia: {
    autoImports: ['defineStore'],
  },
})
