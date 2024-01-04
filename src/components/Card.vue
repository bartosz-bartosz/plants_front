<script setup>
import {defineProps, ref, watchEffect, onMounted} from "vue";
import {RouterLink} from "vue-router";
import {waterPlant} from "../services/apiService";
import {useUserStore} from "../stores/users";

const userStore = useUserStore();

const {plant_id, name, species, watering_frequency, last_watering} = defineProps([
  'plant_id',
  'name',
  'species',
  'watering_frequency',
  'last_watering'
])

const alreadyWatered = ref(false)
const localLastWatering = ref('');

// Watch for changes in the last_watering prop
watchEffect(() => {
  const dateObj = new Date(last_watering);
  localLastWatering.value = dateObj.toLocaleString();
});

// Computed property to calculate the time since last watering
const timeSinceLastWatering = ref('');

watchEffect(() => {
  if (last_watering) {
    const lastWateringDate = new Date(last_watering);
    const currentDate = new Date();
    const timeDifferenceMs = currentDate - lastWateringDate;
    const daysPassed = Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24));

    if (daysPassed >= 8) {
      const weeksPassed = Math.floor(daysPassed / 7);
      timeSinceLastWatering.value = `${weeksPassed} weeks ago`;
    } else {
      timeSinceLastWatering.value = `${daysPassed} days ago`;
    }
  }
});

function isToday(date) {
  const today = new Date();
  const compared_date = new Date(date);
  return today.toDateString() === compared_date.toDateString();
}

onMounted(() => {
  console.log(typeof last_watering)
  if (isToday(last_watering)) {
    alreadyWatered.value = true;
  }
})

const handlePlantWatering = async (plantID) => {
  const userID = userStore.user.id
  const response = await waterPlant(userID, plantID)
  if (response.status === 200) {
    alreadyWatered.value = true;
  }
}

</script>


<template>
  <div class="card">
    <div class="title-card-section">
      <RouterLink :to="{ name: 'plant', params: {id: plant_id}}"><h2 class="clickable-text">{{ name }}</h2></RouterLink>
      <div class="line"></div>
      <h3 class="species-italic">{{ species }}</h3>
    </div>
    <p v-if='last_watering' class="last-watering-date">{{ localLastWatering }}</p>
    <p v-else class="last-watering-date"> This plant hasn't been watered yet :( </p>
    <p v-if="last_watering">{{ timeSinceLastWatering }}</p>
    <p class="watering-fq-text">Water every <b>{{ watering_frequency }}</b> days</p>
    <div class="buttons-wrapper">
      <button @click="$router.push({name: 'plant', params: {id: plant_id}})">Show more</button>
      <button v-if="!alreadyWatered" @click="handlePlantWatering(plant_id)">Water!</button>
      <div class="already-watered" v-else>
        <font-awesome-icon class="success-icon" icon="fa-circle-check" />
        <p class="success-text">Watered today</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
h2 {
  text-decoration: none;
}

.card .last-watering-date {
  margin: auto;
  text-align: center;
}

.card .watering-fq-text {
  margin: auto;
  text-align: center;
}

.card .title-card-section {
//background-image: radial-gradient(circle farthest-corner at 50% 0%, #eaf1d6 40%, #fff 75%); background: linear-gradient(180deg, rgba(234, 241, 214, 1) 30%, rgba(255, 255, 255, 1) 100%);
  border-radius: 10px;
}

.card .buttons-wrapper {
  display: flex;
  margin: auto;
  padding: 1rem;
  //border: solid 1px red;
  justify-content: space-between;
  column-gap: 24px;
}

.success-icon {
  font-size: 18px;
}

.success-text {
  font-size: 12px;
}


</style>