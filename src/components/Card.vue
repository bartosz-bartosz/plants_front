<script setup>
import {defineProps, ref, watchEffect, onMounted} from "vue";
import {RouterLink} from "vue-router";
import {waterPlant} from "../services/apiService";
import {useUserStore} from "../stores/users";

const userStore = useUserStore();

const {plant_id, name, species, watering_frequency, last_watering, next_watering, days_left} = defineProps([
  'plant_id',
  'name',
  'species',
  'watering_frequency',
  'last_watering',
  'next_watering',
  'days_left'
])

const alreadyWatered = ref(false)
let daysColor = '#8ac969'

if (days_left === 5) {
  daysColor = '#e3ad74'
} else if (days_left <= 0) {
  daysColor = '#c23434'
}

const stringOfDate = ((date) => {
  const dateObj = new Date(date);
  const options = {day: 'numeric', month: 'long', year: 'numeric'};
  return dateObj.toLocaleDateString('en-US', options);
});

// Computed property to calculate the time since last watering
const timeSinceLastWatering = ref('');

watchEffect(() => {
  if (last_watering) {
    const lastWateringDate = new Date(last_watering);
    const currentDate = new Date();
    lastWateringDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
    const timeDifferenceMs = currentDate - lastWateringDate;
    const daysPassed = Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24));


    if (daysPassed >= 8) {
      const weeksPassed = Math.floor(daysPassed / 7);
      timeSinceLastWatering.value = `${weeksPassed} weeks ago`;
    } else if (daysPassed === 1) {
      timeSinceLastWatering.value = `Yesterday`
    } else if (daysPassed === 0) {
      timeSinceLastWatering.value = `Today`;
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
    <!--    <div class="plant-card-body">-->
    <!--      <div class="plant-last-watering">-->
    <!--        <h5>Last watering</h5>-->
    <!--        <div class="plant-last-watering-values">-->
    <!--          <p v-if="last_watering">{{ timeSinceLastWatering }},</p>-->
    <!--          <p v-if='last_watering' class="last-watering-date">{{ localLastWatering }}</p>-->
    <!--          <p v-else class="last-watering-date"> - </p>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <p class="watering-fq-text">Water every <b>{{ watering_frequency }}</b> days</p>-->

    <!--    </div>-->

    <!--BODY-->
    <div class="alt-plant-card-body">

      <div class="alt-top-wrapper">
        <div class="alt-corner-data">
          <h5>Last</h5>
          <div class="alt-corner-values">
            <p v-if="last_watering">{{ timeSinceLastWatering }},</p>
            <p v-if='last_watering' class="last-watering-date">{{ stringOfDate(last_watering) }}</p>
            <p v-else class="last-watering-date"> - </p>
          </div>
        </div>
        <div class="alt-corner-data">
          <h5>Every...</h5>
          <div class="alt-corner-values">
            <p v-if="last_watering">{{ watering_frequency }} days</p>
          </div>
        </div>
      </div>

      <div class="alt-big-number" v-if="days_left">{{ days_left }}</div>
      <div class="alt-big-number" v-else>?</div>
      <p class="watering-fq-text">days left</p>

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
  color: v-bind('daysColor');
  margin-top: 32px;
  text-align: center;
}

.card .title-card-section {
//background-image: radial-gradient(circle farthest-corner at 50% 0%, #eaf1d6 40%, #fff 75%);
  background: linear-gradient(180deg, rgba(234, 241, 214, 1) 30%, rgba(255, 255, 255, 1) 100%);
  border-radius: 10px;
}


.card .alt-plant-card-body {
//border: 1px solid red; display: flex; flex-direction: column;
  margin: auto;
  width: 100%;
}


.alt-top-wrapper {
//border: 1px solid greenyellow; display: flex; flex-direction: row;
  justify-content: space-between;
  padding: 2px 12px;
  min-height: 66px;
}

.alt-corner-data {
//border: 1px solid cyan; display: flex; flex-direction: column;
  align-items: center;
  justify-content: start;
  height: fit-content;
  min-width: 85px;
}


.alt-corner-values {
//border: 1px solid purple; height: fit-content; display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.alt-big-number {
  font-family: 'Rozha One', sans-serif;
  color: v-bind('daysColor');
  margin: 0;
  font-size: 170px;
  line-height: 80px;
  height: fit-content;
  text-shadow: var(--dark-main-shadow) 0.02em 0.02em 12px;
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