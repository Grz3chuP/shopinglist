<script setup lang="ts">

import {shopingList} from "@/store";
import {ref} from "vue";
import {
  addShoppingItemToFireStore,
  deleteShoppingItemFromFireStore,
  updateShoppingItemFromFireStore
} from "@/firestore";
import {IonIcon} from "@ionic/vue";
import{arrowUp} from "ionicons/icons";

let currentlyDragging = ref(null);
let dragging = ref(false);
let xPos = ref(0);
let xStart = ref(0);
let fadeOut = ref(false);

function dragStart(e: any, id: any) {
  console.log(e);
  if (!currentlyDragging.value) {
    currentlyDragging.value = id;
    dragging.value = true;
  }

  xStart.value = e.clientX;

}

function onDrag(e: any, id: any, item: any) {

  if (currentlyDragging.value === id && dragging.value) {

    xPos.value = e.clientX - xStart.value;

    if (xPos.value <= -100) {
      shopingList.value.splice(shopingList.value.indexOf(item), 1);
      console.log(item);
      currentlyDragging.value = null;
      dragging.value = false;
      xPos.value = 0;
    }
  }
}

function dragEnd() {
  dragging.value = false;
  currentlyDragging.value = null;
  xPos.value = 0;
  console.log(xPos.value);
}

function priorityChange(itemToChange: any) {

  console.log(itemToChange);
  console.log(itemToChange.priority);
  if (itemToChange.priority < 3) {
    itemToChange.priority = itemToChange.priority + 1;
    console.log(itemToChange.priority);
    shopingList.value.indexOf([itemToChange]);

      updateShoppingItemFromFireStore(itemToChange, 'items');

  } else {
    return;
  }
}
function removeWithDealey(item: any) {
  fadeOut.value = true;
  item.end = true;
  console.log(item);
  setTimeout(() => {
    shopingList.value.splice(shopingList.value.indexOf(item), 1);
    deleteShoppingItemFromFireStore(item, 'items');
    //dodaje do historii date stampa
    const dateStamp = new Date().getTime();
    const removedItem = {...item, dateStamp};
    addShoppingItemToFireStore(removedItem, 'history');
    fadeOut.value = false;
  }, 250);
}
</script>

<template>
  <div class="itemFull" v-for="item in shopingList">
    <li
        :key="item.id"
        @mousedown="dragStart ($event, item.id)"
        @mousemove="onDrag ($event, item.id, item)"
        @mouseup="dragEnd"
        @touchstart="dragStart($event,item.id)"
        @touchmove="onDrag($event, item.id, item)"
        @touchend="dragEnd"
        :class="{'animation': item.end, }"
        :style="{left: item.id === currentlyDragging ? xPos + 'px': '0px',
              opacity: item.id === currentlyDragging ? 1 - Math.abs(xPos/100) : 1,

      }"
    >
      <div class="nameItem" :class="{
      'lowPriority': item.priority === 2,
      'highPriority': item.priority === 3

    }">{{ item.name }}
      </div>
      <div>
        <i>{{ item.count }}</i>
      </div>
      <ion-icon class="changePrioryty" :icon="arrowUp" @click="priorityChange(item)"></ion-icon>

      <div class="okButton" @click="removeWithDealey(item) "></div>

    </li>
  </div>
</template>

<style scoped>
.changePrioryty {
  margin: 0 5px;
  cursor: pointer;
  font-size: 1.4rem;
  border-right: #0d0d0d solid 1px;
  border-left: #0d0d0d solid 1px;
  padding: 0 9px;

}
.changePrioryty:hover {
  color: green;
  transition: 0.3s;
}

.lowPriority {
  color: orange;
}

.highPriority {
  color: red;
}

i {
  margin: 0 10px;
  width: 10%;
  font-size: 1.3rem;
}

i::before {
  content: 'x';
  font-size: 1rem;
  margin-right: 5px;
}

.animation {
  animation: slideOutToLeft 0.3s ease-in-out;
}

@keyframes slideOutToLeft {
  0% {
    transform: translateX(-10%);
    opacity: 1;
  }
  100% {
    transform: translateX(-100%);
    opacity: 0;
  }
}

.itemFull {
  position: relative;
  width: 300px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 1s;
}

li {
  color: #0d0d0d;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  list-style: none;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  margin: 10px;
  width: 100%;
  transform: translateX(-10%);
  position: absolute;
  transition: 0.4s;

}

.okButton {
  width: 22px;
  height: 12px;
  border-bottom: #000000 solid 2px;
  border-right: #000000 solid 2px;
  margin: 2px 0 0 6px;
  rotate: 50deg;
  cursor: pointer;
}

.okButton:hover {
  border-bottom: green solid 2px;
  border-right: green solid 2px;
  transition: 0.4s;
}

.nameItem {
  width: 70%;
  text-align: left;
  margin-left: 10px;
  font-size: 1.2rem;
  transition: 0.5s;

}
</style>