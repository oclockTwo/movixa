<template>
  <main class="">
    <div
      class="h-screen overflow-auto font-Josefin-sans mx-auto w-full max-w-[728px] shadow-2xl"
    >
      <ArchiveHeader />
      <!-- <h2
        class="font-sans text-center mt-4 text-zinc-400 tracking-widest text-xl"
      >
        Movixa Arquivo!
      </h2> -->
      <div class="flex justify-center">
        <details class="dropdown">
          <summary class="m-1 btn btn-link">Escolha a data</summary>
          <ul
            class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52"
          >
            <li v-for="(date, index) of getDatesUntilYesterday()" :key="index">
              <p @click="gotoDate(date)">{{ date }}</p>
            </li>
          </ul>
        </details>
      </div>
      <div v-auto-animate>
        <div
          class="mt-2 grid grid-cols-5 gap-3 mx-auto px-2"
          style="width: 100%; max-width: 420px"
          ref="list"
        >
          <div
            v-for="item of shuffledGrid[0]"
            :key="item.id"
            :data-state="item.state"
          >
            <p :class="item.style">{{ item.letter }}</p>
          </div>
          <div
            v-for="item of shuffledGrid[1]"
            :key="item.id"
            :data-state="item.state"
          >
            <p :class="item.style" v-if="item.letter !== ' '">
              {{ item.letter }}
            </p>
          </div>
          <div
            v-for="item of shuffledGrid[2]"
            :key="item.id"
            :data-state="item.state"
          >
            <p :class="item.style">{{ item.letter }}</p>
          </div>
          <div
            v-for="item of shuffledGrid[3]"
            :key="item.id"
            :data-state="item.state"
          >
            <p :class="item.style" v-if="item.letter !== ' '">
              {{ item.letter }}
            </p>
          </div>
          <div
            v-for="item of shuffledGrid[4]"
            :key="item.id"
            :data-state="item.state"
          >
            <p :class="item.style">{{ item.letter }}</p>
          </div>
        </div>

        <div
          class="flex justify-center mt-8 text-4xl tracking-wider text-zinc-400"
        >
          {{ remainTimes }} trocas
        </div>
        <div
          v-if="win === 0"
          class="text-center mt-4 font-bold bg-gray-500 text-white py-2"
        >
          <p class="text-xl mb-2">fim de jogo</p>
          <p class="text-3xl">🥺</p>
          <p class="text-lg font-bold">
            quase lá, compartilhe com os outros para jogarem também!
          </p>
        </div>
        <div
          v-if="win === 1"
          class="text-center mt-4 font-bold bg-[#70a455] text-white py-2"
        >
          <p class="text-xl mb-2">Você ganhou</p>
          <p class="text-3xl">🥳</p>
          <p class="text-lg font-bold">
            Você é muito inteligente, compartilhe com os outros para eles
            jogarem também!
          </p>
        </div>

        <div v-if="win !== -1" class="flex justify-center mt-4 mb-10">
          <button
            @click="copyToClipboard($event.target)"
            class="btn bg-[#70a455] hover:bg-[#70a455] btn-lg font-bold text-xl"
          >
            <svg
              height="24"
              width="24"
              class="mr-1 mb-1 font-bold text-center uppercase opacity-70 select-none"
            >
              <path
                d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"
                class="leading-5 uppercase select-none"
              ></path>
            </svg>
            compartilhar
          </button>
        </div>
      </div>
    </div>
  </main>
  <Introduction />
  <Share class="my-10" />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { vAutoAnimate } from "@formkit/auto-animate";
import { Sortable } from "sortablejs/modular/sortable.core.esm";
import { useRoute } from "vue-router";
const route = useRoute();
const list = ref(null);
const queryParams = route.query;

const today = useToday();
const correctGrid = ref([]);
const shuffledGrid = ref([]);
const { data } = await useAsyncData(() => queryContent("/data").findOne());
const state = ref(0);
const win = ref(-1);
const remainTimes = ref(0);

function getDatesUntilYesterday() {
  const startDate = new Date(2023, 11, 4); // 月份从 0 开始计数，所以 11 代表 12 月
  const today = new Date();
  const yesterday = new Date(today.setDate(today.getDate() - 1));

  let currentDate = startDate;
  const dates = [];

  while (currentDate <= yesterday) {
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // 加 1 因为月份是从 0 开始计数的
    const year = currentDate.getFullYear();

    dates.push(`${day}/${month}/${year}`);
    // 将日期向前移动一天
    currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
  }

  return dates;
}

function gotoDate(date) {
  window.location.href = `http://movixo.com/arquivo?date=${date}`;
}

function initData(data) {
  let result = [];
  for (let word of data.value[queryParams.date]["words"]) {
    result.push(Array.from(word));
  }
  result = formateData(result);
  return result;
}

function formateData(data) {
  const result = [];
  result.push([data[0][0], data[0][1], data[0][2], data[0][3], data[0][4]]);
  result.push([data[1][1], " ", data[5][1], " ", data[3][1]]);
  result.push([data[4][0], data[4][1], data[4][2], data[4][3], data[4][4]]);
  result.push([data[1][3], " ", data[5][3], " ", data[3][3]]);
  result.push([data[2][0], data[2][1], data[2][2], data[2][3], data[2][4]]);

  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result[i].length; j++) {
      result[i][j] = {
        letter: result[i][j],
      };
    }
  }
  return result;
}

function setLetterStyleAndState(row, col) {
  if (isCorrectPosition(row, col)) {
    shuffledGrid.value[row][col].style = "green-cell-style";
    shuffledGrid.value[row][col].state = 2;
  } else if (isInRowOrColumn(row, col)) {
    shuffledGrid.value[row][col].style = "orange-cell-style";
    shuffledGrid.value[row][col].state = 1;
  } else {
    shuffledGrid.value[row][col].style = "gray-cell-style";
    shuffledGrid.value[row][col].state = 0;
  }
}

function isComplete() {
  return shuffledGrid.value.every((row) => row.every((obj) => obj.state === 2));
}

function isCorrectPosition(rowIndex, colIndex) {
  return (
    shuffledGrid.value[rowIndex][colIndex].letter ===
    correctGrid.value[rowIndex][colIndex].letter
  );
}

function isInRowOrColumn(rowIndex, colIndex) {
  const letter = shuffledGrid.value[rowIndex][colIndex].letter;

  if (rowIndex === 1 || rowIndex === 3) {
    return specialCaseCol(letter, rowIndex, colIndex);
  } else if (colIndex === 1 || colIndex === 3) {
    return specialCaseRow(letter, rowIndex, colIndex);
  } else {
    return (
      specialCaseCol(letter, rowIndex, colIndex) ||
      specialCaseRow(letter, rowIndex, colIndex)
    );
  }
}

function specialCaseRow(letter, x, y) {
  let yellowNumber = 0;
  let greenNumber = 0;
  let number = 0;

  for (let i = 0; i < correctGrid.value[x].length; i++) {
    if (correctGrid.value[x][i].letter === letter) {
      number++;
    }
  }

  for (let i = 0; i < shuffledGrid.value[x].length; i++) {
    if (shuffledGrid.value[x][i].letter === letter) {
      if (shuffledGrid.value[x][i].state === 1 && i !== y) {
        yellowNumber++;
      } else if (shuffledGrid.value[x][i].state === 2) {
        greenNumber++;
      }
    }
  }

  return number - greenNumber - yellowNumber > 0;
}

function specialCaseCol(letter, x, y) {
  let yellowNumber = 0;
  let greenNumber = 0;
  let number = 0;

  for (let i = 0; i < correctGrid.value.length; i++) {
    if (correctGrid.value[i][y].letter === letter) {
      number++;
    }
  }

  for (let i = 0; i < shuffledGrid.value.length; i++) {
    if (shuffledGrid.value[i][y].letter === letter) {
      if (shuffledGrid.value[i][y].state === 1 && i !== x) {
        yellowNumber++;
      } else if (shuffledGrid.value[i][y].state === 2) {
        greenNumber++;
      }
    }
  }

  return number - greenNumber - yellowNumber > 0;
}

function initGrid() {
  for (let i = 0; i < shuffledGrid.value.length; i++) {
    for (let j = 0; j < shuffledGrid.value[i].length; j++) {
      if (isCorrectPosition(i, j)) {
        shuffledGrid.value[i][j].style = "green-cell-style";
        shuffledGrid.value[i][j].state = 2;
      }
    }
  }

  for (let i = 0; i < shuffledGrid.value.length; i++) {
    for (let j = 0; j < shuffledGrid.value[i].length; j++) {
      if (shuffledGrid.value[i][j].state === 2) {
        continue;
      }
      if (isInRowOrColumn(i, j)) {
        shuffledGrid.value[i][j].style = "orange-cell-style";
        shuffledGrid.value[i][j].state = 1;
      } else {
        shuffledGrid.value[i][j].style = "gray-cell-style";
        shuffledGrid.value[i][j].state = 0;
      }
    }
  }
}

async function copyToClipboard(target) {
  let colorText = "";
  for (let i = 0; i < shuffledGrid.value.length; i++) {
    for (let j = 0; j < shuffledGrid.value[i].length; j++) {
      if (shuffledGrid.value[i][j].letter === " ") {
        colorText += "⬜";
      } else if (shuffledGrid.value[i][j].state === 2) {
        colorText += "🟩";
      } else if (shuffledGrid.value[i][j].state === 1) {
        colorText += "🟧";
      } else if (shuffledGrid.value[i][j].state === 0) {
        colorText += "⬛";
      }
    }
    colorText += "\n";
  }

  try {
    await navigator.clipboard.writeText(
      `Movixa Arquivo ${remainTimes.value} trocas \n${colorText}\n jogo movixa`
    );
  } catch (err) {
    console.error("Error in copy: ", err);
  }
}

function initShuffledGrid() {
  const arr = data.value[queryParams.date]["shuffle"];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = {
        letter: arr[i][j],
        style: "nomal-cell-style",
        state: state.value,
        id: `${i}-${j}`,
      };
    }
  }
  shuffledGrid.value = arr;
}

function swapShuffledGrid(oldIndex, newIndex) {
  const oldRow = Math.floor(oldIndex / 5);
  const oldCol = oldIndex % 5;
  const newRow = Math.floor(newIndex / 5);
  const newCol = newIndex % 5;

  const temp = shuffledGrid.value[oldRow][oldCol];
  shuffledGrid.value[oldRow][oldCol] = shuffledGrid.value[newRow][newCol];
  shuffledGrid.value[newRow][newCol] = temp;

  setLetterStyleAndState(oldRow, oldCol);
  setLetterStyleAndState(newRow, newCol);
}

// 这个函数的目的是为了确保交换的动画效果执行完毕后在执行onEnd函数
// 因为onEnd函数中更新了列表数据，如果动画效果没有执行完毕，会导致列表数据更新后的动画效果不正确
function afterAnimation(callback) {
  requestAnimationFrame(function () {
    requestAnimationFrame(callback);
  });
}

function onEnd(event) {
  const oldIndex = event.oldIndex;
  const newIndex = event.newIndex;
  if (oldIndex === newIndex) {
    return;
  }
  remainTimes.value++;
  setTimeout(() => {
    swapShuffledGrid(oldIndex, newIndex);
    if (isComplete()) {
      win.value = 1;
      setDataToLocal();
      return;
    }
  }, 500);
}

onMounted(() => {
  correctGrid.value = initData(data);
  // console.log("letterData-after:", correctGrid.value);
  initShuffledGrid();
  // console.log("shuffledGrid-after:", shuffledGrid.value);
  initGrid();
  new Sortable(list.value, {
    swap: true,
    swapClass: "highlight",
    animation: 500,
    filter: function (event, item) {
      // console.log("item:", item, "event:", event);
      // console.log(event.target.className);
      return item.getAttribute("data-state") === "2";
    },
    onMove: function (event) {
      // 获取目标元素，即拖动元素想要交换位置的元素
      let target = event.related;
      // console.log("target:", target, "event:", event);
      // 检查目标元素是否允许交换
      return target.getAttribute("data-state") !== "2";
    },
    onEnd: function (event) {
      afterAnimation(function () {
        onEnd(event);
      });
    },
  });

  // 刷新页面
});

useHead({
  title: "Movixa Arquivo - Arquivo de jogos anteriores da mavixo",
  meta: [
    {
      name: "description",
      content: "Jogue todos os jogos da mavixo de todas as datas sem limites",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: "https://movixa.com/arquivo",
    },
    {
      rel: "icon",
      href: "/favicon.ico",
      type: "image/x-icon",
    },
  ],
});
</script>

<style scoped>
.highlight {
  background-color: #f9c7c8 !important;
}
.font-Josefin-sans {
  font-family: "Josefin Sans", sans-serif;
}
.nomal-cell-style {
  @apply flex py-4 uppercase cursor-default font-sans select-none items-center border-b-4 justify-center  border-solid text-4xl bg-gray-500 font-bold text-white rounded-lg;
}
.gray-cell-style {
  box-shadow: 0px 5px 0px rgba(210, 212, 215, 1);
  @apply flex py-4 uppercase cursor-pointer font-sans select-none items-center justify-center  border-solid text-4xl  bg-[#eaecef] font-bold text-black rounded-lg;
}
.orange-cell-style {
  box-shadow: 0px 5px 0px rgba(202, 160, 51, 1);
  @apply flex py-4 uppercase cursor-pointer font-sans select-none items-center justify-center  border-solid  text-4xl bg-[#e1b239] font-bold text-white rounded-lg;
}
.green-cell-style {
  box-shadow: 0px 5px 0px rgba(101, 147, 76, 1);
  @apply flex py-4 uppercase cursor-pointer font-sans select-none items-center justify-center border-solid text-4xl bg-[#70a455] font-bold text-white rounded-lg;
}
</style>
