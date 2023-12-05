<template>
  <div>
    <dialog id="my_modal_2" class="modal">
      <div class="modal-box bg-gray-200">
        <h2 class="font-bold text-lg text-center">como jogar?</h2>
        <p class="m-3 select-none leading-6 text-zinc-900 ">
          Resolva o <b>Movixa</b> em 15 movimentos ou menos.<br />
          <br />
          Rearranje as letras para formar as palavras corretas, horizontal e
          verticalmente. Arraste as letras para qualquer lugar no tabuleiro. As
          letras mudarão de cor para mostrar se estão na posição correta. O
          número de movimentos restantes é exibido abaixo do tabuleiro.<br />
        </p>
        <hr />
        <div class="flex">
          <img
            src="/images/example1.png"
            class="w-1/2 mx-auto"
            alt="movixa jogo 1"
          />
        </div>
        <p class="m-3 select-none leading-6 text-zinc-900">
          A letra <b>F</b> está na posição correta; as letras <b>R</b> e
          <b>E</b> estão nesta linha, mas não nas posições corretas; as letras
          <b>N</b> e <b>M</b> não estão nesta linha.
        </p>
        <hr />
        <div class="flex">
          <img
            src="/images/example3.png"
            class="mx-auto w-1/3"
            alt="movixa jogo 2"
          />
        </div>
        <p class="m-3 select-none leading-6 text-zinc-900">
          letra <b>E</b>, Esta letra está em um canto, então ou a palavra
          vertical contém esta letra ou a palavra horizontal.
        </p>
        <hr />
        <h2
          class="m-3 text-xl font-bold tracking-wider text-center text-gray-900 uppercase select-none"
        >
          special case
        </h2>
        <h3
          class="text-center text-lg font-semibold text-gray-900 uppercase select-none"
        >
          A MESMA LETRA VÁRIAS VEZES EM UMA PALAVRA
        </h3>
        <p class="m-3 select-none leading-6 text-zinc-900">
          Neste caso, a palavra deve conter apenas um E, já que o primeiro está
          destacado, mas o segundo não. Nenhum deles está na posição correta.
        </p>
        <div class="flex">
          <img
            src="/images/example4.png"
            class="mx-auto w-1/2"
            alt="movixa jogo 3"
          />
        </div>
        <p class="m-3 select-none leading-6 text-zinc-900">
          Uma vez que temos um E na posição correta, o primeiro E não é mais
          necessário nesta palavra, então ele não é mais destacado.
        </p>
        <div class="flex">
          <img
            src="/images/example5.png"
            class="mx-auto w-1/2"
            alt="movixa jogo 4"
          />
        </div>
        <hr />
        <!-- <p class="m-3 text-xs leading-6 select-none text-zinc-400">
          criado por
          <a
            href="https://twitter.com/BingBlini"
            target="_blank"
            class="text-green-500"
            >blini</a
          >
        </p> -->
        <div class="modal-action">
          <form method="dialog">
            <button class="btn">Fechar</button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script setup></script>

<style scoped></style>
