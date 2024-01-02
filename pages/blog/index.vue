<template>
  <!-- Section Blog -->
  <section class="bg-[#f2f2f7]">
    <!-- Container -->
    <div class="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
      <!-- Blog Title -->
      <h2 class="text-center text-3xl font-bold md:text-5xl">
        Coleção de blogs do site de jogos movixa
      </h2>
      <p class="mb-16 mt-4 text-center text-[#647084]">
        Atualizações das últimas notícias do jogo movixa
      </p>
      <!-- Blog Content -->
      <div class="mx-auto grid max-w-xl gap-4">
        <!-- Blog Item -->
        <div
          class="flex flex-col items-center pb-8 text-center [border-bottom:1px_solid_rgb(100,_112,_132)] sm:flex-row sm:text-left"
        >
          <img
            src="https://assets.website-files.com/6357722e2a5f19121d37f84d/635a172dccf682e00f68b758_Rectangle%2040.png"
            alt=""
            class="inline-block h-40 w-40"
          />
          <div class="pt-4 sm:px-8 sm:pt-0">
            <p class="mb-6 font-bold">
              <a href="/blog/movixa-resposta-hoje-1-de-janeiro-de-2024"
                >Dicas (e respostas) do Movixa de hoje para segunda-feira, 1º de
                janeiro de 2024</a
              >
            </p>
            <p class="text-sm">1 de janeiro de 2024</p>
          </div>
        </div>
        <!-- Blog Item -->
        <div
          class="flex flex-col items-center pb-8 text-center [border-bottom:1px_solid_rgb(100,_112,_132)] sm:flex-row sm:text-left"
        >
          <img
            src="https://assets.website-files.com/6357722e2a5f19121d37f84d/635a1730f3c8a44d614760bf_Rectangle%2040-2.png"
            alt=""
            class="inline-block h-40 w-40"
          />
          <div class="pt-4 sm:px-8 sm:pt-0">
            <p class="mb-6 font-bold">
              <a href="/blog/movixa-resposta-hoje-2-de-janeiro-de-2024"
                >Dicas (e respostas) do Movixa de hoje para segunda-feira, 2 de
                janeiro de 2024</a
              >
            </p>
            <p class="text-sm">2 de janeiro de 2024</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <Footer />
</template>

<script setup>
useHead({
  title: "Coleção de blogs do site de movixa jogo",
  meta: [
    {
      name: "description",
      content: "Navegue aqui por toda a coleção de blogs do movixa.",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: "https://movixa.com/blog",
    },
    {
      rel: "icon",
      href: "/favicon.ico",
      type: "image/x-icon",
    },
  ],
});
</script>

<style scoped></style>
