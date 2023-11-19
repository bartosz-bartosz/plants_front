<script setup>
  import "@fontsource/open-sans";
  import "@fontsource/montserrat"

  import { ref, watch, onMounted} from "vue";
  import Card from "@/components/Card.vue";

  import { fetchData, apiURL } from '@/services/apiService';

  // Clear localStorage to debug acquiring token
  localStorage.clear()

  const plants = ref(null)
  let pagination = ref(0)

  onMounted(async () =>{
      console.log('mounted');
      const plants_res = await fetchData(apiURL+`plant?limit=4&skip=${pagination.value*4}`);
      plants.value = plants_res.data
  });


  watch(pagination, async () => {
      const plants_res = await fetchData(apiURL+`plant?limit=4&skip=${pagination.value*4}`);
      plants.value = plants_res.data
  });

</script>

<template>
  <div class="main">
    <div class="cards">
      <Card
        v-for="plant in plants" :key="plant.id"
        :name="plant.name"
        :species="plant.species"
        :last_watering="plant.last_watering"
        :watering_frequency="plant.watering_frequency"
      />
    </div>
    <div class="pagination">
      <button @click="pagination--">&lt</button>
        <p>{{ pagination + 1 }}</p>
      <button @click="pagination++">></button>
    </div>
  </div>

</template>


<style scoped>

.cards {
    width: 80%;
    margin: 60px auto auto;
    display: flex;
    justify-content: space-around;
}

.plants-container {
    margin: auto;
    min-height: 50%;
    width: 80%;
    border: #2c3e50 1px solid;
    border-radius: 10px;
}

.pagination {
    margin: 48px auto;
    display: flex;
    justify-content: center;
    column-gap: 12px;
}
</style>