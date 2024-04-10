<script setup>
import NavBar from "../components/NavBar.vue";
import WateringHistoryChart from "../components/WateringHistoryChart.vue";
import {useUserStore} from "../stores/users";
import {ref, onMounted} from "vue";
import {fetchPlant} from "../services/apiService";
import {useRoute} from "vue-router";

const plantData = ref(null)
onMounted(async () => {
  console.log(useRoute().params.id)
  plantData.value = await fetchPlant(useRoute().params.id)
})
</script>

<template>
  <NavBar/>
  <body class="main">
    <div>{{ $route.params.id }}
    </div>
  <div class="plant-data" v-if="plantData">
    {{plantData.name}}
    {{plantData.watering_frequency}}
    {{plantData.last_watering}}
  </div>
    <div class="chart">
      <WateringHistoryChart/>
  </div>
  </body>
</template>

<style scoped>
.main {
  border: 1px solid red;
}


</style>
