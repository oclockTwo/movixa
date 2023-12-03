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
      <ThemeSwitch class="mt-1" />
    </div>
    <div class="">
      <h1>
        <a href="/" class="btn btn-ghost text-xl"
          >Movixa</a
        >
      </h1>
    </div>
    <div class="">
      <button class="btn btn-square btn-ghost">
        <img
          class="w-9 h-9"
          src="/icon/question.png"
          alt="how to play waffle"
          @click="openIntroduction2"
        />
      </button>
    </div>
  </div>
</template>

<script setup>
function openIntroduction2() {
  const modal = document.getElementById("my_modal_2");
  console.log("modal:", modal);
  if (modal && modal.showModal) {
    modal.showModal();
  }
}

const lang = ref("en");
function changeLanuage(langString) {
  lang.value = langString;
}
</script>

<style scoped>
.font-Josefin-sans {
  font-family: "Josefin Sans", sans-serif;
}
</style>
