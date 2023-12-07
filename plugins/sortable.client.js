import { Sortable, Swap } from "sortablejs/modular/sortable.core.esm";

export default defineNuxtPlugin((nuxtApp) => {
  Sortable.mount(new Swap());
});