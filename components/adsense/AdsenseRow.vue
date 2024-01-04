<template>
  <div class="flex mx-auto">
    <ins
      :class="name"
      class="h-[90px] w-[728px] mx-auto inline-block"
      data-ad-client="ca-pub-8993913594775765"
      data-ad-slot="9469547902"
    ></ins>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

const name = "adsbygoogle";

let script = document.createElement("script");
script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8993913594775765";
script.async = true;
script.crossorigin = "anonymous";

script.onload = () => {
  window.adsbygoogle = window.adsbygoogle || [];
  window.adsbygoogle.push({});
};

document.head.appendChild(script);
</script>

<style scoped></style>
