<script setup>
  import "@fontsource/open-sans";
  import "@fontsource/montserrat";
  import { NSpin } from "naive-ui";

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

  function prevPage() {
    if (pagination.value > 0) {
      pagination.value--
    }
  }

  function nextPage() {
    if (pagination.value < Object.keys(plants).length) {
      pagination.value++
    }
  }

</script>

<template>
  <div class="main" v-if="plants !== null">
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
      <button class="pagination-button" @click="prevPage"><font-awesome-icon icon="angle-left" /></button>
        <p>{{ pagination + 1 }}</p>
      <button class="pagination-button" @click="nextPage"><font-awesome-icon icon="angle-right" /></button>
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
    display: flex;
    justify-content: space-around;
}

.pagination {
    margin: 48px auto;
    display: flex;
    justify-content: center;
    column-gap: 48px;
}

.pagination-button {
  border-radius: 50px;
  width: ;
}

.spinner {
  margin-top: 220px;
}
</style>