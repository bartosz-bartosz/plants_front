<script setup>
  import {defineProps} from "vue";

  const {name, species, watering_frequency, last_watering} = defineProps([
      'name',
      'species',
      'watering_frequency',
      'last_watering'
  ])

</script>

<template>
  <div class="card">
      <div>
        <h2>{{ name }}</h2>
        <div class="line"></div>
        <h3 class="species-italic">{{ species }}</h3>
      </div>
      <p class="last-watering-date">{{ last_watering }}</p>
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
    background-color: #eaf5ee;
    //border: #3C6255 solid 1px;
    box-shadow: 4px 8px 20px rgba(44, 80, 72, 0.39);
    display: flex;
    flex-direction: column;

}

.card h2 {
    padding: 10px;
    text-align: center;
    color: #2c3e50;
    font-family: "Montserrat", sans-serif;
    font-size: 24px;
}

.card h3 {
    padding: 8px;
    text-align: center;
    font-size: 12pt;
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