<script setup lang="ts">
import {shopingNumber, shopingList} from "@/store.ts";
import {computed, ref} from "vue";
import AddShoping from "@/components/AddShoping.vue";
import ShopingItem from "@/components/ShopingItem.vue";

const openForm = ref(false)

  function toggleForm() {
    openForm.value = !openForm.value;
  }
// Zmienia liczbę produktów do kupienia
  shopingNumber.value = shopingList.value.length;



</script>

<template>
<main>
  <div class="title">
  <h2>ShopingList</h2>
    <h3>{{shopingList.length}}</h3>
  </div>
  <button class="openFormButton" @click="toggleForm">Dodaj Produkty</button>
  <AddShoping v-if="openForm"/>
  <div class="myShopingList">
    <ul>
     <ShopingItem/>
    </ul>
  </div>


</main>
</template>

<style scoped>
main{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

}
.title{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: min-content;
  border: grey solid 1px;
  border-radius: 5px;
  padding: 5px;
  background: #9d9fa6
}
.openFormButton {
  margin: 10px;
  padding: 5px;
  border-radius: 5px;
  border: grey solid 1px;
  background: #ffd478;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: rgba(128, 128, 128, 0.80) 2px 2px 2px 2px;
}
</style>