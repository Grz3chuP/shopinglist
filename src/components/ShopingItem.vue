<script setup lang="ts">

import {shopingList} from "@/store";
import {ref} from "vue";
let currentlyDragging = ref(null);
let dragging = ref(false);
let xPos = ref(0);
let xStart = ref(0);

function dragStart(e: any, id: any) {
console.log(e);
if (!currentlyDragging.value) {
  currentlyDragging.value = id;
  dragging.value = true;
}

  xStart.value = e.clientX;
  console.log(xStart.value);
}
function onDrag(e: any, id: any) {

  if (currentlyDragging.value === id && dragging.value) {
    console.log(currentlyDragging.value);
    console.log(id);
    xPos.value = e.clientX - xStart.value;

    if(xPos.value <= -100 ) {
      shopingList.value.splice(currentlyDragging.value, 1);
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

</script>

<template>
<div class="itemFull" v-for="item in shopingList">
  <li
      :key="item.id"
      @mousedown="dragStart ($event, item.id)"
      @mousemove="onDrag ($event, item.id)"
      @mouseup="dragEnd"
      @touchstart="dragStart($event,item.id)"
      @touchmove="onDrag($event, item.id)"
      @touchend="dragEnd"
      :style="{left: item.id === currentlyDragging ? xPos + 'px': '0px',
              opacity: item.id === currentlyDragging ? 1 - Math.abs(xPos/100) : 1}"
  >{{item.name}}{{item.id}}
    <div class="okButton" @click="shopingList.splice(currentlyDragging, 1)"></div>


  </li>
</div>
</template>

<style scoped>
.itemFull {
position: relative;
  width: 300px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 1s;
}
li {

  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  list-style: none;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  margin: 10px;
  min-width: 120px;
  position: absolute;
  cursor: pointer;




}


.okButton {

  width: 18px;
  height: 10px;
  border-bottom: grey solid 2px;
  border-right: grey solid 2px;
  margin: 2px 0 0 8px;
  rotate: 50deg;
  cursor: pointer;

}


.okButton:hover {

  border-bottom: green solid 2px;
  border-right: green solid 2px;

  transition: 0.4s ;

}

</style>