<script setup lang="ts">
import {shopingNumber} from "@/store.ts";
import {computed, ref} from "vue";

let shopingList = ref([
    {
  name: 'mleko',
  count: 1,
  priority: 1
  },
  {
  name: 'chleb',
  count: 1,
  priority: 1
  },
  {
    name: 'wino',
    count: 1,
    priority: 1
}
  ]);
// Zmienia liczbę produktów do kupienia
  shopingNumber.value = shopingList.value.length;



</script>

<template>
<main>
  <div class="title">
  <h2>ShopingList</h2>
    <h3>{{shopingNumber}}</h3>
  </div>
  <div class="myShopingList">
    <ul>
      <li v-for="item in shopingList">{{item.name}}</li>
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
</style>