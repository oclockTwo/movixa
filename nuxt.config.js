// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  plugins: ['~/plugins/sortable.client.js'],
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
          async: true,
          src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8993913594775765",
          crossorigin: "anonymous",
        },
        {
          async: true,
          "data-website-id": "df7923f8-c759-4736-9b7d-b57f42d69b5d",
          src: "https://umami-six-theta.vercel.app/script.js",
        },
        {
          defer: true,
          "data-domain": "movixa.com",
          src: "https://plausible.io/js/plausible.js",
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
        {
          type: "text/javascript",
          innerHTML: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "k1rbl6dgrm");
          `,
          hid: "clarity-js", // 一个唯一的标识符
          // 防止 XSS 攻击，确保只有您控制的脚本被执行
          charset: "utf-8",
          crossorigin: "anonymous",
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
