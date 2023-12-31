<template>
  <main class="">
    <div
      class="h-screen overflow-auto font-Josefin-sans mx-auto w-full max-w-[728px] shadow-2xl"
    >
      <Header />
      <h2
        class="font-sans text-sm text-center mt-4 text-zinc-400 tracking-widest"
      >
        Movixa {{ today }}
      </h2>
      <ClientOnly>
        <AdsenseRow />
      </ClientOnly>
      <div v-auto-animate>
        <div
          class="mt-6 flex flex-col gap-3 mx-auto"
          style="width: 100%; max-width: 450px"
        >
          <div
            v-for="(items, rowIndex) of shuffledGrid"
            :key="rowIndex"
            class="flex justify-between w-full px-2"
            v-auto-animate
          >
            <div
              v-for="(item, colIndex) of items"
              :key="item.id"
              :draggable="item.state === 2 || item.state === -1 ? false : true"
              @dragover.prevent
              @dragstart="dragStart($event, rowIndex, colIndex)"
              @drop="drop(rowIndex, colIndex)"
              @dragleave="dragLeave(rowIndex, colIndex)"
              @touchstart="touchStart($event, rowIndex, colIndex)"
              @touchmove="touchMove($event, rowIndex, colIndex)"
              @touchend="touchEnd($event, rowIndex, colIndex)"
            >
              <p
                :id="`${rowIndex}-${colIndex}`"
                v-if="item.letter !== ' '"
                :class="item.style"
                class="w-[60px] h-14 custommid:w-[70px] custommid:h-16 custom:h-20 custom:w-[80px]"
              >
                {{ item.letter }}
              </p>
            </div>
          </div>
        </div>
        <ClientOnly>
          <AdsenseRow class="mt-4" />
        </ClientOnly>
        <div
          class="flex justify-center mt-8 text-4xl tracking-wider text-zinc-400"
        >
          Restam {{ remainTimes }} trocas
        </div>
        <p class="flex justify-center text-sm text-zinc-400 text-center">
          Clique no canto superior direito para jogar os jogos anteriores
        </p>
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
    <ClientOnly>
      <AdsenseRow />
    </ClientOnly>
  </main>
  <Introduction />
  <Share class="my-10" />
  <Faq />
  <Footer />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { vAutoAnimate } from "@formkit/auto-animate";

const today = useToday();
const correctGrid = ref([]);
const shuffledGrid = ref([]);
const { data } = await useAsyncData(() => queryContent("/data").findOne());
const state = ref(0);
const win = ref(-1);
const remainTimes = ref(15);

function initData(data) {
  let result = [];
  for (let word of data.value[today]["words"]) {
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

// 拖动元素
let draggedItem = null;
function dragStart(event, rowIndex, colIndex) {
  event.dataTransfer.effectAllowed = "move";
  draggedItem = { rowIndex, colIndex };
  // console.log("dragStart:", rowIndex, colIndex);
}

function drop(targetRowIndex, targetColIndex) {
  if (shuffledGrid.value[targetRowIndex][targetColIndex].state === 2) return;
  if (
    draggedItem.rowIndex === targetRowIndex &&
    draggedItem.colIndex === targetColIndex
  )
    return;
  if (!draggedItem || remainTimes.value <= 0) return;

  // 交换数据
  [
    shuffledGrid.value[targetRowIndex][targetColIndex],
    shuffledGrid.value[draggedItem.rowIndex][draggedItem.colIndex],
  ] = [
    shuffledGrid.value[draggedItem.rowIndex][draggedItem.colIndex],
    shuffledGrid.value[targetRowIndex][targetColIndex],
  ];

  setLetterStyleAndState(draggedItem.rowIndex, draggedItem.colIndex);
  setLetterStyleAndState(targetRowIndex, targetColIndex);

  remainTimes.value--;
  if (isComplete()) {
    win.value = 1;
    return;
  }

  if (remainTimes.value === 0) {
    win.value = 0;
    // setGameOver();
    return;
  }

  draggedItem = null;
}

function dragLeave(rowIndex, colIndex) {
  // 可以添加一些拖拽离开的处理逻辑
}

// 手机滑动元素
let movedItem = null;
// 初始化变量来保存初始触摸位置
let movableDiv = null;
let clone = null;

function touchStart(event, rowIndex, colIndex) {
  // 处理触摸开始
  // console.log("touchStart:", rowIndex, colIndex)
  movedItem = { rowIndex, colIndex };
  if (
    shuffledGrid.value[rowIndex][colIndex].state === 2 ||
    remainTimes.value === 0
  ) {
    return;
  }

  movableDiv = document.getElementById(`${rowIndex}-${colIndex}`);
  clone = movableDiv.cloneNode(true);
  clone.style.opacity = "0.9";
  clone.style.position = "absolute";
  document.body.appendChild(clone);
  updateClonePosition(event.touches[0], clone);
}

function touchMove(event, rowIndex, colIndex) {
  event.preventDefault();
  if (
    shuffledGrid.value[rowIndex][colIndex].state === 2 ||
    remainTimes.value === 0
  )
    return;
  if (clone) {
    updateClonePosition(event.touches[0], clone);
  }
}

function updateClonePosition(touch, cloneElement) {
  const x = touch.clientX - cloneElement.offsetWidth / 2;
  const y = touch.clientY - cloneElement.offsetHeight / 2;
  cloneElement.style.left = x + "px";
  cloneElement.style.top = y + "px";
}

function touchEnd(event, rowIndex, colIndex) {
  if (clone) {
    document.body.removeChild(clone);
    clone = null;
  }
  // 处理触摸结束
  if (movedItem === null) return;
  let touch = event.changedTouches[0];
  let targetIndex = findDivAt(touch.clientX, touch.clientY);
  if (targetIndex === null) return;

  if (shuffledGrid.value[targetIndex[0]][targetIndex[1]].state === 2) return;
  if (shuffledGrid.value[rowIndex][colIndex].state === 2) return;
  if (rowIndex === targetIndex[0] && colIndex === targetIndex[1]) return;
  if (!movedItem || remainTimes.value <= 0) return;

  // 交换数据
  [
    shuffledGrid.value[rowIndex][colIndex],
    shuffledGrid.value[targetIndex[0]][targetIndex[1]],
  ] = [
    shuffledGrid.value[targetIndex[0]][targetIndex[1]],
    shuffledGrid.value[rowIndex][colIndex],
  ];

  setLetterStyleAndState(rowIndex, colIndex);
  setLetterStyleAndState(targetIndex[0], targetIndex[1]);

  remainTimes.value--;
  if (isComplete()) {
    win.value = 1;
    return;
  }

  if (remainTimes.value === 0) {
    win.value = 0;
    // setGameOver();
    return;
  }
}

function findDivAt(x, y) {
  const element = document.elementFromPoint(x, y);
  // console.log("element:", element);
  if (element && isTwoDigitId(element.id)) {
    return element.id.split("-").map(Number);
  }
  return null;
}

function isTwoDigitId(id) {
  return /^\d+-\d+$/.test(id);
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
      `Movixa ${today} ${
        15 - remainTimes.value
      }/15 \n${colorText}\n movixa(.)com`
    );
  } catch (err) {
    console.error("Error in copy: ", err);
  }
}

watch(
  () => shuffledGrid.value,
  () => {
    setDataToLocal();
  },
  { deep: true }
);

function setDataToLocal() {
  if (process.client) {
    localStorage.setItem(
      "gameData",
      JSON.stringify({
        [today]: {
          shuffledGrid: shuffledGrid.value,
          remainTimes: remainTimes.value,
          win: win.value,
        },
      })
    );
  }
}

function initShuffledGrid() {
  let localData = null;
  if (process.client) {
    localData = JSON.parse(localStorage.getItem("gameData"));
  }
  if (localData && localData[today] && localData[today].shuffledGrid) {
    // console.log("gameData:", localData, "game data today:", localData[today]);
    shuffledGrid.value = localData[today].shuffledGrid;
    remainTimes.value = localData[today].remainTimes;
    win.value = localData[today].win;
    return;
  }

  const arr = data.value[today]["shuffle"];
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

onMounted(() => {
  correctGrid.value = initData(data);
  // console.log("letterData-after:", correctGrid.value);
  initShuffledGrid();
  // console.log("shuffledGrid-after:", shuffledGrid.value);
  initGrid();
});

useHead({
  title: "Movixa - Jogo Diário de Palavras",
  meta: [
    {
      name: "description",
      content:
        "Um jogo de adivinhação de palavras onde você combina palavras movendo letras",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: "https://movixa.com",
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
