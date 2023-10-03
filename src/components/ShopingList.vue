<script setup lang="ts">
import {shopingNumber, shopingList} from "@/store.ts";
import {computed, ref} from "vue";
import AddShoping from "@/components/AddShoping.vue";
import ShopingItem from "@/components/ShopingItem.vue";
import {getShoppingListFromFireStoreOrEmptyArray} from "@/firestore";

const openForm = ref(false)

  function toggleForm() {
    openForm.value = !openForm.value;
  }
// Zmienia liczbę produktów do kupienia
  shopingNumber.value = shopingList.value.length;

async function getShopingList() {
  shopingList.value = await getShoppingListFromFireStoreOrEmptyArray();
}
getShopingList();

</script>

<template>
<main>
  <div class="openFormButton ion-activatable ripple-parent rounded-rectangle" @click="toggleForm">Dodaj Produkty
    <ion-ripple-effect></ion-ripple-effect>
  </div>

  <AddShoping v-if="openForm" @zamknij="toggleForm"/>
  <div class="myShopingList">
    <ul>
     <ShopingItem/>

    </ul>
  </div>


</main>
</template>

<style scoped>


main{
  background-color: #aae2ff;
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;

}

.openFormButton {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 10px;
  padding: 5px;
  border-radius: 5px;
  border: grey solid 1px;
  background: #ffd478;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: rgba(128, 128, 128, 0.80) 2px 2px 2px 2px;
  height: 80px;
  width: 200px;
}
</style>