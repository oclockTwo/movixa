<template>
  <div class="bg-gray-200">
    <div class="mx-auto max-w-3xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
      <div class="mx-auto max-w-4xl divide-y divide-gray-900/10">
        <h2 class="text-2xl font-bold leading-10 tracking-tight text-gray-900">
          Frequently asked questions
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
    question: "How to play?",
    answer: `It's a puzzle game that talks to AI large language models:

1. First, read the questions carefully and understand the requirements
(sometimes it's the questions you don't understand that keep you from
passing). 
      
2. Post your answer, your answer is the input of the large
language model.

3. Wait for some time.(we would like to output the
result immediately, but this is determined by chatgpt)

4. Look at the output, which is the output of the large language model.

5. If you don't pass this question, see if the answer in your post fulfills the
requirements, and if the content of the output fulfills the answer to
the question.`,
  },
  {
    question: "What is the model?",
    answer:
      "The model is chatgpt-3.5-turbo, which is a large language model \ntrained by the openai.com",
  },
  {
    question: "How to contact me?",
    answer:
      "If you have any ideas or suggestions for this game, please \nfeel free to contact me! tommy.ni1997@gmail.com ",
  },
  {
    question: "Source of inspiration",
    answer:
      "This game is inspired by the Chinese phrase 'Oops! I'm surrounded \nby large language models' by Haoqiang Fan.",
  },
  {
    question: "Supported Languages",
    answer:
      "Currently it mainly supports English, other languages are still \nunder development. If you use Chinese or other language input, for \nsome need to count the number of words input and output problems, it \nwill cause inaccuracies, resulting in failure to pass the question.",
  },
  // More questions...
];
</script>
