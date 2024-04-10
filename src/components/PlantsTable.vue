<script setup>
import {inject, onMounted, onBeforeMount, ref} from "vue";
import {fetchData, apiURL, waterPlant} from "../services/apiService";
import {formatDateTime, timeAgo} from "../services/dataParsing";
import {NSpin} from 'naive-ui';
import {useUserStore} from "../stores/users";

const userStore = useUserStore()

// const plants = ref(null)
const plants = inject("plants")
let pagination = ref(0)

function isToday(date) {
  const today = new Date();
  const compared_date = new Date(date);
  return today.toDateString() === compared_date.toDateString();
}

onBeforeMount(() => {
  for (let i = 0; i < plants._rawValue.length; i++) {
    const plantItem = plants._rawValue[i];
    plantItem.alreadyWatered = isToday(plantItem.last_watering);
  }
  console.log(plants);
})

const handlePlantWatering = async (plantID) => {
  const userID = userStore.user.id
  const response = await waterPlant(userID, plantID)
  if (response.status === 200) {
    plants[plantID].alreadyWatered = true;
    console.log('plant updated:');
    console.log(plants[plantID]);
  }
}

</script>

<template>
  <div class="table-wrapper" v-if="plants !== null">
    <table class="plants-table">
      <thead>
      <tr>
        <th>
          <font-awesome-icon icon="fa-circle-check"/>
        </th>
        <th>
          <font-awesome-icon icon="address-card"/>
          Name
        </th>
        <th>
          <font-awesome-icon icon="dna"/>
          Species
        </th>
        <th>
          <font-awesome-icon icon="calendar-day"/>
          Last watering
        </th>
        <th>
          <font-awesome-icon icon="stopwatch"/>
          Every...
        </th>
        <th>
          <font-awesome-icon icon="droplet"/>
          Water!
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="plant in plants" :key="plant.id">
        <th><input type="checkbox"></th>
        <td>
          <p class="clickable-text" v-on:click="$router.push({name: 'plant', params: {id: plant.id}})">{{ plant.name }}</p>
        </td>
        <td class="species-italic">{{ plant.species }}</td>
        <td>{{ timeAgo(plant.last_watering) }}</td>
        <td>{{ plant.watering_frequency }} days</td>
        <td>
          <button v-if="!plant.alreadyWatered" @click="handlePlantWatering(plant.id)"> Water!</button>
          <div class="already-watered" v-else>
            <font-awesome-icon class="success-icon" icon="fa-circle-check"/>
            <p class="success-text">Watered today</p>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <div class="spinner" v-else>
    <NSpin size="large"/>
  </div>
</template>

<style scoped>

.table-wrapper {
  width: 80%;
  margin: 48px 70px 70px;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
}

.plants-table {
  font-size: 14px;
  font-weight: normal;
  border: none;
  border-collapse: collapse;
  width: 100%;
  max-width: 100%;
  white-space: nowrap;
  background-color: #ffffff;
  font-family: "Montserrat", sans-serif;
  border-radius: 15px;
}

.plants-table td, .plants-table th {
  text-align: center;
  padding: 8px;
}

.plants-table td {
  font-size: 14px;
  padding: 12px 32px;
  min-width: 200px;
}

.plants-table thead th {
  color: #ffffff;
  background: #40513B;
  padding: 16px;
}

.plants-table thead th:nth-child(1) {
  border-radius: 20px 0 0 0;
}

.plants-table thead th:nth-last-child(1) {
  border-radius: 0 20px 0 0;
}

.plants-table thead th:nth-child(odd) {
  color: #ffffff;
  background: #40513B;
}

.plants-table tr:nth-child(even) {
  background: #eaf1d6;
}

.plants-table tr:last-child {
  border-radius: 0 20px;
}

.plants-table button {
  border-radius: 20px;
  min-width: 80px;
}

.spinner {
  margin-top: 220px;
  color: black;
}

.already-watered {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  column-gap: 4px;

}

.success-icon {
  font-size: 12px;
}

.success-text {
  font-size: 12px;
}

</style>
