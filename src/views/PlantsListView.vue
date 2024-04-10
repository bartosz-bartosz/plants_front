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
let sort_by = ref("last_watering")
let sort_order = ref("desc")
const plants = ref(null)
const plants_count = ref(0)
let pagination = ref(0)


onMounted(async () => {
  if (userStore.user) {
    const plants_count_res = await fetchData(apiURL + `plant/count`)
    plants_count.value = plants_count_res.data.count

    const plants_res = await fetchData(apiURL + `plant/list?limit=${itemsLimit.value}&skip=${pagination.value * itemsLimit.value}&sort_by=${sort_by.value}&sort_order=${sort_order.value}`);
    plants.value = plants_res.data
  }

});

watch(pagination, async () => {
  const plants_res = await fetchData(apiURL + `plant/list?limit=${itemsLimit.value}&skip=${pagination.value * itemsLimit.value}&sort_by=${sort_by.value}&sort_order=${sort_order.value}`);
  plants.value = plants_res.data
});


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
    <div class="button-container">
      <button id="list-toggle" @click="toggleView">{{ listview ? 'Show Table' : 'Show Cards' }}</button>
      <button @click="goToNewPlant">Add Plant</button>
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

.buttons-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.button-container {
  margin-left: auto;
  margin-right: 10%;
  display: flex;
  flex-direction: row;
  column-gap: 12px;
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
