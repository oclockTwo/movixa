<template>
  <div class="row">
    <div class="col-3">
      <h3>My LEGO Bionicles</h3>
      <draggable
        class="list-group"
        data-list="list1"
        :list="list1"
        group="bionicles"
        @change="log"
        itemKey="id"
        :move="handleMoveItem"
        @end="handleDragEndItem"
        :options="{ animation: 500 }"
      >
        <template #item="{ element }">
          <div class="list-group-item" :style="element.style">
            {{ element.name }}
          </div>
        </template>
      </draggable>
    </div>
    <div class="col-3">
      <h3>Favourite LEGO Bionicle</h3>
      <draggable
        class="list-group"
        data-list="list2"
        :list="list2"
        group="bionicles"
        @change="log"
        itemKey="id"
        :move="handleMoveItem"
        @end="handleDragEndItem"
        :options="{ animation: 500 }"
      >
        <template #item="{ element }">
          <div class="list-group-item" :style="element.style">
            {{ element.name }}
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script setup>
import draggable from 'vuedraggable';
import { ref, reactive } from 'vue';

const list1 = ref([
  { name: 'TOA Mata Nui', id: 1, style: { background: 'gold' } },
  {
    name: 'TOA Tahu',
    id: 2,
    style: { background: 'red', color: 'yellow' },
  },
  { name: 'TOA Kopaka', id: 3, style: { background: 'white' } },
  {
    name: 'TOA Anakin',
    id: 4,
    style: { background: 'black', color: 'yellow' },
  },
]);

const list2 = ref([
  {
    name: 'TOA Gali',
    id: 5,
    style: { background: 'blue', color: 'yellow' },
  },
  {
    name: 'TOA Lewa',
    id: 6,
    style: { background: 'green', color: 'yellow' },
  },
  {
    name: 'TOA Pohatu',
    id: 7,
    style: { background: 'brown', color: 'white' },
  },
]);

const originalIndex = ref(null);
const futureIndex = ref(null);
const originalList = ref(null);
const futureList = ref(null);

const handleDragEndItem = () => {
  if (originalList.value === futureList.value) {
    const movingItem = list1.value[originalIndex.value];
    const futureItem = list1.value[futureIndex.value];

    if (movingItem && futureItem) {
      const _list = [...list1.value];
      _list[futureIndex.value] = movingItem;
      _list[originalIndex.value] = futureItem;
      list1.value = _list;
    }
  } else {
    const movingItem = list1.value[originalIndex.value];
    const futureItem = list2.value[futureIndex.value];

    if (movingItem && futureItem) {
      const _listFrom = [...list1.value];
      const _listTo = [...list2.value];
      _listTo[futureIndex.value] = movingItem;
      _listFrom[originalIndex.value] = futureItem;
      list1.value = _listFrom;
      list2.value = _listTo;
    }
  }
  document
    .querySelectorAll('.list-group-item')
    .forEach(el => (el.style.border = 'none'));
};

const handleMoveItem = (event) => {
  document
    .querySelectorAll('.list-group-item')
    .forEach(el => (el.style.border = 'none'));
  const { index, futureIndex: _futureIndex } = event.draggedContext;
  // console.log("move event:", event);
  originalIndex.value = index;
  futureIndex.value = _futureIndex;
  originalList.value = event.from.getAttribute('data-list');
  futureList.value = event.to.getAttribute('data-list');
  if (list1.value[futureIndex.value]) {
    event.to.children[futureIndex.value].style.border = '1px solid orange';
  }
  return false;
};

const log = () => {
  // log function implementation
};
</script>

<style>
.list-group-item {
  padding: 5px 10px;
  cursor: grab;
}
</style>
