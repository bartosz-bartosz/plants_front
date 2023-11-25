<script setup>
  import {onMounted, ref, provide} from "vue";
  import NavBar from "@/components/NavBar.vue";
  import PlantCard from "@/components/PlantCards.vue";
  import PlantsTable from "@/components/PlantsTable.vue";
  import {apiURL, fetchData} from "../services/apiService";

  let listview = ref(true);

  const plants = ref(null)
  let pagination = ref(0)

  onMounted(async () =>{
      console.log('mounted');
      const plants_res = await fetchData(apiURL+`plant?limit=20&skip=${pagination.value*4}`);
      plants.value = plants_res.data
  });

  provide("plants", plants)

</script>

<template>
  <NavBar/>
  <div class="main">
    <h1>PLANTS</h1>
    <div class="button-container">
      <button id="list-toggle" @click="listview = !listview">{{ listview ? 'Show Table' : 'Show Cards' }}</button>
    </div>
      <template v-if="listview">
        <PlantCard/>
      </template>
      <template v-else>
        <PlantsTable/>
      </template>
  </div>
</template>

<style scoped>

.main {
    margin-top: 24px;
    width: 100%;
    min-height: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.main h1 {
    //border: #2c3e50 1px solid;
    color: #161f13;
    font-family: "Montserrat",sans-serif;
    font-size: 24px;
}

.button-container {
    margin-left: auto;
    margin-right: 10%;
}

</style>