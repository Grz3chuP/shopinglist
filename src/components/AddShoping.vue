<script setup lang="ts">
import {ref} from "vue";
import {shopingList} from "@/store";
import {addShoppingItemToFireStore} from "@/firestore";

let shopingName = ref('');
let shopingCount = ref(1);
let lastItem = ref ('');
function addToShopingList() {
  console.log(shopingName.value);
  if (shopingName.value === '') {
    return;
  }

  let item = {name: shopingName.value, count: shopingCount.value, priority: 1, id: shopingList.value.length, end: false};
  lastItem = item.name;
  shopingList.value.push(item);

  addShoppingItemToFireStore(item, 'items');

  console.log(shopingList.value);
  shopingName.value = '';
  shopingCount.value = 1;
}
</script>

<template>
  <section>

    <div class="formToAdd">
      <h3>Dodaj nowy produkt do twojej listy zakupów</h3>
      <button class="zamknijBtn" @click="$emit('zamknij')">Zamknij</button>
      <div class="lastItem">Dodano: <i>{{lastItem}}</i></div>
      <form @submit.prevent="addToShopingList">
        <input type="text" placeholder="Podaj nazwe Produktu" v-model="shopingName">
        <div class="itemNumberAdd">
          <label for="count">Ilość</label>
          <input type="number" id="count" name="count" min="1" max="10" v-model="shopingCount">
          max 10
        </div>
        <div class="ion-activatable ripple-parent rounded-rectangle">
          <ion-ripple-effect></ion-ripple-effect>
          <button class="addButton "> Dodaj</button>
        </div>
      </form>
    </div>

  </section>

</template>

<style scoped>
h3 {
  margin: 5px;
  padding: 0;
  font-size: 1.2rem;
}
.addButton {
  color: #0d0d0d;
}

section {
  z-index: 10;
  position: absolute;
  top: 40%;
  transform: translateY(-50%);
  animation: openTab 0.3s ease-in-out;

}

@keyframes openTab {
  0% {
    opacity: 0;
    top: 0;
  }
  100% {
    opacity: 1;
    top: 40%;
    transform: translateY(-50%);
  }

}

.formToAdd {
  display: flex;
  color: #0d0d0d;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  height: 400px;
  border: #9d9fa6 solid 1px;
  padding: 5px;
  border-radius: 5px;
  box-shadow: rgba(119, 119, 119, 0.6) 2px 3px 2px 0;

  background: beige;
}

input {
  padding: 0.7rem;
  border-radius: 4px;
  box-shadow: rgba(128, 128, 128, 0.3) 1px 1px 2px 1px;
  list-style: none;
  border: 1px solid gray;
  font-size: 1.2rem;
}

form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

form button {
  margin: 5px;
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid gray;
  background-color: rgb(255, 255, 255);
  font-size: 1.1rem;
  box-shadow: rgba(128, 128, 128, 0.3) 1px 3px 2px 1px;
}

form button:hover {
  background-color: gray;
  color: white;
}

.itemNumberAdd {
  margin: 5px;
  padding: 5px;
}

label {
  margin: 5px;
  padding: 5px;
  font-size: 1.2rem;
}

.zamknijBtn {
  color: #0d0d0d;

  padding: 5px;
  border-radius: 4px;
  border: 1px solid gray;
  background-color: rgb(255, 255, 255);
  font-size: 1.3rem;
  box-shadow: rgba(128, 128, 128, 0.3) 1px 3px 2px 1px;
}
</style>