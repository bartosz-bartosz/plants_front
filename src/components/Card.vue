<script setup>
  import { defineProps, ref, watchEffect } from "vue";

  const {name, species, watering_frequency, last_watering} = defineProps([
      'name',
      'species',
      'watering_frequency',
      'last_watering'
  ])

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

</script>


<template>
  <div class="card">
      <div>
        <h2>{{ name }}</h2>
        <div class="line"></div>
        <h3 class="species-italic">{{ species }}</h3>
      </div>
      <p v-if='last_watering' class="last-watering-date">{{ localLastWatering }}</p>
      <p v-else class="last-watering-date"> This plant hasn't been watered yet :( </p>
      <p v-if="last_watering">{{ timeSinceLastWatering }}</p>
      <p class="watering-fq-text">Water every <b>{{watering_frequency}}</b> days</p>
  </div>
</template>

<style scoped>

.line {
    margin: auto;
    height: 1px;
    width: 60%;
    background-color: #2c3e50;

}

.card {
    width: 20%;
    min-height: 320px;
    margin: 10px 20px;
    border-radius: 10px;
    background-color: #f4fcf8;
    //border: #3C6255 solid 1px;
    box-shadow: 4px 8px 20px rgba(44, 80, 72, 0.39);
    display: flex;
    flex-direction: column;

}

.card h2 {
    padding: 10px;
    text-align: center;
    color: #2c3e50;
    font-family: "Merriweather", serif;
    font-size: 24px;
}

.card h3 {
    padding: 8px;
    text-align: center;
    font-size: 12pt;
}

.card p {
    font-family: "Montserrat", sans-serif;
    font-size: 14px;
    margin: auto;
}

.card .last-watering-date {
    margin: auto;
    text-align: center;
}

.card .watering-fq-text {
    margin: auto;
    text-align: center;
}


</style>