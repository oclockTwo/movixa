<template>
  <div class="navbar bg-gray-200 rounded-md flex justify-between">
    <div class="flex gap-3 justify-center items-center">
      <!-- <button class="btn btn-square btn-ghost">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-9 h-9 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button> -->
      <ThemeSwitch class="mt-2" />
      <button class="btn btn-square btn-ghost">
        <a
          href="https://twitter.com/compose/tweet?text=Um jogo de adivinhação de palavras que é mais divertido do que o termo: movixa.com"
          target="_blank"
        >
          <img
            class="w-8 h-8 mt-1"
            src="/icon/heart.png"
            alt="movixa arquivo"
          />
        </a>
      </button>
    </div>
    <div class="">
      <h1>
        <a href="/" class="btn btn-ghost text-xl">Movixa</a>
      </h1>
    </div>
    <div class="flex gap-3 justify-center items-center">
      <button class="btn btn-square btn-ghost">
        <img
          class="w-8 h-8 mt-1"
          src="/icon/archive.png"
          alt="waffle archive"
          @click="gotoArchive"
        />
      </button>
      <button class="btn btn-square btn-ghost">
        <img
          class="w-8 h-8"
          src="/icon/question.png"
          alt="how to play movixa"
          @click="openIntroduction2"
        />
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

function openIntroduction2() {
  const modal = document.getElementById("my_modal_2");
  if (modal && modal.showModal) {
    modal.showModal();
  }
}

function gotoArchive() {
  router.push('/arquivo');
  // window.location.href = `https://movixa.com/arquivo`;
}

function gotoTwitter() {
  // window.open("https://twitter.com/compose/tweet?text=Um jogo de adivinhação de palavras que é mais divertido do que o termo: movixa.com");
  window.location.href = `https://twitter.com/compose/tweet?text=Um jogo de adivinhação de palavras que é mais divertido do que o termo: movixa.com`;
}

onMounted(() => {
  openIntroduction2();
});
</script>

<style scoped>
.font-Josefin-sans {
  font-family: "Josefin Sans", sans-serif;
}
</style>
