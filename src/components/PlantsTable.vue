<script setup>
  import {onMounted, ref} from "vue";
  import {fetchData, apiURL} from "../services/apiService";
  import {formatDateTime, timeAgo} from "../services/dataParsing"

  const plants = ref(null)
  let pagination = ref(0)

  onMounted(async () =>{
      console.log('mounted');
      const plants_res = await fetchData(apiURL+`plant?limit=20&skip=${pagination.value*4}`);
      plants.value = plants_res.data
  });

</script>

<template>
  <div class="table-wrapper">
    <table class="plants-table">
      <thead>
        <tr>
          <th>x</th>
          <th>Name</th>
          <th>Species</th>
          <th>Last watering</th>
          <th>Water every...</th>
          <th>Water!</th>
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
</template>

<style scoped>

.table-wrapper {
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
    background: #49b25b;
}

.plants-table thead th:nth-child(odd) {
    color: #ffffff;
    background: #2a6534;
}

.plants-table tr:nth-child(even) {
    background: #effdf1;
}

.plants-table tr:last-child {
  border-radius: 0 20px;
}

</style>