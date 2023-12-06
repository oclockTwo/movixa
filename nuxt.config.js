// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  // plugins: ['~/plugins/sortable.js'],
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "@nuxt/content",
    "nuxt-headlessui",
    "@nuxtjs/robots",
    "nuxt-simple-sitemap",
    "@pinia/nuxt",
    "@formkit/auto-animate/nuxt",
  ],

  googleFonts: {
    families: {
      Roboto: true,
      "Josefin+Sans": true,
      Lato: [100, 300],
      Raleway: {
        wght: [100, 400],
        ital: [100],
      },
    },
  },

  app: {
    head: {
      htmlAttrs: {
        lang: "pt-br",
      },
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      meta: [
        {
          name: "robots",
          content:
            "index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
        },
      ],
      script: [
        {
          defer: true,
          "data-domain": "movixa.com",
          src: "https://plausible.io/js/script.js",
        },
        {
          async: true,
          src: "https://www.googletagmanager.com/gtag/js?id=G-J950DBPM75",
        },
        {
          children: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-J950DBPM75');
          `,
        },
      ],
    },
  },

  site: {
    url: "https://movixa.com",
  },
  robots: {
    UserAgent: "*",
    Disallow: "",
  },
});
