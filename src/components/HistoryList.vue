<script setup lang="ts">

import {historyList} from "@/store";
import {deleteShoppingItemFromFireStore, getShoppingListFromFireStoreOrEmptyArray} from "@/firestore";
import {computed, ref} from "vue";

async function getHistory() {
  historyList.value = await getShoppingListFromFireStoreOrEmptyArray('history');
  console.log(historyList.value);
}

getHistory();

const allHistoryCount = computed(() => {

  const historyArray = historyList.value;
  if (historyArray.length === 0) {
    return 0;
  }
  let totalNumberOfItems = ref(0);
  for (let i: number = 0; i < historyArray.length; ++i) {
    console.log(historyArray[i].count);
    totalNumberOfItems.value += historyArray[i].count;

    console.log('last' + totalNumberOfItems);

  }
  return totalNumberOfItems.value;
});
const filterNames = computed( () => {
  const historyArray = historyList.value;
  return [...new Set(historyArray.map((item: any) => item.name))];

});

function filteredNumber(name: any) {
  const historyArray = historyList.value;
  let totalNumberOfItems = ref(0);
  for (let i: number = 0; i < historyArray.length; ++i) {
    if (historyArray[i].name === name) {
      totalNumberOfItems.value += historyArray[i].count;
    }
  }
  return totalNumberOfItems.value;
}

function eraseHistory() {
  for (let i: number = 0; i < historyList.value.length; ++i) {

   deleteShoppingItemFromFireStore(historyList.value[i], 'history');
  }

}
function refreshPage() {
  window.location.reload();
}
</script>

<template>
  <section>
    <div class="eraseHistoryButton" @click="eraseHistory">
      Wyczyść historię
    </div>
    <h2>
      Liczba przedmiotów {{ allHistoryCount }}
    </h2>
      <div class="itemHistoryWrapper">
     <div class="itemHistory"
          v-for="items in filterNames"
          :style="{fontSize: filteredNumber(items) * 0.05 + 0.9 +'rem'}"
     >
       {{items}}
       -
       <i>
       {{filteredNumber(items) }}
       </i>
     </div>
      </div>

  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 10px;

}

h2 {
  color: red;
}
.eraseHistoryButton{

  margin: 10px;
  padding: 10px;
  background-color: #ff0000;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: rgba(119, 119, 119, 0.6) 2px 3px 2px 0;
}
.eraseHistoryButton:hover{
 scale: 1.2;
}
.itemHistory {
  margin: 5px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid gray;
  box-shadow: rgba(119, 119, 119, 0.6) 2px 3px 2px 0;
  background-color: #cbfc97;
}
.itemHistoryWrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 100%;
  height: 100%;

}
</style>