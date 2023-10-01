<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Shoping List</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Shoping List</ion-title>
        </ion-toolbar>
      </ion-header>

      <ShopingList name="Shoping List" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ShopingList from "@/components/ShopingList.vue";
</script>
