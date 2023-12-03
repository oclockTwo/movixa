<template>
  <div class="py-0">
    <Switch
      v-model="enabled"
      :class="enabled ? 'bg-teal-900' : 'bg-teal-700'"
      class="relative inline-flex h-[28px] w-[54px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
    >
      <span class="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        :class="enabled ? 'translate-x-6' : 'translate-x-0'"
        class="pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
      />
    </Switch>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Switch } from '@headlessui/vue'

const enabled = ref(false);
const theme = ref('light');
watch(enabled, (value) => {
  theme.value = value ? 'dark' : 'coffee';
  document.documentElement.setAttribute("data-theme", theme.value);
});

useHead({
  htmlAttrs: {
    'data-theme': 'light',
  }
})
</script>
