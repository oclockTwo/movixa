<template>
  <div class="bg-gray-200">
    <div class="mx-auto max-w-3xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
      <div class="mx-auto max-w-4xl divide-y divide-gray-900/10">
        <h2 class="text-2xl font-bold leading-10 tracking-tight text-gray-900">
          Perguntas Frequentemente Feitas
        </h2>
        <dl class="mt-10 space-y-6 divide-y divide-gray-900/10">
          <Disclosure
            as="div"
            v-for="faq in faqs"
            :key="faq.question"
            class="pt-6"
            v-slot="{ open }"
          >
            <dt>
              <DisclosureButton
                class="flex w-full items-start justify-between text-left text-gray-900"
              >
                <h3 class="text-2xl font-semibold leading-7">
                  {{ faq.question }}
                </h3>
                <span class="ml-6 flex h-7 items-center">
                  <PlusSmallIcon
                    v-if="!open"
                    class="h-6 w-6"
                    aria-hidden="true"
                  />
                  <MinusSmallIcon v-else class="h-6 w-6" aria-hidden="true" />
                </span>
              </DisclosureButton>
            </dt>
            <DisclosurePanel as="dd" class="mt-2 pr-12">
              <pre class="text-base leading-7 text-gray-600">{{
                faq.answer
              }}</pre>
            </DisclosurePanel>
          </Disclosure>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/vue/24/outline";

const faqs = [
  {
    question: "Como jogar movixa?",
    answer: `Por favor, clique no botão no canto superior direito da página para ver.
Simplificando, há um total de 6 palavras, cada palavra tem 5 letras, e você precisa mover cada letra para a posição correta. Verde representa a posição correta, amarelo indica que a letra está na linha ou coluna correta, mas não na posição correta, e cinza significa que a palavra não está na linha nem na coluna correta.`,
  },
  {
    question: "O jogo está completamente desenvolvido?",
    answer:
      "Não, atualmente só a versão inicial foi concluída, e mais funcionalidades serão adicionadas posteriormente.",
  },
  {
    question: "Por que desenvolver este jogo?",
    answer:
      "Espero que todos tenham dias felizes e alegres.",
  },
  // More questions...
];
</script>
