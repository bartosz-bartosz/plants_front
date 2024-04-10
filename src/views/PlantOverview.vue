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
    <div class="plant-heading">
      <h1>{{plantData.name}}</h1>
      <p>YOUR PLANT</p>
    </div>
    <div class="plant-stats">
      <div class="base-data">
        <div class="data-row">
          <span class="icon"><font-awesome-icon icon="stopwatch"/>
          <p>Watering Frequency</p>
          </span>
          <p>{{plantData.watering_frequency}} days</p>
        </div>
        <div class="data-row">
          <span class="icon"><font-awesome-icon icon="calendar-day"/>
          <p>Watering Frequency</p>
          </span>
          <p>{{plantData.next_watering}} days</p>
        </div>
      </div>
      <div class="chart">
        <WateringHistoryChart/>
      </div>
    </div>
    {{plantData.name}}
    {{plantData.watering_frequency}}
    {{plantData.last_watering}}
  </div>
  </body>
</template>

<style scoped>
.main {
  border: 1px solid red;
  margin: auto;
  display: flex;
  flex-direction: column;
}

.plant-data {
  border: 1px solid blue;
  margin: auto;
  width: 90%;
  justify-content: left;
}

.plant-heading {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: top;
  border: 1px solid green;
  padding-left: 20px;
}

h1 {
  text-align: left;
  align-self: stretch;
  margin: 0;
}

p {
  text-align: left;
  align-self: stretch;
  margin: 0;
}

.plant-stats {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid cyan;
  padding-left: 20px;
  min-height: 100px;
}

.base-data {
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid gray;
  border-radius: 10px;
  padding: 10px;
}
.data-row {
  border: 1px solid red;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-width: 240px;
  margin: 5px;

}

.icon {
  display: flex;
  gap: 5px;
  align-items: center;
  color: #011b10;
  font-weight: bold;
}

</style>
