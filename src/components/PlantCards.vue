<script setup>
import "@fontsource/open-sans";
import "@fontsource/montserrat";
import {NSpin} from "naive-ui";

import {ref, reactive, watch, onMounted, inject} from "vue";
import Card from "@/components/Card.vue";

const plants = inject("plants")

</script>

<template>
  <div class="main" v-if="plants !== null">
    <div class="cards">
      <Card
          v-for="plant in plants"
          :key="plant.id"
          :name="plant.name"
          :species="plant.species"
          :last_watering="plant.last_watering"
          :watering_frequency="plant.watering_frequency"
      />
    </div>
  </div>
  <div class="spinner" v-else>
    <NSpin size="large"/>
  </div>

</template>


<style scoped>

.cards {

  width: 80%;
  margin: 60px auto auto;
//flex-flow:row wrap; display: grid;
  grid-template-columns: repeat(auto-fill, 320px);
  grid-gap: 1rem;
  justify-content: space-around;
}

.spinner {
  margin-top: 220px;
}
</style>