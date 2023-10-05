<script setup lang="ts">

import {historyList} from "@/store";
import {deleteShoppingItemFromFireStore, getShoppingListFromFireStoreOrEmptyArray} from "@/firestore";
import {computed, ref} from "vue";
import {IonIcon} from "@ionic/vue";
import {refresh} from "ionicons/icons";

async function getHistory() {
  historyList.value = await getShoppingListFromFireStoreOrEmptyArray('history');

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

//tu sie krzaczyło bo był ref w srodku funkcji
function filteredNumber(name: any) {
  const historyArray = historyList.value;
  let totalNumberOfItems = 0;
  for (let i: number = 0; i < historyArray.length; ++i) {
    if (historyArray[i].name === name) {
      totalNumberOfItems+= historyArray[i].count;
    }
  }
  return totalNumberOfItems;
}

// const filteredNumber = (name: any) => {
//   const historyArray = historyList.value;
//   let totalNumberOfItems = 0;
//   for (let i: number = 0; i < historyArray.length; ++i) {
//     if (historyArray[i].name === name) {
//       totalNumberOfItems += historyArray[i].count;
//     }
//   }
//   return totalNumberOfItems;
// };


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
    <div class="eraseHistoryButton " @click="eraseHistory">
      Wyczyść historię

    </div>
    <ion-icon class="refreshIcon" aria-hidden="true" :icon="refresh" @click="refreshPage"></ion-icon>
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
.refreshIcon {
  color: #0d0d0d;
  padding: 4px;
  border: 1px solid gray;
  border-radius: 5px;
  box-shadow: rgba(119, 119, 119, 0.6) 2px 3px 2px 0;
  cursor: pointer;
}
.refreshIcon:hover {
  scale: 1.2;
}
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  position: relative;
  height: 100vh ;
background-color: #ffffff;

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
  display: flex;
  align-items: center;
  margin: 5px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid gray;
  height: fit-content;
  box-shadow: rgba(119, 119, 119, 0.6) 2px 3px 2px 0;
  background-color: #cbfc97;
  color: #0d0d0d;
}
.itemHistoryWrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;


}
</style>