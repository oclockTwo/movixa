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
        <img
          class="w-8 h-8 mt-1"
          src="/icon/heart.png"
          alt="waffle archive"
          @click="gotoTwitter"
        />
      </button>
    </div>
    <div class="flex">
      <h1>
        <a href="/arquivo" class="btn btn-ghost text-xl">Movixa Arquivo</a>
      </h1>
    </div>
    <div class="flex gap-3 justify-center items-center">
      <button class="btn btn-square btn-ghost">
        <img
          class="w-7 h-7"
          src="/icon/house.png"
          alt="waffle"
          @click="gotoHome"
        />
      </button>
      <button class="btn btn-square btn-ghost">
        <img
          class="w-8 h-8"
          src="/icon/question.png"
          alt="how to play waffle"
          @click="openIntroduction3"
        />
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter();

function openIntroduction3() {
  const modal = document.getElementById("my_modal_2");
  if (modal && modal.showModal) {
    modal.showModal();
  }
}

function gotoHome() {
  router.push('/');
}

function gotoTwitter() {
  window.open("https://twitter.com/compose/tweet?text=Um jogo de adivinhação de palavras que é mais divertido do que o termo: movixa.com");
}

</script>

<style scoped>
.font-Josefin-sans {
  font-family: "Josefin Sans", sans-serif;
}
</style>
