<script setup lang="ts">
import { shopingList} from "@/store";
</script>

<template>
<div class="shoppingHeader">
  <h3>Shopping List</h3>
  <div class="quantity">{{shopingList.length}}</div>
  <div class="fullMeter"
        :style="{height: shopingList.length * 5 + '%',
                transition: 'height 0.5s ease-in-out' ,
                backgroundColor:'rgb(' + shopingList.length * 20 +', 150 ,40)' }"
  ></div>

</div>
</template>

<style scoped>
h3 {
  margin: 0;
  padding: 0;
}
.shoppingHeader {

  background-color: #fff;
  border-bottom: 1px solid #eee;
  padding: 10px 0;
  text-align: center;
  font-size: 1.4rem;

}
.quantity {
  position: relative;
  display: inline-block;
  width: 30px;
  height: 30px;

  color: #131313;
  font-size: 1.3rem;

  margin-left: 10px;
}
.quantity::after {
  content: '';
  position: absolute;
  transform: rotateZ(-30deg) translateY(-50%);
  width: 40px;
  height: 2px;
  background-color: orange;
  top: 50%;

}
.quantity::before {
  content: '';
  left: -105%;
  top: 50%;
  position: absolute;
  transform: rotateZ(30deg) translateY(-50%);
  width: 40px;
  height: 2px;
  background-color: orange;
}
.fullMeter {

  position: absolute;
  left: 0;
  bottom: 0;
  opacity: 0.5;
  width: 100%;
  height: 1%;
  background-color: rgb(6, 150, 40);

}
</style>