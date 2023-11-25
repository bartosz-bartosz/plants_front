<script setup>
import {inject, onMounted, ref} from "vue";
  import {fetchData, apiURL} from "../services/apiService";
  import {formatDateTime, timeAgo} from "../services/dataParsing";
  import { NSpin } from 'naive-ui';

  // const plants = ref(null)
  const plants =inject("plants")

  let pagination = ref(0)


</script>

<template>
  <div class="table-wrapper" v-if="plants !== null">
    <table class="plants-table">
      <thead>
        <tr>
          <th><font-awesome-icon icon="fa-circle-check" /></th>
          <th><font-awesome-icon icon="address-card" /> Name</th>
          <th><font-awesome-icon icon="dna" /> Species</th>
          <th><font-awesome-icon icon="calendar-day" /> Last watering</th>
          <th><font-awesome-icon icon="stopwatch" /> Every...</th>
          <th><font-awesome-icon icon="droplet" /> Water!</th>
        </tr>
      </thead>
        <tbody>
          <tr v-for="plant in plants" :key="plant.id">
            <th><input type="checkbox"></th>
            <td>{{ plant.name }}</td>
            <td class="species-italic">{{ plant.species }}</td>
            <td>{{ timeAgo(plant.last_watering) }}</td>
            <td>{{ plant.watering_frequency }} days</td>
            <td><button>Water!</button></td>
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
  box-shadow: 0 15px 25px rgba( 0, 0, 0, 0.2 );
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


</style>