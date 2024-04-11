<script setup>
import {onMounted, ref, provide, watch, onBeforeMount} from "vue";
import NavBar from "../components/NavBar.vue";
import PlantCard from "../components/PlantCards.vue";
import PlantsTable from "../components/PlantsTable.vue";
import {apiURL, fetchData} from "../services/apiService";
import router from "../router";
import {useUserStore} from "../stores/users";

const userStore = useUserStore()

let listview = ref(true);
let itemsLimit = ref(24)
let sort_by = ref("next_watering")
let sort_order = ref(false)
const plants = ref(null)
const plants_count = ref(0)
let pagination = ref(0)


onMounted(async () => {
  if (userStore.user) {
    const plants_count_res = await fetchData(apiURL + `plant/count`)
    plants_count.value = plants_count_res.data.count

    const plants_res = await fetchData(apiURL + `plant/list?limit=${itemsLimit.value}&skip=${pagination.value * itemsLimit.value}&sort_by=${sort_by.value}&sort_order=${sort_order.value ? 'asc' : 'desc'}`);
    plants.value = plants_res.data
  }

});

watch(pagination, async () => {
  const plants_res = await fetchData(apiURL + `plant/list?limit=${itemsLimit.value}&skip=${pagination.value * itemsLimit.value}&sort_by=${sort_by.value}&sort_order=${sort_order.value ? 'asc' : 'desc'}`);
  plants.value = plants_res.data
});


function refreshPlants() {
  fetchData(apiURL + `plant/list?limit=${itemsLimit.value}&skip=${pagination.value * itemsLimit.value}&sort_by=${sort_by.value}&sort_order=${sort_order.value ? 'asc' : 'desc'}`).then((res) => {
    plants.value = res.data
  })
}

function prevPage() {
  if (pagination.value > 0) {
    pagination.value--
  }
}

function nextPage() {
  if ((pagination.value + 1) * itemsLimit.value < plants_count.value) {
    pagination.value++
  }
}

function toggleView() {
  listview.value = !listview.value
}

function goToNewPlant() {
  router.push({name: 'new-plant'})
}

provide("plants", plants)
provide("pagination", pagination)

</script>

<template>
  <NavBar/>
  <div class="main">
    <h1>MY PLANTS</h1>
    <div class="list-navigation-row">
      <div class="button-container">
        <div class="checkbox-w-label">
          <label for="asc">{{ sort_order ? "Ascending" : "Descending" }}</label>
          <input type="checkbox" v-model="sort_order">
        </div>
        <button @click="refreshPlants">Refresh data</button>
      </div>
      <div class="button-container">
        <button id="list-toggle" @click="toggleView">{{ listview ? 'Show Table' : 'Show Cards' }}</button>
        <button @click="goToNewPlant">Add Plant</button>
      </div>
    </div>
    <template v-if="listview">
      <PlantCard/>
    </template>
    <template v-else>
      <PlantsTable/>
    </template>
    <div class="pagination">
      <button class="pagination-button" @click="prevPage">
        <font-awesome-icon icon="angle-left"/>
      </button>
      <p class="pagination-counter">{{ pagination + 1 }} / {{ Math.ceil(plants_count / itemsLimit) }}</p>
      <button class="pagination-button" @click="nextPage">
        <font-awesome-icon icon="angle-right"/>
      </button>
    </div>
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
//border: #2c3e50 1px solid; color: #161f13; font-family: "Montserrat", sans-serif; font-size: 24px;
}

.list-navigation-row {
  border: 1px solid red;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80%;
  margin-bottom: 24px;
}

.button-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 16px;
  border: 1px solid red;
}

.checkbox-w-label {
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 4px;
}


.pagination {
  margin: 48px auto;
  display: flex;
  justify-content: center;
  column-gap: 48px;
}

.pagination-button {
  border-radius: 50px;
}

</style>
