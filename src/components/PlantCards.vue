<script setup>
  import "@fontsource/open-sans";
  import "@fontsource/montserrat";
  import { NSpin } from "naive-ui";

  import { ref, reactive, watch, onMounted, inject} from "vue";
  import Card from "@/components/Card.vue";

  import { fetchData, apiURL } from '@/services/apiService';

  // Clear localStorage to debug acquiring token
  localStorage.clear()

  // const plants = ref(null)
  const plants =inject("plants")
  const pagination = inject("pagination")

  // onMounted(async () =>{
  //     console.log('mounted');
  //     const plants_res = await fetchData(apiURL+`plant?limit=4&skip=${pagination.value*4}`);
  //     plants.value = plants_res.data
  // });
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
    justify-content: left;

    display: flex;
    flex-flow:row wrap;
    gap: 48px;
}


.spinner {
  margin-top: 220px;
}
</style>