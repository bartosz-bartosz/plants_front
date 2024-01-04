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
  const options = {day: 'numeric', month: 'long', year: 'numeric'};
  localLastWatering.value = dateObj.toLocaleDateString('en-US', options);
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
    } else if (daysPassed === 0) {
      timeSinceLastWatering.value = `Today`;
    }
    else {
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

    <!--TITLE-->
    <div class="title-card-section">
      <h2 @click="$router.push({name: 'plant', params: {id: plant_id}})" class="clickable-text">{{ name }}</h2>
      <div class="line"></div>
      <h3 v-if="species" class="species-italic">{{ species }}</h3>
      <h3 v-else class="species-italic">-</h3>
    </div>

    <!--BODY-->
    <div class="plant-card-body">
      <div class="plant-last-watering">
        <h5>Last watering</h5>
        <div class="plant-last-watering-values">
          <p v-if="last_watering">{{ timeSinceLastWatering }},</p>
          <p v-if='last_watering' class="last-watering-date">{{ localLastWatering }}</p>
          <p v-else class="last-watering-date"> - </p>
        </div>
      </div>
      <p class="watering-fq-text">Water every <b>{{ watering_frequency }}</b> days</p>

    </div>

    <!--BUTTONS-->
    <div class="buttons-wrapper">
      <button @click="$router.push({name: 'plant', params: {id: plant_id}})">Show more</button>
      <button v-if="!alreadyWatered" @click="handlePlantWatering(plant_id)">Water!</button>
      <div class="already-watered" v-else>
        <font-awesome-icon class="success-icon" icon="fa-circle-check"/>
        <p class="success-text">Watered</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
h2 {
  text-decoration: none;
}

.card .last-watering-date {
  font-size: 0.8em;
  margin: auto;
  text-align: center;
}

.card .watering-fq-text {
  margin-top: 24px;
  text-align: center;
}

.card .title-card-section {
//background-image: radial-gradient(circle farthest-corner at 50% 0%, #eaf1d6 40%, #fff 75%); background: linear-gradient(180deg, rgba(234, 241, 214, 1) 30%, rgba(255, 255, 255, 1) 100%); border-radius: 10px;
}

.card .plant-card-body {
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 100%;
}

.plant-last-watering {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 24px;
}

.plant-last-watering-values {
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.card .buttons-wrapper {
  display: flex;
  margin: auto;
  padding: 1rem;
//border: solid 1px red; justify-content: space-between; column-gap: 24px;
}

.success-icon {
  font-size: 18px;
}

.success-text {
  font-size: 12px;
}


</style>